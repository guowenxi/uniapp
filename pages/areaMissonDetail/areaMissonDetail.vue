<template>
	<view class="content no-padding">
<!-- 		<scroll-view class="history-section icon" scroll-y >

		</scroll-view> -->


			<view class=" new-content-item title">
				<image class="icon" src="/static/_new/task_title@2x.png"></image>
				<view class="text">{{info.taskName}}</view>
				<view class="guanzhu" v-if="likeState">
					<image class="guanzhu-icon" src="/static/_new/patrol_collect@2x.png"></image>
					<view class="guanzhu-text">已关注</view>
				</view>
			</view>
				

			<view class="new-content-item ">
				<view class="new-content-item-title">隐患说明</view> 
				<view class="new-content-item-content color-666">{{info.taskDesc1}}</view>
			</view>
			<view class="new-content-item">
				<view class="new-content-item-title">常见部位</view> 
				<view class="new-content-item-content color-666">{{info.taskDesc2}}</view>
				</view>

			<view class="new-content-item">
				<view class="new-content-item-title">平安币</view> 
				<view class="new-content-item-content color-666">{{info.integratingRangeLeft}}~{{info.integratingRangeRight}}</view>
				</view>
			<view class="new-content-item">
				<view class="new-content-item-title">参与人次</view> 
				<view class="new-content-item-content color-666">{{info.joinPeople}}</view>
				</view>
				
			<view class="new-content-item" v-if="taskType == 2">
				<view class="new-content-item-title">参与人次</view> 
				<view class="new-content-item-content color-666 " style="margin-bottom: 20rpx;">{{info.areaName.split("浙江省温州市")[1]}}</view>
				<map id="Gmap"
				:latitude="info.latitude"
				:longitude="info.longitude" 
				:circles="circles"
				></map>
				</view>
				<view style="width: 100%;height: 200rpx;"></view>
<!-- 			<view  class="item-title">任务区域</view>
			<view v-if="taskType == 2" class="map-box">
				<map id="Gmap"
				:latitude="info.latitude"
				:longitude="info.longitude" 
				:circles="circles"
			
				></map>
			</view> -->
<!-- 			<view class="loca-box margin-top-75">
				<image class="loc-icon" src="/static/img/icon_position@2x.png"></image>
				<view class="text">
					<text>街道名称:</text>
					<text>{{info.areaName == "" ? info.streetName : info.areaName}}</text>
				</view>

			</view> -->
<!-- 			<view class="loca-box">
				<image class="loc-icon" src="/static/img/icon_time@2x.png"></image>
				<text>发布时间:</text>
				<text>{{info.taskStart}}</text>
			</view> -->
			

				
<!-- 			<view class="loca-box margin-bottom-160">
				<image class="loc-icon" src="/static/img/icon_integral@2x.png"></image>
				<text>平安币:</text>
				<text>{{info.integratingRangeLeft}}~{{info.integratingRangeRight}}</text>
			</view> -->
		

			<view class="bottom-btn-box">
				<button class="bottom-float-button left-btn" type="red-border" @click="checkLike">
					{{likeState ? '取消关注' : '关注'}}
				</button>
				<!-- v-if="info.taskType1 == 2 ? false : true" -->
				<button 
				class="bottom-float-button right-btn new-bg-red" 
				type="red"
				 @click="bolNavTo('/pages/troubleReport/troubleReport?navbackIndex=2')">隐患上报</button>
				<!-- openPop -->
				<!-- getCheckTask  -->
			</view>
		
		
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
			likeState:false,
			taskType:1,
			circles:[],
			info: {
					title: "娄桥街道安全生产任务",
					createTime: "发布时间：5月8日  12:35",
					peo: "参与人次：235",
					content: "说明：为切实做好省安委会安全生产巡查工作的迎查准备，贯彻落实全区安全生产大会精神，部署安排街道2019年度安全生产工作，街道服务中心于5月开展为期3个月的安全生产检查活动。届时，欢迎广大人民群众积极举报相关问题。工作人员核实后，会视线索奖励响相应积分。",
					
				}
			}
		},
		onReady() {
			this.info = this.selListItem;
			this.likeState  = this.info.isAttention  == 1 ? true : false;
			this.taskType = this.info.taskType;
			this.setCircles();
		},
		onLoad(){
			
		},
		methods: {
			//关注 不关注
			checkLike() {
				this.loadingState();
				//fyVolunteer/fySafeUserTask/insert
				this.$http.get('fyVolunteer/fySafeUserTask/insert', {
						taskId: this.info.taskId,
						rbacToken: this.user.rbacToken,
						type:3,
					})
					.then(res => {
						uni.hideLoading()
						if (res.data.success == 1) {
							let text = "";
							if (res.data.data == 1) {
								text = "关注成功!"
								this.likeState = true;
							} else {
								this.likeState = false;
								text = "已取消关注!"
							}
							uni.showToast({
								icon: 'none',
								title: text
							});
			
						} else {
							uni.showToast({
								icon: 'none',
								title: res.data.message
							});
						}
			
					})
			},
			
			setCircles(){
				this.circles.push({
					latitude:this.info.latitude,
					longitude:this.info.longitude,
					color:"#00a6ff",
					fillColor:"#00a6ff7F",
					radius:100,
					strokeWidth:3,
				})
			},
		}
	}
</script>

<style lang="scss">
	#Gmap{
		width: 100%;
		height:300rpx;
	}
	.history-section{
		flex:1;
		height:0;
	}
	.title-item-box{
		font-size:$font-lg;
	}
	.content-color-box{
		font-size:$font-base;
	}
	.bottom-btn-box {
		position: fixed;
		bottom:0upx;
		left:0;
		background: #f6f6f6;
		// border-top: 1px solid #eee;
		max-height: 160upx;
		min-height: 160upx;
		width:100%;
	
		// padding-top: 20upx;
		flex: 1;
		
		display: flex;
	    margin: 0 auto;
		
		.left-btn {
			margin-left:40upx;
			margin-top:40upx;
			margin-right: 30upx;
	
			flex: 1;
		}
	
		.right-btn {
			margin-right: 40upx;
			margin-top:40upx;
			max-width: 50%;
			min-width: 50%;
			flex: 1;
		}
	}
	
	
	.content{
		padding:40upx;
	}
	.title{
		font-size:$new-font-30;
		.icon{
			margin-top: 5rpx;
			margin-right:15rpx;
			width: 29rpx;
			height: 34rpx;
			float:left;
		}
		.text{
			width:72%;
			line-height:$line-height-40;
			float:left;
		}
	}
	.sub-title{
		color:#a4a4a4;
		width:100%;
		float:left;
		height:50upx;
		margin-top:40upx;
		margin-bottom:60upx;
		font-size:26upx;
		.text{
			float:left;
		}
		.text:last-child{
			float:right;
		}
	}
	.info-content{
		word-break: break-all;
		margin-top:20upx;
		line-height:50upx;
		width:100%;
	}
	.item-title{
		margin-top:77upx;
		margin-bottom:15upx;
		width:100%;
		font-size: 28upx;
	}
	
	.map-box{
		
		width:100%;
		border: 1px solid #ccc;
		height:300upx;
		margin:0 auto;
			#Gmap{
			width: 100%;
			height:100%;
		}
	}
	.margin-top-75{
		margin-top:75upx;
	}
	.loca-box{
		line-height:50upx;
		font-size: 28upx;
		margin-bottom:35upx;
		.loc-icon {
			float:left;
			position: relative;
			top: 10%;
			// transform: translateY(-50%);
			width: 31upx;
			height: 35upx;
			margin-right: 12upx;
			margin-top: 5upx;
		}
		.text{
			font-size:$font-base;
			float:left;
			min-width:70%;
		}
	}

</style>
