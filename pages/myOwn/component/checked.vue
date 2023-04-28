<template>
	<view class="wrap">
		<view class="content">
			<view class="recommend">
				<u-skeleton v-show="loading" class="dynamic" rows="3" title :loading="loading" avatar :animate="true" />
				<u-skeleton v-show="loading" class="dynamic" rows="4" title :loading="loading" avatar :animate="true" />
				<u-skeleton v-show="loading" class="dynamic" rows="5" title :loading="loading" avatar :animate="true" />
				<u-empty v-show="!examineArticleList.length && !loading" mode="comment" iconSize='110' style="margin-top: 10vh;"
					text='当前暂时还没有待审核内容哦' textSize='16' icon="../../../static/status/emptyPage.png">
				</u-empty>
				<div v-show="!loading">
					<GF-checkedArticle v-for="(item, index) in examineArticleList" :key="item.id" :item='item' :baseUrl="baseUrl">
					</GF-checkedArticle>
				</div>
			</view>
		</view>
	</view>
	</view>
</template>

<script>
	import {
		examineArticleList,
		examineArticle
	} from "@/services/article.js"
	import {
		baseUrl
	} from '@/api/config.js'
	export default {
		data() {
			return {
				userId: '',
				examineArticleList: [],
				loading: false,
				baseUrl: '',
			}
		},
		onShow() {
			this.userId = uni.getStorageSync("userId");
			this.baseUrl = baseUrl;
		},
		onLoad() {
			// console.log('home');
		},
		onReady() {
			this.loading = true;
			this.getExamineArticleList();
		},
		methods: {
			async getExamineArticleList() {
				const res = await examineArticleList({});
				if (res) {
					this.examineArticleList = [...res];
				}
				setTimeout(() => {
					this.loading = false;
				}, 1000)
			},
			toTopicDetail(item) {
				uni.navigateTo({
					url: `/pages/topic/index?id=${item.id}`,
					success: function(res) {
						// 通过eventChannel向被打开页面传送数据
						res.eventChannel.emit('acceptDataFromOpenerPage', {
							data: 'data from starter page'
						})
					}
				})
			},
			toDetail(item) {
				console.log(item)
				uni.navigateTo({
					url: `/pages/home/articleDetails?id=${item.id}`,
					success: function(res) {
						res.eventChannel.emit('acceptDataFromOpenerPage', {
							data: 'data from starter page'
						})
					}
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

		.content {
			padding: 6px 6px;

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