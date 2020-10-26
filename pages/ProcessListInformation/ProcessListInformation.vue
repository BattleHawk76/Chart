<template>
	<div>
		<u-collapse ref="collapse" v-if="WorkOrderList.length != 0">
			<u-collapse-item title="工艺单信息" :open='true'>
				<div style="padding: 30rpx;">
					工艺单编号:{{processSheet.number}}
				</div>
				<div style="padding: 30rpx;">
					面梳:{{processSheet.comb}}
				</div>
				<div style="padding: 30rpx;">
					门幅数:{{processSheet.doorWidthQuantity}}
				</div>
				<div style="padding: 30rpx;">
					产品:{{processSheet.product.name}}
				</div>
				<div style="padding: 30rpx;">
					物料:{{processSheet.rawMaterial.name}}
				</div>
				<div style="padding: 30rpx;">
					工艺师傅:{{processSheet.user.name}}
				</div>
			</u-collapse-item>
			<u-collapse-item title="生产单信息">
				<div style="padding: 30rpx;">
					生产单编号:{{productOrder.id}}
				</div>
				<div style="padding: 30rpx;">
					创建时间:{{productOrder.createTime}}
				</div>
				<div style="padding: 30rpx;">
					创建者:{{processSheet.user.name}}
				</div>
				<div style="padding: 30rpx;">
					客户姓名:{{contact[0]}}
				</div>
				<div style="padding: 30rpx;">
					联系方式:{{contact[1]}}
				</div>
				<div :style="'padding-left: 30rpx;height:'+ 100*MachineDivHeight +'rpx'">
					<u-collapse>
						<u-collapse-item title="机台项" @change="openMachine($event,3)">
							<div style="padding: 30rpx;">
								机台编号:{{machine.id}}
							</div>
							<div style="padding: 30rpx;">
								机台:{{machineId}}
							</div>
						</u-collapse-item>
					</u-collapse>
				</div>
			</u-collapse-item>
			<u-collapse-item title="工单信息">
				<div style="padding: 30rpx;">
					工单编号:{{WorkOrderList.id}}
				</div>
				<div style="padding: 30rpx;">
					机台编号:{{machine.id}}
				</div>
				<div :style="'padding: 30rpx;height:'+ 100*WorkerDivHeight +'rpx;'">
					<u-collapse>
						<u-collapse-item title="负责工人" @change="openWorker($event,workerList.length+1)">
							<div style="padding: 30rpx;" v-for="(item,index) in workerList">
								{{item.name}}
							</div>
						</u-collapse-item>
					</u-collapse>
				</div>
			</u-collapse-item>
		</u-collapse>
		<u-toast ref="uToast" />
	</div>
</template>

<script>
	export default {
		data() {
			return {
				machineId: -1,
				workerList: [{
						'name': '张三'
					},
					{
						'name': '李四'
					},
					{
						'name': '王五'
					},
				],
				MachineDivHeight: 1, //控制折叠面板的高度
				WorkerDivHeight: 1, //控制折叠面板的高度
				WorkOrderList: [], //工单数组
				processSheet: [], //工艺单
				productOrder: [], //生产单
				machine: [], //机器数据
				contact: [], //客户
				toastFlag: false,
			}
		},
		watch: {
			toastFlag(newVal, oldVal) {//监听flag如果flag值变了立马执行弹窗提醒然后跳转上一页
				this.$refs.uToast.show({
					position: 'top',
					title: '当前没有工单',
					type: 'error',
					back: true
				})
			}
		},
		methods: {
			openMachine(e, height) {
				if (height > 1 & e.show == true) {
					this.MachineDivHeight = height
				}
				if (e.show == false) {
					this.MachineDivHeight = 1
				}
				this.$nextTick(this.$refs.collapse.init())
			},
			openWorker(e, height) {
				if (height > 1 & e.show == true) {
					this.WorkerDivHeight = height
				}
				if (e.show == false) {
					this.WorkerDivHeight = 1
				}
				this.$nextTick(this.$refs.collapse.init())
			},
		},
		onLoad(option) {
			console.log(JSON.parse(option.id))
			this.machineId = JSON.parse(option.id)
			this.$ajax({ //如果请求为空数组可能是后端服务器重启了需要请求初始化请求
				url: '/workOrder/findByMachineNumber',
				method: 'GET',
				data: {
					'number': this.machineId,
				}
			}).then(res => {
				this.WorkOrderList = res.data //工单数组
				if (this.WorkOrderList.length == 0) {//看工单数组是否为空,如果为空控制flag让他变为true
					this.toastFlag = true
				}
				this.productOrder = this.WorkOrderList.productOrder //生产单
				this.processSheet = this.productOrder.processSheet //工艺单
				this.machine = this.WorkOrderList.machine
				this.contact = this.productOrder.customer.contact.trim().split(/\s+/)
				
				
			})
		}
	}
</script>

<style>

</style>
