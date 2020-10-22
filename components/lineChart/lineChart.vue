<template>
	<view class="qiun-columns">
		<view class="qiun-bg-white qiun-title-bar qiun-common-mt">
			<view class="qiun-title-dot-light">{{title}}</view>
		</view>
		<view class="qiun-charts">
			<canvas :canvas-id="canvasId" :id="canvasId" class="charts" @touchstart="touchLineA"></canvas>
		</view>
	</view>
</template>

<script>
	import uCharts from '@/components/u-charts/u-charts.js';
	export default {
		name: 'lineChart',
		props: {
			title: '',
			canvasId: '',
			chartName: null
		},
		data() {
			return {
				cWidth: '',
				cHeight: '',
				pixelRatio: 1,
				_self: null,
				canvaLineA: null,
			}
		},
		methods: {
			chartStart(item) {
				this._self = this;
				this.cWidth = uni.upx2px(750);
				this.cHeight = uni.upx2px(500);
				let availability = []
				let date = []
				item.forEach(i => {
					availability.push(i.availability)
					date.push(i.date.replace("2020-", ''))
				})
				console.log(availability)
				console.log(date)
				this.getServerData(availability, date);
			},
			getServerData(availability, date) {
				if (this.chartName === null) {
					let LineA = {
						categories: ['9月17日', '9月18日', '9月19日', '9月21日', '9月20日', '9月21日'],
						series: [{
							name: '机器1',
							data: [35, 20, 25, 37, 4, 20],
							color: '#000000'
						}, {
							name: '机器2',
							data: [70, 40, 65, 100, 44, 68]
						}, {
							name: '机器3',
							data: [100, 80, 95, 31, 21, 31]
						}]
					};
					this._self.showLineA(this.canvasId, LineA, this._self);
				} else {
					let LineA = {
						categories: date,
						series: [{
							name: '机器1',
							data: availability,
							color: '#000000'
						}]
					};
					this._self.showLineA(this.canvasId, LineA, this._self);
				}
			},
			showLineA(canvasId, chartData, _self) {
				this.canvaLineA = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'line',
					fontSize: 11,
					legend: {
						show: true
					},
					dataLabel: false,
					dataPointShape: true,
					background: '#FFFFFF',
					pixelRatio: _self.pixelRatio,
					categories: chartData.categories,
					series: chartData.series,
					animation: true,
					xAxis: {
						type: 'grid',
						gridColor: '#CCCCCC',
						gridType: 'dash',
						dashLength: 8
					},
					yAxis: {
						gridType: 'dash',
						gridColor: '#CCCCCC',
						dashLength: 8,
						splitNumber: 5,
						min: 0,
						max: 100,
						format: (val) => {
							return val.toFixed(0) + '%'
						}
					},
					width: _self.cWidth * _self.pixelRatio,
					height: _self.cHeight * _self.pixelRatio,
					extra: {
						line: {
							type: 'straight'
						}
					}
				});

			},
			touchLineA(e) {
				this.canvaLineA.showToolTip(e, {
					format: function(item, category) {
						return category + ' ' + item.name + ':' + item.data
					}
				});
			}
		},
	}
</script>

<style>
	/*样式的width和height一定要与定义的cWidth和cHeight相对应*/
	.qiun-charts {
		width: 750upx;
		height: 500upx;
		background-color: #FFFFFF;
	}

	.charts {
		width: 750upx;
		height: 500upx;
		background-color: #FFFFFF;
	}
	page{background:#F2F2F2;width: 750upx;overflow-x: hidden;}
	.qiun-padding{padding:2%; width:100%;}
	.qiun-wrap{display:flex; flex-wrap:wrap;}
	.qiun-rows{display:flex; flex-direction:row !important;}
	.qiun-columns{display:flex; flex-direction:column !important;}
	.qiun-common-mt{margin-top:10upx;}
	.qiun-bg-white{background:#FFFFFF;}
	.qiun-title-bar{width:100%; padding:10upx 2%; flex-wrap:nowrap;}
	.qiun-title-dot-light{border-left: 10upx solid #0ea391; padding-left: 10upx; font-size: 32upx;color: #000000}
	.charts{width: 750upx; height:500upx;background-color: #FFFFFF;}
</style>
