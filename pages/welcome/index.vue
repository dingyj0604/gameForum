<template>
	<view>
		<div class='welcome'>
			<u-button class='button' type="primary" :plain="true" :hairline="true" @click='toHomePage'>
				跳过<u-count-down :time="3000" format="ss" style='margin-left: 4px;'></u-count-down>
			</u-button>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		methods: {
			toHomePage() {
				console.log('跳转')
				uni.switchTab({
					url: '/pages/home/index'
				});
			},
		},
		onReady() {
			console.log('welcome');
			setTimeout(() => {
				this.toHomePage();
			}, 3000)
		},
	}
</script>

<style lang="scss" scoped>
	.welcome {
		height: 100vh;
		width: 100vw;
		background-image: url('/static/welcome/1.webp');
		background-repeat: no-repeat;
		background-size: 100% 100%;
		display: flex;
		justify-content: flex-end;
	}

	.button {
		width: 90px;
		height: 40px;
		opacity: 0.7;
		position: relative;
		top: 30px;
		right: 20px;
		margin: 0;
		font-size: 18px;
	}
</style>
