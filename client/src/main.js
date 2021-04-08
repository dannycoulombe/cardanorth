import Vue from 'vue'
import App, { routes as appRoutes } from './routes/App.vue'
import Loading from './routes/Loading.vue'
import vuetify from './plugins/vuetify';
import VueRouter from 'vue-router';
import moment from 'moment';
import Error from './utils/Error';
import globalVariables from "./global";
import './filters';
import './styles/index.scss';

Vue.config.productionTip = false
Vue.use(VueRouter);
Vue.use(Error);

let component = Loading;
let routes = [];

const callback = () => {

	const router = new VueRouter({
		routes,
	});

	new Vue({
		vuetify,
		router,
		data: {
			...globalVariables
		},
		render: h => h(component)
	}).$mount('#app');
};

const gotoApp = () => {
	component = App;
	routes = appRoutes;
	callback();
};

const gotoLoading = () => {
	component = Loading;
	routes = [];
	callback();
};

gotoLoading();
setTimeout(() => gotoApp(), 1000);

Vue.prototype.$deepClone = function(obj) {
	return JSON.parse(JSON.stringify(obj));
};
Vue.prototype.$moment = moment;
