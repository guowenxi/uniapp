<template>

	<view class="content no-padding">
		<view class="user-info-box">
			<view class="portrait-box">
				<image
					class="portrait"
					:src="
						userInfo.headImg && userInfo.headImg != '' ? `${baseUrl}fyVolunteer/file/download/${userInfo.headImg}?rbacToken=${rbacToken}` : '/static/missing-face.png'
					"
				></image>
			</view>

			
			<view class="info-box">
				<!-- 					<view  v-if="userInfo.isDepartment == 1" class="sub-name">
						<image class="left-icon" src="/static/img/icon_Certified@2x.png"></image>
							部门人员
					<uni-rate class="rate-box" :value="userInfo.levelType" size="10" margin="1"></uni-rate>
							</view> -->

				<view v-if="userInfo.isVolunteer == 1" class="rongyu">
					{{ userInfo.levelName }}
					<uni-rate class="rate-box" disabled="true" :value="userInfo.levelType" size="15" margin="1"></uni-rate>
				</view>

				<view v-else-if="userInfo.isSupermarket == 1" class="rongyu ">
					超市管理员
					<uni-rate class="rate-box" disabled="true" :value="userInfo.levelType" size="15" margin="1"></uni-rate>
				</view>

				<view class="sub-name">{{ `距下一等级还差${rateNum}荣誉值，请继续加油！` }}</view>
				<view class="line-bar">
					<view class="lines">
						<view class="wrap-line"><view class="inner-line" :style="{ width: rateNumLine * 100 + '%' }"></view></view>
					</view>
					<view class="sub-text">
						<view class="text">{{ userInfo.levelLeft }}</view>
						<view class="text">{{ userInfo.levelRight }}</view>
					</view>
				</view>
			</view>
			<view class="info-box right-side-box" @click="navTo('/pages/message/message')">
				<view class="right-icon">
					<image class="img" src="/static/img/icon_Chatl@2x.png"></image>
					<view class="txt" :style="{ 'border-radius': hasGroupReadNum >= 10 ? '50px' : '50%' }">{{ hasGroupReadNum }}</view>
				</view>

				<!-- 					<text @click="navTo('/pages/authentication/authentication')" v-if="userInfo.reviewStatus != 1 && userInfo.reviewStatus != 3  ? true : false"
					 class="renzheng_box">{{reviewStatus}}</text> -->
			</view>
		</view>

		<!-- 头部轮播 -->
		<view class="carousel-section">
			<swiper class="carousel" circular @change="changeCarousel" autoplay :interval="Number(fieldValue)">
				<swiper-item v-for="(item, index) in bannerList" :key="index" class="carousel-item">
					<!-- @click="navToDetailPage({title: '轮播广告'})" -->
					<image 
					 :src="
					 	item.fileId && item.fileId != '' ? `${baseUrl}fyProHandle/file/download/${item.fileId}?rbacToken=${rbacToken}` : ''
					 "
					 @click="openBanner(item,index)"
					 />
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
			<view class="cate-item" @click="navTo('/pages/missonListPA/missonListPA')">
				<image src="/static/img/home_task@2x.png"></image>
				<text>平安任务</text>
			</view>
			<!-- 			<view class="cate-item">
				<image src="/static/img/home_videoPatrol@2x.png"></image>
				<image src="/static/img/home_videoPatrol_gray@2x.png"></image>
				<text style="color:#ccc">视频巡查</text>
			</view> -->
			<view class="cate-item" @click="navTo('/pages/missonListXF/missonListXF')">
				<image src="/static/img/home_Patrol@2x.png"></image>
				<text>平安巡防</text>
			</view>
			<view class="cate-item" @click="navTo('/pages/teachPA/teachPA')">
				<image src="/static/img/home_Learn@2x.png"></image>
				<text>平安学习</text>
			</view>
			<view class="cate-item" @click="bolNavTo('/pages/roadblock/roadblock')">
				<image src="/static/img/home_kadian@2x.png"></image>
				<text>防疫志愿服务</text>
			</view>
			<view class="cate-item" @click="bolNavTo('/pages/rankList/rankList')">
				<image src="/static/img/home_Leaderboard@2x.png"></image>
				<text>排行榜</text>
			</view>
			<view class="cate-item" @click="bolNavTo('/pages/fankuiAll/fankuiAll')">
				<image src="/static/img/home_idea@2x.png"></image>
				<text>金点子</text>
			</view>

			<view class="cate-item" @click="bolNavTo('/pages/mall/mall')">
				<image src="/static/img/home_shop@2x.png"></image>
				<text>平安商城</text>
			</view>
<!-- 			<view class="cate-item" @click="navTo('/pages/petitioning/petitioning')">
				<image src="/static/img/home_Petition@2x.png"></image>
				<text>上访查询</text>
			</view> -->
		</view>

		<uni-popup ref="popup" type="middle" msg="提示">
			<view class="default-item-box">
				<!-- <view class="text">您今日未签到,是否去签到?</view> -->
				<!-- <button class="bottom-float-button" type="red" @click="cancelPop">取消</button> -->
				<button class="bottom-float-button" type="red" @click="navTo('/pages/qiandao/qiandao')">确定</button>
			</view>
		</uni-popup>

		<view class="update-box" :style="{ visibility: updateBox ? 'inherit' : 'hidden' }" @click="qiandao_success">
			<view class="update-item no-animate">
				<view class="wrap-box">
					<view class="wrap-title">发现新版本</view>
					<view class="version">V{{ versionNumber }}</view>
					<view class="title">更新内容:</view>
					<scroll-view class="scroll-bar update-content" scroll-y="true">{{ versionExplain }}</scroll-view>
					<button class="btn" type="red" @click="updateBtn">立即更新</button>
				</view>
				<image class="close-btn" src="/static/img/box_shut@2x.png" @click="qiandao_success"></image>
				<image class="item-img gggg" src="/static/img/update_bg@2x.png"></image>
			</view>
		</view>

		<view v-if="showHuodong" class="huodong-box" @click="navToAndSaveItem(activityInfos, '/pages/huodong/huodong')">
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
		

		<view class="popup-box"  v-show="showpopupBoxState">
			<view class="inner-box"  v-for="(item,index) in popBox"  :class="item.checked ? 'hide-popup-box' :''">
				<view class="inner-box-title">
					<text class="inner-box-title-text">
						提示
					</text>
					<image @click="handleClick(item,index)" class="inner-box-icon" src="/static/new/btn_close@2x.png"/>
				</view>
				<view class="inner-box-mian">
					<view class="inner-box-main-item" >
						<text class="inner-box-main-item-text">很抱歉,您的防疫志愿服务任务:</text>
					</view>
					<view class="inner-box-main-item">
						<text class="inner-box-main-item-text">名称:</text>
						<text class="inner-box-main-item-text-red">{{item.title}}</text>
					</view>
					<view class="inner-box-main-item">
						<text class="inner-box-main-item-text">日期:</text>
						<text class="inner-box-main-item-text-red">{{item.message}}</text>
					</view>
					<view class="inner-box-main-item">
						<text class="inner-box-main-item-text">已被管理员取消,请选择其他业务。</text>
					</view>
				</view>
			</view>
		</view>
		
	</view>

</template>

<script>
import uniRate from '@/components/uni-rate/uni-rate.vue';
import uniPopup from '@/components/uni-popup/uni-popup.vue';

export default {
	components: {
		uniPopup,
		uniRate
	},
	data() {
		return {
			guanggao_load:false,
			animationData:{},
			showpopupBoxState_index:0,
			showpopupBoxState:false,
			popBox:[],
			lostTime:3,
			guanggaoState:false,
			fieldValue:5000,
			bannerList:[],
			activityName: '',
			personInfo: [],
			awardList: [],
			showHuodong: true,
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
			goodsList: []
		};
	},

	onReady() {
		this.guanggao_load = true;
		// this.defaultLogin();
	},
	onShow() {
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
			this.selectById();
		}
		uni.hideToast();
		this.defaultLogin();

	},
	onLoad() {
		
		const _this = this;
		try {
			App.getLocation();
		} catch (e) {
			//TODO handle the exception
		}

		// #ifdef APP-PLUS
		// plus.push.addEventListener('receive', function(msg){

		// 	// _this.push_state_max ++ ;
		//     //处理透传消息的业务逻辑代码
		// }, false);

		plus.runtime.getProperty(plus.runtime.appid, widgetInfo => {
			_this._updateState(widgetInfo.version, _this);
		});
		// #endif

		uni.getLocation({
			altitude: true,
			geocode: true, //默认false，是否解析地址信息
			// type: 'wgs84',
			type: 'gcj02',
			success: function(res) {
				uni.hideLoading();
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
		//关闭弹窗
		handleClick(item,index){			
			this.popBox[index].checked =true; 
			this.showpopupBoxState_index = this.showpopupBoxState_index -1;
			if(this.showpopupBoxState_index == 0){
				setTimeout(()=>{
				this.showpopupBoxState = false;
				},500)
			}
		},
		//
		guanggaoClose(){
			this.guanggaoState=false;
		},
		guanggaoOpen(){
			let  _this = this;
			setTimeout(()=>{
				_this.lostTime = _this.lostTime-1 ;
				_this.lostTime <= 0 ? _this.guanggaoState=false : _this.guanggaoOpen();
			},1000)
		},
	
	//傻逼的轮播图时间获取
	// /fyVolunteer/fyKeyConfig/getFyKeyConfig
	getFyKeyConfig(){
		this.$http
			.get('fyVolunteer/fyKeyConfig/getFyKeyConfig', {
				fieldKey:"bannersChangeTime",
				rbacToken: this.user.rbacToken
			})
			.then(res => {
				
				if (res.data.success == 1) {
				
				this.fieldValue=res.data.data.fieldValue*1000;
				
				}
			});
	},
		//获取未读消息
		// /fyVolunteer/fyKeyConfig/getFyKeyConfig
		getUnreadMessageList(){
			if(this.popBox.length>0){
				this.showpopupBoxState_index = this.popBox.length;
				this.showpopupBoxState = true;
			}
			this.$http
				.get('fyTaskManage/peaceTaskApp/getUnreadMessageList', {
					rbacToken: this.user.rbacToken
				})
				.then(res => {
					if (res.data.success == 1) {
						
						this.popBox = res.data.data;
						this.popBox.map((item,idx)=>{
							item.checked=false;
						})
						if(this.popBox.length>0){
							this.showpopupBoxState_index = this.popBox.length;
							this.showpopupBoxState = true;
						}
					}
				});
		},
		//
		openBanner(item,idx){
			if (idx == 0) {
				this.navToAndSaveItem(this.activityInfos, '/pages/huodong/huodong');
				return ;
			}
			
			this.navToAndSaveItem(item, '/pages/bannerInfo/bannerInfo');
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
			if (this.versionUrl) {
				uni.downloadFile({
					url: this.versionUrl,
					success: downloadResult => {
						if (downloadResult.statusCode === 200) {
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
					}
				});
			}
		},
		qiandao_success() {
			this.updateBox = false;
		},
		getProvider() {
			uni.getProvider({
				service: 'push',
				success: function(res) {
					uni.showToast({
						mask: true,
						icon: 'none',
						title: JSON.stringify(res.provider)
					});
					// 个推的名称为 igexin
					if (~res.provider.indexOf('igexin')) {
						uni.subscribePush({
							provider: 'igexin',
							success: function(res) {
								uni.showToast({
									mask: true,
									icon: 'none',
									title: 'success:' + JSON.stringify(res)
								});
							}
						});
					}
				}
			});
		},
		changeCarousel(event) {
			this.carouselIndex = event.detail.current;
		},
		defaultLogin(userName) {
			const userInfo = uni.getStorageSync('userInfo');

			if (userInfo == '') {
				this.navTo('/pages/login/login');
				return;
			}
			const user = JSON.parse(userInfo);
			if (user.phone == '' || user.passWord == '') {
				this.navTo('/pages/login/login');
				return;
			}
			// this.loadingState();
			console.log('当前user  ' + JSON.stringify(user));
			this.$http
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

						this.showHuodong = res.data.data.activityStatus === 0 ? false : true;
						getApp().globalData.rbacToken = res.data.data.rbacToken;
						this.user.rbacToken = res.data.data.rbacToken;
						this.user.hasTeam = res.data.data.hasTeam;
						this.user.hasMarket = res.data.data.hasMarket;
						this.user.hasDepart = res.data.data.hasDepart;
						this.user.userId = res.data.data.userId;
						this.user.reviewStatus = res.data.data.reviewStatus;
						this.user.isSign = res.data.data.isSign;
						this.user.headImg = res.data.data.headImg;

						this.activityInfos = res.data.data.activityInfos[0];

						//读取活动的数据 真他么操蛋
						if (this.activityInfos) {
							this.getActivityRankForHomePage();
						}
						//
						//获取数据
						this.selectById();
						//轮播图
						this.getBannerList();
						//获取是否有任务
						this.getUnreadMessageList();
						//轮播图秒数也要获取
						this.getFyKeyConfig();
						if (this.user.isSign == 0 && (this.user.reviewStatus == 1 || this.user.reviewStatus == 3)) {
							// this.$refs.popup.open();
							this.navTo('/pages/qiandao/qiandao');
						}else if(this.guanggao_load){
							//不签到说明今天完了
							//开启傻逼广告
							this.guanggao_load = false;
							this.guanggaoState = true;
							this.guanggaoOpen();
						}
					} else {
						uni.showToast({
							mask: true,
							icon: 'none',
							title: res.data.message
						});
						// this.navTo("/pages/login/login")
					}
				});
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
		async loadData() {}
	},

	onNavigationBarButtonTap(e) {
		uni.navigateTo({
			url: '/pages/message/message'
		});
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
	.hide-popup-box{
		transform: translate(-50%, -50%) scale(0) !important;
		transition: all 0.5s;
	}
	.popup-box{
			position: absolute;
			left:0;
			top:0;
			bottom:0;
			right:0;
			width: 100%;
			height: 100%;
			background: rgba(0,0,0,0.5);

			.inner-box{
				overflow: hidden;
				position: absolute;
				left:50%;
				top:50%;
				transform: translate(-50%,-50%);
				background: #fff;
				width: 600upx;
				height: 400upx;
				font-size:30upx;
				.inner-box-title{
					padding:0 40upx;

					background-color: #efefef;
					width:100%;
					 justify-content:space-between;
					 border-bottom-color:#EEEEEE;
					 border-bottom-width:1px;
					 display: flex;
					 flex-flow: row nowrap;
				}
				.inner-box-mian{
					margin-top: 40upx;
				}
				.inner-box-title-text{
					line-height: 80upx;

				}
				
				.inner-box-icon{
					margin-top: 15upx;
					width:60upx;
					height:60upx;
				}
				.inner-box-main-item{
					width:100%;
					flex-direction:row;
				}
				.inner-box-main-item-text{
					margin-top: 20upx;
					margin-left: 40upx;
					line-height: 40upx;
				}
				.inner-box-main-item-text-red{
					margin-top: 20upx;
					line-height: 60upx;
					color:#E32417;
				}
				
			}
	}
.guanggao{
	.portrait{
		position: absolute;
		left:50%;
		top:50%;
		transform: translate(-50%,-50%);
		width:692upx;

		display: flex;
		flex-flow:column nowrap;
	}
	.inner-img{
		width: 100%;
		flex:1;
	}
	.text-view{
		margin-bottom: 10upx;
		width: 100%;
		min-height:30upx;
		max-height:30upx;
		color:#fff;
	}
	.close-btn{
		position: absolute;
		right:-20upx;
		top:-0upx;
		z-index:100;
		width:60upx;
		height:60upx;
	}
	position: fixed;
	width: 100%;
	height: 100%;
	left: 0;
	top: 0;
	right:0;
	bottom: var(--window-bottom) ;
	background: rgba(0,0,0,0.5);
	z-index:100000;
	

	
}
.line-bar {
	width: 100%;
	height: auto;
	.lines {
		width: 100%;
		height: 16upx;
		border: 1px solid #ff9790;
		border-radius: 16upx;
		position: relative;
		.wrap-line {
			width: 98%;
			height: 8upx;
			border-radius: 8upx;
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			background: rgba(0, 0, 0, 0.3);
			.inner-line {
				transition: all 2s;
				width: 0%;
				height: 8upx;
				border-radius: 8upx;
				position: absolute;
				background: linear-gradient(90deg, #ff7200 0%, #ffff00 100%);
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
	.cate-section {
		position: relative;
		z-index: 5;
		border-radius: 16upx 16upx 0 0;
		margin-top: -20upx;
	}

	.carousel-section {
		padding: 20upx 0;
		padding-top: 20upx;

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
	padding: 20upx 20upx 0 20upx;

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
	height: 350upx;

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
	// display: flex;
	// justify-content: space-around;
	align-items: center;
	flex-wrap: wrap;
	padding: 30upx 22upx;

	.cate-item {
		margin-bottom: 53upx;
		float: left;
		width: 33%;
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
		border-radius: 50%;
		opacity: 0.7;
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
