<template>
	<div>
		<view class="dynamic">
			<view class="avatar">
				<u-avatar :src="`${baseUrl}${item.author.portraitPath.replace(/\\/g, '\/')}`" size='36'></u-avatar>
				<div style='margin-left: 10px;width: 100%;'>
					<u--text :lines="1" :text="item.author.name" align='left' size='15' lineHeight='26'>
					</u--text>
					<u--text :text="item.author.updateAt" align='left' size='13' color='#acacac'></u--text>
				</div>
				<u-button v-show="!isFollow" class="button" type="primary" icon='plus' :plain="true" :hairline="true" text="关注"
					@click="follow()">
				</u-button>
				<u-button v-show="isFollow" class="button" type="info" icon='checkbox-mark' :plain="true" color='#8c8c8c'
					text="已关注" @click="showFollowModal(item)"></u-button>
			</view>
			<u-modal :show="followVis" @confirm="followConfirm" ref="followModal" :asyncClose="true" @close="closeFollowModal"
				@cancel="closeFollowModal" showCancelButton content="确认取消关注该用户吗？" :closeOnClickOverlay="true"></u-modal>
			<view class="content">
				<u--text :text="item.title" align='left' size='16' @click="toDetail()"></u--text>
				<u--text :text="item.content" :lines="3" align='left' size='15' lineHeight='28' color='#8b8b8b'
					@click="toDetail()">
				</u--text>
			</view>
			<view class="option">
				<u-row justify="space-between" align='center' gutter='10'>
					<u-col span="6" justify='flex-start'>
						<div v-for="(ele) in item.subjects" :key="ele.id">
							<u-tag :text="ele.title" type="info" class="tag" bgColor='#d9d9d9' borderColor='#d0d0d0'
								@click='toTopicDetail(ele)'></u-tag>
						</div>
					</u-col>
					<u-col span="2" justify='center' align='center'>
						<u-icon name="more-circle" size="22" :label='item.commentNum' labelSize='14'>
						</u-icon>
					</u-col>
					<u-col span="2" justify='center' align='center'>
						<u-icon v-show="isLike" name="thumb-up-fill" color='#2979ff' size="25" :label='likeNum' labelSize='14'
							@click='dislike()'>
						</u-icon>
						<u-icon v-show="!isLike" name="thumb-up" size="25" :label='likeNum' labelSize='14' @click='like()'></u-icon>
					</u-col>
					<u-col span="2" style='margin-left:3px;'>
						<u-icon name="share" size="25" @click='share(item)'></u-icon>
					</u-col>
				</u-row>
			</view>
		</view>
		<u-popup :show="show" @close="show=false" :round="10">
			<view class="popup">
				<view class="title">分享</view>
				<view class="shareIcon">
					<u-icon label="微信" size="60" name="weixin-circle-fill" color="#19be6b" class="icon"></u-icon>
					<u-icon label="朋友圈" size="60" name="moments" color="#18b566" class="icon"></u-icon>
					<u-icon label="QQ" size="60" name="qq-circle-fill" color="#ff4b4e" class="icon"></u-icon>
					<u-icon label="QQ空间" size="60" name="qzone-circle-fill" color="#ffb726" class="icon"></u-icon>
				</view>
			</view>
		</u-popup>
		<u-gap height="10" bgColor="#f0f0f0" style='border-radius: 5px;opacity: 0.9;margin: 10px 0;'>
		</u-gap>
	</div>
</template>

<script>
	import {
		supportArticle,
		unsupportArticle,
	} from "@/services/article.js"
	import {
		followUser,
		unfollowUser,
		getFollowUsers
	} from '@/services/user.js';
	export default {
		props: ["item", "baseUrl", "followUsers"],
		data() {
			return {
				userId: '',
				isLike: false,
				likeNum: this.item.likeNum,
				isFollow: false,
				followVis: false,
				show: false,
			}
		},
		mounted() {
			this.userId = uni.getStorageSync("userId");
			this.judgeFollowUser();
			// this.checked();
		},
		methods: {
			// checked() {
			// 	const temp = this.item.likes.filter((ele) => ele.userId === this.userId)
			// 	if (temp.length) this.isLike = true;
			// 	else this.isLike = false;
			// },
			judgeFollowUser() {
				const temp = this.followUsers.filter((item) => item.id === this.item.author.id).length;
				this.isFollow = temp ? true : false;
			},
			async follow() {
				this.isFollow = true;
				const res = await followUser({
					followId: this.item.author.id
				});
			},
			showFollowModal() {
				this.followVis = true;
			},
			closeFollowModal() {
				this.followVis = false;
			},
			async followConfirm() {
				this.isFollow = false;
				const res = await unfollowUser({
					followId: this.item.author.id
				});
				setTimeout(() => {
					this.followVis = false;
				}, 500)
			},
			async like() {
				if (uni.getStorageSync("token")) {
					const res = await supportArticle({
						id: this.item.id
					});
					if (res) {
						this.isLike = true;
						this.likeNum += 1;
					}
				} else uni.$u.toast('请先登录')
			},
			async dislike() {
				if (uni.getStorageSync("token")) {
					const res = await unsupportArticle({
						id: this.item.id
					});
					if (res) {
						this.isLike = false;
						this.likeNum -= 1;
					}
				} else uni.$u.toast('请先登录')
			},
			share(item) {
				this.show = true;
				// 微信分享
				// uni.share({
				// 	provider: "weixin",
				// 	scene: "WXSceneSession",
				// 	type: 1,
				// 	summary: "我正在使用HBuilderX开发uni-app，赶紧跟我一起来体验！",
				// 	success: function (res) {
				// 		console.log("success:" + JSON.stringify(res));
				// 	},
				// 	fail: function (err) {
				// 		console.log("fail:" + JSON.stringify(err));
				// 	}
				// });
			},
			toDetail() {
				uni.navigateTo({
					url: `/pages/home/articleDetails?id=${this.item.id}`,
				})
			},
			toTopicDetail(e) {
				uni.navigateTo({
					url: `/pages/topic/index?id=${e.id}`,
				})
			},
		},
	}
</script>

<style lang="scss" scoped>
	.dynamic {
		padding: 10px 12px;

		.avatar {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 8px;

			.button {
				margin-right: 8px;
				// padding: 0 6px;
				width: 90px;
				height: 30px;
			}
		}

		.content {
			background-color: #fffcfb;
			// margin-bottom: 8px;
			margin-top: 16px;
			padding-top: 10px;
			padding-bottom: 8px;
			border-top: 3.6px solid #ff9683;
			border-radius: 5% 5% 0 0;
			text-indent: 6px;
		}

		.option {
			// margin: 6px 0px;
			padding: 6px 2px 6px 10px;
			background-color: #fffcfb;

			.tag {
				width: 80px;
				text-align: center;
			}

			.icon {}
		}

	}

	.popup {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		padding: 24px;

		.title {
			font-size: 24px;
			width: 100%;
			text-align: center;
			margin-bottom: 24px;
		}

		.shareIcon {
			display: flex;
			justify-content: space-around;
			align-items: center;
			width: 100%;

			.icon {
				display: flex;
				flex-direction: column;
			}
		}
	}
</style>