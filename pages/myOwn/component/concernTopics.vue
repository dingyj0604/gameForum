<template>
	<view class="wrap">
		<u-list class='list'>
			<u-list-item v-for="(item, index) in followTopicLists" :key="index" class='listItem'>
				<u-cell :title="item.title">
					<u-button slot="value" size='small' class="button" type="info" icon='checkbox-mark' :plain="true"
						color='#8c8c8c' text="已关注" @click="visible=true"></u-button>
				</u-cell>
				<u-modal :show="visible" @confirm="confirm(item)" ref="modal" :asyncClose="true" @close="closeModal"
					@cancel="closeModal" showCancelButton content="确认取消关注吗？" :closeOnClickOverlay="true"></u-modal>
			</u-list-item>
			<u-empty v-show="!followTopicLists.length" mode="message" iconSize='110' text='这里空空的' textSize='16'
				icon="../../../static/status/emptyList.png" style='margin-top: 100px;'>
			</u-empty>
		</u-list>
	</view>
</template>

<script>
	import {
		getUserConcernTopic,
		concernTopic
	} from "@/services/user.js"
	export default {
		data() {
			return {
				visible: false,
				followTopicLists: [],
			};
		},
		computed: {

		},
		async onLoad() {
			this.getFollowTopicList();
		},
		methods: {
			async getFollowTopicList() {
				const res = await getUserConcernTopic({});
				console.log(res);
				if (res) {
					this.followTopicLists = res;
				}
			},
			closeModal() {
				this.visible = false;
			},
			async confirm(item) {
				const list = this.followTopicLists;
				this.followTopicLists = list.filter((ele) => ele.id !== item.id)
				try {
					const res = await concernTopic({
						concernId: item.id,
					});
					if (res) {
						uni.$u.toast('取关成功');
						this.getFollowTopicList();
					}
				} catch (e) {
					uni.$u.toast(e);
				}
				setTimeout(() => {
					this.visible = false;
				}, 500);
			},
		},
	};
</script>

<style lang="scss" scoped>
	.wrap {
		background-color: white;

		.list {
			.listItem {
				.button {
					width: 38px;
				}
			}
		}
	}
</style>