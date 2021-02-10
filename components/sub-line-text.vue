<template>
	<view class="sub-line-text-wrap">
		<view class="sub-line-text">
			<view class="text">
				<image class="hot" :style="{display:icon ? 'inline-block' :'none'}" src="/static/img/shop_hot@2x.png"></image>
				{{text}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		props: {
			text: {
				type: String,
				default: '标题'
			},
			icon: {
				type: Boolean,
				default: false
			},

		}
	}
</script>

<style lang="scss">
	.sub-line-text-wrap {
		width: 100%;
		position: relative;
	}

	.sub-line-text {

		position: relative;
		text-align: center;

		.text {
			font-size: 24upx;
			background: #fff;
			display: inline-block;
			position: relative;
			z-index: 100;
			padding: 0 30upx;
		}

		.hot {
			width: 14upx;
			height: 20upx;
			display: inline-block;
			margin-right: 10upx;
		}

		&::after {
			content: "";
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%) scaleY(.6);
			height: 1px;
			width: 70%;
			background: #e32417;
		}
	}
</style>
