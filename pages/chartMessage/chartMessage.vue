<template>
	<view>
		<uni-segmented-control :values="items" @clickItem="onClickItem" style-type="text" active-color="#0ba2d9"></uni-segmented-control>
		<mypie ref="mypie" :chartName="id" :title="'机器'+id+'运行状态'" :canvasId="id+'pieId1'"></mypie>
		<myline ref="myline" :chartName="id" :title="'机器'+id+'开机率'" :canvasId="id+'lineId1'"></myline>
		<myzhu ref="myzhu" :chartName="id" :title="'机器'+id+'生产米数'" :canvasId="id+'barId1'"></myzhu>
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
				details: {},
				items: ['周', '月', '季度', '年'],
				id:''
			}
		},
		methods: {
			onClickItem(item) {
				console.log(item)
				let index = item.currentIndex
				if (index == 0) {
					console.log('周')
				} else if (index == 1) {
					console.log('月')
				} else if (index == 2) {
					console.log('季度')
				} else {
					console.log('年')
				}
			}
		},
		onLoad(option) {
			this.details = JSON.parse(option.message)
			this.id=JSON.parse(option.index)
			console.log(111)
			console.log(this.details)
		},
		onReady() {
			this.$refs.mypie.chartStart(this.details);
			this.$refs.myline.chartStart(this.details);
			this.$refs.myzhu.chartStart(this.details);
		}
	}
</script>

<style>

</style>
