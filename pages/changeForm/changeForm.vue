<template>
	<view class="content">
		<view class="input-group">
			<view class="input-row border input-row-99">
				<text class="title">手机号码</text>
				<m-input type="text" focus  v-model="phone" placeholder="请输入手机号码"></m-input>
			</view>
			<view class="input-row border input-row-99 yanzheng">
				<m-input class="security" type="text"  v-model="security" placeholder="请输入验证码"></m-input>
				
				<button type="opacity" class="opacity getPhone" @tap="sendRegister">获取验证码</button>
			</view>
			<view class="input-row border input-row-99">
				<text class="title">新密码</text>
				<m-input type="password"  v-model="password" placeholder="请输入新密码"></m-input>
			</view>
			<view class="input-row border input-row-99">
				<text class="title">确认密码</text>
				<m-input type="password"  v-model="newpassword" placeholder="请再次输入密码"></m-input>
			</view>

		</view>
		<view class="btn-row">
			<button type="red" class="red new-bg-red" @tap="fyRegister">确认修改</button>
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
				newpassword:"",
				phonereg:/^[1][3,4,5,7,8][0-9]{9}$/,
				phone: '',
				password: '',
				security: ''
			}
		},
		onLoad(){
			this.info = this.selListItem;
		},
		methods: {

			//注册
			fyRegister() {

				if (!this.phonereg.test(this.phone)) {
					uni.showToast({
						mask:true,
						icon: 'none',
						title: '请输入正确的手机号'
					});
					return;
				}
				if (this.password.length < 6) {
					uni.showToast({
						mask:true,
						icon: 'none',
						title: '密码最短为 6 个字符'
					});
					return;
				}
				if (this.security.length < 6) {
					uni.showToast({
						mask:true,
						icon: 'none',
						title: '请输入正确验证码'
					});
					return;
				}
				if (this.password != this.newpassword) {
					uni.showToast({
						mask:true,
						icon: 'none',
						title: '两次密码输入不一致'
					});
					return;
				}
				this.loadingState();
				this.$http.post('fyVolunteer/user/updPassword', {
						phone:this.phone,
						passWord: this.password,
						verificationCode: this.security,
					})
					.then(res => {
						uni.hideLoading();
						if (res.data.success == 1) {
							uni.showToast({
								mask:true,
								title: '密码修改成功',
								complete: () => {
									setTimeout(() => {
										// this.navigateBack(1);
										this.navTo('/pages/user/user');
									}, 1500);
								}
							});
						} else {
							uni.showToast({
								mask:true,
								icon: 'none',
								title: res.data.message
							});
						}


					})

			},

			sendRegister() {
				if (!this.phonereg.test(this.phone)) {
					uni.showToast({
						mask:true,
						icon: 'none',
						title: '请输入正确的手机号'
					});
					return;
				}
				this.$http.get('fyVolunteer/SendMessage/sendPassWord', {
						number: this.phone
					})
					.then(res => {
						if (res.data.success == 1) {
							
							uni.showToast({
								mask:true,
								title: '短信发送成功'
							});
						} else {
							uni.showToast({
								mask:true,
								icon: 'none',
								title: res.data.message
							});
						}


					})



			}
		}
	}
</script>

<style lang="scss">
	.opacity{
		flex:1;
		max-width:250upx;
		min-width:250upx;
	}
.input-group{
	&:before{
		display: none;
	}
	margin-top:0;
}
	.btn-row{
		margin-top:260upx;
	}
	.title,.security{
		border-right:1px solid #ccc;
		height:57upx;
		line-height:57upx;
		font-size:30upx;
		margin: 20upx 0 ;
		padding-left:0;
		text-align: center;
	}
	.m-input-view{
		
		margin-left:35upx;
	}
	
	.getPhone {
		height:57upx;
		line-height:57upx;
		font-size:30upx;
		margin: 20upx 0 ;
		display: inline-block;
	}
	.security {
		text-align: left;

	}
</style>
