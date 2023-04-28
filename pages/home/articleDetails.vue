<template>
	<view class="warp">
		<view class="dynamic">
			<view class="avatar">
				<div style='display: flex;align-items: center;'>
					<u-avatar :src="`${baseUrl}${articleDetail.author && articleDetail.author.portraitPath.replace(/\\/g, '\/')}`"
						size='36' />
					<div style='margin-left: 10px;'>
						<u--text :lines="1" :text="articleDetail.author.name" align='left' size='15' lineHeight='26' />
						<u--text :text="articleDetail.updateAt" align='left' size='13' color='#acacac' />
					</div>
				</div>
				<u-button v-show="!isFollow" class="button" type="primary" icon='plus' :plain="true" :hairline="true" text="关注"
					@click="follow()" />
				<u-button v-show="isFollow" class="button" type="info" icon='checkbox-mark' :plain="true" color='#8c8c8c'
					text="已关注" @click="showFollowModal()" />
			</view>
			<view class="content">
				<u--text :text="articleDetail.title" align='left' size='16' />
				<!-- <rich-text :nodes="articleDetail.content"></rich-text> -->
				<u-parse :content="articleDetail.content" :lazyLoad="true"></u-parse>
				<!-- <u--text :text="articleDetail.content" :lines="3" align='left' size='15' color='#8b8b8b' /> -->
			</view>
			<view class="info">
				<div v-for="(ele) in articleDetail.subjects" :key="ele.id">
					<u-tag :text="ele.title" type="info" class="tag" bgColor='#d9d9d9' color='#676767'
						borderColor='#d0d0d0'></u-tag>
				</div>
				<div class="readingVolume">阅读量： <u-badge type="info" :value="articleDetail.readingVolume"
						bgColor='#ffaa00'></u-badge></div>
			</view>
		</view>
		<u-gap height="10" bgColor="#f6f6f6" style='margin: 10px 0;' />
		<view v-if="articleDetail.status==='Published'">
			<view class="comment">
				<u-sticky zIndex='10' class='sticky'><span style='font-weight:600;'>评论</span></u-sticky>
				<view>
					<u-empty v-show="!articleDetail.comments.length" mode="message" iconSize='110' style='margin-top: 10vh;'
						text='暂时还没有评论内容哦' textSize='16' icon="../../static/status/emptyList.png" />
					<div v-show="articleDetail.comments.length" v-for="(item, index) in articleDetail.comments" :key="index">
						<view class="commentItem">
							<view class="itemTop">
								<u-avatar :src="`${baseUrl}${item.commentator.portraitPath.replace(/\\/g, '\/')}`" size='36' />
								<u--text :lines="1" :text="item.commentator.name" align='left' size='15' style='margin-left: 10px;'
									lineHeight='26' />
							</view>
							<view class="ItemContent">
								<u--text :text="item.context" :lines="3" align='left' size='15' color='#8b8b8b' />
							</view>
							<view class="itemBottom">
								<u--text :text="item.updateAt" align='left' size='13' color='#acacac' />
								<div style='display: flex;align-items: center;'>
									<u-icon name="chat" size="22" label='回复' labelSize='14' style='margin-right: 24rpx;'
										@click='showCommentPopup()' />
									<u-icon v-show="item.isLike" name="thumb-up-fill" color='#2979ff' size="25" :label='likeNum'
										labelSize='14' />
									<u-icon v-show="!item.isLike" name="thumb-up" size="25" :label='likeNum' labelSize='14' />
								</div>
							</view>
						</view>
					</div>
				</view>
			</view>
			<view class="option">
				<u-row justify="space-between" align='center' gutter='10'>
					<u-col span="4" justify='center' align='center'>
						<u-icon v-show="isStar" name="star-fill" color='#ff7300' size="25" @click='disStar()'></u-icon>
						<u-icon v-show="!isStar" name="star" size="25" @click='star()'></u-icon>
					</u-col>
					<u-col span="4" justify='center' align='center'>
						<u-icon name="more-circle" size="22" :label='articleDetail.comments.length' labelSize='14'
							@click='showCommentPopup()'></u-icon>
					</u-col>
					<u-col span="4" justify='center' align='center'>
						<u-icon v-show="isLike" name="thumb-up-fill" color='#2979ff' size="25" :label='likeNum' labelSize='14'
							@click='dislike()'></u-icon>
						<u-icon v-show="!isLike" name="thumb-up" size="25" :label='likeNum' labelSize='14' @click='like()'>
						</u-icon>
					</u-col>
				</u-row>
			</view>
		</view>
		<u-modal :show="followVis" @confirm="followConfirm" ref="followModal" :asyncClose="true" @close="closeFollowModal"
			@cancel="closeFollowModal" showCancelButton content="确认取消关注该用户吗？" :closeOnClickOverlay="true"></u-modal>
		<u-popup :show="commentVis" :round="10" mode="bottom" @close="popupClose">
			<view class="popup">
				<div style='font-size: 13px;height: 30px;'>发表评论</div>
				<u--input class='input' placeholder="我有话要说..." border="none" v-model="commentValue" cursorSpacing='70'>
				</u--input>
				<div class='button'>
					<u-button type="primary" shape="square" @click="publish()" v-model="buttonColor" :color="buttonColor"
						style="width: 66px;font-size: 14px;margin: 0;height: 32px;">发&nbsp;布
					</u-button>
				</div>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {
		followUser,
		unfollowUser,
		getFollowUsers
	} from '@/services/user.js';
	import {
		articleDetail,
		supportArticle,
		unsupportArticle,
		comment,
		starArticle,
		unstarArticle
	} from "@/services/article.js"
	import {
		baseUrl
	} from '@/api/config.js'
	export default {
		data() {
			return {
				articleId: '',
				baseUrl: '',
				userId: "",
				isFollow: false,
				followVis: false,
				commentVis: false,
				buttonColor: "#e3e3e3",
				commentValue: "",
				isLike: false,
				likeNum: 0,
				isStar: false,
				articleDetail: {},
				followUsers: [],
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
		computed: {
			// likeNum: function() {
			// 	return 
			// }
		},
		onShow() {
			this.userId = uni.getStorageSync("userId");
			this.baseUrl = baseUrl;
			this.checked();
		},
		onLoad(option) {
			// console.log(option)
			this.articleId = option.id;
			this.getArticleDetail(option.id);
			this.getFollowUsers();
		},
		methods: {
			checked() {
				const temp = this.articleDetail.likes?.filter((ele) => ele.userId === this.userId)
				if (temp?.length) this.isLike = true;
				else this.isLike = false;
			},
			async getFollowUsers() {
				const res = await getFollowUsers({});
				if (res) {
					this.followUsers = res;
					const temp = res?.filter((item) => item.id === this.articleDetail.author.id)?.length;
					this.isFollow = temp ? true : false;
				}
			},
			async getArticleDetail(id) {
				const res = await articleDetail({
					id
				});
				this.articleDetail = {
					...res
				};
				this.likeNum = res.likes.length;
			},
			showCommentPopup() {
				this.commentVis = true;
			},
			popupClose() {
				this.commentVis = false;
			},
			async follow() {
				this.isFollow = true;
				const res = await followUser({
					followId: this.articleDetail.author.id
				});
				console.log(res);
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
					followId: this.articleDetail.author.id
				});
				console.log(res);
				setTimeout(() => {
					this.followVis = false;
				}, 500)
			},
			async like() {
				const res = await supportArticle({
					id: this.articleId
				});
				if (res) {
					this.articleDetail = {
						...res
					};
					this.isLike = true;
					this.likeNum += 1;
				}
			},
			async dislike() {
				const res = await unsupportArticle({
					id: this.articleId
				});
				if (res) {
					this.articleDetail = {
						...res
					};
					this.isLike = false;
					this.likeNum -= 1;
				}
			},
			async star() {
				const res = await starArticle({
					id: this.articleId
				});
				if (res) {
					this.isStar = true;
				}
			},
			async disStar() {
				const res = await unstarArticle({
					id: this.articleId
				});
				if (res) {
					this.isLike = false;
				}
			},
			async publish() {
				console.log("发布评论");
				console.log(this.commentValue);
				const res = await comment(this.articleId, this.commentValue)
				console.log(res);
				if (res) {
					this.articleDetail = {
						...res
					};
				}
				this.commentValue = "";
				this.popupClose();
			}
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

			.info {
				display: flex;
				align-items: center;
				justify-content: space-between;

				.tag {
					width: 80px;
					margin-left: 5px;
				}

				.readingVolume {
					display: flex;
					align-items: center;
					margin-right: 8px;
				}
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
			}
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