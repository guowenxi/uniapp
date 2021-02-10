<template>
	<view class="content no-padding">
		
		<view class="phone-title" ></view>
		<view class="title-box-index">
			<image class="left-icon" src="/static/_new_index/home_position@2x.png"></image>
			<scroll-view scroll-x class="right-b" @click="location">
				<view>{{ myLocation }}</view>
			</scroll-view>
			<image class="right-icon" src="/static/_new_index/home_share@2x.png" @click="shareAPP"></image>
			<image class="right-icon" src="/static/_new_index/home_scanning@2x.png" @click="saoyisao"></image>
		</view>
		<!-- progress -->
		<view class="line-bar" :class="lineBarState ? 'line-bar-an' : '' ">
			<view class="lines">
				<view class="wrap-line"><view class="inner-line" :style="{ width: progress_num + '%' }"></view></view>
			</view>
			<!-- 当前进度{{progress_num}}% -->
		</view>
		
		<!-- 
		refresher-enabled="true"
		:refresher-threshold="100"l
		@refresherpulling="getmoreData"
		@refresherrefresh="onRefresh"
		 @refresherrestore="onRestore"
		  @refresherabort="onAbort"
		refresher-triggered="triggered" 	
		 -->
		<!-- <view @click="getAllMessage" style="position: absolute;left:50%;top:50%;background-color: #0077AA;color:#fff;transform: translate(-50%,-50%);z-index:1000;padding:40rpx;">获取所有消息</view> -->
		
		<scroll-view scroll-y 
		 class="history-section icon" 
		:lower-threshold="300"
		@scrolltolower="getmoreData()"
		 >
			<view style="height: 140rpx;width: 100%;"></view>
			<!-- 头部轮播 -->
			<view class="carousel-section">
				<swiper class="carousel" circular @change="changeCarousel" autoplay :interval="Number(fieldValue)">
					<swiper-item v-for="(item, index) in bannerList" :key="index" class="carousel-item">
						<!-- @click="navToDetailPage({title: '轮播广告'})" -->
						
						
<!-- 						<cache-img @click="openBanner(item, index)" :src="`${baseUrl}fyProHandle/file/download/${item.fileId}?rbacToken=${rbacToken}`"></cache-img> -->
<!-- 						<image-cache @click="openBanner(item, index)" :imgSrc="`${baseUrl}fyProHandle/file/download/${item.fileId}?rbacToken=${rbacToken}`"></image-cache> -->
						
						<image
						style="will-change: transform;"
							lazy-load
							fade-show="false"
							:src="`${baseUrl}fyProHandle/file/download/${item.fileId}?rbacToken=${rbacToken}&isCache=1`"
							@click="openBanner(item, index)"
						/>
<!-- 						<image
						style="will-change: transform;"
							lazy-load
							fade-show="false"
							:src="item.fileId"
							@click="openBanner(item, index)"
						/> -->
					</swiper-item>
				</swiper>
				<!-- 自定义swiper指示器 -->
				<view class="swiper-dots">
					<text class="num">{{ carouselIndex + 1 }}</text>
					<text class="sign">/</text>
					<text class="num">{{ bannerList.length }}</text>
				</view>
			</view>

			<!-- 分类 -->
			<view class="cate-section">
				<view class="cate-section-title">
					<view class="cate-item" @click="navTo('/pages/missonListXF/missonListXF')">
						<image src="/static/_new_index/home_patrol@2x.png"></image>
						<text>平安巡防</text>
					</view>
					<view class="cate-item" @click="navTo('/pages/missonListPA/missonListPA')">
						<image src="/static/_new_index/home_report@2x.png"></image>
						<text>平安任务</text>
					</view>
					<view class="cate-item" @click="bolNavTo('/pages/_new_weiwangge/_new_weiwangge')">
						<image src="/static/_new_index/home_grid@2x.png"></image>
						<text>微网格</text>
					</view>
					<!-- navTo('/pages/teachPA/teachPA')  -->
					<view class="cate-item" @click="isChange">
						<image src="/static/_new_index/home_answer@2x.png"></image>
						<text>挑战答题</text>
					</view>
					
					<!-- 			<view class="cate-item">
						<image src="/static/img/home_videoPatrol@2x.png"></image>
						<image src="/static/img/home_videoPatrol_gray@2x.png"></image>
						<text style="color:#ccc">视频巡查</text>
					</view> -->
			
			
				</view>
				<view class="cate-section-main">
					<view class="cate-item" @click="bolNavTo('/pages/roadblock/roadblock')">
						<image src="/static/_new_index/home_cardpoint@2x.png"></image>
						<text>防疫卡点</text>
					</view>
					<view class="cate-item" @click="navTo('/pages/teachPA/teachPA')">
						<image src="/static/_new_index/Shape1088copy3@2x.png"></image>
						<text>学习广场</text>
					</view>
					
			
					<view class="cate-item" @click="bolNavTo('/pages/fankuiAll/fankuiAll')">
						<image src="/static/_new_index/home_idea@2x.png"></image>
						<text>金点子</text>
					</view>
			
					<view class="cate-item" @click="bolNavTo('/pages/mall/mall')">
						<image src="/static/_new_index/VectorSmartObject@2x.png"></image>
						<text>平安商城</text>
					</view>
					<view class="cate-item" @click="bolNavTo('/pages/rankList/rankList')">
						<image src="/static/_new_index/VectorSmartObject1@2x.png"></image>
						<text>排行榜</text>
					</view>
					<!-- 			<view class="cate-item" @click="bolNavTo('/pages/_new_xinxishangbao/_new_xinxishangbao')">
									<image src="/static/img/home_shangbao@2x.png"></image>
									<text>信息上报</text>
								</view> -->
								<view class="cate-item" @click="navTo('/pages/petitioning/petitioning')">
									<image src="/static/_new_index/home_Petition@2x.png"></image>
									<text>平安综合体</text>
								</view>
				</view>
			</view>
			
			<!-- 
			v-if="showHuodong"  
			 -->
			<view v-if="showHuodong"  class="huodong-box" @click="navToAndSaveItem(activityInfos, '/pages/huodong/huodong')">
				<image class="huodong-bg" src="/static/huodong/home_activity_bg@2x.png"></image>
				<image class="right-icon" src="/static/huodong/home_activity_bt@2x.png"></image>
				<view class="inner">
					<view class="title">
						<text>{{ activityInfos.activityName }}</text>
						<text>{{ `${activityInfos.startTime} - ${activityInfos.endTime}` }}</text>
					</view>
					<view class="main">
						<image
							class="portrait"
							:src="
								userInfo.headImg && userInfo.headImg != ''
									? `${baseUrl}fyVolunteer/file/download/${userInfo.headImg}?rbacToken=${rbacToken}`
									: '/static/missing-face.png'
							"
						></image>
						<view class="right-side">
							<view class="sub-main">
								<text style="float:left;color:#fff;">{{ personInfo.districtName }}</text>
								<text style="float:right">排名{{ personInfo.rankNum }}</text>
							</view>
							<swiper autoplay circular class="huodong-swiper">
								<swiper-item v-for="item in awardList">预计奖励：{{ item.awardName }}</swiper-item>
							</swiper>
							<view class="sub-main"></view>
						</view>
					</view>
				</view>
			</view>
			
			
<!-- 			<image @click="isChange" class="huodong-tupian" src="/static/_new_index/home_exhibition@2x.png">
				 -->

			<view class="weidu" @click="navTo('/pages/sysMisson/sysMisson')">
				<image class="left-img" src="/static/_new_index/home_news@2x.png">
				<view class="main" v-if="noReadNum > 0">
					你有{{noReadNum}}条未读消息
					<text style="color:#999999" v-if="newDate == '' ? false :true">{{newDate}}</text>
				</view>
				<view class="main" v-else>
					查看消息
				</view>
				<view class="cir-box" v-if="noReadNum > 0 "></view>
				<image class="arrow" src="/static/_new_index/home_right@2x.png" ></image>
			</view>
<!-- 			<view class="teach-box">
				<new-left-line-title
				 title="学习广场"
				 right-title="更多"
				 @eventClick="goToInfo('/pages/teachListXX/teachListXX')"></new-left-line-title>
				<new-list-cell-teach
				noTime
				v-for="(item,index) in appList" 
				:item="item" 
				@eventClick="bolNavTo('/pages/teachInfoListXX/teachInfoListXX',item)"
				></new-list-cell-teach>
			</view>
 -->

			<!-- 更多平安学习 -->
			<view v-for="item in fileList"  v-if='item.list.length' class="teach-box">
				<new-left-line-title
				 v-bind:title="item.name"
				 right-title="更多"
				 @eventClick="goToInfo('/pages/teachListXX/teachListXX')"></new-left-line-title>
				<new-list-cell-teach
				noTime
				v-for="(item,index) in item.list" 
				:item="item" 
				@eventClick="bolNavTo('/pages/teachInfoListXX/teachInfoListXX',item)"
				></new-list-cell-teach>
			</view>
			
				
<!-- 			<view style="height: 200rpx;width: 100%;">
				
			</view> -->
		</scroll-view>
		
		</image>
		<uni-popup ref="popup" type="middle" msg="提示">
			<view class="default-item-box">
				<view class="text">您今日未签到,是否去签到?</view>
				<!-- <button class="bottom-float-button" type="red" @click="cancelPop">取消</button> -->
				<button class="bottom-float-button" type="red" @click="navTo('/pages/qiandao/qiandao')">确定</button>
			</view>
		</uni-popup>

		<view class="update-box" v-show="updateBox" :class="lineBarState ? 'hide-update-box-an' : '' "  >
			<view class="bg" @click="qiandao_success"></view>
			<view class="update-item no-animate">
				<view class="wrap-box">
					<view class="wrap-title">发现新版本</view>
					<view class="version">V{{ versionNumber }}</view>
					<view class="title">更新内容:</view>
					<scroll-view class="scroll-bar update-content" scroll-y="true">{{ versionExplain }}</scroll-view>
					<button class="btn" type="red" @click.stop="updateBtn">立即更新</button>
				</view>
				<image class="close-btn" src="/static/img/box_shut@2x.png" @click.stop="qiandao_success"></image>
				<image class="item-img gggg" src="/static/img/update_bg@2x.png"></image>
			</view>
		</view>


		<view class="guanggao" v-if="guanggaoState">
			<view class="portrait">
				<!-- <view class="text-view">{{ lostTime }}秒钟后关闭...</view> -->
				<image class="close-btn" src="/static/new/btn_close@2x.png" @click="guanggaoClose"></image>

				
				<image
					mode="widthFix"
					class="inner-img"
					:src="guanggao && guanggao != '' ? `${baseUrl}fyVolunteer/file/download/${guanggao}?rbacToken=${rbacToken}` : '/static/new/c.jpg'"
				></image>
				

								
			</view>
		</view>

		<view class="popup-box" v-show="showpopupBoxState" @click="hide_showpopupBoxState">
			<view class="inner-box" v-for="(item, index) in popBox" :class="item.checked ? 'hide-popup-box' : ''">
				<view class="inner-box-title">
					<text class="inner-box-title-text">提示</text>
					<image @click="handleClick(item, index)" class="inner-box-icon" src="/static/new/btn_close@2x.png" />
				</view>
				<view class="inner-box-mian">
					<view class="inner-box-main-item"><text class="inner-box-main-item-text">很抱歉,您的防疫志愿服务任务:</text></view>
					<view class="inner-box-main-item">
						<text class="inner-box-main-item-text">名称:</text>
						<text class="inner-box-main-item-text-red">{{ item.title }}</text>
					</view>
					<view class="inner-box-main-item">
						<text class="inner-box-main-item-text">日期:</text>
						<text class="inner-box-main-item-text-red">{{ item.message }}</text>
					</view>
					<view class="inner-box-main-item"><text class="inner-box-main-item-text">已被管理员取消,请选择其他业务。</text></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import newLeftLineTitle from '@/components/_new-left-line-title.vue';
import uniRate from '@/components/uni-rate/uni-rate.vue';
import uniPopup from '@/components/uni-popup/uni-popup.vue';
import newListCellTeach from "@/components/_new-list-cell-teach"
import cacheImg from "@/components/cache-img"
import imageCache from "@/components/image-cache/image-cache"
export default {
	components: {
		imageCache,
		cacheImg,
		uniPopup,
		uniRate,
		newListCellTeach,
		newLeftLineTitle
	},
	data() {
		return {
			noReadNum:"",
			newDate:"",
			updateBoxState:false,
			lineBarState:false,
			progress_num:0,
			myLocation:"",
			total:null,
			showMore:false,
			appList:[],
			pageNo:1,
			pageSize:20,
			guanggao: '',
			guanggao_load: false,
			animationData: {},
			showpopupBoxState_index: 0,
			showpopupBoxState: false,
			popBox: [],
			lostTime: 3,
			guanggaoState: false,
			fieldValue: 5000,
			bannerList: [],
			activityName: '',
			personInfo: [],
			awardList: [],
			showHuodong: false,
			baseUrl: getApp().globalData.baseUrl,
			rbacToken: getApp().globalData.rbacToken,
			hasGroupReadNum: '',
			rateNum: 0,
			rateNumLine: 0,
			userInfo: [],
			activityInfos: [],
			versionNumber: '',
			upgradeType: '',
			versionExplain: '',
			updateBox: false,
			titleNViewBackground: '',
			carouselIndex: 0,
			swiperLength: 0,
			carouselList: ['/static/banner/banner_activity@2x.png', '/static/banner/banner@2x.png'],
			goodsList: [],
			fileTypeList:[],
			fileList:[],
			loadFileIndex:0,
			showFileState:false
		};
	},
	
	computed:{
		_progress:()=>{
			// try{
			// 	return this.progress_num.toFixed(1);
			// }catch(e){
			// 	//TODO handle the exception
			// }			
		}
	},

	onReady() {
		
		this.user.loadBannerState = true;
		this.guanggao_load = true;
	},
	onShow() {
		// plus.push.createMessage("正在为您下载最新安装包", "LocalMSG", {cover:false});
		// this.loadMask();

		if(this.appList.length>0){
			
		}
		this.noReadNum=0;
		this.newDate="";
		// #ifdef APP-PLUS
		var webView = this.$mp.page.$getAppWebview();

		// 修改buttons
		// index: 按钮索引, style {WebviewTitleNViewButtonStyles }
		webView.setTitleNViewButtonBadge({
			index: 0,
			text: this.user.hasGroupReadNum >= 0 ? this.user.hasGroupReadNum : ''
		});
		// #endif
		if (getApp().globalData.rbacToken != '') {
			// this.selectById();
			// this.fySafeStudy();
			this.pageNo=1;
		}
		uni.hideToast();

		// // #ifdef MP-WEIXIN
		// this.defaultLogin();
		// //#endif

		//#ifdef H5 || APP-PLUS
		
		//在此为了进行初次登录的用户进行初次加载数据;因为不走onload 所以只用在第一次走
		if(this.user.loginState){
			this.beginApp(this.user.res);
			this.user.loginState = false;
			uni.setStorageSync('firstLoginIn',true);
		}
		// this.defaultLogin();
		//#endif
		
		//判断是否进行广告

	},
	onTabItemTap(){
		this.guanggaoState = false;
	},
	onUnload(){
		this.guanggaoState = false;
	},
	async onLoad() {
		// this.downloadFile();
		uni.showLoading();
		const user = await this.judgeLogin();
		if(!user){
			this.navTo("/pages/login/login");
			return ;
		}
		let res = await this.defaultLogin(user);
		
		this.beginApp(res);
		
		uni.$on("guanggao_state",()=>{
			this.guanggao_state();
		});

		const _this = this;

		try {
			App.getLocation();
		} catch (e) {
			//TODO handle the exception
		}
		
		

		
		
		uni.getLocation({
			altitude: true,
			geocode: true, //默认false，是否解析地址信息
			// type: 'wgs84',
			type: 'gcj02',
			success: function(res) {
				const _ad = res.address;
				uni.hideLoading();

				_this.myLocation = `${_ad.district}${_ad.street}${_ad.streetNum}${_ad.poiName}`; 
				_this.user.longitude = res.longitude;
				_this.user.latitude = res.latitude;
			},
			fail: function(res) {
				console.log('调用失败');
			},
			complete: function(res) {}
		});
		
		
		this.getProvider();
		this.loadData();


		// this.defaultLogin();
	},
	methods: {
		getAllMessage(){
			
			var getAllMessage = plus.push.getAllMessage();
			var getClientInfo = plus.push.getClientInfo();
			 
		},
		guanggao_state(){
			//不签到说明今天完了
			//开启傻逼广告
			uni.hideTabBar();
			if(this.guanggao && this.guanggao !=''){
				this.guanggao_load = false;
				this.guanggaoState = true;
			}else{
				this.updateState();
			}

			// this.guanggaoOpen();
		},
		loadMask(){
			var nvMask = new plus.nativeObj.View("nvMask", { //先创建遮罩层
				top: '0px',
				left: '0px',
				height: '100%',
				width: '100%',
				backgroundColor: 'rgba(0,0,0,0.8)'
			});
			var nvImageMenu = new plus.nativeObj.View("nvImageMenu", { //创建底部图标菜单
				bottom: '0px',
				left: '0px',
				right:'0px',
				top:'0px',
				height: '264px',
				width: '300px',
				backgroundColor: 'rgb(255,255,255)'
			});
			
			nvMask.show();
			nvImageMenu.show();
			nvImageMenu.addEventListener("click", function() { //处理遮罩层点击
				nvMask.hide();
				nvImageMenu.hide();
			})
			nvMask.addEventListener("click", function() { //处理遮罩层点击
				nvMask.hide();
				nvImageMenu.hide();
			})
			
		},
		async beginApp(res){
			this.showHuodong = res.data.data.activityStatus === 0 ? false : true;
			// this.showHuodong = true;
			getApp().globalData.rbacToken = res.data.data.rbacToken;
			this.user.rbacToken = res.data.data.rbacToken;
			this.rbacToken = res.data.data.rbacToken;
			this.user.hasTeam = res.data.data.hasTeam;
			this.user.hasMarket = res.data.data.hasMarket;
			this.user.hasDepart = res.data.data.hasDepart;
			this.user.userId = res.data.data.userId;
			this.user.reviewStatus = res.data.data.reviewStatus;
			
			
			this.versionExplain = res.data.data.versionExplain;
			this.versionUrl = res.data.data.versionUrl;
			this.upgradeType = res.data.data.upgradeType;
			this.versionNumber = res.data.data.versionNumber;
			this.user.isSign = res.data.data.isSign;

			this.user.headImg = res.data.data.headImg;
			this.noReadNum = res.data.data.noReadNum ? res.data.data.noReadNum : 0;
			this.newDate = res.data.data.newDate ? res.data.data.newDate : ""
			
			//是网格员还是网格长
			// 后台(wuhongchao)觉得自己很菜 搞不出更好的方法
			if (res.data.data.microGridId || res.data.data.isGrid) {
				this.user.gridType = res.data.data.isGrid;
				this.user.microGridId = res.data.data.microGridId;
			} else {
				this.user.microGridId = '';
				this.user.gridType = 0;
			}
			
			
			// uni.showTabBar();
			
			// this.user.gridType = 1;
			// this.user.microGridId = '000619bd70d1486a884671d6ee54ce67';
			this.guanggao = res.data.data.publicityBanner.fileId;
			this.activityInfos = res.data.data.activityInfos[0];
			
			//读取活动的数据 真他么操蛋
			if (this.activityInfos) {
				this.getActivityRankForHomePage();
			}
			//
			//获取数据
			this.selectById();
			if(this.user.loadBannerState){
				
				//轮播图
				this.getBannerList();
				this.user.loadBannerState = false;
			}
			//获取是否有任务
			this.getUnreadMessageList();
			//轮播图秒数也要获取
			this.getFyKeyConfig();	
			
			///学习的b玩意
			
			this.fySafeStudy();
						
			//判断是否要进行签到		
			if (this.user.isSign == 0 && (this.user.reviewStatus == 1 || this.user.reviewStatus == 3)) {
				// this.$refs.popup.open();
				this.navTo('/pages/qiandao/qiandao');
			}else{
				this.guanggao_state();
			}
								
			this.user.searchOptionText = uni.getStorageSync('searchOptionText')
			this.user.searchOptionText_id = uni.getStorageSync('searchOptionText_id')
			
			
			/* 加载学习类型 */
			const getFiled = await this.getFiled();
			//默认获取学习的接口
			this.getMoreStydyFiledData();
			
		},
		
	image_cache(image_url,image_name,call_back) {
		try {
		    const value = uni.getStorageSync(image_name);
			
		    if (value != "") {
		       return value;
		    }else{
				uni.downloadFile({
					url: image_url,
					success: (res) => {
						if (res.statusCode === 200) {
							uni.setStorage({
								key:image_name,
								data:res,
								success:function(){
								}
							})
						}
					}
				}); 
				return image_url;
			}
		} catch (e) {
			
		}
			
		},
		location(){
			const _this = this;
			uni.chooseLocation({
				success: function (res) {
					
					const ss= res.address.indexOf("浙江省温州市");
					ss>=0 ? _this.myLocation = res.address.split("浙江省温州市")[1] : _this.myLocation = res.address;
					
					_this.user.longitude = res.longitude;
					_this.user.latitude = res.latitude;
				}
			});
		},
		
		//扫一扫
		saoyisao(state) {
			const _this = this;
			try {
				uni.scanCode({
					onlyFromCamera: true,
					success: function(res) {
						console.log('条码类型：' + res.scanType);
						console.log('条码内容：' + res.result);
						// const result = JSON.parse(res.result);
						const result = res.result;
						if (result) {
							_this.loadingState();
							_this.applyTeam(result);
						}
					}
				})
			} catch (e) {
				console.log("不支持扫码")
			}
		
		},
		//请求加入团队的接口
		applyTeam(teamId) {
			this.$http.get('fyVolunteer/apply/team', {
					teamId: teamId,
					rbacToken: this.user.rbacToken
				})
				.then(res => {
		
					uni.hideLoading()
					if (res.data.success === 1) {
						uni.showToast({
							icon: 'none',
							title: "已成功申请团队,请等待队长审核"
						});
					} else {
						uni.showToast({
							icon: 'none',
							title: res.data.message
						});
					}
				})
		},
		
		shareAPP(){
			debugger
			plus.share.sendWithSystem({
				type:"image",
				pictures:["/static/shareApp.png"],
				}, function(){
					console.log('分享成功');
				}, function(e){
					console.log('分享失败：'+JSON.stringify(e));
				});
				
			// plus.share.sendWithSystem({
			// 	type:"web",
			// 	title:'平安联盟',
			// 	content:'平安联盟',
			// 	href:'http://115.223.34.195:8090/app/download.html',
			// 	}, function(){
			// 		console.log('分享成功');
			// 	}, function(e){
			// 		console.log('分享失败：'+JSON.stringify(e));
			// 	});
				
			// uni.share({
			//     provider: "weixin",
			//     scene: "WXSceneSession",
			//     type: 0,
			//     title: "平安联盟",
			//     summary: "平安联盟",
			//     imageUrl: "/static/PALM_loog.png",
			// 	href:'http://115.223.34.195:8090/app/download.html',
			//     success: function (res) {
			//       uni.showToast({
			// 		icon: 'none',
			// 		title: "分享成功!"
			//       });
			//     },
			//     fail: function (err) {
			//         console.log("fail:" + JSON.stringify(err));
			//     }
			// });
			
			
		},
		
		isChange(){
			
			// this.bolNavTo('/pages/teachInfoListNew/teachInfoListNew',{});
			this.bolNavTo('/pages/teacherWelcome/teacherWelcome',{});
			const _this = this;
			//判断答题
			// if(this.user.reviewStatus != 1){
			// 		uni.showToast({
			// 			icon:'none',
			// 			title: "请进行实名认证"
			// 		});
			// }else{
			// 	this.$http.get('fyPeaceStudy/fySafeQuestion/isChange', {
			// 		rbacToken:this.user.rbacToken
			// 		})
			// 		.then(res => {
			// 			if (res.data.success == 1) {
			// 				_this.navToAndSaveItem({},'/pages/teachInfoListNew/teachInfoListNew')
			// 			}else{
			// 				uni.showToast({
			// 					icon:'none',
			// 					title: res.data.message
			// 				});
			// 			}
			// 		})
			// 	
			// }
		
		},
			onPulling(e) {
                console.log("onpulling", e);
            },
            onRefresh() {
                if (this._freshing) return;
                this._freshing = true;
                setTimeout(() => {
                    this.triggered = false;
                    this._freshing = false;
                }, 3000)
            },
            onRestore() {
                this.triggered = 'restore'; // 需要重置
                console.log("onRestore");
            },
            onAbort() {
                console.log("onAbort");
            },
		getmoreData(){

			// if(Math.ceil(this.total/this.pageSize)<=this.pageNo){
			// 	if(!this.showMore){
			// 		this.showMore = true;
			// 		// uni.showToast({
			// 		// 	icon:'none',
			// 		// 	title: "没有更多了.",
			// 		// 	success:()=>{
			// 		// 		this.showMore = true;
			// 		// 	}
			// 		// });
			// 	}
			// 	this.getMoreStydyFiledData();
			// 	return ;
			// }
			uni.showToast({
				icon : "none",
				title:"正在加载,请稍等...",
				duration:9999,
				mask:true
			})
			this.getMoreStydyFiledData();
			
			// this.fySafeStudy("concat")
			
			
		},
		
		/* 根据平安学习的分类获取分类数据 */
		getMoreStydyFiledData() {

			console.log(this.fileList)
			this.loadingState();
			var type="";
			if(this.fileList.length-1<this.loadFileIndex){
				this.fileList[this.loadFileIndex]={
					name:this.fileTypeList[this.loadFileIndex].name,
					list:[],
					total:-1,
					pageNo:1
				}
			}
			/* 判断是首次加载还是数据连接 */
			if(this.fileList.length<this.fileTypeList.length){
				if(this.fileList[this.loadFileIndex].pageNo<this.fileList[this.loadFileIndex].total/20){
					this.fileList[this.loadFileIndex].pageNo=this.fileList[this.loadFileIndex].pageNo+1;
					type='concat'
				}else if(this.fileList[this.loadFileIndex].total!=-1){
					if(this.loadFileIndex<this.fileTypeList.length){
						this.loadFileIndex++;
						this.fileList[this.loadFileIndex]={
							name:this.fileTypeList[this.loadFileIndex].name,
							list:[],
							total:0,
							pageNo:1
						}
					}
				}
			}else{
				uni.hideLoading()
				if(!this.showFileState){
					uni.showToast({
						icon:'none',
						title: "没有更多了.",
						success:()=>{
							this.showFileState = true;
						}
					});
				}
				return
			}
			this.$http.get('fyPeaceStudy/fySafeStudy/getAppList', {
				rbacToken:this.user.rbacToken,
				pageNo:this.fileList[this.loadFileIndex].pageNo,
				pageSize:5,
				type: this.fileTypeList[this.loadFileIndex].id,
				// format: 1
				})
				.then(res => {
					uni.hideLoading()
			
					if (res.data.success == 1) {
						if(type =="concat"){
							this.fileList[this.loadFileIndex].list= this.fileList[this.loadFileIndex].list.concat(res.data.data.list);
							uni.hideToast();
						}else{
							this.fileList[this.loadFileIndex].list= res.data.data.list;
						}
						this.fileList[this.loadFileIndex].total = res.data.data.total;	
						if(this.fileList[this.loadFileIndex].total==0){
							this.getMoreStydyFiledData();
						}
						this.$forceUpdate();
					}else{
						uni.showToast({
							icon:'none',
							title: res.data.message
						});
					}
				})
		},
		
		//获取学习
		fySafeStudy(type) {
			this.loadingState();
			
			this.$http.get('fyPeaceStudy/fySafeStudy/getAppList', {
				rbacToken:this.user.rbacToken,
				pageNo:this.pageNo,
				pageSize:20
				})
				.then(res => {
					uni.hideLoading()

					if (res.data.success == 1) {
						if(type =="concat"){
							this.appList = this.appList.concat(res.data.data.list);
							uni.hideToast();
						}else{
							this.appList = res.data.data.list;
						}
						this.total = res.data.data.total;	
						
					}else{
						uni.showToast({
							icon:'none',
							title: res.data.message
						});
					}
				})
		},
		

				
				
		hide_showpopupBoxState() {
			this.showpopupBoxState = false;
		},
		//关闭弹窗
		handleClick(item, index) {
			const _this = this;
			this.popBox[index].checked = true;
			this.showpopupBoxState_index = this.showpopupBoxState_index - 1;
			if (this.showpopupBoxState_index <= 0) {
				setTimeout(() => {
					_this.showpopupBoxState = false;
				}, 500);
			}
		},
		//
		guanggaoClose() {
			uni.showTabBar();
			this.guanggaoState = false;
			this.updateState();
		},
		guanggaoOpen() {
			let _this = this;
			setTimeout(() => {
				_this.lostTime = _this.lostTime - 1;
				_this.lostTime <= 0 ? (_this.guanggaoState = false) : _this.guanggaoOpen();
			}, 1000);
		},

		//傻逼的轮播图时间获取
		// /fyVolunteer/fyKeyConfig/getFyKeyConfig
		getFyKeyConfig() {
			this.$http
				.get('fyVolunteer/fyKeyConfig/getFyKeyConfig', {
					fieldKey: 'bannersChangeTime',
					rbacToken: this.user.rbacToken
				})
				.then(res => {
					if (res.data.success == 1) {
						this.fieldValue = res.data.data.fieldValue * 1000;
					}
				});
		},
		//获取未读消息
		// /fyVolunteer/fyKeyConfig/getFyKeyConfig
		getUnreadMessageList() {
			// if(this.popBox.length>0){
			// 	this.showpopupBoxState_index = this.popBox.length;
			// 	this.showpopupBoxState = true;
			// }

			this.$http
				.get('fyTaskManage/peaceTaskApp/getUnreadMessageList', {
					rbacToken: this.user.rbacToken,
					messageType: 2
				})
				.then(res => {
					if (res.data.success == 1) {
						this.popBox = res.data.data;
						this.popBox.map((item, idx) => {
							item.checked = false;
						});
						if (this.popBox.length > 0) {
							this.showpopupBoxState_index = this.popBox.length;
							this.showpopupBoxState = true;
						}
					}
				});
		},
		//
		openBanner(item, idx) {
			debugger
			// 链接类型 0 无 1文章 2活动 3网页链接
			switch (item.linkType.toString()) {
				case '0':
					break;
				case '1':
					this.navToAndSaveItem(item, '/pages/bannerInfo/bannerInfo');
					break;
				case '2':
					this.navToAndSaveItem(item, '/pages/huodong/huodong');
					break;
				case '3':
					this.navToAndSaveItem(item, '/pages/webView/webView');
					break;
			}
		},
		//轮播图
		getBannerList() {
			this.$http
				//fyTaskManage/fyBanners/getFyBannersList
				.get('fyTaskManage/fyBanners/getFyBannersList', {
					rbacToken: this.user.rbacToken
				})
				.then(res => {
					if (res.data.success == 1) {
						this.bannerList = res.data.data.list;
					}
				});
		},
		showSwiper(idx) {
			// return;
			if (idx == 0) {
				this.navToAndSaveItem(this.activityInfos, '/pages/huodong/huodong');
			}
		},

		updateBtn() {
			// this.downloadFile();
			//动画函数
			this.updateBoxAn();
			
			if (this.versionUrl) {
				plus.push.createMessage("正在为您下载最新安装包", "LocalMSG", {cover:false});
				this.downloadTask =uni.downloadFile({
					url: this.versionUrl,
					success: downloadResult => {
						if (downloadResult.statusCode === 200) {
							
							plus.push.createMessage("下载完毕,正在为您安装最新版本,请等待...", "LocalMSG", {cover:false});
							
							if (this.upgradeType == 1) {
								uni.showToast({
									icon: 'none',
									title: '下载更新包成功,正在更新...'
								});
							}
							plus.runtime.install(
								downloadResult.tempFilePath,
								{
									force: true
								},
								function(e) {
									uni.showToast({
										icon: 'none',
										title: '更新完成,准备重启程序...',
										complete: () => {
											setTimeout(() => {
												uni.hideLoading();
												console.log(e.message);
												plus.runtime.restart();
											}, 1500);
										}
									});
								},
								function(e) {
									uni.showToast({
										icon: 'none',
										title: '更新失败,请稍后再试',
										complete: () => {
											uni.hideLoading();
											console.log(e.message);
											plus.runtime.restart();
										}
									});
									console.error(e.message);
								}
							);
						}
					},
					fail:()=>{
						plus.push.createMessage("下载失败,请重启程序进行更新操作", "LocalMSG", {cover:false});
					}
				});
				
				
				this.downloadTask.onProgressUpdate((res) => {
					this.progress_num = (res.totalBytesWritten/res.totalBytesExpectedToWrite*100).toFixed(1);
				    console.log('下载进度' + res.progress);
				    console.log('已经下载的数据长度' + res.totalBytesWritten);
				    console.log('预期需要下载的数据总长度' + res.totalBytesExpectedToWrite);
					
				});	
			}
		},
		downloadFile(){
			
			this.downloadTask =uni.downloadFile({
				url: "http://gdown.baidu.com/data/wisegame/283e9789be54e63c/weixin_1560.apk",
				success: downloadResult => {
					if (downloadResult.statusCode === 200) {
						if (this.upgradeType == 1) {
							uni.showToast({
								icon: 'none',
								title: '下载更新包成功,正在更新...'
							});
						}
					}
				}
			});
			
			this.downloadTask.onProgressUpdate((res) => {
				
				this.progress_num = (res.totalBytesWritten/res.totalBytesExpectedToWrite*100).toFixed(1);
				
			    console.log('下载进度' + res.progress);
			    console.log('已经下载的数据长度' + res.totalBytesWritten);
			    console.log('预期需要下载的数据总长度' + res.totalBytesExpectedToWrite);
			
			    // // 测试条件，取消下载任务。
			    // if (res.progress > 50) {
			    //     downloadTask.abort();
			    // }
				
			});
		},
		qiandao_success() {
			
			this.updateBox = false;
			uni.showTabBar();
		},
		updateBoxAn(){
			
			this.lineBarState = true;
			setTimeout(()=>{
				this.updateBox = false;
				uni.showTabBar();
			},1000)
			
			
		},

		getProvider() {


			const _self = this;  
			const _handlePush1 = (message)=> {

			};  
			const _handlePush2 = (message)=> {
				var url;
				var item = JSON.parse(message.payload);
				this.noReadNum=this.noReadNum++;
				this.newDate = item.newDate ;
				setTimeout(()=>{
					switch(item.messageType){
						case 0:
						return ;
						break;
						case 2:
						return ;
						item.id = item.taskId;
						url= '/pages/roadLockMissonDetailBegin/roadLockMissonDetailBegin'
						break;
						case 3:
						item.id = item.taskId;
						item.formPublishId = item.taskId;
						url= '/pages/_new_xinxishangbao_add/_new_xinxishangbao_add';
						break;
						case 4:
						item.id = item.taskId;
						url= "/pages/personMissonDetailBegin/personMissonDetailBegin"
						break;
						case 5:
						item.id = item.taskId;
						url= "/pages/_new_screeningDetail/_new_screeningDetail"
						break;
						case 6:
						item.id = item.taskId;
						url= "/pages/_new_systemDetail/_new_systemDetail"
						break;
					}
					this.navToAndSaveItem(item,url);
				},500)
				
			};  
			plus.push.addEventListener('click', _handlePush1);  
			plus.push.addEventListener('receive', _handlePush2);  


			uni.getProvider({
				service: 'push',
				success: function(res) {
					
					// uni.showToast({
					// 	mask: true,
					// 	icon: 'none',
					// 	title: JSON.stringify(res.provider)
					// });
					// 个推的名称为 igexin
					//unipush
					if (~res.provider.indexOf('unipush')) {
						
						uni.subscribePush({
							provider: 'unipush',
							// success: function(res) {
							// 	uni.showToast({
							// 		mask: true,
							// 		icon: 'none',
							// 		title: 'success:' + JSON.stringify(res)
							// 	});
							// }
						});
						
					}
				}
			});
		
		
		},
		changeCarousel(event) {
			this.carouselIndex = event.detail.current;
		},
		async judgeLogin(){
			const userInfo = uni.getStorageSync('userInfo');
			if (userInfo == '') {
				return false;
			}
			const user = JSON.parse(userInfo);
			if (user.phone == '' || user.passWord == '') {
				return false;
			}
			return user;
		},
		async defaultLogin(user) {
			if(!user){
				return ;
			}
			console.log('当前user  ' + JSON.stringify(user));
			let res = await this.$http
				.get('fyVolunteer/user/login', {
					phone: user.phone,
					passWord: user.passWord
				})
				.then(res => {
					uni.hideLoading();
					if (res.data.success == 1) {
						// uni.showToast({
						// 	icon:'none',
						// 	title: "登录成功"
						// });
						console.log('当前Token' + res.data.data.rbacToken);
						//为了兼容安卓端
						return res;				
					} else {
						uni.showToast({
							mask: true,
							icon: 'none',
							title: res.data.message
						});
						// this.navTo("/pages/login/login")
					}
				});
		
			return res;
			},

		getActivityRankForHomePage() {
			const _this = this;
			this.$http
				.get('fyActivity/activityApp/getActivityRankForHomePage', {
					id: this.activityInfos.activityId,
					rbacToken: this.user.rbacToken
				})
				.then(res => {
					if (res.data.success === 1) {
						_this.personInfo = res.data.data.personInfo;
						_this.awardList = res.data.data.awardList;
					} else {
						uni.showToast({
							icon: 'none',
							title: res.data.message
						});
					}
				});
		},
		selectById() {
			this.$http
				.get('fyVolunteer/fySafeUseUser/selectById', {
					rbacToken: this.user.rbacToken
				})
				.then(res => {
					if (res.data.success === 1) {
						this.userInfo = res.data.data;
						this.user.userInfo = res.data.data;
						this.hasTeam = this.userInfo.hasTeam;
						this.apply = this.userInfo.apply;
						this.user.reviewStatus = this.userInfo.reviewStatus;
						this.user.headImg = res.data.data.headImg;
						this.user.hasSystemRead = res.data.data.hasSystemRead;
						this.hasGroupReadNum = res.data.data.hasGroupReadNum;
						this.setNowLine();
					} else {
						uni.showToast({
							icon: 'none',
							title: res.data.message
						});
					}
				});
		},
		setNowLine() {
			setTimeout(() => {
				this.rateNum = this.userInfo.levelRight - this.userInfo.levelLeft - this.userInfo.allIntegral;
				this.rateNumLine = this.userInfo.allIntegral / (this.userInfo.levelRight - this.userInfo.levelLeft);
			}, 500);
		},
		updateState(){
			const _this = this;
			//判断app是否需要更新
			// #ifdef APP-PLUS
			try{
				plus.runtime.getProperty(plus.runtime.appid, widgetInfo => {
					_this._updateState(widgetInfo.version, _this);
				});
				
			}catch(e){
				
			}
			// #endif

		},
		
		
		/* 获取学习广场学习分类 */
		async getFiled(){
1
			await this.$http
				.get('fyPeaceStudy/fySafeStudy/getFiled', {
					rbacToken: this.user.rbacToken
				})
				.then(res => {
					if (res.data.success === 1) {
						this.fileTypeList = res.data.data.filed;
					} else {
						uni.showToast({
							icon: 'none',
							title: res.data.message
						});
					}
				});
		},
		
		
		async loadData() {}
	},

	

	watch: {
		updateBox(val) {
			this.versionExplain = this.user.versionExplain;
			this.versionUrl = this.user.versionUrl;
			this.upgradeType = this.user.upgradeType;
			this.versionNumber = this.user.versionNumber;
		}
	}
};
</script>

<style lang="scss">
	.history-section {
		flex:1;
		height:0;
		}
	.phone-title{
		background: #eee;
		position: fixed;
		width: 100%;
		height: 60rpx;
		z-index:100;
		overflow: hidden;
		
	}
	.teach-box{
			width: 690rpx;
			padding:20rpx;
			background-color: #ffffff;
			border-radius: 10rpx 10rpx 0rpx 0rpx;
			overflow: hidden;
			margin:14rpx 30rpx;
	}
	.content{
		background: #eee;
	}
	.weidu{
		display: inline-block;
			padding:13rpx;
			width: 690rpx;
			
			line-height:110rpx;
			background-color: #ffffff;
			border-radius: 10rpx;
			margin: 0 30rpx;
			font-size: 28rpx;
			position: relative;
			.left-img{
				width: 140rpx;
				height: 110rpx;
				margin-right: 30rpx;
				float: left;
			}
			.main{
				
			}
			.cir-box{
				width: 15rpx;
				height: 15rpx;
				border-radius: 50%;
				background: #E32417;
				right:70rpx;
				position: absolute;
				top: 50%;
				transform: translateY(-50%);
			}
			.arrow{
				width: 15rpx;
				height: 20rpx;
				right:40rpx;
				position: absolute;
				top: 50%;
				transform: translateY(-50%);
			}
			
	}
	.huodong-tupian{
			width: 690rpx;
			height: 138rpx;
			margin: 8rpx 30rpx;

	}
.title-box-index {
	
	background: #eee;
	position: fixed;
	top:60rpx;
	width: 100%;
	height: 80rpx;
	padding: 0 20rpx;
	border-bottom: 0;
	z-index:100;
	overflow: hidden;
	.left-icon {
		margin-left: 20rpx;
		width: 35rpx;
		height: 44rpx;
		float: left;
		position: relative;
		top: 50%;
		transform: translateY(-50%);
	}

	.right-b {
		white-space:nowrap;

		position: relative;
		top: 50%;
		transform: translateY(-50%);
		font-size: 30rpx;
		height: 36rpx;
		letter-spacing: 0px;
		color: #3984f3;
		float: left;
		width: 65%;
		margin-left:15rpx;
	}
	.right-icon {
		margin: 0 17rpx;
		position: relative;
		top: 50%;
		transform: translateY(-50%);
		float: right;
		width: 46rpx;
		height: 46rpx;
	}
}

.hide-popup-box {
	transform: translate(-50%, -50%) scale(0) !important;
	transition: all 0.5s;
}
.popup-box {
	position: absolute;
	left: 0;
	top: 0;
	bottom: 0;
	right: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.5);

	.inner-box {
		overflow: hidden;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		background: #fff;
		width: 600upx;
		height: 400upx;
		font-size: 30upx;
		.inner-box-title {
			padding: 0 40upx;

			background-color: #efefef;
			width: 100%;
			justify-content: space-between;
			border-bottom-color: #eeeeee;
			border-bottom-width: 1px;
			display: flex;
			flex-flow: row nowrap;
		}
		.inner-box-mian {
			padding:0 20rpx;
			margin-top: 40upx;
		}
		.inner-box-title-text {
			line-height: 80upx;
		}

		.inner-box-icon {
			margin-top: 15upx;
			width: 60upx;
			height: 60upx;
		}
		.inner-box-main-item {
			width: 100%;
			flex-direction: row;
		}
		.inner-box-main-item-text {
			margin-top: 20upx;
			// margin-left: 40upx;
			line-height: 40upx;
		}
		.inner-box-main-item-text-red {
			margin-top: 20upx;
			line-height: 60upx;
			color: #e32417;
		}
	}
}
.guanggao {
	.portrait {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		width: 692upx;

		display: flex;
		flex-flow: column nowrap;
	}
	.inner-img {
		width: 100%;
		flex: 1;
	}
	.text-view {
		margin-bottom: 10upx;
		width: 100%;
		min-height: 30upx;
		max-height: 30upx;
		color: #fff;
	}
	.close-btn {
		position: absolute;
		right: -20upx;
		top: -0upx;
		z-index: 100;
		width: 60upx;
		height: 60upx;
	}
	position: fixed;
	width: 100%;
	height: 100%;
	left: 0;
	top: 0;
	right: 0;
	bottom: var(--window-bottom);
	background: rgba(0, 0, 0, 0.5);
	z-index: 100000;
}

	.line-bar-an{
		opacity: 1 !important;
	}
	.line-bar {
		transition: all 0.75s;
		opacity: 0;
		width: 100%;
		margin:0 auto;
		height: auto;
		position: absolute;
		top:134rpx;
		z-index:1000;
		.lines {
			width: 100%;
			height: 16upx;
			/* border: 1px solid #ff9790; */
			// border-radius: 16upx;
			position: relative;
			.wrap-line {
				width: 100%;
				height: 8upx;
				// border-radius: 8upx;
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-50%, -50%);
				background:#e7c6be;
				.inner-line {
					transition: all 2s;
					width: 0%;
					height: 8upx;
					border-radius: 8upx;
					position: absolute;
					/* background: linear-gradient(90deg, #ff7200 0%, #ffff00 100%); */
					background-color: #e8040a;
				}
			}
		}
		.sub-text {
			font-size: 20upx;
			width: 100%;
			color: #ff9790;
			.text {
				&:first-child {
					margin-left: -15upx;
					float: left;
				}
				&:last-child {
					margin-right: -15upx;
					float: right;
				}
			}
		}
	}


.user-info-box {
	background: #e32417;
	font-size: $font-base;
	padding: 20upx;
	color: #fff;
	padding-top: 60upx;
	display: flex;
	align-items: center;

	.info-box {
		width: 70%;
		margin-left: 20upx;
		.rate-box {
			display: inline-block;
		}
	}
	.rongyu {
		color: #ffbe00;
	}
	.portrait {
		width: 100upx;
		height: 100upx;
		border: 5upx solid #fff;
		border-radius: 50%;
		float: left;
	}

	.right-side-box {
		font-size: 20upx;
		position: absolute;
		right: 40upx;
		width: 160upx;
		height: 100upx;
		.right-icon {
			width: 40upx;
			height: 40upx;
			position: relative;
			float: right;
			.img {
				width: 100%;
				height: 100%;
				position: absolute;
			}
			.txt {
				padding: 4upx;
				border: 1px solid #fff;
				color: #fff;
				background: #e32417;
				position: absolute;
				font-size: 16upx;
				top: -15upx;
				right: -14upx;
				transform: scale(0.8);
				min-width: 30upx;
				min-height: 30upx;
				text-align: center;
			}
		}
	}

	.renzheng_box {
		background: rgba(0, 0, 0, 0.3);
		padding: 10upx 20upx;
	}

	.username {
		font-size: $font-lg;
		margin-left: 20upx;
	}

	.sub-name {
		padding-bottom: 10upx;
		font-size: 20upx;

		.left-icon {
			width: 20upx;
			height: 24upx;
			margin-right: 10upx;
		}
	}
}

.default-item-box {
	position: relative;
	width: 300upx;
	height: 150upx;
}

/* #ifdef MP */
.mp-search-box {
	position: absolute;
	left: 0;
	top: 30upx;
	z-index: 9999;
	width: 100%;
	padding: 0 80upx;

	.ser-input {
		flex: 1;
		height: 56upx;
		line-height: 56upx;
		text-align: center;
		font-size: 28upx;
		color: $font-color-base;
		border-radius: 20px;
		background: rgba(255, 255, 255, 0.6);
	}
}


page {


	.carousel-section {
		padding: 20upx 0;
		padding-top: 0 !important;
		.titleNview-placing {
			padding-top: 0;
			height: 0;
		}

		.carousel {
			.carousel-item {
				padding: 0;
			}
		}

		.swiper-dots {
			left: 45upx;
			bottom: 40upx;
		}
	}
}

/* #endif */

page {
	background: #f5f5f5;
}

.m-t {
	margin-top: 16upx;
}

/* 头部 轮播图 */
.carousel-section {
	position: relative;
	padding: 20upx 30upx 0 30upx;

	.titleNview-placing {
		height: var(--status-bar-height);
		// padding-top: 44px;
		box-sizing: content-box;
	}

	.titleNview-background {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 330upx;
		transition: 0.4s;
	}
}

.carousel {
	width: 100%;
	height: 232rpx;

	.carousel-item {
		width: 100%;
		height: 100%;
		overflow: hidden;
	}

	image {
		width: 100%;
		height: 100%;
		border-radius: 10upx;
	}
}

.swiper-dots {
	display: flex;
	position: absolute;
	left: 60upx;
	bottom: 15upx;
	width: 72upx;
	height: 36upx;
	background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAABkCAYAAADDhn8LAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTMyIDc5LjE1OTI4NCwgMjAxNi8wNC8xOS0xMzoxMzo0MCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTk4MzlBNjE0NjU1MTFFOUExNjRFQ0I3RTQ0NEExQjMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTk4MzlBNjA0NjU1MTFFOUExNjRFQ0I3RTQ0NEExQjMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6Q0E3RUNERkE0NjExMTFFOTg5NzI4MTM2Rjg0OUQwOEUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6Q0E3RUNERkI0NjExMTFFOTg5NzI4MTM2Rjg0OUQwOEUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4Gh5BPAAACTUlEQVR42uzcQW7jQAwFUdN306l1uWwNww5kqdsmm6/2MwtVCp8CosQtP9vg/2+/gY+DRAMBgqnjIp2PaCxCLLldpPARRIiFj1yBbMV+cHZh9PURRLQNhY8kgWyL/WDtwujjI8hoE8rKLqb5CDJaRMJHokC6yKgSCR9JAukmokIknCQJpLOIrJFwMsBJELFcKHwM9BFkLBMKFxNcBCHlQ+FhoocgpVwwnv0Xn30QBJGMC0QcaBVJiAMiec/dcwKuL4j1QMsVCXFAJE4s4NQA3K/8Y6DzO4g40P7UcmIBJxbEesCKWBDg8wWxHrAiFgT4fEGsB/CwIhYE+AeBAAdPLOcV8HRmWRDAiQVcO7GcV8CLM8uCAE4sQCDAlHcQ7x+ABQEEAggEEAggEEAggEAAgQACASAQQCCAQACBAAIBBAIIBBAIIBBAIABe4e9iAe/xd7EAJxYgEGDeO4j3EODp/cOCAE4sYMyJ5cwCHs4rCwI4sYBxJ5YzC84rCwKcXxArAuthQYDzC2JF0H49LAhwYUGsCFqvx5EF2T07dMaJBetx4cRyaqFtHJ8EIhK0i8OJBQxcECuCVutxJhCRoE0cZwMRyRcFefa/ffZBVPogePihhyCnbBhcfMFFEFM+DD4m+ghSlgmDkwlOgpAl4+BkkJMgZdk4+EgaSCcpVX7bmY9kgXQQU+1TgE0c+QJZUUz1b2T4SBbIKmJW+3iMj2SBVBWz+leVfCQLpIqYbp8b85EskIxyfIOfK5Sf+wiCRJEsllQ+oqEkQfBxmD8BBgA5hVjXyrBNUQAAAABJRU5ErkJggg==);
	background-size: 100% 100%;

	.num {
		width: 36upx;
		height: 36upx;
		border-radius: 50px;
		font-size: 24upx;
		color: #fff;
		text-align: center;
		line-height: 36upx;
	}

	.sign {
		position: absolute;
		top: 0;
		left: 50%;
		line-height: 36upx;
		font-size: 12upx;
		color: #fff;
		transform: translateX(-50%);
	}
}

/* 分类 */
.cate-section {
	display: inline-block;
	width: 690rpx;
	background-color: #ffffff;
	box-shadow: 0rpx 0rpx 15rpx 0rpx rgba(178, 178, 178, 0.42);
	border-radius: 10rpx;
	// display: flex;
	// justify-content: space-around;
	align-items: center;
	flex-wrap: wrap;
	padding: 30upx 22upx;
	margin: 0 30rpx;
	margin-top: 20rpx;
	.cate-section-title {
		display: flex;
		flex-flow:row nowrap;
		float: left;
		width: 100%;
		border-bottom: 1rpx solid #f6f6f6;
		image {
			width: 90upx;
			height: 90upx;
			margin-bottom: 14upx;
			border-radius: 0;

		}
		.cate-item {
			flex:1;
			float:none;
			margin-bottom: 22upx;
		}
		
	}
	.cate-section-main {
		.cate-item {
			margin-top: 22upx;
			margin-bottom: 0;
		}
		/* 原图标颜色太深,不想改图了,所以加了透明度 */
		image {
			width: 62upx;
			height: 62upx;
			margin-bottom: 14upx;
		}
	}
	.cate-item {
		margin-bottom: 22upx;
		float: left;
		width: 25%;
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: $font-sm + 4upx;
		color: $font-color-dark;
	}

	/* 原图标颜色太深,不想改图了,所以加了透明度 */
	image {
		width: 90upx;
		height: 90upx;
		margin-bottom: 14upx;
		// border-radius: 50%;
		// opacity: 0.7;
		// box-shadow: 4upx 4upx 20upx rgba(250, 67, 106, 0.3);
	}
}

.ad-1 {
	width: 100%;
	height: 210upx;
	padding: 10upx 0;
	background: #fff;

	image {
		width: 100%;
		height: 100%;
	}
}

/* 秒杀专区 */
.seckill-section {
	padding: 4upx 30upx 24upx;
	background: #fff;

	.s-header {
		display: flex;
		align-items: center;
		height: 92upx;
		line-height: 1;

		.s-img {
			width: 140upx;
			height: 30upx;
		}

		.tip {
			font-size: $font-base;
			color: $font-color-light;
			margin: 0 20upx 0 40upx;
		}

		.timer {
			display: inline-block;
			width: 40upx;
			height: 36upx;
			text-align: center;
			line-height: 36upx;
			margin-right: 14upx;
			font-size: $font-sm + 2upx;
			color: #fff;
			border-radius: 2px;
			background: rgba(0, 0, 0, 0.8);
		}

		.icon-you {
			font-size: $font-lg;
			color: $font-color-light;
			flex: 1;
			text-align: right;
		}
	}

	.floor-list {
		white-space: nowrap;
	}

	.scoll-wrapper {
		display: flex;
		align-items: flex-start;
	}

	.floor-item {
		width: 150upx;
		margin-right: 20upx;
		font-size: $font-sm + 2upx;
		color: $font-color-dark;
		line-height: 1.8;

		image {
			width: 150upx;
			height: 150upx;
			border-radius: 6upx;
		}

		.price {
			color: $uni-color-primary;
		}
	}
}

.f-header {
	display: flex;
	align-items: center;
	height: 140upx;
	padding: 6upx 30upx 8upx;
	background: #fff;

	image {
		flex-shrink: 0;
		width: 80upx;
		height: 80upx;
		margin-right: 20upx;
	}

	.tit-box {
		flex: 1;
		display: flex;
		flex-direction: column;
	}

	.tit {
		font-size: $font-lg + 2upx;
		color: #font-color-dark;
		line-height: 1.3;
	}

	.tit2 {
		font-size: $font-sm;
		color: $font-color-light;
	}

	.icon-you {
		font-size: $font-lg + 2upx;
		color: $font-color-light;
	}
}

/* 团购楼层 */
.group-section {
	background: #fff;

	.g-swiper {
		height: 650upx;
		padding-bottom: 30upx;
	}

	.g-swiper-item {
		width: 100%;
		padding: 0 30upx;
		display: flex;
	}

	image {
		width: 100%;
		height: 460upx;
		border-radius: 4px;
	}

	.g-item {
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}

	.left {
		flex: 1.2;
		margin-right: 24upx;

		.t-box {
			padding-top: 20upx;
		}
	}

	.right {
		flex: 0.8;
		flex-direction: column-reverse;

		.t-box {
			padding-bottom: 20upx;
		}
	}

	.t-box {
		height: 160upx;
		font-size: $font-base + 2upx;
		color: $font-color-dark;
		line-height: 1.6;
	}

	.price {
		color: $uni-color-primary;
	}

	.m-price {
		font-size: $font-sm + 2upx;
		text-decoration: line-through;
		color: $font-color-light;
		margin-left: 8upx;
	}

	.pro-box {
		display: flex;
		align-items: center;
		margin-top: 10upx;
		font-size: $font-sm;
		color: $font-base;
		padding-right: 10upx;
	}

	.progress-box {
		flex: 1;
		border-radius: 10px;
		overflow: hidden;
		margin-right: 8upx;
	}
}

/* 分类推荐楼层 */
.hot-floor {
	width: 100%;
	overflow: hidden;
	margin-bottom: 20upx;

	.floor-img-box {
		width: 100%;
		height: 320upx;
		position: relative;

		&:after {
			content: '';
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			background: linear-gradient(rgba(255, 255, 255, 0.06) 30%, #f8f8f8);
		}
	}

	.floor-img {
		width: 100%;
		height: 100%;
	}

	.floor-list {
		white-space: nowrap;
		padding: 20upx;
		padding-right: 50upx;
		border-radius: 6upx;
		margin-top: -140upx;
		margin-left: 30upx;
		background: #fff;
		box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
		position: relative;
		z-index: 1;
	}

	.scoll-wrapper {
		display: flex;
		align-items: flex-start;
	}

	.floor-item {
		width: 180upx;
		margin-right: 20upx;
		font-size: $font-sm + 2upx;
		color: $font-color-dark;
		line-height: 1.8;

		image {
			width: 180upx;
			height: 180upx;
			border-radius: 6upx;
		}

		.price {
			color: $uni-color-primary;
		}
	}

	.more {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		flex-shrink: 0;
		width: 180upx;
		height: 180upx;
		border-radius: 6upx;
		background: #f3f3f3;
		font-size: $font-base;
		color: $font-color-light;

		text:first-child {
			margin-bottom: 4upx;
		}
	}
}

/* 猜你喜欢 */
.guess-section {
	display: flex;
	flex-wrap: wrap;
	padding: 0 30upx;
	background: #fff;

	.guess-item {
		display: flex;
		flex-direction: column;
		width: 48%;
		padding-bottom: 40upx;

		&:nth-child(2n + 1) {
			margin-right: 4%;
		}
	}

	.image-wrapper {
		width: 100%;
		height: 330upx;
		border-radius: 3px;
		overflow: hidden;

		image {
			width: 100%;
			height: 100%;
			opacity: 1;
		}
	}

	.title {
		font-size: $font-lg;
		color: $font-color-dark;
		line-height: 80upx;
	}

	.price {
		font-size: $font-lg;
		color: $uni-color-primary;
		line-height: 1;
	}
}
</style>
