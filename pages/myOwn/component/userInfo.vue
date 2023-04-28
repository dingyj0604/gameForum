<template>
	<view class="wrap">
		<image class="topBg" src="../../../static/image/ownBg1.png"></image>
		<view class="content">
			<view class="top">
				<view class="topLeft">
					<u-avatar :src="`${baseUrl}${userInfo.portraitPath.replace(/\\/g, '\/')}`" size='115'></u-avatar>
				</view>
				<view class="topRight">
					<u-button class="topButton" type="primary" icon='edit-pen' :plain="true" :hairline="true" @click="edit()">
						编辑
					</u-button>
					<u-row justify="space-between" align='center' class="topInfo">
						<u-col span="4" justify="center" align='center' @click="toConcernPage">
							<span class="num">{{userInfo.follow}}</span>关注
						</u-col>
						<u-col span="4" justify="center" align='center'>
							<span class="num">{{userInfo.fenNum}}</span>粉丝
						</u-col>
						<u-col span="4" justify="center" align='center'>
							<span class="num">{{userInfo.likeNum}}</span>获赞
						</u-col>
					</u-row>
				</view>
			</view>
			<view class="center">
				<span class="name">{{userInfo.name}}</span>
				<span class="signature">
					<u-icon name="tags" style='margin-right: 6px;' size='20'></u-icon>
					{{userInfo.autograph || "系统原装签名，留给每一位小可爱..."}}
				</span>
			</view>
			<u-gap height="25" bgColor="#E6E6E6" style='margin: 0 10px;'></u-gap>
			<view class="bottom">
				<u-sticky bgColor="#fff">
					<u-tabs class="tab" :list="list" :current='current' itemStyle="height:60px; width:27%" lineWidth='22'
						:activeStyle="{ color: '#2ab7f3', fontWeight: 'bold', transform: 'scale(1.25)'}"
						:inactiveStyle="{ transform: 'scale(1.15)' }" @click='tabChange'></u-tabs>
					<u-skeleton v-show="loading" class="dynamic" rows="3" title :loading="loading" avatar :animate="true" />
					<u-skeleton v-show="loading" class="dynamic" rows="3" title :loading="loading" avatar :animate="true" />
					<div v-show="!loading">
						<view v-if="current===0">
							<GF-personalArticle v-for="(item, index) in personalArticleList" :key="item.id" :item='item' :baseUrl="baseUrl">
							</GF-personalArticle>
						</view>
						<view v-else-if="current===1"></view>
						<view v-else>
							<GF-article v-for="(item, index) in starArticleList" :key="item.id" :item='item' :baseUrl="baseUrl"
								:followUsers='followUsers'>
							</GF-article>
						</view>
						<u-empty v-show="!haveMes" mode="message" iconSize='110' text='这里空空的' textSize='16'
							icon="http://cdn.uviewui.com/uview/empty/message.png" style='margin-top: 30px;'>
						</u-empty>
					</div>
				</u-sticky>
			</view>
			<u-toast ref="uToast" />
		</view>
	</view>
</template>

<script>
	import {
		getUserInfoByToken,
		getUserStarArticle,
		getUserPublishArticle,
		getFollowUsers
	} from "@/services/user.js"
	import {
		baseUrl
	} from '@/api/config.js'
	export default {
		data() {
			return {
				userInfo: {
					portrait: '',
					name: '',
					autograph: '',
					username: '',
					fenNum: '0',
					follow: '0',
					likeNum: '0',
					portraitPath: ''
				},
				baseUrl: '',
				loading: false,
				haveMes: false,
				current: 0,
				personalArticleList: [],
				starArticleList: [],
				commentList: [],
				followUsers: [],
				list: [{
					name: '发布',
				}, {
					name: '评论',
				}, {
					name: '收藏'
				}]
			};
		},
		computed: {

		},
		onShow() {
			this.getUserInfo();
		},
		onLoad() {},
		onReady() {
			this.baseUrl = baseUrl;
			this.isLogin = uni.getStorageSync("token") ? true : false;
			this.loading = true;
			this.getUserInfo();
			this.getPersonalArticleList();
		},
		methods: {
			async getUserInfo() {
				const userInfo = await getUserInfoByToken({});
				if (userInfo) {
					this.userInfo = {
						...userInfo
					};
				} else this.isLogin = false;
			},
			async getFollowUsers() {
				const res = await getFollowUsers({});
				if (res) {
					this.followUsers = res;
				}
			},
			async getPersonalArticleList() {
				const res = await getUserPublishArticle({});
				if (res) {
					this.personalArticleList = res;
					this.haveMes = res.length ? true : false;
				}
				this.loading = false;
			},
			async getStarArticleList() {
				const res = await getUserStarArticle({});
				if (res) {
					this.starArticleList = res;
					this.haveMes = res.length ? true : false;
				}
				this.loading = false;
			},
			edit() {
				uni.navigateTo({
					url: '/pages/myOwn/component/editUser'
				});
			},
			toConcernPage() {
				uni.navigateTo({
					url: '/pages/myOwn/component/concernUsers'
				});
			},
			tabChange(item) {
				console.log(item);
				this.loading = true;
				if (item.index === 0) {
					setTimeout(() => {
						this.getPersonalArticleList();
					}, 500)
				} else if (item.index === 1) {
					this.commentList = [];
					this.haveMes = this.commentList.length ? true : false;
					this.loading = false;
				} else {
					setTimeout(() => {
						this.getStarArticleList();
						this.getFollowUsers();
					}, 500)
				}
				this.current = item.index;
			},
		}
	}
</script>

<style lang="scss" scoped>
	.wrap {
		// min-height: 100vh;
		background-color: white;
		font-size: 16px;

		.topBg {
			width: 100vw;
			height: 26vh;
		}

		.content {
			width: 100vw;
			margin: 0vw auto 0;
			position: relative;
			top: -50px;

			.top {
				// height: 20vh;
				display: flex;
				flex-direction: row;
				flex-wrap: nowrap;
				position: relative;
				top: -36px;

				.topLeft {
					width: 30%;
					position: relative;
					left: 20px;
				}

				.topRight {
					width: 70%;
					display: flex;
					flex-direction: column;

					.topButton {
						margin-right: 8px;
						position: relative;
						text-align: center;
						top: -10px;
						padding: 0 6px;
						width: 80px;
						height: 30px;
					}

					.topInfo {
						margin-left: 10px;
						margin-right: 8px;
						position: relative;
						right: -10px;
						font-size: 15px;
						top: 16px;

						.num {
							font-size: 21px;
							margin-bottom: 8px;
						}
					}
				}
			}

			.center {
				position: relative;
				top: -10px;
				padding: 0px 16px;
				color: #7e7e7e;

				.name {
					font-size: 28px;
					margin: 8px;
				}

				.signature {
					height: 50px;
					margin-top: 16px;
					font-size: 16px;
					display: flex;
					flex-wrap: nowrap;
					align-items: flex-start;
					justify-content: flex-start;
				}
			}

			.bottom {
				padding: 0px 12px;

				.tab {
					border-bottom: 1px solid #d6d6d6;
				}

				.dynamic {
					padding: 10px 12px;
				}
			}
		}
	}
</style>