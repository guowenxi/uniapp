<template>
	<view class="list-cell-icon b-b" @click="eventClick" hover-class="cell-hover" :hover-stay-time="50">
<!-- 		<view class="left-icon">
			<view class="left-icon-main">
				<image class="icon" :src="icon" />
				<view class="num">{{item.peaceCoin}}<text style="font-size:10px;">/小时</text></view>
			</view>
		
		</view> -->
		<view class="cell-tit clamp">
			<view class='title title-1'>
				<view class="line-box">
					<view class="line"></view>
				</view>
				<text class="title-text overflow-text">{{item.taskName}}</text>
				<text v-if="item.maxPeople == 0 ? false : true " class="cell-tip">
					{{item.hasPeople ? item.hasPeople : 0}}/{{item.maxPeople? item.maxPeople : 0}}已领</text>
			</view>
			<view class='title title-2'>所属街道:{{item.publishDepartName}}</view>
			<view class='title title-2'>任务时间:{{state == 0 ? item.taskScheduleStr : `${item.taskStart.split(" ")[0]} ${item.checkStart} - ${item.checkEnd}`}}</view>
<!-- 			<view class='title title-2' v-if="state != 0">任务日期:{{}}</view> -->
			<view class='title title-3' >
				<text class="title-2" v-if="state!=0">截止时间:{{item.taskEnd}}</text>
				<text v-if="item.state == 2"  style="color:#26d31d;float:right">正在进行中</text>
				<text v-if="item.state == 1"  style="float:right">待开始</text>
				<text v-if="item.state == 8"  style="color:#e32417;float:right">已取消</text>
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
			state:{
				type: [Number,String],
				default: 0
			},
			distance:{
				type: [String,Number],
				default: '0'
			},
			icon: {
				type: String,
				default: '/static/new/pab.png'
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
		max-width: 65%;
		min-width: 65%;
		flex: 1;
		height:40upx;
		line-height:$line-height-40;
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
				width: 70upx;
				height: 70upx;
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
					margin-left: 20upx;
				}
			}

			.title-2 {
				/* margin-top: 20upx; */
				white-space:pre-wrap;
				color: #909399;
				font-size:$new-font-26;
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
