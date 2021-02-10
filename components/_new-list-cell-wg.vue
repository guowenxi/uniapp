<template>
	<view class="list-cell-icon b-b" @click="eventClick" hover-class="cell-hover" :hover-stay-time="50">
		<view class="left-icon">
			<view class="left-icon-main">
				<image
			 class="icon" 
			:src="item.showFileId != '' ? `${baseUrl}fyVolunteer/file/download/${item.showFileId}?rbacToken=${rbacToken}` : '/static/_new/wwg_propaganda_picture@2x.png'" />
			</view>
		</view>
		<view class="cell-tit clamp">
			<view class="title title-1 overflow-text">{{ item.name }}</view>
			<view class="title title-2 overflow-text-two">{{ item.description }}</view>
			<!-- <view class='title title-2 overflow-text-two'>所属街道:{{streetName}}</view> -->
			<view class="title title-3">
				<!-- <text>发布时间:{{time}}</text> -->
				<text>分享立得</text>
				<text style="color: #e32417;margin:0 12rpx">{{ item.peaceCoin }}积分</text>
			</view>
			<view class="title title-4">
				<!-- <text>发布时间:{{time}}</text> -->
				<text>截止时间: {{filterTime}}</text>
				<view v-if="intervalSecondTime>0 &&  gridType" class="share" style="float: right;" @click.stop="shareAPP(item)">马上分享</view>
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
			gridType:false,
			intervalSecondTime:0,
			baseUrl: getApp().globalData.baseUrl,
			rbacToken: getApp().globalData.rbacToken
		};
	},
	props: {

		item: {
			type: Object,
			default: {}
		},
		share: {
			type: Boolean,
			default: true
		}
	},
	mounted(){
		setTimeout(()=>{
			this.intervalSecondTime = this.item.intervalSecondTime;
			this.gridType = this.user.gridType == 0 ? false : true;
			this.timeInterval();
		},300)
	},
	computed:{
		filterTime(){
			//console.log(this.intervalSecondTime)
			if(this.intervalSecondTime<=0){
				return "已超时";
			}
			var t = this.intervalSecondTime;
			var d = null;
			var h = null;
			var m = null;
			var s = null;
			d = Math.floor(t / (24 * 3600));
			h = Math.floor((t - 24 * 3600 * d) / 3600);
			m = Math.floor((t - 24 * 3600 * d - h * 3600) / 60);
			s = Math.floor(t - 24 * 3600 * d - h * 3600 - m * 60); 
			var s = d + '天' + h + '小时' + m + '分钟' + s + '秒';
			var s = `${d==0 ? '' : d}${d==0 ? '' : '天'}`+`${h==0 ? '' : h}${h==0 ? '' : '小时'}`+`${m}${m==0 ? '' : '分'}`;
			if(!d && !h && !m){
				return `${t==0 ? '' : t}${t==0 ? '' : '秒'}`
			}
			return s;
			
		},
	},
	methods: {
		 async saveFyPropagandaShare(){
			// this.loadingState();
			debugger
			console.log(`${this.item.peaceCoin} ${this.user.userId}`)
			await this.$http
				.post('fyMicroGridManage/fyPropagandaTask/saveFyPropagandaShare', {
					propagandaTaskId:this.item.id,
					userId:this.user.userId,
					peaceCoin:this.item.peaceCoin,
					rbacToken: this.user.rbacToken
				})
				.then(res => {
					// uni.hideLoading();
					if (res.data.success == 1) {
							// uni.showToast({

							// 	icon: 'none',
							// 	duration:2000,
							// 	title: "分享成功..."
							// });
					} else {
						uni.showToast({
							icon: 'none',
							title: res.data.message
						});
					}
					return res;
				});
		},
		timeInterval(){
			setTimeout(()=>{
				if(this.intervalSecondTime<=0){
					return;
				}
				this.intervalSecondTime =this.intervalSecondTime -1;
				this.timeInterval();
			},1000)
		},
		async shareAPP(item) {
			const _this = this;
			const data = await _this.saveFyPropagandaShare();
			debugger
			//#ifdef H5
			window.location.href=this.baseUrl+'palmPage/index.html?id='+this.item.id;
			//#endif
			const url =  this.baseUrl+'palmPage/#/pages/_new_sharePage/_new_sharePage?id='+this.item.id //
			 
			//#ifdef APP-VUE
				plus.share.sendWithSystem({
					type:this.item.name,
					content: this.item.name,
					href:url
					}, function(){
					
					uni.showToast({
					
						icon: 'none',
						duration:2000,
						title: "分享成功..."
					});
					
					console.log('分享成功');	
				}, function(e){
					console.log('分享失败：'+JSON.stringify(e));
				});
			
				// uni.share({
				//     provider: "weixin",
				//     scene: "WXSceneSession",
				//     type: 0,
				//     title: this.item.name,
				//     summary: this.item.description,
				//     imageUrl: "/static/PALM_loog.png",
				// 	href:'http://115.223.34.195:8090/app/download.html',
				//     success: function (res) {
				//       _this.saveFyPropagandaShare();
				//     },
				//     fail: function (err) {
				//         console.log("fail:" + JSON.stringify(err));
				//     }
				// });
				
				
			//#endif

			//#ifdef H5
				this.saveFyPropagandaShare();
			//#endif

		
		},
		eventClick() {
			this.$emit('eventClick');
		}
	}
};
</script>

<style lang="scss">
.share {
	color: #fff;
	line-height: 50rpx;
	text-align: center;
	width: 130rpx;
	height: 50rpx;
	background-image: linear-gradient(-90deg, #e32417 0%, #ff7352 100%), linear-gradient(#e32417, #e32417);
	background-blend-mode: normal, normal;
	box-shadow: 0rpx 3rpx 18rpx 0rpx rgba(227, 36, 23, 0.2);
	border-radius: 10rpx;
}
.left-icon-main {
	width: 190rpx;
	height: 190rpx;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	.icon {
		width: 100%;
		height: 100%;
	}
}
.list-cell-icon {
	box-sizing: initial;
	display: flex;
	position: relative;
	padding: 10px;

	&.cell-hover {
		background: #fafafa;
	}

	.left-icon {
		overflow: hidden;
		width: 190rpx;
		height: 190rpx;
		// background-color: #e32417;
		border-radius: 10rpx;
		color: #303133;
		position: relative;

		.num {
			color: #ffdb14;
			line-height: 22upx;
			position: relative;
			width: 100%;
			/* 				top: 52%;
				left: 0; */
			text-align: center;
			font-size: 26upx;
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
		font-size: $new-font-sm;
		color: $font-color-base;
		margin-left: $uni-spacing-row-sm;
	}

	.cell-tit {
		.cell-tip {
			float: right;
			font-size: $new-font-sm;
			color: $font-color-light;
		}

		line-height: 30upx;

		.title {
			font-size: $new-font-sm;
		}

		.title-1 {
			font-weight: bold;
			font-size: $new-font-title;
			line-height: $line-height-40;
		}

		.title-2 {
			font-size: 28rpx;
			min-height: 70rpx;
			white-space: pre-wrap;
			color: #b7b7b7;
			line-height: $line-height-40;
		}

		.title-3 {
			line-height: $line-height-40;
			color: #333333;
		}
		.title-4 {
			line-height: $line-height-40;
			color: #333333;
		}

		flex: 1;
		font-size: $font-base;
		color: $font-color-dark;
		margin-right: 10upx;
		margin-left: 15upx;
	}
}
</style>
