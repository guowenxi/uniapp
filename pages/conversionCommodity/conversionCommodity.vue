<template>
	<view class="content no-padding">
		<swiper class="carousel" circular>
			<swiper-item v-for="(img, index) in info.tradeImage" :key="index" class="carousel-item">
				<image class="img" mode="scaleToFill" :src="img ? img : '/static/temp/banner1.jpg'" />
			</swiper-item>
		</swiper>
		<view class="middle-box" @click="show_erweima">
			<view class="middle-title">{{info.shopName}}</view>
			<view class="font-red middle-num">{{info.exchangeCount}}平安币</view>
			<view class="title">兑换地址</view>
			<view class="title-text">
				<image class="loc-icon" src="/static/img/icon_position@2x.png"></image>{{info.shopAddress}}
			</view>
			<image class="erweima big" src="/static/img/QRcode@2x.png"></image>
		</view>

		<view class="sub-item">
			<view class="font-28 title">权益介绍</view>
			<view class="font-28">1.本商品请前往兑换地址出具二维码进行兑换。</view>
			<view class="font-28">2.<text class="font-red">积分一经兑换不支持退还，权益数量有限，先到先得，兑完为止。</text></view>
			<view class="font-28">3.本活动最终解释权归XXXXX所有。</view>
		</view>

<uni-popup ref="popup" type="center">
<image class="erweima-pop" :src="erweima"></image>
</uni-popup>

	</view>
</template>

<script>
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	export default {
		components: {
			uniPopup
		},
		data() {
			return {
				erweima:"/static/img/QRcode@2x.png",
				info:{
					tradeImage:[
						"/static/temp/banner1.jpg",
						"/static/temp/banner2.jpg",
						"/static/temp/banner3.jpg",
						"/static/temp/banner4.jpg",
					]
				}
			};
		},
		onReady(){
			this.info = this.selListItem;
			this.setQRImage()
		},
		methods: {

			setQRImage(){
					let _this = this;
					this.$http.post('peaceShopManage/tradeInfo/setQRImage', {
						tempCount:'1',
						tradeIntegral:this.info.tradeIntegral,
						shopId:this.info.shopId,
						shopName:this.info.shopName,
						id:this.info.id,
						tradeName:this.info.tradeName,
						exchangeType:this.info.exchangeType,
						rbacToken:this.user.rbacToken
					},{
						responseType:"blob"
					})
					.then(res => {
						let blob = new Blob([res.data], {type:'image/jpeg'});
						let a = new FileReader();
							a.onload = function (e) {
								_this.erweima = e.target.result;
							}
							a.readAsDataURL(blob);
					})
			},
			show_erweima() {
				this.$refs.popup.open()
				
				// uni.scanCode({
				// 		onlyFromCamera: true,
				// 		success: function(res) {
				// 			console.log('条码类型：' + res.scanType);
				// 			console.log('条码内容：' + res.result);
				// 		}
				// })
		}
	}
	}
</script>

<style lang="scss">
	.uni-popup{
		top:0;
	}
	.erweima-pop{
		width:500upx;
		height:500upx;
	}
	.sub-item {
		padding: 50upx 44upx;
	}

	.middle-box {
		position: relative;
		background: #eeeeee;
		padding: 36upx 38upx;

		.middle-title {
			font-size: 36upx;
			margin-bottom: 33upx;

		}

.big{
	width: 120upx !important;
	height: 120upx !important;
}
		.erweima {
			width: 62upx;
			height: 62upx;
			position: absolute;
			right: 5%;
			top: 50%;
			transform: translateY(-50%);
		}

		.middle-num {
			font-size: 28upx;
			margin-bottom: 32upx;
		}

		.loc-icon {
			width: 21upx;
			height: 25upx;
			margin-right: 12upx;
		}
	}

	.carousel {
		width: 100%;
		height: 380upx;
		margin-top: 40upx;
		margin-bottom: 75upx;

		.img {
			width: 100%;
			height: 100%;
		}
	}

	.font-28 {
		line-height: 48upx;
	}

	.title {
		margin-bottom: 27upx;
	}

	.search-box {
		// padding: 0 20upx;
		height: 88upx;
		line-height: 88upx;
		border-radius: 10upx;
		overflow: hidden;
		display: flex;
		flex-flow: row nowrap;
		margin-top: 45upx;
		margin-bottom: 50upx;

		.uni-input {
			text-indent: 30upx;
			min-width: 70%;
			background: #eee;
			line-height: 88upx;
			height: 100%;
			flex: 1;
		}

		.submit {
			height: 88upx;
			line-height: 88upx;
			flex: 1;
		}

	}

	.user-info-box {
		background: #eee;
		height: 200upx;
		font-size: $font-base;
		padding: 0 20upx;
		padding-top: 60upx;
		padding-bottom: 60upx;
		color: #fff;
		display: flex;
		align-items: center;
		position: relative;
		z-index: 1;



		.portrait {
			width: 130upx;
			height: 130upx;
			border: 5upx solid #fff;
			border-radius: 50%;
		}

		.right-side-box {
			font-size: 20upx;
			position: absolute;
			right: 40upx;

		}

		.renzheng_box {
			background: rgba(0, 0, 0, 0.3);
			padding: 10upx 20upx;
		}

		.username {
			font-size: $font-lg;
			margin-left: 20upx;
		}

		.sub-name {
			margin-left: 20upx;
			font-size: 24upx;
		}

		.info-box {
			.username {
				font-size: 36upx;
				color: #333;
			}

			.sub-name {
				font-size: 30upx;
				color: #e32417;
			}
		}
	}
</style>
