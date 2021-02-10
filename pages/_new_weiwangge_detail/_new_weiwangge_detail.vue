<template>
	<view class="content no-padding">
		<view class="title-bar">
			<view class="title">{{info.microGridName}}</view>
			<view v-if="info.followType == -1 " class="right-title">关注</view>
			<view v-if="info.followType == 1 " class="right-title cancel-icon" >
				<image class="wwg_heart" src="/static/_new/wwg_heart@2x.png" ></image>
				已关注
			</view>
		</view>
		<view class="new-item-box" v-if="gridType !=0">
			<view class="item-title">
				<view class="left-line"></view>
				<view class="title">网格信息</view>
			</view>
			<view class="item-content">
				<view class="txt">
					<text class="t">所属网格:</text>
					<text class="r">{{info.gridName}}</text>
				</view>
				<view class="txt">
					<text class="t">网格指导员:</text>
					<text class="r">{{info.gridUser1}}</text>
				</view>
				<view class="txt">
					<text class="t">网格长:</text>
					<text class="r">{{info.gridUser2}}</text>
				</view>
				<view class="txt">
					<text class="t">网格员:</text>
					<text class="r">{{info.gridUser3}}</text>
				</view>
			</view>
		</view>
		<view class="new-item-box">
			<view class="item-title">
				<view class="left-line"></view>
				<view class="title">微网格信息</view>
			</view>
			<view class="item-content">
				<view class="txt">
					<text class="t">微网格名称:</text>
					<text class="r">{{info.microGridName}}</text>
				</view>
				<view class="txt">
					<text class="t">微网格编号:</text>
					<text class="r">{{info.microGridNumber}}</text>
				</view>
				<view class="txt">
					<text class="t">微网格长:</text>
					<text class="r">{{info.microGridLeader}}</text>
				</view>
				<view class="txt">
					<text class="t">微网格范围:</text>
					<text class="r">{{info.microGridAddress}}</text>
				</view>
			</view>
		</view>
		<view class="new-item-box" style="border-bottom: 0;">
			<view class="item-title">
				<view class="left-line"></view>
				<view class="title">微网格团队</view>
				<view style="float: right;">{{info.microGridUser ? info.microGridUser.length : 0}}人</view>
			</view>
		</view>
		<scroll-view class="swiper-box" scroll-y @scrolltolower="getmoreData()">
			<new-siper-item-wg class="swiper-item" v-for="item in info.microGridUser"
			 :item="item" 
			 :microGridAddress = "info.microGridAddress"
			 @tousu="tousu(item)"></new-siper-item-wg>
			<view style="height:200rpx;width: 100%;float: left;"></view>
		</scroll-view>
		<view class="bottom-btn-box">
					<button class="bottom-float-button left-btn" type="red-border" @click.stop="guanzhu">
						{{info.followType == -1 ? '关注' :  '取消关注' }}
					</button>
		</view>
	</view>
</template>
<script>
import uniSteps from '@/components/uni-steps/uni-steps.vue';
import newSiperItemWg from '@/components/_new-siper-item-wg.vue';
import wucTab from '@/components/wuc-tab/wuc-tab';
import pickerSelect from '@/components/pickerSelect';
import newListCellWg from '@/components/_new-list-cell-wwg';
import menuSelectSimple from '@/components/menu-select-simple.vue';
import { mapState } from 'vuex';
export default {
	components: {
		uniSteps,
		pickerSelect,
		wucTab,
		newListCellWg,
		menuSelectSimple,
		newSiperItemWg
	},
	data() {
		return {
			gridType:0,
			info:{},
			id:"",
		};
	},
	onLoad() {
		// 判断是否网格/
		this.gridType = this.user.gridType;

		this.id = this.selListItem.id;
		this.getMicrogridById();
	},
	onShow() {},
	computed: {},
	methods: {
		guanzhu(){
			this.info.followType = this.info.followType == 1 ? -1 : 1
			this.$http.post('fyMicroGridManage/fyFollowType/followMicroGrid', {
				microGridId:this.id,
				followType:this.info.followType,
				rbacToken:this.user.rbacToken
				})
				.then(res => {
					if (res.data.success == 1) {
							uni.showToast({
								mask:true,
								icon:'none',
								title: this.info.followType == 1 ? "关注成功!" : "已取消关注"
							});
					}
				})
		},
		getMicrogridById() {
			
			this.loadingState();
			//getMicroGridUser
			this.$http.get('fyMicroGridManage/fyMicrogrid/getMicroGridUser', {
				id:this.id,
				rbacToken: this.user.rbacToken,
				})
				.then(res => {
					uni.hideLoading()
					if (res.data.success == 1) {
						this.info = res.data.data;
					} else {
						uni.showToast({
							icon: 'none',
							title: res.data.message
						});
					}
		
				})
		},
		tousu(item){
		debugger
			this.navToAndSaveItem(item,'/pages/_new_tousu/_new_tousu')
		},
		
	}
};
</script>
<style lang="scss">

	.cancel-icon{
		background: transparent !important;
		color:#e32417 !important;
		width: 160rpx !important;
		box-shadow: none !important;
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
		font-size: $new-font-22;
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
				margin-left: 20rpx;
				// text-indent: 20rpx;
				flex: 1;
				overflow: hidden;
			}
		}
	}
}
</style>
