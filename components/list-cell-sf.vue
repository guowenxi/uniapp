<template>
	<view class="list-cell-icon b-b"  @click="eventClick" hover-class="cell-hover" :hover-stay-time="50">
		<view class="cell-tit clamp">
			<view class='title title-1'>
				{{item.title}}
				<!-- <text class="cell-tip">0/8已领</text> -->
			</view>
			<view class='title title-2'>{{item.incidentContent}}</view>
			<view class='title title-3'>
				{{item.incidentTime}}
				
				<text v-if="item.handType==0" class="cell-tip" >{{item.disposeName}}</text>
				<text v-else-if="item.handType==1" class="cell-tip font-green" >{{item.disposeName}}</text>
				<text v-else-if="item.handType==2" class="cell-tip font-red" >{{item.disposeName}}</text>
				<text v-else-if="item.handType==3" class="cell-tip font-orange" >{{item.disposeName}}</text>
				
			</view>
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
				type: [String,Object],
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
	.redIcon{
		
	}
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

				color: $font-color-light;
			}



			.title {
				line-height: $line-height-40;
				font-size:$new-font-26;
			}

			.title-1 {
				font-size: 30upx;
			}

			.title-2 {
				color: #333;

			}

			.title-3 {
				color: #909399;
		
			}

			flex: 1;
			font-size: $font-base;
			color: $font-color-dark;
			margin-right: 10upx;
			margin-left: 15upx;
		}


	}
</style>
