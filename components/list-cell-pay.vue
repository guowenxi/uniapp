<template>
	<view class="list-cell-pay b-b" hover-class="cell-hover" :hover-stay-time="50">
		<view class="cell-tit clamp">
			<view class='title title-1'>
				{{item.operatorsName}}
				<text class="cell-tip">-{{item.exchangeIntegral}}</text>
			</view>
			<view class='title title-2'>
				时间:<text>{{item.applyTime}}</text>
			</view>
			<view class='title title-3'>
				{{item.subText}}
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
			return {}
		},
		props: {
			item: {
				type: Object,
				default: []
			},

		},
		methods: {
			eventClick() {
				this.$emit('eventClick');
			}
		},
	}
</script>

<style lang='scss'>
	.list-cell-pay {
		box-sizing: initial;
		display: flex;
		position: relative;
		padding: 10px 0;

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
				width: 31upx;
				height: 25upx;
				position: absolute;
				left: 50%;
				top: 25%;
				transform: translateX(-50%);
			}

			.num {
				color: #ffdb14;
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

			.cell-tip {
				float: right;
			}

			line-height: 40upx;

			.title {}

			.title-1 {
				margin-bottom:10upx;
				font-size:$font-lg;
			}

			.title-2 {
				height: 30upx;
				color: #333;
				font-size: $font-base;
				margin-bottom:10upx;
				.icon {
					width: 20upx;
					height: 24upx;
					margin-right: 12upx;
				}
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


	}
</style>
