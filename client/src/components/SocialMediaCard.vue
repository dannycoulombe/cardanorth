<template>
	<ScrollableCard title="Social medias" :url="'/items/' + filters" :params="params" empty-text="No tweet yet" class="fill-height">
		<template v-slot:filters>
			<v-btn-toggle v-model="filters" class="my-n4" group>
				<v-btn value="youtube" small>
					<v-icon left>mdi-youtube</v-icon>
					<span>YouTube</span>
				</v-btn>
				<v-btn value="tweets" small>
					<v-icon left>mdi-twitter</v-icon>
					<span>Twitter</span>
				</v-btn>
			</v-btn-toggle>
		</template>
		<template v-slot:body="items">

			<v-dialog v-model="youtube.visible" :max-width="720">
				<v-card>
					<v-card-title class="align-center justify-space-between">
						<span v-text="youtube.item.title"></span>
						<v-btn @click="youtube.visible = false" icon>
							<v-icon>mdi-close</v-icon>
						</v-btn>
					</v-card-title>
					<v-card-text>
						<div class="iframe-container">
							<iframe :src="'https://www.youtube.com/embed/' + youtube.item.video_id + '?autoplay=1'" :title="youtube.item.title" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
						</div>
					</v-card-text>
					<v-divider></v-divider>
					<v-card-actions>
						<div>
							<v-avatar :width="48" :height="48">
								<v-img :src="assetPrefix + youtube.item.user.avatar"></v-img>
							</v-avatar>

							<span class="ml-4 font-weight-light caption">
								<span v-text="$options.filters.timeAgo(youtube.item.date)"></span>
								by <span v-text="youtube.item.user.username"></span>
							</span>
						</div>
						<v-spacer></v-spacer>
						<v-btn :href="'https://www.youtube.com/watch?v=' + youtube.item.video_id" target="_blank" large text>
							<v-icon left>mdi-youtube</v-icon>
							<span>Watch on YouTube</span>
						</v-btn>
						<v-btn @click="youtube.visible = false" large text>
							<span>Close</span>
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>

			<!-- TWEETS -->
			<v-list v-if="filters === 'tweets'">
				<template v-for="(tweet, tweetIdx) in items.data">
					<v-divider v-if="tweetIdx > 0" :key="tweet.id + '_sep'" />
					<v-list-item :href="tweet.url" target="_blank" :key="tweet.id">
						<v-list-item-avatar color="primary" class="white--text" :width="64" :height="64">
							<v-img :src="assetPrefix + tweet.user.avatar" />
						</v-list-item-avatar>
						<v-list-item-content>
							<v-list-item-title v-text="tweet.user.screen_name" class="font-weight-bold"></v-list-item-title>
							<v-list-item-content v-html="$options.filters.parseTweet(tweet.text || '')" class="text-pre-wrap d-block"></v-list-item-content>
							<v-list-item-action-text class="d-flex align-center justify-space-between">
								<span>
									<v-icon x-small left>mdi-heart-outline</v-icon>
									<span v-text="tweet.favorite_count"></span>
									<v-icon class="ml-4" x-small left>mdi-twitter-retweet</v-icon>
									<span v-text="tweet.retweet_count"></span>
								</span>
								<span class="font-weight-light caption" v-text="$options.filters.timeAgo(tweet.date)"></span>
							</v-list-item-action-text>
						</v-list-item-content>
					</v-list-item>
				</template>
			</v-list>

			<!-- YOUTUBE -->
			<v-container v-else-if="filters === 'youtube'">
				<v-row>
					<v-col cols="6" :key="item.id" v-for="(item) in items.data">
						<v-card @click="handleYouTubeClick(item)">
							<v-responsive :aspect-ratio="4/3">
								<v-img :src="item.thumbnail" />
							</v-responsive>
							<v-avatar style="position: absolute; bottom: 4rem; left: 0.5rem;" :width="48" :height="48">
								<v-img :src="assetPrefix + item.user.avatar"></v-img>
							</v-avatar>
							<v-card-title class="pb-0">
								<span v-text="item.title" class="text-truncate caption font-weight-bold"></span>
							</v-card-title>
							<v-card-text>
								<div class="font-weight-light caption" v-text="$options.filters.timeAgo(item.date)"></div>
							</v-card-text>
						</v-card>
					</v-col>
				</v-row>
			</v-container>
		</template>
	</ScrollableCard>
</template>

<script>
import ScrollableCard from "./ScrollableCard";

export default {
	name: "SocialMediaCard",

	components: { ScrollableCard, },

	methods: {

		handleYouTubeClick(item) {
			this.youtube.visible = true;
			this.youtube.item = item;
		},
	},

	computed: {

		params() {
			return {
				fields: '*,user.avatar,user.screen_name,user.username',
				sort: '-date',
			};
		},
	},

	data() {
		return {
			youtube: {
				visible: false,
				item: {
					user: {}
				},
			},
			filters: 'youtube',
			assetPrefix: 'http://localhost:8055/assets/',
		};
	},

	watch: {

		'youtube.visible'(value) {
			if (!value) {
				this.youtube.item = { user: {}, };
			}
		},
	}
}
</script>
