<template>
	<view class="wrap">
		<view class="select">
			<span>{{options[0]}}
				<u-icon name="bookmark" style='margin-left: 5px;margin-right: 10px;display: inline-block;'></u-icon>
			</span>
		</view>
		<u-divider text=""></u-divider>
		<view class="list">
			<u-empty v-show="!haveComment" mode="comment" iconSize='110' style='margin-top: 20vh;' text='暂时还没有收到回复哦'
				textSize='16' icon="http://cdn.uviewui.com/uview/empty/comment.png">
			</u-empty>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				haveComment: false,
				options: [
					'所有回复',
					'我关注的'
				]
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
