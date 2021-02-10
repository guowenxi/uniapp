<template>
	<view class="swiper-item">
		<view class="swiper-content">
			<view class="left">
				<image class="star position" v-if="item.isHeader == 1" src="/static/_new/wwg_captain@2x.png"></image>
				<image
				class="img position"
				:src="item.fileIds != '' ? `${baseUrl}fyVolunteer/file/download/${item.fileIds}?rbacToken=${rbacToken}` : '/static/_new/wwg_photo_default_s@2x.png'" />
			</view>
			<view class="right">
				<view class="main-text sub">
					<image class="icon" src="/static/_new/wwg_name@2x.png"></image>
					<text class="title-text">{{item.name}}</text>
				</view>
<!-- 				<view class="main-text sub">
					<image class="icon" src="/static/_new/wwg_phone@2x.png"></image>
					<text class="title-text">{{item.phone}}</text>
					<view class="right-icon" style="margin-right: 0" @click.stop="makePhone(item.phone)">电话</view>
				</view> -->
<!-- 				<view class="main-text sub">
					<image class="icon" src="/static/_new/wwg_VX@2x.png"></image>
					<text class="title-text">{{item.wechatNumber}}</text>
				</view> -->
				<view class="main-text sub">
					<image class="icon" src="/static/_new/wwg_range@2x.png"></image>
					<text class="title-text letter-hidden">{{microGridAddress}}</text>
					<view class="right-icon" style="margin-right: 0;color:#afafaf;border-color:#afafaf" @click="tousu">投诉</view>
				</view>
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
		};
	},
	props: {
		item: {
			type: Object,
			default: {}
		},
		microGridAddress: {
			type: String,
			default: {}
		}
	},
	methods: {
		makePhone(item){
			uni.makePhoneCall({
			    phoneNumber: item //仅为示例
			});
		},
		eventClick() {
			this.$emit('eventClick');
		},
		tousu() {
			this.$emit('tousu');
		}
	}
};
</script>

<style lang="scss">
	.letter-hidden{
		    width: 76%;
		    float: left;
	}
	.main-text {
		margin-top: 14rpx;
		width: 100%;
		height: 36rpx;
		.icon {
			float: left;
			position: relative;
			top: 50%;
			transform: translateY(-50%);
			width: 21rpx;
			height: 16rpx;
		}
		.title-text {
			margin-left: 12rpx;
			font-size: 28rpx;
			line-height: 36rpx;
			color: #333;
		}
		.right-icon {
			margin-right: 100rpx;
			text-align: center;
			float: right;
			width: 80rpx;
			height: 36rpx;
			line-height: 30rpx;
	
			border-radius: 6rpx;
		}
	}
	.swiper-content {
		display: flex;
		flex-flow: row nowrap;
		.left {
			overflow: hidden;
			border-radius: 6rpx;
			margin-top: 19rpx;
			margin-left: 4rpx;
			margin-right: 14rpx;
			position: relative;
			max-width: 110rpx;
			min-width: 110rpx;
			height: 148rpx;
			.position {
				position: absolute;
				width: 100%;
				height: 100%;
				left: 0;
				right: 0;
			}
			.star {
				z-index: 11;
				width: 29rpx;
				height: 30rpx;
			}
		}
		.right {
			margin-top: 15rpx;
			flex: 1;
			overflow: hidden;
			display: flex;
			flex-flow: column nowrap;
			.sub {
				.icon {
					width: 22rpx;
					height: 22rpx;
				}
				.right-icon {
					color: #00c52f;
					text-align: center;
					float: right;
					width: 80rpx;
					height: 36rpx;
					background-color: #ffffff;
					border-radius: 6rpx;
					border: solid 1rpx #00c52f;
				}
			}
		}
	}
	.swiper-item {
		border-bottom: 1px solid #f8f8f8;
		width: 100%;
		float: left;
		padding: 0rpx 50rpx 20rpx;
		
	}
	

	
</style>
