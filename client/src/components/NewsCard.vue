<template>
	<ScrollableCard title="News" url="/items/news" empty-text="No news yet" class="fill-height">
		<template v-slot:body="news">
			<v-list three-line>
				<template v-for="(item, itemIdx) in news.data">
					<v-divider v-if="itemIdx > 0" :key="item.id + '_sep'" />
					<v-list-item :key="item.id" :to="getNewsUrl(item)">
						<v-list-item-icon color="primary" class="white--text">
							<v-img :src="assetPrefix + item.thumbnail" :width="84" :height="84"></v-img>
						</v-list-item-icon>
						<v-list-item-content>
							<v-list-item-title v-html="item.title"></v-list-item-title>
							<v-list-item-subtitle v-html="item.excerpt"></v-list-item-subtitle>
							<v-list-item-action-text v-if="item.tags && item.tags.length > 0" class="d-flex align-center justify-space-between">
								<v-chip :key="tagIdx" v-for="(tag, tagIdx) in item.tags" :color="$options.filters.tagParams(tag).color" x-small>
									<v-icon v-text="$options.filters.tagParams(tag).icon" left small>mdi-fire</v-icon>
									<span v-text="$options.filters.tagParams(tag).text"></span>
								</v-chip>
								<span class="font-weight-light caption" v-text="$options.filters.timeAgo(item.date_created)"></span>
							</v-list-item-action-text>
						</v-list-item-content>
					</v-list-item>
				</template>
			</v-list>
		</template>
	</ScrollableCard>
</template>

<script>
import ScrollableCard from "./ScrollableCard";

export default {
	name: "NewsCard",

	components: { ScrollableCard, },

	methods: {

		getNewsUrl(news) {
			return '/news/' + news.id;
		},
	},

	data() {
		return {
			assetPrefix: 'http://localhost:8055/assets/',
		};
	}
}
</script>
