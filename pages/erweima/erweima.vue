<template>
	<view class="content no-padding">
		<view class="top-box">
			<view class="title-icon">
				<image class="bg-title" src="/static/img/QR_code_head@2x.png"></image>
				<image 
				class="img"
				:src="
				headImg ?  `${baseUrl}fyVolunteer/file/download/${headImg}` :
				 '/static/img/alliance_icon@2x.png'"
				 ></image>
				 <view class="right-box">
					 <view>{{userName}}的付款码</view>
				 </view>
			</view>
			<image class="erweima" 
					:src="erweima"
				 >
			</image>
			<view class="clear-time">
				<text>{{timer_clock}}之后刷新</text>
				<text @click="shuaxin" class="red-color">立即刷新</text>
				
			</view>
			
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userName:"",
				headImg:"",
				baseUrl : getApp().globalData.baseUrl,
				rbacToken : getApp().globalData.rbacToken,
				erweima:"",
				timer_clock: "3:00",
				hideAllTimer:false,
				s:180,
				hh:0,
				ss:0,
			};
		},
		onLoad(){
			this.userName = this.user.userInfo.name;
			this.headImg = this.user.userInfo.headImg;
			this.erweima = `${this.baseUrl}peaceShopManage/payManagement/setQRImage?rbacToken=${this.rbacToken}`;
			this.timerClock();
			//this.setQRImage();
		},
		onUnload(){
			this.hideAllTimer = true ; 
		},
		methods:{
			//
			 timerClock(){
				 const _this = this;
				 setTimeout(()=>{
					 if(_this.s >0){
						 _this.s = _this.s-1;
						 _this.hh  = Math.floor(_this.s/60);
						 _this.ss  = Math.floor(_this.s%60);
						 
						 _this.timer_clock = `${_this.hh}:${_this.ss<10 ? '0'+_this.ss : _this.ss}`;
					 }else{
						 _this.shuaxin()
					 }
					 _this.hideAllTimer ? null : _this.timerClock();
				 },1000)
				
			 },
			shuaxin(){
				
				this.erweima = `${this.baseUrl}peaceShopManage/payManagement/setQRImage?rbacToken=${this.rbacToken}&time=${Math.random()}`;

			},
			
			setQRImage() {
				this.loadingState();
				this.$http.get('peaceShopManage/payManagement/setQRImage', {
						rbacToken:this.user.rbacToken
					})
					.then(res => {
						uni.hideLoading()
						if(res.data.success === 1){
							debugger
						}else{
							uni.showToast({
								mask:true,
								icon:'none',
								title: res.data.message
							});
						}

					})
			},
		},
		
	}
</script>

<style lang="scss">
	.clear-time{
		text-align: center;
	}
	.red-color{
		color:#e32417;
	}
	.bg-title{
		width:100%;
		height: 200upx;
		position: absolute;
		left:0;
		top:0;
		z-index:0;
	}
	.content{
		
		background: #eee;
	}
	.erweima{

		position:relative;
		
		left:50%;
		transform: translateX(-50%);
		width: 430upx;
		height: 430upx;
		margin:0 auto;
		margin-top:60upx;
		
	}
	.conten{
		background: #fff;
	}
	.uni-list{

		.uni-badge-success{
			background-color: #fff !important;
		}
	}
	.top-box{
		position: relative;


		width: 660upx;
		height: 780upx;
		background-color: #ffffff;
		border-radius: 20upx;
		margin:0 auto;
		margin-top:80upx;
		overflow: hidden;
	}
	.list-item{
		float:left;
	}
	.title-icon {
			float:left;
			width: 100%;
			padding:50upx;
			// background-color: #e32417;
			
		.img{
			
			margin-right:20upx;
			float:left;
				border-radius: 50%;
				display: block;
				width: 100upx;
				height: 100upx;
		}
		.right-box{
			position: relative;
			z-index: 10;
			float:left;
			color:#fff;
			font-size:40upx;
			line-height:100upx;
		}
		}

	.title {
		text-align: center;
		margin: 0 auto;
		margin-top: 20upx;
		font-size: 32upx;
	}

	.sub-text {
		margin: 0 60upx;
		margin-top: 45upx;
		margin-bottom:35upx;
	}

	.bottom-bg-button {
		bottom: 400upx;
	}
</style>
