<template>
	<view class="list-cell-icon b-b"  @click="eventClick" hover-class="cell-hover" :hover-stay-time="50">
		<view class="cell-tit clamp">
<!-- 			<view class='title title-1'>
				{{item.title}}
			</view> -->
			<view class='title title-2'>					
				<view class="sub-item">
					<text class="mall-po overflow-text-two" style="margin-left:0;">{{item.departName}}</text>
					<!-- <text class="mall-po" style="margin-left:0;">领域:{{item.formatName}} | 类型:{{item.formatName}}</text> -->
				</view>
			</view>
			<view class='title title-3'>					
				<view class="sub-item">
					<!-- <text class="mall-po" style="margin-left:0;">{{item.departName}}</text> -->
					<text class="mall-po" style="margin-left:0;">领域 {{item.formatName}} | 类型 {{item.formatName}}</text>
				</view>
			</view>
			<view class='title title-3'>
				<view class="sub-item">
					<image class="icon" src="/static/_new_index/home_time@2x.png"></image>
					<text class="mall-po">{{item.createTime}}</text>
				</view>
<!-- 				<view class="sub-item">
					<image class="icon" src="/static/img/Learn_like@2x.png"></image>
					<text class="mall-po">{{item.likeNum}}</text>
				</view> -->
<!-- 				<view class="sub-item">

					<text class="mall-po">{{item.createTime}}</text>
					
				</view> -->
				

			</view>
		</view>
		<view class="right-box" v-if="item.imgUrl">
<!-- 			<image class="img" 
			mode="aspectFill"
			v-if="item.imgUrl.indexOf('http')>=0 ? true :false"
			:src=" item.imgUrl ? item.imgUrl : '/static/errorImage.jpg'"></image> -->
<!-- 			<image class="img" 
			:src="item.imgUrl !='' && item.imgUrl ? `${baseUrl}${item.imgUrl}` : '/static/errorImage.jpg'"></image> -->
			<image class="img" 
			lazy-load
			@error="changeImg"
			:src="item.imgUrl !='' && item.imgUrl ? item.imgUrl : '/static/_new_index/dedede.png'"></image>
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				baseUrl : getApp().globalData.baseUrl,
				rbacToken : getApp().globalData.rbacToken,
			}
		},
		props: {
			item: {
				type: [Object],
				default: {}
			},
			
		},
		methods: {
			changeImg(){
				this.item.imgUrl = '/static/_new_index/dedede.png';
			},
			eventClick() {
				this.$emit('eventClick');
			}
		},
	}
</script>

<style lang='scss'>
	.list-cell-icon {
		width:100%;
		padding: 20upx 0;
		margin-bottom:1upx;
		box-sizing: initial;
		line-height: 95upx;
		display: flex;
		position: relative;
		height: 155rpx;
		&.cell-hover {
			background: #fafafa;
		}

		.left-icon {
			width: 80upx;
			position: relative;
			height: 100%;
			/* align-items: center; */
			color: #303133;

			.icon {
				width: 100%;
				height: 100%;
			}

			.num {
							color:#ffdb14;
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
			font-size: 30upx;
			color: $font-color-base;
			margin-left: $uni-spacing-row-sm;
		}

		.cell-tit {
			flex:1;
			line-height: 30upx;
			.mall-po {
				
				width:100%;
				float:left;
				margin-left:40upx;
				
			}



			.title {}

			.title-1 {
				min-height:56upx;
				white-space:pre-wrap;
				/* margin-bottom:22upx; */
				font-size: $font-title;
				line-height:$line-height-40;
			}

			.title-2 {
				color:#333;
				font-size: 28rpx;
				white-space:pre-wrap;
				line-height:$line-height-40;

				.mall-po{
					min-height: 80rpx;
				}
			}

			.title-3 {
				width: 100%;
				color: #909399;
				font-size: 22upx;
				display: flex;
				flex-flow: row nowrap;
				.sub-item{
					height:40upx;
					line-height:40upx;
					flex:1;
					position: relative;
					.icon{
						position: absolute;
						top:50%;
						transform: translateY(-50%);
						width: 23upx;
						height: 23upx;
					}
				}
			}

			flex: 1;
			font-size: $font-base;
			color: $font-color-dark;
			margin-right: 10upx;
			margin-left: 15upx;
			
		}
		.right-box{
			max-width:246rpx;
			min-width:246rpx;
			border-radius: 10rpx;
			overflow: hidden;
			flex:1;
			.img{
				width:100%;
				height:100%;
			}
		}


	}
</style>
