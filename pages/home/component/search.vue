<template>
	<view class="wrap">
		<u-search :show-action="true" actionText="搜索" :animation="true" :clearabled="true" shape="round"
			placeholder="请输入关键词" v-model="value" @search="search(value)" @custom="search(value)"></u-search>
		<u-cell-group class='list'>
			<u-cell v-for="(item, index) in searchList" :key="item.id" class='listItem' :title="item.title" isLink
				@click='toTopicDetail(item)'></u-cell>
		</u-cell-group>
		<!-- <view class="list">
			<u-tag v-for="(item, index) in topicList" :key="item.id" :text="item.title" type="info" class="tag"
				bgColor='#d9d9d9' borderColor='#d0d0d0' @click='toTopicDetail()'></u-tag>
		</view> -->
	</view>
</template>

<script>
	import {
		searchTopicList,
		getAllTopics
	} from "@/services/topic.js"
	export default {
		data() {
			return {
				value: '',
				searchList: [],
				topicList: []
			};
		},
		computed: {

		},
		async onReady() {
			// console.log(111)
			// const res = await getAllTopics({});
			// if (res) {
			// 	this.topicList = res;
			// }
		},
		methods: {
			async search(value) {
				try {
					const res = await searchTopicList({
						keyword: value
					});
					console.log(res);
					if (res.length) {
						this.searchList = res;
					} else {
						uni.$u.toast("搜索结果为空");
						this.searchList = [];
					}
				} catch (e) {
					uni.$u.toast(e);
				}
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
			}
		},
	};
</script>

<style lang="scss" scoped>
	.wrap {
		background-color: white;
		padding: 12px;

		.list {
			margin-top: 20px;
			display: flex;
			// align-items: center;
			// flex-wrap: wrap;
			// justify-content: flex-start;

			.tag {
				margin: 8px auto;
			}
		}
	}
</style>
