<template>
	<v-dialog dark v-model="visible" scrollable max-width="600">
		<v-card :color="color">
			<v-card-title class="headline">
				<v-icon slot="icon" size="36" left>mdi-alert-box</v-icon>
				<span v-text="title.length > 64 ? 'General Error' : title"></span>
			</v-card-title>

			<v-card-text v-if="showMessage" class="my-5">
				<h3 v-if="title.length > 64" class="mb-4" v-text="title"></h3>
				<div v-html="message"></div>
			</v-card-text>

			<v-card-actions>
				<v-spacer></v-spacer>

				<v-btn :data-test-selector="'error_handler_btn_' + index" v-for="(button, index) in buttons" :key="index" text @click="button.callback ? buttonCallback(button) : visible = false">
					<span v-text="button.text"></span>
				</v-btn>

				<v-btn v-if="buttons.length === 0" data-test-selector="error_handler_close" text @click="visible = false">
					<span>Close</span>
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
import Vue from 'vue';
import ServerError from "../utils/ServerError";

export default Vue.extend({
	name: 'ErrorHandler',
	props: ['response'],

	methods: {

		close() {
			this.visible = false;
		},

		buttonCallback(button) {
			button.callback(this);
		},

		handleResponse(response) {

			this.showMessage = this.env !== 'production';
			this.buttons = [];
			this.color = 'default';

			if (response instanceof ServerError) {
				this.visible = true;
				this.title = response.title;
				this.message = response.desc;
				this.color = 'error';

				if (response.options) {
					this.buttons = response.options.buttons || [];
				}

				this.showMessage = true;
			} else {
				this.visible = response.message !== undefined;
				this.title = (response.statusCode ? response.statusCode + ': ' : '') + response.message;
				this.message = response.stack;
			}
		},
	},

	watch: {

		response(newVal) {
			this.handleResponse(newVal);
		},
	},

	data() {
		return {
			showMessage: false,
			visible: false,
			buttons: [],
			color: null,
			env: process.env.NODE_ENV,
			title: '',
			message: '',
		};
	},
});
</script>

<style lang="scss" scoped>
	.v-card::v-deep pre {
		padding: 2rem;
		border-radius: 0.25rem;
		background-color: rgba(0, 0, 0, 0.05);
		white-space: pre-wrap;
	}
</style>
