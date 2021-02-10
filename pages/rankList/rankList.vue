<template>
	<view class="content no-padding">
		<image class="bg" src="/static/_new_rank/List_bg@2x.png"></image>
		<!-- <image class="backIcon"  src="/static/img/jiantou_copy@2x.png" @click="navigateBack(1)"></image> -->
		<view class="select-box">
			<view class="top-silder-box">
				<view class="item" v-for="(item,idx) in topMenu" @click="selMenu(item,idx)" :class="selMenuIndex == item.d?  'item-check' : 'item-un-check' ">
					{{item.name}}
				</view>
			</view>
			<new-menu-select class="pick-box"
						:hasBg="false"
						ref="rankListFilter"
						:selList="orderType ==2 ? [rankListFilter_2] :[rankListFilter_1]" 
						
						keyName="name"
						modal="absolute"
						 queryName="name" valName="val" @btnClick="changeSubMenu($event)"></new-menu-select>
			
			
<!-- 			<new-menu-select class="pick-box"
			:hasBg="false"
			:selList="[rankListFilter_2]" 
			v-show="orderType ==2 ? "
			keyName="name"
			modal="absolute"
			 queryName="name" valName="val" @btnClick="changeSubMenu($event)"></new-menu-select>
			 
			 <new-menu-select class="pick-box"
			 :hasBg="false"
			 :selList="[rankListFilter_1]" 
			v-show="orderType ==0 || orderType ==1"
			 keyName="name"
			 modal="absolute"
			  queryName="name" valName="val" @btnClick="changeSubMenu($event)"></new-menu-select>
			 
			 -->
		</view>

		<view class="wrap-box">
			<view class="top-box">
				<view class="left-side">
					<view class="btn" :class="orderType == 2 ? 'check-btn' : ''"  
					:style="hasTeam == 1 ? {opacity:'1'} : {opacity:'0.5'}"
					 @click="changeMenu(2)">
						<view>团队</view>
					</view>
					<view class="btn" :class="orderType == 0 ? 'check-btn' : ''" @click="changeMenu(0)">
						<view>荣誉值</view>
					</view>
					<view class="btn" :class="orderType == 1 ? 'check-btn' : ''" @click="changeMenu(1)">
						<view>点赞</view>
					</view>
				</view>
				<!-- <view class="time">最后更新于 {{time}}</view> -->
				<image class="top-box-bg" src="/static/_new_rank/List_diamond@2x.png"></image>
			</view>
			

			
		</view>
		
			<image class="lines" src="/static/_new_rank/List_img@2x.png"></image>
			<view class="rank-list">
				<view class="user-info-box">
					
					<view class="portrait-box">
						<image class="portrait" 
						:src="
						userInfo.headImg ? `${baseUrl}fyProHandle/file/download/${userInfo.headImg}?rbacToken=${rbacToken}` :'/static/missing-face.png'
						"></image>
					</view>
					
					<view class="info-box">
						<view class="username">
							<text>{{userInfo.name}}</text>
							<text class="right-side">所在{{userInfo.districtName}} 　{{userInfo.peopleNum}}人 </text>
							
						<!-- 	<text class="right-side" v-if="orderType==0 ? true :  false">{{userInfo.integral ? userInfo.integral : 0}}</text>
							<text class="right-side" v-if="orderType==1 ? true :  false">{{userInfo.likeNum ? userInfo.likeNum : 0}}</text> -->
							
						</view>
						<view class="sub-name">
							<text class="sub-name-item"> 排名
							<text style="font-weight: bold;">{{userInfo.rankNum? userInfo.rankNum: 0}}</text>
							</text>
							<text class="sub-name-item" v-if="orderType ==2">
								<text v-if="districtType == 0">里程</text>
								<text v-if="districtType == 1">答题数</text>
								<text v-if="districtType == 2">隐患上报数</text>
							<text style="font-weight: bold;">{{userInfo.integral? userInfo.integral : 0}}</text>
							</text>
							<text class="sub-name-item" v-else> 荣誉值
							<text style="font-weight: bold;">{{userInfo.integral? userInfo.integral : 0}}</text>
							</text>
							<text class="sub-name-item"> 获赞
							<text style="font-weight: bold;">{{userInfo.likeNum ? userInfo.likeNum : 0}}</text>
							</text>
							
						</view>
					</view>
				</view>
				

				<view class="rank-title" v-if="orderType !=2">
					<view class="rank-title-item" style="min-width:15%;max-width:15%;">排名</view>
					<view class="rank-title-item width-40"
					:class=" orderType == 2 ?  'width-50' :  '' "
					>信息</view>
					<view class="rank-title-item width-23" 
					:class=" orderType == 2 ?  'width-45' :  '' ">荣誉值</view>
					<view class="rank-title-item width-15"
					:class="orderType == 2 ?  'display-none' : 'width-15' "
					>点赞</view>
					
				</view>
				<view class="rank-title" v-if="orderType ==2">
					<view class="rank-title-item" 
					style="min-width:15%;max-width:15%;">排名</view>
					<view class="rank-title-item width-50"
					
					>信息</view>
					<view class="rank-title-item width-45" v-if="districtType == 0">里程</view>
					<view class="rank-title-item width-45" v-if="districtType == 1">答题数</view>
					<view class="rank-title-item width-45" v-if="districtType == 2">隐患上报数</view>

				</view>
				<view >
<!-- 				 <image 
				 class="refresh-ccw"
				 :style="{transform:`translateY(${reloadScrollTop}px) rotate(${reloadScrollTop*5}deg)`}"
				 :class="!start_state == true  ? 'scroll-up-retrun' : ''"
				  src="/static/img/refresh-ccw.png"></image> -->
				 <view
				 :class="!start_state == true ? 'scroll-up-retrun' : ''"
					:style="{transform:`translateY(${reloadScrollTop}px)`}"
				 >
					 <list-cell-rank
					  class="list-rank"
					  :orderType = "orderType"
					   v-for="(item, index) in AllRank" 
					   :item="item"
					   @iconClick = "showDetailImg(item)"
					 @eventClick="likeThis(item)"
					 :tops="String(index+1)"
					 :districtType = "districtType"
					 ></list-cell-rank>
				 </view>
				
				</view>
				
			</view>

		<uni-popup ref="popup" type="bottom">
			<view class="pop-box">
				<view class="text-box">
					让我们共同参与社会治理活动，争做平安联盟
					合伙人吧!
				</view>
				<view class="share-icon">
					<view class="icon" @click="shareBtn()">
						<image class="img" src="/static/img/List_QQ@2x.png"></image>
						<view class="t">QQ</view>
					</view>
					<view class="icon" @click="shareBtn('weixin','WXSceneSession')">
						<image class="img" src="/static/img/List_WeChat@2x.png"></image>
						<view class="t">微信</view>
					</view>
					<view class="icon" @click="shareBtn('weixin','WXSenceTimeline')">
						<image class="img" src="/static/img/List_pyq@2x.png"></image>
						<view class="t">朋友圈</view>
					</view>
					<view class="icon" @click="shareBtn('sinaweibo')">
						<image class="img" src="/static/img/List_Sina@2x.png"></image>
						<view class="t">微博</view>
					</view>
				</view>
			</view>
			<button @click="closePopup" type="empty">取消</button>
		</uni-popup>
		<swiper-detail-img ref="swiperDetailImg" :imgs="file1" :current="0" type="" :showDetail="showDetail"></swiper-detail-img>
		<!-- <w-loading text="加载中.." mask="true" click="false" ref="loading"></w-loading> -->
		
	</view>
</template>

<script>
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	import swiperDetailImg from '@/components/swiper-detail-img';
	import listCellRank from '@/components/list-cell-rank';
					import newMenuSelect from '@/components/_new-menu-select.vue';
	export default {
		components: {
			listCellRank,
			uniPopup,
			swiperDetailImg,
			newMenuSelect
		},
		data() {
			return {
				file1:"",
				showDetail:false,
				start_state:false,
				reloadScrollTop:0,
				selMenuIndex:"",
				topMenu:[
					{name:"总榜",d:''},
					{name:"周榜",d:'w'},
					{name:"月榜",d:'m'},
					{name:"季榜",d:'s'},
				],
				rankListFilter_1:[
					{name:"村社级",val:"0"},
					{name:"街道级",val:"1"},
					{name:"全区",val:"2"},
				],
				rankListFilter_2:[
					{name:"里程",val:"0"},
					{name:"答题数",val:"1"},
					{name:"隐患上报数",val:"2"},
				],
				baseUrl : getApp().globalData.baseUrl,
				rbacToken : getApp().globalData.rbacToken,
				time:"",
				orderType: 0,
				districtType: 0,
				AllRank: [
				],
				userInfo:{
				}
			};
		},
		onReady(){
			// this.$refs.loading.open()
			//this.$refs.loading.close()
		},
		onShow() {
			this.hasTeam = this.user.hasTeam;
			this.hasDepart = this.user.hasDepart;
			this.getAllRankByType();
			this.getPersonalRankInfo();
		},
		onPullDownRefresh() {
		        console.log('refresh');
				this.pageNo = 1;
				this.getAllRankByType();
				
		},
		methods: {
			//显示头像
			showDetailImg(item) {
				if(item.headImg == ""){
					return ;
				}
				try{
					plus.nativeUI.previewImage([
							`${this.baseUrl}fyProHandle/file/download/${item.headImg}?rbacToken=${this.rbacToken}`,
						]);
				}catch(e){
					this.$refs.swiperDetailImg.hideDetail(true);
					this.file1 = item.headImg;
				}


			},
			//监听开始
			touchstart(e,_){
				this.start_state = true ;
				this.reloadScrollTop_start = e.touches[0].clientY;
			},
			//监听移动
			touchmove(e,_){
				if((e.touches[0].clientY - this.reloadScrollTop_start) < 0){
					return
				}
				if((e.touches[0].clientY - this.reloadScrollTop_start) <= 100){
					this.reloadScrollTop = (e.touches[0].clientY - this.reloadScrollTop_start);
				}
			},
			touchend(){
				if(this.reloadScrollTop>=75){
					this.pageNo = 1;
					this.getAllRankByType();
				}else{
					this.start_state = false ;
					this.reloadScrollTop = 0;
				}
			},
			
			//选择当前
			selMenu(item,idx){

				this.selMenuIndex = item.d;
				this.getAllRankByType();
				this.getPersonalRankInfo();
			},
			getNowTime(){
				this.time = this._moment().format('YYYY-MM-HH hh:mm')
			},
			//点赞
			likeThis(item){
				// this.loadingState();
				item.likeStatus = item.likeStatus == '0' ?  '1' : '0';
				this.$http.post('peaceShopManage/likeRecord/setLikeRecord', {
						id:item.id,
						rbacToken: this.user.rbacToken,
					})
					.then(res => {
						
						uni.hideLoading();
						if(res.data.success === 1){
							uni.showToast({
								icon:'none',
								title: item.likeStatus == '1' ? "点赞成功!" : "已取消点赞!"
							});
							this.getPersonalRankInfo();
							this.getAllRankByType();
						}else{
							uni.showToast({
								icon:'none',
								title: res.data.message
							});
						}
					})
					
			},
			//获取列表
			getAllRankByType() {
				this.loadingState();
				this.$http.get('peaceShopManage/likeRecord/getAllRankByType', {
						rbacToken: this.user.rbacToken,
						districtType :this.districtType,
						orderType:this.orderType,
						d:this.selMenuIndex
					})
					.then(res => {
						uni.hideLoading();
						this.reloadScrollTop = 0;
						if(res.data.success === 1){
							this.getNowTime();
							this.AllRank = res.data.data;
							uni.stopPullDownRefresh();
						}else{
							uni.showToast({
								icon:'none',
								title: res.data.message
							});
						}

					})
			},
			//获取个人排行数据
			getPersonalRankInfo() {
				this.$http.get('peaceShopManage/likeRecord/getPersonalRankInfo', {
						rbacToken: this.user.rbacToken,
						districtType:this.districtType,
						orderType:this.orderType,
						d:this.selMenuIndex
					})
					.then(res => {
						if(res.data.success === 1){
							this.userInfo = res.data.data;
						}else{
							uni.showToast({
								icon:'none',
								title: res.data.message
							});
						}

					})
			},
			
			closePopup() {
				this.$refs.popup.close()
			},
			changeMenu(item) {
				switch(item){
					case  2 :
					if(this.hasTeam == 0){
						return ;
					}
					break ;
					case  3 :
					if(this.hasDepart == 0){
						return ;
					}
					break ;
				}
				
				//因为这个组件没办法实时刷新导致必须得用ref,而且必须得用异步的方法加载
				this.$refs.rankListFilter.firstLoad = true;
				setTimeout(()=>{
					this.$refs.rankListFilter.firstLoadFun();
				},100)

				this.orderType = item;
				this.districtType = 0;
				this.getAllRankByType();
				this.getPersonalRankInfo();
			},
			changeSubMenu(item) {
				this.districtType = item.selIndex;
				this.getAllRankByType();
				this.getPersonalRankInfo();
			},

			shareBtn(provider, scene) {
				uni.share({
					provider: provider,
					scene: WXSenceTimeline,
					type: 1,
					summary: "让我们共同参与社会治理活动，争做平安联盟合伙人吧！",
					success: function(res) {
						console.log("success:" + JSON.stringify(res));
					},
					fail: function(err) {
						console.log("fail:" + JSON.stringify(err));
					}
				});
			}
		},
		onNavigationBarButtonTap(e) {

			this.$refs.popup.open()
			// uni.navigateTo({
			// 	url:'/pages/sharePage/sharePage'
			// })
		}
	}
</script>

<style lang="scss">

.display-none{
	text-align: right;
	display: none !important;
}
.width-15{
	min-width:15%;
	max-width:15%;
}
.width-23{
	min-width:23%;
	max-width:23%;
}
.width-45{
	min-width:45%;
	max-width:45%;
}

.width-50{
	min-width:50%;
	max-width:50%;
}
.width-40{
	min-width:40%;
	max-width:40%;
}

.rank-list{
	box-shadow: 0rpx 3rpx 17rpx 3rpx 
			rgba(255, 91, 91, 0.35);
	width:640rpx;
	height:auto;
	left:50%;
	transform: translateX(-50%);
	position: absolute;
	top:510rpx;
	
	
}
.rank-title{
	display: flex;
	flex-flow:row nowrap;
	// justify-content: space-between;
	width: 100%;
	padding:20rpx;
	background-color: #fff;
	border-radius: 10rpx 10rpx 0 0 ;
	.rank-title-item{
		flex:1;
			display: inline-block;
			text-align: center;
	}
}
	.lines{
		width: 710rpx;
		height: 72rpx;
		margin:0 auto;
		position: relative;

	}
	.backIcon{
		z-index:1000;
		transform: rotate(180deg);
		width:30upx;
		height:60upx;
		position: fixed;
		top: 70upx;
		left:40upx;
	}

	.select-box{
		top: 420upx;
		left:50rpx;
		height:60upx;
		position: absolute;
		z-index:100;
		.pick-box{
			float: right;
			width:240rpx;
			height:60rpx !important;
			.check-title{
				height: 60rpx;;
			}
		}
		
		.top-silder-box{
			float:left;
			width:450rpx;
			z-index:1000;
			color:#f68b8b;
			font-size: 30upx;

			line-height:60upx;
			text-align: center;
		
			overflow: hidden;


			display: flex;
			flex-flow: row nowrap;
			.item-check{
				background-color: #fdd8db;
				border-radius: 6rpx 6rpx 0rpx 0rpx;
				color:#8b2020;
			}
			.item-un-check{
				opacity: 0.5;
			}
			.item{
				flex:1;
				
			}
		}
		
	}
	.list-rank {
		background: #fff;
	}

	.scroll-bar {
		
		height: 0;
		flex: 1;
	}

	.share-icon {
		width: 100%;
		display: flex;
		margin-top: 50upx;
		margin-bottom: 40upx;

		.icon {
			text-align: center;
			flex: 1;

			.img {
				width: 100upx;
				height: 100upx;
			}
		}
	}

	.pop-box {
		.text-box {
			position: relative;
			line-height: 52upx;
			color: #414693;
			padding: 120upx 58upx;
			font-size: 26upx;
			margin: 0 auto;
			background-color: #e0e1f3;
			border-radius: 30px;
		}
	}

	.content {
		background: #f2f2f2;
		height: 100vh;
		overflow: hidden;
	}

	.bg {
		position: fixed;
		top: 0;
		width: 100%;
		height:100%;
	}

	.wrap-box {
		position: relative;
		flex: 1;
		max-height: 480upx;
		min-height: 480upx;

		.top-box {
			height:400rpx;
			width:100%;
			position: relative;
			z-index: 100;
			margin: 0 auto;
			
			color: #fff;
			.left-side {
				position: relative;
				top: 220rpx;
				margin:0 auto;
				display: flex;
				flex-flow: row wrap;
				width: 465rpx;
				height:80rpx;
				z-index:1000;
				color:#ffbdb6;
				.check-btn {
					color:#8b2020;
					// background: rgba(0, 0, 0, 0.2);
				}

				.btn {
					text-align: center;
					flex: 1;
					// min-width:50%;
					// max-width:50%;
					padding: 10upx;
					font-size: $font-base;
				}

			}

			.time {
				margin-top:10upx;
				font-size:28upx;
				width: 100%;
				float: left;
			}

			.top-box-bg {
				position: absolute;
				left:0;
				top:0;
				width: 100%;
				height: 100%;
			}
		}

		.sub-menu {
			bottom: 0;
			position: absolute;
			width: 100%;
			height: 120upx;
			line-height: 120upx;
			background: rgba(0, 0, 0, 0.2);
			display: flex;
			flex-flow: row nowrap;
			overflow: hidden;
			font-size:30upx;
			.item {
				position: relative;
				width: 50%;
				flex: 1;
				text-align: center;
				color: rgba(255, 255, 255, 0.2);

				.arrow {
					display: none;
				}
			}

			.check-sub-btn {
				color: #fff !important;

				.arrow {
					display: block;
					position: absolute;
					bottom: -3upx;
					left: 50%;
					transform: translateX(-50%);
					width: 68upx;
					height: 23upx;
				}
			}
		}

	}

	.user-info-box {
		background-image: linear-gradient(0deg, 
				#ffefef 0%, 
				#f6cdcd 100%);
			box-shadow: inset 0rpx 6rpx 10rpx 0rpx 
				rgba(97, 6, 6, 0.17);
		border-radius: 0rpx 0rpx 10rpx 10rpx;
		max-height: 200upx;

		flex: 1;
		// float:left;
		font-size: $font-base;	
		padding: 0 20upx;
		padding-right:40upx;
		// margin:48upx 0 ;
		color: #000;
		display: flex;
		align-items: center;
		// position: relative;
		z-index: 1;
		height:150rpx;
		.info-box {
			width: 100%;
		}

		.portrait {
			border: 5upx solid #e32417;
			border-radius: 50%;
			width: 100upx;
			height: 100upx;
			border-radius: 50%;
		}

		.right-side-box {
			font-size: 20upx;
			position: absolute;
			right: 40upx;

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
			margin-left: 20upx;
			font-size: $font-sm;
			color:#e32417;
			display: flex;
			flex-flow:row nowrap;
			justify-content: space-between;
			.sub-name-item{
				
			}
		}

		.right-side {
			line-height: $line-height-40;
			font-size:$new-font-26;
			color:#6c3838;
			float: right;
		}
	}


</style>
