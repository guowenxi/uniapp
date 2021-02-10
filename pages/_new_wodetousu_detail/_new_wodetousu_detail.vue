<template>
	<view class="content no-padding">
		<scroll-view scroll-y>
					<view class="new-item-box">
						<view class="item-title">
							<view class="left-line"></view>
							<view class="title">投诉信息</view>
						</view>
						<view class="item-content">
							<view class="txt">
								<text class="t">投诉编号:</text>
								<text class="r">{{complaint.complaintCode}}</text>
							</view>
							<view class="txt">
								<text class="t">投诉时间:</text>
								<text class="r">{{complaint.createTime}}</text>
							</view>
						</view>
					</view>
					<view class="new-item-box">
						<view class="item-title">
							<view class="left-line"></view>
							<view class="title">投诉对象</view>
						</view>
						<view class="item-content">
							<view class="txt">
								<text class="t">微网格名称:</text>
								<text class="r">{{gridUser.microGridName}}</text>
							</view>
							<view class="txt">
								<text class="t">微网格编号:</text>
								<text class="r">{{gridUser.microGridNumber}}</text>
							</view>
							<view class="txt">
								<text class="t">微网格长:</text>
								<text class="r">{{ gridUserHeader.name}}</text>
							</view>
							<view class="txt">
								<text class="t">手机号码:</text>
								<text class="r">{{gridUser.phone}}</text>
							</view>
<!-- 							<view class="txt">
								<text class="t">微信号:</text>
								<text class="r">{{gridUser.wechatNumber}}</text>
							</view> -->
						</view>
					</view>
					<view class="swiper-item">
						<view class="swiper-content">
							<view class="left">
								<image class="star position" src="/static/_new/wwg_captain@2x.png"></image>
								<image
								class="img position"
								:src="gridUserHeader.microGridUserFileIds != '' && gridUserHeader.microGridUserFileIds  ? `${baseUrl}fyVolunteer/file/download/${gridUserHeader.microGridUserFileIds}?rbacToken=${rbacToken}` : '/static/_new/wwg_photo_default_s@2x.png'" />
							</view>
							<view class="right">
								<view class="main-text sub">
									<image class="icon" src="/static/_new/wwg_name@2x.png"></image>
									<text class="title-text">{{gridUserHeader.name}}</text>
								</view>
								<view class="main-text sub">
									<image class="icon" src="/static/_new/wwg_phone@2x.png"></image>
									<text class="title-text">{{gridUserHeader.phone}}</text>
									
								</view>
	<!-- 							<view class="main-text sub">
									<image class="icon" src="/static/_new/wwg_VX@2x.png"></image>
									<text class="title-text">{{gridUserHeader.wechatNumber}}</text>
								</view> -->
								<view class="main-text sub">
									<image class="icon" src="/static/_new/wwg_range@2x.png"></image>
									<text class="title-text">{{gridUserHeader.zoneName}}</text>
								</view>
							</view>
						</view>
					</view>
					<view class="new-item-box">
						<view class="item-title">
							<view class="left-line"></view>
							<view class="title">投诉内容</view>
						</view>
						<view class="item-content">
							<view class="txt">
								<text>{{complaint.complaint}}</text>

							</view>
						</view>
					</view>
					<view class="new-item-box" style="border-bottom: 0;">
						<view class="item-title">
							<view class="left-line"></view>
							<view class="title">投诉进度</view>
						</view>
						<steps-time class="steps"
						:options="complaintHandleList" 
						></steps-time>
					</view>
					
		</scroll-view>

	</view>
</template>
<script>
import stepsTime from '@/components/steps-time/steps-time.vue';
import newSiperItemWg from '@/components/_new-siper-item-wg.vue';
import wucTab from '@/components/wuc-tab/wuc-tab';
import pickerSelect from '@/components/pickerSelect';
import newListCellWg from '@/components/_new-list-cell-wwg';
import menuSelectSimple from '@/components/menu-select-simple.vue';
import { mapState } from 'vuex';
export default {
	components: {
		stepsTime,
		pickerSelect,
		wucTab,
		newListCellWg,
		menuSelectSimple,
		newSiperItemWg
	},
	data() {
		return {
			id:"",
			baseUrl : getApp().globalData.baseUrl,
			rbacToken : getApp().globalData.rbacToken,
			gridUserHeader:{},
			gridUser:{},
			complaint:{},
			complaintHandleList:[],
		};
	},
	onLoad() {

		this.id = this.selListItem.id;
		this.getComplaintById();
	},
	onShow() {},
	computed: {},
	methods: {
		getComplaintById() {
			
			this.loadingState();
			this.$http.get('fyMicroGridManage/complaint/getComplaintById', {
				id:this.id,
					rbacToken: this.user.rbacToken,
				})
				.then(res => {
					uni.hideLoading()
					if (res.data.success == 1) {
						this.gridUserHeader = res.data.data.gridUserHeader;
						this.gridUser = res.data.data.gridUser;
						this.complaint = res.data.data.complaint;
						this.complaintHandleList = res.data.data.complaintHandleList;
						debugger
					} else {
						uni.showToast({
							icon: 'none',
							title: res.data.message
						});
					}
		
				})
		},
		
		selInfo(item){

			this.navToAndSaveItem(item,'/pages/_new_guanzhuweiwangge_detail/_new_guanzhuweiwangge_detail')
		},
		tousu(item){

			this.navToAndSaveItem(item,'/pages/_new_tousu/_new_tousu')
		},
	}
};
</script>
<style lang="scss">
	.main-text {
		margin-top: 2rpx;
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
	
			border-radius: 18rpx;
		}
	}
	.swiper-content {
		display: flex;
		flex-flow: row nowrap;
		.left {
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
	.swiper-item {
		border-bottom: 1px solid #f8f8f8;
		width: 100%;

		padding: 0rpx 50rpx 20rpx;
		
	}
.bottom-btn-box {
	z-index:110;
		position: fixed;
		bottom:0upx;
		left:0;
		background: #fff;
		// border-top: 1px solid #eee;
		max-height: 160upx;
		min-height: 160upx;
		width:100%;

		// padding-top: 20upx;
		flex: 1;
		
		display: flex;
	    margin: 0 auto;
		
		.left-btn {
			margin-top:40upx;
			width:90%;
			// flex: 1;

		}
	

	}
.title-bar {
	height: 32rpx;
	margin: 18rpx 20rpx;
	.title {
		float: left;
		font-size: 36rpx;
		font-weight: bold;
		color: #333333;
	}
	.right-title {
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
}

.new-item-box {
	background: #fff;
	
	padding: 20rpx;
	border-bottom: 10rpx solid #f6f6f6;
	.item-title {


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
</style>
