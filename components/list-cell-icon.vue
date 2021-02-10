<template>
	<view class="list-cell-icon b-b"  @click="eventClick" hover-class="cell-hover" :hover-stay-time="50">
		<view class="left-icon">
			<image class="icon" :src="icon" />
			<view class="num">{{iconNum}}</view>
		</view>
		<view class="cell-tit clamp">
			<view class='title title-1'>
				{{title}}
				<text class="cell-tip">0/8已领</text>
			</view>
			<view class='title title-2'>456</view>
			<view class='title title-3'>
				{{title}}
				<text class="cell-tip">0/8已领</text>
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
			return {
				typeList: {
					left: 'icon-zuo',
					right: 'icon-you',
					up: 'icon-shang',
					down: 'icon-xia'
				},
			}
		},
		props: {

			icon: {
				type: String,
				default: '/static/img/icon_integral@2x.png'
			},
			iconNum: {
				type: String,
				default: '0'
			},
			title: {
				type: String,
				default: '标题'
			},
			tips: {
				type: String,
				default: ''
			},
			navigateType: {
				type: String,
				default: 'right'
			},
			border: {
				type: String,
				default: 'b-b'
			},
			hoverClass: {
				type: String,
				default: 'cell-hover'
			},
			iconColor: {
				type: String,
				default: '#333'
			}
		},
		methods: {
			eventClick() {
				this.$emit('eventClick');
			}
		},
	}
</script>

<style lang='scss'>
	.list-cell-icon {
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
				width: 50upx;
				height: 46upx;
				position: absolute;
				left: 50%;
				top: 6%;
				transform: translateX(-50%);
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

			.cell-tip {
				float: right;
				font-size:16upx;
				color: $font-color-light;
			}

			line-height: 30upx;

			.title {}

			.title-1 {
				font-size: 30upx;
			}

			.title-2 {
				color: #333;
				font-size: 26upx;
			}

			.title-3 {
				color: #909399;
				font-size: 26upx;
			}

			flex: 1;
			font-size: $font-base;
			color: $font-color-dark;
			margin-right: 10upx;
			margin-left: 15upx;
		}


	}
</style>
