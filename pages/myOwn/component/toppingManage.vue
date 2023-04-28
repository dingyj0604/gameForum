<template>
	<view class="wrap">
		<view class="content">
			<view class="recommend">
				<u-skeleton v-show="loading" class="dynamic" rows="3" title :loading="loading" avatar :animate="true" />
				<u-skeleton v-show="loading" class="dynamic" rows="4" title :loading="loading" avatar :animate="true" />
				<u-skeleton v-show="loading" class="dynamic" rows="5" title :loading="loading" avatar :animate="true" />
				<u-empty v-show="!articleList.length && !loading" mode="comment" iconSize='110' style="margin-top: 10vh;"
					text='当前还没有需要置顶的内容哦' textSize='16' icon="../../../static/status/emptyPage.png">
				</u-empty>
				<div v-show="!loading">
					<GF-topping v-for="(item, index) in articleList" :key="item.id" :item='item' :baseUrl="baseUrl">
					</GF-topping>
				</div>
			</view>
		</view>
	</view>
	</view>
</template>

<script>
	import {
		articleList,
	} from "@/services/article.js"
	import {
		baseUrl
	} from '@/api/config.js'
	export default {
		data() {
			return {
				articleList: [],
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
			this.getArticleList();
		},
		methods: {
			async getArticleList() {
				const res = await articleList({
					type: "TIP"
				});
				if (res) {
					this.articleList = res;
				}
				this.loading = false;
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