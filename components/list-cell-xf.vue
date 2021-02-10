<template>
	<view class="list-cell-icon b-b" @click="eventClick" hover-class="cell-hover" :hover-stay-time="50">
<!-- 		<view class="left-icon">
			<view class="left-icon-main">
				<image class="icon" src="/static/img/icon_integral@2x.png" />
				<view class="num">{{item.peaceCoin}}</view>
			</view>
			

		</view> -->
		<view class="cell-tit clamp">
			<view class='title title-1'>
				<view class="line-box">
					<view class="line"></view>
				</view>
				<text class="title-text overflow-text">{{item.taskName}}</text>
				<view class="pinganbi" >
					<image class="pinganbi-icon" src="/static/_new/wwg_coin@2x.png"></image>
					<view class="pinganbi-text">{{item.peaceCoin}}</view>
				</view>
					
<!-- 				<text v-if="item.maxPeople == 0 ? false : true " class="cell-tip">
					参与人数:{{item.hasPeople ? item.hasPeople : 0}}/{{item.maxPeople? item.maxPeople : 0}}人</text> -->
					
			</view>
			<view class='title title-2 color-666'><text class=" text-align-justify sub-title">巡防时间</text>{{item.checkStart+'-'+item.checkEnd}}</view>
			<view class='title title-2 color-666'><text class=" text-align-justify sub-title">巡防长度</text>共{{item.taskDistance ? item.taskDistance : 0}}米</view>
			<view class='title title-2 color-666'><text class=" text-align-justify sub-title">参与人数</text>{{item.hasPeople ? item.hasPeople : 0}}/{{item.maxPeople? item.maxPeople : 0}}人</view>
			<view class='title title-2 color-666' v-if="!noStreet">
				<view class="title-text clamp">
					<!-- <image class="loc-icon" src="/static/img/icon_position@2x.png"></image> -->
					<text class="text-align-justify sub-title">所属街道</text>{{item.publishDepartName}}<text class="margin-right"></text>
				</view>
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
			item:{
				type: [Object,String],
				default: {}
			},
			noStreet:{
				type: [Boolean,String],
				default: false
			},
			distance:{
				type: [String,Number],
				default: '0'
			},
			icon: {
				type: String,
				default: ''
			},
			iconNum: {
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
				default: '暂无'
			},
			joinPeople: {
				type: [String,Number],
				default: '0'
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
	.sub-title{
		width:120rpx;
		margin-right:15rpx;
		display: inline-block;
	}
	.left-icon-main{
		position: absolute;
		top:50%;
		left:50%;
		transform: translate(-50%,-50%);
	}
	.margin-right{
		margin-left:20upx;
	}
	.title-text {
		display: flex;
		flex-flow: row nowrap;
		max-width: 70%;
		min-width: 70%;
		flex: 1;
		overflow: hidden;
	}
	.loc-icon {
		width: 21upx;
		height: 25upx;
		margin-right: 12upx;
	}
	
	.list-cell-icon {
		.title-text{
			display: inline-block;
			width:70%;
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

			.title {}

			.title-1 {
				margin-bottom: 20rpx;
				font-size: $new-font-30;
				line-height:$line-height-40;
				.line-box{
					height: $line-height-40;
					position: relative;
					float: left;
				}
				.line{
					position: absolute;
					top:50%;
					transform: translateY(-50%);
					background: #ff0000;
					width:10upx;
					height:30upx;
				}
				.title-text{
					margin-left:20upx;
					
				}
			}

			.title-2 {
				white-space:pre-wrap;
				
				font-size:$new-font-26;
				line-height:$line-height-40;
			}

			.title-3 {
				line-height:$line-height-40;
				
				font-size: $font-sm;
			}

			flex: 1;
			margin-right: 10upx;
			margin-left: 15upx;
		}


	}
</style>
