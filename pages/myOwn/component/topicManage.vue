<template>
	<view class="wrap">
		<u-sticky offset-top="10" class="sticky">
			<u-button class='button' type="primary" shape="square" plain
				@click="()=>{modalStyle='新建话题';isShow=true;}">新&nbsp;&nbsp;增
			</u-button>
		</u-sticky>
		<u-swipe-action>
			<u-swipe-action-item :options="options" v-for="(item, index) in topicList" :key="item.id"
				@click='(option)=>checkOption(option,item)'>
				<view class="swipe-action u-border-top u-border-bottom">
					<view class="swipe-action__content">
						<text class="swipe-action__content__text">{{item.title}}</text>
					</view>
				</view>
			</u-swipe-action-item>
		</u-swipe-action>
		<u-modal :show="isShow" @confirm="confirm" @cancel="onCancel" @close='onCancel' :closeOnClickOverlay="true"
			:showCancelButton="true" :title="modalStyle">
			<view class="form">
				<view class='row' style="margin-bottom: 16px;">
					<span class='label'>标题：</span>
					<u--input class='input' placeholder="请输入..." border="bottom" v-model="title" maxlength='10' />
				</view>
				<view class='row'>
					<span class='label'>简介：</span>
					<u--textarea class='input' style='height: 24vh;' v-model="introduce" placeholder="系统原装，留给每一位小可爱..." count
						maxlength='400' />
				</view>
			</view>
		</u-modal>
		<u-notify ref="uNotify"></u-notify>
	</view>
</template>

<script>
	import {
		addTopic,
		updateTopic,
		getAllTopics
	} from "@/services/topic.js"
	export default {
		data() {
			return {
				title: '',
				introduce: '',
				isShow: false,
				modalStyle: '新建话题',
				inEditTopicId: '',
				topicList: [],
				options: [{
					text: '详情',
					style: {
						backgroundColor: '#ffaa00'
					}
				}, {
					text: '编辑',
					style: {
						backgroundColor: '#3c9cff'
					}
				}, {
					text: '删除',
					style: {
						backgroundColor: '#f56c6c'
					}
				}],
			};
		},
		computed: {

		},
		async onReady() {
			this.getAllLists();
		},
		methods: {
			async getAllLists() {
				const res = await getAllTopics({});
				if (res) {
					this.topicList = res;
				}
			},
			async confirm(item) {
				console.log(this.title, this.introduce);
				if (this.title !== "") {
					if (this.modalStyle === '新建话题') {
						try {
							const result = await addTopic({
								title: this.title,
								introduce: this.introduce,
							});
							if (result) {
								this.$refs.uNotify.show({
									message: '新建话题成功',
								});
								this.getAllLists();
							}
						} catch (err) {
							this.$refs.uNotify.error(err.message);
						}
					} else {
						try {
							const result = await updateTopic(this.inEditTopicId, {
								title: this.title,
								introduce: this.introduce,
							});
							if (result) {
								this.$refs.uNotify.show({
									message: '更新话题成功',
								});
								this.getAllLists();
							}
						} catch (err) {
							this.$refs.uNotify.error(err.message);
						}
					}
					this.title = "";
					this.introduce = "";
					this.inEditTopicId = '';
					this.isShow = false;
				} else {
					this.$refs.uNotify.warning('标题不能为空');
				}
			},
			onCancel() {
				this.title = "";
				this.introduce = "";
				this.inEditTopicId = '';
				this.isShow = false;
			},
			checkOption(option, item) {
				console.log(option, item);
				if (option.index === 0) {
					this.toTopicDetail(item);
				} else if (option.index === 1) {
					this.inEditTopicId = item.id;
					this.title = item.title;
					this.introduce = item.introduce || '';
					this.modalStyle = '编辑话题';
					this.isShow = true;
				} else {
					this.$refs.uNotify.warning('删除该话题');
				}
			},
			toTopicDetail(item) {
				uni.navigateTo({
					url: `/pages/topic/index?id=${item.id}`,
				})
			}
		},
	};
</script>

<style lang="scss" scoped>
	.wrap {
		background-color: white;

		.sticky {
			display: flex;
			width: 100vw;
			justify-content: center;
			margin-bottom: 18px;

			.button {
				width: 80vw;
			}
		}

		.swipe-action {
			&__content {
				padding: 25rpx 0;

				&__text {
					font-size: 15px;
					color: $u-main-color;
					padding-left: 30rpx;
				}
			}
		}

		.form {
			display: flex;
			flex-direction: column;
			width: 100%;

			.row {
				display: flex;
				width: 100%;

				.label {
					width: 24%;
				}
			}
		}


	}
</style>