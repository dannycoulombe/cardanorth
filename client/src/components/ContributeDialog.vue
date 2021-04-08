<template>
	<v-dialog v-model="visible" v-bind="$attrs" v-on="$listeners" :max-width="600">
		<v-form v-model="formIsValid" @submit.prevent="send">
			<v-card>
				<v-card-title class="align-center justify-space-between">
					<span>Contribute</span>
					<v-btn @click="visible = false" icon>
						<v-icon>mdi-close</v-icon>
					</v-btn>
				</v-card-title>
				<v-card-text class="pa-8">
					<p>Have I missed something? Please let me know:</p>

					<v-text-field v-model="data.email" :rules="[rules.required, rules.email]" label="Email address" outlined />
					<v-textarea v-model="data.message" :rules="[rules.required, rules.min]" label="Message" outlined />
				</v-card-text>
				<v-divider></v-divider>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn type="submit" color="primary" :disabled="!formIsValid" large>
						<span>Send</span>
					</v-btn>
					<v-btn @click="visible = false" large text>
						<span>Cancel</span>
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-form>
	</v-dialog>
</template>

<script>
import Rules from '../utils/Rules';

export default {
	name: "ContributeDialog",

	props: {

		value: {
			type: Boolean,
			default: false,
		},
	},

	methods: {

		send() {
			this.visible = false;
		},

		cancel() {
			this.visible = false;
		},
	},

	computed: {

		visible: {

			get() {
				return this.value;
			},

			set(value) {
				this.$emit('input', value);
			},
		}
	},

	data() {
		return {
			formIsValid: false,
			data: {
				email: '',
				message: '',
			},
			rules: {
				required: value => Rules.required(value) || 'This field is required',
				email: value => Rules.email(value) || 'The email format is invalid',
				min: value => Rules.min(16, value) || 'Please enter at least 16 characters',
			},
		}
	}
}
</script>
