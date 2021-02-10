<template>
	<view class="content no-padding">
		<view class="map-box">
			<!-- :include-points="markers" -->
			<map v-if="!animateState ? true : false" id="Gmap" :scale="scale" :longitude="loc_longitude" :latitude="loc_latitude"  :polyline="polyline" :markers="markers"></map>
		</view>
		<view class="bottom-box">
			<scroll-view class="detail-box" scroll-y>
				<view class="list-cell-icon" >
					<view class="left-icon">
						<image class="icon" src="/static/img/icon_integral@2x.png" />
						<view class="num">{{ info.peaceCoin }}</view>
					</view>
					<view class="cell-tit clamp">
						<view class="title title-1">
							{{ info.taskName }}
							<text class="cell-tip">参与上限:{{info.maxPeople}}人</text>
						</view>
						<!-- <view class="title title-2">巡防服领取：{{ info.title }}</view> -->
						<view class="title title-2">巡查时间：{{ info.checkStart }} - {{info.checkEnd}} 共{{ info.taskDistance ? info.taskDistance : '0' }}米</view>
						<view class='title title-2'>所属街道：{{info.publishDepartName}}</view>
						<view class="title title-2">起点：{{ begin_address }}</view>
						<view class="title title-2">终点：{{ end_address }}</view>
						<view class='title title-2 font-red'>参加状态：{{memberPlacelist.length}}/{{teamPeoples.length}}</view>
						<view class="people-list">
							<view class="people-item" 
							 v-for="(item,index) in teamPeoples"
							 :class="item.state ? 'line-on' : 'line-off' ">
								<view class="icon" >{{item.userName[0]}}</view>
								<view class="text">{{item.userName}}</view>
							</view>
						</view>
						<view class="title title-2">距离下一个关键点：{{ distance }}米</view>
						<!-- <view class="title title-2">{{loc_longitude}},{{loc_latitude}},速度 {{speed}} m/s</view> -->
					</view>

					<!-- 			<text class="cell-more yticon"
							:class="typeList[navigateType]"
						></text> -->
				</view>
			</scroll-view>
			<view class="bottom-btn-box" v-if="'34567'.indexOf(info.state)>=0 ? false : true ">
				<button class="bottom-float-button left-btn"
				 v-if="eventState==1 "
				  type="red-border" 
				  @click="popStateOpen">放弃任务</button>
				<button v-else-if="wanchengState" class="bottom-float-button left-btn"
				 type="red" @click="lingqu(2)">归还巡防服</button>
				 
				<button v-else-if="eventState==3" class="bottom-float-button left-btn" type="red" 
				@click="navTo('/pages/troubleReport/troubleReport?navbackIndex=1')">隐患上报</button>
				<button v-if="eventState==1" class="bottom-float-button right-btn" type="red" @click="lingqu(1)">扫码领取巡防服</button>
				<button v-else-if="eventState==2" class="bottom-float-button right-btn" type="red" @click="kaishi()">开始任务</button>
				<button v-else-if="eventState==3" 
				class="bottom-float-button right-btn" 
				type="red" 
				:class="!wanchengState ?  'disabled-btn'  : '' "
				:disabled="!wanchengState"
				@click="wancheng()"
				>完成任务</button>
			</view>
			<view class="bottom-btn-box" v-if="'4567'.indexOf(info.state)>=0 && (info.requestState==1 || info.requestState==4) ? true : false ">
				<button
				v-if="(info.clothReturnId == '' || info.clothReturnId == null) && info.clothGetId!=null ? true : false "
				class="bottom-float-button" 
				type="red" 
				@click="guihuan"
				>归还巡防服</button>
				<button
				v-else-if="'7'.indexOf(info.state)>=0 ? false : true"
				class="bottom-float-button" 
				type="red" 
				@click="navToAndSaveItem(taskId,'/pages/abnormal/abnormal')"
				>申请任务异常</button>
		</view>
		</view>
		
		<uni-popup ref="popup"  >
			
			<view class="time-select-box default-item-box">
				<view>
					<!-- <image class="left-icon" src="/static/img/icon_warning@2x.png"></image> -->
					<view class="title font-red">提示</view>
					<view class="text">直接退出将不能获得积分哦,是否退出?</view>
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
	
		<view class="qiandao-box" :style="{'visibility':animateState ? 'inherit' : 'hidden'}"  >
			<view class="qiandao-item" :class="animateState_main ? 'animate-on' : false" @click="qiandao_success"> 
				<image class="close-btn" src="/static/img/box_shut@2x.png" ></image>
				<image class="item-img cccc" src="/static/img/Signin_light@2x.png"></image>
				<image class="item-img gggg" src="/static/img/box_thank@2x.png"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	export default {
		components: {
			uniPopup
		},
		data() {
			return {
				baseUrl : getApp().globalData.baseUrl,
				rbacToken : getApp().globalData.rbacToken,
				speed:"",
				teamPeoples: [

				],
				memberPlacelist:[],
				animateState:false,
				animateState_main:false,
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

				]
			};
		},
		onReady() {

			const _this = this;

			
			
			//没必要一进来就获取位置  轮询会获取
			// this.getLocation();
			
		try {
				// #ifdef APP-PLUS
				this.Gmap = uni.createMapContext('Gmap',this);
				this.Gmap.$getAppMap().showUserLocation( true );
				// #endif
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
			this.taskId = this.selListItem.id;
			this.instanceId = this.selListItem.instanceId;
			this.speed_race = this._speed_race;
			//让用户当前地点在地图上打点
			//确定用户的点 然后在地图上, 地图定位居中
			// this.loc_longitude = 120.669800;
			// this.loc_latitude = 28.016794;
			//获取巡防服点的位置  然后打到地图上去
			this.recommentClothPoint();
			//轮询用户位置打点
			this.timeLocation();
			//获取这个任务的详情
			this.getCheckTaskById();
		},
		methods: {
			qiandao_success(){
				if( !this.animateState_main){
					return ;
				}
				this.animateState_main= !this.animateState_main;
				
				setTimeout(() => {
					this.animateState=false;
					this.switchTabTo('/pages/myMisson/myMisson');
				}, 1000);
			},
			//任务异常归还巡防服
			guihuan(){
				
				if(this.guihuanState){
					
					this.lingqu(2)

				}else{
					this.guihuanState = true ;
					this.recommentClothPoint();
				}
				
			},
			//弹出框方法
			popStateOpen(){
				//弹出框
				uni.showModal({
				    title: '提示',
				    content: '是否放弃任务?',
					// confirmColor:"#",
				    success:  (res)=> {
				        if (res.confirm) {
				            console.log('用户点击确定');
							this.MissonState(4);
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
					
				// this.$refs.popup.open();
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
									icon: 'none',
									title: "您的申请已经提交!",
									sccuess: () => {
										setTimeout(()=> {
											_this.navTo('/pages/missonListXF/missonListXF');
										}, 1500);
									},
									fail:(res)=>{
										debugger
									},
									complete:()=>{
			
									}
								});
								
					} else {
						uni.showToast({
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
			//执行巡防任务异常(或到达关键点)上报
			reportCheckException(state,idx) {
				this.$http.post('fyTaskManage/peaceTaskApp/reportCheckException', {
					longitude: this.loc_longitude,
					latitude:this.loc_latitude,
					type:state,
					descr:idx || idx == 0 ? String(idx) : null,
					instanceId:this.taskId,
					rbacToken: this.user.rbacToken,
				}).then(res => {
					if (res.data.success == 1) {

						
						
						if(state == 1){
							uni.showToast({
								icon: 'none',
								title: "您已到达节点"
							});
							uni.vibrateLong({
							    success: function () {
							        console.log('success');
							    }
							});
							//到达终点时候的方法
							if(this.acrossIndex >= this.info.points.length-1){
								this.wanchengState = true ;
							}else{
								this.acrossIndex ++;
							}
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
							iconPath: idx+1 == this.acrossIndex ?  "/static/img/icon_map_end_R@2x.png" : '/static/img/icon_map_end@2x.png',
							longitude: item.longitude,
							latitude: item.latitude
						})
					} else {
						this.markers.push({
							width: 30,
							height: 30,
							anchor: {
								x: 0.5,
								y: 1
							},
							iconPath: idx <this.acrossIndex && this.acrossIndex!=0 ? 
							`/static/map/map_red_${idx<10 ? idx : 'more'}@2x.png`
							:
							 `/static/map/map_green_${idx<10 ? idx : 'more'}@2x.png`,
							longitude: item.longitude,
							latitude: item.latitude,
							callout:{
								content:`第${idx}点位`,
								display:'ALWAYS',
								fontSize:16
							}
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
			//判断距离
			JudgeDistances(points){
				//如果已经到了终点  则不判断了
				if(this.wanchengState){
					return ;
				}
				this.distance = this.distanceCheck(
				this.markers[this.acrossIndex].longitude ,
				this.markers[this.acrossIndex].latitude ,
				points.longitude ,  //points.longitude,
				points.latitude     // points.latitude
				);
				
				console.log(this.distance)

				if(this.distance<this.distance_race){
					//判断是否到达一个节点
					if(this.acrossIndex != 0 &&  this.acrossIndex < this.info.points.length-1){
						
						this.markers[this.acrossIndex].iconPath =  `/static/map/map_red_${this.acrossIndex<10 ? this.acrossIndex : 'more'}@2x.png`;
					}else if(this.acrossIndex == 0){
						this.markers[this.acrossIndex].iconPath = "/static/img/icon_map_Arrivals@2x.png";
					}else if(this.acrossIndex == this.info.points.length-1){
						this.markers[this.acrossIndex].iconPath = "/static/img/icon_map_end_R@2x.png";
					}
					
					this.reportCheckException(1,this.acrossIndex)

				}else{
					return ;
				}
				// console.log(this.Gmap.$getAppMap())
				
				
					
			},
			//过滤人员
			filterMemberPlacelist(){
				const _this = this,userIdList =[];
				_this.teamPeoples.map((item02,idx02)=>{
						item02.state = 0;
				})
				_this.memberPlacelist.map((item02,idx02)=>{
						userIdList.push(item02.memberId)
				})
				this.memberPlacelist.map((item01,idx01)=>{
					let memberIcon = item01.memberIcon != '' && item01.memberIcon != null ?
					 `${_this.baseUrl}fyVolunteer/file/download/${item01.memberIcon}?rbacToken=${_this.rbacToken}`
					  : 
					  '/static/img/map_people@2x.png';
					  
					 // let memberIcon =  '/static/img/map_people@2x.png';
					let hasPoint_peo = false;
					//如果存在则显示红色
					_this.teamPeoples.map((item02,idx02)=>{
						if(item01.memberId == item02.userId){
							item02.state = 1 ;
						}
					})
					//如果存在则移动距离
					_this.markers.map((item02,idx02)=>{
						// if(hasPoint_peo){
						// 	return ;
						// }
						if(item02.team_people){
							if(item01.memberId == item02.markerId){
								item02.longitude = item01.longitude ;
								item02.latitude = item01.latitude ;
								item02.iconPath  =  memberIcon;
								hasPoint_peo = true;
								// _this.Gmap.translateMarker({
								// 	markerId:item02.markerId,
								// 	destination:{
								// 		longitude: item01.longitude  ,
								// 		latitude:item01.latitude , 
								// 	}
								// })

							}else if(userIdList.indexOf(item02.markerId)<0){
								item02.iconPath  =  '/static/img/map_people_Offline@2x.png';
								hasPoint_peo = true;
							}
							
						}
					})
					//如果不存在则放到markers里面
					if(!hasPoint_peo){
						_this.markers.push({
							team_people:true,
							markerId:item01.memberId,
							width: 30,
							height: 30,
							anchor: {
								x: 0.5,
								y: 0.5
							},
							iconPath: memberIcon,
							longitude:item01.longitude,
							latitude: item01.latitude
						})
					}
					
				})
			},
			//队员位置上报
			reportMemberPlace() {
				
				this.$http.post('fyTaskManage/peaceTaskApp/reportMemberPlace', {
					longitude: this.loc_longitude,
					latitude:this.loc_latitude,
					taskId:this.instanceId,
					rbacToken: this.user.rbacToken,
				}).then(res => {
					if (res.data.success == 1) {
						console.log("上报位置成功")
					} else {
						uni.showToast({
							icon: 'none',
							title: res.data.message
						});
					}
				})
			},
			//队员位置获取
			getMemberPlace() {
				const _this = this;
				this.$http.get('fyTaskManage/peaceTaskApp/getMemberPlace', {
					taskId:this.instanceId,
					rbacToken: this.user.rbacToken,
				}).then(res => {
					if (res.data.success == 1) {
						_this.memberPlacelist = res.data.data.list;
						//过滤数据
						_this.filterMemberPlacelist();

					} else {
						uni.showToast({
							icon: 'none',
							title: res.data.message
						});
					}
				})
			},
			
			timeLocation() {
				const _this = this;
				console.log("正在获取用户点位置")
				setTimeout(() => {
				// console.log(_this.$refs.Gmap)
					// #ifdef APP-PLUS  
					// _this.Gmap.getUserLocation()
					
					_this.Gmap.$getAppMap().getUserLocation( function ( state, point ){
						if( 0 == state ){
							_this.location_fun(point);
						}else{
							console.log( "Failed!" );
						}
					} );
					// #endif
					// this.$http.post('https://restapi.amap.com/v4/grasproad/driving?key=e879df33ceba55ea71495229d6aacf21', {
						
					// 	}).then(res => {
					// 		console.log(res)
					// 		debugger
							
					// 	})
/* 					uni.getLocation({
						altitude:true ,
						geocode: true, //默认false，是否解析地址信息
						// type: 'wgs84',
						type: 'gcj02',
						success: function(res) {
							_this.location_fun(res);
						},
						fail: function(res) {
							console.log("调用失败")

						},
						complete: function(res) {	
							
						} 
					}); */
				}, 5000);
			},
			//获取定位并在定位内操作的方法
			location_fun(point){
				const res = point;
				const _this = this;
				if(_this.acrossIndex == 0 ){
					_this.noticeText = `您当前距离下一个节点${_this.speed}米`;
				}else{
					_this.noticeText = `您已到达第${_this.acrossIndex+1}节点,当前距离下一个节点${_this.speed}米`;
				}
				


				let hasLocPiont = false;
				_this.loc_longitude = res.longitude;
				_this.loc_latitude = res.latitude;
				//如果超过了限定的行进速度,上报异常
				//异常类型1 正常到达关键点 2 偏移 3 过快 4逗留时间过长
				uni.getLocation({
					altitude:true ,
					geocode: true, //默认false，是否解析地址信息
					// type: 'wgs84',
					type: 'gcj02',
					success: function(res) {
						_this.speed = res.speed;
						if(_this.speed>_this.speed_race){
							uni.showToast({
								icon: 'none',
								title: "检测到您行进过快,请按照合理规划路线进行"
							});
							_this.reportCheckException(3)
						}
					},
					fail: function(res) {
						console.log("调用失败")

					},
					complete: function(res) {	
						
					} 
				});
				
				//个人位置上报
				_this.eventState == 3 ? _this.reportMemberPlace() : null;
				//其他队员位置获取
				_this.eventState == 3 ? _this.getMemberPlace() : null;
				
				if(_this.markers.length>0){
					_this.markers.map((item,idx)=>{
						if(item.markerId == _this.user.userId){
							hasLocPiont = true ; 
							
							item.longitude = _this.loc_longitude ;
							item.latitude = _this.loc_latitude ;
							// _this.Gmap.translateMarker({
							// 	markerId:_this.user.userId,
							// 	destination:{
							// 		longitude: res.longitude  , // res.longitude  , //120.212523
							// 		latitude:res.latitude ,  //res.latitude  //30.212552
							// 	}
							// })
							return ;
						}
					})
					if(!hasLocPiont){
						_this.markers.push({
									team_people:true,
									markerId:_this.user.userId,
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
					_this.markers.push({
								team_people:true,
								markerId:_this.user.userId,
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
			
			//领取巡防服
			lingqu(state) {
				const _this = this;
				try{
					uni.scanCode({
							onlyFromCamera: true,
							success: function(res) {
								console.log('条码类型：' + res.scanType);
								console.log('条码内容：' + res.result);
								// const result = JSON.parse(res.result);
								const result = res.result;
								if(result){
									_this.info.clothId = result;
									_this.doCheckCloth(state);
								}

							}
					})
				}catch(e){
					_this.eventState = 2;
					//TODO handle the exception
				}

			},
			kaishi() {
				this.MissonState(2);
			},
			wancheng() {
					this.MissonState(3);
			},
			//领取巡防服方法
			doCheckCloth(state) {
				this.$http.post('fyTaskManage/peaceTaskApp/doCheckCloth', {
					instanceId: this.taskId,
					userLong: this.loc_longitude,
					userLat : this.loc_latitude,
					clothId: this.info.clothId,
					state:state,
					rbacToken: this.user.rbacToken,
				}).then(res => {
					if (res.data.success == 1) {
						if(this.guihuanState){
							this.info.clothReturnId="已归还"
						}
						state == 1 ? this.eventState = 2 : null ;
						uni.showToast({
							icon: 'none',
							title: state == 2 ? "成功归还巡防服,可以完成任务啦"  : "领取巡防服成功,请达到指定地点"
						});
					} else {
						uni.showToast({
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

				this.$http.post('fyTaskManage/peaceTaskApp/doCheckTask', {
					instanceId: this.taskId,
					state: state,
					rbacToken: this.user.rbacToken,
				}).then(res => {
					if (res.data.success == 1) {
						switch (state) {
							case 2:
								text = "开始任务";
								this.eventState = 3;
								uni.showToast({
									icon: 'none',
									title: "任务开始成功,请您在规定时间内完成任务",
									sccuess: () => {
										
									}
								});
								//开始切换显示路线图
								this.filterData();
								break;
							case 3:
								this.animateState=true;
								this.animateState_main=true;
								text = "感谢您参与瓯海平安建设";
								// text = "感谢您参与瓯海平安建设";
								// uni.showToast({
								// 	icon: 'none',
								// 	title: text,
								// 	sccuess: () => {

								// 	},
								// 	fail:(res)=>{
										
								// 	},
								// 	complete:()=>{
								// 		setTimeout(()=> {
								// 			_this.switchTabTo('/pages/myMisson/myMisson');
								// 		}, 1500);
								// 	}
								// });
								break;
							case 4:
								text = "您已放弃任务"
								uni.showToast({
									icon: 'none',
									title: text,
									sccuess: () => {

									},
									fail:()=>{

									},
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
			
			//获取任务详情
			getCheckTaskById(state) {
				let text = "";
				this.$http.get('fyTaskManage/peaceTaskApp/getMyTaskById', {
					taskId: this.taskId,
					rbacToken: this.user.rbacToken,
				}).then(res => {
					if (res.data.success == 1) {
						this.info = res.data.data;
						this.teamPeoples = this.info.teamPeoples;
						this.begin_address = this.info.points[0].pointName;
						this.end_address = this.info.points[this.info.points.length-1].pointName;
						
						this.acrossIndex = this.info.lastSuccessPoint;

						if(this.info.lastSuccessPoint == this.info.points.length){
							this.wanchengState = true;
							this.eventState = 3;
							this.filterData()
						}else if(this.info.clothGetId != '' && this.info.clothGetId!=null){
							this.eventState = 2;
							this.kaishi();
						}else{
							this.recommentClothPoint();
						}
						
						// this.filterData();
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
					} else {
						uni.showToast({
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
			font-size: 24upx;
			line-height:32upx;
			white-space:pre-wrap;
			.cell-tip {
				float: right;
				font-size: 20upx;
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
				max-width: 40%;
				flex: 1;
			}

			.right-btn {
				flex: 1;
			}
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

				float: left;
			}
			.text{
				float:left;
			}
			
		}
		.line-on{
			.icon{
				background-color: #e32417;
			}
			.text{

				color:#666;
			}
		}
		.line-off{
			.icon{
				background-color: #ccc;
			}
			.text{
				color:#ccc;
			}
		}
	}
	

		
</style>
