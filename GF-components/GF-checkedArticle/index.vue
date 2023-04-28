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
				<u-button v-show="!isAccess" class="button" type="primary" icon='plus' :plain="true" :hairline="true" text="审核"
					@click="show=true" />
				<u-button v-show="isAccess" class="button" type="info" icon='checkbox-mark' :plain="true" :hairline="true"
					text="审核" @click="show=true" />
				<u-picker :show="show" :columns="columns" closeOnClickOverlay @close="show=false" @cancel="show=false"
					@confirm="confirm">
				</u-picker>
			</view>
			<view class="content">
				<u--text :text="item.title" align='left' size='16' @click="toDetail()"></u--text>
				<u--text :text="item.content" :lines="3" align='left' size='15' lineHeight='28' color='#8b8b8b'
					@click="toDetail()">
				</u--text>
			</view>
			<u-gap height="10" bgColor="#f0f0f0" style='border-radius: 5px;opacity: 0.9;margin: 10px 0;'>
			</u-gap>
		</view>
	</div>
</template>

<script>
	import {
		examineArticleList,
		examineArticle
	} from "@/services/article.js"
	export default {
		props: ["item", "baseUrl"],
		data() {
			return {
				userId: '',
				isAccess: false,
				show: false,
				columns: [
					['通过', '不通过']
				],
			}
		},
		mounted() {},
		methods: {
			confirm(e) {
				console.log(e);
				if (e.value[0] === "通过") {
					this.examine();
				} else this.unExamine();
				this.show = false
			},
			async examine() {
				const res = await examineArticle(this.item.id, {
					status: 'Published'
				})
				console.log(res);
				if (res) {
					this.isAccess = true;
				}
				// this.isAccess = true;
			},
			async unExamine() {
				const res = await examineArticle(this.item.id, {
					status: 'Failed'
				})
				console.log(res);
				if (res) {
					this.isAccess = false;
				}
			},
			toDetail() {
				uni.navigateTo({
					url: `/pages/home/articleDetails?id=${this.item.id}`,
				})
			},
			toTopicDetail(e) {
				uni.navigateTo({
					url: `/pages/topic/index?id=${e.id}`,
				})
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

		.option {
			// margin: 6px 0px;
			padding: 6px 2px 6px 10px;
			background-color: #fffcfb;

			.tag {
				width: 80px;
				text-align: center;
			}

			.icon {}
		}
	}
</style>