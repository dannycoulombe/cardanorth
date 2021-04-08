<template>
	<v-sheet color="transparent" class="fill-height d-flex flex-column px-3 py-5">
		<v-slide-y-reverse-transition>
			<v-card v-if="seqAnim[0]" class="mb-6" :height="300">
				<div ref="container"></div>
			</v-card>
		</v-slide-y-reverse-transition>
		<v-slide-y-reverse-transition>
			<v-card v-if="seqAnim[1]" style="flex: 1">
				asdasd
			</v-card>
		</v-slide-y-reverse-transition>
	</v-sheet>
</template>

<script>
import { DataSet, Timeline } from "vis-timeline/standalone";
import SequencedAnimation from "../../mixins/SequencedAnimation";

export default {
	name: "Roadmap",

	mixins: [ SequencedAnimation(2, 100) ],

	mounted() {

		const items = new DataSet([
			{id: 1, content: 'item 1', start: '2014-04-20'},
			{id: 2, content: 'item 2', start: '2014-04-14'},
			{id: 3, content: 'item 3', start: '2014-04-18'},
			{id: 4, content: 'item 4', start: '2014-04-16', end: '2014-04-19'},
			{id: 5, content: 'item 5', start: '2014-04-25'},
			{id: 6, content: 'item 6', start: '2014-04-27', type: 'point'}
		]);

		const options = {
			height: 300,
		};
		this.timeline = new Timeline(this.$refs.container, items, options);
	},

	data() {
		return {
			timeline: null,
		}
	},
}
</script>
