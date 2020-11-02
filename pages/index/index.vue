<template>
	<view class="container">
		<u-picker v-model="factoryShow" mode="selector" :range="factorySelector" range-key="cateName" @confirm="factoryConfirm"></u-picker>
		<u-button @click="factoryShow = true">{{Factory}}</u-button>
		<div class="Machine">
			<u-card :title="'机器'+index" v-for="(item,index) in MachineItemList" :key="index" @body-click="showChart(item,index)"
			 @head-click="showChart(item,index)" @foot-click="showOrder(index)" v-if="item[item.length-1]" style="width: 50%;">
				<div style="font-size: 9px;display: flex;" slot="body">
					<div >
						<div>
							今日开机率:
						</div>
						<div>
							今日生产米数:
						</div>
						<div>
							当前状态:
						</div>
						<div>
							最后运行时间:
						</div>
					</div>
					<div style="width: 30rpx;"></div>
					<div style="float: right;">
						<div>
							<u-tag :text="(item[item.length-1].availability).toFixed(2)+'%'" mode="light" :type="availabilityType(item[item.length-1].availability)"
							 size="mini" />
						</div>
						<div>
							<u-tag :text="item[item.length-1].productionMeter+'M'" mode="light" :type="productionMetersType(item[item.length-1].productionMeter)"
							 size="mini" />
						</div>
						<div>
							<u-tag :text="item[item.length-1].defectCount!=0?'损坏':'正常'" mode="light" :type="statusType(item[item.length-1].defectCount)"
							 size="mini" />
						</div>
						<div>
							<u-tag :text="(item[item.length-1].lastChangeStatus.trim().split(/\s+/)[0] == today)?item[item.length-1].lastChangeStatus.trim().split(/\s+/)[1]:(item[item.length-1].lastChangeStatus.trim().split(/\s+/)[0]).slice(5)" mode="light" size="mini" />
						</div>
					</div>
				</div>
				<div slot="foot" style="display: flex;justify-content: center;">
					工单信息
				</div>

			</u-card>
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
				hackReset: true,
				factorySelector: [{
					cateName: 'A厂',
					id: 1
				}, {
					cateName: 'B厂',
					id: 2
				}, ],
				factoryShow: false,
				Factory:'A厂',
				today:''
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
			showChart(item, index) {
				uni.navigateTo({
					url: `/pages/chartMessage/chartMessage?message=${JSON.stringify(item)}&index=${JSON.stringify(index)}`,
				});
			},
			showOrder(index) {
				uni.navigateTo({
					url: `/pages/ProcessListInformation/ProcessListInformation?id=${JSON.stringify(index)}`,
				});
			},
			factoryConfirm(e) {
				this.Factory=this.factorySelector[e].cateName
			}
		},
		created() {
			let id = ''
			let that = this
			this.$ajax({ //如果请求为空数组可能是后端服务器重启了需要请求初始化请求
				url: '/machine/allNumber',
				method: 'GET',
			}).then(res => {
				res.data.forEach(item => {
					id += item + ','
				})
				that.$ajax({ //如果请求为空数组可能是后端服务器重启了需要请求初始化请求
					url: '/DailyData/findAllDailByMachineNums',
					method: 'GET',
					data: {
						'machineNums': id
					}
				}).then(res => {
					console.log(res.data)
					that.MachineItemList = res.data
				})
			})
			this.today= new Date().toISOString().slice(0, 10)
			console.log(this.today)
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

	.footer-box {
		display: flex;
		flex-wrap:wrap;
	}
</style>
