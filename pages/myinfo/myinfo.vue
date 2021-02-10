<template>
	<view class="content no-padding">
		<view class="input-group">
			<view class="input-row border input-row-99">
				<text class="title">姓名</text>
				<text  class="placeholder-class">{{info.name}}</text>
<!-- 				<m-input type="text" :placeholder="info.name" disabled  placeholderClass="placeholderClass"></m-input> -->
			</view>
			<view class="input-row border input-row-99">
				<text class="title">职业</text>
				<text  class="placeholder-class">{{info.dutyName}}</text>
				<!-- <m-input type="text"  :placeholder="info.dutyName" disabled></m-input> -->
			</view>
			<view class="input-row border input-row-99">
				<text class="title">部门</text>
				<text  class="placeholder-class">{{info.departmentName}}</text>
				<!-- <m-input type="text"  :placeholder="info.departmentName" disabled></m-input> -->
			</view>
			<view class="input-row border input-row-99">
				<text class="title">所属镇街</text>
				<text  class="placeholder-class">{{info.streetName}}</text>
				<!-- <m-input type="text"  :placeholder="info.streetName" disabled></m-input> -->
			</view>
			<view class="input-row border input-row-99">
				<text class="title">所属村社</text>
				<text  class="placeholder-class">{{info.communityName}}</text>
				<!-- <m-input type="text"  :placeholder="info.communityName" disabled></m-input> -->
			</view>
			<view class="input-row border input-row-99">
				<text class="title">手机号码</text>
				<text  class="placeholder-class">{{info.phone}}</text>
				<!-- <m-input type="text"  :placeholder="info.phone" disabled></m-input> -->
			</view>
		</view>
		<view class="bottom-btn-box">
			<button class="bottom-float-button left-btn new-bg-red" type="red" @click="navToAndSaveItem(info,'/pages/changeForm/changeForm')">修改密码</button>
			<button class="bottom-float-button right-btn new-bg-red" type="red" @click="navToAndSaveItem(info,'/pages/changeFormUser/changeFormUser')">修改资料</button>
		</view>
<!-- 		<view class="btn-row">
			<button type="red" class="red" @tap="fyRegister">修改密码</button>
			<button type="red" class="red" @tap="fyRegister">修改资料</button>
		</view> -->
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
				name:"按时打算的",
				newpassword:"",
				phonereg:/^[1][3,4,5,7,8][0-9]{9}$/,
				phone: '',
				password: '',
				security: '',
				info:{
					
				}
			}
		},
		onLoad(){
			debugger
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
				this.$http.post('fyVolunteer/user/fyRegister', {
						phone: this.phone,
						passWord: this.password,
						verificationCode: this.security,
					})
					.then(res => {
						if (res.data.success == 1) {
							this.user.rbacToken = res.data.data.rbacToken;
							service.addUser(res.data.data);
							uni.showToast({
								mask:true,
								title: '注册成功',
								success: () => {
									setTimeout(() => {
										this.switchTabTo('/pages/index/index');
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
							
							uni.showToast({
								title: '短信发送成功'
							});
						} else {
							uni.showToast({
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


.input-group{
	
	margin-left:30upx;
	&:before{
		display: none;
	}
	margin-top:0;
}
	.btn-row{
		margin-top:260upx;
	}
	.title,.security{
		// border-right:1px solid #ccc;
		height:100upx;
		line-height:100upx;
		font-size:30upx;
		// margin: 20upx 0 ;
		padding-left:0;
		text-align: left;
	}
	.m-input-view{
		padding-right:30upx;
		text-indent: 35upx;
		
	}
	.getPhone {
		height:57upx;
		line-height:57upx;
		font-size:30upx;
		margin: 20upx 0 ;
	}

	.security {
		text-align: left;
		padding: 0 25upx;
	}
	
	.bottom-btn-box {
		max-height:80upx;
		min-height:80upx;
		margin-top: 20upx;
		flex: 1;
		display: flex;
	margin-top:260upx;
		.left-btn {
			margin:0 30upx;
			flex: 1;
		}
	
		.right-btn {
			margin:0 30upx;
			flex: 1;
		}
	}
	
</style>
