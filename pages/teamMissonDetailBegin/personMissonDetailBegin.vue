<template>
	<view class="content no-padding">
		
<!-- 		<uni-notice-bar 
		@click="showips"
		class="title-bar"
		show-icon="true"
		single="true" 
		text="关于如何让定位更加准确?">
		</uni-notice-bar> -->
		
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
						
<!-- 						<view class="title title-2">持续定位调用次数：{{ state_max }}</view>
						<view class="title title-2">获取坐标点调用次数：{{ state_getUserLocation_max }}</view> -->
						
						<!-- <view class="title title-2">获取gps定位次数：{{ state_polyline_max }}</view> -->
						<!-- <view class="title title-2">推送通知：{{ push_state_max }}</view> -->
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
						<view class="title title-2">{{loc_longitude}},{{loc_latitude}},速度 {{speed}} m/s</view>
						<!-- <view class="title title-2">距离:{{distance_set}}</view> -->
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
				 current: {
					poster: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/audio/music.jpg',
					name: '致爱丽丝',
					author: '暂无',
					src: 'http://ting6.yymp3.net:86/new11/vae2/10.mp3',
				},
				audioAction: {
					method: 'pause'
				},
				watchId:"",
				push_state_max:0,
				state_getUserLocation_max:0,
				state_polyline_max:0,
				state_max:0,
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
				btnStateText: '领取巡防服',
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
				plus.push.addEventListener('receive', function(msg){
				
					
				    //处理透传消息的业务逻辑代码  
				}, false);
				this.Gmap = uni.createMapContext('Gmap',this);
				
				this.Gmap.$getAppMap().showUserLocation( true );
				this.ggMao = this.Gmap.$getAppMap();
				
				// this.Gmap.$getAppMap().centerAndZoom( center, zoom );
				// #endif
			} catch (res) {
				
			}
			


		},
		onUnload(){
			if(this.user.SystemInfoSync == 'android'){
				this.releaseWakeLock();
			}
			plus.geolocation.clearWatch(this.watchId);
			this.hideAllTimer = true ; 
			plus.push.clear();
		},
		onLoad() {
			const _this = this ; 
			
			plus.device.setWakelock(true); 
			const state = plus.device.isWakelock();

			// plus.geolocation.watchPosition(function(successCB, errorCB, option){
			// 		_this.push_state_max ++ ;
			// 		console.log(`${successCB.coords.longitude},${successCB.coords.latitude}`)
			// 		_this.setPeopleList(successCB.coords,false);

			// })
			
			this.distance_race = this._distance_race;
			this.speed_race = this._speed_race;
			this.max_distance = this._max_distance;
			this.speed_state_max = this._speed_state_max;
			this.taskId = this.selListItem.id;
			
			this.instanceId = this.selListItem.instanceId;
			// this.lieying();
			if(this.user.SystemInfoSync==  "android"){
				this.wakeLock();
			}
			this.getGEO_status();
			
			//ios端模拟通知
			this.createMessage();
			
			
			// this.openService();
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
			
			//显示应用设置
			showips(){
				this.navTo("/pages/locationSetting/locationSetting");
			},
			createMessage(){    
				if (plus.os.name == "iOS") {
					//通知消息
					plus.push.createMessage("平安联盟正在持续为您定位", "LocalMSG", {cover:false});
/* 					//声音
					var AVAudioSession = plus.ios.importClass("AVAudioSession");  
					var AVSpeechSynthesizer = plus.ios.importClass("AVSpeechSynthesizer");  
					var AVSpeechUtterance = plus.ios.importClass("AVSpeechUtterance");  
					var AVSpeechSynthesisVoice = plus.ios.import("AVSpeechSynthesisVoice");  
					AVAudioSession.sharedInstance().setCategoryerror("AVAudioSessionCategoryPlayback",null);
					var sppech = new AVSpeechSynthesizer();  
					var utterance =  AVSpeechUtterance.speechUtteranceWithString("平安联盟持续为您定位");  
					 utterance.plusSetAttribute("rate",0.3);  
					sppech.speakUtterance(utterance);  
					 */
					// //停止  
					// sppech.stopSpeakingAtBoundary(0)  
					// //暂停  
					// sppech.pauseSpeakingAtBoundary(0);  
					//继续  
					// sppech.continueSpeaking(0);  
					// plus.ios.deleteObject(voice);  
					// plus.ios.deleteObject(utterance);  
					// plus.ios.deleteObject(sppech);  
					// plus.ios.deleteObject(AVAudioSession);
				}

				
			},
			// 
			// getGEO_status(){
			// 	if(this.user.SystemInfoSync == 'android'){
			// 		//定位服务，获取LocationManager，以控制位置更新
			// 		var main = plus.android.runtimeMainActivity(); 
			// 		var Context = plus.android.importClass("android.content.Context"); 
			// 		var pm = main.getSystemService(Context.LOCATION_SERVICE); 
			// 		 //android.location.LocationManager
			// 		 var LocationManager = plus.android.importClass("android.location.LocationManager"); 
					 
			// 		if(pm.isProviderEnabled){
			// 			var isGps =  pm.isProviderEnabled(LocationManager.GPS_PROVIDER);
			// 			if(isGps){
			// 				this.state_polyline_max ++ ;
			// 			}
			// 		}
			// 	}
					
			// },
			//允许程序后台运行，以持续获取GPS位置
			 wakeLock() {
			
			 if(this.user.SystemInfoSync == 'android'){
				 // 开启前台服务
				  var main = plus.android.runtimeMainActivity(); 
				 var Context = plus.android.importClass("android.content.Context"); 
				 
				   //Android  
						
				   var PowerManager = plus.android.importClass("android.os.PowerManager");  
				   //电源服务，获取PowerManager，    控制电源管理,包括唤醒锁，在运行长时间服务保持设备开启
				   var pm = main.getSystemService(Context.POWER_SERVICE);  
				   this.g_wakelock = pm.newWakeLock(PowerManager.PARTIAL_WAKE_LOCK, "ANY_NAME");  
				 // newWakeLock(int flags, String tag);
				 
				 // flags参数说明:
				 //     PARTIAL_WAKE_LOCK :保持CPU 运转，屏幕和键盘灯是关闭的。
				 
				 //     SCREEN_DIM_WAKE_LOCK ：保持CPU 运转，允许保持屏幕显示但有可能是灰的，关闭键盘灯
				 
				 //     SCREEN_BRIGHT_WAKE_LOCK ：保持CPU 运转，保持屏幕高亮显示，关闭键盘灯
				 
				 //     FULL_WAKE_LOCK ：保持CPU 运转，保持屏幕高亮显示，键盘灯也保持亮度
				 
				 // 同时适用做小说阅读器的，白天可以用SCREEN_BRIGHT_WAKE_LOCK保持屏幕常亮，晚上可以用SCREEN_DIM_WAKE_LOCK 保持屏幕常亮但亮度低
				 // 正文中提到的是用PARTIAL_WAKE_LOCK来保持后台运行
				   this.g_wakelock.acquire();  
				  
				   this.g_wakelock.setReferenceCounted(false);
			 }
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
						// if(state == 1){
						// 	uni.showToast({
						// 		icon: 'none',
						// 		title: "您已到达节点"
						// 	});
						// 	//到达终点时候的方法
						// 	if(this.acrossIndex >= this.info.points.length-1){
						// 		this.wanchengState = true ;
						// 	}else{
						// 		this.acrossIndex ++;
						// 	}
						// }
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
						//closeState用来判断状态 是否是闭合路线
						//acrossIndex 当前索引
						if(this.info.closeState == 0){
								iconPath = idx <this.acrossIndex ?  "/static/img/icon_map_Arrivals@2x.png" :  '/static/img/icon_map_start@2x.png' ;
						}else{
							iconPath =  idx < this.acrossIndex ?   "/static/img/opacity.png" : "/static/img/icon_map_start@2x.png"; 
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
						//closeState用来判断状态 是否是闭合路线
						//acrossIndex 当前索引
						if(this.info.closeState == 0 ){
							iconPath = idx+1 == this.acrossIndex ?  "/static/img/icon_map_end_R@2x.png" : '/static/img/icon_map_end@2x.png' ; 
						}else {
							if(this.acrossIndex == 0 ){
								iconPath = '/static/img/opacity.png';
							}else{
							iconPath = idx+1 == this.acrossIndex ?  "/static/img/icon_map_end_R@2x.png" : '/static/img/icon_map_end@2x.png' ; 
							}
						}
						this.end_address = item.pointName;
						this.markers.push({
							width: 28,
							height: 36.6,
							iconPath: iconPath,
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
						if(this.info.closeState == 0){
							this.markers[this.acrossIndex].iconPath = "/static/img/icon_map_Arrivals@2x.png";
						}else{
							this.markers[this.acrossIndex].iconPath ="/static/img/opacity.png";
							this.markers[this.info.points.length-1].iconPath = "/static/img/icon_map_end@2x.png"
						}
					}else if(this.acrossIndex == this.info.points.length-1){
						//终点变色
						this.markers[this.acrossIndex].iconPath = "/static/img/icon_map_end_R@2x.png";
					}
					//客户端直接验证打点
					uni.showToast({
						icon: 'none',
						title: "您已到达节点"
					});
					
					//提交到后台的方法
					//先提交到后台,再进行判断
					
					this.reportCheckException(1,this.acrossIndex)
					//到达终点时候的方法
					if(this.acrossIndex >= this.info.points.length-1){
						this.wanchengState = true ;
					}else{
						this.acrossIndex ++;
					}
				}else{
					return ;
				}
				// console.log(this.Gmap.$getAppMap())
				
				
					
			},
			timeLocation() {
				
				let point = "";
				const _this = this;
				
				// _this.watchId = plus.geolocation.watchPosition( function ( p ) {
				// 	_this.state_max ++;
				//     console.log( "监听位置变化信息:" );  
				//     console.log( JSON.stringify(p) );  
				// }, function ( e ) {  
				//     console.log( "监听位置变化信息失败："+e.message );  
				// }, {'enableHighAccuracy':true,'geocode': false} ); 
				
				// console.log("正在获取用户点位置")
				setTimeout(() => {
					// #ifdef APP-PLUS  

					// plus.geolocation.getCurrentPosition(function(p){
					// 	// point = p.coords;
					// 	_this.state_max ++;
					// 	// _this.location_fun(point);
					// 	// if(_this.firstLoad){
					// 	// 	_this.loc_longitude = point.longitude;
					// 	// 	_this.loc_latitude = point.latitude;
					// 	// 	_this.JudgeDistances({longitude: point.longitude,latitude:point.latitude})
					// 	// 	_this.firstLoad= false;
					// 	// }
					// 	// console.log({longitude:p.coords.longitude,latitude:p.coords.latitude})
					// 	}, function(e){
							
					// } ); 
					
					
					if(this.user.SystemInfoSync == 'android'){
					_this.Gmap.$getAppMap().getUserLocation( function ( state, point ){
						_this.state_getUserLocation_max ++ ;
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
					}else{
						uni.getLocation({
							altitude:true ,
							geocode: true, //默认false，是否解析地址信息
							// type: 'wgs84',
							type: 'gcj02',
							success: function(_res) {
								
								_this.state_getUserLocation_max ++ ;
								_this.location_fun(_res);
								if(_this.firstLoad){
									_this.loc_longitude = _res.longitude;
									_this.loc_latitude = _res.latitude;
									_this.JudgeDistances({longitude: _res.longitude,latitude:_res.latitude})
									_this.firstLoad= false;
								}
							},
							fail: function(res) {
								console.log("调用失败")
						
							},
							complete: function(res) {	
								
							} 
						});
						
					}

					
					// #endif
					
/* 					uni.getLocation({
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
					}); */
				
				},_this._time_interval);
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
				

				//其他队员位置获取
				_this.eventState == 3 ? _this.getMemberPlace() : null;
				
				//如果超过了限定的行进速度,上报异常
				//异常类型1 正常到达关键点 2 偏移 3 过快 4逗留时间过长
				uni.getLocation({
					altitude:true ,
					geocode: true, //默认false，是否解析地址信息
					// type: 'wgs84',
					type: 'gcj02',
					success: function(_res) {
						_this.speed = _res.speed;
						
						if(_this.speed == 0 && _this.wanchengState == false  && _this.begin_setPeopleList ){
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
						}else if(_this.speed >0){
							_this.speed_state = 0;
						}
						
						
						if(_this.speed> 0){
							_this.state_polyline_max ++ ;
							_this.loc_longitude = res.longitude;
							_this.loc_latitude = res.latitude;

							if(_this.begin_setPeopleList && _this.wanchengState == false){
								_this.setPeopleList(point);
								//个人位置上报
								_this.eventState == 3 ? _this.reportMemberPlace() : null;
							}
							//测试用
							// _this.setPeopleList(point);
							//是否到了可是开始任务
							//判断距离 改变样式
							_this.eventState == 3 ? 
							_this.JudgeDistances({longitude: res.longitude,latitude:res.latitude}) : null;

						} 
						
						if(_this.speed>_this.speed_race && _this.wanchengState == false){
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
				const _this = this; 
				uni.getLocation({
					altitude:true ,
					geocode: true, //默认false，是否解析地址信息
					// type: 'wgs84',
					type: 'gcj02',
					success: function(_res) {
						let text = "";
						_this.$http.get('fyTaskManage/peaceTaskApp/recommentClothPoint', {
							longitude: _res.longitude,
							latitude:_res.latitude,
							rbacToken: _this.user.rbacToken,
						}).then(res => {
							if (res.data.success == 1) {
								_this.clothList = res.data.data.list;
								
								_this.filterCloth();
								
								console.log(_this.clothList)
							} else {
								uni.showToast({
									icon: 'none',
									title: res.data.message
								});
							}
						})
					},
				})
				

			},
			//上报点位
			setPeopleList(points,bol){
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
				//大于对应数的时候不生效
				console.log(this.distance_set)
				
				// if(this.distance_set > this.max_distance){
				// 	return ;
				// }
				
				this.polylines.push({
					longitude: points.longitude,
					latitude: points.latitude
				})
				this.polyline[0].points = this.polylines;
				
				// if( !bol){
				// 	return ;  
				// }
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
		
		lieying(){
			
			if(this.user.SystemInfoSync == 'android'){
				var NotifyID = 1;
				var Service = plus.android.importClass("android.app.Service");  
				var Context = plus.android.importClass("android.content.Context");  
				var main = plus.android.runtimeMainActivity();  
				var Noti = plus.android.importClass("android.app.Notification");  
				var NotificationManager = plus.android.importClass("android.app.NotificationManager");  
				var nm = main.getSystemService(Context.NOTIFICATION_SERVICE)  
				var Notification = plus.android.importClass("android.app.Notification");  
				var mNotification = new Notification.Builder(main);  
				
				
				setTimeout(()=>{
					
					// setInterval(()=>{
						
				
						// var nm = main.getSystemService(Context.FOREGROUND_SERVICE)
						var main = plus.android.runtimeMainActivity();  
						
						//com.amap.api.location.APSService
						var Intent = plus.android.importClass('android.content.Intent');
						
						var intent = new Intent();  
				
						
						
						var AMapLocationClient = plus.android.importClass("com.amap.api.location.AMapLocationClient");
						var locationClient =  new AMapLocationClient(main);
						var AMapLocationListener = plus.android.importClass("com.amap.api.location.AMapLocationListener");
						var AMapLocationClientOption = plus.android.importClass("com.amap.api.location.AMapLocationClientOption");
						// var AMapLocationMode = plus.android.importClass("com.amap.api.location.AMapLocationMode");
						var option  = new AMapLocationClientOption();
						option.setLocationPurpose(option.AMapLocationPurpose.SignIn);
						option.setLocationMode(AMapLocationClientOption.AMapLocationMode.Hight_Accuracy);
						option.setLocationMode(AMapLocationClientOption.AMapLocationMode.Device_Sensors);
						
						// AMapLocationClient.enableBackgroundLocation();
						
						var mLocationListener = new AMapLocationListener();
						var mLocationClient = new AMapLocationClient(main);
						
						mLocationClient.setLocationListener(mLocationListener);
						
						locationClient.setLocationOption(option);
						//设置场景模式后最好调用一次stop，再调用start以保证场景模式生效
						locationClient.stopLocation();
						locationClient.startLocation();
						
						
						
						var dlg = plus.android.invoke(mLocationListener,"onLocationChanged")
						
						//  mLocationListener.onLocationChanged(function(_,__){
						// 	debugger
						// });
						
					// },3000)
					
					
				},1000)
				
				
				// //startForeground 
				
				
				// mNotification.setOngoing(true);  
				// mNotification.setContentTitle("平安联盟")  
				// mNotification.setContentText("正在持续为您定位")  
				// mNotification.setSmallIcon(17301620)  
				// mNotification.setTicker("PadInfo")  
				
				// mNotification.setNumber(10)  
				// var mNb = mNotification.build()  
				// nm.notify(NotifyID , mNb);
			}

			
		},
		openService(){
			if(this.user.SystemInfoSync==  "android"){
				var main = plus.android.runtimeMainActivity();
				const dcRichAlert = uni.requireNativePlugin('DCloud-RichAlert');
				let PalmGps = uni.requireNativePlugin('palmgpsservice-debug')
				PalmGps.getLocation(main);
			}

			
			// var dlg = plus.android.invoke(PalmGps,"getLocation");
			
			//_this.getGEO_status();
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
			line-height:32upx;
			white-space:pre-wrap;
			.cell-tip {
				float: right;
				font-size: $font-sm;
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
		height:100vh;
		overflow: hidden;
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
