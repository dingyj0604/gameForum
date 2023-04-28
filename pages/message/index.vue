<template>
	<view class="wrap">
		<view class="mes">
			<u-row justify="space-between" style='height: 100%;'>
				<u-col span="4" justify='center' align='center'>
					<u-icon name="more-circle" class="icon" color='#fff' size='30' @click='toReply'></u-icon>回复我的
				</u-col>
				<u-col span="4" justify='center' align='center'>
					<u-icon name="thumb-up" class="icon" color='#fff' size='30' @click='toFabulous'></u-icon>收到的赞
				</u-col>
				<u-col span="4" justify='center' align='center'>
					<u-icon name="bell" class="icon" color='#fff' size='30' @click='toNotification'></u-icon>系统通知
				</u-col>
			</u-row>
		</view>
		<view class="list">
			<u-empty v-show="!haveLetter" mode="message" iconSize='110' style='margin-top: 20vh;' text='暂时还没有收到私信消息哦'
				textSize='16' icon="http://cdn.uviewui.com/uview/empty/message.png">
			</u-empty>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				haveLetter: false,

			};
		},
		computed: {

		},
		methods: {
			toReply() {
				uni.navigateTo({
					url: '/pages/message/component/reply'
				});
			},
			toFabulous() {
				uni.navigateTo({
					url: '/pages/message/component/fabulous'
				});
			},
			toNotification() {
				uni.navigateTo({
					url: '/pages/message/component/notification'
				});
			}
		},
	};
</script>

<style lang="scss" scoped>
	.wrap {
		background-color: white;

		.mes {
			height: 18vh;

			.icon {
				margin-bottom: 12px;
				padding: 8px;
				background-color: #28b4ef;
				border-radius: 50%;
			}
		}

		.list {
			min-height: 50vh;
		}
	}
</style>
