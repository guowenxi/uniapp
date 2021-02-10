<template>
	<view class="list-cell-icon b-b"  hover-class="cell-hover"
	@longpress="onlongpress"
	 :hover-stay-time="50" 
	@click="detail"
	>
		<view v-if="state != 2 && item.repeatType">
			<view class="r-bg"></view>
			<view class="right-si" v-if="item.repeatType == 1">每日</view>
			<view class="right-si" v-if="item.repeatType == 2">每周</view>
			<view class="right-si" v-if="item.repeatType == 3">每月</view>
			<view class="right-si" v-if="item.repeatType == 4">每季</view>
			<view class="right-si" v-if="item.repeatType == 5">每年</view>
		</view>

		<view class="main item-content">
			<view class="title">
			{{item.title}}
			<view class="r-cion" v-if="item.state == 1">进行中</view>
			<view class="r-cion grey-color" v-if="item.state == 2">已结束</view>
			<view class="" style="float:right;" 
			v-if="!item.reportNumber || item.reportNumber == 1 ? false :true">
			共{{item.reportNumber}}条</view>
			
			</view>
							<view class="txt">
								<text class="t">发布人:</text>
								<text class="r">{{item.publishUserName}}</text>
							</view>
							<view class="txt">
								<text class="t">截止时间:</text>
								<text class="r">{{item.endTime}}</text>
							</view>
		</view>
		
		<view class="bottom" v-if="state == 0">
			<view class="item" style="color:#2696ed" v-if="'012'.indexOf(item.state)>=0" @click.stop="tianxie">填写</view>
		</view>
		
<!-- 		<view class="bottom" v-if="state == 1">
			<view class="item" style="color:#2696ed" v-if="'012'.indexOf(item.state)>=0" @click="chakan">查看</view>
			<view class="item"  style="color:#2696ed" v-if="'01'.indexOf(item.state)>=0" @click="xiugai">修改</view>
			<view class="item"  style="color:#e32417" v-if="'01'.indexOf(item.state)>=0" @click="shanchu">删除</view>
		</view> -->
		
<!-- 		<view class="bottom">
			<view class="item"  style="color:#2696ed"  @click="xiugai">修改</view>
		</view> -->

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
			itemClick: {
				type: [String,Boolean],
				default: true
			},
			
		},
		methods: {
			onlongpress() {
				if(this.itemClick){
					this.$emit('onlongpress');
				}
			},
			chakan() {
				this.$emit('chakan');
			},
			xiugai() {
				this.$emit('xiugai');
			},
			shanchu() {
				this.$emit('shanchu');
			},
			tianxie() {
				this.$emit('tianxie');
			},
			detail(){
				
				if(this.itemClick){
					this.$emit('detail');
				}
				
			},
		},
	}
</script>

<style lang='scss'>
.grey-color{
	color:#bababa !important;
	border-color:#bababa !important;
}
	.item-content {
		.r-cion{
				font-size:22rpx;
				line-height: 30rpx;
				width: 100rpx;
				height: 36rpx;
				background-color: #ffffff;
				border-radius: 8rpx;
				border: solid 1rpx #29ce50;
				text-align: center;
				color:#29ce50;
				display: inline-block;
				margin-left: 20rpx;
		}
		.title{
			font-size: 28rpx;
		}
		font-size: 26rpx;

		.txt {
			margin-top: 10rpx;
			display: flex;
			flex-flow: row nowrap;
	
			width: 100%;
			.t {
				color: #7b7b7b;
				text-align-last: justify;
				min-width: 20%;
				max-width: 20%;
			}
			.r {
				text-indent: 20rpx;
				flex: 1;
				overflow: hidden;
			}
		}
	}
	.list-cell-icon{
		.right-si{
			position: absolute;
			top:5rpx;
			right:5rpx;
			color:#fff;
		}
		.r-bg{
			background-color:#ff6736;
			position: absolute;
    top: -40rpx;
    right: -60rpx;
    width: 140rpx;
    height: 106rpx;
			transform: rotate(45deg);
		}
		position: relative;
		margin:30rpx auto;
		
			width: 710rpx;
			/* height: 240rpx; */
			background-color: #ffffff;
			box-shadow: 0rpx 0rpx 11.3rpx 0.7rpx 
				#e7e7e7;
			border-radius: 10rpx;
			overflow: hidden;
			.bottom{
				position: relative;
				bottom:0;
				left:0;
				width: 710rpx;
				height: 70rpx;
				background-color: #effaff;
				border-radius: 0rpx 0rpx 10rpx 10rpx;
				display: flex;
				flex-flow:row nowrap;
				.item{
					line-height: 70rpx;
					flex:1;
					text-align: center;
					position: relative;
					&:last-child{
						&:after{
							display: none;
						}
					}
					&:after{
						height: 30rpx;
							background-color: #b4b4b4;
						content:"";
						position: absolute;
						width:1px;
						
						right:0;
						top:50%;
						transform: translateY(-50%);
					}
				}
			}
			.main{
				padding:20rpx;
			}
	}
</style>
