<template>
	<view class="list-cell-icon b-b"  hover-class="cell-hover" :hover-stay-time="50" 
	@click="eventClick"
	@longpress="onlongpress"
	>
		<view class="left-num">
			<view class="num">{{itemIndex}}</view>
		</view>
		<view class="main item-content">
			<view v-for="item in item.choose">
				<view class="txt">
					<text class="t overflow-text">{{item.title}}</text>
					<text class="r overflow-text">{{item.content}}</text>
				</view>
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
			item:{
				type: [Object,String],
				default: {}
			},
			itemIndex:{
				type: [Number,String],
				default: 1
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
				this.$emit('onlongpress');
			},
			eventClick() {
				this.$emit('eventClick');
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
		flex:1;
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
				max-width: 30%;
			}
			.r {
				text-indent: 20rpx;
				flex: 1;
				overflow: hidden;
			}
		}
	}
	.list-cell-icon{
		min-height:150rpx;
		display: flex;
		flex-flow:row nowrap;
		.left-num{
			background-color: #fafafa;
			min-width:100rpx;
			max-width:100rpx;
			flex:1;
			.num{
				position: relative;
				left:50%;
				top:50%;
				transform: translate(-50%,-50%);
				text-align: center;
			}
		}
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
