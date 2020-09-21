<template>
	<view class="container">
		<pie title="组件测试" canvasId="asd"></pie>
		<pie title="组件测试2" canvasId="asd2" :datas="datas"></pie>
	</view>
</template>

<script>
	import pie from '../../components/pie/pie.vue'
	export default {
		components: {
			pie
		},
		data() {
			return {
				datas: {
					"series": [{
						"name": "asd",
						"data": 50
					}, {
						"name": "落qwe布",
						"data": 30
					}, {
						"name": "修理qwe中",
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
		},
		methods: {
			
		}
	}
</script>

<style>
	.container {
		font-size: 14px;
		line-height: 24px;
		width: 100vh;
		height: 300px;
	}
</style>
