<template>
	<view class="wrap">
		<view class="list">
			<u-empty v-show="!haveNotify" mode="comment" iconSize='110' style='margin-top: 20vh;' text='暂时还没有系统通知哦'
				textSize='16' icon="http://cdn.uviewui.com/uview/empty/comment.png">
			</u-empty>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				haveNotify: false,
			};
		},
		computed: {

		},
		methods: {

		},
	};
</script>

<style lang="scss" scoped>
	.wrap {
		background-color: white;

		.select {
			padding: 10px 0;
			// margin-top: 20px;
			display: flex;
			justify-content: flex-end;
			align-items: center;
		}

		.list {
			// min-height: 50vh;
		}
	}
</style>
