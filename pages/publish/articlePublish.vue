<template>
	<view class="wrap">
		<view class="content">
			<view class='row' style="align-items: center;">
				<span class='label'>标题：</span>
				<u--input class='input' placeholder="请输入..." border="bottom" v-model="title" maxlength='10' />
			</view>
			<view class='row'>
				<span class='label'>内容：</span>
				<!-- <u--textarea class='input' style='height: 20vh;' v-model="content" placeholder="系统原装，留给每一位小可爱..." count
					maxlength='400' /> -->
				<view class='input'>
					<editor id="editor" class="ql-container" placeholder="系统原装，留给每一位小可爱..." :show-img-size="true" v-model="content"
						:show-img-toolbar="true" :show-img-resize="true" @ready="onEditorReady" @statuschange="statusChange">
					</editor>
				</view>
			</view>
			<view class='row'>
				<u-button class="button" type="primary" icon='checkbox-mark' :plain="true" :hairline="true" text="tag"
					@click="show=true" />
				<u-picker :show="show" :columns="topicList" closeOnClickOverlay @close="show=false" @cancel="show=false"
					@confirm="confirm" keyName="title">
				</u-picker>
			</view>
			<view class='row' style='margin-bottom: 36px;'>
				<view class="list">
					<u-tag v-for="(item, index) in subjectIds" :key="item.id" :text="item.title" type="info" class="tag"
						bgColor='#d9d9d9' borderColor='#d0d0d0'></u-tag>
				</view>
			</view>
			<view class='row'>
				<u-button class='button' type="primary" shape="square" @click="submit" v-model="buttonColor"
					:color="buttonColor">提&nbsp;&nbsp;交
				</u-button>
			</view>
			<u-toast ref="uToast" />
		</view>
	</view>
</template>

<script>
	import {
		getAllTopics
	} from "@/services/topic.js"
	import {
		addArticle,
	} from "@/services/article.js"
	export default {
		data() {
			return {
				buttonColor: "#e3e3e3",
				topicList: [],
				title: '',
				content: '',
				subjectIds: [],
				show: false,
			};
		},
		computed: {

		},
		async onShow() {
			const res = await getAllTopics({});
			if (res) {
				this.topicList.push([...res]);
			}
		},
		async onReady() {
		},
		watch: {
			title: function(newValue, old) {
				if (newValue) {
					this.buttonColor = "";
				} else {
					this.buttonColor = "#e3e3e3";
				}
			}
		},
		methods: {
			onEditorReady() {
				uni.createSelectorQuery().in(this).select('#editor').fields({
					size: true,
					context: true
				}, res => {
					console.log(res);
					this.editorCtx = res.context;
					this.editorCtx.setContents({
						html: this.html
					});
				}).exec();
				// this.editorCtx = requireDynamicLib('editorLib').createEditorContext('editor');
				// uni.createSelectorQuery().select('#editor').context((res) => {
				// 	console.log(res);
				// 	this.editorCtx = res.context
				// }).exec();
			},
			
			confirm(e) {
				console.log(e.value[0]);
				this.subjectIds.push(e.value[0]);
				this.show = false
			},
			async submit() {
				if (this.title === "" || this.content === "") return;
				const temp = this.subjectIds.map((ele) => ele.id)
				console.log(temp,this.title,this.content.target.text);
				// try {
				// 	const result = await addArticle({
				// 		title: this.title,
				// 		content: this.content,
				// 		subjectIds: temp
				// 	});
				// 	if (result) {
				// 		this.$refs.uToast.show({
				// 			message: '发布成功',
				// 		});
				// 		uni.switchTab({
				// 			url: "/pages/home/index"
				// 		})
				// 	}
				// } catch (err) {
				// 	this.$refs.uToast.show({
				// 		message: err.message,
				// 	});
				// }
			},
		},
	};
</script>

<style lang="scss" scoped>
	.wrap {
		background-color: white;
		padding: 12px;

		.content {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			padding: 24px 24px;

			.top {
				margin: 5vh 0;

				.avatar {
					margin-bottom: 16px;
				}
			}

			.row {
				display: flex;
				width: 100%;
				margin-bottom: 18px;

				.label {
					width: 30%;
				}

				.input {
					width: 70%;
				}

				#editor {
					width: 100%;
					height: 30vh;
					background-color: #f0f0f0;
					padding: 16px 10px;
				}
			}

			.button {
				margin: 12px auto;
				border-radius: 6px;
				// width: 70vw;
			}
		}

		.list {
			// margin-top: 20px;
			display: flex;
			// align-items: center;
			// flex-wrap: wrap;
			// justify-content: flex-start;

			.tag {
				margin: 8px 2px;
			}
		}
	}
</style>