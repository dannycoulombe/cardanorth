const getConfigFromEnv = require('directus/dist/utils/get-config-from-env');

module.exports = function registerEndpoint(router, { services }) {

    const { ItemsService } = services;
    const youtubeConfigs = getConfigFromEnv.getConfigFromEnv('YOUTUBE_');

    const YouTube = require('ytube-api');
    const youtubeClient = new YouTube();
    youtubeClient.setKey(youtubeConfigs.apiKey);

    router.get('/', (req, res) => {

        const itemServiceAttrs = {
            schema: req.schema,
            accountability: { admin: true, ip: '127.0.0.1' },
        };
        const youtubeService = new ItemsService('youtube', itemServiceAttrs);
        const youtubeUserService = new ItemsService('youtube_user', itemServiceAttrs);
        const settingsService = new ItemsService('settings', itemServiceAttrs);

        const callback = (settings) => {

            settingsService.upsert({
                ...settings,
                youtube_date_last_fetch: new Date(new Date().getTime() + (5 * 60000)), // Now + 5 minutes
            })
                .then(() => {
                    youtubeService.readByQuery({
                        fields: ['*'],
                        filter: {
                            status: 'published',
                        },
                    }).then(items => res.send(items));
                })
                .catch(error => res.send(error));
        };

        settingsService.readSingleton({
            fields: ['*'],
        }).then(settings => {

            if (isNaN(settings.id)) {
                settings = {};
            }

            if (settings.id && settings.youtube_date_last_fetch !== null && new Date(settings.youtube_date_last_fetch) < new Date()) {
                return callback(settings);
            }

            youtubeUserService.readByQuery({
                fields: ['*'],
                filter: {
                    status: 'published',
                },
            }).then(users => {

                const promises = [];
                users.forEach((user, userIdx) => {

                    // To get playlistIds = https://www.googleapis.com/youtube/v3/channels?id=[ID]&key=[KEY]&part=contentDetails
                    youtubeClient.getPlayListsItemsById(user.playlist_id, 10, (error, playlistItemsResponse) => {
                        if (error) {
                            res.send(error);
                        } else {
                            playlistItemsResponse.items.forEach(item => {
                                const data = {
                                    status: 'published',
                                    video_id: item.contentDetails.videoId,
                                    user: user.id,
                                    date: new Date(item.contentDetails.videoPublishedAt),
                                    thumbnail: item.snippet.thumbnails.standard && item.snippet.thumbnails.standard.url || null,
                                    title: item.snippet.title,
                                };
                                promises.push(youtubeService.upsert(data));
                            });

                            if (userIdx === users.length - 1) {
                                Promise.all(promises).catch(e => {
                                    if (error.code !== 'RECORD_NOT_UNIQUE') {
                                        res.send(error);
                                    }
                                })
                                    .catch(error => res.send(error))
                                    .finally(upsertResponses => {
                                        callback(settings);
                                    });
                            }
                        }
                    });
                });
            });
        });
    });
};