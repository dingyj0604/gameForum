<template>
	<view class="wrap">
		<u-list class='list'>
			<u-list-item v-for="(item, index) in userList" :key="index" class='listItem'>
				<u-cell :title="item.name">
					<u-avatar slot="icon" shape="circle" size="35" :src="item.portrait"
						customStyle="margin: -3px 5px -3px 0"></u-avatar>
					<u-button slot="value" size='small' class="button" type="info" icon='checkbox-mark' :plain="true"
						color='#8c8c8c' text="已关注" @click="visible=true"></u-button>
				</u-cell>
				<u-modal :show="visible" @confirm="confirm(item)" ref="modal" :asyncClose="true" @close="closeModal"
					@cancel="closeModal" showCancelButton content="确认取消关注吗？" :closeOnClickOverlay="true"></u-modal>
			</u-list-item>
			<u-empty v-show="!userList.length" mode="message" iconSize='110' text='这里空空的' textSize='16'
				icon="../../../static/status/emptyList.png" style='margin-top: 100px;'>
			</u-empty>
		</u-list>
	</view>
</template>

<script>
	import {
		getFollowUsers,
		followUser
	} from "@/services/user.js"
	export default {
		data() {
			return {
				visible: false,
				userList: [{}],
			};
		},
		computed: {

		},
		async onLoad() {
			this.getFollowUsersList();
		},
		methods: {
			async getFollowUsersList() {
				console.log(this.userList)
				const res = await getFollowUsers({});
				console.log(res);
				if (res) {
					this.userList = res;
				}
			},
			closeModal() {
				this.visible = false;
			},
			async confirm(item) {
				const list = this.userList;
				this.userList = list.filter((ele) => ele.id !== item.id)
				try {
					const res = await followUser({
						followId: item.id,
					});
					if (res) {
						uni.$u.toast('取关成功');
						this.getFollowUsersList();
					}
				} catch (e) {
					uni.$u.toast(e);
				}
				setTimeout(() => {
					this.visible = false;
				}, 500);
			}
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
