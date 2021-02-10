<template>
	<view class="list-cell-icon b-b" @click="eventClick" hover-class="cell-hover" :hover-stay-time="50">
		<view class="left-icon">
			<view class="left-icon-main">
				<image class="icon" src="../static/1571194502069_1570778409.png" />
			</view>


		</view>
		<view class="cell-tit clamp">
			<view class='title title-1 overflow-text'>
				{{"所属街道所属街道所属街道所属街道所属街道所属街道所属街道所属街道所属街道所属街道所属街道所属街道所属街道所属街道"}}
			</view>
			<view class='title title-2 overflow-text-two'>{{"所属街道所属街道所属街道所属街道所属街道所属街道所属街道所属街道所属街道所属街道所属街道所属街道所属街道所属街道"}}</view>
			<!-- <view class='title title-2 overflow-text-two'>所属街道:{{streetName}}</view> -->
			<view class='title title-3'>
				<!-- <text>发布时间:{{time}}</text> -->
				<text >分享立得</text>
				<text style="color: #e32417;margin:0 12rpx">{{"asdasd"}}</text>
			</view>
			<view class='title title-4'>
				<!-- <text>发布时间:{{time}}</text> -->
				<text >截止时间: {{"3天12小时21分"}}</text>
			
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
				type: Object,
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
	.left-icon-main{
		width: 190rpx;
		height: 190rpx;
		position: absolute;
		top:50%;
		left:50%;
		transform: translate(-50%,-50%);
		.icon{
			width: 100%;
			height: 100%;
		}
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
			width: 190rpx;
			height: 190rpx;
			/* background-color: #e32417; */
			border-radius: 10rpx;
			color: #303133;
			position: relative;

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
			font-size:  $new-font-sm;
			color: $font-color-base;
			margin-left: $uni-spacing-row-sm;
		}

		.cell-tit {
			.cell-tip {
				float: right;
				font-size: $new-font-sm;
				color: $font-color-light;
			}

			line-height: 30upx;

			.title {
				font-size: $new-font-sm;
			}

			.title-1 {
			
				font-size: $new-font-title;
				line-height:$line-height-40;
			}

			.title-2 {

				
				white-space:pre-wrap;
				color: #b7b7b7;
					line-height:$line-height-40;
			}

			.title-3 {
				line-height:$line-height-40;
				color: #333333;
		
			}
			.title-4 {
				line-height:$line-height-40;
				color: #333333;
				
			}

			flex: 1;
			font-size: $font-base;
			color: $font-color-dark;
			margin-right: 10upx;
			margin-left: 15upx;
		}


	}
</style>
