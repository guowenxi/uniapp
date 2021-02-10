<template>
	<view  @click="eventClick">
		<view class="title main-text">
			<image class="icon" src="/static/_new/wwg_ID@2x.png"></image>
			<text class="title-text">{{item.gridName}}</text>
			<view v-if="followType ==-1 " class="right-icon" @click.stop="guanzhu()">关注</view>
			<view v-if="followType == 1 " class="right-icon cancel-icon" @click.stop="guanzhu()">
				<image class="wwg_heart" src="/static/_new/wwg_heart@2x.png" ></image>
				已关注
			</view>
		</view>
		<view class="middle-line"></view>
		<view class="swiper-content">
			<view class="left">
				<image class="star position" v-if="item.isHeader == 1" src="/static/_new/wwg_captain@2x.png"></image>
				<image
				class="img position"
				:src="item.microGridUserFileIds != '' ? `${baseUrl}fyVolunteer/file/download/${item.microGridUserFileIds}?rbacToken=${rbacToken}` : '/static/_new/wwg_photo_default_s@2x.png'" />
			</view>
			<view class="right">
				<view class="main-text sub">
					<image class="icon" src="/static/_new/wwg_name@2x.png"></image>
					<text class="title-text">{{item.microGridUserName}}</text>
				</view>
				<view class="main-text sub">
					<image class="icon" src="/static/_new/wwg_phone@2x.png"></image>
					<text class="title-text">{{item.microGridUserPhone}}</text>
					<view class="right-icon" @click="makePhone(item.microGridUserPhone)">电话</view>
				</view>
<!-- 				<view class="main-text sub">
					<image class="icon" src="/static/_new/wwg_VX@2x.png"></image>
					<text class="title-text">{{item.microGridUserWechatNumber}}</text>
				</view> -->
				<view class="main-text sub">
					<image class="icon" src="/static/_new/wwg_range@2x.png"></image>
					<text class="title-text">{{item.microGridAddress}}</text>
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
		this.followType  = this.item.followType;
	},
	methods: {
		guanzhu(){
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
								title: this.item.followType == -1 ? "关注成功!" : "已取消关注"
							});
					}else{
						this.item.followType = -1;
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
	
	.title {
		.right {
			color: #e32417;
			text-align: center;
			float: right;
			width: 80rpx;
			height: 36rpx;
			background-color: #fef1bc;
			border-radius: 18rpx;
		}
	}
	.middle-line {
		margin-top: 12rpx;
		width: 100%;
		height: 1rpx;
		background-color: #f0f0f0;
		opacity: 0.4;
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
			max-width: 70rpx;
			min-width: 70rpx;
			height: 94rpx;
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
					background: transparent;
					color: #fff;
					border-radius: 18rpx;
					border: solid 1rpx #ffffff;
				}
			}
		}
	}
	
	.cancel-icon{
		background: transparent !important;
		color:#fff !important;
		width: 160rpx !important;
		.wwg_heart{
			margin-top: -5rpx;
			margin-right: 10rpx;
			position: relative;
			top:41%;
			transform: translateY(-50%);
			display: inline-block;
			width:26rpx;
			height:23rpx;
			
		}
	}

	.main-text{
		width: 100%;
		height: 36rpx;
		.icon{
			float: left;
			position: relative;
			top:50%;
			transform: translateY(-50%);
				width: 21rpx;
				height: 16rpx;
	
		}
		.title-text{
			margin-left: 12rpx;
				font-size: 28rpx;
				line-height: 36rpx;
				color: #ffffff;
		}
		.right-icon{
			color:#e32417;
			text-align: center;
			float: right;
			width: 80rpx;
				height: 36rpx;
				line-height: 30rpx;
				background-color: #fef1bc;
				border-radius: 18rpx;
		}
	}

</style>
