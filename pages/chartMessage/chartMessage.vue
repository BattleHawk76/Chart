<template>
	<view>
		<mypie ref="mypie" :pieData="pieData" :chartName="details.name" :title="'机器'+details.name" :canvasId="details.name+'canvasId'"></mypie>
		<myline ref="myline" :chartName="details.name"></myline>
		<myzhu ref="myzhu" :chartName="details.name"></myzhu>
	</view>
</template>

<script>
	import mypie from '../../components/pie/pie.vue'
	import myline from '../../components/line/line.vue'
	import myzhu from '../../components/zhu/zhu.vue'

	export default {
		components: {
			mypie,
			myline,
			myzhu
		},
		data() {
			return {
				details: {}
			}
		},
		methods: {

		},
		onLoad(option) {
			this.details = JSON.parse(option.item)
			console.log(this.details)
		},
		onReady() {
			this.$refs.mypie.chartStart(this.details.name);
			this.$refs.myline.chartStart(this.details.name);
			this.$refs.myzhu.chartStart(this.details.name);
		}
	}
</script>

<style>

</style>
