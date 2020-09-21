<template>
	<view class="container">
		<div class="Machine">
			<uni-card title="机器" thumbnail="" :extra="item.name" note="详情点击" v-for="(item,index) in MachineItemList" :key="index"
			 @click="showDialog(item)" style="width: 45%;">
				<div>
					今日开机率:
					<u-tag :text="item.availability+'%'" mode="light" :type="availabilityType(item.availability)" size="mini" />
				</div>
				<div>
					今日生产米数 {{item.productionMeters}}
				</div>
				<div>
					当前状态 {{item.status}}
				</div>
				<div>
					状态更新时间 {{item.statusUpdateTime}}
				</div>
				
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
						name: '1',
						availability: 30,
						productionMeters: 100,
						status: 'fine',
						statusUpdateTime: '11:15:32'
					},
					{
						name: '2',
						availability: 30,
						productionMeters: 100,
						status: 'fine',
						statusUpdateTime: '11:15:32'
					},
					{
						name: '3',
						availability: 60,
						productionMeters: 100,
						status: 'fine',
						statusUpdateTime: '11:15:32'
					},
					{
						name: '4',
						availability: 40,
						productionMeters: 100,
						status: 'fine',
						statusUpdateTime: '11:15:32'
					},
					{
						name: '5',
						availability: 80,
						productionMeters: 100,
						status: 'fine',
						statusUpdateTime: '11:15:32'
					},
					{
						name: '6',
						availability: 100,
						productionMeters: 100,
						status: 'fine',
						statusUpdateTime: '11:15:32'
					},
				],
				DialogFlag: false,
				details: {},
				
			}
		},
		methods: {
			showDialog(item) {
				this.DialogFlag = true
				this.details = item
			},
			availabilityType(value){
				if(value===0)return 'info'
				if(value<=30)return 'error'
				if(value<=60)return 'warning'
				if(value>=80)return 'primary'
			}
		},

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
