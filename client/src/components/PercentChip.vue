<template>
	<v-chip :color="value >= 0 ? 'success' : 'error'" class="ml-4" label>
		<span :class="value >= 0 ? 'up' : 'down'"></span>
		<span class="ml-2" v-text="$options.filters.toPercentage(value, 2, false)"></span>
	</v-chip>
</template>

<script>
export default {
	name: "PercentChip",

	props: {

		value: {
			type: Number,
			default: 0,
		},
	},
}
</script>

<style lang="scss" scoped>
.up, .down {
	width: 0;
	height: 0;
	border-left: 0.5em solid transparent;
	border-right: 0.5em solid transparent;
}
.up {
	border-bottom: 0.75em solid white;
}
.down {
	border-top: 0.75em solid white;
}
</style>
