<template>
	<view class="content no-padding">
		<!-- <image class="bg-img" src="/static/img/Signin_bg@2x.png"></image> -->
		<view class="title-qiandao">
			<image class="bg-img" src="/static/_new_qiandao/bg@2x.png"></image>
			<view class="title-qindao-inner">
				<view class="title-qiandao-item">
					<view class="title">
						<image class="img" src="/static/_new_qiandao/icon@2x.png"></image>
					</view>
					<view class="name new-bg-red border-radius-10 "  @click="today" >
						{{isSign == 0 ?   '签到' : '已签到'}}
					</view>
				</view>
				<view class="title-qiandao-item">
					<view class="title">
						{{info.countNum}}
					</view>
					<view class="name color-666">
						累计签到
					</view>
				</view>
				<view class="title-qiandao-item">
					<view class="title">
						{{info.signCount}}
					</view>
					<view class="name color-666">

						连续签到
					</view>
				</view>
			</view>
		</view>
		<view class="huizhang">
			<view>徽章</view>
			<view class="flex-box">
				<view class="flex-item" v-for="item in info.sign">
					<image class="img" :src="item.status ==1 ?
					  `${baseUrl}fyVolunteer/file/download/${item.awardImgReceived}?rbacToken=${rbacToken}`:
					  `${baseUrl}fyVolunteer/file/download/${item.awardImgReceive}?rbacToken=${rbacToken}`"></image>
					  <!-- <view>{{item.awardName}}</view> -->
				</view>
			</view>
		</view>
		
		
<!-- 		<view class="title-side"> 
			<view class="left-side">
				<view class="side-box">
					<view class="text">{{info.signCount}}次</view>
					<view class="text">连续签到</view>
				</view>
				<view class="side-box">
					<view class="text">{{info.countNum}}次</view>
					<view class="text">累计签到</view>
				</view>
			</view>
			<view class="middle-line"></view>
			<view class="right-side" @click="today" :class="isSign == 1 ? 'disable-btn' : '' ">
				<view class="cir-box">
					<view class="cir-box-de cir-box-1"></view>
					<view class="cir-box-de cir-box-2"></view>
					<view class="cir-box-de cir-box-3"></view>
					<view class="cir-box-de cir-box-4"></view>
				</view>
				{{isSign == 0 ?   '签到' : '已签到'}}
			</view>
		</view> -->
		
		
		<!-- <image class="middle-title-text" src="/static/new/title.png"></image> -->
		<view class="date-item-box">
			<!-- <image class="bg-date-img" src="/static/img/Signin_calendar_bg@2x.png"></image> -->
			<reserve-date
				class="date"
				:startDate='startDate' 
				:price='price' 
				:isNowDate='isNowDate'
				:disableBefore='disableBefore' 
				:endDate='endDate' 
				:singleElection='singleElection' 
			/>
		</view>
		
		<view class="qiandao-box" :style="{'visibility':animateState ? 'inherit' : 'hidden'}"  >
			<view class="qiandao-item" :class="animateState_main ? 'animate-on' : false" @click="qiandao_success"> 
				<image class="close-btn" src="/static/img/box_shut@2x.png" ></image>
				<image class="item-img cccc" src="/static/img/Signin_light@2x.png"></image>
				<image class="item-img gggg" src="/static/img/Signin_Success@2x.png"></image>
			</view>
		</view>
		
	</view>
</template>
<script>
	import reserveDate from '@/components/reserve-date/reserve-date.vue'
	export default {
		components: {
			reserveDate
		},
		data() {
			return {
				baseUrl: getApp().globalData.baseUrl,
				rbacToken: getApp().globalData.rbacToken,
				animateState:false,
				animateState_main:false,
				isSign:0,
				info:{},
				price: {
					type: true,
					data: [
						
					]
				},

				isNowDate: true,
				disableBefore: false ,
				endDate: '',
				startDate: '',
				singleElection: true
			}
		},
		onLoad() {
			
			this.isSign = this.user.isSign;
			this.getList();
		},
		methods: {
			//签到成功的动画
			qiandao_success(){
				if( !this.animateState_main){
					return ;
				}
				this.animateState_main= !this.animateState_main;
				
				setTimeout(() => {
					this.animateState=false;
				}, 1000);
			},
			//获取签到
			today() {
				
				if(this.user.isSign == 1){
					uni.showToast({
						icon: 'none',
						title: "您今天已经签到啦"
					});
					return ;
				}
				this.loadingState();
				this.$http.get('fyVolunteer/sign/today', {
					rbacToken: this.user.rbacToken,
				}).then(res => {
					uni.hideLoading();
					if (res.data.success == 1) {
						this.getList();
						
						this.animateState=true;
						this.animateState_main=true;
				
						this.user.isSign = 1;
						this.isSign = 1;
						uni.$emit("guanggao_state",{});
					} else {
						uni.showToast({
							icon: 'none',
							title: res.data.message
						});
					}
				})
			},
			//获取
			getList() {
				this.$http.get('fyVolunteer/sign/getList', {
					rbacToken: this.user.rbacToken,
				}).then(res => {
					if (res.data.success == 1) {
						this.info = res.data.data;
						this.price.data = res.data.data.list;

					} else {
						uni.showToast({
							icon: 'none',
							title: res.data.message
						});
					}
				})
			},
			
		},
		onBackPress(){
			// this.user.isSign = 1;
			uni.$emit("guanggao_state",{})
			// if(this.isSign == 1){
				
			// }else{
			// 	return true;
			// }
			
		},
	}
</script>

<style lang="scss">

.huizhang{
		width: 650rpx;
		height: 140rpx;
		background-color: #ffffff;
		border-radius: 10rpx;
		margin:22rpx auto;
		box-sizing: content-box;
		padding:20rpx;
		.flex-box{
			margin-top:20rpx;
			width: 100%;
			.flex-item{
				width:20%;
				height: 84rpx;
				display: inline-block;
				text-align: center;
				.img{
					width: 91rpx;
					height:100%;

				}
			}
		}
		
}
.border-radius-10{
	border-radius: 10rpx;
}
	.content{
		background-color: #f6f6f6;
	}
	
	.title-qiandao{
		
		position: relative;
		width: 690rpx;
		height: 254rpx;
		background-color: #ffffff;
		border-radius: 10rpx;
		margin:0 auto;
		margin-top: 16rpx;
		
		.title-qindao-inner{
			z-index:100;
			position: absolute;
			left:0;
			top:25%;
			width: 100%;
			height:140rpx;
			// display: flex;
			// flex-flow: row nowrap;
			// justify-content:space-between ;
			.title-qiandao-item{
				// flex:1;
				width:33.33%;
				height:100%;
				float:left;
				
				.img{
					width: 68rpx;
					height: 60rpx;
					display: inline-block;
					text-align: center;
					font-weight: bold;
				}
				
				.name{
					
					width:60%;
					height: 60rpx;
					line-height: 60rpx;
					text-align: center;
					margin:0 auto;
				}
				
				.title{
					width:100%;
					height:70rpx;
					line-height:70rpx;
					text-align: center;
					color: #ff2501;
					font-size: 60rpx;
				}
				
			}
			
		}

		
	}
	
	.middle-title-text{
		position: absolute;
		left:50%;
		transform: translateX(-50%);
		z-index:1000;
		width:525upx;
		height:42upx;
		top:300upx;
	}
	.title-side{
			width: 518upx;
			height: 228upx;
			position: absolute;
			left:50%;
			transform: translateX(-50%);
			top:5%;
			z-index:30;
			display:flex;
			flex-flow:row nowrap;
			
			color:#fff;
			.left-side{
				line-height:50upx;
				flex:1;
				text-align: center;
				font-size:32upx;
				.side-box{
					
					width:100%;
					height:50%;

				}
			}
			.middle-line{
				width:1px;
				height:70%;
				background: #fff;
				position: absolute;
				left:50%;
				top:50%;
				transform: translate(-50%,-50%);
			}
			.right-side{
				min-width:228upx;
				max-width:228upx;
				color:#ef1b22;
				font-weight: bold;
				position: relative;
				font-size:36upx;
				line-height: 228upx;
				flex:1;
				text-align: center;
				.cir-box{
					z-index:-1;
					position: absolute;
					width:100%;
					height:100%;
					
				}
				.cir-box-de{
					position: absolute;
					left:50%;
					transform: translate(-50%,-50%);
					top:50%;
					border-radius: 50%;
					background-color: #ffffff;
				}
				.cir-box-1{
					width:100%;
					height:100%;
					opacity: 0.2;
				}
				.cir-box-2{
					width:80%;
					height:80%;
					opacity: 0.4;
				}
				.cir-box-3{
					width:60%;
					height:60%;
					opacity: 1;
				}
								
			}
			.disable-btn{
				color:#000;
			}
	}
	.date-item-box{
		background-color: #fff;
		width: 690upx;
		height: 750upx;
		z-index:10;
		position: relative;
		margin:0 auto;
		.bg-date-img{
			position: absolute;
			left:0;
			top:0;
			width: 690upx;
			height: 728upx;
			z-index:10;
		}
		.date{
			z-index:20;
			position: absolute;
		left: 40upx;
		top: 0upx;
		width: 600upx;
		height: 710upx;
			padding: 0;	
			background: transparent !important;
			.content{
				background: transparent !important;
			}
			.body{
				background: transparent;
			}
		}
	}


	.bg-img{
		z-index:1;
		position: absolute;
		width: 100%;
		height: 100%;
		left:0;
		top:0;
	}
	
</style>