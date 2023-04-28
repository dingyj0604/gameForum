<template>
	<view class='warp'>
		<u-toast ref="uToast" />
		<view class="content">
			<view class="top">
				<u-avatar class="avatar" :src="portrait" size='100'>
				</u-avatar>
				<u-upload @afterRead="afterRead" name="portrait" maxCount="1" :mutiple="false">
					<span>点击修改头像</span>
				</u-upload>
			</view>
			<view class='row' style="align-items: center;">
				<span class='label'>昵称：</span>
				<u--input class='input' placeholder="请输入昵称..." border="bottom" v-model="name" maxlength='10' />
			</view>
			<view class='row'>
				<span class='label'>个性签名：</span>
				<u--textarea class='input' v-model="autograph" placeholder="系统原装签名，留给每一位小可爱..." count />
			</view>
			<u-button class='button' type="primary" shape="square" @click="submit" v-model="buttonColor"
				:color="buttonColor">提&nbsp;&nbsp;交
			</u-button>
		</view>
	</view>
</template>

<script>
	import {
		updateUser,
		uploadAvatar,
		getUserInfoByToken
	} from "@/services/user.js"
	import {
		baseUrl
	} from '@/api/config.js'
	export default {
		data() {
			return {
				buttonColor: "#e3e3e3",
				portrait: '',
				portraitPath: '',
				name: '',
				autograph: '',
				baseUrl: '',
			};
		},
		computed: {},
		watch: {
			name: function(newValue, old) {
				if (newValue) {
					this.buttonColor = "";
				} else {
					this.buttonColor = "#e3e3e3";
				}
			}
		},
		methods: {
			// 新增图片
			async afterRead(event) {
				console.log(event);
				this.portrait = event.file.url;
			},
			uploadFilePromise(url) {
				console.log(url);
				return new Promise((resolve, reject) => {
					let a = uni.uploadFile({
						url: `${baseUrl}/user/upload-portrait`,
						filePath: url,
						name: 'file',
						header: {
							token: uni.getStorageSync("token"),
						},
						success: (res) => {
							setTimeout(() => {
								resolve(res.data)
							}, 1000)
						}
					});
				})
			},
			async submit() {
				if (this.name === "") return;
				console.log(this.name, this.autograph)
				try {
					await this.uploadFilePromise(this.portrait);
					const result = await updateUser({
						name: this.name,
						autograph: this.autograph,
					});
					if (result) {
						this.$refs.uToast.show({
							message: '修改成功',
						});
					}
				} catch (err) {
					this.$refs.uToast.show({
						message: err.message,
					});
				}
			},
		},
		onShow() {
			this.baseUrl = baseUrl;
		},
		async onLoad() {
			const userInfo = await getUserInfoByToken({});
			if (userInfo) {
				// this.portrait = userInfo.portrait;
				this.name = userInfo.name;
				this.autograph = userInfo.autograph;
				this.portraitPath = userInfo.portraitPath;
				this.portrait = `${baseUrl}${userInfo.portraitPath.replace(/\\/g, '\/')}`
			}
		},
		onReady() {
			this.buttonColor = "#e3e3e3";
		},
	};
</script>

<style lang='scss' scoped>
	.warp {
		height: 100vh;
		width: 100vw;
		/* background-color: white; */

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
			}

			.button {
				margin: 36px auto;
				border-radius: 6px;
				width: 70vw;
			}
		}
	}
</style>
