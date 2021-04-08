<template>
	<v-card v-bind="$attrs" v-on="$listeners" class="d-flex flex-column" style="height: 0; min-height: 100%;">
		<v-card-title style="flex: 0" class="d-flex justify-space-between">
			<slot name="header">
				<template v-if="title">
					<span v-text="title"></span>
					<slot name="filters"></slot>
				</template>
			</slot>
		</v-card-title>
		<v-overlay v-model="loading" :color="$vuetify.theme.dark ? 'black' : 'white'" absolute>
			<v-progress-circular color="primary" indeterminate />
		</v-overlay>
		<v-card-text v-if="empty" style="flex: 1" class="d-flex flex-column align-center justify-center text-center background">
			<v-icon large>mdi-package-variant</v-icon>
			<span v-text="emptyText"></span>
		</v-card-text>
		<div v-else style="flex: 1" class="overflow-auto" ref="scrollable">
			<slot name="body" v-bind="model"></slot>
		</div>
		<v-card-actions v-if="$slots.footer || totalPages > 1" class="justify-center">
			<slot name="footer">
				<v-pagination v-if="totalPages > 1" @input="handleChangePage" v-model="currentPage" :length="totalPages" :total-visible="7"></v-pagination>
			</slot>
		</v-card-actions>
	</v-card>
</template>

<script>
import Query from "../utils/Query";
import { DirectusResponse } from "../utils/Models";

export default {
	name: "ScrollableCard",

	props: {

		title: {
			type: String,
			default: null,
		},

		itemsPerPage: {
			type: Number,
			default: 10,
		},

		params: {
			type: Object,
			default: () => ({}),
		},

		url: {
			type: String,
			default: null,
		},

		emptyText: {
			type: String,
			default: 'No data yet',
		},
	},

	created() {
		if (this.url) {
			this.query();
		}
	},

	methods: {

		handleChangePage(page) {
			this.offset = this.itemsPerPage * (page - 1);
			this.query();
		},

		query() {

			this.loading = true;
			Query.get(this.url, Object.assign({
				meta: 'filter_count',
				offset: this.offset,
				limit: this.itemsPerPage,
			}, this.params))
				.then(model => {
					Object.assign(this.model, model);
					this.scrollToTop();
					this.updatePagination();
				})
				.catch(error => this.$handleError(this, error))
				.finally(() => {
					this.loaded = true;
					this.loading = false;
				});
		},

		updatePagination() {
			this.totalPages = Math.ceil(this.model.meta.filter_count / this.itemsPerPage);
		},

		scrollToTop() {
			if (this.$refs.scrollable) {
				this.$refs.scrollable.scrollTop = 0;
			}
		},
	},

	computed: {

		empty() {
			return this.loaded && !this.loading && this.model.data.length === 0;
		},
	},

	data() {
		return {
			loaded: false,
			loading: false,
			model: new DirectusResponse(),
			offset: 0,
			currentPage: 1,
			totalPages: 1,
		};
	},

	watch: {

		params: {
			deep: true,
			handler() {
				this.query();
			},
		},

		url() {
			this.query();
		},
	},
}
</script>
