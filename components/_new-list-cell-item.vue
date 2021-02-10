<template>
	<view class="list-cell-item b-b" @click="eventClick()" hover-class="cell-hover" :hover-stay-time="50">
		<view class="left-img">
			<image class="img" :src="item.file1 != '' ? `${baseUrl}fyVolunteer/file/download/${item.file1.split(',')[0]}?rbacToken=${rbacToken}` : '/static/_new/wwg_propaganda_picture@2x.png'" />
		</view>
		<view class="right-content">
			<view class="title-side ">
				<view class="title-text">
					<view class="title-right-text overflow-text-two">{{item.descr}}</view>
					<view class="pinganbi" v-if="item.taskType !=3 && item.integral">
						<image class="pinganbi-icon" src="/static/_new/wwg_coin@2x.png"></image>
						<view class="pinganbi-text">{{item.integral}}</view>
					</view>
				</view>
			</view>
			<view class="bottom-side ">
				<view v-if="item.state==1" class="right-text font-gray-border">待审核</view>
				<view v-if="item.state==2" class="right-text font-green-border">已审核</view>
				<view v-if="item.gradeName" class="right-text font-orange-border">{{item.gradeName}}</view>
				<view v-if="item.taskType =='微上报'" class="right-text font-orange-border">微上报</view>
			</view>
			<view class="bottom-side time-box" style="margin-top: 10rpx;">
				<text>上报时间</text><text class="text">{{item.commitTime}}</text>
			</view>
			<view class="bottom-side time-box" style="margin-top: 10rpx;">
				<view class="title-text clamp">
					<text>上报地址</text><text class="text">{{item.address}}</text>
				</view>
			</view>



		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				baseUrl: getApp().globalData.baseUrl,
				rbacToken: getApp().globalData.rbacToken,
				file1: []
			}
		},
		props: {

			item: {
				type: [Object],
				default: {}
			},
		},
		mounted() {
			this.file1 = this.item.file1.split(',');
		},
		methods: {
			eventClick() {
				this.$emit('eventClick');
			}
		},
	}
</script>

<style lang='scss'>
	.left-img {
		min-width: 180rpx;
		max-width: 180rpx;
		height: 180rpx;
		border-radius: 8rpx;
		overflow: hidden;
		.img {
			width: 100%;
			height: 100%;
		}
	}

	.right-content {
		flex: 1;
		width: 0;
		margin-left: 20rpx;

		.title-right-text {
			max-width:77%;
			min-width:77%;
			min-height: 80rpx;	
			max-height: 80rpx;
			margin-bottom: 20rpx;
		}
	}

	.list-cell-item {
		flex-flow: row nowrap !important;
		font-size: $font-base;
	}

	.time-box {
		color: #666666;
	}

	.icon-1 {
		background: #e32417;
	}

	.icon-2 {
		background: #ffa800;
	}

	.icon-3 {
		background: #cecece;
	}

	.list-cell-item {
		box-sizing: initial;
		padding: 28upx;
		display: flex;
		position: relative;
		flex-flow: column nowrap;

		&.cell-hover {
			background: #fafafa;
		}

		.title-side {
			width: 100%;
			position: relative;
			display: flex;
			flex-flow: row nowrap;
			flex: 1;
			/* width: 80%; */

			.title-text {
				width: 100%;
				font-size: $new-font-30;
				display: flex;
				flex-flow: row nowrap;
			}

			.icon {
				position: absolute;
				right: 0;
				top: 50%;
				transform: translateY(-50%);
				padding: 5upx 10upx;
				border-radius: 10upx;
				color: #fff;
				font-size: 18upx;
				flex: 1;
			}
		}

		.bottom-side {
			font-size: $new-font-26;
			position: relative;
			display: flex;
			flex-flow: row nowrap;
			flex: 1;
			width: 100%;
			.text{
				margin-left: 13rpx;
			}

			.loc-icon {
				position: absolute;
				top: 50%;
				transform: translateY(-50%);
				width: 21upx;
				height: 25upx;
				margin-right: 12upx;
			}

			.right-text {
				font-size:18rpx;
				margin-right: 10rpx;
				border-radius: 8rpx;
				float:left;
				padding: 3rpx 10rpx;
			}
		}

		.red-text {
			color: #e32417;
		}

		.cell-imgs {
			.img-item {
				padding: 5upx;
				width: 33%;
				height: 130upx;
				float: left;
			}
		}
	}
</style>
