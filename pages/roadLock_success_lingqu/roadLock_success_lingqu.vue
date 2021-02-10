<template>
	<view class="content no-padding">
		<image class="title-icon" src="/static/img/icon_complete@2x.png"></image>
		<view class="title">领取成功</view>
		<view class="sub-text">在<text class="b-line" @click="navTo('/pages/roadblock/roadblock')">“防疫志愿服务”</text>中查看已领取的任务</view>
		<button class="bottom-bg-button" type="red" @click="switchTabTo('/pages/index/index')">返回首页</button>
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
		},
		onBackPress(){
			return true;
		},
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
	.bottom-bg-button{
		bottom:400upx;
	}
</style>
