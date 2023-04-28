<template>
	<view class="wrap">
		<u-cell-group>
			<u-cell size='large' title="修改密码" isLink url="/pages/myOwn/component/editPassword"></u-cell>
			<u-cell size='large' title="注销账号" isLink url="/pages/myOwn/component/cancellation"></u-cell>
			<u-cell size='large' title="退出登录" isLink @click="visable=true"></u-cell>
		</u-cell-group>
		<u-modal :show="visable" @confirm="confirm" ref="modal" :asyncClose="true" @close="closeModal"
			@cancel="closeModal" showCancelButton content="确认退出登录吗？" :closeOnClickOverlay="true"></u-modal>
	</view>
</template>

<script>
	import {
		logout
	} from "@/services/user.js"
	export default {
		data() {
			return {
				visable: false
			};
		},
		computed: {

		},
		methods: {
			closeModal() {
				this.visable = false;
			},
			async confirm() {
				try {
					const res = await logout({
						token: uni.getStorageSync("token"),
					});
					uni.$u.toast('退出登录成功');
					uni.setStorageSync('token', "");
					uni.setStorageSync('userId', "");
					uni.setStorageSync('role', "");
					uni.redirectTo({
						url:"/pages/login/index"
					})
				} catch (e) {
					uni.$u.toast(e);
				}
				setTimeout(() => {
					this.visable = false;
				}, 500);
			}
		},
	};
</script>

<style lang="scss" scoped>
	.wrap {
		background-color: white;
	}
</style>
