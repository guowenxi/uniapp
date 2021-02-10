<template>
	<view class="content no-padding">
		<image class="title-icon" src="/static/img/icon_complete@2x.png"></image>
		<view class="title">提交成功</view>
		<view class="sub-text">系统已收到您的实名认证申请，我们会尽快进行审核认证，认证结果会第一时间以系统消息形式通知您，请耐心等待。</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
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
		margin: 0 60upx;
		text-align: center;
		margin-top: 45upx;
	}
</style>
