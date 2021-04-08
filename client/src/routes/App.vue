<template>
	<v-app>

		<!-- GENERAL COMPONENTS -->
		<ErrorHandler :response="$root.error"></ErrorHandler>

		<v-sheet class="fill-height d-flex flex-column" color="background" :dark="$vuetify.theme.dark" tile>
			<Toolbar style="flex: 0" />
			<router-view style="flex: 1"></router-view>
			<Footer style="flex: 0" />
		</v-sheet>
	</v-app>
</template>

<script>
import Error404 from "./Error404";
import Trends from "./App/Trends";
import News from "./App/News";
import Event from "./App/Event";
import Roadmap from "./App/Roadmap";
import Ecosystem from "./App/Ecosystem";
import ErrorHandler from "../components/ErrorHandler";
import Toolbar from "../components/Toolbar";
import Discover from "./App/Discover";
import Footer from "../components/Footer";

export const routes = [
	{ path: '/', redirect: '/trends' },
	{ path: '/trends', component: Trends, name: 'trends', },
	{ path: '/news/:slug', component: News, name: 'news', },
	{ path: '/event/:slug', component: Event, name: 'event', },
	{ path: '/roadmap', component: Roadmap, name: 'roadmap', },
	{ path: '/ecosystem', component: Ecosystem, name: 'ecosystem', },
	{ path: '/discover', component: Discover, redirect: '/discover/all' },
	{ path: '/discover/:type', component: Discover, name: 'discover', },
	{ path: '*', component: Error404, name: 'error404', },
];

export default {
	name: 'App',

	components: { ErrorHandler, Toolbar, Footer, },

	created() {
		this.$router.onError(error => {
			this.$handleError(this, error);
		});
	},

	mounted() {

		let tvScript = document.createElement('script');
		tvScript.setAttribute('src', 'https://s3.tradingview.com/tv.js');
		document.head.appendChild(tvScript);
		// tvScript.onload = () => this.tvLoaded;
	},
};
</script>
