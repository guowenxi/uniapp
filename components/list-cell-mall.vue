<template>
	<view class="list-cell-icon"   hover-class="cell-hover" :hover-stay-time="50">
		<view class="left-icon">
			<image class="icon" :src="image" />
		</view>
		<view class="cell-tit clamp">
			<view class='title title-1'>
				{{name}}
			</view>
			<view class='title title-3'>
				平安币
				<text class="mall-po">{{num}}</text>
			</view>
		</view>
	<button class="convert-btn" type="red" @click="eventClick">立即兑换</button>
	</view>

</template>

<script>
	export default {
		data() {
			return {
			}
		},
		props: {

			image: {
				type: String,
				default: '/static/img/icon_integral@2x.png'
			},
			name: {
				type: String,
				default: '0'
			},
			num: {
				type: [String, Number],
				default: '0'
			},
		},
		methods: {
			eventClick() {
				 this.$emit('btnClick')
			},
			
		},
	}
</script>

<style lang='scss'>
	.list-cell-icon {
		border: solid 1px #d1a8a6;
		margin-bottom:8upx;
		box-sizing: initial;
		height: 95upx;
		line-height: 95upx;
		display: flex;
		position: relative;
		padding: 10px;

		&.cell-hover {
			background: #fafafa;
		}

		.left-icon {
			width: 80upx;
			position: relative;
			height: 100%;
			/* align-items: center; */
			color: #303133;

			.icon {
				width: 100%;
				height: 100%;
			}

			.num {
							color:#ffdb14;
				line-height: 0;
				position: relative;
				width: 100%;
				top: 70%;
				left: 0;
				text-align: center;
				font-size: 24upx;
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
			font-size: 30upx;
			color: $font-color-base;
			margin-left: $uni-spacing-row-sm;
		}

		.cell-tit {

			.mall-po {
				margin-left:10upx;
				font-size:24upx !important;
				color:#e32417;
			}

			line-height: 30upx;

			.title {}

			.title-1 {
				margin-bottom:22upx;
				font-size: 30upx;
			}

			.title-2 {
				color: #333;
				font-size: 20upx;
			}

			.title-3 {
				color: #909399;
				font-size: 18upx;
			}

			flex: 1;
			font-size: $font-base;
			color: $font-color-dark;
			margin-right: 10upx;
			margin-left: 15upx;
			
		}
		.convert-btn{
			font-size: 24upx;
			position: relative;
			top:50%;
			right:0;
			transform: translateY(-50%);
			height:56upx;
			line-height:56upx;
		}


	}
</style>
