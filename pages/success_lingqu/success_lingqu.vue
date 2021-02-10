<template>
	<view class="content no-padding">
		<image class="title-icon" src="/static/img/icon_complete@2x.png"></image>
		<view class="title">领取成功</view>
		<view class="sub-text color-666">可在“我的巡防”中查看已领取的任务，请在任务开始前，前往
		指定地点
		<!-- <text class="b-line">“{{placeName}}”</text> -->
		扫码领取巡防服！</view>
				<button class="bottom-bg-button bottom-bg-button1 new-bg-red" type="red" @click="switchTabTo('/pages/myMisson/myMisson')">我的巡防</button>
				<button class="bottom-bg-button bottom-bg-button2" type="red-border" @click="switchTabTo('/pages/index/index')">返回首页</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				placeName:"",
			};
		},
		onLoad(option){
			this.placeName = option.placeName ;
			
		}
	}
</script>

<style lang="scss">
	.title-icon {

		width: 200upx;
		height: 200upx;
		margin: 0 auto;
		margin-top: 110upx;
	}

	.title {
		margin: 0 auto;
		margin-top: 60upx;
		font-size: 40upx;
	}

	.sub-text {
		font-size:28upx;
		margin: 0 60upx;
		text-align: center;
		margin-top: 45upx;
		line-height:50upx;
	}
	.bottom-bg-button1{
		bottom:520upx;
	}
	.bottom-bg-button2{
		bottom:400upx;
	}
</style>
