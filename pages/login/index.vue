<template>
	<view class="wrap">
		<view class="top">
			<image src="../../static/status/welcome.png"></image>
		</view>
		<view class="content">
			<view class="title">
				<span style='margin-bottom: 12px;'>时与风</span>
				<span>Game Forum</span>
			</view>
			<u--input class="input" v-model="username" placeholder="请输入账号" border="bottom" :clearable="true"
				prefixIcon='account-fill'></u--input>
			<u--input class="input" v-model="password" placeholder="请输入密码" border="bottom" :clearable="true"
				:password="true" prefixIcon='lock-fill'></u--input>
			<button class="getCaptcha" @tap="onLogin">
				登&nbsp;&nbsp;&nbsp;&nbsp;录
			</button>
			<view @tap="onRegister" class="register">注 &nbsp;&nbsp;册</view>
			<u-toast ref="uToast" />
		</view>
	</view>
</template>

<script>
	import {
		login
	} from '@/services/user.js';

	export default {
		data() {
			return {
				username: '',
				password: '',
			};
		},
		computed: {

		},
		methods: {
			async onLogin() {
				if (!this.username || !this.password) return;
				console.log("登录");
				try {
					const result = await login({
						username: this.username,
						password: this.password,
					});
					if (result) {
						this.$refs.uToast.show({
							message: '登录成功',
						});
						uni.setStorageSync('token', result.token);
						uni.setStorageSync('userId', result.user.id);
						uni.setStorageSync('role', result.user.role);
						setTimeout(() => {
							uni.switchTab({
								url: `/pages/myOwn/index`,
							})
						}, 500);
					}
				} catch (err) {
					this.$refs.uToast.show({
						message: err?.message,
					});
				}
			},
			onRegister() {
				console.log("注册")
				uni.navigateTo({
					url: '/pages/register/index',
				});
			},
		},
	};
</script>

<style lang="scss" scoped>
	.wrap {
		font-size: 12vw;
		min-height: 100vh;
		background-color: white;

		.top {
			height: 28.5vh;
			text-align: center;
			background-color: #ddf0f9;
			border-radius: 0 0 13% 13%;
		}

		.content {
			display: flex;
			flex-direction: column;
			margin: 0vw auto 0;
			padding: 10vw 10vw;

			.title {
				text-align: center;
				display: flex;
				flex-direction: column;
				font-size: 7vw;
				font-weight: 600;
				margin-bottom: 20vw;
			}

			.input {
				text-align: left;
				margin: 4vw 0;
			}

			.getCaptcha {
				background-color: #0b8dff;
				color: white;
				border: none;
				margin-top: 4vw;
				border-radius: 98px;
				width: 70vw;
				height: 12vw;
				line-height: 12vw;
				font-size: 36rpx;
			}
		}

		.register {
			color: #ffb217;
			margin-top: 2vh;
			font-size: 3.5vw;
			text-decoration: underline;
			text-align: center;
		}
	}
</style>
