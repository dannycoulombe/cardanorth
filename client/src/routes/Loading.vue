<template>
	<v-app>
		<div class="primary white--text text-center w-100 fill-height d-flex align-center justify-center flex-nowrap">
			<div>
				<img :src="logo" alt="" style="max-height: 5rem" />
				<v-progress-linear class="mt-3" indeterminate color="white"></v-progress-linear>
			</div>
		</div>
	</v-app>
</template>

<script>
import logo from '../assets/logo.png';

export default {
	name: "Loading",

	data() {
		return {
			logo
		}
	}
}
</script>
