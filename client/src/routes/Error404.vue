<template>
	<v-sheet color="transparent" class="d-flex flex-column align-center justify-center">
		<v-scale-transition>
			<v-icon v-if="seqAnim[0]" x-large>mdi-alert</v-icon>
		</v-scale-transition>
		<v-slide-x-transition>
			<h1 v-if="seqAnim[1]">ERROR 404</h1>
		</v-slide-x-transition>
		<v-slide-x-transition>
			<p v-if="seqAnim[2]">The page you are looking for does not exists.</p>
		</v-slide-x-transition>
	</v-sheet>
</template>

<script>
import SequencedAnimation from "../mixins/SequencedAnimation";

export default {
	name: "Error404",

	mixins: [ SequencedAnimation(3, 100) ],
}
</script>
