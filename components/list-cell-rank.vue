<template>
	<view class="list-cell-rank b-b"  hover-class="cell-hover" :hover-stay-time="50">
		<view class="left-icon">
			<image v-if="tops == 1" class="icon" src="/static/_new_rank/List_1@2x.png" />
			<image v-else-if="tops == 2" class="icon" src="/static/_new_rank/List_2@2x.png" />
			<image v-else-if="tops == 3" class="icon" src="/static/_new_rank/List_3@2x.png" />
			<text v-else>{{tops}}</text>
		</view>
		<view class="user-icon" @click="iconClick">
			<image class="icon" 
			:src=" item.headImg ? `${baseUrl}fyProHandle/file/download/${item.headImg}?rbacToken=${rbacToken}` :'/static/missing-face.png'"
			/>
		</view>
		<view class="cell-tit clamp">
			<view class='title'>
				<view class="left-side">
					<text class="text">{{item.name}}</text>
<!-- 					<view v-if="districtType == 0 && orderType!=2" class="sub-text text">所属社区:{{item.districtName}}</view>
					<view v-if="districtType == 1 && orderType!=2" class="sub-text text">所属社区:{{item.districtName}}</view>
					<view v-if="districtType == 2 && orderType!=2" class="sub-text text">所属街道:{{item.districtName}}</view> -->
					<view class="sub-text text">{{item.districtName}}</view>
				</view>
				<view class="integral">
					<!-- <image class="icon" src="/static/img/List_number@2x.png"></image> -->
				<text class="text">{{item.integral}}</text>
				</view>
				<view class="like">
					<!-- <image class="icon" src="/static/img/List_number@2x.png"></image> -->
				<text class="text">{{item.likeNum}}</text>
				</view>
			</view>
		</view>
		<view class="cell-right clamp" @click="eventClick" >
			<!-- <view class='title' :class="item.likeStatus || item.likeStatus == 0  ? '' : 'position-num' ">
				{{item.likeNum}}
			</view> -->
			<image class="heart" v-if="item.likeStatus || item.likeStatus == 0   ? true : false" :src="item.likeStatus=='1' ? '/static/img/study_agree_R@2x.png' : '/static/img/study_agree@2x.png'"></image>
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
			districtType:{
				type: [Number,String],
				default: 0
			},
			orderType:{
				type: [Number,String],
				default: 0
			},
			item:{
				type: [Object],
				default: {}
			},
			tops:{
				type: [Number,String],
				default: 0
			}
		},
		methods: {
			eventClick() {
				this.$emit('eventClick');
			},
			iconClick(){
				this.$emit('iconClick');
			}
		},
	}
</script>

<style lang='scss'>
	.left-side{
		margin-top: 10upx;
		width:50%;
		float:left;
		display: flex;
		flex-flow: column  nowrap; 
		font-size:$new-font-26;
		.text{
			flex:1;
			line-height:initial;
			display: inline-block;
		}
		.sub-text{
			
			color:#9f9e9e;
		}
		.text{
			white-space: pre-wrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
	}
	.integral{
		font-size:$new-font-26;
		color:#8b2020;
		text-align: center;
		min-width:130upx;
		position: absolute;
		right:160upx;
		top:50%;
		transform: translateY(-50%);
		.icon{
			width: 40upx;
			    height: 48upx;
			    position: absolute;
			    top: 50%;
				left:0;
			    transform: translateY(-50%);
		}

		float:right;
		font-size:24upx;
	}
	.like{
		font-size:$new-font-26;
		color:#8b2020;
		text-align: center;
		min-width:100upx;
		position: absolute;
		right:60upx;
		top:50%;
		transform: translateY(-50%);

		float:right;
		font-size:24upx;
	}
	.position-num{
		line-height: 95upx !important;
	}
	.list-cell-rank {
		box-sizing: initial;
		height: 95upx;
		line-height: 95upx;
		display: flex;
		position: relative;
		padding: 10px;
		background: #fff;
		padding:10upx 20rpx ;
/* 		&.cell-hover {
			background: #fafafa;
		} */

		.left-icon {
		text-align: center;
			width: 80upx;
			position: relative;
			height: 100%;
			/* align-items: center; */
			color: #303133;

			.icon {
				
				width: 40upx;
				height: 53upx;
				top: 50%;
				position: absolute;
				left: 50%;
				transform: translate(-50%, -50%);
			}
		}

		.user-icon {
			width: 80upx;
			position: relative;
			height: 100%;
			/* align-items: center; */
			color: #303133;

			.icon {
				border-radius: 50%;
				width: 80upx;
				height: 80upx;
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-50%, -50%);
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
			flex: 1;
			font-size:$font-base;
			color: $font-color-dark;
			margin-right: 10upx;
			margin-left: 15upx;
			.cell-tip {
				float: right;
				font-size: $font-sm;
				color: $font-color-light;
			}

		}

		.cell-right {

			.title {
				line-height: 30upx;
				text-align: center;
			}

			.heart {
				margin-top: 20upx;
				width: 30upx;
				height: 30upx;
			}

		}

	}
</style>
