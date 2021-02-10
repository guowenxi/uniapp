<template>
	<view class="content no-padding">
		<image class="bg" src="/static/img/List_bg@2x.png"></image>
		<image class="backIcon"  src="/static/img/jiantou_copy@2x.png" @click="navigateBack(1)"></image>
		<view class="top-silder-box">
			<view class="item" v-for="(item,idx) in topMenu" @click="selMenu(item,idx)" :class="selMenuIndex == item.d?  'item-check' : 'item-un-check' ">
				{{item.name}}
			</view>
		</view>
					
		<view class="wrap-box">
			<view class="top-box">
				<view class="left-side">
					<view class="btn" :class="orderType == 2 ? 'check-btn' : ''"  
					:style="hasTeam == 1 ? {opacity:'1'} : {opacity:'0.5'}"
					 @click="changeMenu(2)">
						<view>团队</view>
						<view>排行榜</view>
					</view>
<!-- 					<view class="btn" :class="orderType == 3 ? 'check-btn' : ''"  
					:style="{opacity:hasDepart == 1 ? '1' : '0.5'}" 
					@click="changeMenu(3)">
						<view>部门</view>
						<view>排行榜</view>
					</view> -->
					<view class="btn" :class="orderType == 0 ? 'check-btn' : ''" @click="changeMenu(0)">
						<view>荣誉值</view>
						<view>排行榜</view>
					</view>
					<view class="btn" :class="orderType == 1 ? 'check-btn' : ''" @click="changeMenu(1)">
						<view>点赞</view>
						<view>排行榜</view>
					</view>

				</view>
				<!-- <view class="time">最后更新于 {{time}}</view> -->
				<image class="right-side" src="/static/img/List_cup@2x.png"></image>
			</view>
			
			<view class="sub-menu"  v-if="orderType ==0 || orderType == 1 ? true : false">
				<view class="item" :class="districtType == 0 ? 'check-sub-btn' : ''" @click="changeSubMenu(0)">
					<view>村社级</view>
					<image class="arrow" src="/static/img/List_Triangle@2x.png"></image>
				</view>
				<view class="item" :class="districtType == 1 ? 'check-sub-btn' : ''" @click="changeSubMenu(1)">
					<view>街道级</view>
					<image class="arrow" src="/static/img/List_Triangle@2x.png"></image>
				</view>
				<view class="item" :class="districtType == 2 ? 'check-sub-btn' : ''" @click="changeSubMenu(2)">
					<view>全区</view>
					<image class="arrow" src="/static/img/List_Triangle@2x.png"></image>
				</view>
			</view>
			<view class="sub-menu"  v-else>
				<view class="item" :class="districtType == 0 ? 'check-sub-btn' : ''" @click="changeSubMenu(0)">
					<view>里程</view>
					<image class="arrow" src="/static/img/List_Triangle@2x.png"></image>
				</view>
				<view class="item" :class="districtType == 1 ? 'check-sub-btn' : ''" @click="changeSubMenu(1)">
					<view>答题数</view>
					<image class="arrow" src="/static/img/List_Triangle@2x.png"></image>
				</view>
				<view class="item" :class="districtType == 2 ? 'check-sub-btn' : ''" @click="changeSubMenu(2)">
					<view>隐患上报数</view>
					<image class="arrow" src="/static/img/List_Triangle@2x.png"></image>
				</view>
				<view class="item" :class="districtType == 3 ? 'check-sub-btn' : ''" @click="changeSubMenu(3)">
					<view>荣誉值</view>
					<image class="arrow" src="/static/img/List_Triangle@2x.png"></image>
				</view>
			</view>

		</view>
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
					<text class="right-side" v-if="orderType==0 ? true :  false">{{userInfo.integral ? userInfo.integral : 0}}</text>
					<text class="right-side" v-if="orderType==1 ? true :  false">{{userInfo.likeNum ? userInfo.likeNum : 0}}</text>
				</view>
				<view class="sub-name">
					<text>我在{{userInfo.districtName}}　{{userInfo.peopleNum}}人  排名<text class="font-orange">{{userInfo.rankNum}}</text></text>
					<text class="right-side font-red"></text>
				</view>
			</view>
		</view>
		
		<scroll-view class="scroll-bar" scroll-y="true" 
		
		 v-on:touchstart="touchstart"
		 v-on:touchmove="touchmove"
		 v-on:touchend="touchend"
		 >
		 <image 
		 class="refresh-ccw"
		 :style="{transform:`translateY(${reloadScrollTop}px) rotate(${reloadScrollTop*5}deg)`}"
		 :class="!start_state == true  ? 'scroll-up-retrun' : ''"
		  src="/static/img/refresh-ccw.png"></image>
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

		</scroll-view>

		<uni-popup ref="popup" type="bottom">
			<view class="pop-box">
				<view class="text-box">
					让我们共同参与社会治理活动，争做平安联盟
					合伙人吧！
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
	export default {
		components: {
			listCellRank,
			uniPopup,
			swiperDetailImg
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
			},
			getNowTime(){
				this.time = this._moment().format('YYYY-MM-HH hh:mm')
			},
			//点赞
			likeThis(item){
				this.loadingState();
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
						orderType:this.orderType
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
				
				this.orderType = item;
				this.districtType = 0;
				this.getAllRankByType();
				this.getPersonalRankInfo();
			},
			changeSubMenu(item) {
				this.districtType = item;
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

	.backIcon{
		z-index:1000;
		transform: rotate(180deg);
		width:30upx;
		height:60upx;
		position: fixed;
		top: 70upx;
		left:40upx;
	}
	.top-silder-box{
		z-index:1000;
		color:#fff;
		font-size: 30upx;
		width:70%;
		height:60upx;
		line-height:60upx;
		text-align: center;
		border-radius: 60upx;
		overflow: hidden;
		position: fixed;
		top: 70upx;
		left:50%;
		transform: translateX(-50%);
		background: rgba(0,0,0,0.5);
		display: flex;
		flex-flow: row nowrap;
		.item-check{
			background: #fff;
			color:#e32417;
		}
		.item-un-check{
			opacity: 0.5;
		}
		.item{
			flex:1;
			
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
		height: 480upx;
	}

	.wrap-box {
		position: relative;
		flex: 1;
		max-height: 480upx;
		min-height: 480upx;

		.top-box {
			height:50%;
			width:90%;
			position: relative;
			z-index: 100;
			margin: 0 auto;
			margin-top:150upx;
			color: #fff;
			.left-side {
				position: relative;
				top: 50%;
				transform: translateY(-50%);
				display: flex;
				flex-flow: row wrap;
				width: 70%;
				float: left;

				.check-btn {
					background: rgba(0, 0, 0, 0.2)
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

			.right-side {
				fonts-size:28upx;
				font-weight: bold;
				position: absolute;
				right: 0;
				float: right;
				width: 200upx;
				height:220upx;
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
		margin-bottom: 20upx;
		max-height: 200upx;
		background: #fff;
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

		.info-box {
			width: 100%;
		}

		.portrait {
			border: 5upx solid #e32417;
			border-radius: 50%;
			width: 130upx;
			height: 130upx;
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
			color: #9f9e9e;
		}

		.right-side {
			float: right;
		}
	}


</style>
