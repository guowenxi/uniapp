<template>
	<view class="list-cell-icon b-b" >
		<view class="cell-tit clamp">
			<view class='title title-1'>
				{{item.title}}
			</view>
			<view class='title title-3'>
				<view class="sub-item">
					<image class="icon" src="/static/img/icon_time@2x.png"></image>
					<text class="mall-po">时间:{{item.createTime}}</text>
				</view>
			</view>
		</view>
		<view class="right-box">
			<view class="text" :class="item.integral.indexOf('-')>=0 ? 'font-green' : 'font-red'">
				<!-- <view class="sub-text dd">{{item.integral.indexOf('-')>=0 ? '-' : '+'}}</view> -->
				<view class="sub-text ss">{{item.integral}}</view>
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				baseUrl : getApp().globalData.baseUrl,
				rbacToken : getApp().globalData.rbacToken,
			}
		},
		props: {
			item: {
				type: [Object],
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
	.list-cell-icon {
		width:100%;
		padding: 40upx 0;
		margin-bottom:1upx;
		box-sizing: initial;
		line-height: 95upx;
		display: flex;
		position: relative;
		&.cell-hover {
			background: #fafafa;
		}

		.left-icon {
			width: 80upx;
			position: relative;
			height: 100%;
			/* align-items: center; */
			color: #303133;

			.icon {
				width: 100%;
				height: 100%;
			}

			.num {
							color:#ffdb14;
				line-height: 0;
				position: relative;
				width: 100%;
				top: 70%;
				left: 0;
				text-align: center;
				font-size: 24upx;
			}

		}

		.cell-icon {
			align-self: center;
			width: 60upx;
			max-height: 60upx;
			font-size: 38upx;
		}

		.cell-more {
			align-self: center;
			font-size: 30upx;
			color: $font-color-base;
			margin-left: $uni-spacing-row-sm;
		}

		.cell-tit {
			flex:1;
			.mall-po {
				margin-left:10upx;
				line-height:50upx;
			}

			line-height: 30upx;

			.title {}

			.title-1 {
				min-height:56upx;
				white-space:pre-wrap;
				/* margin-bottom:22upx; */
				font-size: $font-title;
				line-height:$line-height-40;
			}

			.title-2 {
				font-size: 30upx;
				white-space:pre-wrap;
				color: #909399;
				font-size:$font-sm;
				line-height:$line-height-40;
				
			}

			.title-3 {
				color: #909399;
				font-size: $font-base;
				display: flex;
				flex-flow: row nowrap;
				.sub-item{
					flex:1;
					.icon{
							width: 22upx;
	height: 22upx;
					}
				}
			}

			flex: 1;
			font-size: $font-base;
			color: $font-color-dark;
			margin-right: 10upx;
			margin-left: 15upx;
			
		}
		.right-box{
			max-width:25%;
			flex:1;
			position: relative;
			.text{
				width:100%;
				font-size:$font-title-42;
				position: absolute;
				left:50%;
				top:50%;
				transform: translate(-50%,-50%);
				.sub-text{
					text-align: right;
					/* display: inline-block; */
				}
				.dd{
					font-size:50upx;
				}
			}
		}


	}
</style>
