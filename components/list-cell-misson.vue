<template>
	<view class="list-cell-icon b-b" @click="eventClick" hover-class="cell-hover" :hover-stay-time="50">
		<view class="left-icon">
			<view class="left-icon-main">
				<image class="icon" src="/static/img/icon_integral@2x.png" />
				<view class="num">
					<view>{{integratingRangeLeft}}</view>
					<view class="middle">~</view>
					<view>{{integratingRangeRight}}</view>
				</view>
			</view>


		</view>
		<view class="cell-tit clamp">
			<view class='title title-1 overflow-text'>
				{{name}}
			</view>
			<view class='title title-2 overflow-text-two'>{{content}}</view>
			<!-- <view class='title title-2 overflow-text-two'>所属街道:{{streetName}}</view> -->
			<view class='title title-3'>
				<!-- <text>发布时间:{{time}}</text> -->
				<text class="cell-tip">参与人次:{{joinPeople}}</text>
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

			icon: {
				type: String,
				default: ''
			},
			iconNum: {
				type: [String,Number],
				default: '0'
			},
			integratingRangeLeft: {
				type: [String,Number],
				default: '0'
			},
			integratingRangeRight: {
				type: [String,Number],
				default: '0'
			},
			name: {
				type: String,
				default: 'text'
			},
			content: {
				type: String,
				default: '暂无'
			},
			time: {
				type: String,
				default: '2200--200-'
			},
			joinPeople: {
				type: [String,Number],
				default: '0'
			},
			streetName: {
				type: String,
				default: '暂无'
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
	.left-icon-main{
		position: absolute;
		top:50%;
		left:50%;
		transform: translate(-50%,-50%);
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
			height: auto;
			color: #303133;
			position: relative;
			.icon {
				width: 46upx;
				height: 40upx;
				position: relative;
				left: 50%;
				top: 0%;
				transform: translateX(-50%);
			}

			.num {
				color: #ffdb14;
				line-height: 22upx;
				position: relative;
				width: 100%;
/* 				top: 52%;
				left: 0; */
				text-align: center;
				font-size: 26upx;

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
				font-size: $font-title;
				line-height:$line-height-40;
			}

			.title-2 {
				margin-top:10upx;
				margin-bottom:10upx;
				
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
