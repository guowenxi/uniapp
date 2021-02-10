import Vue from 'vue'
import store from './store'

import _moment from 'moment'
import Json from './Json' //测试用数据


import wLoading from "@/components/w-loading.vue";
Vue.component('w-loading',wLoading)

// let baseUrl = "http://115.223.34.195:8090/";
let baseUrl = "http://47.96.115.177:9000/";

Vue.prototype.baseUrl = baseUrl; /* 根域名不同 */

import App from './App'
import { http } from '@/utils/luch-request/index.js' // 全局挂载引入，配置相关在该index.js文件里修改
http.setConfig((config) => { /* 设置全局配置 */
	config.baseUrl = baseUrl; /* 根域名不同 */
	config.header = {
	}
	return config
})
Vue.prototype.$http = http;

Vue.prototype._moment = _moment;
Vue.prototype._updateState =  (version,_this,showmodal)=>{
	// console.log(JSON.stringify(_this))
	 uni.request({
		url: `${_this.baseUrl}fyVolunteer/version/app`,
		data: {
			type: plus.os.name == "iOS" ? "2" : "1",
			version:version
		},
		success: (result) => {
			console.log(result.data)
			var data = result.data.data;
			
			//测试用的
			// #ifdef H5
			_this.updateBox = true ;
			// #endif
			
			if(data.versionNumber == ''){
				return; 
			}
			_this.user.versionExplain = data.versionExplain;
			_this.user.versionUrl = data.versionUrl;
			_this.user.upgradeType = data.upgradeType;
			_this.user.versionNumber = data.versionNumber;


			if (data.versionNumber.split(".").join("") > version.split(".").join("")) {
				_this.updateBox = true ;
				uni.hideTabBar();
				if (plus.os.name == "iOS") {
					plus.runtime.openURL("itms-apps://" + 'itunes.apple.com/cn/app');  
					return ;
				}
				if(showmodal){
					uni.showModal({
						title: '提示',
						content: `检测到新的版本 -V${data.versionNumber},是否进行更新?`,
						// confirmColor:"#",
						success: (res) => {
							if (res.confirm) {
								if (data.upgradeType == 1) {
									uni.showLoading({
										title: '正在下载最新版本,请等待...',
										mask: true
									})
								} else {
									uni.showToast({
										icon: 'none',
										title: "已切换后台下载最新版本,请勿关闭app..."
									});
								}
								if (data.versionUrl) {
									uni.downloadFile({
										url: data.versionUrl,
										success: (downloadResult) => {
											if (downloadResult.statusCode === 200) {
												if (data.upgradeType == 1) {
													uni.showToast({
														icon: 'none',
														title: "下载更新包成功,正在更新..."
													});
												}
												plus.runtime.install(downloadResult.tempFilePath, {
													force: true
												}, function(e) {
													uni.showToast({
														icon: 'none',
														title: "更新完成,准备重启程序...",
														complete: () => {
															setTimeout(() => {
																uni.hideLoading();
																console.log(e.message);
																plus.runtime.restart();
															}, 1500);
														},
													});
												}, function(e) {
													uni.showToast({
														icon: 'none',
														title: '更新失败,请稍后再试',
														complete: () => {
															uni.hideLoading();
															console.log(e.message);
															plus.runtime.restart();
														},
													});
													console.error(e.message);
												});
											}
										}
									});
								}
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
								
				}
			}else{
				if(showmodal){
					uni.showToast({
						icon: 'none',
						title: "已是最新版本,无需更新"
					});
				}
			}
				
		}
	});
}
Vue.prototype.user = {
	loginState:false,
	loadBannerState:true,
	searchOptionText_id:[],
	searchOptionText:[],
	activityInfos:[],
	SystemInfoSync:"",
	longitude : "120.699312",
	latitude : "27.994051",
	address : "用户当前位置",
	exchangeCount: "",
	tradeIntegral: "",
	rbacToken:"b1d460b12ef94fd99c160d0c8c09e5a0",
	hasTeam:"",
	hasDepart:"",
	hasMarket:"",
	userId:"",
	resurgence:"",
	questionCount:"",
	answerCG:0,
	answerQuestions:[],
	resurgence:1,
}
const msg = (title, duration = 1500, mask = false, icon = 'none') => {
	//统一提示方便全局修改
	if (Boolean(title) === false) {
		return;
	}
	uni.showToast({
		title,
		duration,
		mask,
		icon
	});
}
const json = type => {
	//模拟异步请求数据
	return new Promise(resolve => {
		setTimeout(() => {
			resolve(Json[type]);
		}, 500)
	})
}

const prePage = () => {
	let pages = getCurrentPages();
	let prePage = pages[pages.length - 2];
	// #ifdef H5
	return prePage;
	// #endif
	return prePage.$vm;
}

Vue.prototype.loadingState=()=>{
	uni.showLoading({
		title: '加载中,请等待...',
		mask:true
	})
}

Vue.config.productionTip = false
Vue.prototype.$fire = new Vue();
Vue.prototype.$store = store;
Vue.prototype.$api = {
	msg,
	json,
	prePage
};


Vue.prototype.bolNavTo = function(url,item) {
	if(this.user.reviewStatus == 4){
		
		uni.showToast({
			icon:'none',
			mask:true,
			title: '您还未实名认证,请进行实名认证',
			complete: () => {
				setTimeout(() => {
							uni.navigateTo({
							url:'/pages/authentication/authentication'	
						})
				}, 1500);
			}
		});
		return ;
	}else if(url){
		if(item){
			this.navToAndSaveItem(item,url)
		}else{
			uni.navigateTo({
			url
			})
		}

	}

}
Vue.prototype.navTo = function(url) {
	
	uni.navigateTo({
		url
	})
}
Vue.prototype.redirectToAndSaveItem = function(item,url) {
	Vue.prototype.selListItem = item;
	uni.redirectTo({
		url
	})
}
Vue.prototype.selListItem = {};
Vue.prototype.navToAndSaveItem = function(item,url){
	
	Vue.prototype.selListItem = item;
		uni.navigateTo({
		url
	})
}
Vue.prototype.switchTabTo = function(url) {

	uni.switchTab({
		url
	})

}
Vue.prototype.redirectTo = function(url) {

	uni.redirectTo({
		url
	})

}
Vue.prototype.navigateBack= function(delta){
		uni.navigateBack({
			delta: delta
		});
}
//判断时间
Vue.prototype._time_interval = 5000;
//判断最大偏移量
Vue.prototype._max_distance = 50;
//判断停留时间次数 根据轮询时间来 3秒的倍数 100是5分钟
Vue.prototype._speed_state_max = 200;
//判断距离的方法 (单位 米)
Vue.prototype._distance_race = 50;
//判断速度 m/s
Vue.prototype._speed_race = 10;
Vue.prototype.getGEO_status=function(){  
	
	if (plus.os.name == "iOS") {
		var cllocationManger = plus.ios.import("CLLocationManager");  
		                var enable = cllocationManger.locationServicesEnabled();  
		                var status = cllocationManger.authorizationStatus();  
		                console.log("enable:" + enable);  
		                console.log("status:" + status);  
		                if (enable && status != 2) {  
		                    console.log("手机系统的定位已经打开");  
		                } else {  
		                   uni.showModal({
		                   	  title: '提示',
		                   	  content: '系统检测到您当前未开启GPS定位(此功能将影响定位准确度),请您开启手机GPS定位功能',
		                   	 // confirmColor:"#",
		                   	  success:  (res)=> {
		                   	    if (res.confirm) {
		                   	      
		                   	    } else if (res.cancel) {
		                   	     
		                   	    }
		                   	  }
		                   	});
		                    
		                }  
		 plus.ios.deleteObject(cllocationManger);
	}else{
		var context = plus.android.importClass("android.content.Context");
		var locationManager=plus.android.importClass("android.location.LocationManager");  
		var main=plus.android.runtimeMainActivity();  
		var mainSvr=main.getSystemService(context.LOCATION_SERVICE);
		  console.log()
		if(mainSvr.isProviderEnabled(locationManager.GPS_PROVIDER) == false){
			uni.showModal({
			  title: '提示',
			  content: '系统检测到您当前未开启GPS定位(此功能将影响定位准确度),请您开启手机GPS定位功能',
			 // confirmColor:"#",
			  success:  (res)=> {
			    if (res.confirm) {
			      
			    } else if (res.cancel) {
			     
			    }
			  }
			});
		}
	}
 
}
Vue.prototype.distanceCheck= function(lng_a, lat_a, lng_b, lat_b) {
	var pk = 180 / 3.14169;
	var a1 = lat_a / pk;
	var a2 = lng_a / pk;
	var b1 = lat_b / pk;
	var b2 = lng_b / pk;
	var t1 = Math.cos(a1) * Math.cos(a2) * Math.cos(b1) * Math.cos(b2);
	var t2 = Math.cos(a1) * Math.sin(a2) * Math.cos(b1) * Math.sin(b2);
	var t3 = Math.sin(a1) * Math.sin(b1);
	var tt = Math.acos(t1 + t2 + t3);
	return Math.floor(6366000 * tt);
}

Vue.prototype.getLocation = () => {
	// console.info("getLocation  是个方法,会返回坐标")
	uni.getLocation({
		geocode: false, //默认false，是否解析地址信息
		type: 'gcj02',
		success: function(res) {
			uni.setStorageSync('loc_center', JSON.stringify({longitude:res.longitude,latitude:res.latitude}));
		},
		fail: function(res) {
uni.setStorageSync('loc_center', JSON.stringify({longitude:120.699312,latitude:27.994051}));
		},
		complete: function(res) {
		}
	});
	
	console.log(JSON.parse(uni.getStorageSync('loc_center')));

}



App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
