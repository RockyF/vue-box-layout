<template>
	<div ref="wrapper" class="wrapper">

	</div>
</template>

<script>
	import Vue from "vue/dist/vue.esm.js";
	import Vuex from 'vuex';

	import {boxlayout,} from '../libs/boxlayout/boxlayout.js'
	import '../libs/boxlayout/theme.css'
	import {PaneDom} from "./Pane";

	export default {
		name: "BoxLayout",
		props: {
			defaultLayoutConfig: {
				type: Object,
			},
			panesConfig: {
				type: Array,
			},
			layoutConfigStoreKey: {
				type: String,
				default: 'workbench',
			}
		},
		data() {
			return {}
		},
		mounted() {
			let boxContainer = this.boxContainer = new boxlayout.BoxLayout();

			let configStr = localStorage.getItem(this.layoutConfigStoreKey);
			let boxLayoutConfig = configStr ? JSON.parse(configStr) : this.defaultLayoutConfig;

			let containers = {};
			for (let paneConfig of this.panesConfig) {
				const {id, name, icon} = paneConfig;
				let containerEl = document.createElement('div');
				containers[id] = containerEl;
				let pane = new PaneDom(id, name, containerEl, icon);
				boxContainer.registPanel(pane);
			}

			let container = this.$refs.wrapper;
			container.className = 'wrapper eui-default';
			boxContainer.init(container, {});

			boxContainer.addEventListener(boxlayout.BoxLayoutEvent.CONFIG_CHANGED, this.saveLayoutConfig, this);

			boxContainer.applyLayoutConfig(boxLayoutConfig);

			Vue.use(Vuex);
			for (let config of this.panesConfig) {
				if (config.def) {
					new Vue({
						components: {Pane: config.def},
						store: this.$store,
						template: `<Pane/>`
					}).$mount(containers[config.id]);
				}
			}
		},
		methods: {
			saveLayoutConfig() {
				let config = this.boxContainer.getLayoutConfig();
				let configStr = JSON.stringify(config);

				localStorage.setItem(this.layoutConfigStoreKey, configStr);
			}
		}

	}
</script>

<style scoped>
	.wrapper {
		width: 100%;
		height: 100%;
	}
</style>