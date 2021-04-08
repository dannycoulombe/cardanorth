<template>
	<v-toolbar>

		<DonateDialog v-model="donate" />
		<ContributeDialog v-model="contribute" />

		<v-btn to="/" text x-large>
			<v-img :src="logo" :max-width="42" contain></v-img>
			<v-toolbar-title class="ml-4">Cardanorth</v-toolbar-title>
		</v-btn>

		<v-tabs align-with-title>
			<v-tab to="/trends">Trends</v-tab>
			<v-tab to="/roadmap">Roadmap</v-tab>
			<v-tab to="/ecosystem">Ecosystem</v-tab>
			<v-tab to="/discover">Discover</v-tab>
		</v-tabs>

		<v-spacer />

		<v-btn @click="handleDonateClick()" small text>
			<span>Donate</span>
		</v-btn>

		<v-btn @click="handleContributeClick()" small text>
			<span>Contribute</span>
		</v-btn>

		<v-btn @click="handleLightDarkClick()" text>
			<v-icon>mdi-theme-light-dark</v-icon>
		</v-btn>
	</v-toolbar>
</template>

<script>
import logo from '../assets/logo.png';
import DonateDialog from "./DonateDialog";
import ContributeDialog from "./ContributeDialog";

export default {
	name: "Toolbar",

	components: { DonateDialog, ContributeDialog, },

	methods: {

		handleLightDarkClick() {
			this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
		},

		handleDonateClick() {
			this.donate = true;
		},

		handleContributeClick() {
			this.contribute = true;
		},
	},

	data() {
		return {
			logo,
			donate: false,
			contribute: false,
		};
	},
}
</script>
