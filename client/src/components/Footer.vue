<template>
	<v-footer class="justify-space-between">
		<small>
			<strong>Charles</strong>, I'm looking for a front-end dev job.
		</small>
		<small style="opacity: 0.5">
			addr1qx8fm4wu3vsz5c4v6hes64je2wge2kkv5wqx9dly0tflw9c6e9c8jzeasz3k0y3qme6h6u97ak78vgsl505f8yfg9dsqrr4wdn
		</small>
		<small>
			&copy; {{ year }} <a href="https://www.coulombe.dev" target="_blank">Coulombe</a> - All rights reserved.
		</small>
	</v-footer>
</template>

<script>
export default {
	name: "Footer",

	computed: {

		year() {
			const now = new Date();
			if (now.getFullYear() > 2021) {
				return '2021-' + now.getFullYear();
			}
			return now.getFullYear();
		},
	},
}
</script>

<style scoped>

</style>
