const getConfigFromEnv = require('directus/dist/utils/get-config-from-env');

module.exports = function registerEndpoint(router, { services }) {

    const { ItemsService } = services;
    const twitterConfigs = getConfigFromEnv.getConfigFromEnv('TWITTER_');
    const Twitter = require('twitter');
    const twitterClient = new Twitter({
        consumer_key: twitterConfigs.apiKey,
        consumer_secret: twitterConfigs.apiSecret,
        bearer_token: twitterConfigs.bearer,
    });

    router.get('/', (req, res) => {

        const itemServiceAttrs = {
            schema: req.schema,
            accountability: { admin: true, ip: '127.0.0.1' },
        };
        const tweetsService = new ItemsService('tweets', itemServiceAttrs);
        const tweetsUserService = new ItemsService('tweets_user', itemServiceAttrs);
        const settingsService = new ItemsService('settings', itemServiceAttrs);

        const callback = (settings) => {

            settingsService.upsert({
                ...settings,
                twitter_date_last_fetch: new Date(new Date().getTime() + (5 * 60000)), // Now + 5 minutes
            })
                .then(() => {
                    tweetsService.readByQuery({
                        fields: ['*'],
                        filter: {
                            status: 'published',
                        },
                    }).then(items => res.send(items));
                })
                .catch(error => res.send(error))
        };

        settingsService.readSingleton({
            fields: ['*'],
        }).then(settings => {

            if (isNaN(settings.id)) {
                settings = {};
            }

            if (settings.id && settings.twitter_date_last_fetch !== null && new Date(settings.twitter_date_last_fetch) < new Date()) {
                return callback(settings);
            }

            tweetsUserService.readByQuery({
                fields: ['*'],
                filter: {
                    status: 'published',
                },
            }).then(users => {

                const promises = [];
                users.forEach((user, userIdx) => {
                    twitterClient.get('statuses/user_timeline', {
                        screen_name: user.screen_name,
                    }, function(error, tweets, tweetResponse) {
                        if (error) {
                            res.send(error);
                        } else {

                            tweets.forEach(tweet => {
                                const data = {
                                    id_str: parseInt(tweet.id_str),
                                    user: user.id,
                                    date: new Date(tweet.created_at),
                                    text: tweet.text,
                                    retweet_count: tweet.retweet_count,
                                    favorite_count: tweet.favorite_count,
                                };
                                promises.push(tweetsService.upsert(data));
                            });

                            if (userIdx === users.length - 1) {
                                Promise.all(promises).catch(error => {
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