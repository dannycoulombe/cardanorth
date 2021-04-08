const SequencedAnimation = (amount = 5, delay = 100) => ({

	created() {
		for(let i = 0; i < amount; i++) {
			this.seqAnim.push(false);
		}
	},

	mounted() {

		for(let i = 0; i < amount; i++) {
			setTimeout(() => {
				this.seqAnim[i] = true;
				this.$forceUpdate();
			}, delay * i);
		}

	},

	data() {
		return {
			seqAnim: [],
		}
	},
});

export default SequencedAnimation;
