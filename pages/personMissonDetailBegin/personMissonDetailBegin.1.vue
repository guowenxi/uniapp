<template>
	<view class="content no-padding">
<!-- 		<uni-notice-bar 
		v-if="noticeText != '' ? true : false"
		class="title-bar"
		show-icon="true"
		scrollable="true"
    single="true" 
    text="asdasdasdasdasdasdasdasd"> -->
</uni-notice-bar>
		<view class="map-box">
			<!-- :include-points="markers" -->
			<map ref="Gmap" v-if="!animateState ? true : false" id="Gmap" :scale="scale" :longitude="loc_longitude" :latitude="loc_latitude"  :polyline="polyline" :markers="markers"></map>
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
						<view class="title title-2">距离下一个关键点：{{ distance }}米</view>
						<view class="title title-2">巡查时间：{{ info.checkStart }} - {{info.checkEnd}} 共{{ info.taskDistance ? info.taskDistance : '0' }}米</view>
						<view class='title title-2'>所属街道：{{info.publishDepartName}}</view>
						<view class="title title-2">起点：{{ begin_address }}</view>
						<view class="title title-2">终点：{{ end_address }}</view>
						
						<view class="title title-2">{{loc_longitude}},{{loc_latitude}},速度 {{speed}} m/s</view>
						<view class="title title-2">距离:{{distance_set}}</view>
					</view>

					<!-- 			<text class="cell-more yticon"
							:class="typeList[navigateType]"
						></text> -->
				</view>
			</scroll-view>
			<!-- 判断是否能够操作 -->
			
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
				@click="wanchengState ? wancheng() : null "
				>完成任务</button>
				
			</view>
			
			<view class="bottom-btn-box" v-if="'4567'.indexOf(info.state)>=0 && (info.requestState==1 || info.requestState==4) ? true : false ">
				<button
				v-if="(info.clothReturnId == '' || info.clothReturnId == null) && info.clothGetId!=null   ? true : false "
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
		
<!-- 		<uni-popup ref="popup"  type="bottom">
			
			<view class="time-select-box default-item-box">
				<view>
					 <image class="left-icon" src="/static/img/icon_warning@2x.png"></image> 
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
			
		
		</uni-popup> -->
		
		<modalBox ref="modal" title="提示" content="是否放弃当前任务?" @eventClick="MissonState(4)" ></modalBox>
		
	
		<!-- 
		:style="{'visibility':animateState ? 'inherit' : 'hidden'}" 
		:style="{'display':animateState ? 'block' : 'none'}"
		 -->
		 <view class="qiandao-box" :style="{'visibility':animateState ? 'inherit' : 'hidden'}"  >
		 	<view class="qiandao-item" :class="animateState_main ? 'animate-on' : false" @click="qiandao_success"> 
		 		<image class="close-btn" src="/static/img/box_shut@2x.png" ></image>
		 		<image class="item-img cccc" src="/static/img/Signin_light@2x.png"></image>
		 		<image class="item-img gggg" src="/static/img/box_thank@2x.png"></image>
		 	</view>
		 </view>	
		 
<!-- 		<cover-view class="cover-qiandao-box" :style="{'visibility':animateState ? 'inherit' : 'hidden'}"  @click="qiandao_success"  >
			<cover-view class="qiandao-item"></cover-view>
			<cover-image class="close-btn" src="/static/img/box_shut@2x.png" ></cover-image>
			<cover-image class="item-img cccc"  src="/static/img/Signin_light@2x.png"></cover-image>
			<cover-image class="item-img gggg" :class="animateState_main ? 'animate-on' : ''" src="/static/img/box_thank@2x.png"></cover-image>
		</cover-view> -->
		
		
	</view>
</template>

<script>
		import modalBox from "@/components/modalBox.vue"
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	import uniNoticeBar from "@/components/uni-notice-bar/uni-notice-bar.vue"
	export default {
		components: {
			uniPopup,
			uniNoticeBar,
			modalBox
		},
		data() {
			return {
				firstLoad:true,
				length_set:0,
				distance_set:0,
				speed_state:0,
				speed_state_max:null,
				begin_setPeopleList:false,
				polylines:[],
				baseUrl : getApp().globalData.baseUrl,
				rbacToken : getApp().globalData.rbacToken,
				noticeText:"",
				speed:0,
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
				polyline:[{
					width: 20,
					color: "#55b2f9ff",
					points: []
				}],
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
			
			try {
				// #ifdef APP-PLUS
				this.Gmap = uni.createMapContext('Gmap',this);
				this.Gmap.$getAppMap().showUserLocation( true );
				// this.Gmap.$getAppMap().centerAndZoom( center, zoom );
				// #endif
			} catch (res) {
				
			}
			
			// console.log(uni.createMapContext('Gmap').$getAppMap());
			// console.log(uni.createMapContext('Gmap'));

		},
		onUnload(){
			this.releaseWakeLock();
			this.hideAllTimer = true ; 
		},
		onLoad() {
			this.distance_race = this._distance_race;
			this.speed_race = this._speed_race;
			this.max_distance = this._max_distance;
			this.speed_state_max = this._speed_state_max;
			this.taskId = this.selListItem.id;
			
			this.instanceId = this.selListItem.instanceId;
			
			this.wakeLock();
			this.getGEO_status();
			//让用户当前地点在地图上打点
			//确定用户的点 然后在地图上, 地图定位居中
			// this.loc_longitude = 120.669800;
			// this.loc_latitude = 28.016794;
			//获取巡防服点的位置  然后打到地图上去
			// this.recommentClothPoint();
			//轮询用户位置打点
			this.timeLocation();
			//获取这个任务的详情
			this.getCheckTaskById();
		},
		methods: {
			//允许程序后台运行，以持续获取GPS位置  
			       wakeLock() {
			         debugger
			          //Android  
			          var main = plus.android.runtimeMainActivity();  
			          var Context = plus.android.importClass("android.content.Context");  
			          var PowerManager = plus.android.importClass("android.os.PowerManager");  
			          var pm = main.getSystemService(Context.POWER_SERVICE);  
			          this.g_wakelock = pm.newWakeLock(PowerManager.SCREEN_BRIGHT_WAKE_LOCK, "ANY_NAME");  
			        // newWakeLock(int flags, String tag);
			        
			        // flags参数说明:
			        //     PARTIAL_WAKE_LOCK :保持CPU 运转，屏幕和键盘灯是关闭的。
			        
			        //     SCREEN_DIM_WAKE_LOCK ：保持CPU 运转，允许保持屏幕显示但有可能是灰的，关闭键盘灯
			        
			        //     SCREEN_BRIGHT_WAKE_LOCK ：保持CPU 运转，保持屏幕高亮显示，关闭键盘灯
			        
			        //     FULL_WAKE_LOCK ：保持CPU 运转，保持屏幕高亮显示，键盘灯也保持亮度
			        
			        // 同时适用做小说阅读器的，白天可以用SCREEN_BRIGHT_WAKE_LOCK保持屏幕常亮，晚上可以用SCREEN_DIM_WAKE_LOCK 保持屏幕常亮但亮度低
			        // 正文中提到的是用PARTIAL_WAKE_LOCK来保持后台运行
			          this.g_wakelock.acquire();  
			      },  
			      
			      //结束程序后台运行  
			       releaseWakeLock () {  
			          if(this.g_wakelock != null && this.g_wakelock.isHeld()) {  
			              this.g_wakelock.release();  
			              this.g_wakelock = null;  
			          }  
			      },
			
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
			//弹出框方法
			popStateOpen(){
			
				uni.showModal({
					title: '提示',
					content: '是否放弃当前任务?',
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

				// this.$refs.modal.open();
			},
			//弹出框
			popMission(state){
				this.MissonState(4);
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
							icon: 'none',
							title: res.data.message
						});
					}
				})
			},
			//上传状态
			//执行巡防任务异常(或到达关键点)上报
			reportCheckException(state,idx) {
				debugger
				const _this = this;
				this.$http.post('fyTaskManage/peaceTaskApp/reportCheckException', {
					longitude: this.loc_longitude,
					latitude:this.loc_latitude,
					type:state,
					descr:idx || idx == 0 ? String(idx) : null,
					instanceId:this.taskId,
					rbacToken: this.user.rbacToken,
				}).then(res => {
					if (res.data.success == 1) {
						uni.vibrateLong({
						    success: function () {
						        console.log('success');
						    }
						});
						if(state == 1){
							uni.showToast({
								icon: 'none',
								title: "您已到达节点"
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
				this.polyline = [{
					width: 20,
					color: "#55b2f9ff",
					points: []
				}];
				let iconPath = "";
				let polylines = []
				let _this = this;
				this.info.points.map((item, idx) => {
					if (idx == 0) {
						if(this.info.closeState == 0){
								iconPath = idx <this.acrossIndex ?  "/static/img/icon_map_Arrivals@2x.png" :  '/static/img/icon_map_start@2x.png' ;
						}else{
							iconPath =  idx <this.acrossIndex ?  "/static/img/icon_map_Arrivals@2x.png" :  "/static/img/opacity.png" ; 
						}
						this.begin_address = item.pointName;
						//如果是第一个图标
						this.markers.push({
							width: 28,
							height: 36.6,
							anchor: {
								x: .5,
								y: .5
							},
							iconPath: iconPath,
							longitude: item.longitude,
							latitude: item.latitude,
							
						})
					} else if (idx == this.info.points.length - 1) {
						//如果是最后一个图标
						
						if(this.info.closeState == 0){
								iconPath = idx+1 == this.acrossIndex ?  "/static/img/icon_map_end_R@2x.png" : '/static/img/icon_map_end@2x.png' ; 
						}else if(this.acrossIndex == 0 ){
							iconPath = "/static/img/opacity.png";
						}else{
							iconPath = idx+1 == this.acrossIndex ?  "/static/img/icon_map_end_R@2x.png" : "/static/img/opacity.png";
						}
						this.end_address = item.pointName;
						this.markers.push({
							width: 28,
							height: 36.6,
							iconPath: idx+1 == this.acrossIndex ?  "/static/img/icon_map_end_R@2x.png" : '/static/img/icon_map_end@2x.png' ,
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
							iconPath:  
							idx <this.acrossIndex && this.acrossIndex!=0 ?
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


					if(this.info.ploylineList ==null || this.info.ploylineList == 0){
						polylines.push(new plus.maps.Point(item.longitude,item.latitude));
					}
					
				})
				
				if(this.info.ploylineList !=null && this.info.ploylineList.length>0){
					this.info.ploylineList.map((item01,idx)=>{
						item01.map((item02,idx)=>{
							item02.points.map((item,idx)=>{
								polylines.push(new plus.maps.Point(item.longitude,item.latitude));
							})
						})
					})
				}
				
				// #ifdef APP-PLUS
				// 创建一个折线对象
				const map =  this.Gmap.$getAppMap();
				
				var polylineObj = new plus.maps.Polyline( polylines );
				polylineObj.setLineWidth( 20 );
				polylineObj.setStrokeColor( '#8cd89a' );
				
				map.addOverlay(polylineObj);
				
				// #endif	
				
			},
			//判断距离
			JudgeDistances(points){
				//如果已经到了终点  则不判断了
				if(this.wanchengState){
					return ;
				}
				//判断距离 得到距离
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
						//
						this.markers[this.acrossIndex].iconPath =  `/static/map/map_red_${this.acrossIndex<10 ? this.acrossIndex : 'more'}@2x.png`;
					}else if(this.acrossIndex == 0){
						//起点变色
						this.markers[this.acrossIndex].iconPath =
						 this.info.closeState == 0 ? "/static/img/icon_map_Arrivals@2x.png" : "/static/img/opacity.png";
					}else if(this.acrossIndex == this.info.points.length-1){
						//终点变色
						this.markers[this.acrossIndex].iconPath = "/static/img/icon_map_end_R@2x.png";
					}
					this.reportCheckException(1,this.acrossIndex)

				}else{
					return ;
				}
				// console.log(this.Gmap.$getAppMap())
				
				
					
			},
			timeLocation() {

				const _this = this;
				console.log("正在获取用户点位置")
				setTimeout(() => {
					
/* 					// #ifdef APP-PLUS  
					_this.Gmap.$getAppMap().getUserLocation( function ( state, point ){
						if( 0 == state ){
							_this.location_fun(point);
							if(_this.firstLoad){
								_this.loc_longitude = point.longitude;
								_this.loc_latitude = point.latitude;
								_this.JudgeDistances({longitude: point.longitude,latitude:point.latitude})
								_this.firstLoad= false;
							}
						}else{
							console.log( "Failed!" );
						}
					} );
					// #endif */
					
					uni.getLocation({
						altitude:true ,
						geocode: true, //默认false，是否解析地址信息
						// type: 'wgs84',
						type: 'gcj02',
						success: function(res) {
							_this.location_fun(res);
							if(_this.firstLoad){
								_this.loc_longitude = res.longitude;
								_this.loc_latitude = res.latitude;
								_this.JudgeDistances({longitude: res.longitude,latitude:res.latitude})
								_this.firstLoad= false;
							}
						},
						fail: function(res) {
							console.log("调用失败")

						},
						complete: function(res) {	
							
						} 
					});
				
				},3000);
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
				
				// console.log(`坐标:${res.longitude},${res.latitude},速度${res.speed}米`);
				console.log(res);
				let hasLocPiont = false;


				//如果超过了限定的行进速度,上报异常
				//异常类型1 正常到达关键点 2 偏移 3 过快 4逗留时间过长
				uni.getLocation({
					altitude:true ,
					geocode: true, //默认false，是否解析地址信息
					// type: 'wgs84',
					type: 'gcj02',
					success: function(_res) {
						_this.speed = _res.speed;
						if(_this.speed == 0 ){
							if(_this.speed_state < _this.speed_state_max ){
								_this.speed_state++;
							}else{
								uni.showToast({
									icon: 'none',
									title: "检测到您停留时间过长,请继续按照规划路线进行"
								});
								_this.reportCheckException(4);
								_this.speed_state = 0;
							}
						}
						if(_this.speed> 0){
							
							_this.loc_longitude = res.longitude;
							_this.loc_latitude = res.latitude;
							if(_this.begin_setPeopleList && _this.wanchengState == false){
								_this.setPeopleList(point);
							}
							
							//是否到了可是开始任务
							_this.eventState == 3 ? 
							_this.JudgeDistances({longitude: res.longitude,latitude:res.latitude}) : null;

						}
						
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
				//是否再继续请求
				_this.hideAllTimer  ?  null  : _this.timeLocation();

				
			},
			//领取巡防服
			lingqu(state) {
				const _this = this;
				
				uni.scanCode({
						onlyFromCamera: true,
						success: function(res) {
							console.log('条码类型：' + res.scanType);
							console.log('条码内容：' + res.result);
							// const result = JSON.parse(res.result);
							const result =res.result;
							if(result){
								_this.info.clothId = result;
								_this.doCheckCloth(state);
							}

						}
				})
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

			kaishi() {
				this.MissonState(2);
			},
			wancheng() {
					this.MissonState(3);
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
						if(this.guihuanState){
							this.info.clothReturnId="已归还"
						}
						state == 1 ?  this.eventState = 2  : null ;
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
								this.begin_setPeopleList = true ; 
								text = "开始任务";
								this.eventState = 3;
								uni.showToast({
									icon: 'none',
									title: "任务开始成功,请您在规定时间内完成任务",
									sccuess: () => {
										
									},

								});
								//开始切换显示路线图
								this.filterData();
								break;
							case 3:
							
								this.animateState=true;
								this.animateState_main=true;
								text = "感谢您参与瓯海平安建设";
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
								// this.$refs.popup.close();
								uni.showToast({
									icon: 'none',
									title: text,
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
						this.begin_address = this.info.points[0].pointName;
						this.end_address = this.info.points[this.info.points.length-1].pointName;
					
						this.acrossIndex = this.info.lastSuccessPoint;
						
						debugger

						//已经完成
						if(this.info.lastSuccessPoint == this.info.points.length){
							this.wanchengState = true;
							this.eventState = 3;
							this.filterData()
						}else 
						//任务异常
						//判断状态 为34567的时候为已经异常了
						if('34567'.indexOf(this.info.state)>=0){
								this.wanchengState = true;
								this.filterData();
						}else
						//领取了巡防服 但是没完成任务
						 if(this.info.clothGetId != '' && this.info.clothGetId!=null){
							this.eventState = 2;
							this.kaishi();
							//重置路径栏位
							
							this.polyline[0].points = this.info.coordinate;
							this.polylines = this.info.coordinate;
						}else
						//默认初始的任务状态
						{
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
						
						console.log(this.clothList)
					} else {
						uni.showToast({
							icon: 'none',
							title: res.data.message
						});
					}
				})
			},
			//上报点位
			setPeopleList(points){
				//如果已经到了终点  则不判断了
				if(this.wanchengState){
					return ;
				}
				//判断距离 得到距离

				if(this.polylines.length> 0){
					this.length_set = this.polylines.length> 0 ? this.polylines.length-1 : 0 ;
					this.distance_set = this.distanceCheck(
					this.polylines[this.length_set].longitude ,
					this.polylines[this.length_set].latitude ,
					points.longitude ,  //points.longitude,
					points.latitude     // points.latitude
					);
				}
				//大于30的时候不生效
				console.log(this.distance_set)
				// if(this.distance_set > this.max_distance){
				// 	return ;
				// }
				
				this.polylines.push({
					longitude: points.longitude,
					latitude: points.latitude
				})
				this.polyline[0].points = this.polylines;

				this.$http.post('fyTaskManage/peaceTaskApp/setPeopleList', {
					longitude: points.longitude,
					latitude: points.latitude,
					rbacToken: this.user.rbacToken,
					taskId: this.taskId,
				}).then(res => {
					
					if (res.data.success == 1) {
					} else {
						uni.showToast({
							icon: 'none',
							title: res.data.message
						});
					}
				})

			},
		
		
		},
		 onBackPress(event){
			 if(this.wanchengState == false){
				 uni.showModal({
				   title: '提示',
				   content: '退出当前巡防将无法继续进行巡防任务,是否退出当前巡防任务?(当前的进度将会保留)',
				  // confirmColor:"#",
				   success:  (res)=> {
				     if (res.confirm) {
				       this.switchTabTo("/pages/myMisson/myMisson")
				     } else if (res.cancel) {
				      
				     }
				   }
				 });
				 return true ;
			 }
			 
		    }
	};
</script>

<style lang="scss">
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
				max-width: 40%;
				flex: 1;
			}

			.right-btn {
				flex: 1;
			}
		}
	}
</style>
