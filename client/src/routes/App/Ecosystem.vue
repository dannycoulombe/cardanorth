<template>
	<v-sheet class="fill-height" color="background">
		<div ref="container" style="height: calc(100% - 50px)"></div>
	</v-sheet>
</template>

<script>
import vis from 'visjs-network';
import Query from '../../utils/Query';
import logo from '../../assets/logo.png';

export default {
	name: "Ecosystem",

	beforeRouteEnter(to, from, next) {
		Promise.all([
			Query.get('/items/ecosystem'),
		]).then(([nodes]) => {
			Object.assign(to.meta, { nodes });

			to.meta.loading = false;
			next();
		})
		// .catch(error => {
		// 	this.$handleError(this, error);
		// });
	},

	created() {

		const types = [...new Set(this.nodes.data.map(node => node.type))].map(node => ({
			shape: 'box',
			label: node,
			id: 'TYPE_' + node,
			color: {
				background: this.$vuetify.theme.themes.light.secondary,
			},
		}));

		let nodes = this.nodes.data.map(node => ({
			...node,
			shape: 'image',
			label: node.title,
			image: this.assetPrefix + node.logo + '?fit=contain&width=256&&quality=80',
		})).concat(types).concat([{
			id: 'CARDANO',
			shape: 'circularImage',
			label: 'Cardano',
			image: logo,
			size: 48,
		}]);

		const edges = this.nodes.data.map(node => ({
			from: 'TYPE_' + node.type,
			to: node.id,
		})).concat(types.map(type => ({
			from: 'CARDANO',
			to: type.id,
		})));

		this.nodes.data.map(node => {
			node.edges.forEach(edge => {
				edges.push({
					from: node.id,
					to: edge,
				});
			});
		});

		this.data = {
			nodes: new vis.DataSet(nodes),
			edges: new vis.DataSet(edges),
		};

		this.views = {
			nodes: new vis.DataView(this.data.nodes),
			edges: new vis.DataView(this.data.edges),
		};
	},

	mounted() {
		this.initChart();
	},

	methods: {

		initChart() {
			const options = {
				layout: {
					improvedLayout: true
				},
				interaction: {
					hideEdgesOnZoom: true
				},
				nodes: {
					// shape: 'dot',
					size: 16,
					font: {
						size: 16,
						color: this.$vuetify.theme.dark ? 'white' : 'black',
					},
					color: {
						border: this.$vuetify.theme.themes.light.secondary,
						background: 'white',
						highlight: {
							border: this.$vuetify.theme.themes.light.primary,
							background: 'white',
						}
					},
					borderWidth: 2,
					shadow: false,
					shapeProperties: {
						interpolation: false    // 'true' for intensive zooming
					}
				},
				edges: {
					width: 2,
					shadow: false,
					smooth: {
						type: 'continuous'
					},
				},
				physics: {
					enabled: true,
					stabilization: {
						enabled: false
					},
					timestep: .5,
					adaptiveTimestep: true,
					solver: 'forceAtlas2Based',
					forceAtlas2Based: {
						damping: 0.6,
						springConstant: .1,
						gravitationalConstant: -100,
						avoidOverlap: 1
					}
				},
			};

			setTimeout(() => {
				this.network = new vis.Network(this.$refs.container, this.views, options);
			});
		},
	},

	data() {
		return {
			assetPrefix: 'http://localhost:8055/assets/',
			loading: true,
			network: null,
			data: {
				nodes: {},
				edges: {},
			},
			views: {
				nodes: {},
				edges: {},
			},
			...this.$route.meta,
		};
	},

	watch: {

		'$vuetify.theme.dark'() {
			this.initChart();
		}
	},
}
</script>
