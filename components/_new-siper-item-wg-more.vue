<template>
	<view   @click="eventClick">
		<view class="title main-text">
			<!-- <image class="icon" src="/static/_new/wwg_ID@2x.png"></image> -->
			<text class="title-text" style="margin-left: 0;">{{item.microGridName}}</text>
			<!-- <text class="middle-text">距离18x</text> -->
			<view v-if="followType ==-1 "  class="right-icon-gz" style="margin-right:0;" @click.stop="guanzhu('-1')">关注</view>
			<view v-if="followType == 1 " class="right-icon-gz cancel-icon"  @click.stop="guanzhu('1')">
				<image class="wwg_heart" src="/static/_new/wwg_heart@2x.png" ></image>
				已关注
			</view>
		</view>
		<view class="middle-line"></view>
		<view class="swiper-content">
			<view  class="left">
				<image class="star position" v-if="item.microGridUserName  !=''"  src="/static/_new/wwg_captain@2x.png"></image>
				<image
				class="img position"
				:src="item.microGridUserFileIds != '' &&  item.microGridUserFileIds != null ? `${baseUrl}fyVolunteer/file/download/${item.microGridUserFileIds}?rbacToken=${rbacToken}` : '/static/_new/wwg_photo_default_s@2x.png'" />
			</view>
			<view class="right">
				<view class="main-text sub">
					<image class="icon" src="/static/_new/wwg_name@2x.png"></image>
					<text class="title-text">{{item.microGridUserName}}</text>
				</view>
<!-- 				<view class="main-text sub">
					<image class="icon" src="/static/_new/wwg_phone@2x.png"></image>
					<text class="title-text">{{item.microGridUserPhone}}</text>
					<view class="right-icon" @click.stop="makePhone(item.microGridUserPhone)">电话</view>
				</view> -->
<!-- 				<view class="main-text sub">
					<image class="icon" src="/static/_new/wwg_VX@2x.png"></image>
					<text class="title-text">{{item.microGridUserWechat}}</text>
				</view> -->
				<view class="main-text sub">
					<image class="icon" src="/static/_new/wwg_range@2x.png"></image>
					<text class="title-text letter-hidden">{{item.microGridAddress}}</text>
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
			followType:-1,
		};
	},
	props: {
		item: {
			type: Object,
			default: {}
		}
	},
	mounted(){
		this.followType = this.item.followType;
	},
	methods: {
		guanzhu(){
			debugger
			this.followType = this.followType == 1 ? -1 : 1
			this.$http.post('fyMicroGridManage/fyFollowType/followMicroGrid', {
				microGridId:this.item.id,
				followType:this.followType,
				rbacToken:this.user.rbacToken
				})
				.then(res => {
					if (res.data.success == 1) {
							uni.showToast({
								mask:true,
								icon:'none',
								title: this.followType == 1 ? "关注成功!" : "已取消关注"
							});
					}else{
						this.followType = -1;
					}
				})
		},
		makePhone(item){
			uni.makePhoneCall({
			    phoneNumber: item //仅为示例
			});
		},
		eventClick() {
			
			this.$emit('eventClick');
		}
	}
};
</script>

<style lang="scss">
	.cancel-icon{
		box-shadow: none !important;
		background: #f6f6f6 !important;
		color:#333 !important;
		width: 160rpx !important;
		.wwg_heart{
			margin-top: 2rpx;
			margin-right: 10rpx;
			position: relative;
			top:41%;
			transform: translateY(-50%);
			display: inline-block;
			width:26rpx;
			height:23rpx;
			
		}
	}
	.middle-line {
		margin-top: 12rpx;
		width: 100%;
		height: 1rpx;
		background-color: #f0f0f0;
		opacity: 0.4;
	}
	.right-icon-gz{
		font-size:$new-font-22;
		position: relative;
		top: 50%;
		transform: translateY(-50%);
		color: #fff;
		text-align: center;
		float: right;
		width: 80rpx;
		height: 36rpx;
		background-image: linear-gradient(-90deg, #e32417 0%, #ff7352 100%), linear-gradient(#e32417, #e32417);
		background-blend-mode: normal, normal;
		box-shadow: 0rpx 3rpx 18rpx 0rpx rgba(227, 36, 23, 0.2);
		border-radius: 18rpx;
	}
	.main-text {
		margin-top:14rpx;
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
		.middle-text {
			margin-left: 12rpx;
			font-size: 22rpx;
			line-height: 36rpx;
			color: #b7b7b7;
		}
		.right-icon {
			// margin-right: 100rpx;
			text-align: center;
			float: right;
			width: 80rpx;
			height: 36rpx;
			line-height: 30rpx;
	
			border-radius: 18rpx;
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
					border-radius: 18rpx;
					border: solid 1rpx #00c52f;
				}
			}
		}
	}
	

	
</style>
