<template>  
    <view class="content no-padding">  
		<scroll-view class="history-section icon"  scroll-y >
			<view class="new-item-box">
				<view class="item-title">
					<view class="left-line"></view>
					<view class="title">金点子详情</view>
<!-- 				<text class="right-text"
				 :class="info.type==1 ? 'font-orange-border' : info.type==2 ? 'font-green-border' : 'font-red-border'"
				 >
				{{info.type==1 ? '待处理' :info.type==2  ?  '已回复' : '不处理'}}
				</text> -->
				<text class="right-text"
				 :class="info.type==2 ? 'font-green-border' : 'font-red-border'"
				 >
				{{info.type==2  ?  '已回复' : '不处理'}}
				</text>
				</view>
			</view>
			
			<view class="new-content-item ">
				<view class="new-content-item-title">描述</view> 
				<view class="new-content-item-content color-666">{{info.userSuggest}}</view>
			</view>
			<view class="new-content-item ">
				<view class="new-content-item-title" >反馈时间</view> 
				<view class="new-content-item-content color-666">{{info.createTime}}</view>
			</view>
			<view style="width: 100%;height:30rpx;background-color: #f0f0f0;"></view>
			<view class="new-item-box">
				<view class="item-title">
					<view class="left-line"></view>
					<view class="title">回复内容</view>
				</view>
			</view>
			
			<view class="new-content-item " v-if="info.leaderFeedback">
				<!-- <view class="new-content-item-title"></view> --> 
				<view class="new-content-item-content color-666">{{info.leaderFeedback}}</view>
			</view>
			
			<view class="new-content-item ">
				<view class="new-content-item-title">回复时间</view> 
				<view class="new-content-item-content color-666">{{info.updateTime}}</view>
			</view>
			
			
		</scroll-view>
    </view>  
</template>  
<script>  

    import {  
        mapState 
    } from 'vuex';  
    export default {
		components: {

		},
		data(){
			return {
				info:{}
			}
		},
		onLoad(){
		
			this.info=this.selListItem;
		},
        computed: {
		},
        methods: {
			
		}  
    }  
</script>  
<style lang='scss'>
	.content{
		background-color: #f0f0f0;
	}
	.new-item-box {
		background: #fff;
		box-sizing: content-box;
		padding: 20rpx;
		height:40rpx;
		/* border-bottom: 1rpx solid #f6f6f6; */
	
		.item-title {
			margin-bottom: 10rpx;
			float: left;
			width: 100%;
			height: 30rpx;
			line-height: 30rpx;
	
			.left-line {
				float: left;
				position: relative;
				top: 50%;
				transform: translateY(-50%);
	
				width: 10rpx;
				height: 24rpx;
				background-color: #e32417;
				border-radius: 5rpx;
			}
	
			.title {
				margin-left: 20rpx;
				font-weight: bold;
				float: left;
				text-shadow: 0 2rpx 2rpx rgba(125, 133, 141, 0.4);
				font-size: $new-font-30;
				color: #333333;
			}
	
			.right-title {
				font-size: 22rpx;
				float: right;
				color: #b7b7b7;
			}
		}
	
		.item-content {
			font-size: 26rpx;
			margin-left: 30rpx;
	
			.item-grey-color {
				color: #b7b7b7;
				font-size: 28rpx;
			}
	
			.txt {
				margin-top: 10rpx;
				display: flex;
				flex-flow: row nowrap;
	
				width: 100%;
	
				.t {
					color: #7b7b7b;
					text-align-last: justify;
					min-width: 25%;
					max-width: 25%;
				}
	
				.r {
					text-indent: 20rpx;
					flex: 1;
					overflow: hidden;
				}
			}
		}
	}
	
	.menu{
		font-size:30upx;
		color:#333;
		line-height:36upx;
		.title{
			text-indent: 30px;;
			line-height: 50upx;
			font-size:$font-title;
		}
		.menu-title{
			font-size:$font-title;
			border-top:1px solid #ccc;
			padding-top:40upx;
			padding-bottom:20upx;
			color:#000;
		}


	}
	.right-text{
		float:right;
			padding:5rpx 10rpx;
	}
.sub-text{
	font-size:$font-base;
	height:60upx;
	line-height:60upx;
	.left-text{
		color:#ccc;
		float:left;
	}

}

	%flex-center {
	 display:flex;
	 flex-direction: column;
	 justify-content: center;
	 align-items: center;
	}
	%section {
	  display:flex;
	  justify-content: space-around;
	  align-content: center;
	  background: #fff;
	  border-radius: 10upx;
	}


	.user-section{
/* 		padding: 100upx 30upx 0; */
		position:relative;
		.bg{
			position:absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			filter: blur(1px);
			opacity: .7;
		}
	}
	.user-info-box{
		height: 180upx;
		display:flex;
		align-items:center;
		position:relative;
		z-index: 1;
		.portrait{
			width: 130upx;
			height: 130upx;
			border:5upx solid #fff;
			border-radius: 50%;
		}
		.renzheng_box{
			padding:10upx 20upx;
		}
		.username{
			font-size: $font-lg + 6upx;
			color: $font-color-dark;
			margin-left: 20upx;
		}
	}

	.vip-card-box{
		display:flex;
		flex-direction: column;
		color: #f7d680;
		height: 240upx;
		background: linear-gradient(left, rgba(0,0,0,.7), rgba(0,0,0,.8));
		border-radius: 16upx 16upx 0 0;
		overflow: hidden;
		position: relative;
		padding: 20upx 24upx;
		.card-bg{
			position:absolute;
			top: 20upx;
			right: 0;
			width: 380upx;
			height: 260upx;
		}
		.b-btn{
			position: absolute;
			right: 20upx;
			top: 16upx;
			width: 132upx;
			height: 40upx;
			text-align: center;
			line-height: 40upx;
			font-size: 22upx;
			color: #36343c;
			border-radius: 20px;
			background: linear-gradient(left, #f9e6af, #ffd465);
			z-index: 1;
		}
		.tit{
			font-size: $font-base+2upx;
			color: #f7d680;
			margin-bottom: 28upx;
			.yticon{
				color: #f6e5a3;
				margin-right: 16upx;
			}
		}
		.e-b{
			font-size: $font-sm;
			color: #d8cba9;
			margin-top: 10upx;
		}
	}
	.cover-container{
		background: $page-color-base;
		/* padding: 0 30upx; */
		position:relative;
		background: #f5f5f5;
		/* padding-bottom: 20upx; */
		.arc{
			position:absolute;
			left: 0;
			top: -34upx;
			width: 100%;
			height: 36upx;
		}
	}
	.tj-sction{
		@extend %section;
		.tj-item{

			@extend %flex-center;
			flex-direction: column;
			height: 140upx;
			font-size: $font-sm;
			color: #75787d;
		}
		.num{
			font-size: $font-lg;
			color: $font-color-dark;
			margin-bottom: 8upx;
		}
	}
	.order-section{
		@extend %section;
		padding: 28upx 0;
		margin-top: 20upx;
		.order-item{
			@extend %flex-center;
			width: 120upx;
			height: 120upx;
			border-radius: 10upx;
			font-size: $font-sm;
			color: $font-color-dark;
		}
		.yticon{
			font-size: 48upx;
			margin-bottom: 18upx;
			color: #fa436a;
		}
		.icon-shouhoutuikuan{
			font-size:44upx;
		}
	}
	.history-section{
		background: #fff;
		border-radius:10upx;
		.sec-header{
			display:flex;
			align-items: center;
			font-size: $font-base;
			color: $font-color-dark;
			line-height: 40upx;
			margin-left: 30upx;
			.yticon{
				font-size: 44upx;
				color: #5eba8f;
				margin-right: 16upx;
				line-height: 40upx;
			}
		}
		.h-list{
			white-space: nowrap;
			padding: 30upx 30upx 0;
			image{
				display:inline-block;
				width: 160upx;
				height: 160upx;
				margin-right: 20upx;
				border-radius: 10upx;
			}
		}
	}
	
</style>