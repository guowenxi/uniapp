<template>
	<view class="list-cell-icon b-b" @click="eventClick" hover-class="cell-hover" :hover-stay-time="50">

		<view class="cell-tit ">
			<view class='title title-1 overflow-text-two'>
				{{item.complaint}}
						<image class="redIcon" src="/static/img/icon_new@2x.png"  v-if="item.status === 0 || item.status === '0' "></image>
			</view>

			<view class='title title-3'>
				<text>投诉编号:{{item.complaintCode}}</text>
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
		margin-left:30upx;
		width:36upx;
		height:24upx;
	}
	.list-cell-icon {
		box-sizing: initial;
		display: flex;
		position: relative;
		padding: 10px;

		&.cell-hover {
			background: #fafafa;
		}

		.left-icon {
			width: 80upx;
			height: 95upx;
			color: #303133;
			position: relative;
			.icon {
				width: 50upx;
				height: 46upx;
				position: absolute;
				left: 50%;
				top: 6%;
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
			font-size:  $font-sm;
			color: $font-color-base;
			margin-left: $uni-spacing-row-sm;
		}

		.cell-tit {
			.cell-tip {
				float: right;
				font-size: $font-sm;
				color: $font-color-light;
			}

			line-height: 30upx;

			.title {}

			.title-1 {
				font-size: 30upx;
				line-height:$line-height-40;
			}

			.title-2 {
				white-space:pre-wrap;
				color: #909399;
				font-size:$font-sim;
				line-height:$line-height-40;
			}

			.title-3 {
				line-height:$line-height-40;
				color: #909399;
				font-size: $font-sm;
			}

			flex: 1;
			font-size: $font-base;
			color: $font-color-dark;
			margin-right: 10upx;
			margin-left: 15upx;
		}


	}
</style>
