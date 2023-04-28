<template>
	<view class="warp">
		<view class="dynamic">
			<view class="avatar">
				<div style='display: flex;align-items: center;'>
					<u-avatar :src="dynamicDetail.userAavatarSrc" size='36' />
					<div style='margin-left: 10px;'>
						<u--text :lines="1" :text="dynamicDetail.userName" align='left' size='15' lineHeight='26' />
						<u--text mode="date" :text="dynamicDetail.date" align='left' size='13' color='#acacac' />
					</div>
				</div>
				<u-button v-show="!dynamicDetail.isFollow" class="button" type="primary" icon='plus' :plain="true"
					:hairline="true" text="关注" @click="follow()" />
				<u-button v-show="dynamicDetail.isFollow" class="button" type="info" icon='checkbox-mark' :plain="true"
					color='#8c8c8c' text="已关注" @click="showFollowModal()" />
			</view>
			<view class="content">
				<u--text :text="dynamicDetail.title" align='left' size='16' />
				<u--text :text="dynamicDetail.content" :lines="3" align='left' size='15' color='#8b8b8b' />
				<u-album class='album' :urls="dynamicDetail.img" singleSize='300'
					:multipleSize="dynamicDetail.img.length===2 ? 150 : 100" :rowCount="3" />
			</view>
			<u-tag :text="dynamicDetail.tag" type="info" class="tag" color='#676767' bgColor='#d9d9d9'
				borderColor='#d0d0d0' />
		</view>
		<u-gap height="10" bgColor="#f6f6f6" style='margin: 10px 0;' />
		<view class="comment">
			<u-sticky zIndex='10' class='sticky'><span style='font-weight:600;'>评论</span></u-sticky>
			<view>
				<u-empty v-show="!dynamicDetail.comments.length" mode="message" iconSize='110' style='margin-top: 10vh;'
					text='暂时还没有评论内容哦' textSize='16' icon="../../static/status/emptyList.png" />
				<div v-for="(item, index) in dynamicDetail.comments" :key="index">
					<view class="commentItem">
						<view class="itemTop">
							<u-avatar :src="item.userAavatarSrc" size='36' />
							<u--text :lines="1" :text="item.userName" align='left' size='15' style='margin-left: 10px;'
								lineHeight='26' />
						</view>
						<view class="ItemContent">
							<u--text :text="item.content" :lines="3" align='left' size='15' color='#8b8b8b' />
						</view>
						<view class="itemBottom">
							<u--text mode="date" :text="item.date" align='left' size='13' color='#acacac' />
							<div style='display: flex;align-items: center;'>
								<u-icon name="chat" size="22" label='回复' labelSize='14' style='margin-right: 24rpx;'
									@click='showCommentPopup()' />
								<u-icon v-show="item.isLike" name="thumb-up-fill" color='#2979ff' size="25"
									:label='item.likes' labelSize='14' />
								<u-icon v-show="!item.isLike" name="thumb-up" size="25" :label='item.likes'
									labelSize='14' />
							</div>
						</view>
						<u-popup :show="commentVis" :round="10" mode="bottom" @close="popupClose">
							<view class="popup">
								<div style='font-size: 13px;height: 30px;'>发表评论</div>
								<u--input class='input' placeholder="我有话要说..." border="none" v-model="commentValue"
									cursorSpacing='70'>
								</u--input>
								<div class='button'>
									<u-button type="primary" shape="square" @click="publish()" v-model="buttonColor"
										:color="buttonColor"
										style="width: 66px;font-size: 14px;margin: 0;height: 32px;">发&nbsp;布
									</u-button>
								</div>
							</view>
						</u-popup>
					</view>
				</div>
			</view>
		</view>
		<view class="option">
			<u-row justify="space-between" align='center' gutter='10'>
				<u-col span="4" justify='center' align='center'>
					<u-icon name="share" size="25"></u-icon>
				</u-col>
				<u-col span="4" justify='center' align='center'>
					<u-icon name="more-circle" size="22" :label='dynamicDetail.commentNum' labelSize='14'
						@click='showCommentPopup()'></u-icon>
				</u-col>
				<u-col span="4" justify='center' align='center'>
					<u-icon v-show="dynamicDetail.isLike" name="thumb-up-fill" color='#2979ff' size="25"
						:label='dynamicDetail.likes' labelSize='14'></u-icon>
					<u-icon v-show="!dynamicDetail.isLike" name="thumb-up" size="25" :label='dynamicDetail.likes'
						labelSize='14'>
					</u-icon>
				</u-col>
			</u-row>
		</view>
		<u-modal :show="followVis" @confirm="followConfirm" ref="followModal" :asyncClose="true"
			@close="closeFollowModal" @cancel="closeFollowModal" showCancelButton content="确认取消关注该用户吗？"
			:closeOnClickOverlay="true"></u-modal>
	</view>
</template>

<script>
	import {
		followUser,
		unfollowUser
	} from '@/services/user.js';
	import {
		articleDetail,
		supportArticle,
		unsupportArticle,
		comment,
		starArticle,
		unstarArticle
	} from "@/services/article.js"
	export default {
		data() {
			return {
				followVis: false,
				commentVis: false,
				buttonColor: "#e3e3e3",
				commentValue: "",
				dynamicId:'',
				dynamicDetail: {
					id: '11',
					userAavatarSrc: "../../static/image/avatar.png",
					userName: '小新Eliauk',
					isFollow: false,
					title: "【有奖活动】【荒梦藏虞渊】2.7版本攻略征集活动",
					content: "原地起飞的快乐！！！！！！！！！！",
					tag: '活动',
					img: [
						'../../static/swiper/swiper1.png',
						'../../static/swiper/swiper2.png',
					],
					date: "2022-06-01",
					commentNum: 20,
					likes: 50,
					isLike: true,
					comments: [{
						userAavatarSrc: "../../static/image/avatar.png",
						userName: '小新Eliauk',
						content: "原地起飞的快乐！！！！！！！！！！",
						date: "2022-06-01",
						likes: 20,
						isLike: true,
					}, {
						userAavatarSrc: "../../static/image/avatar.png",
						userName: '小新Eliauk',
						content: "原地起飞的快乐！！！！！！！！！！",
						date: "2022-06-01",
						likes: 20,
						isLike: true,
					}]
				}
			}
		},
		watch: {
			commentValue: function(newValue, old) {
				if (newValue) {
					this.buttonColor = "";
				} else {
					this.buttonColor = "#e3e3e3";
				}
			}
		},
		onLoad(option) {
			this.dynamicId = option.id;
			this.getDynamicDetail(option.id);
		},
		methods: {
			async getDynamicDetail(id) {
				const res = await articleDetail({
					id
				});
				console.log(res);
			},
			showCommentPopup() {
				this.commentVis = true;
			},
			popupClose() {
				this.commentVis = false;
			},
			follow() {
				this.dynamicDetail.isFollow = true;
			},
			showFollowModal() {
				this.followVis = true;
			},
			closeFollowModal() {
				this.followVis = false;
			},
			followConfirm() {
				this.dynamicDetail.isFollow = false;
				setTimeout(() => {
					this.followVis = false;
				}, 500)
			},
			async publish() {
				console.log("发布评论");
				console.log(this.commentValue);
				const res = await comment(id, {
					context: this.commentValue
				})
				console.log(res);
			},
			async like(item) {
				const res = await supportArticle({
					id: item.id
				});

			},
			async dislike(item) {
				const res = await unsupportArticle({
					id: item.id
				});

			},
		}
	}
</script>

<style lang="scss" scoped>
	.warp {
		width: 100vw;

		.dynamic {
			padding: 10px 8px;

			.avatar {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 8px;

				.button {
					margin-right: 8px;
					padding: 0 6px;
					width: 70px;
					height: 30px;
				}
			}

			.content {
				width: 88vw;
				margin-bottom: 8px;
				margin-top: 12px;
				padding: 10px;
				border-top: 3px solid #ffc2b7;
				border-radius: 6% 6% 0 0;
				text-indent: 1em;
				background-color: #fff6ed;

				.album {
					@include flex;
					align-items: flex-start;
					justify-content: space-between;
					padding: 6px;
					flex-wrap: wrap;
				}
			}

			.tag {
				width: 50px;
				margin-left: 5px;
			}
		}

		.comment {
			margin-bottom: 55px;

			.sticky {
				padding: 12px;
				background-color: white !important;
				border-bottom: 1rpx solid #e3e3e3;
			}

			.commentItem {
				padding: 16px 12px 0 12px;

				.itemTop {
					display: flex;
					align-items: center;
					margin-bottom: 8px;
				}

				.ItemContent {
					margin-left: 48px;
					margin-right: 12rpx;
				}

				.itemBottom {
					margin: 24rpx 12rpx 12rpx 48px;
					padding-bottom: 24rpx;
					display: flex;
					align-items: center;
					justify-content: space-between;
					border-bottom: 1rpx solid #e3e3e3;
				}

				.popup {
					padding: 12px 16px;
					// height: 30vh;
					display: flex;
					flex-direction: column;
					justify-content: space-between;

					.input {
						padding: 4px 0;
						margin-top: 12px;
						margin-bottom: 16px;
					}

					.button {
						display: flex;
						justify-content: flex-end;
						padding-top: 12px;
						border-top: 1px solid #e3e3e3;
					}
				}
			}
		}

		.option {
			position: fixed;
			bottom: 0px;
			width: 100vw;
			padding: 10px 0;
			border-top: 1px solid #adadad;
			background-color: white !important;
		}
	}
</style>
