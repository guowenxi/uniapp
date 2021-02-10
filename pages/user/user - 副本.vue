<template>
	<view class="content no-padding">

		<view class="user-section">
			<image class="bg" mode="aspectFit" src="/static/img/List_bg@2x.png"></image>

			<view class="user-info-box">
				<view class="portrait-box" @click="selImg">
					<image class="portrait" :src="userInfo.headImg && userInfo.headImg !=''  ?
					 `${baseUrl}fyVolunteer/file/download/${userInfo.headImg}?rbacToken=${rbacToken}` :
					  '/static/missing-face.png'"></image>
				</view>
				<view class="info-box">
					<text class="username">{{userInfo.name || '游客'}}</text>
					<!-- 					<view  v-if="userInfo.isDepartment == 1" class="sub-name">
						<image class="left-icon" src="/static/img/icon_Certified@2x.png"></image>
							部门人员
					<uni-rate class="rate-box" :value="userInfo.levelType" size="10" margin="1"></uni-rate>
							</view> -->
					<view class="rongyu" @click="navTo('/pages/rongyu/rongyu')">
						荣誉值 {{userInfo.allIntegral ? userInfo.allIntegral : 0}}
						<image class="wenhao" src="/static/img/icon_question@2x.png" ></image>
					</view>
					<view v-if="userInfo.isVolunteer == 1" class="sub-name">
						<image class="left-icon" src="/static/img/icon_Certified@2x.png"></image>
						{{userInfo.levelName}}
						<uni-rate class="rate-box" disabled='true' :value="userInfo.levelType" size="10" margin="1"></uni-rate>
					</view>

					<view v-else-if="userInfo.isSupermarket == 1" class="sub-name">
						<image class="left-icon" src="/static/img/icon_Certified@2x.png"></image>
						超市管理员
						<uni-rate class="rate-box" disabled='true' :value="userInfo.levelType" size="10" margin="1"></uni-rate>
					</view>

				</view>
				<view class="info-box right-side-box">
					<text @click="navTo('/pages/authentication/authentication')" v-if="userInfo.reviewStatus != 1 && userInfo.reviewStatus != 3  ? true : false"
					 class="renzheng_box">{{reviewStatus}}</text>
					<image v-if="userInfo.reviewStatus == 1  ? true : false" class="right-icon" src="/static/img/jiantou_copy@2x.png"
					 @click="navToAndSaveItem(userInfo,'/pages/myinfo/myinfo')"></image>
				</view>
			</view>

			<view class="tj-sction">
				<view class="tj-item " @click="navToAndSaveItem('1','/pages/record/record')">
					<text class="num">{{userInfo.integral ? userInfo.integral : 0}}</text>
					<text class="title">我的平安币</text>
					
				</view>
				<view class="tj-item " @click="navToAndSaveItem('2','/pages/record/record')">
					<text class="num">{{userInfo.mile? userInfo.mile : 0}}</text>
					<text class="title">累计里程(公里)</text>
					
				</view>
				<view class="tj-item" @click="navToAndSaveItem('3','/pages/record/record')">
					<text class="num">{{userInfo.taskHour? userInfo.taskHour : 0}}</text>
					<text class="title">巡逻时长(小时)</text>
					
				</view>
			</view>
		</view>

		<scroll-view scroll-y class="cover-container">
			<uni-list>
				<uni-list-item thumb="/static/img/MY_scanning@2x.png" title="扫一扫" @click="saoyisao"></uni-list-item>
				<uni-list-item thumb="/static/img/MY_team@2x.png" title="我的团队" @click="changeTeamUrl"></uni-list-item>
				<!-- 				<uni-list-item thumb="/static/img/MY_Troubleshoot@2x.png" title="我的排查"  @click="navTo('/pages/myScreening/myScreening')"></uni-list-item> -->
				<uni-list-item thumb="/static/img/MY_attention@2x.png" title="我的关注" @click="navTo('/pages/attentionMisson/attentionMisson')"></uni-list-item>
				
				<uni-list-item thumb="/static/img/MY_feedback@2x.png" @click="navTo('/pages/fankui/fankui')" title="我的金点子"></uni-list-item>
				<uni-list-item thumb="/static/img/MY_grid@2x.png" @click="navTo('/pages/_new_guanzhuweiwangge/_new_guanzhuweiwangge')" title="关注微网格"></uni-list-item>
				<uni-list-item thumb="/static/img/MY_complaint@2x.png" @click="navTo('/pages/_new_wodetousu/_new_wodetousu')" title="我的投诉"></uni-list-item>
				<uni-list-item thumb="/static/img/MY_Medal@2x.png" @click="navTo('/pages/huizhang/huizhang')" title="我的徽章"></uni-list-item>
				<!-- <uni-list-item thumb="/static/img/MY_invite@2x.png" title="部门邀请码"></uni-list-item> -->
				<uni-list-item thumb="/static/img/MY_invite@2x.png" title="我的付款码" @click="navTo('/pages/erweima/erweima')"></uni-list-item>
				<uni-list-item v-if="userInfo.reviewStatus == 1 || userInfo.reviewStatus == 3  ? true : false" thumb="/static/img/MY_Signin@2x.png"
				 title="我的签到" @click="navTo('/pages/qiandao/qiandao')"></uni-list-item>
				<uni-list-item thumb="/static/img/MY_announcement@2x.png" title="系统公告" @click="navTo('/pages/sysMisson/sysMisson')"
				:redIcon =  "userInfo.hasSystemRead ?  'true' :  'false' "></uni-list-item>
				<uni-list-item thumb="/static/img/MY_on@2x.png" title="关于平安联盟" @click="navTo('/pages/about/about')"></uni-list-item>
				<uni-list-item thumb="/static/img/MY_Troubleshoot@2x.png" title="分享" @click="shareAPP"></uni-list-item>
				<uni-list-item thumb="/static/img/MY_out@2x.png" title="退出登录" @click="popDetail"></uni-list-item>

			</uni-list>

		</scroll-view>



		<modal-box ref="modalBox" title="提示" content="是否退出登录?" @eventClick="popMission" ></modal-box>
		
		
	</view>
</template>
<script>
	// import uniPopup from "@/components/uni-popup/uni-popup.vue"
	import modalBox from "@/components/modalBox.vue"
	import uniRate from "@/components/uni-rate/uni-rate.vue"
	import uniList from '@/components/uni-list/uni-list.vue'
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
	import listCell from '@/components/mix-list-cell';
	import {
		mapState
	} from 'vuex';

	export default {
		computed: {
			...mapState(['baseUrl'])

		},
		components: {
			modalBox,
			uniRate,
			listCell,
			uniList,
			uniListItem
			// uniPopup
		},
		data() {
			return {
				modalState: false,
				baseUrl: getApp().globalData.baseUrl,
				rbacToken: getApp().globalData.rbacToken,

				hasTeam: 0,
				reviewStatus: "未实名认证",
				coverTransform: 'translateY(0px)',
				coverTransition: '0s',
				moving: false,
				userInfo: {

				}
			}
		},
		onLoad() {},
		onShow() {

			// this.$refs.popup.close();
			this.hasTeam = this.user.hasTeam;
			this.selectById();

		},
		computed: {
			
		},
		methods: {
			shareAPP(){
			
				
			// uni.share({
			//     provider: "weixin",
			//     scene: "WXSceneSession",
			//     type: 0,
			//     title: "平安联盟",
			//     summary: "平安联盟",
			//     imageUrl: "/static/PALM_loog.png",
			// 	href:'http://115.223.34.195:8090/app/download.html',
			//     success: function (res) {
			// 		  uni.showToast({
			// 			icon: 'none',
			// 			title: "分享成功"
			// 		  });
			//     },
			//     fail: function (err) {
			//         console.log("fail:" + JSON.stringify(err));
			//     }
			// });
				
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
					
			plus.share.sendWithSystem({
				type:"image",
				pictures:["/static/shareApp.png"],
				}, function(){
					console.log('分享成功');
				}, function(e){
					console.log('分享失败：'+JSON.stringify(e));
				});
						

			},
			//弹出框
			popDetail() {
				uni.showModal({
				    title: '提示',
				    content: '是否退出登录?',
					// confirmColor:"#",
				    success:  (res)=> {
				        if (res.confirm) {
				            console.log('用户点击确定');
							uni.setStorageSync('userInfo', JSON.stringify({
								phone: '',
								passWord: '',
								rbacToken: '',
							}));
							this.navTo('/pages/login/login');
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});

				// this.$refs.modalBox.open();
				
			},
			//弹出框
			popMission(state) {
					uni.setStorageSync('userInfo', JSON.stringify({
						phone: '',
						passWord: '',
						rbacToken: '',
					}));
					this.navTo('/pages/login/login');
					this.$refs.modalBox.close();
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
			//更改团队
			changeTeamUrl() {
				if (this.apply == 1) {
					this.navTo('/pages/missonTeamWaiting/missonTeamWaiting')
				} else {
					this.hasTeam == 1 ?
						// this.navTo('/pages/missonTeamListMy/missonTeamListMy') :
						this.navTo('/pages/teamDetailMy/teamDetailMy') :
						this.navTo('/pages/missonTeamList/missonTeamList')
				}

			},
			selImg() {
				const _this = this;
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'compressed'], //从相册选择
					success: function(res) {
						uni.uploadFile({
							url: _this.baseUrl + "fyVolunteer/fySafeUseUser/changeImg",
							filePath: res.tempFilePaths[0],
							name: 'files',
							formData: {
								rbacToken: _this.user.rbacToken,
							},
							success: (res) => {
								_this.userInfo.headImg = JSON.parse(res.data).data;
								if (JSON.parse(res.data).success === 1) {
									uni.showToast({
										icon: 'none',
										title: "上传成功"
									});
								} else {
									uni.showToast({
										icon: 'none',
										title: res.data.message
									});
								}
							}
						})
					}
				});
			},
			switchreviewStatus() {
				switch (this.userInfo.reviewStatus) {
					case 0:
						this.reviewStatus = "待审核"
						break;
					case 1:
						this.reviewStatus = "审核通过"
						break;
					case 2:
						this.reviewStatus = "未通过"
						break;
					case 3:
						this.reviewStatus = "注销"
						break;
					case 4:
						this.reviewStatus = "未实名认证"
						break;
				}
			},
			//获取列表
			selectById() {

				this.$http.get('fyVolunteer/fySafeUseUser/selectById', {
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
							this.user.hasGroupReadNum = res.data.data.hasGroupReadNum;
							this.switchreviewStatus()
							this.showpopup = true;
						} else {
							uni.showToast({
								icon: 'none',
								title: res.data.message
							});
						}

					})
			},
		}
	}
</script>
<style lang='scss' scoped>
	.uni-popup {
		top: 0;
	}

	.time-select-box {
		width: 400upx;
		position: relative;
		height: 200upx;

		.left-icon {
			width: 60upx;
			height: 60upx;
			float: left;
		}

		.text {
			line-height: 60upx;
			font-size: 30upx;
			margin-left: 20upx;
			float: left;
		}

		.bottom-btn-box {
			position: absolute;
			bottom: 20upx;
			width: 100%;
			display: flex;

			.bottom-float-button {
				flex: 1;

				&:nth-child(1) {
					margin-right: 10upx;
				}
			}
		}


	}


	.rate-box {
		display: inline-block;
	}

	.content {
		display: flex;
		flex-flow: column nowrap;

	}

	%flex-center {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	%section {
		display: flex;
		justify-content: space-around;
		align-content: center;
		background: #fff;
		border-radius: 10upx;
	}


	.user-section {
		flex: 1;
		display: flex;
		flex-flow: column nowrap;
		/* 		padding: 100upx 30upx 0; */
		position: relative;
		max-height: 430upx;
		min-height: 430upx;

		.bg {
			background: #e32417;
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
		}
	}

	.user-info-box {

		font-size: $font-base;
		padding: 0 20upx;
		padding-top: 60upx;
		padding-bottom: 60upx;
		color: #fff;
		flex: 1;
		display: flex;
		align-items: center;
		position: relative;
		z-index: 1;

		.portrait {
			width: 130upx;
			height: 130upx;
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

		}

		.renzheng_box {
			background: rgba(0, 0, 0, 0.3);
			padding: 10upx 20upx;
		}

		.username {
			font-size: $font-lg;
			margin-left: 20upx;
		}

		.right-icon {
			padding: 0 20upx;
			width: 60upx;
			height: 30upx;
			float: right;
			position: absolute;
			left: 0;
			top: 0;
			right: 0;
			bottom: 0;
			margin:auto;
		}

		.sub-name {
			color: #FFBE00;
			margin-left: 20upx;
			font-size: 24upx;

			.left-icon {
				width: 20upx;
				height: 24upx;
				margin-right: 10upx;
			}
		}
	}

	.vip-card-box {
		display: flex;
		flex-direction: column;
		color: #f7d680;
		height: 240upx;
		background: linear-gradient(left, rgba(0, 0, 0, .7), rgba(0, 0, 0, .8));
		border-radius: 16upx 16upx 0 0;
		overflow: hidden;
		position: relative;
		padding: 20upx 24upx;

		.card-bg {
			position: absolute;
			top: 20upx;
			right: 0;
			width: 380upx;
			height: 260upx;
		}

		.b-btn {
			position: absolute;
			right: 20upx;
			top: 16upx;
			width: 132upx;
			height: 40upx;
			text-align: center;
			line-height: 40upx;
			font-size: 22upx;
			color: #36343c;
			border-radius: 20px;
			background: linear-gradient(left, #f9e6af, #ffd465);
			z-index: 1;
		}

		.tit {
			font-size: $font-base+2upx;
			color: #f7d680;
			margin-bottom: 28upx;

			.yticon {
				color: #f6e5a3;
				margin-right: 16upx;
			}
		}

		.e-b {
			font-size: $font-sm;
			color: #d8cba9;
			margin-top: 10upx;
		}
	}

	.cover-container {
		flex: 1;
		height: 0;
		background: $page-color-base;
		/* padding: 0 30upx; */
		position: relative;
		/* background: #f5f5f5; */

		/* padding-bottom: 20upx; */
		.arc {
			position: absolute;
			left: 0;
			top: -34upx;
			width: 100%;
			height: 36upx;
		}
	}

	.tj-sction {
		flex: 1;
		color: #fff;
		position: relative;
		display: flex;
		justify-content: space-around;
		align-content: center;
		border-radius: 10upx;

		.tj-item {
			position: relative;
			@extend %flex-center;
			flex-direction: column;
			font-size: $font-sm;
		}

		.title {
			font-size: 28upx;
			margin-bottom: 35upx;
		}

		.num {
			font-size: 48upx;
			/* margin-bottom: 35upx; */
		}
	}

	.order-section {
		@extend %section;
		padding: 28upx 0;
		margin-top: 20upx;

		.order-item {
			@extend %flex-center;
			width: 120upx;
			height: 120upx;
			border-radius: 10upx;
			font-size: $font-sm;
			color: $font-color-dark;
		}

		.yticon {
			font-size: 48upx;
			margin-bottom: 18upx;
			color: #fa436a;
		}

		.icon-shouhoutuikuan {
			font-size: 44upx;
		}
	}

	.history-section {
		padding: 30upx 0 0;
		margin-top: 20upx;
		background: #fff;
		border-radius: 10upx;

		.sec-header {
			display: flex;
			align-items: center;
			font-size: $font-base;
			color: $font-color-dark;
			line-height: 40upx;
			margin-left: 30upx;

			.yticon {
				font-size: 44upx;
				color: #5eba8f;
				margin-right: 16upx;
				line-height: 40upx;
			}
		}

		.h-list {
			white-space: nowrap;
			padding: 30upx 30upx 0;

			image {
				display: inline-block;
				width: 160upx;
				height: 160upx;
				margin-right: 20upx;
				border-radius: 10upx;
			}
		}
	}
	.rongyu{
		font-size:26upx;
		margin-left:20upx;
		line-height:30upx;
		.wenhao{
			vertical-align: middle;
			margin-left:20upx;
			width:26upx;
			height:26upx;
			display: inline-block;
		}
	}
</style>
