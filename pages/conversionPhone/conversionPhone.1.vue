<template>
	<view class="content">
		<view class="user-info-box">
			<view class="portrait-box">
				<image class="portrait" src="/static/missing-face.png"></image>
			</view>
			<view class="info-box">
				<text class="username">游客</text>
				<view class="sub-name">热心市民</view>
			</view>
		</view>
		<view class="search-box">
			<input class="uni-input" focus placeholder="请输入手机号" />
			<button class="submit no-border-button" type="red">立即兑换</button>
			</view>
		<view class="font-28 title">权益介绍</view>
		<view  class="font-28">1.<text class="font-red">积分一经兑换不支持退还，权益数量有限，先到先得，兑完为止。</text></view>
		<view  class="font-28">2.本活动最终解释权归XXXXX所有。</view>
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
	.content{
		padding:35upx;
	}
	.font-28{
		line-height:48upx;
	}
	.title{
		margin-bottom:27upx;
	}
	.search-box {
		// padding: 0 20upx;
		height: 88upx;
		line-height: 88upx;
		border-radius: 10upx;
		overflow: hidden;
		display: flex;
		flex-flow: row nowrap;
		margin-top:45upx;
		margin-bottom:50upx;
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
