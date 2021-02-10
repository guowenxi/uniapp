<template>
	<!-- 
	1 移动 2电信 3联通 
	 -->
	<view class="list-cell-icon"   hover-class="cell-hover" :hover-stay-time="50" @click="eventClick">
		<image v-if="item.tradeType == 1" class="bg" src='/static/img/shop_yidong@2x.png' />
		<image v-if="item.tradeType == 2" class="bg" src='/static/img/shop_dianxin@2x.png' />
		<image v-if="item.tradeType == 3" class="bg" src='/static/img/shop_liantong@2x.png' />
		<view class="cell-tit clamp">
			<view class='title'>
				<view>{{item.tradePrice}}元</view>
				<view class="sub">{{"话费"}}</view>
			</view>
			<view class="mid-title">{{item.shopName}}</view>
			<view class="sub-title">{{item.tradeIntegral}}平安币</view>
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

			image: {
				type: String,
				default: '/static/img/shop_dianxin@2x.png'
			},
			name: {
				type: String,
				default: '0'
			},
			item: {
				type: Object,
				default: {}
			},
			num: {
				type: [String, Number],
				default: '0'
			},
		},
		methods: {
			eventClick() {
				 this.$emit('btnClick')
			},
			
		},
	}
</script>

<style lang='scss'>
	.list-cell-icon {
		width:300upx;
		height: 280upx;
		display: flex;
		position: relative;
		padding: 10px;
			
		.list-cell-icon{
			position: absolute;
			width:100%;
			height:100%;
			left:0;
			top:0;
		}
		.cell-tit{
			position: absolute;
			width:100%;
			height:100%;
			left:0;
			top:0;
			color:#fff;
			text-align: center;
			.title{
				margin-top: 40upx;
				font-size:40upx;
				.sub{
					margin-top:4upx;
					font-size:20upx;
				}
			}
			.mid-title{
				margin-top:30upx;
				font-size:30upx;
				line-height:60upx;
			}
			.sub-title{
				line-height:70upx;
				font-size:30upx;
			}
		}


		
	}
</style>
