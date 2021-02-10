<template>
	<view class="list-cell-item b-b"  @click="eventClick()" hover-class="cell-hover" :hover-stay-time="50">
		<view class="title-side ">
			<view class="title-text">
				<!-- <text class="red-text ">#{{item.subName}}#</text> -->
				<text class="title-right-text">{{item.descr}}</text></view>

			<view v-if="item.gradeName == '重大隐患'"  class="icon icon-1" >{{item.gradeName}}</view>
			<view v-else-if="item.gradeName == '一般隐患'" class="icon icon-2" >{{item.gradeName}}</view>
			<view v-else-if="item.gradeName == '无效信息'"class="icon icon-3" >{{item.gradeName}}</view>

		</view>
<!-- 		<view class="cell-imgs clamp">
			<view v-for="img in file1">
				<image mode="aspectFill" 
				 class="img-item" 
				:src="img ? `${baseUrl}fyProHandle/file/download/${img}?rbacToken=${rbacToken}` : '/static/errorImage.jpg' "
				></image>
			</view>
			
		</view> -->
		<view class="bottom-side ">
			<view class="title-text clamp">
				<image class="loc-icon" src="/static/img/icon_position@2x.png"></image><text class="text">{{item.address}}</text>
			</view>
			<!-- <view class="right-text" :class="item.state==1 ? 'font-orange' : 'font-green'">{{item.state==1 ? '待审核' : '已审核'}}</view> -->
		</view>
		<view class="bottom-side time-box">
			<view>上报时间:{{item.commitTime}}</view>
<!-- 			<view class="right-text" :class="item.state==1 ? 'font-green' : 'font-orange'">{{item.state==1 ? '已办结' : item.state==2 ? '已受理' :  '待受理'}}</view> -->
			<view class="right-text" :class="item.state==1 ? 'font-orange' : 'font-green'">{{item.state==1 ? '待审核' :'已审核'}}</view>
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				baseUrl : getApp().globalData.baseUrl,
				rbacToken : getApp().globalData.rbacToken,
				file1:[]
			}
		},
		props: {

			item: {
				type: [Object],
				default: {}
			},
		},
		mounted(){
			this.file1 = this.item.file1.split(',');
		},
		methods: {
			eventClick() {
				this.$emit('eventClick');
			}
		},
	}
</script>

<style lang='scss'>
	.list-cell-item{
		font-size:$font-base;
	}
		.title-right-text{
		flex:1;
		overflow:hidden; 
		text-overflow:ellipsis; 
		white-space:nowrap; 
		font-size:$font-title;
	}
		.time-box{
		color:#ccc;
	}
	.icon-1{
		background: #e32417;
	}
	.icon-2{
		background: #ffa800;
	}
	.icon-3{
		background: #cecece;
	}
	.list-cell-item {
		box-sizing: initial;
		padding: 28upx;
		display: flex;
		position: relative;
		flex-flow: column nowrap;

		&.cell-hover {
			background: #fafafa;
		}

		.title-side {
			position: relative;
			font-size: $font-sim;
			display: flex;
			flex-flow: row nowrap;
			flex: 1;
			width: 100%;

			.title-text {
				display: flex;
				flex-flow: row nowrap;
				max-width: 80%;
				min-width: 80%;
				flex: 1;
				height:50upx;
				line-height:50upx;
				overflow: hidden;
			}

			.icon {
				position: absolute;
				right: 0;
				top: 50%;
				transform: translateY(-50%);
				padding:5upx 10upx;
				border-radius: 10upx;
				color: #fff;
				font-size: 18upx;
				flex: 1;
			}
		}

		.bottom-side {
			margin-top:20upx;
			position: relative;

			display: flex;
			flex-flow: row nowrap;
			flex: 1;
			width: 100%;

			.loc-icon {
				position: absolute;
				top: 50%;
				transform: translateY(-50%);
				width: 21upx;
				height: 25upx;
				margin-right: 12upx;
			}

			.title-text {
				.text{
					margin-left:30upx;
				}
				max-width: 100%;
				min-width: 100%;
				flex: 1;
				color:#333;
				overflow: hidden;
			}
			
			.right-text {
				position: absolute;
				right: 0;
				font-size: $font-sm;
				flex: 1;
			}
		}

		.red-text {
			color: #e32417;
		}

		.cell-imgs {
			.img-item {
				padding: 5upx;
				width: 33%;
				height: 130upx;
				float: left;
			}
		}
	}
</style>
