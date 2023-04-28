<template>
	<view class="wrap">
		<view class="content">
			<view class="recommend">
				<u-skeleton v-show="loading" class="dynamic" rows="3" title :loading="loading" avatar :animate="true" />
				<u-skeleton v-show="loading" class="dynamic" rows="4" title :loading="loading" avatar :animate="true" />
				<u-skeleton v-show="loading" class="dynamic" rows="5" title :loading="loading" avatar :animate="true" />
				<u-empty v-show="!starArticleLists.length && !loading" mode="comment" iconSize='110' style="margin-top: 10vh;"
					text='暂时还没有收藏的内容哦' textSize='16' icon="../../../static/status/emptyPage.png">
				</u-empty>
				<div v-show="!loading && starArticleLists.length">
					<GF-starArticle v-for="(item, index) in starArticleLists" :key="item.id" :item='item' :baseUrl="baseUrl">
					</GF-starArticle>
				</div>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getUserStarArticle
	} from "@/services/user.js"
	import {
		baseUrl
	} from '@/api/config.js'
	export default {
		data() {
			return {
				loading: false,
				starArticleLists: [],
				baseUrl: '',
			};
		},
		onLoad() {},
		onReady() {
			this.baseUrl = baseUrl;
			this.loading = true;
			this.getStarArticleList();
		},
		methods: {
			async getStarArticleList() {
				const res = await getUserStarArticle({});
				console.log(res);
				if (res) {
					this.starArticleLists = res;
				}
				this.loading = false;
			},
		},
	};
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