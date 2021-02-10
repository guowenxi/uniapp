<template>
	<view class="content no-padding">
		<view class="map-box">
			<map id="Gmap" :latitude="latitude" :longitude="longitude" :markers="covers"></map>
		</view>
		<view class="bottom-box">
			<scroll-view class="detail-box" scroll-y>
				<view class="list-cell-icon b-b">
					<view class="left-icon">
						<image class="icon" src="/static/img/icon_integral@2x.png" />
						<view class="num">{{info.iconNum}}</view>
					</view>
					<view class="cell-tit clamp">
						<view class='title title-1'>
							{{info.title}}
						</view>
						<view class='title title-2'>巡查时间：{{"5月8日 14:00~17:00"}} 共{{358.4}}米</view>
						<view class='title title-2'>任务区域：{{info.title}}</view>
						<view class='title title-2'>起点：{{info.title}}</view>
						<view class='title title-2'>终点：{{info.title}}</view>
						<view class='title title-2 font-red'>参加状态：{{peopleList.length}}/{{peopleList.length}}</view>
						<view class="people-list">
							<view class="people-item" v-for="(item,index) in peopleList">
								<view class="icon" >{{item.name[0]}}</view>
								<view class="text">{{item.name}}</view>
							</view>
						</view>
					</view>

					<!-- 			<text class="cell-more yticon"
							:class="typeList[navigateType]"
						></text> -->
				</view>
			</scroll-view>
			<view class="bottom-btn-box">
				<button class="bottom-float-button right-btn" type="red" @click="navTo('/pages/success_lingqu/success_lingqu')">开始任务</button>
			</view>

		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				peopleList: [
					{name:"cclij",state:1},
					{name:"zxczxc",state:1},
					{name:"zxczxc",state:1},
					{name:"zxczxc",state:1},
					{name:"vfs",state:0},
					{name:"dasdee",state:0},
					
				],
				info: {
					iconNum: "1254",
					title: "娄桥街道安全生产任务",
					createTime: "发布时间：5月8日  12:35",
					peo: "参与人次：235",
					content: "说明：为切实做好省安委会安全生产巡查工作的迎查准备，贯彻落实全区安全生产大会精神，部署安排街道2019年度安全生产工作，街道服务中心于5月开展为期3个月的安全生产检查活动。届时，欢迎广大人民群众积极举报相关问题。工作人员核实后，会视线索奖励响相应积分。",
				}
			}
		},
		methods: {}
	}
</script>

<style lang="scss">
	.list-cell-icon {
		box-sizing: initial;
		display: flex;
		position: relative;

		&.cell-hover {
			background: #fafafa;
		}

		.left-icon {
			width: 80upx;
			height: 100upx;
			position: relative;
			/* align-items: center; */
			color: #303133;

			.icon {
				width: 31upx;
				height: 25upx;
				position: absolute;
				left: 50%;
				top: 25%;
				transform: translateX(-50%);
			}

			.num {
				color: #ffdb14;
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
			
			.cell-tip {
				float: right;
				font-size: 16upx;
				color: $font-color-light;
			}

			line-height: 30upx;

			.title {}

			.title-1 {
				font-size: 32upx;
			}

			.title-2 {
				margin-top: 26upx;
				color: #909399;
				font-size: 22upx;
			}

			flex: 1;
			font-size: $font-base;
			color: $font-color-dark;
			margin-right: 10upx;
			margin-left: 15upx;
		}


	}


	.content {
		display: flex;
		flex-flow: column nowrap;
	}

	.map-box {

		flex: 1;
		width: 100%;
		border: 1px solid #ccc;
		margin: 0 auto;

		#Gmap {
			width: 100%;
			height: 100%;
		}
	}

	.bottom-box {
		overflow: hidden;
		flex: 1;
		display: flex;
		flex-flow: column nowrap;
		padding: 30upx;
		max-height: 500upx;

		.detail-box {
			flex: 1;
			height: 75%;
		}

		.bottom-btn-box {
			max-height:80upx;
			min-height:80upx;
			margin-top: 20upx;
			flex: 1;
			display: flex;

			.left-btn {
				margin-right: 30upx;
				max-width: 20%;
				flex: 1;
			}

			.right-btn {
				flex: 1;
			}
		}

		.people-list {
			float:left;
			width: 100%;

			.people-item {
				margin:20upx 0 ;
				margin-right:20upx;
				float:left;
				height: 50upx;
				line-height: 50upx;

				.icon {
					margin-right:10upx;
					color: #fff;
					text-align: center;
					border-radius: 50%;
					width: 50upx;
					height: 50upx;
					background-color: #e32417;
					float: left;
				}
				.text{
					float:left;
				}
				
			}
		}
	}
</style>
