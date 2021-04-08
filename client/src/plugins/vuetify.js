import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
	theme: {
		themes: {
			light: {
				primary: '#3468d1',
				secondary: '#ccc',
				background: '#EEE',
			},
			dark: {
				primary: '#3468d1',
				secondary: '#444',
				background: '#222',
			},
		},
	},
});
