<template>
	<view class="container">
		sadasdas
		<div class="Machine">
			<uni-card title="机器" thumbnail="" :extra="item.name" note="Tips" v-for="(item,index) in MachineItemList" :key="index"
			 @click="showDialog(item)">
				今日开机率 {{item.availability}}<br>
				今日生产米数 {{item.productionMeters}}<br>
				当前状态 {{item.status}}<br>
				状态更新时间 {{item.statusUpdateTime}}<br>
				<view slot="footer">详情点击</view>
			</uni-card>
		</div>
		<u-popup v-model="DialogFlag" mode="center" border-radius="14" width="80%" class="Machine">
			<view>
				今日开机率 {{details.availability}}<br>
				今日生产米数 {{details.productionMeters}}<br>
				当前状态 {{details.status}}<br>
				状态更新时间 {{details.statusUpdateTime}}<br>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		components: {

		},
		data() {
			return {
				MachineItemList: [{ //后端传来的数据.此时为模拟数据
						name: 1,
						availability: '30%',
						productionMeters: '100M',
						status: 'fine',
						statusUpdateTime: '11:15:32'
					},
					{
						name: 2,
						availability: '20%',
						productionMeters: '100M',
						status: 'fine',
						statusUpdateTime: '11:15:32'
					},
					{
						name: 3,
						availability: '50%',
						productionMeters: '100M',
						status: 'fine',
						statusUpdateTime: '11:15:32'
					},
					{
						name: 4,
						availability: '60%',
						productionMeters: '100M',
						status: 'fine',
						statusUpdateTime: '11:15:32'
					},
					{
						name: 5,
						availability: '80%',
						productionMeters: '100M',
						status: 'fine',
						statusUpdateTime: '11:15:32'
					},
					{
						name: 6,
						availability: '100%',
						productionMeters: '100M',
						status: 'fine',
						statusUpdateTime: '11:15:32'
					},
				],
				DialogFlag:false,
				details:{
				}
			}
		},
		methods: {
			showDialog(item) {
				this.DialogFlag=true
				this.details=item
			}
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
		align-items: center;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}
</style>
