<template>
	<v-dialog v-model="visible" v-bind="$attrs" v-on="$listeners" :max-width="400">
		<v-card>
			<v-card-title class="align-center justify-space-between">
				<span>Donate</span>
				<v-btn @click="visible = false" icon>
					<v-icon>mdi-close</v-icon>
				</v-btn>
			</v-card-title>
			<v-card-text class="pa-8 text-center">
				<p><strong>ADA is accepted as donation</strong> and <u>each lovelace</u> will be stake <u>for at least 10 years</u>. Afterward, it will be used to pay for my goddaughter's university. Thank you for being part of the Cardano family!</p>
				<v-img :src="qrCode" class="mb-4" contain></v-img>
				<h3>addr1qx8fm4wu3vsz5c4v6hes64je2wge2kkv5wqx9dly0tflw9c6e9c8jzeasz3k0y3qme6h6u97ak78vgsl505f8yfg9dsqrr4wdn</h3>
			</v-card-text>
			<v-divider></v-divider>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn @click="visible = false" large text>
					<span>Close</span>
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
import qrCode from '../assets/qr-code.png';

export default {
	name: "DonateDialog",

	props: {

		value: {
			type: Boolean,
			default: false,
		},
	},

	methods: {

		confirm() {

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
			qrCode,
		}
	}
}
</script>
