<template>
	<view class="content no-padding">
</uni-notice-bar>
		<view class="map-box">
			<!-- :include-points="markers" -->
			<map id="Gmap" :scale="scale" :longitude="loc_longitude" :latitude="loc_latitude"  :polyline="polyline" :markers="markers"></map>
		</view>			
		
		<uni-popup ref="popup" type="bottom">
			
			<view class="time-select-box default-item-box">
				<view>
					<image class="left-icon" src="/static/img/icon_warning@2x.png"></image>
					<view class="text">是否放弃任务?</view>
				</view>
				
				<view class="bottom-btn-box">
				
				<button
				class="bottom-float-button" 
				type="red" 
				@click="popMission('2')">取消</button>
				
				<button
				class="bottom-float-button" 
				type="red" 
				@click="popMission('1')">确定</button>	
				</view>
				
			</view>
			
		
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	import uniNoticeBar from "@/components/uni-notice-bar/uni-notice-bar.vue"
	export default {
		components: {
			uniPopup,
			uniNoticeBar
		},
		data() {
			return {
				baseUrl : getApp().globalData.baseUrl,
				rbacToken : getApp().globalData.rbacToken,
				noticeText:"",
				speed:0,
				hideAllTimer:false,
				wanchengState:false,
				distance:0,
				distance_race:0,
				acrossIndex:0,
				scale:"14",
				loc_latitude:"",
				loc_longitude:"",
				begin_address:"",
				end_address:"",
				eventState: 1,
				loc: {
					longitude: '',
					latitude: ''
				},
				btnStateText: '扫码领取巡防服',
				info:{},
				polyline: [],
				markers: [],
				clothList:[
					{
							"latitude": 28.012780,
							"longitude": 120.644940,
					}
				]
			};
		},
		onReady() {
			const _this = this;
			

			
			//没必要一进来就获取位置  轮询会获取
			// this.getLocation();
			
			try {
				this.Gmap = uni.createMapContext('Gmap');
			} catch (res) {

			}
			
			// console.log(uni.createMapContext('Gmap').$getAppMap());
			// console.log(uni.createMapContext('Gmap'));

		},
		onUnload(){
			this.hideAllTimer = true ; 
		},
		onLoad() {
			this.distance_race = this._distance_race;
			this.speed_race = this._speed_race;
			
			this.taskId = this.selListItem.id;
			
			this.instanceId = this.selListItem.instanceId;
			
			//让用户当前地点在地图上打点
			//确定用户的点 然后在地图上, 地图定位居中
			this.loc_longitude = 120.669800;
			this.loc_latitude = 28.016794;
			//获取巡防服点的位置  然后打到地图上去
			this.recommentClothPoint();
			//轮询用户位置打点
			this.timeLocation();
			//获取这个任务的详情
			// this.getCheckTaskById();
		},
		methods: {
			//弹出框方法
			popStateOpen(){
				this.$refs.popup.open();
			},
			//弹出框
			popMission(state){
				if(state == 1){
					this.MissonState(4);
				}else{
					this.$refs.popup.close();
				}
			},
			//申请异常
			shenqing(){
				this.$http.post('fyTaskManage/peaceTaskApp/applyFinishTask', {
					taskId: this.taskId,
					rbacToken: this.user.rbacToken,
				}).then(res => {
					if (res.data.success == 1) {
								uni.showToast({
									mask:true,
									icon: 'none',
									title: "您的申请已经提交!",
									sccuess: () => {
									},
									fail:(res)=>{
									},
									complete:()=>{
										setTimeout(()=> {
											_this.navTo('/pages/missonListXF/missonListXF');
										}, 1500);
									}
								});
								
					} else {
						uni.showToast({
							mask:true,
							icon: 'none',
							title: res.data.message
						});
					}
				})
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
			//上传状态
			//获取巡防服点位置
			filterCloth(){
				this.clothList.map((item,idx)=>{
						this.markers.push({
							width: 45,
							height: 45,
							anchor: {
								x: 0.5,
								y: 0.5
							},
							iconPath: '/static/img/icon_map_clothes@2x.png',
							longitude: item.longitude,
							latitude: item.latitude
						})
				})
			},
			//初始化数据 地图点位和线
			filterData() {
				//清空
				this.markers = [];
				this.polyline = [];
				
				let polylines = []
				let _this = this;
				this.info.points.map((item, idx) => {
					if (idx == 0) {
						this.begin_address = item.pointName;
						//如果是第一个图标
						this.markers.push({
							width: 28,
							height: 36.6,
							anchor: {
								x: .5,
								y: .5
							},
							iconPath: idx <this.acrossIndex ?  "/static/img/icon_map_Arrivals@2x.png" :  '/static/img/icon_map_start@2x.png',
							longitude: item.longitude,
							latitude: item.latitude
						})
					} else if (idx == this.info.points.length - 1) {
						//如果是最后一个图标
						this.end_address = item.pointName;
						this.markers.push({
							width: 28,
							height: 36.6,
							iconPath: idx == this.acrossIndex ?  "/static/img/icon_map_end_R@2x.png" : '/static/img/icon_map_end@2x.png',
							longitude: item.longitude,
							latitude: item.latitude
						})
					} else {
						this.markers.push({
							width: 10,
							height: 10,
							anchor: {
								x: 0.5,
								y: 0
							},
							iconPath:  idx <this.acrossIndex && this.acrossIndex!=0 ? '/static/img/map_red@2x.png' : '/static/img/map_green@2x.png',
							longitude: item.longitude,
							latitude: item.latitude
						})
					}
					polylines.push({
						longitude: item.longitude,
						latitude: item.latitude
					})
				})
				_this.polyline.push({
					width: 20,
					color: "#8cd89aff",
					points: polylines
				})
			},
			timeLocation() {

				const _this = this;
				console.log("正在获取用户点位置")
				setTimeout(() => {
					uni.getLocation({
						altitude:true ,
						geocode: true, //默认false，是否解析地址信息
						type: 'gcj02',
						success: function(res) {
							if(_this.acrossIndex == 0 ){
								_this.noticeText = `您当前距离下一个节点${_this.speed}米`;
							}else{
								_this.noticeText = `您已到达第${_this.acrossIndex+1}节点,当前距离下一个节点${_this.speed}米`;
							}
							
							// console.log(`坐标:${res.longitude},${res.latitude},速度${res.speed}米`);
							console.log(res);
							let hasLocPiont = false;
							_this.loc_longitude = res.longitude;
							_this.loc_latitude = res.latitude;
							_this.speed = res.speed;
							//如果超过了限定的行进速度,上报异常
							//异常类型1 正常到达关键点 2 偏移 3 过快 4逗留时间过长
							if(_this.speed>_this.speed_race){
								_this.reportCheckException(3)
							}
							
							if(_this.markers.length>0){
								
								_this.markers.map((item,idx)=>{
									if(item.markerId == "9228HDD"){
										hasLocPiont = true ;
										item.longitude = _this.loc_longitude ;
										item.latitude = _this.loc_latitude ;
									}

/* 									if(item.markerId == "9228HDD"){
										hasLocPiont = true ; 
										_this.Gmap.translateMarker({
											markerId:"9228HDD",
											destination:{
												// longitude: res.longitude  , 
												// latitude:res.latitude  
												longitude: 120.418621 ,
												latitude:30.235268  
											},
											fail:(res)=>{
												debugger
											}
										})
										return ;
									}
									 */
								})
								
								if(!hasLocPiont){
									
									_this.markers.push({
												markerId:"9228HDD",
												width: 30,
												height: 30,
												anchor: {
													x: 0.5,
													y: 0.5
												},
												iconPath: '/static/img/map_people@2x.png',
												longitude: res.longitude,
												latitude: res.latitude
											})
								}
							}else{
								debugger
								_this.markers.push({
											markerId:"9228HDD",
											width: 30,
											height: 30,
											anchor: {
												x: 0.5,
												y: 0.5
											},
											iconPath: '/static/img/map_people@2x.png',
											// iconPath: _this.user.headImg && _this.user.headImg !=''  ? 
											// `${_this.baseUrl}fyProHandle/file/download/${_this.user.headImg}?rbacToken=${_this.rbacToken}` :
											//  '/static/img/map_people@2x.png',
											// iconPath: "http://192.168.1.164:8090/ueditor/upload/image/20190829/1567069165948015305.jpg",
											longitude: res.longitude,
											latitude: res.latitude
										})
							}
							//是否再继续请求
							_this.hideAllTimer  ?  null  : _this.timeLocation();
							//是否到了可是开始任务
							_this.eventState == 3 ? 
							//测试用
							
							// _this.JudgeDistances({
							// 	longitude: _this.markers[_this.acrossIndex].longitude,
							// 	latitude:_this.markers[_this.acrossIndex].latitude
							// 	})
							// 	 : null;
							_this.JudgeDistances({longitude: res.longitude,latitude:res.latitude}) : null;
						},
						fail: function(res) {

							// _this.loc_longitude = 120.669800;
							// _this.loc_latitude = 28.016794;
							// _this.user.address = "用户当前位置"
						},
						complete: function(res) {	
							
						} 
					});
				}, 3000);
			},
			//领取巡防服
			lingqu(state) {
				const _this = this;
				debugger
				uni.scanCode({
						onlyFromCamera: true,
						success: function(res) {
							console.log('条码类型：' + res.scanType);
							console.log('条码内容：' + res.result);
							// const result = JSON.parse(res.result);
							const result =res.result;
							debugger
							if(result){
								_this.info.clothId = result;
								_this.doCheckCloth(state);
							}

						}
				})
			},
			
			//领取巡防服方法
			doCheckCloth(state) {
				this.loadingState();
				// this.eventState = 2;
				this.$http.post('fyTaskManage/peaceTaskApp/doCheckCloth', {
					userLong: this.loc_longitude,
					userLat : this.loc_latitude,
					instanceId: this.taskId,
					clothId: this.info.clothId,
					state:state,
					rbacToken: this.user.rbacToken,
				}).then(res => {
					uni.hideLoading();
					if (res.data.success == 1) {
						state == 1 ?  this.eventState = 2  : null ;
						uni.showToast({
							mask:true,
							icon: 'none',
							title: state == 2 ? "成功归还巡防服,可以完成任务啦"  : "领取巡防服成功,请达到指定地点"
						});

					} else {
						uni.showToast({
							mask:true,
							icon: 'none',
							title: res.data.message
						});
					}
				})
			},
			//放弃任务
			//开始任务
			MissonState(state) {
				
				let text = "";
				const _this = this; 
				this.loadingState();
				this.$http.post('fyTaskManage/peaceTaskApp/doCheckTask', {
					instanceId: this.taskId,
					state: state,
					rbacToken: this.user.rbacToken,
				}).then(res => {
					uni.hideLoading();
					if (res.data.success == 1) {
						switch (state) {
							case 2:
								text = "开始任务";
								this.eventState = 3;
								uni.showToast({
									mask:true,
									icon: 'none',
									title: "任务开始成功,请您在规定时间内完成任务",
									sccuess: () => {
										
									},

								});
								//开始切换显示路线图
								this.filterData();
								break;
							case 3:
								text = "完成任务";
								uni.showToast({
									mask:true,
									icon: 'none',
									title: text,
									sccuess: () => {

									},
									fail:(res)=>{
										
									},
									complete:()=>{
										setTimeout(()=> {
											_this.switchTabTo('/pages/myMisson/myMisson');
										}, 1500);
									}
								});
								break;
							case 4:
								text = "放弃任务"
								this.$refs.popup.close();
								uni.showToast({
									mask:true,
									icon: 'none',
									title: "您已成功放弃任务!",
									complete:()=>{
											setTimeout(()=> {
												this.switchTabTo('/pages/myMisson/myMisson');
											}, 1500);
									}
								});
								break;
						}

					} else {
						uni.showToast({
							icon: 'none',
							title: res.data.message
						});
					}
				})
			},
			//获取巡防服点位置
			recommentClothPoint(state) {
				let text = "";
				this.$http.get('fyTaskManage/peaceTaskApp/recommentClothPoint', {
					longitude: this.loc_longitude,
					latitude:this.loc_latitude,
					rbacToken: this.user.rbacToken,
				}).then(res => {
					if (res.data.success == 1) {
						this.clothList = res.data.data.list;
						
						this.filterCloth();
						
						console.log(this.clothList)
					} else {
						uni.showToast({
							mask:true,
							icon: 'none',
							title: res.data.message
						});
					}
				})
			}
			
		}
	};
</script>

<style lang="scss">
	.time-select-box{
		position:relative;
		.left-icon{
			width:80upx;
			height:80upx;
			float:left;
		}
		.text{
			line-height: 80upx;
			font-size:30upx;
			margin-left:20upx;
			float:left;
		}
		.bottom-btn-box{
			position: absolute;
			bottom:20upx;
			width: 100%;
			display:flex;
			.bottom-float-button{
				flex:1;
				&:nth-child(1){
					margin-right:10upx;
				}
			}
		}
		height:20vh;


	}
	.title-bar{
		margin-bottom:0;
		width:100%;
		max-height:60upx;
		min-height:60upx;
		flex:1;
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
			font-size: 26upx;
			line-height:32upx;
			white-space:pre-wrap;
			.cell-tip {
				float: right;
				font-size: 26upx;
				color: $font-color-light;
			}
			.title {}

			.title-1 {
				font-size: 32upx;
			}

			.title-2 {
				margin-top: 26upx;
				color: #909399;
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
			border-top:1px solid #eee;
			max-height:100upx;
			min-height:100upx;
			padding-top: 20upx;
			flex: 1;
			display: flex;

			.left-btn {
				margin-right: 30upx;
				max-width: 30%;
				flex: 1;
			}

			.right-btn {
				flex: 1;
			}
		}
	}
</style>
