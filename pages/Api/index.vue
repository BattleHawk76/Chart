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
				datas: {}
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
