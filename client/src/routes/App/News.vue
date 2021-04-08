<template>
	<v-main>
		<v-img :src="assetPrefix + news.data.thumbnail" :aspect-ratio="5" gradient="to top right, #3468d1ff, #3468d166" class="align-end" dark>
			<v-container class="py-8">

				<v-slide-y-reverse-transition>
					<h1 v-if="seqAnim[0]" class="display-3" v-text="news.data.title"></h1>
				</v-slide-y-reverse-transition>

				<v-slide-x-transition>
					<div v-if="seqAnim[1]" class="mt-4">
						<v-chip :key="tagIdx" v-for="(tag, tagIdx) in news.data.tags" :color="$options.filters.tagParams(tag).color" small>
							<v-icon v-text="$options.filters.tagParams(tag).icon" left small>mdi-fire</v-icon>
							<span v-text="$options.filters.tagParams(tag).text"></span>
						</v-chip>
						<div class="font-weight-light caption mt-2">
							Published <span v-text="$options.filters.timeAgo(news.data.date_created)"></span>
						</div>
					</div>
				</v-slide-x-transition>
			</v-container>
		</v-img>
		<v-container class="py-12">
			<v-slide-y-reverse-transition>
				<div v-if="seqAnim[2]" v-html="news.data.content"></div>
			</v-slide-y-reverse-transition>
		</v-container>
	</v-main>
</template>

<script>
import Query from "../../utils/Query";
import SequencedAnimation from "../../mixins/SequencedAnimation";

export default {
	name: "News",

	mixins: [ SequencedAnimation(4, 100) ],

	beforeRouteEnter(to, from, next) {
		Promise.all([
			Query.get('/items/news/' + to.params.slug, { single: true }),
		]).then(([news]) => {
			Object.assign(to.meta, { news, loading: false, });
			next();
		}).catch(next);
	},

	data() {
		return {
			assetPrefix: 'http://localhost:8055/assets/',
			...this.$route.meta,
		};
	},
}
</script>
