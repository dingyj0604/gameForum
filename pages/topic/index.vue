<template>
	<view class="wrap">
		<view class="top">
			<u-avatar class="avatar" src="../../static/image/icon.png" size='80' shape='square'></u-avatar>
			<view class="right">
				<div style='display: flex;justify-content: space-between;align-items: center;'>
					<u--text class='title' :text="title" align='left' size='25' color='#212121' margin='2px 0' />
					<u-button v-show="!isFollow" class="button" type="primary" icon='plus' :hairline="true" text="关注"
						@click="follow()"></u-button>
					<u-button v-show="isFollow" class="button" type="info" icon='checkbox-mark' :plain="true" color='#8c8c8c'
						text="已关注" @click="visible=true"></u-button>
				</div>
				<span style='font-size: 16px;color: #676767;margin-bottom: 4px;'>{{introduce || "话题暂无介绍哦..."}}</span>
			</view>
			<u-modal :show="visible" @confirm="followConfirm" ref="followModal" :asyncClose="true" @close="closeFollowModal"
				@cancel="closeFollowModal" showCancelButton content="确认取消关注？" :closeOnClickOverlay="true"></u-modal>
		</view>
		<view class="content">
			<view class="select">
				<div>最新</div>
				<div>原神
					<u-icon name="bookmark" style='margin-left: 5px;margin-right: 10px;display: inline-block;' />
				</div>
			</view>
			<u-divider class='divider' text=""></u-divider>
			<view class="list">
				<u-empty v-show="!articleList.length && !loading" mode="comment" iconSize='110' class='empty'
					text='该话题下暂时还没有内容哦' textSize='16' icon="../../static/status/emptyList.png">
				</u-empty>
				<u-skeleton v-show="loading" class="dynamic" rows="6" title :loading="loading" avatar :animate="true" />
				<u-skeleton v-show="loading" class="dynamic" rows="6" title :loading="loading" avatar :animate="true" />
				<div v-show="!loading">
					<GF-article v-for="(item, index) in articleList" :key="item.id" :item='item' :followUsers='followUsers'>
					</GF-article>
				</div>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getTopicDetail
	} from "@/services/topic.js"
	import {
		articleListByTopic
	} from "@/services/article.js"
	import {
		concernTopic,
		getUserConcernTopic,
		getFollowUsers
	} from "@/services/user.js"
	export default {
		data() {
			return {
				loading: false,
				visible: false,
				topicId: '',
				userId: '',
				title: '',
				introduce: '',
				isFollow: false,
				articleList: [],
				followUsers: [],
			};
		},
		computed: {

		},
		async onShow() {
			this.userId = uni.getStorageSync("userId");
		},
		async onLoad(option) {
			this.topicId = option.id;
			const res = await getTopicDetail({
				id: option.id
			})
			this.title = res.title;
			this.introduce = res.introduce;
			this.getArticleList()
			this.getConcernTopic();
			this.getFollowUsers();
		},
		async onReady() {
			this.loading = true;
		},
		methods: {
			async getFollowUsers() {
				const res = await getFollowUsers({});
				if (res) {
					this.followUsers = res;
				}
			},
			async concernTopic() {
				const res = await concernTopic({
					concernId: this.topicId
				})
				if (res) this.isFollow = !this.isFollow;
			},
			async getArticleList() {
				const res = await articleListByTopic({
					subjectId: this.topicId
				})
				if (res) this.articleList = [...res];
				this.loading = false;
			},
			async getConcernTopic() {
				const res = await getUserConcernTopic({})
				console.log('getConcernTopic', res);
				const temp = res.filter((item) => item.id === this.topicId);
				if (temp.length) this.isFollow = true;
				else this.isFollow = false;
			},
			follow() {
				this.concernTopic();
			},
			closeFollowModal() {
				this.visible = false;
			},
			followConfirm() {
				this.concernTopic();
				setTimeout(() => {
					this.visible = false;
				}, 200)
			},
			toDetail(item) {
				uni.navigateTo({
					url: `/pages/home/articleDetails?id=${item.id}`,
				})
			},
		},
	};
</script>

<style lang="scss" scoped>
	.wrap {
		background-color: #c9dce6;
		padding: 0;
		margin: 0;

		.top {
			padding: 7vh 12px 24px 12px;
			display: flex;
			flex-direction: row;
			flex-wrap: nowrap;

			.avatar {
				border: 1px solid aquamarine;
			}

			.right {
				margin-left: 16px;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				width: 100%;

				.button {
					margin-right: 8px;
					padding: 0 6px;
					width: 70px;
					height: 30px;
				}
			}
		}

		.content {
			background-color: white;
			border-radius: 18px 18px 0 0;

			.select {
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 12px 12px 6px 12px;
			}

			.divider {
				margin: 6px 0;
			}

			.empty {
				margin-top: 10vh !important;
			}

			.dynamic {
				padding: 10px 12px;
			}
		}
	}
</style>