<template>
	<view class="list-cell-icon b-b"  hover-class="cell-hover" :hover-stay-time="50">
		<view class="left-icon cover-img-item">
			<view class="img-wrap">
			<image class="img" :src="item.img != '' ? `${baseUrl}fyVolunteer/file/download/${item.headImg}?rbacToken=${rbacToken}` : '/static/team_Head@2x.png'" />
			</view>
			
			<image v-if="hander" class="icon" src="/static/_new_user/star@2x.png"></image>
			

		</view>
		<view class="cell-tit clamp">
			{{item.name}}
			
			<!-- <view class='title title-1' style="float:right;color:#ccc;">
				{{item.positions ? item.positions : ""}}
			</view> -->

		</view>
		<view class="right-box" v-if="hasBtn == 'true' ? true : false">
			<button class="bottom-float-button new-bg-red"
			  type="white-border"
			   @click="eventClick"
			  >邀请</button>
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				baseUrl: getApp().globalData.baseUrl,
				rbacToken: getApp().globalData.rbacToken,
			}
		},
		props: {
			item: {
				type: [Object],
				default: {}
			},
			hasBtn: {
				type: [Boolean,String],
				default: false
			},
			hander: {
				type: [Boolean,String],
				default: false
			}
		},
		methods: {
			eventClick() {
				this.$emit('eventClick');
			}
		},
	}
</script>

<style lang='scss'>
	.cover-img-item{
		
		margin-right: 16rpx;
		
		width: 80rpx;
		height: 80rpx;
		
		float:left;
		position: relative;
		.icon{
			width: 30rpx;
			height: 27rpx;
			position: absolute;
			bottom:0;
			right:0;
			z-index:100;
		}
		.img-wrap{
			background-color: #efefef;
			overflow: hidden;
			border-radius: 50%;
			width: 80rpx;
			height: 80rpx;
			.img{
				width: 100%;
				height:100%;
			}
		}
	
	}
	
	.list-cell-icon {
		box-sizing: initial;
		height: 95upx;
		line-height: 95upx;
		display: flex;
		position: relative;
		padding: 10px;

		&.cell-hover {
			background: #fafafa;
		}

		.left-icon {
			text-align: center;
			border-radius: 50%;
			/* background: red; */
			width: 80upx;
			position: relative;
			height: 80upx;
			line-height: 80upx;
			font-size:40upx;
			
			/* align-items: center; */
			/* color: #fff; */

			.img {
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

			.cell-tip {
				float: right;
				font-size:16upx;
				color: $font-color-light;
			}



			.title {}

			.title-1 {
				font-size: 30upx;
			}

			.title-2 {
				color: #333;
				font-size: 20upx;
			}

			.title-3 {
				color: #909399;
				font-size: 18upx;
			}
			/* line-height: 30upx; */
			flex: 1;
			font-size: 35upx;
			color: $font-color-dark;
			margin-right: 10upx;
			margin-left: 15upx;
		}

		.right-box{
			max-width:20%;
			flex:1;
			.img{
				width:100%;
				height:100%;
			}
			.red-btn{
				background: #e32417;
				color:#fff;
			}

			.bottom-float-button{
				font-size:26upx;
				height:70upx;
				line-height:70upx;
			}
		}

	}
</style>
