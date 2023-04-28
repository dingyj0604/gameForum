<script>
	export default {
		onLaunch: function() {
			// console.log('App Launch')
			uni.onTabBarMidButtonTap(() => {
				// console.log("点击发布tab");
				// 通过 id 获取 nvue 子窗体  
				const subNVue = uni.getSubNVueById('popup');
				// 打开 nvue 子窗体
				subNVue.show('slide-in-bottom', 300, function() {
					console.log('subNVue 原生子窗体显示成功');
				});
			})
		},
		onShow: function() {
			// console.log('App Show')
		},
		onHide: function() {
			// console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";
</style>
