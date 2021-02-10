<template>
	<view class="content no-padding">
		<view class="map-box">
<!-- 						:longitude="polyline[0].longitude"
			:latitude="polyline[0].latitude" -->
			<map id="Gmap"
			class="Gmap"
			:longitude="loc_longitude"
			:latitude="loc_latitude"
			 :include-points="markers" 
			  :polyline="polyline"
			   :markers="markers"
			   ></map>
		</view>
		<view class="bottom-box">
			<scroll-view class="detail-box" scroll-y>
				<view class="list-cell-icon">
<!-- 					<view class="left-icon">
						<image class="icon" src="/static/img/icon_integral@2x.png" />
						<view class="num">{{info.peaceCoin}}</view>
					</view> -->
					<view class="cell-tit clamp">
						<view class='title title-1'>
							<text class="title-text overflow-text">{{info.taskName}}</text>
							<!-- <text class="cell-tip">{{info.hasPeople}}/{{info.maxPeople}}已领</text> -->

						</view>
						<!-- <view class='title title-2'>巡防服领取：{{info.placeName}}</view> -->
						<view class='title title-2'>任务时间：
						<text>{{info.taskStart.split(" ")[0].split("-")[1]}}月{{info.taskStart.split(" ")[0].split("-")[2]}}日</text>
						<text style="padding:0 5px;" class="font-gray" v-if="info.taskStart.split(' ')">
						{{info.taskStart.split(" ")[1].split(":").splice(0,2).join(":")}} - {{info.taskEnd.split(" ")[1].split(":").splice(0,2).join(":")}} 
						</text>
						</text>

						</view>
						<view class='title title-2'>志愿服务点位置：<text class="font-gray">{{info.address}}</text></view>
						<view class='title title-2'>平安币：<text class="font-gray">{{`每小时${info.peaceCoin}个平安币`}}</text></view>
						<view v-for="(item,index) in info.taskAdminList" style="margin-top:10px">
							<text>{{`${index == 0 ? '队长' : '管理员'}`}}:  {{item.name}} {{item.phone}}</text>
						</view>
					</view>
					

					  
					
					<!-- 			<text class="cell-more yticon"
							:class="typeList[navigateType]"
						></text> -->
				</view>

			</scroll-view>



			<view class="bottom-btn-box">


				<button 
				v-if="info.finishState == 1"
				class="bottom-float-button  left-btn" 
				type="red-border"
				@click="openPop2">放弃任务</button>
				
				<button 
				v-if="info.finishState == 1"
				class="bottom-float-button right-btn new-bg-red" 
		
				type="red" 
				@click="doCheckTask(2)">开始任务</button>
				

				<!-- 
				 v-if="info.finishState == 2"
				 -->
				<button 
				v-if="info.finishState == 2"
				class="bottom-float-button new-bg-red" 
				type="red" 
				@click="handleOk">完成任务</button>

			</view>

		</view>
		<uni-popup ref="popup2"  type="bottom">
			
			<view class="time-select-box default-item-box" style="height:auto;width:100%;">
				<view>
					<!-- <image class="left-icon" src="/static/img/icon_warning@2x.png"></image> -->
					<view class="title font-red">提示</view>
					<view class="text">确定放弃任务?</view>
				</view>
				
				<view class="bottom-btn-box" style="margin-top:30px;">
				
				<button
				class="bottom-float-button" 
				type="red" 
				@click="popClose2">取消</button>
				
				<button
				class="bottom-float-button " 
				type="red" 
				@click="fangqi">确定</button>	
				</view>
				
			</view>
			
		
		</uni-popup>


		<uni-popup ref="popup"  type="bottom">
			
			<view class="time-select-box default-item-box" style="height:auto;width:100%;">
				<view>
					<!-- <image class="left-icon" src="/static/img/icon_warning@2x.png"></image> -->
					<view class="title font-red">提示</view>
					<view class="text">确定完成任务?</view>
				</view>
				
				<view class="bottom-btn-box" style="margin-top:30px;">
				
				<button
				class="bottom-float-button " 
				type="red" 
				@click="popClose">取消</button>
				
				<button
				class="bottom-float-button" 
				type="red" 
				@click="doCheckTask(3)">确定</button>	
				</view>
				
			</view>
			
		
		</uni-popup>
	</view>

</template>

<script>
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	import uniTag from "@/components/uni-tag/uni-tag.vue"
	export default {
		components: {
			uniTag,
			uniPopup
		},
		data() {
			return {
				loc_longitude:"",
				loc_latitude:"",
				taskScheduleList: [
				],
				likeState: false,
				begin_address: "",
				end_address: "",
				info: {
					taskScheduleList:[

					]
				},
				polyline: [

				],
				markers: []
			}
		},
		onReady() {
			const _this = this;
			this.Gmap = uni.createMapContext('Gmap', this)
			//获取这个任务的详情
			this.taskId = this.selListItem.id;
			this.getCheckTaskList();
			this.getLocation();
		},
		onShow() {
			this.hideAllPop();
		},
		
		onLoad(options) {
			this.stopLoad = false;
			this.likeState = options.likeState ? options.likeState : false;
			// 监听事件
			uni.$on('roadLockMissonDetailBegin',(info)=>{
				switch(info.type){
					case "abandon" :
					this.fangqi();
					break;
					case "complete" :
					this.getUnreadMessageList();
					// this.doCheckTask(3);
					break;
				}
				console.log("接收啦")
			})
		},
		onUnload(){
			debugger
			//移除所有监听
			uni.$off();
			this.stopLoad = true;
		},
		methods: {
			hideAllPop(){
				uni.getSubNVueById('popupBegin').hide('auto',0);
				 uni.getSubNVueById('innerBoxBegin').hide('auto',0);
				 uni.getSubNVueById('abandonBoxBegin').hide('auto',0);
				uni.getSubNVueById('completeBoxBegin').hide('auto',0);
			},
			//获取未读消息
			timer(){
				setTimeout(()=>{
					this.getUnreadMessageList();
					if(this.stopLoad){
						this.timer();
					}
				},3000)
				
			},
			// /fyVolunteer/fyKeyConfig/getFyKeyConfig
			getUnreadMessageList(){
				
				this.$http
					.get('fyTaskManage/peaceTaskApp/getUnreadMessage', {
						rbacToken: this.user.rbacToken,
						taskId:this.info.id,
						checkStart:this.info.taskSchedule.checkStart,
						checkEnd:this.info.taskSchedule.checkEnd,
						checkDate:this.info.taskSchedule.checkDate,
					})
					.then(res => {
						if (res.data.success == 1) {
							this.popBox = res.data.data;
							if(this.popBox){
								uni.getSubNVueById('popupBegin').show('auto',200);
								uni.getSubNVueById('innerBoxBegin').show('auto',200,()=>{
									uni.$emit('innerBoxBegin', {
										title:this.popBox.title,
										time:this.popBox.message,
									});
								});
							}else{
								//如果没有id 就可以正常完成任务
								this.doCheckTask(3);
							}

						}
					});
			},
			
			popClose(){
				this.$refs.popup.close();
			},
			popClose2(){
				this.$refs.popup2.close();
			},
			//是否完成任务
			handleOk(){
				//采用新方法
				uni.getSubNVueById('popupBegin').show('auto',200);
				uni.getSubNVueById('completeBoxBegin').show('auto',200);
				
				// this.$refs.popup.open();
			},
			//获取地址
			getLocation(){
				let _this = this;
				uni.getLocation({
					// type: 'wgs84',
					geocode: true, //默认false，是否解析地址信息
					type: 'gcj02',
					success: function (res) {
						
						_this.address = res.address;
						_this.loc_longitude = res.longitude;
						_this.loc_latitude = res.latitude;
					}
				});
			},
			
			filterSelctDays(list){

				let _list = [];
				this.info.canSelctDays && this.info.canSelctDays !='' ? _list=this.info.canSelctDays.split(",") : null;
				return _list;
			},
			//选择时间段
			changeTag(item, index) {
				this.taskScheduleList=item

				// const _index = this.taskScheduleList.indexOf(item);
				// if (_index >= 0) {
				// 	this.taskScheduleList.splice(_index, 1)
				// } else {
				// 	this.taskScheduleList.push(item)
				// }
			},
			//关注 不关注
			checkLike() {
				this.loadingState();
				//fyVolunteer/fySafeUserTask/insert
				this.$http.get('fyVolunteer/fySafeUserTask/insert', {
						taskId: this.taskId,
						rbacToken: this.user.rbacToken,
						type:1,
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
			//初始化数据 地图点位和线
			filterData() {
				let polylines = []
				let _this = this;
				
				this.markers.push({
							width: 28,
							height: 36.6,
					// iconPath: '/static/img/icon_map_start@2x.png',
					iconPath: '/static/img/kadian.png',
					longitude: this.info.longitude,
					latitude: this.info.latitude
				});
				
/* 				this.info.points.map((item, idx) => {
					if (idx == 0) {
						this.begin_address = item.pointName;
						//如果是第一个图标
						this.markers.push({
							width: 28,
							height: 36.6,
							// iconPath: '/static/img/icon_map_start@2x.png',
							iconPath: '/static/img/kadian.png',
							longitude: item.longitude,
							latitude: item.latitude
						});
						this.loc_longitude = item.longitude;
						this.loc_latitude = item.latitude;
					} else if (idx == this.info.points.length - 1) {
						//如果是最后一个图标
						this.end_address = item.pointName;
						this.markers.push({
							width: 28,
							height: 36.6,
							iconPath: '/static/img/icon_map_end@2x.png',
							longitude: item.longitude,
							latitude: item.latitude
						})
					} else {


							// // #ifdef APP-PLUS
							// this.Gmap = uni.createMapContext('Gmap',this);
							// const map =  this.Gmap.$getAppMap();
							// var marker=new plus.maps.Marker(new plus.maps.Point(item.longitude,item.latitude));
							// 	marker.setIcon('/static/img/map_green@2x.png');
							// 	marker.setLabel("haha");
							// 	// var bubble = new plus.maps.Bubble("打造最好的HTML5移动开发工具");
							// 	// marker.setBubble(bubble);
							// 	map.addOverlay(marker);
							// debugger
							// // #endif
				
						this.markers.push({
							width: 10,
							height: 10,
							anchor: {
								x: 0.5,
								y: 1
							},
							
							iconPath: '/static/img/map_green@2x.png',
							longitude: item.longitude,
							latitude: item.latitude,
							// callout:{
							// 	content:`第${idx}点`,
							// 	display:'ALWAYS',
							// 	fontSize:16
							// }
							// label:{
							// 	x:item.longitude+1,
							// 	y:item.latitude+1,
							// 	borderWidth:2,
							// 	borderColor:"#8cd89aff",
							// 	borderRadius:50,
							// 	content:"1",
							// 	color:"#8cd89aff",
							// 	fontSize:12,
							// 	bgColor:"#ffffff",
								
							// }
						})
					
					}
					
					
					if(this.info.ploylineList ==null || this.info.ploylineList == 0){
						polylines.push({
							longitude: item.longitude,
							latitude: item.latitude
						})
					}
					
				})
 */
				// if(this.info.ploylineList !=null && this.info.ploylineList.length>0){
				// 	this.info.ploylineList.map((item01,idx)=>{
				// 		item01.map((item02,idx)=>{
				// 			item02.points.map((item,idx)=>{
				// 				polylines.push(new plus.maps.Point(item.longitude,item.latitude));
				// 			})
				// 		})
				// 	})
				// }
				
				// _this.polyline.push({
				// 	width: 20,
				// 	color: "#8cd89aff",
				// 	points: polylines,
				// 	arrowLine:true
				// })
				

				
				
/* 				_this.markers.push({
					width: 30,
					height: 30,
					anchor: {
						x: 0.5,
						y: 0.5
					},
					iconPath: '/static/img/map_people@2x.png',
					longitude: _this.loc_longitude,
					latitude: _this.loc_latitude
				});
 */

			},

			//获取详情
			getCheckTaskList() {
				this.$http.get('fyTaskManage/peaceTaskApp/getMyTaskById', {
						taskId: this.taskId,
						rbacToken: this.user.rbacToken,
					})
					.then(res => {
						if (res.data.success == 1) {
							//可选择时间
							this.info = res.data.data;
							this.likeState  = this.info.isAttention  == 1 ? true : false;
							// this.info.taskScheduleList= [
							// 	{checkStart:"00:00",checkEnd:"22:00",id:1,isReceive:0,},
							// 	{checkStart:"33:00",checkEnd:"32:00",id:2,isReceive:1,},
							// ]
							// console.log(this.canSelctDays)
							// console.log(this.info)
							this.filterData();
							// this.timer();
						} else {
							uni.showToast({
								icon: 'none',
								title: res.data.message
							});
						}

					})
			},
			
			//放弃任务
			fangqi(){
				this.$http.post('fyTaskManage/peaceTaskApp/doCheckTask', {
					instanceId: this.info.instanceId,
					id:this.info.id,
					state: 4,
					rbacToken: this.user.rbacToken,
					taskType:2,
				}).then(res => {
					if (res.data.success == 1) {
						uni.$off();
						this.$refs.popup2.close();
						uni.showToast({
							mask:true,
							icon: 'none',
							duration:3000,
							title: "您的任务已放弃,正在为您返回任务列表..."
						});
						setTimeout(()=>{
							this.navigateBack(1);
						},3000)
					}
				})
			},


			//领取任务 完成任务
			doCheckTask(state) {
				this.bolNavTo();
				this.loadingState();
				this.$http.post('fyTaskManage/peaceTaskApp/doCheckTask', {
					rbacToken: this.user.rbacToken,
					instanceId:this.info.instanceId,
					id:this.info.id,
					state:state,
					longitude:this.loc_longitude,
					latitude:this.loc_latitude,	
					// longitude:this.info.longitude,
					// latitude:this.info.latitude,					
					taskType:2,
				}).then(res => {
					
					uni.hideLoading();
					if (res.data.success == 1) {
						
						if(state == 2){
							uni.showToast({
								mask:true,
								icon: 'none',
								duration:3000,
								title: "任务已开始,记得完成任务哦~"
							});
							this.info.finishState=2;
						}else{
							uni.$off();
							setTimeout(()=>{
								this.redirectToAndSaveItem(res.data.data,
								`/pages/roadLock_success/roadLock_success`
								)
							},200)
						}
					} else {
						uni.showToast({
							mask:true,
							icon: 'none',
							title: res.data.message
						});
					}
				})
			},
			//领取任务时打开弹窗选择时间段
			openPop2(){
				
				//采用新方法
				uni.getSubNVueById('popupBegin').show('auto',200);
				uni.getSubNVueById('abandonBoxBegin').show('auto',200);
				
				// this.$refs.popup2.open();
			},
			//领取任务时打开弹窗选择时间段
			openPop(){
				if(this.info.taskScheduleList !=''){
					this.$refs.popup.open();
				}else{
					this.getCheckTask();
				}
				
			}
		},


	}
</script>

<style lang="scss">

	
	.title-text{
		line-height:60upx;
		display: inline-block;
		width:65%;
	}
	.time-select-box{
		width:100%;
		.main-box{
			float:left;
			margin-bottom:20upx;
			.tag-item {
				font-size: 26upx;
				float: left;
				margin: 10upx 10upx;
				padding: 0 30upx;
			}
		}
		.bottom-float-button{
			float: inherit;
			width:80%;
			margin:0 auto;
			margin-bottom:20upx;
		}
		
	}
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
				width: 50upx;
				height: 46upx;
				position: absolute;
				left: 50%;
				top: 6%;
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
				font-size: $font-sm;
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
			font-size: $font-sm;
			line-height: 32upx;
			white-space: pre-wrap;

			.cell-tip {
				line-height:60upx;
				float: right;
				font-size: $font-sm;
				color: $font-color-light;
			}

			.title {}

			.title-1 {
				font-size: $font-title;
			}

			.title-2 {
				line-height: $line-height-40;
				margin-top: $font-sm;
				color: #333;

			}

			flex: 1;
			color: $font-color-dark;
			margin-right: 10upx;
			margin-left: 15upx;
			margin-bottom: 15upx;
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
		position: relative;
		#Gmap {
			width: 100%;
			height: 100%;
		}
		.Gmap {
			position: absolute;
			left:0;
			top:0;
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
			border-top: 1px solid #eee;
			max-height: 100upx;
			min-height: 100upx;
			padding-top: 20upx;
			flex: 1;
			display: flex;
		.bottom-float-button{
			float: inherit;
			width:80%;
			margin:0 auto;
			margin-bottom:20upx;
		}

			.left-btn {
				margin-right: 30upx;

				flex: 1;
			}

			.right-btn {

				max-width: 60%;
				min-width: 60%;
				flex: 1;
			}
		}

	}


</style>
