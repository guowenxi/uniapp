<template>
	<view class="content no-padding">


		<view class="user-section">
			<image class="bg" src="/static/_new_user/My_bg@2x.png"></image>

			<view class="user-info-box">
				<view class="portrait-box" @click="selImg">
					<image class="portrait" :src="headImg && headImg !=''  ?
					 `${baseUrl}fyVolunteer/file/download/${headImg}?rbacToken=${rbacToken}` :
					  '/static/team_Head@2x.png'"></image>
				</view>
				
				<view class="info-box">
					<text class="username">{{userInfo.name || '游客'}}</text>
					<!-- 					<view  v-if="userInfo.isDepartment == 1" class="sub-name">
						<image class="left-icon" src="/static/img/icon_Certified@2x.png"></image>
							部门人员
					<uni-rate class="rate-box" :value="userInfo.levelType" size="10" margin="1"></uni-rate>
							</view> -->
					<view class="rongyu" >
						荣誉值 {{userInfo.allIntegral ? userInfo.allIntegral : 0}}
						<!-- <image class="wenhao" src="/static/img/icon_question@2x.png" ></image> -->
					</view>
					
<!-- 					<view v-if="userInfo.isVolunteer == 1" class="sub-name">
						<image class="left-icon" src="/static/img/icon_Certified@2x.png"></image>
						{{userInfo.levelName}}
						<uni-rate class="rate-box" disabled='true' :value="userInfo.levelType" size="10" margin="1"></uni-rate>
					</view>

					<view v-else-if="userInfo.isSupermarket == 1" class="sub-name">
						<image class="left-icon" src="/static/img/icon_Certified@2x.png"></image>
						超市管理员
						<uni-rate class="rate-box" disabled='true' :value="userInfo.levelType" size="10" margin="1"></uni-rate>
					</view>
					
 -->
				</view>

				
				<view class="info-box right-side-box">
					<text @click="navTo('/pages/authentication/authentication')" v-if="userInfo.reviewStatus != 1 && userInfo.reviewStatus != 3  ? true : false"
					 class="renzheng_box">{{reviewStatus}}</text>
					<image v-if="userInfo.reviewStatus == 1  ? true : false" class="right-icon" src="/static/img/jiantou_copy@2x.png"
					 @click="navToAndSaveItem(userInfo,'/pages/myinfo/myinfo')"></image>
				</view>

			</view>
				<view class="line-bar">
					<view class="lines">
						<view class="wrap-line"><view class="inner-line" :style="{ width: rateNumLine * 100 + '%' }"></view></view>
					</view><!-- 
					<view class="sub-text">
						<view class="text">{{ userInfo.levelLeft }}</view>
						<view class="text">{{ userInfo.levelRight }}</view>
					</view> -->
				</view>
				
				<view class="info-box-sub">
					<view v-if="userInfo.isVolunteer == 1" class="sub-name">
						<!-- <image class="left-icon" src="/static/img/icon_Certified@2x.png"></image> -->
						<text class="color-936241 tx">{{userInfo.levelName}}</text>
						<text class="color-936241 cz">成长值 {{ userInfo.allIntegral }} / {{ userInfo.levelRight }}</text>

						<uni-rate class="rate-box" disabled='true' :value="userInfo.levelType" size="10" margin="1"></uni-rate>
					</view>
				
					<view v-else-if="userInfo.isSupermarket == 1" class="sub-name">
						<!-- <image class="left-icon" src="/static/img/icon_Certified@2x.png"></image> -->
						<text class="color-936241 tx">超市管理员</text>
						<text class="color-936241 cz">成长值 {{ userInfo.levelLeft }} / {{ userInfo.levelRight }}</text>
						<uni-rate class="rate-box" disabled='true' :value="userInfo.levelType" size="10" margin="1"></uni-rate>
					</view>
					
					
				</view>
				
			<view class="tj-sction">
				<view class="tj-item " @click="navToAndSaveItem('1','/pages/record/record')">
					<text class="num color-333">{{userInfo.integral ? userInfo.integral : 0}}</text>
					<text class="title color-666">平安币</text>
					
				</view>
				<view class="tj-item " @click="navToAndSaveItem('2','/pages/record/record')">
					<text class="num color-333">{{userInfo.mile? userInfo.mile : 0}}</text>
					<text class="title color-666">累计里程(公里)</text>
					
				</view>
				<view class="tj-item" @click="navToAndSaveItem('3','/pages/record/record')">
					<text class="num color-333">{{userInfo.taskHour? userInfo.taskHour : 0}}</text>
					<text class="title color-666">巡逻时长(小时)</text>
					
				</view>
			</view>
		</view>
		
		<view class="qiandao-dengji">
			<view class="qiandao-dengji-item"
			  @click="navTo('/pages/qiandao/qiandao')"
			  v-if="userInfo.reviewStatus == 1 || userInfo.reviewStatus == 3  ? true : false"
			  >
				<view class="qd-left">
					<view class="title">签到</view>
					<view class="color-999" style="margin-top: 10rpx;">徽章轻松拿</view>
				</view>
				<image class="qd-right" src="/static/_new_user/My_sign@2x.png"></image>
			</view>
			<view class="qiandao-dengji-item" @click="navTo('/pages/huizhang/huizhang')">
				<view class="qd-left">
					<view class="title">荣誉徽章</view>
					<view class="color-999" style="margin-top: 10rpx;">点亮等级图标</view>
				</view>
				<image class="qd-right" src="/static/_new_user/My_grade@2x.png"></image>
			</view>
		</view>
		
		<view class="my-guanzhu">
			<view class="guanzhu-title">我的关注</view>
			<view class="guanzhu-sub">
				<view class="guanzhu-item" v-for="item in guanzhu_list" @click="navTo(item.url)">
					<image class="guanzhu-img" :src="item.img"></image>
					<view class="guanzhu-tx color-666">{{item.name}}</view>
				</view>
			</view>
		</view>


			<uni-list  class="cover-container">
				<uni-list-item thumb="/static/_new_user/My_team@2x.png" title="我的团队" @click="changeTeamUrl"></uni-list-item>
				<uni-list-item thumb="/static/_new_user/My_pay@2x.png" title="我的付款码" @click="navTo('/pages/erweima/erweima')"></uni-list-item>
				<uni-list-item thumb="/static/_new_user/My_badge@2x.png" @click="navTo('/pages/rongyu/rongyu')" title="等级"></uni-list-item>
				<uni-list-item thumb="/static/_new_user/My_idea@2x.png" @click="navTo('/pages/fankui/fankui')" title="我的金点子"></uni-list-item>
				<uni-list-item thumb="/static/_new_user/My_complaint@2x.png" @click="navTo('/pages/_new_wodetousu/_new_wodetousu')" title="我的投诉"></uni-list-item>
				
				
				<!-- <uni-list-item thumb="/static/img/MY_scanning@2x.png" title="扫一扫" @click="saoyisao"></uni-list-item> -->
				<!-- 				<uni-list-item thumb="/static/img/MY_Troubleshoot@2x.png" title="我的排查"  @click="navTo('/pages/myScreening/myScreening')"></uni-list-item> -->
				<!-- <uni-list-item thumb="/static/img/MY_attention@2x.png" title="我的关注" @click="navTo('/pages/attentionMisson/attentionMisson')"></uni-list-item> -->
				
				<!-- <uni-list-item thumb="/static/img/MY_grid@2x.png" @click="navTo('/pages/_new_guanzhuweiwangge/_new_guanzhuweiwangge')" title="关注微网格"></uni-list-item> -->
				<!-- <uni-list-item thumb="/static/img/MY_invite@2x.png" title="部门邀请码"></uni-list-item> -->
				<!-- <uni-list-item v-if="userInfo.reviewStatus == 1 || userInfo.reviewStatus == 3  ? true : false" thumb="/static/img/MY_Signin@2x.png"
				 title="我的签到" @click="navTo('/pages/qiandao/qiandao')"></uni-list-item>
				<uni-list-item thumb="/static/img/MY_announcement@2x.png" title="系统公告" @click="navTo('/pages/sysMisson/sysMisson')"
				:redIcon =  "userInfo.hasSystemRead ?  'true' :  'false' "></uni-list-item> -->
				
				<!-- <uni-list-item thumb="/static/_new_user/My_logo@2x.png" title="关于平安联盟" @click="navTo('/pages/about/about')"></uni-list-item> -->
				<!-- <uni-list-item thumb="/static/img/MY_Troubleshoot@2x.png" title="分享" @click="shareAPP"></uni-list-item> -->
<!-- 				<uni-list-item thumb="/static/img/MY_out@2x.png" title="退出登录" @click="popDetail"></uni-list-item>
 -->
			</uni-list>
			
			<uni-list  class="cover-container">
				<uni-list-item thumb="/static/_new_user/My_logo@2x.png" title="关于平安联盟" @click="navTo('/pages/about/about')"></uni-list-item>
				<!-- <uni-list-item thumb="/static/img/MY_Troubleshoot@2x.png" title="分享" @click="shareAPP"></uni-list-item> -->
				<uni-list-item thumb="/static/img/MY_out@2x.png" title="退出登录" @click="popDetail"></uni-list-item>
			
			</uni-list>
			
			
<!-- 		<scroll-view scroll-y class="cover-container">


		</scroll-view> -->



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
				rateNum:0,
				rateNumLine:0,
				guanzhu_list:[
					{name:"巡防任务",img:"/static/_new_user/My_task@2x.png",url:'/pages/attentionMisson/attentionMisson?type=0'},
					{name:"平安学习",img:"/static/_new_user/My_study@2x.png",url:'/pages/attentionMisson/attentionMisson?type=1'},
					{name:"隐患上报",img:"/static/_new_user/My_report@2x.png",url:'/pages/attentionMisson/attentionMisson?type=2'},
					{name:"微网格",img:"/static/_new_user/My_wwg@2x.png",url:'/pages/attentionMisson/attentionMisson?type=3'},
				],
				modalState: false,
				baseUrl: getApp().globalData.baseUrl,
				rbacToken: getApp().globalData.rbacToken,
				hasTeam: 0,
				reviewStatus: "未实名认证",
				coverTransform: 'translateY(0px)',
				coverTransition: '0s',
				moving: false,
				userInfo: {

				},
				headImg:"",
			}
		},
		onLoad() {

		},
		onShow() {

			// this.$refs.popup.close();
			this.hasTeam = this.user.hasTeam;
			this.selectById();

		},
		methods: {

			setNowLine() {
				setTimeout(() => {
					
					this.rateNum = this.userInfo.levelRight - this.userInfo.levelLeft - this.userInfo.allIntegral;
					// this.rateNumLine = this.userInfo.allIntegral / (this.userInfo.levelRight - this.userInfo.levelLeft);
					this.rateNumLine = this.userInfo.allIntegral / this.userInfo.levelRight;
				}, 500);
			},
			
			
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
								
								_this.headImg = JSON.parse(res.data).data;
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
							this.setNowLine();
							this.showpopup = true;
							this.headImg = this.userInfo.headImg;
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
	.qiandao-dengji{
		margin:0 auto;
		margin-bottom:20rpx;
		box-sizing: content-box;

		width: 690rpx;
		height: 135rpx;
		display: flex;
		flex-flow: row nowrap;
		justify-content:space-between ;
		.qiandao-dengji-item{
			box-sizing: border-box;
			width: 334rpx;
			height: 135rpx;
			padding:15rpx 20rpx;
				background-color: #ffffff;
				border-radius: 8rpx;
				display: flex;
				flex-flow: row nowrap;
			.qd-left{
				flex:1;
				.l-title{
					
				}
			}
			.qd-right{
				position: relative;
				top:50%;
				transform: translateY(-50%);
				max-width: 74rpx;
				min-width: 74rpx;
				height: 66rpx;
			}
		}
	}
	
	.content{
		background-color: #f0f0f0;
	}
	
	.my-guanzhu{
			margin:0 auto;
			margin-bottom:20rpx;
			box-sizing: content-box;
			padding:15rpx 20rpx;
			width: 650rpx;
			background-image: linear-gradient(
				#ffffff, 
				#ffffff), 
			linear-gradient(-30deg, 
				#f3b3a4 0%, 
				#fadcdc 100%);
			background-blend-mode: normal, 
				normal;
			border-radius: 10rpx;
			.guanzhu-title{
				padding:15rpx 0 ;
				font-size: $new-font-30;
				line-height: 36rpx;
				border-bottom: 1rpx solid #e6e6e6;
			}
			.guanzhu-sub{
				margin-top: 35rpx;
				display: flex;
				flex-flow: row nowrap;
				
				.guanzhu-item{
					position: relative;
					&:last-child{
						&::after{
							display: none;
						}
					}
					&::after{
						content: "";
						position: absolute;
						right:0;
						top:10rpx;
						width: 1rpx;
						height: 35rpx;
						background-color: #f0f0f0;
					}
					
					flex:1;
					text-align: center;
					.guanzhu-img{
							width: 56rpx;
							height: 55rpx;
							margin: 0 auto;
					}
					.guanzhu-tx{
						
						font-size: $new-font-28;
						
					}
				}
			}
	}
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
		overflow: hidden;
		border-radius: 10rpx;
		background-color: transparent;
		box-shadow: 0rpx 0rpx 15rpx 0rpx 
				rgba(178, 178, 178, 0.42);
		
		width: 690rpx;
		margin:0 auto;
		margin-bottom: 20rpx;
		margin-top: 20rpx;
		height: 333rpx;
		display: flex;
		flex-flow: column nowrap;
		/* 		padding: 100upx 30upx 0; */
		position: relative;
		.bg {

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
		padding-top: 30upx;
		padding-bottom: 15upx;
		
		flex: 1;
		display: flex;
		align-items: center;
		position: relative;
		z-index: 1;

		.portrait {
			width: 100upx;
			height: 100upx;
			border: 6upx solid #f4e3d2;
			border-radius: 50%;
			float: left;
		}

		.right-side-box {
			font-size: 20upx;
			position: absolute;
			right: 0upx;
			width: 160upx;
			height: 100upx;
		}

		.renzheng_box {
			color:#fff;
			background: rgba(0, 0, 0, 0.3);
			padding: 10upx 20upx;
		}

		.username {
			font-size: $new-font-32;
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
		&::before{
			content:"";
			display: none;
		}
		
		flex: 1;
		width: 690rpx;
		margin:0 30rpx;
		margin-bottom: 20rpx;
		border-radius: 10px;
		/* overflow: hidden; */
		background-color: #fff;
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
		padding:10rpx 34rpx 0;
		.tj-item {
			position: relative;
			@extend %flex-center;
			flex-direction: column;
			font-size: $font-sm;
		}

		.title {
			font-size:$new-font-28;
			margin-bottom: 35upx;
		}

		.num {
			font-size: $new-font-40;
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
		color:#76463c;
		font-size:$new-font-30;
		margin-left:20upx;
		line-height:new-font-30;
		.wenhao{
			vertical-align: middle;
			margin-left:20upx;
			width:26upx;
			height:26upx;
			display: inline-block;
		}
	}
	
	.line-bar {
		width: 95%;
		margin:0 auto;
		height: auto;
		.lines {
			width: 100%;
			height: 16upx;
			/* border: 1px solid #ff9790; */
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
				background:#f1dac8;
				.inner-line {
					transition: all 2s;
					width: 0%;
					height: 8upx;
					border-radius: 8upx;
					position: absolute;
					/* background: linear-gradient(90deg, #ff7200 0%, #ffff00 100%); */
					background-color: #f8b77f;
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
	.info-box-sub{

		margin:10rpx 0;
		.rate-box {
			margin-right:30rpx;
			float: right;
			display: inline-block;
		}
		.sub-name {
			
			position: relative;
			color: #FFBE00;
			margin-left: 20upx;
			font-size: 24upx;
			.cz{
				margin-left: 20rpx;
				font-weight: bold;
			}
			.tx{
				margin-left: 10rpx;
				padding: 0 10rpx;
					height: 30rpx;
					background-color: #f4e3d2;
					border-radius: 15rpx;
					border: solid 1rpx #fcefe7;
					/* opacity: 0.5; */
			}
			.left-icon {
				width: 20upx;
				height: 24upx;
				margin-right: 10upx;
			}
		}
	}
	
</style>
