<template>
	<view class="list-cell-icon b-b"  @click="eventClick" hover-class="cell-hover" :hover-stay-time="50">
		<view class="cell-tit clamp">
			<view class='title title-1'>
				{{item.title}}
			</view>
			<view class='title title-3'>
				<view class="sub-item">
					<image class="icon" src="/static/img/icon_time@2x.png"></image>
					<text class="mall-po">{{item.updateTime}}</text>
				</view>
			</view>
		</view>
		<view class="right-box">
			<button class="bottom-float-button" type="white-border">开始答题</button>
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {

			}
		},
		props: {

			item: {
				type: [Object],
				default: {}
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
	
	.bottom-float-button{
		width: 160upx;
		height: 56upx;
		line-height:56upx;
		font-size: 24upx;
	}
	.list-cell-icon {
		width:100%;
		padding: 40upx 0;
		margin-bottom:1upx;
		box-sizing: initial;
		line-height: 95upx;
		display: flex;
		position: relative;
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
			flex:1;
			.mall-po {
				margin-left:10upx;
				font-size:24upx !important;
			}

			line-height: 30upx;

			.title {}

			.title-1 {
				min-height:56upx;
				white-space:pre-wrap;
				margin-bottom:22upx;
				font-size: 28upx;
			}

			.title-2 {
				color: #333;
				font-size: 20upx;
			}

			.title-3 {
				color: #909399;
				font-size: 18upx;
				display: flex;
				flex-flow: row nowrap;
				.sub-item{
					flex:1;
					.icon{
							width: 22upx;
	height: 22upx;
					}
				}
			}

			flex: 1;
			font-size: $font-base;
			color: $font-color-dark;
			margin-right: 10upx;
			margin-left: 15upx;
			
		}
		.right-box{
			max-width:25%;
			flex:1;
			.img{
				width:100%;
				height:100%;
			}
		}


	}
</style>
