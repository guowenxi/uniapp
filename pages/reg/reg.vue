<template>
	<view class="content">
		<view class="title-box-view">欢迎使用平安联盟</view>
		<view class=""> <!-- input-group -->
			<view class="login-title-view">手机号码</view>
			<view class="input-row border input-row-99">

				<!-- <text class="title ">手机号码：</text> -->
				<!-- <text class="title title-emp"> </text> -->
				<m-input class="m-inpu m-input-view"  type="text"   v-model="phone" placeholder="请输入手机号码"></m-input>
			</view>
			<view class="login-title-view">短信验证码</view>
			<view class="input-row border input-row-99">
				<m-input class="m-input security" type="text"  v-model="security" placeholder="请输入验证码"></m-input>
				<button type="opacity" 
				class="opacity getPhone"
				:disabled="timeUpNum == 0 ? false : true"
				 @tap="sendRegister">{{timeUpNum == 0 ? '获取验证码' : `${timeUpNum}s`}}</button>
			</view>
			<view class="login-title-view">设置密码</view>
			<view class="input-row border input-row-99">
				<!-- <text class="title">设置密码：</text> -->
				<!-- <text class="title title-emp"> </text> -->
				<m-input class="m-input m-input-view"  type="password"  v-model="password" placeholder="请输入密码"></m-input>
			</view>

		</view>
		<view class="btn-row">
			<button type="red" class="red new-bg-red" @tap="fyRegister">注册</button>
		</view>
	</view>
</template>

<script>
	import service from '../../service.js';
	import mInput from '../../components/m-input.vue';

	export default {
		components: {
			mInput
		},
		data() {
			return {
				timeUpNum:0,
				phonereg:/^[1][3,4,5,6,7,8,9][0-9]{9}$/,
				phone: '',
				password: '',
				security: ''
			}
		},
		methods: {
			timeUp(){
				this.timeUpNum = 60;
				this._setTimeout = ()=>{
					setTimeout(()=>{
						this.timeUpNum -- ;
						this.timeUpNum > 0 ? this._setTimeout() : null;
					},1000)
				}
				this._setTimeout();
			},
			//注册
			fyRegister() {
				const _this =this;
				if (!this.phonereg.test(this.phone)) {
					uni.showToast({
						icon: 'none',
						title: '请输入正确的手机号'
					});
					return;
				}
				if (this.password.length < 6) {
					uni.showToast({
						icon: 'none',
						title: '密码最短为 6 个字符'
					});
					return;
				}
				if (this.security.length < 6) {
					uni.showToast({
						icon: 'none',
						title: '请输入正确验证码'
					});
					return;
				}
				
				// this.navTo('/pages/authentication/authentication')
				
				this.loadingState();
				this.$http.post('fyVolunteer/user/fyRegister', {
						phone: this.phone,
						passWord: this.password,
						verificationCode: this.security,
					})
					.then(res => {
						uni.hideLoading()
						if (res.data.success == 1) {
							//为了兼容安卓端
							getApp().globalData.rbacToken = res.data.data.rbacToken;
							this.user.rbacToken = res.data.data.rbacToken;
							
							uni.setStorageSync('userInfo', JSON.stringify({
								phone:_this.phone,
								passWord:_this.password,
								rbacToken:res.data.data.rbacToken,
								}));
								debugger
							uni.showToast({
								icon: 'none',
								title: '注册成功,请进行实名认证',
								complete: () => {
									setTimeout(() => {
										// this.switchTabTo('/pages/index/index');
										this.navTo('/pages/authentication/authentication')
									}, 1500);
								}
							});
						} else {
							uni.showToast({
								icon: 'none',
								title: res.data.message
							});
						}


					})

			},

			sendRegister() {
				if (!this.phonereg.test(this.phone)) {
					uni.showToast({
						icon: 'none',
						title: '请输入正确的手机号'
					});
					return;
				}
				this.$http.get('fyVolunteer/SendMessage/sendRegister', {
						number: this.phone
					})
					.then(res => {
						if (res.data.success == 1) {
							this.timeUp();
							uni.showToast({
								icon: 'none',
								title: res.data.data
							});
						} else {
							uni.showToast({
								icon: 'none',
								title: res.data.data
							});
						}


					})



			}
		
		},
		onBackPress(){
			this.navTo('/pages/login/login');
			return true;

		},
	}
</script>

<style lang="scss">

	.input-row{
		margin:0 30upx;
	}
	.m-input{
		line-height:100upx;
		height:100upx;
		
	}
	.m-input-view{
		padding:0;
		line-height: 50px;
		    height: 50px;
	}
	.content{
		overflow: hidden;
	}
	.title-emp{
		width:0 !important;
	}
	.title-box-view{
		padding-left:30upx;
		margin-top:100upx;
		margin-bottom:50upx;
		font-size:56upx;
		color: #e32417;
	}
	.getPhone {
		text-align: right;
		height:100upx;
		line-height:100upx;
		width:260upx;
		padding:0;
		font-size: $font-base;
	}

	.security {
		// padding: 0 25upx;
		// padding: 0 40upx;
	}
</style>
