<template>
	<view>
		<mypie ref="mypie" :chartName="details.name" :title="'机器'+details.name+'运行状态'" :canvasId="details.name+'pieId1'"></mypie>
		<myline ref="myline" :chartName="details.name" :title="'机器'+details.name+'开机率'" :canvasId="details.name+'lineId1'"></myline>
		<myzhu ref="myzhu" :chartName="details.name" :title="'机器'+details.name+'生产米数'" :canvasId="details.name+'barId1'"></myzhu>
	</view>
</template>

<script>
	import mypie from '../../components/pieChart/pieChart.vue'
	import myline from '../../components/lineChart/lineChart.vue'
	import myzhu from '../../components/columnChart/columnChart.vue'
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
			this.details = JSON.parse(option.message)
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
