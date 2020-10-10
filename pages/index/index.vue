<template>
	<view class="container">
		<div class="Machine">
			<uni-card title="机器" :extra="item.name" v-for="(item,index) in MachineItemList" :key="index" @click="showChart(item)"
			 style="width: 45%;">
				<div style="font-size: 9px;">
					<div>
						今日开机率:
						<u-tag :text="item.availability+'%'" mode="light" :type="availabilityType(item.availability)" size="mini" />
					</div>
					<div>
						今日生产米数:
						<u-tag :text="item.productionMeters+'M'" mode="light" :type="productionMetersType(item.productionMeters)" size="mini" />
					</div>
					<div>
						当前状态:
						<u-tag :text="item.status" mode="light" :type="statusType(item.status)" size="mini" />
					</div>
					<div>
						运行时间:
						<u-tag :text="item.statusUpdateTime" mode="light" size="mini" />
					</div>
					<div>
						故障次数:
						<u-tag :text="item.DefectCount" mode="light" size="mini" />
					</div>
				</div>

			</uni-card>
		</div>
		<u-popup v-model="DialogFlag" mode="center" border-radius="14" width="95%" class="Machine" closeable='true' @close="close">
			<view ref='Chart' v-if="hackReset">
				<scroll-view scroll-y="true" style="height: 95vh;">
					<mypie ref="mypie" :chartName="details.name" :title="'机器'+details.name+'运行状态'" :canvasId="details.name+'canvasId'" v-show="DialogFlag"></mypie>
					<myline ref="myline" :chartName="details.name" :title="'机器'+details.name+'开机率'" :canvasId="details.name+'canvasId'" v-show="DialogFlag"></myline>
					<myzhu ref="myzhu" :chartName="details.name" :title="'机器'+details.name+'生产米数'" :canvasId="details.name+'canvasId'" v-show="DialogFlag"></myzhu>
				</scroll-view>
			</view>
		</u-popup>
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
				hackReset:true
			}
		},
		methods: {
			showDialog(item) {
				this.details = item
				this.DialogFlag = true
				this.$refs.mypie.chartStart(this.details.name);
				this.$refs.myline.chartStart(this.details.name);
				this.$refs.myzhu.chartStart(this.details.name);

			},
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
				if (value != 'fine') return 'error'
				else return 'success'
			},
			close(value) {
				this.hackReset = false; //销毁组件
				this.$nextTick(() => {
					this.hackReset = true; //重建组件
				});
			},
			showChart(item) {
				console.log(item)
				uni.navigateTo({
					url: `/pages/chartMessage/chartMessage?message=${JSON.stringify(item)}`,
				});
			}
		},
		created() {
			this.$ajax('/Machine/gettodaybynumbers',{numbers:'1,2,3,4,5,6,lqq,sw'}).then(res => {
				console.log(res.data)
				let list
				list=res.data
				//下面的代码是数组重命名
				list=JSON.parse(JSON.stringify(list).replace(/number/g, 'name')) 
				list=JSON.parse(JSON.stringify(list).replace(/ProductionMeter/g, 'productionMeters')) 
				list=JSON.parse(JSON.stringify(list).replace(/runningTime/g, 'statusUpdateTime')) 
				this.MachineItemList=list
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
