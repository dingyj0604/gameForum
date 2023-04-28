<template>
	<view class="wrap">
		<view class="top">
			<u-icon name="error-circle-fill" color="#ff9900" size="60"></u-icon>
			<u--text text="重要提示" align='center' size='18' lineHeight='28' color='#000' margin='20rpx 0 0 0'></u--text>
			<view class="content">
				<u--text text="申请注销的注意事项" align='left' size='16' lineHeight='28' color='#000' margin='16rpx 0'>
				</u--text>
				<u--text text="请在安全和常用的网络、设备环境下操作，并保证您15天内无安全信息修改/注销申请等操作。" margin='16rpx 0rpx' align='left' size='16'
					lineHeight='28'>
				</u--text>
				<u--text text="如账号下有未使用的虚拟货币或付费服务，注销成功后将随账号一同被清空，请谨慎操作。" margin='16rpx 0rpx' align='left' size='16'
					lineHeight='28'>
				</u--text>
				<u--text text="请您仔细阅读《注销协议》账号注销完成后无法恢复，请谨慎选择并操作。" margin='16rpx 0' align='left' size='16'
					lineHeight='28'></u--text>
			</view>
		</view>
		<view class="bottom">
			<div style='display: flex;margin: 24rpx;'>
				<u-switch v-model="checked" @change="change" space="2" activeColor="#f9ae3d" size='18'
					inactiveColor="rgb(230, 230, 230)"></u-switch>
				<u--text mode="info" text="我已了解并同意账号《注销协议》" margin='0rpx 24rpx'></u--text>
			</div>
			<view class="button">
				<u-button type="primary" shape="square" @click="submit" :color="buttonColor">注册
				</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		cancellate,
		getUserInfoByToken
	} from "@/services/user.js"
	export default {
		data() {
			return {
				userId: '',
				checked: false,
				buttonColor: "#e3e3e3",
			};
		},
		computed: {

		},
		async onLoad() {
			const userInfo = await getUserInfoByToken({});
			if (userInfo) {
				this.userId = userInfo.userId;
			}
		},
		methods: {
			change(e) {
				this.checked = e;
				if (e) {
					this.buttonColor = "";
				} else {
					this.buttonColor = "#e3e3e3"
				}
			},
			async submit() {
				if (this.checked) {
					try {
						const result = await cancellate({
							id: this.userId,
							token: uni.getStorageSync('token'),
						});
						if (result) {
							uni.setStorageSync('token', "");
							uni.setStorageSync('role', "");
							uni.$u.toast('账号注销成功');
							uni.redirectTo({
								url: '/pages/login/index',
							});
						}
					} catch (err) {
						this.$refs.uToast.show({
							message: err.message,
						});
					}
				} else {
					uni.$u.toast('请先了解同意账号《注销协议》');
				}
			}
		},
	};
</script>

<style lang="scss" scoped>
	.wrap {
		background-color: white;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 93vh;

		.top {
			margin-top: 10vh;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;

			.content {
				margin: 24px 12px;
				padding: 16rpx;
				border-radius: 6px;
				border: none;
				background-color: #E5E5E5;
				box-shadow: 0 0 8px #f4f4f4;
			}
		}

		.bottom {
			display: flex;
			flex-direction: column;

			.button {
				border-top: 1px solid #E5E5E5;
				padding: 5vw;
			}
		}
	}
</style>
