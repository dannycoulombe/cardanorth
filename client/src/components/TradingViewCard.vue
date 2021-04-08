<template>
	<v-card class="fill-height mb-3" style="height: 300px">
		<div class="tradingview-widget-container">
			<div id="tradingview_0a31f"></div>
		</div>
	</v-card>
</template>

<script>
export default {
	name: "TradingViewCard",

	mounted() {
		// this.initTradingView();
	},

	methods: {

		initTradingView() {
			// eslint-disable-next-line no-undef
			new TradingView.widget({
				width: '100%',
				height: 300,
				symbol: "BINANCE:ADAUSD",
				interval: "H",
				timezone: "Etc/UTC",
				theme: this.$vuetify.theme.dark ? "dark" : "light",
				style: 3,
				locale: "en",
				toolbar_bg: "#f1f3f6",
				enable_publishing: false,
				hide_top_toolbar: false,
				hide_legend: false,
				save_image: false,
				container_id: "tradingview_0a31f",
			});
		},
	},

	watch: {

		'$vuetify.theme.dark'() {
			this.initTradingView();
		}
	},
}
</script>
