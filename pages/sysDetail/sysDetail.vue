<template>
	<view class="content">
		<view class="title">{{info.title}}</view>
		<view class="sub-title">
			推送时间:{{info.pushTime}}

			
		</view>
		<view class="info-content"><text>内容:</text> {{info.message}}</view>
		
	

		<button class="bottom-bg-button" type="red" @click="navigateBack(1)">返回</button>
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
			taskType:1,
			circles:[],
			info: {

				}
			}
		},
		onReady() {
			this.info = this.selListItem;
		},
		onLoad(){
			
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	.content{
		padding:40upx;
	}
	.title{
		font-size:40upx;
		margin:0 auto;
	}
	.sub-title{
		text-align: center;
		color:#a4a4a4;
		width:80%;
		margin:0 auto;
		margin-top:40upx;
		margin-bottom:40upx;
		font-size:26upx;
		.text{
			float:left;
		}
		.text:last-child{
			float:right;
		}
	}
	.info-content{
		line-height:50upx;
		widht:100%;
		font-size: 28upx;
	}
	.item-title{
		margin-top:77upx;
		margin-bottom:15upx;
		width:100%;
		font-size: 28upx;
	}
	
	.map-box{
		
		width:100%;
		border: 1px solid #ccc;
		height:300upx;
		margin:0 auto;
			#Gmap{
			width: 100%;
			height:100%;
		}
	}
	.margin-top-75{
		margin-top:75upx;
	}
	.loca-box{
		line-height:50upx;
		font-size: 28upx;
		margin-bottom:35upx;
		.loc-icon {
			position: relative;
			top: 8%;
			// transform: translateY(-50%);
			width: 31upx;
			height: 35upx;
			margin-right: 12upx;
			
		}
	}

</style>
