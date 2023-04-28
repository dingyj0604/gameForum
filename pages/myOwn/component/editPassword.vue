<template>
	<view class='warp'>
		<u-toast ref="uToast" />
		<view class="top">
			<image src="../../../static/status/messageReply.png"></image>
		</view>
		<view class="content">
			<view class="title">
				<span>修改密码</span>
			</view>
			<view class='form'>
				<u--form style='width: 80vw' :model='form' ref='uForm'>
					<u-form-item label='' prop='username'>
						<u-input class="input" v-model='form.username' type='number' border="bottom" :clearable='true'
							fontSize='18px' placeholder="请输入手机号" :customStyle="inputStyle">
							<template slot="prefix">
								<u--text text="+86" margin="0 10px 0 0" color='#0f0f0f' size='19'
									style="border-right: 1px solid #e3e3e3;"></u--text>
							</template>
						</u-input>
					</u-form-item>
					<u-form-item label='' prop='oldPassword'>
						<u-input v-model='form.oldPassword' border="bottom" :clearable='true' fontSize='18px'
							placeholder="旧密码" />
					</u-form-item>
					<u-form-item label='' prop='password'>
						<u-input type='password' v-model='form.password' border="bottom" :clearable='true'
							fontSize='18px' placeholder="新密码" />
					</u-form-item>
					<u-form-item label='' prop='rePassword'>
						<u-input type='password' v-model='form.rePassword' border="bottom" :clearable='true'
							fontSize='18px' placeholder="确认密码" />
					</u-form-item>
				</u--form>
				<u-button class='button' type="primary" shape="square" @click="submit" v-model="buttonColor"
					:color="buttonColor">提&nbsp;&nbsp;交
				</u-button>
			</view>
		</view>

	</view>
</template>

<script>
	// import { register } from '@/services/clockIn.js'
	export default {
		data() {
			return {
				inputStyle: {
					'text-indent': '12px',
				},
				buttonColor: "#e3e3e3",
				ValidityState: false,
				form: {
					username: '',
					oldPassword: '',
					password: '',
					rePassword: '',
				},
				rules: {
					username: [{
							required: true,
							message: '请输入手机号码',
							trigger: 'blur',
						},
						{
							min: 11,
							max: 11,
							message: '11位手机号码',
							trigger: ['change', 'blur'],
						},
					],
					oldPassword: [{
						required: true,
						message: '请输入旧密码',
						trigger: ['change', 'blur'],
					}, {
						pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]+\S{5,12}$/,
						message: '需同时含有字母和数字，长度在6-12之间',
						trigger: ['change', 'blur'],
					}],
					password: [{
							required: true,
							message: '请输入新密码',
							trigger: ['change', 'blur'],
						},
						{
							pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]+\S{5,12}$/,
							message: '需同时含有字母和数字，长度在6-12之间',
							trigger: ['change', 'blur'],
						},
						{
							validator: () => this.form.password !== this.form.oldPassword,
							message: '新密码不能与旧密码相同',
							trigger: ['change', 'blur'],
						},
					],
					rePassword: [{
							required: true,
							message: '请重新输入密码',
							trigger: ['change', 'blur'],
						},
						{
							validator: () => this.form.rePassword === this.form.password,
							message: '确认密码与新密码不一致',
							trigger: ['change', 'blur'],
						},
					],

				},
			};
		},
		computed: {},
		watch: {
			form: {
				handler(newVal) {
					this.$refs.uForm.validate().then(res => {
						// uni.$u.toast('校验通过');
						this.buttonColor = "";
					}).catch(errors => {
						// uni.$u.toast('校验失败');
						this.buttonColor = "#e3e3e3";
					})
				},
				deep: true
			}
		},
		methods: {
			submit() {
				this.$refs.uForm.validate(async (valid) => {
					if (valid) {
						try {
							const result = await register({
								...this.form
							});
							if (result) {
								this.$refs.uToast.show({
									title: '密码修改成功,即将跳转重新登录',
								});
								setTimeout(() => {
									uni.redirectTo({
										url: '/pages/login/index',
									});
								}, 1000);
							}
						} catch (err) {
							this.$refs.uToast.show({
								title: err.message,
							});
						}
					}
				});
			},
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
			this.buttonColor = "#e3e3e3";
		},
	};
</script>

<style lang='scss' scoped>
	.warp {
		height: 100vh;
		width: 100vw;
		background-color: white;

		.top {
			height: 28.5vh;
			text-align: center;
			background-color: #ddf0f9;
			border-radius: 0 0 13% 13%;
		}

		.content {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;

			.title {
				text-align: center;
				display: flex;
				flex-direction: column;
				font-size: 8vw;
				font-weight: 600;
				margin: 5vw auto;
			}

			.form {
				height: 40vh;

				.input {
					padding: 16px 0px !important;
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
