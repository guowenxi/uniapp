<template>
	<view class="list-cell-item b-b"  @click="eventClick()" hover-class="cell-hover" :hover-stay-time="50">
		<view class="title-side ">
			<view class="title-text"><text class="red-text ">#{{item.subName}}#</text>{{item.descr}}</view>
			<view class="icon">{{item.gradeName}}</view>

		</view>
		<view class="cell-imgs clamp">
			<image mode="aspectFill" v-for="(item,index) in item.file1.split(',')" class="img-item" :src="baseUrl+'/fyProHandle/file/download/'+item"></image>
		</view>
		<view class="bottom-side ">
			<view class="title-text clamp">
				<image class="loc-icon" src="/static/img/icon_position@2x.png"></image>{{item.address}}
			</view>
			<view class="right-text" :class="item.state==1 ? 'font-orange' : 'font-green'">{{item.state==1 ? '待审核' : '已审核'}}</view>
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

			item: {
				type: [Object],
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
	.list-cell-item {
		box-sizing: initial;
		padding: 28upx 0;
		display: flex;
		position: relative;
		flex-flow: column nowrap;

		&.cell-hover {
			background: #fafafa;
		}

		.title-side {
			position: relative;
			font-size: 28upx;
			display: flex;
			flex-flow: row nowrap;
			flex: 1;
			width: 100%;

			.title-text {
				max-width: 85%;
				min-width: 85%;
				flex: 1;
				height: 80upx;
				overflow: hidden;
			}

			.icon {
				position: absolute;
				right: 0;
				background: #e32417;
				padding: 5upx;
				border-radius: 10upx;
				color: #fff;
				font-size: 18upx;
				flex: 1;
			}
		}

		.bottom-side {
			position: relative;
			font-size: 28upx;
			display: flex;
			flex-flow: row nowrap;
			flex: 1;
			width: 100%;

			.loc-icon {
				width: 21upx;
				height: 25upx;
				margin-right: 12upx;
			}

			.title-text {
				max-width: 85%;
				min-width: 85%;
				flex: 1;
				overflow: hidden;
			}

			.right-text {
				position: absolute;
				right: 0;
				font-size: 20upx;
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
