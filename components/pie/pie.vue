<template>
	<view class="qiun-columns">
		<view class="qiun-bg-white qiun-title-bar qiun-common-mt">
			<view class="qiun-title-dot-light">{{title}}</view>
		</view>
		<view class="qiun-charts qiun-rows">
			<canvas :canvas-id="canvasId" :id="canvasId" class="charts-pie" @touchstart="touchPie"></canvas>
		</view>

	</view>
</template>

<script>
	import uCharts from '../u-charts/u-charts.js';

	export default {
		name: 'pie',
		data() {
			return {
				cWidth: '',
				cHeight: '',
				pixelRatio: 1,
				serverData: '',
				piearr: [],
				_self: null,
				canvaPie: null
			}
		},
		props: {
			title: '',
			canvasId: '',
			chartName: null,
		},
		methods: {
			chartStart(name){
				this._self = this;
				this.cWidth = uni.upx2px(750);
				this.cHeight = uni.upx2px(500);
				this.chartName=name
				console.log('lqq'+this.chartName)
				this.getServerData();
			},
			getServerData() {
				if (this.chartName === null) {
					var Pie = {
						"series": [{
							"name": "总上料",
							"data": 500
						}, {
							"name": "总落布",
							"data": 40
						}, {
							"name": "总修理中",
							"data": 20
						}, {
							"name": "总打印条码",
							"data": 38
						}, {
							"name": "总检修",
							"data": 28
						}]
					};
				} else {
					var Pie = { //需要后端做一个端口,做一个根据机器码来获取单个机器数据
						"series": [{
							"name": "上料",
							"data": 50
						}, {
							"name": "落布",
							"data": 30
						}, {
							"name": "修理中",
							"data": 20
						}, {
							"name": "打印条码",
							"data": 18
						}, {
							"name": "检修",
							"data": 8
						}]
					}
				}

				this._self.showPie(this.canvasId, Pie, this._self);
			},
			showPie(canvasId, chartData, _self) {
				this.canvaPie = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'pie',
					fontSize: 11,
					legend: {
						show: true,
						position: 'right',
						float: 'center',
						itemGap: 10,
						padding: 5,
						lineHeight: 26,
						margin: 5,
						borderWidth: 1
					},
					background: '#FFFFFF',
					pixelRatio: _self.pixelRatio,
					series: chartData.series,
					animation: true,
					width: _self.cWidth * _self.pixelRatio,
					height: _self.cHeight * _self.pixelRatio,
					dataLabel: true,
					extra: {
						pie: {
							labelWidth: 15
						}
					},
				});
				this.piearr = this.canvaPie.opts.series;
			},
			touchPie(e) {
				this.canvaPie.showToolTip(e, {
					format: function(item) {
						return item.name + ':' + item.data
					}
				});
			},
		}
	}
</script>

<style>
	page {
		background: #F2F2F2;
		width: 750upx;
		overflow-x: hidden;
	}

	.qiun-padding {
		padding: 2%;
		width: 96%;
	}

	.qiun-wrap {
		display: flex;
		flex-wrap: wrap;
	}

	.qiun-rows {
		display: flex;
		flex-direction: row !important;
	}

	.qiun-columns {
		display: flex;
		flex-direction: column !important;
	}

	.qiun-common-mt {
		margin-top: 10upx;
	}

	.qiun-bg-white {
		background: #FFFFFF;
	}

	.qiun-title-bar {
		width: 96%;
		padding: 10upx 2%;
		flex-wrap: nowrap;
	}

	.qiun-title-dot-light {
		border-left: 10upx solid #0ea391;
		padding-left: 10upx;
		font-size: 32upx;
		color: #000000
	}

	.qiun-charts {
		width: 750upx;
		height: 500upx;
		background-color: #FFFFFF;
	}

	.charts-pie {
		width: 750upx;
		height: 500upx;
		background-color: #FFFFFF;
	}

	.charts-right {
		display: flex;
		align-items: center;
		width: 250upx;
		height: 500upx;
		background-color: #FFFFFF;
	}

	.legend-itme {
		width: 200upx;
		margin-left: 30upx;
		height: 50upx;
		align-items: center;
	}

	.legend-itme-point {
		width: 20upx;
		height: 20upx;
		margin: 15upx;
		border: 1px solid #FFFFFF;
		border-radius: 20upx;
		background-color: #000000;
	}

	.legend-itme-text {
		height: 50upx;
		line-height: 50upx;
		color: #666666;
		font-size: 26upx;
	}
</style>
