<template>
	<view class="list-cell-icon b-b" @click="eventClick" hover-class="cell-hover" :hover-stay-time="50">

		<view class="cell-tit clamp">
			<view class='title title-1 overflow-text'>
				<image class="left-icon" v-if="item.messageType==0" src="/static/_new/xx_report@2x.png"></image>
				<image class="left-icon" v-if="item.messageType==2" src="/static/_new/xx_volunteer@2x.png"></image>
				<image class="left-icon" v-if="item.messageType==3" src="/static/_new/xx_wwg@2x.png"></image>
				<image class="left-icon" v-if="item.messageType==4" src="/static/_new/xx_patrol@2x.png"></image>
				<image class="left-icon" v-if="item.messageType==6" src="/static/_new/xx_report@2x.png"></image>
				<text v-if="item.messageType==0">系统消息</text>
				<text v-if="item.messageType==2">防疫任务</text>
				<text v-if="item.messageType==3">智能填表</text>
				<text v-if="item.messageType==4">平安巡防</text>
				<text v-if="item.messageType==5">微上报</text>
				<text v-if="item.messageType==6">系统消息</text>
						<!-- <image class="redIcon" src="/static/img/icon_new@2x.png"  v-if="item.status === 0 || item.status === '0' "></image> -->	
				<text style="float:right;">{{item.displayTime}}</text>
			</view>
			<view class='title-2 overflow-text-two'>{{item.title}}</view>
			<view v-if="!messState" class='title-2 overflow-text-two color-333' >{{mess}}</view>
			<view v-else class="title-2">
				<view class='color-333' v-for="(it,idx) in mess">
					<view class="color-666 title-2-title" style="width:150rpx;text-align: right;padding-right:20rpx;">{{it.name}}</view>
					<view class="color-666 title-2-text">{{it.val}}</view>
				</view>
			</view>

<!-- 			<view class='title title-3'>
				<text>推送时间:{{item.pushTime}}</text>
			</view> -->
			<view class='title title-4'>
				<text>查看详情</text>
				<image class="r-icon" src="/static/_new/wwg_choice_right@2x.png" />
			</view>
		</view>

		<!-- 			<text class="cell-more yticon"
				:class="typeList[navigateType]"
			></text> -->
	</view>

</template>

<script>
	export default {
		data() {
			return {
				mess:[],
				messState :false,
			}
		},
		mounted(){
			
			if(this.item.content !=""){
				this.mess = JSON.parse(this.item.content);
				this.messState = true ;
			}else{
				this.mess = this.item.message;
				this.messState = false;
			}
			
			
		},
		props: {

			item: {
				type: [String,Object],
				default: {}
			},
			
			
		},
		methods: {
			eventClick() {
				this.$emit('eventClick');
			}
		},
	}
</script>

<style lang='scss'>
	.left-icon{
			width: 36rpx;
			height: 33rpx;
			float: left;
			margin-right:20rpx;
	}
	.redIcon{
		margin-left:30upx;
		width:36upx;
		height:24upx;
	}
	.list-cell-icon {
		background: #fff;
		box-sizing: initial;
		display: flex;
		position: relative;
		margin-bottom: 20rpx;

		&.cell-hover {
			background: #fafafa;
		}



		.cell-icon {
			align-self: center;
			width: 60upx;
			max-height: 60upx;
			font-size: 38upx;
		}

		.cell-more {
			align-self: center;
			font-size:  $font-sm;
			color: $font-color-base;
			margin-left: $uni-spacing-row-sm;
		}

		.cell-tit {
			flex: 1;
			font-size: $font-base;
			color: $font-color-dark;
			overflow: hidden;
			border-radius: 10rpx;

			.cell-tip {
				float: right;
				font-size: $font-sm;
				color: $font-color-light;
			}

			line-height: 30upx;

			.title {
				padding:14rpx 30rpx;
			}

			.title-1 {
			
				background: #fafafa;
				font-size: $new-font-28;
				line-height:$line-height-40;
				border-bottom:1rpx solid #e6e6e6;
			}

			.title-2 {
				padding:20rpx 30rpx;
				white-space:pre-wrap;

				font-size: $new-font-30;
				line-height:$line-height-40;
				.title-2-title{
					float:left;
				}
				.title-2-text{
					width:75%;
					display: inline-block;
				}
			}

			.title-3 {
				line-height:$line-height-40;
				color: #909399;
				font-size: $font-sm;
			}
			.title-4{
				line-height:$line-height-40;
				font-size: $font-sm;
				border-top: 1rpx solid #f0f0f0;
				.r-icon{
					float:right;
						width: 14rpx;
						height: 28rpx;
				}
			}



		}


	}
</style>
