<template>
	<view class="content no-padding">
		<image class="title-icon" src="/static/img/icon_complete@2x.png"></image>
		<view class="title">任务完成</view>
		<view class="sub-text">您已完成当前时段任务,返回<text class="b-line" @click="navTo('/pages/roadblock/roadblock')">“防疫志愿服务”</text>领取其他任务吧!</view>
		<view class="sub-text">任务时长:{{duration.toString()}}小时  共获得平安币:{{actPeaceCoin.toString()}}</view>

		<button class="bottom-bg-button" type="red" @click="switchTabTo('/pages/index/index')">返回首页</button>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	export default {
		data() {
			return {
				placeName:"",
				duration:"",
				actPeaceCoin:"",
			};
		},
		methods:{
		},
		onReady(){
			this.actPeaceCoin  = this.selListItem.actPeaceCoin;
			this.duration  = this.selListItem.duration;
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
