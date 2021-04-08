<template>
	<v-main>
		<v-img src="https://images.fineartamerica.com/images-medium-large/2-girolamo-cardano-italian-mathematician-science-source.jpg" position="50% 25%" :aspect-ratio="5" gradient="to top right, #3468d1ff, #3468d166" class="align-end" dark>
			<v-container class="py-8 pb-0">
				<v-slide-y-reverse-transition>
					<h1 v-if="seqAnim[0]" class="display-3">Discover</h1>
				</v-slide-y-reverse-transition>

				<v-tabs v-model="selectedType" class="mt-8" background-color="transparent">
					<v-tab to="/discover/all">All</v-tab>
					<v-tab :to="'/discover/' + type" :key="typeIdx" v-for="(type, typeIdx) in types" v-text="type"></v-tab>
				</v-tabs>
			</v-container>
		</v-img>

		<v-container class="pa-4">
			<v-row>
				<v-slide-y-reverse-transition>
					<v-col cols="12" md="4" lg="3" xl="2" :key="itemIdx" v-for="(item, itemIdx) in discover.data">
						<v-card class="fill-height">
							<v-img class="white--text align-end" gradient="to top right, #3468d1cc, #3468d100" :aspect-ratio="1.75" :src="assetPrefix + item.thumbnail">
								<v-card-title v-text="item.title"></v-card-title>
							</v-img>

							<v-card-text v-html="item.excerpt"></v-card-text>

							<v-card-actions>
								<v-btn color="primary" :href="item.url" target="_blank" small text>
									Youtube
								</v-btn>
								<v-btn color="primary" small text>
									Twitter
								</v-btn>
							</v-card-actions>
						</v-card>
					</v-col>
				</v-slide-y-reverse-transition>
			</v-row>
		</v-container>
	</v-main>
</template>

<script>
import SequencedAnimation from "../../mixins/SequencedAnimation";
import Query from "../../utils/Query";

export default {
	name: "Discover",

	mixins: [ SequencedAnimation(20, 100) ],

	beforeRouteEnter(to, from, next) {
		Query.get('/items/discover').then(discover => {
			const types = discover.data.map(item => item.type).flat().filter((value, index, self) => {
				return self.indexOf(value) === index;
			});
			Object.assign(to.meta, { discover, types, loading: false, });
			next();
		}).catch(next);
	},

	data() {
		return {
			selectedType: '/discover/' + this.$route.params.type,
			assetPrefix: 'http://localhost:8055/assets/',
			...this.$route.meta,
		};
	},
}
</script>
