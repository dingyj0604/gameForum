<template>
	<view class="wrap">
		<u-navbar class="navbar" title="" :safeAreaInsetTop="true" :fixed="false">
			<view class="u-nav-slot" slot="left">
				<span class='text'>原神</span>
				<u-line class="u-line" length="30px"></u-line>
			</view>
			<view class="u-nav-slot" slot="right">
				<u-icon class='search' name="search" size="35" @click="toSearch"></u-icon>
			</view>
		</u-navbar>
		<view class="content">
			<view class="hot">
				<div>
					<span class='text'>热门话题</span>
					<u-line class="u-line" length="28px"></u-line>
				</div>
				<u-skeleton v-show="loading" style='margin: 16px 0;' rows="2" :title='false' :loading="loading" :animate="true">
				</u-skeleton>
				<u-scroll-list :indicator="false" v-show="!loading">
					<view v-for="(item, index) in hotTopicList" :key="item.id">
						<view class="square" @click='toTopicDetail(item)'>
							<u--text :lines="1" :text="item.title" style='flex:0' lineHeight='36'></u--text>
							<span style='font-size: 14px;color: #acacac;margin-bottom: 8px;'>讨论
								{{item.discussion}}</span>
						</view>
					</view>
				</u-scroll-list>
			</view>
			<view class="topping">
				<div style='display: flex;align-items: center;margin-bottom: 5px;'>
					<image style='width: 28px;height: 28px;' src="../../static/image/topping.png"></image>
					<span class='text'>官方置顶</span>
				</div>
				<u-skeleton v-show="loading" rows="2" :title='false' :loading="loading" :animate="true"
					style='margin: 16px 0;' />
				<view v-for="(item, index) in toppingList" :key="item.id" v-show="!loading">
					<view class="square" @click="toDetail(item)">
						<u--text :lines="1" :text="item.title" align='left' size='15' style='flex:0' lineHeight='36'>
						</u--text>
						<u--text :text="item.updateAt" align='right' size='13' color='#acacac' style='flex:0' lineHeight='22'>
						</u--text>
					</view>
				</view>
			</view>
			<u-gap height="20"
				style='margin: 6px;background-image: linear-gradient(20deg,#ace0f9,#c2e9fb,#e0eeff);border-radius: 10px;opacity: 0.7;'>
			</u-gap>
			<view class="recommend">
				<div style='display: flex;align-items: center;margin: 12px 0 5px 12px;'>
					<image style='width: 28px;height: 28px;' src="../../static/image/recommend.png"></image>
					<span class='text'>推荐</span>
				</div>
				<u-skeleton v-show="loading" class="dynamic" rows="3" title :loading="loading" avatar :animate="true" />
				<u-skeleton v-show="loading" class="dynamic" rows="3" title :loading="loading" avatar :animate="true" />
				<div v-show="!loading">
					<GF-article v-for="(item, index) in articleList" :key="item.id" :item='item' :baseUrl="baseUrl"
						:followUsers='followUsers'>
					</GF-article>
				</div>
			</view>
		</view>
	</view>
	</view>
</template>

<script>
	import {
		hotTopicList
	} from "@/services/topic.js"
	import {
		articleList
	} from "@/services/article.js"
	import {
		getFollowUsers
	} from '@/services/user.js';
	import {
		baseUrl
	} from '@/api/config.js'
	export default {
		data() {
			return {
				hotTopicList: [],
				toppingList: [],
				articleList: [],
				followUsers: [],
				loading: false,
				baseUrl: '',
			}
		},
		onShow() {
			this.baseUrl = baseUrl;
		},
		onLoad() {
			// console.log('home');
		},
		onReady() {
			this.loading = true;
			this.getHotTopicList();
			this.getArticleList();
			this.getFollowUsers();
		},
		methods: {
			async getFollowUsers() {
				const res = await getFollowUsers({});
				if (res) {
					this.followUsers = res;
				}
			},
			async getHotTopicList() {
				const res = await hotTopicList({});
				if (res) {
					this.hotTopicList = res;
				}
			},
			async getArticleList() {
				const res = await articleList({
					type: "TIP"
				});
				if (res) {
					this.articleList = res;
					this.getToppingList(res);
				}
				this.loading = false;
			},
			getToppingList(list) {
				const res = list.filter((item) => item.topping);
				this.toppingList = res;
			},
			toTopicDetail(item) {
				uni.navigateTo({
					url: `/pages/topic/index?id=${item.id}`,
				})
			},
			toDetail(item) {
				console.log(item)
				uni.navigateTo({
					url: `/pages/home/articleDetails?id=${item.id}`,
				})
			},
			toSearch() {
				uni.navigateTo({
					url: "/pages/home/component/search"
				})
			},
		},
	}
</script>
<style lang="scss" scoped>
	.wrap {
		background-color: white;
		font-size: 16px;

		.navbar {
			// height: 20vh;
			margin-bottom: 15px;

			.u-nav-slot {
				padding: 30px 8px 0 8px;
				font-size: 26px;
				display: flex;
				flex-direction: column;
				align-items: flex-end;
				width: 75px;

				.text {
					position: relative;
					left: -22px;
				}

				.u-line {
					margin-right: 6px !important;
					height: 20px;
					position: relative;
					top: -12px;
					opacity: 0.9;
					border-bottom: 1px solid rgb(255, 143, 143);
					background-image: linear-gradient(to right, #FF4242, #FF8F8F);
				}

				.search {
					position: relative;
					top: -10px;
				}
			}
		}

		.content {
			padding: 6px 6px;

			.hot {
				margin: 0 6px;
				padding: 0 16px;
				border-top: 5px solid #ff9a78;
				border-radius: 8% 8% 0 0;

				.text {
					font-size: 20px;
					position: relative;
					top: 15px;
					// left: -30px;
				}

				.u-line {
					height: 20px;
					margin-left: 55px !important;
					opacity: 0.6;
					border-bottom: 1px solid rgb(255, 143, 143);
					background-image: linear-gradient(to right, #FF4242, #FF8F8F);
				}

				.square {
					margin: 5px 10px 8px 2px;
					padding: 6px 10px;
					display: flex;
					flex-direction: column;
					// height: 70px;
					width: 130px;
					border-radius: 5px;
					border: 0.6px solid #E5E5E5;
					box-shadow: 0 0 4px #E5E5E5;
				}
			}

			.topping {
				margin: 3px 6px;
				display: flex;
				flex-direction: column;
				justify-content: center;
				padding: 0px 6px;

				.square {
					margin: 6px auto;
					padding: 5px 10px;
					background-color: #F8F8F8;
					display: flex;
					flex-direction: column;
					justify-content: center;
					width: 90%;
					border-radius: 5px;
					border: 0.3px solid #E5E5E5;
					box-shadow: 0 0 2px #E5E5E5;
				}

				.text {
					font-size: 19px;
					margin-left: 8px;
				}
			}

			.recommend {
				// margin: 12px 0px;
				display: flex;
				flex-direction: column;
				justify-content: center;
				padding: 4px 0px;

				.text {
					font-size: 19px;
					margin-left: 8px;
				}

				.dynamic {
					padding: 10px 12px;
				}
			}
		}
	}
</style>