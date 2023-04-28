<template>
	<view class="wrap">
		<u-tabs class="tabs" :current="tabCurrent" :list="tablist" @click="tabClick" lineHeight='6' lineWidth='25'
			:activeStyle="{ color: '#27282a', fontWeight: 'bold', transform: 'scale(1.5)'}"
			:inactiveStyle="{color: '#6e6f75', transform: 'scale(1.3)' }"
			itemStyle="padding-left: 20px; padding-right:20px; height: 56px;"></u-tabs>
		<view class="content">
			<u-swiper class="swiper" v-show="tabCurrent===1" :list="swiperList" indicator indicatorMode="line" circular>
			</u-swiper>
			<u-skeleton v-show="loading" style='margin: 48px auto;width: 90%;' avatar rowsWidth='90%' rows="6" title
				:loading="loading" :animate="true" />
			<u-skeleton v-show="loading" style='margin: 48px auto;width: 90%;' avatar rowsWidth='90%' rows="6" title
				:loading="loading" :animate="true" />
			<view v-show="!loading" class="recommend">
				<u-empty v-show="!dynamicList.length && !loading" mode="comment" iconSize='110' style='margin-top: 68px;'
					text='暂时还没有动态哦' textSize='16' icon="../../static/status/emptyList.png">
				</u-empty>
				<div v-for="(item, index) in mockDynamicList" :key="item.id">
					<view class="dynamic">
						<view class="avatar">
							<div style='display: flex;align-items: center;'>
								<u-avatar :src="item.userAavatarSrc" size='36'></u-avatar>
								<div style='margin-left: 10px;'>
									<u--text :lines="1" :text="item.userName" align='left' size='15' lineHeight='26' />
									<u--text mode="date" :text="item.date" align='left' size='13' color='#acacac' />
								</div>
							</div>
							<u-button v-show="!item.isFollow" class="button" type="primary" icon='plus' :plain="true" :hairline="true"
								text="关注" @click="follow(item,index)">
							</u-button>
							<u-button v-show="item.isFollow" class="button" type="info" icon='checkbox-mark' :plain="true"
								color='#8c8c8c' text="已关注" @click="showFollowModal(item)"></u-button>
						</view>
						<view class="content">
							<u--text :text="item.title" align='left' size='16' @click="toDetail(item)" />
							<u--text :text="item.content" :lines="3" align='left' size='15' color='#8b8b8b' @click="toDetail(item)" />
							<u-album class='album' :urls="item.img" singleSize='300' :multipleSize="item.img.length===2 ? 150 : 100"
								:rowCount="3" />
						</view>
						<view class="option">
							<u-tag :text="item.tag" type="info" class="tag" bgColor='#d9d9d9' borderColor='#d0d0d0'>
							</u-tag>
							<u-row justify="space-between" align='center' gutter='10'>
								<u-col span="4" justify='center' align='center'>
									<u-icon name="more-circle" size="22" :label='item.comments.length' labelSize='14'>
									</u-icon>
								</u-col>
								<u-col span="4" justify='center' align='center'>
									<u-icon v-show="item.isLike" name="thumb-up-fill" color='#2979ff' size="25" :label='item.likes'
										labelSize='14' @click='dislike(item)'></u-icon>
									<u-icon v-show="!item.isLike" name="thumb-up" size="25" :label='item.likes' labelSize='14'
										@click='like(item)'></u-icon>
								</u-col>
								<u-col span="4" justify='center' align='center'>
									<u-icon name="share" size="25"></u-icon>
								</u-col>
							</u-row>
						</view>
					</view>
					<u-gap height="10" bgColor="#f6f6f6" style='border-radius: 2px;margin: 10px 0;'>
					</u-gap>
					<div v-show="!loading">
						<GF-article v-for="(item, index) in dynamicList" :key="item.id" :item='item' :baseUrl="baseUrl">
						</GF-article>
					</div>
				</div>
			</view>
		</view>
	</view>
	</view>
</template>

<script>
	import {
		followUser,
		unfollowUser
	} from '@/services/user.js';
	import {
		articleList,
		supportArticle,
		unsupportArticle
	} from "@/services/article.js";
	import {
		mockDynamicList
	} from './mockData.js';
	import {
		baseUrl
	} from '@/api/config.js'
	export default {
		data() {
			return {
				loading: false,
				followVis: false,
				currentFollowUser: {},
				tabCurrent: 0,
				tablist: [{
					name: '关注',
				}, {
					name: '发现',
				}],
				swiperList: [
					'../../static/swiper/swiper1.png',
					'../../static/swiper/swiper2.png',
				],
				dynamicList: [],
				mockDynamicList: [...mockDynamicList]
			}
		},
		onLoad() {
			console.log('home');
		},
		onReady() {
			this.loading = true;
			this.getDynamicList();
		},
		methods: {
			async getDynamicList() {
				try {
					const res = await articleList({
						type: "TREND"
					});
					if (res) {
						this.dynamicList = res;
					}
				} catch (e) {}
				uni.$u.sleep(2000).then(() => {
					this.loading = false
				})
			},
			toDetail(item) {
				uni.navigateTo({
					url: `/pages/dynamic/dynamicDetails?id=${item.id}`,
				})
			},
			tabClick(item) {
				this.tabCurrent = item.index;
			},
			async follow(item, index) {
				console.log("关注", item.userName);
				this.dynamicList[index].isFollow = true;
			},
			showFollowModal(item) {
				this.currentFollowUser = item;
				this.followVis = true;
			},
			closeFollowModal() {
				this.followVis = false;
				this.currentFollowUser = {};
			},
			followConfirm() {
				console.log("取消关注", this.currentFollowUser);
				this.dynamicList.map((item) => {
					if (item.id === this.currentFollowUser.id) {
						item.isFollow = false;
					}
				})
				setTimeout(() => {
					this.followVis = false;
				}, 500)
			}
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
</script>
<style lang="scss" scoped>
	@import "control.scss";

	.wrap {
		width: 100vw;
		background-color: white;
		font-size: 16px;

		.tabs {
			width: 100vw;
			align-items: center;
			background-color: #fafafa;
			box-shadow: 0 0 2px #d1d1d1;
			padding-top: 32px;
		}

		.content {
			.swiper {
				background-color: #fefefe;
				padding: 16px 16px;
			}

			.recommend {
				padding: 6px 12px;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;

				.text {
					font-size: 19px;
					margin-left: 8px;
				}

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

					.option {
						.tag {
							width: 50px;
							margin-left: 5px;
							margin-bottom: 6px;
						}
					}
				}
			}
		}
	}
</style>