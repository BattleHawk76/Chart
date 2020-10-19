<template>
	<view class="container">
		<div class="Machine">
			<uni-card title="机器" :extra="index" v-for="(item,index) in MachineItemList" :key="index" @click="showChart(item,index)"
			 style="width: 45%;" v-if="item[item.length-1]">
				<div style="font-size: 9px;" >
					<div>
						今日开机率:
						<u-tag :text="(item[item.length-1].availability*100).toFixed(2)+'%'" mode="light" :type="availabilityType(item[item.length-1].availability*100)" size="mini" />
					</div>
					<div>
						今日生产米数:
						<u-tag :text="item[item.length-1].productionMeter+'M'" mode="light" :type="productionMetersType(item[item.length-1].productionMeter)"
						 size="mini" />
					</div>
					<div>
						当前状态:
						<u-tag :text="item[item.length-1].defectCount!=0?'损坏':'正常'" mode="light" :type="statusType(item[item.length-1].defectCount)" size="mini" />
					</div>
					<div>
						最后运行时间:
						<u-tag :text="item[item.length-1].lastChangeStatus" mode="light" size="mini" />
					</div>
					
					<div>
						故障次数:
						<u-tag :text="item[item.length-1].defectCount" mode="light" size="mini" />
					</div>
				</div>

			</uni-card>
		</div>
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
				MachineItemList: [],
				DialogFlag: false,
				details: {},
				hackReset: true
			}
		},
		methods: {
			availabilityType(value) {
				if (value === 0) return 'info'
				if (value <= 30) return 'error'
				if (value <= 60) return 'warning'
				if (value > 60) return 'primary'
			},
			productionMetersType(value) {
				if (value === 0) return 'info'
				if (value <= 300) return 'error'
				if (value <= 600) return 'warning'
				if (value > 600) return 'primary'
			},
			statusType(value) {
				if (value != 0) return 'error'
				else return 'success'
			},
			close(value) {
				this.hackReset = false; //销毁组件
				this.$nextTick(() => {
					this.hackReset = true; //重建组件
				});
			},
			showChart(item,index) {
				uni.navigateTo({
					url: `/pages/chartMessage/chartMessage?message=${JSON.stringify(item)}&index=${JSON.stringify(index)}`,
				});
			}
		},
		created() {
			let id = ''
			let that = this
			this.$ajax({ //如果请求为空数组可能是后端服务器重启了需要请求初始化请求
				url: '/machine/allNumber',
				method: 'GET',
			}).then(res => {
				console.log(res.data)
				res.data.forEach(item => {
					id += item + ','
				})
				console.log(id)
				that.$ajax({ //如果请求为空数组可能是后端服务器重启了需要请求初始化请求
					url: '/DailyData/findAllDailByMachineNums',
					method: 'GET',
					data: {
						machineNums: id
					}
				}).then(res => {
					console.log(res.data)
					that.MachineItemList = res.data
				})
			})
		}
	}
</script>

<style>
	.container {
		font-size: 14px;
		line-height: 24px;
		width: 100%;
		height: 300px;
	}

	.Machine {
		justify-content: center;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}
</style>
