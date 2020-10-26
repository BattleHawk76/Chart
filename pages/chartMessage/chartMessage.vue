<template>
	<view>
		<uni-segmented-control :values="items" @clickItem="onClickItem" style-type="text" active-color="#0ba2d9"></uni-segmented-control>
		<u-picker v-model="yearShow" mode="time" :params="yearParams" @confirm="yearConfirm"></u-picker>
		<u-button @click="yearShow = true" v-if="index==4">选择年份</u-button>
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
				items: ['日', '周', '月', '季度', '年'],
				id: '',
				yearShow: false,
				index: -1,
				yearParams: {
					year: true,
					month: false,
					day: false,
					hour: false,
					minute: false,
					second: false
				}
			}
		},
		methods: {
			onClickItem(item) {
				console.log(item)
				this.index = item.currentIndex
				if (this.index == 0) {
					this.againReady(this.details)
				} else if (this.index == 1) {
					this.$ajax({
						url: '/DailyData/findOneWeekDailByNumber',
						method: 'GET',
						data: {
							'machineNum': this.id,
						}
					}).then(res => {
						console.log(res.data)
						this.againReady(res.data)
						console.log('周')
					})
				} else if (this.index == 2) {
					this.$ajax({
						url: '/DailyData/findOneMonthDailByNumber',
						method: 'GET',
						data: {
							'machineNum': this.id,
						}
					}).then(res => {
						console.log(res.data)
						this.againReady(res.data)
						console.log('月')
					})
					//console.log('月')
				} else if (this.index == 3) {
					//console.log('季度')
				} else if (this.index == 4) {
					this.againReady('')
				}
			},
			againReady(details) {
				this.$refs.mypie.chartStart(details);
				this.$refs.myline.chartStart(details);
				this.$refs.myzhu.chartStart(details);
			},
			yearConfirm(e){
				console.log(e)
				this.$ajax({
					url: '/DailyData/findOneYearDailByNumber',
					method: 'GET',
					data: {
						'machineNum': this.id,
						'year':e.year
					}
				}).then(res => {
					console.log(res.data)					
				})
			}
		},
		onLoad(option) {
			this.details = JSON.parse(option.message)
			this.id = JSON.parse(option.index)
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
