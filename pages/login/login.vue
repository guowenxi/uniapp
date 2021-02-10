<template>
	<view class="content">
		<view class="title-box-view">欢迎使用平安联盟</view>
		<view class="">
			<view class="login-title-view">手机号码</view>
			<view class="input-row border input-row-99">
				<!-- <view class="title">手机号码：</view> -->
				<!-- <view class="title title-emp"> </view> -->
				<m-input class="m-input" type="text"  focus v-model="phone" placeholder="请输入手机号码"></m-input>
			</view>
			<view class="login-title-view">密码</view>
			<view class="input-row input-row-99 border">
				<!-- <view class="title">密码：</view> -->
				<!-- <view class="title title-emp"> </view> -->
				<m-input class="m-input"  type="password"  v-model="passWord" placeholder="请输入密码"></m-input>
			</view>
			<view>
				<view class="forget" @click="navTo('/pages/rereg/rereg')">忘记密码</view>
			</view>
		</view>
		<view class="btn-row ">
			<button type="red" class="red new-bg-red" @tap="bindLogin">登录</button>
		</view>
		<view class="action-row">
			<!-- <navigator url="../reg/reg">注册账号</navigator> -->
<!-- 			<view>|</view>
			<navigator url="../pwd/pwd">忘记密码</navigator> -->
		</view>
		<view class="oauth-row" v-if="hasProvider" v-bind:style="{top: positionTop + 'px'}">
			<view class="oauth-image" v-for="provider in providerList" :key="provider.value">
				<image :src="provider.image" @tap="oauth(provider.value)"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import service from '../../service.js';
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import mInput from '../../components/m-input.vue'

	export default {
		components: {
			mInput
		},
		data() {
			return {
				cid:"",
				providerList: [],
				hasProvider: false,
				phone: '',
				passWord: '',
				positionTop: 0
			}
		},
		onReady(){
			
		},
		onShow(){
			this.phone= "";
			this.passWord= "";
		},
		onLoad(){
			uni.hideLoading();
			this.getClientInfo();
			uni.setStorageSync('userInfo', JSON.stringify({
			phone:"",
			passWord:""
			}));
		},
		methods: {
			// initPosition() {
			// 	/**
			// 	 * 使用 absolute 定位，并且设置 bottom 值进行定位。软键盘弹出时，底部会因为窗口变化而被顶上来。
			// 	 * 反向使用 top 进行定位，可以避免此问题。
			// 	 */
			// 	this.positionTop = uni.getSystemInfoSync().windowHeight - 100;
			// },

			getClientInfo(){
				try{
					if (window && window.plus) {
						 
					} else {  
						if(plus){
							//#ifdef APP-PLUS
							const getClientInfo = plus.push.getClientInfo();
							this.cid = getClientInfo.clientid;
							//#endif
						}else{
							plus.globalEvent.addEventListener('plusready', function(){
								if(this.cid && this.cid!='undefind' && this.cid!='' &&  this.cid!='null'){
									return ;
								}
								
								//#ifdef APP-PLUS
								const getClientInfo = plus.push.getClientInfo();
								//#endif
								this.cid = getClientInfo.clientid;
								
								// uni.showToast({
								// 	icon:'none',
								// 	title: this.cid
								// });
								
								// console.log(this.cid)
							
								
							});
							
						}
						
					}  
					
				}catch(e){
					//TODO handle the exception
				}

			},
			bindLogin() {

				if (this.phone.length < 5) {
					uni.showToast({
						mask:true,
						icon: 'none',
						title: '账号最短为 5 个字符'
					});
					return;
				}
				if (this.passWord.length < 6) {
					uni.showToast({
						mask:true,
						icon: 'none',
						title: '密码最短为 6 个字符'
					});
					return;
				}
				this.loadingState();
				debugger
				this.$http.get('fyVolunteer/user/login', {
						phone: this.phone,
						passWord: this.passWord,
						cid:this.cid
					})
					.then(res => {
						uni.hideLoading()
						if (res.data.success == 1) {
							this.user.loginState = true;
							this.user.res = res;
							uni.setStorageSync('userInfo', JSON.stringify({
								phone:this.phone,
								passWord:this.passWord,
								rbacToken:res.data.data.rbacToken,
								}));
							uni.showToast({
								mask:true,
								mask:true,
								title: '登录成功',
								success: () => {
								},
								complete:()=>{
									setTimeout(() => {
										this.switchTabTo('/pages/index/index');
									}, 1500);
								}
							});
						}else{
							uni.showToast({
								icon:'none',
								title: res.data.message
							});
						}
					})
			},
		},
		onReady() {
		},
		onBackPress(){
			return true;
		},
		onNavigationBarButtonTap(e) {
			uni.navigateTo({
				url:'/pages/reg_page/reg_page'
			})
		}
	}
</script>

<style lang="scss">

.forget{
	padding-top:20upx;
	padding-right:20upx;
	font-size:30upx;
	line-height:50upx;
	float: right;
	
}
.content{
	overflow: hidden;
}
.m-input-view{
	padding:0;
}
.input-row{
	margin:0 30upx;
}
.m-input{
	line-height:100upx;
	height:100upx;
	
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
	.uni-page-head-hd{
		display: none;
	}
	.action-row {
		font-size: 30upx;
		display: flex;
		flex-direction: row;
		justify-content: center;
	}

	.action-row navigator {
		color: #007aff;
		padding: 0 20upx;
	}

	.oauth-row {
		display: flex;
		flex-direction: row;
		justify-content: center;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
	}

	.oauth-image {
		width: 100upx;
		height: 100upx;
		border: 1upx solid #dddddd;
		border-radius: 100upx;
		margin: 0 40upx;
		background-color: #ffffff;
	}

	.oauth-image image {
		width: 60upx;
		height: 60upx;
		margin: 20upx;
	}
</style>
