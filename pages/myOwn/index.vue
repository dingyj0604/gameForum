<template>
	<view class="wrap">
		<image class="topBg" src="../../static/image/ownBg.png"></image>
		<view class="content">
			<view class="top">
				<view class="topLeft">
					<u-avatar class="avatar" :src="`${baseUrl}${userInfo.portraitPath.replace(/\\/g, '\/')}`" size='100'>
					</u-avatar>
					<u--text v-show="isLogin" class="name" :text="userInfo.name" :lines="2" align='left' size='27'
						color='#212121' margin='12px 0 12px 0' />
					<span v-show="isLogin" style='font-size: 16px;'>通行证ID：{{userInfo.username}}</span>
					<view v-show="!isLogin" style="display: flex;flex-direction: column;margin-top: 12px;margin-left: 10px;">
						<view class='login' hover-class="login-hover" @click="toLogin">
							<span style='font-size: 27px;margin: 10px 0;'>请登录</span>
							<image src="../../static/image/login.png"
								style="width: 27px;height: 28px;margin-left: 12px;margin-top: 4px;">
							</image>
						</view>
						<u--text text="登录解锁更多精彩" :lines="1" align='left' size='16' lineHeight='28' color='#8b8b8b'>
						</u--text>
					</view>
				</view>
				<view class="topRight">
					<u-button v-show="isLogin" class="topButton" type="text" :plain="true" :hairline="false" @click='toUserInfo'>
						个人主页<u-icon name="arrow-right" style='margin-left: 5px;'></u-icon>
					</u-button>
					<image style='width: 100px;height: 100px;margin: 12px auto 8px 2px;' src="../../static/image/icon.png">
					</image>
				</view>
			</view>
			<u-gap height="8" bgColor="#E6E6E6" style='margin: 10px 10px;'></u-gap>
			<view class="center">
				<u-row justify="space-between">
					<u-col span="3" style='display: inline-block;text-align: center;'>
						<span class="num">{{userInfo.fenNum}}</span>粉丝
					</u-col>
					<u-col span="3" style='display: inline-block;text-align: center;' @click="toConcernUsersPage">
						<span class="num">{{userInfo.follow}}</span>关注
					</u-col>
					<u-col span="3" style='display: inline-block;text-align: center;'>
						<span class="num">{{userInfo.likeNum}}</span>获赞
					</u-col>
					<u-col span="3"></u-col>
				</u-row>
			</view>
			<u-gap height="25" bgColor="#E6E6E6" style='margin: 10px 10px 16px 10px;'></u-gap>
			<view class="square">
				<u-row justify="space-between" style='height: 100%;'>
					<u-col span="4" justify='center' align='center' @click="toConcernTopicsPage">
						<image class='icon' src="/static/image/atlas.png"></image>
						<span>关注话题</span>
					</u-col>
					<u-col span="4" justify='center' align='center'  @click="toArticlePublishPage">
						<image class='icon' src="/static/image/history1.png"></image>
						<span>浏览历史</span>
					</u-col>
					<u-col span="4" justify='center' align='center' @click="toCollectionsPage">
						<image class='icon' src="/static/image/star.png"></image>
						<span>收藏</span>
					</u-col>
				</u-row>
			</view>
			<view v-show="isLogin">
				<u-cell v-show="isAdmin" icon='grid-fill' size='large' class="cell" title="审核" :isLink="true"
					url="/pages/myOwn/component/checked"></u-cell>
				<u-cell v-show="isAdmin" icon='arrow-up-fill' size='large' class="cell" title="置顶管理" :isLink="true"
					url="/pages/myOwn/component/toppingManage"></u-cell>
				<u-cell v-show="isAdmin" icon='chat-fill' size='large' class="cell" title="话题管理" :isLink="true"
					url="/pages/myOwn/component/topicManage"></u-cell>
				<u-cell icon='setting' size='large' class="cell" title="设置" :isLink="true"
					url="/pages/myOwn/component/setting"></u-cell>
			</view>
			<u-toast ref="uToast" />
		</view>
	</view>
</template>

<script>
	import {
		getUserInfoByToken
	} from "@/services/user.js"
	import {
		baseUrl
	} from '@/api/config.js'
	export default {
		data() {
			return {
				isLogin: false,
				baseUrl: '',
				isAdmin: false,
				userInfo: {
					portrait: '',
					name: '',
					username: '',
					autograph: '',
					fenNum: '0',
					follow: '0',
					likeNum: '0',
					portraitPath: ''
				}
			};
		},
		computed: {

		},
		async onShow() {
			// console.log("用户role", uni.getStorageSync("role"))
			// console.log("用户token", uni.getStorageSync("token"))
			this.baseUrl = baseUrl;
			// console.log(111)
			this.isLogin = uni.getStorageSync("token") && this.userInfo.username ? true : false;
			try {
				const userInfo = await getUserInfoByToken({});
				if (userInfo) {
					this.userInfo = {
						...userInfo
					};
					this.isAdmin = userInfo.role === "ROLE_ADMIN" ? true : false;
					this.isLogin = true;
				} else this.isLogin = false;
			} catch (e) {
				this.isLogin = false;
			}
		},
		async onLoad() {
			// console.log(222)
		},
		async onReady() {
			// console.log(333)
		},
		methods: {
			toUserInfo() {
				if (this.isLogin) {
					uni.navigateTo({
						url: '/pages/myOwn/component/userInfo'
					});
				}
			},
			toLogin() {
				uni.navigateTo({
					url: '/pages/login/index'
				});
			},
			toConcernUsersPage() {
				if (this.isLogin) {
					uni.navigateTo({
						url: '/pages/myOwn/component/concernUsers'
					});
				}
			},
			toConcernTopicsPage() {
				if (this.isLogin) {
					uni.navigateTo({
						url: '/pages/myOwn/component/concernTopics'
					});
				}
			},
			toCollectionsPage(){
				if (this.isLogin) {
					uni.navigateTo({
						url: '/pages/myOwn/component/collections'
					});
				}
			},
			toArticlePublishPage(){
				if (this.isLogin) {
					uni.navigateTo({
						url: '/pages/publish/articlePublish'
					});
				}
			}
		},
	};
</script>

<style lang="scss" scoped>
	.wrap {
		// min-height: 100vh;
		background-color: white;
		padding: 0;
		margin: 0;

		.topBg {
			width: 100vw;
			height: 25vh;
		}

		.content {
			width: 100vw;
			margin: 0vw auto 0;

			.top {
				height: 20vh;
				display: flex;
				flex-direction: row;
				flex-wrap: nowrap;

				.topLeft {
					width: 70%;
					display: flex;
					flex-direction: column;
					position: relative;
					top: -60px;
					left: 20px;

					.avatar {
						position: relative;
						left: 0px;
					}

					.login {
						width: 50%;
						display: flex;
						align-items: center;
					}

					.login-hover {
						background-color: #efefef;
						box-shadow: 0 0 8px #f4f4f4;
						border-radius: 10px;
					}

					.name {
						font-size: 27px;
						padding-right: 120px;
						width: 80%;
					}
				}

				.topRight {
					width: 30%;
					display: flex;
					flex-direction: column;

					.topButton {
						margin-right: 0;
						background-color: #E5E5E5;
						position: relative;
						text-align: center;
						padding: 0 6px;
						width: 100px;
						height: 30px;
					}
				}
			}

			.center {
				margin-top: 10px;
				padding: 10px 10px;
				color: #7e7e7e;

				.num {
					font-size: 20px;
					color: #505050;
					margin-right: 5px;
				}
			}

			.square {
				margin: 12px 24px;
				height: 150px;
				border-radius: 6px;
				border: 1px solid #E5E5E5;
				box-shadow: 0 0 8px #f4f4f4;

				.icon {
					height: 36px;
					width: 36px;
					margin-bottom: 8px;
				}
			}
		}

		.cell {
			background-color: #f4f4f4;
			margin-top: 6px;
		}
	}
</style>