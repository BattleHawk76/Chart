<template>
	<view class="qiun-columns">
		<view class="qiun-bg-white qiun-title-bar qiun-common-mt">
			<view class="qiun-title-dot-light">{{title}}</view>
		</view>
		<view class="qiun-charts">
			<canvas :canvas-id="canvasId" :id="canvasId" class="charts" @touchstart="touchColumn"></canvas>
		</view>
	</view>
</template>

<script>
	import uCharts from '@/components/u-charts/u-charts.js';
	export default {
		name: 'columnChart',
		data() {
			return {
				cWidth: '',
				cHeight: '',
				pixelRatio: 1,
				serverData: '',
				_self: null,
				canvaColumn: null,
			}
		},
		props: {
			title: '',
			canvasId: '',
			chartName: null
		},
		methods: {
			chartStart(item) {
				this._self = this;
				this.cWidth = uni.upx2px(750);
				this.cHeight = uni.upx2px(500);
				this.pixelRatio = 1
				let productionMeter = []
				let date = []
				item.forEach(i => {
					productionMeter.push(i.productionMeter)
					date.push(i.date.replace("2020-", ''))
				})
				this.getServerData(productionMeter, date);
			},
			getServerData(productionMeter, date) {
				if (this.chartName === null) {
					let Column = {
						"categories": ["9月16日", "9月17日", "9月18日", "9月19日", "9月20日", "9月21日"],
						"series": [{
							"name": "生产米数",
							"data": [115, 145, 337, 413, 324, 602]
						}]
					}
					this._self.showColumn(this.canvasId, Column, this._self);
				} else {
					let Column = {
						"categories": date,
						"series": [{
							"name": "生产米数",
							"data": productionMeter,
						}]
					}
					this._self.showColumn(this.canvasId, Column, this._self);
				}
			},
			showColumn(canvasId, chartData, _self) {
				this.canvaColumn = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'column',
					legend: {
						show: true
					},
					fontSize: 8,
					background: '#FFFFFF',
					pixelRatio: _self.pixelRatio,
					animation: true,
					categories: chartData.categories,
					series: chartData.series,
					xAxis: {
						disableGrid: true,
					},
					yAxis: {
						//disabled:true
					},
					dataLabel: true,
					width: _self.cWidth * _self.pixelRatio,
					height: _self.cHeight * _self.pixelRatio,
					extra: {
						column: {
							type: 'group',
							width: _self.cWidth * _self.pixelRatio * 0.45
						}
					}
				});

			},
			touchColumn(e) {
				this.canvaColumn.showToolTip(e, {
					format: function(item, category) {
						if (typeof item.data === 'object') {
							return category + ' ' + item.name + ':' + item.data.value
						} else {
							return category + ' ' + item.name + ':' + item.data
						}
					}
				});
			},
		}
	}
</script>

<style>
page{background:#F2F2F2;width: 750upx;overflow-x: hidden;}
.qiun-padding{padding:2%; width:100%;}
.qiun-wrap{display:flex; flex-wrap:wrap;}
.qiun-rows{display:flex; flex-direction:row !important;}
.qiun-columns{display:flex; flex-direction:column !important;}
.qiun-common-mt{margin-top:10upx;}
.qiun-bg-white{background:#FFFFFF;}
.qiun-title-bar{width:100%; padding:10upx 2%; flex-wrap:nowrap;}
.qiun-title-dot-light{border-left: 10upx solid #0ea391; padding-left: 10upx; font-size: 32upx;color: #000000}
.qiun-charts{width: 750upx; height:500upx;background-color: #FFFFFF;}
.charts{width: 750upx; height:500upx;background-color: #FFFFFF;}
</style>