<template>
	<div>
		<view class="dynamic">
			<view class="avatar">
				<u-avatar :src="`${baseUrl}${item.author.portraitPath.replace(/\\/g, '\/')}`" size='36'></u-avatar>
				<div style='margin-left: 10px;width: 68%;'>
					<u--text :lines="1" :text="item.author.name" align='left' size='15' lineHeight='26'>
					</u--text>
					<u--text :text="item.author.updateAt" align='left' size='13' color='#acacac'></u--text>
				</div>
				<u-button v-show="!isTopping" class="button" type="primary" icon='star' :plain="true" :hairline="true" text="收藏"
					@click="show=true" />
				<u-button v-show="isTopping" class="button" type="info" icon='star-fill' :plain="true" :hairline="true"
					text="已收藏" @click="show=true" />
				<u-picker :show="show" :columns="columns" closeOnClickOverlay @close="show=false" @cancel="show=false"
					@confirm="confirm">
				</u-picker>
			</view>
			<view class="content">
				<u--text :text="item.title" align='left' size='16'></u--text>
				<u--text :text="item.content" :lines="3" align='left' size='15' lineHeight='28' color='#8b8b8b'>
				</u--text>
			</view>
			<u-gap height="10" bgColor="#f0f0f0" style='border-radius: 5px;opacity: 0.9;margin: 10px 0;'>
			</u-gap>
		</view>
		<u-notify ref="uNotify"></u-notify>
	</div>
</template>

<script>
	import {
		starArticle
	} from "@/services/article.js"
	export default {
		props: ["item", "baseUrl"],
		data() {
			return {
				isStar: false,
				show: false,
				columns: [
					['收藏', '取消收藏']
				],
			}
		},
		mounted() {},
		methods: {
			confirm(e) {
				if (e.value[0] === "收藏") {
					this.star();
					this.$refs.uNotify.show({
						message: '收藏成功',
					});
				} else {
					this.star();
					this.$refs.uNotify.warning('取消收藏');
				}
				this.show = false
			},
			async star() {
				const res = await starArticle(this.item.id, {})
				if (res) {
					this.isStar = !this.isStar;
				}
			},
		},
	}
</script>

<style lang="scss" scoped>
	.dynamic {
		padding: 10px 12px;

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
			background-color: #fffcfb;
			// margin-bottom: 8px;
			margin-top: 16px;
			padding-top: 10px;
			padding-bottom: 8px;
			border-top: 3.6px solid #ff9683;
			border-radius: 5% 5% 0 0;
			text-indent: 6px;
		}

	}
</style>