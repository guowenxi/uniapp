<template>
	<view class="list-cell-icon b-b" @click="eventClick" hover-class="cell-hover" :hover-stay-time="50">
		<view class="cell-tit ">
			<!-- 问题 -->
			<view class="title title-1 overflow-text-two">{{ item.userSuggest }}</view>
			<!-- 回复内容 -->
			<view v-if="item.leaderFeedback" class="title title-sub">{{item.leaderFeedback}}</view>
			
			<!-- <view class="title title-3">
				<text class="right-text" :class="item.type == 1 ? 'font-orange-border' : item.type == 2 ? 'font-green-border' : 'font-red-border'">
					{{ item.type == 1 ? '待处理' : item.type == 2 ? '已回复' : '不处理' }}
				</text>
			</view> -->
			<view class="title title-3">{{ item.updateTime }}</view>
		</view>

		<!-- 			<text class="cell-more yticon"
				:class="typeList[navigateType]"
			></text> -->
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	props: {
		item: {
			type: [Object, String],
			default: {}
		},
		distance: {
			type: [String, Number],
			default: '0'
		},
		icon: {
			type: String,
			default: '/static/img/icon_integral@2x.png'
		},
		iconNum: {
			type: [String, Number],
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
			default: '暂无'
		},
		joinPeople: {
			type: [String, Number],
			default: '0'
		}
	},
	methods: {
		eventClick() {
			this.$emit('eventClick');
		}
	}
};
</script>

<style lang="scss">
.right-text {
	padding: 0 10rpx;
}
.left-icon-main {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}
.margin-right {
	margin-left: 20upx;
}
.title-text {
	display: flex;
	flex-flow: row nowrap;
	max-width: 65%;
	min-width: 65%;
	flex: 1;
	height: 50upx;
	line-height: 50upx;
	overflow: hidden;
}
.loc-icon {
	width: 21upx;
	height: 25upx;
	margin-right: 12upx;
}

.list-cell-icon {
	.title-text {
		display: inline-block;
		width: 70%;
	}
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
			width: 50upx;
			height: 46upx;
			/* position: absolute; */
			/* left: 50%; */
			/* top: 6%; */
			/* transform: translateX(-50%); */
		}

		.num {
			color: #ffdb14;
			/* line-height: 0; */
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
			font-size: $font-sm;
			color: $font-color-light;
		}

		line-height: 30upx;

		.title {
			line-height: $line-height-40;
		}

		.title-1 {
			font-size: $new-font-30;
			line-height: $line-height-40;
			color: #333;
		}
		.title-2 {
			white-space: pre-wrap;
			color: #909399;
			font-size: $font-sim;
			line-height: $line-height-40;
		}

		.title-3 {
			margin-top: 20upx;
			line-height: $line-height-40;
			color: #909399;
			font-size: $font-sm;
		}
		
		.title-sub{
			font-size: $new-font-28;
			color: #666;
		}

		flex: 1;
		font-size: $font-base;
		color: $font-color-dark;
		margin-right: 10upx;
		margin-left: 15upx;
	}
}
</style>
