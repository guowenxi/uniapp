<template>
	<view class="content no-padding">
		<scroll-view class="history-section icon">
			<view class="title-bar">
				<image class="title-text" src="/static/huodong/activity_name@2x.png"></image>
				<image class="bg" src="/static/huodong/activity_bg@2x.png"></image>
				<view v-if="joinState == 1 ? true : false" class="icons">
					<image class="icon" @click="joinTeam" src="/static/huodong/bt_signup@2x.png"></image>
				</view>
				<view v-if="joinState == 2 ? true : false " class="icons">
					<image class="icon"  
					@click="showTab(1)"
					:src="
					tabState == 1  ?
					 '/static/huodong/bt_rule_click@2x.png' :
					'/static/huodong/bt_rule@2x.png' 
					"
					></image>
					<image class="icon"
					  @click="showTab(2)"
					  :src="
					  tabState == 2 || tabState == 3?
					   '/static/huodong/bt_Ranking_click@2x.png' :
					  '/static/huodong/bt_Ranking@2x.png' 
					  "></image>
				</view>
				
				<view v-if="joinState == 3 ? true : false" class="icons">
					
				</view>
			</view>
			<view class="pop-side">
				<view class="pop-inner">
					
				</view>
			</view>
			<view v-if="tabState ==1 ? true : false " style="margin-top: -8px;">
				<view class="content-side-title ">
					<view class="top-linear"></view>
					<view class="line-title ">
						<view class="left"></view>
						<view class="text">活动进度</view>
						<view class="right"></view>
					</view>
					<view class="line-bar">
						<view class="line-bar-title">
							<view class="title" v-for="item in huodong.fyActivityStages">
								{{item.stageName}}
							</view>
						</view>
						<view class="lines">
							<view class="wrap-line">
								<view class="inner-line" 
								:style="{'width':`${huodong.actPercentage> 100 ?  100 : huodong.actPercentage}`+'%'}"></view>
							</view>
						</view>
						<view class="line-bar-arrow">
							<view class="arrow" v-for="item in huodong.fyActivityStages">
								<image class="icon" src="/static/activity_triangle@2x.png"></image>
							</view>
						</view>
						
						<view class="sub-text">
							<view class="text" v-for="item in huodong.fyActivityStages">
								{{`${filterDate(item.startTime)} - ${filterDate(item.endTime)}`}}
							</view>
				
						</view>
					</view>
					
				</view>
				<view class="content-side" v-for="item in huodong.fyActivityStages">
					<image class="c" style="left:5%" src="/static/activity_knot@2x.png"></image>
					<image class="c" style="right:5%" src="/static/activity_knot@2x.png"></image>
					<view class="line-title">
						<view class="left"></view>
						<view class="text">{{item.stageName}}</view>
						<view class="right"></view>
					</view>
					<view class="main">
						<view >时间:{{`${filterDate(item.startTime)} - ${filterDate(item.endTime)}`}}</view>
						<view >说明:{{item.stageDesc}}</view>
						<view>奖品（6名/团队)</view>
						<view class="swiper">
							
							<view v-for="(img,idx) in item.fyActivityAwards" class="item">
								<view class="img">
									<image class="bg" 
									:src="`${baseUrl}fyProHandle/file/download/${img.awardImage}?rbacToken=${rbacToken}`"
									></image>
									<view v-if="idx == 0 ? true : false" class="icon">一等奖</view>
									<view v-if="idx == 1 ? true : false" class="icon">二等奖</view>
									<view v-if="idx == 2 ? true : false" class="icon">三等奖</view>
								</view>
								<view class="text">{{img.awardDesc}}</view>
							</view>
						</view>
					</view>
				</view>
				<view class="content-side" >
					<image class="c" style="left:5%" src="/static/activity_knot@2x.png"></image>
					<image class="c" style="right:5%" src="/static/activity_knot@2x.png"></image>
					<view class="line-title">
						<view class="left"></view>
						<view class="text">活动说明</view>
						<view class="right"></view>
					</view>
					<view class="main">
						<view >时间:{{`${filterDate(huodong.startTime)} - ${filterDate(huodong.endTime)}`}}</view>
						
						<view >活动地点:{{huodong.activityDistrict}}</view>
						<view >参与方式:{{huodong.participateStyle}}</view>
					</view>
				</view>
				
			</view>
			
			<view v-if="tabState ==2 ? true : false " style="margin-top: -8px;">
				<view class="content-side-title ">
					<view class="top-linear"></view>
					<view class="line-title ">
						<view class="left"></view>
						<view class="text">我的团队</view>
						<view class="right"></view>
					</view>
					<view class="user-info-box">
						<view class="portrait-box">
							<image class="portrait" 
							:src="`${baseUrl}fyProHandle/file/download/${personInfo.headImg}?rbacToken=${rbacToken}`
							"></image>
						</view>
						<view class="info-box">
							<view class="username">
								<text>{{personInfo.districtName}}</text>
								<text class="right-side" >{{personInfo.rankNum}}</text>
							</view>
							<view class="sub-name">
								<text>当前{{huodong.stageIndex== 0 ? '人数' : '积分'}}<text class="font-orange">{{personInfo.integral}}</text></text>
								<text class="right-side">排名</text>
							</view>
						</view>
					</view>
					
					
				</view>
				<view class="content-side">
					<image class="c" style="left:5%" src="/static/activity_knot@2x.png"></image>
					<image class="c" style="right:5%" src="/static/activity_knot@2x.png"></image>
					<view class="line-title">
						<view class="left"></view>
						<view class="text">排行榜</view>
						<view class="right"></view>
					</view>
					<view class="main">
						<list-cell-huodong
						 class="list-rank"
						  v-for="(item, index) in ranklist" 
						  :item="item"
						  :stageIndex="huodong.stageIndex"
						  @iconClick = "showDetailImg(item)"
						@eventClick="likeThis(item)"
						:tops="String(index+1)"
						
						></list-cell-huodong>
					</view>
				</view>
				
			</view>
			
			<view v-if="tabState ==3 ? true : false " style="margin-top: -8px;">
				<view class="content-side">
					<image class="c" style="left:5%" src="/static/activity_knot@2x.png"></image>
					<image class="c" style="right:5%" src="/static/activity_knot@2x.png"></image>
					<view class="line-title">
						<view class="left"></view>
						<view class="text">团队邀约奖</view>
						<view class="right"></view>
					</view>
					<view class="main">
						<list-cell-huodong
						 class="list-rank"
						  v-for="(item, index) in winnersForStage1" 
						  :item="item"
						  :stageIndex="0"
						  @iconClick = "showDetailImg(item)"
						@eventClick="likeThis(item)"
						:tops="String(index+1)"
						
						></list-cell-huodong>
					</view>
				</view>
				
				<view class="content-side">
					<image class="c" style="left:5%" src="/static/activity_knot@2x.png"></image>
					<image class="c" style="right:5%" src="/static/activity_knot@2x.png"></image>
					<view class="line-title">
						<view class="left"></view>
						<view class="text">最佳团队奖</view>
						<view class="right"></view>
					</view>
					<view class="main">
						<list-cell-huodong
						 class="list-rank"
						  v-for="(item, index) in winnersForStage2" 
						  :item="item"
						  :stageIndex="1"
						  @iconClick = "showDetailImg(item)"
						@eventClick="likeThis(item)"
						:tops="String(index+1)"
						
						></list-cell-huodong>
					</view>
				</view>
				
				
			</view>

			
			
			
			<view style="width:100%;height:30px"></view>
		
		
		</scroll-view>
		
		<swiper-detail-img ref="swiperDetailImg" :imgs="file1" :current="0" type="" :showDetail="showDetail"></swiper-detail-img>
				
		<uni-popup ref="popup" type="center">
			<view @click="closePopup">
				<image v-if="popstatus == 1 ? true : false" class="pop-box" src="/static/huodong/pop/activity_success@2x.png"></image>
				<image v-if="popstatus == -4 ? true : false" class="pop-box" src="/static/huodong/pop/activity_audit@2x.png"></image>
				<image v-if="popstatus == -5 ? true : false" class="pop-box" src="/static/huodong/pop/activity_fail@2x.png"></image>
			</view>
		</uni-popup>
		

	</view>

</template>

<script>
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
import swiperDetailImg from '@/components/swiper-detail-img';
import listCellHuodong from '@/components/list-cell-huodong';
	export default {
		components: {
listCellHuodong,
swiperDetailImg,
uniPopup
		},
		data() {
			return {
				winnersForStage1:[],
				winnersForStage2:[],
				popstatus:0,
				joinState:1,
				file1:[],
				showDetail:false,
				baseUrl : getApp().globalData.baseUrl,
				rbacToken : getApp().globalData.rbacToken,
				listLength :0,
				tabState:1,
				AppList: [
				],
				personInfo:[],
				ranklist:[],
				userInfo:{},
				huodong:{
					fyActivityStages:[
						{
							stageName:"haha",
							startTime:"2000-20-20 000",
							endTime:"2000-20-20 000",
							stageDesc:"描述",
							fyActivityAwards:[
								{
									awardImage:"",
									awardDesc:"cccdi"
								}
							]
						},
					],
					startTime:"2000-20-20 000",
					endTime:"2000-20-20 000",
					activityName:"活动名称",
					activityBackground:"",
					activityDescription:"报名成功后会在软件系统中形成一个团队群，群里发布团队邀约二维码，队员转发给朋友进行APP下载注册，最后根据队员增长数量评比，最高队伍评比出“团队邀约奖”。每个参赛队员可获取一个参赛礼包！",
				},
				AllRank:[
					{
						"headImg":"",
						"districtName":"繁荣社区",
						"integral":20,
						"name":"潘浩",
						"likeStatus":0,
						"id":"8a7407d151294a4a9a02fc0668b44405",
						"likeNum":0
					}
				],
				lineBar:[
					{name:"123",date:"123123"},
					{name:"123",date:"123123"},
					{name:"123",date:"123123"}
				],
				imgs:[
					{img:"/static/1571194502069_1570778409.png",t:"价值800元小米网红电饭煲"},
					{img:"/static/1571194502069_1570778409.png",t:"价值800元小米网红电饭煲"},
					{img:"/static/1571194502069_1570778409.png",t:"价值800元小米网红电饭煲"},
				]
			};
		},
		onLoad(){
			debugger
			// this.id = this.selListItem.linkRecord;
			this.id = this.selListItem.activityId;
			// this.id= "FirstActivity0.9129724024844893";
			this.getActivityById(this.id);
			
		},
		methods:{
			//操蛋的转日期
			filterDate(t){
				
				var time = "";
				 var mm = t.split(" ")[0].split("-")[1];
				 var yy = t.split(" ")[0].split("-")[2];
				time = `${mm}月${yy}日`;
				return time; 
			},
			closePopup() {
				this.$refs.popup.close()
			},
			//
			joinTeam(){
				this.applyActivity();
				// this.$refs.popup.open();
			},
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
			//切换
			showTab(st){
				this.tabState= st;
				if(st == 1){
					//this.getTeamRankForEventApp();
				}else if(st == 2){
					if(this.huodong.stageIndex == this.huodong.stagesNum-1){
						this.tabState = 3;
						this.getWinnerForEvent();
					}else{
						this.getTeamRankForEventApp();
					}
					
				}
			},
			
			joinStateFun(status){
				let _state = false;
				const  huodongState  = uni.getStorageSync('huodongState');
				if(!huodongState) uni.setStorageSync('huodongState', "");
				
				this.popstatus = status;
				switch(status.toString()){
					case  "1" :
					//参加成功
					this.joinState = 2;
					_state = true ; 
					break;
					case  "-5" :
					//参加未通过
					this.joinState = 1;
					_state = true ; 
					break;
					case  "-4" :
					//正在审核
					this.joinState = 3;
					_state = true ; 
					break;
				}
				if(huodongState != "" && huodongState!=status && _state ){
					this.$refs.popup.open();
				}
				uni.setStorageSync('huodongState', status)
				
			},
			//获取活动列表
			getActivityById(id) {
				this.$http.get('fyActivity/activityApp/getActivityById', {
					id : id,
					rbacToken:this.user.rbacToken
					})
					.then(res => {
						if (res.data.success == 1) {
							this.huodong = res.data.data;
							//这行代码也如此操蛋
							if(this.huodong.stageIndex  == 0 ){
								this.huodong.actPercentage = 20;
							}else{
								this.huodong.actPercentage = this.huodong.stageIndex/(this.huodong.stagesNum-1)*100;
							}
							
							//就上面这行
							this.joinStateFun(res.data.data.teamStatusMap.status)
						} else {
							uni.showToast({
								mask:true,
								icon: 'none',
								title: res.data.message
							});
						}
						
					})
			},
			//参加比赛
			applyActivity(){
				this.$http.post('fyActivity/activityApp/applyActivity', {
					activityId : this.id,
					rbacToken:this.user.rbacToken
					})
					.then(res => {
						if (res.data.success == 1) {
							uni.showToast({
								mask:true,
								icon: 'none',
								title: res.data.message
							});
						} else {
							uni.showToast({
								mask:true,
								icon: 'none',
								title: res.data.message
							});
						}
					})
			},
			//切换列表
			//排行榜
			getWinnerForEvent(){
				this.$http.get('peaceShopManage/likeRecord/getWinnerForEvent', {
							activityId : this.id,
							rbacToken:this.user.rbacToken
							})
							.then(res => {
								if (res.data.success == 1) {
									this.winnersForStage1 = res.data.data.winnersForStage1;
									this.winnersForStage2 = res.data.data.winnersForStage2;
								} else {
									uni.showToast({
										mask:true,
										icon: 'none',
										title: res.data.message
									});
								}
								
							})
			},
			
			//排行榜
			getTeamRankForEventApp(){
				this.$http.get('peaceShopManage/likeRecord/getTeamRankForEventApp', {
					activityId : this.id,
					beginTime:this.huodong.fyActivityStages[this.huodong.stageIndex].startTime,
					endTime:this.huodong.fyActivityStages[this.huodong.stageIndex].endTime,
					orderType:this.huodong.stageIndex,
					rbacToken:this.user.rbacToken
					})
					.then(res => {
						if (res.data.success == 1) {
								this.ranklist = res.data.data.ranklist;
								this.personInfo = res.data.data.personInfo;
								
						} else {
							uni.showToast({
								mask:true,
								icon: 'none',
								title: res.data.message
							});
						}
						
					})
			},
		}
	}
</script>

<style lang="scss">
	.uni-popup .uni-popup__wrapper-box{
		padding:0 !important;
	}
	.pop-box{
		width:480upx;
		height:620upx;
	}
	.swiper{
		margin-top:10upx;
		width:100%;
		display: flex;
		flex-flow: row nowrap;
		
		.item{
			
			flex:1;
			.img{
				margin:0 auto;
				overflow: hidden;
				position: relative;
				width: 180upx;
				height: 180upx;
				background-color: #000000;
				border-radius: 10upx;
				.icon{
					color:#fff;
					background: #f3795c;
					left:0;
					bottom: 0;
					position: absolute;
					z-index:100;
					font-size:20upx;
					padding:3upx;
					border-radius: 0px 10upx 0px 10upx;
				}
			}
			.text{
				text-align: center;
			}
			

		}
	}
	.line-title{

		text-align: center;
		font-size:36upx;
		position: relative;
		display: inline-block;
	
		left: 50%;
		transform: translateX(-50%);
		color:#E32417;
		&:before{
			width:70upx;
			content:"";
			position: absolute;
			top:51%;
			transform: translateY(-50%);
			height:1px;
			background: #E32417;
			left:-80upx;
		}
		&:after{
			width:70upx;
			content:"";
			position: absolute;
			top:51%;
			transform: translateY(-50%);
			height:1px;
	
			background: #E32417;
			right:-80upx;
		}
	}
	
	.content{
		background: #eee;
	}
	.history-section{
		height:100%;
		background-image: linear-gradient(180deg, 
				#e32417 0%, 
				#f3795c 100%);
	}
	.title-bar{
		width:100%;
		height:530upx;
		.title-text{
				width: 590upx;
				height: 170upx;
				left:50%;
				top:50upx;
				right:0;
				position: absolute;
				transform: translateX(-50%);

		}
			.bg{
				width:100%;
				height:530upx;
			}
			.icons{
				left:50%;
				transform: translateX(-50%);
				position: absolute;
				top: 400upx;
				width:100%;
				height: 95upx;
				text-align: center;
				.icon{
					margin:0 40upx;
					;
					width: 277upx;
					height: 95upx;
				}
			}
	}
	.pop-side{
			width: 690upx;
			height: 39upx;
			background-color: #ed3017;
			border-radius: 10upx;
			margin:0 auto;
			position: relative;
			z-index:100;
			margin-top:-20upx;
			.pop-inner{
					width: 666upx;
					height: 12upx;
					background-color: #bf220c;
					border-radius: 5upx;
					position:absolute;
					left:50%;
					top:50%;
					transform: translate(-50%,-50%);
					z-index:200;
			}
	}
	.content-side-title{
			
			.line-title{
				margin-top:20upx;
				margin-bottom:5upx;
			}
			width: 658upx;
			background-color: #ffffff;
			border-radius: 0px 0px 10upx 10upx;
			margin:0 auto;

			position: relative;
			padding-bottom:40upx;

			z-index: 200;
			.top-linear{
				position: absolute;
				width:100%;
					height: 20upx;
					background-image: linear-gradient(0deg, 
						#ffffff 0%, 
						#f8d7d7 100%), 
					linear-gradient(
						#ffffff, 
						#ffffff);
					background-blend-mode: normal, 
						normal;
					border-radius: 0px 0px 10upx 10upx;
					
			}
			.line-bar{
				margin:0 auto;
			
				height:auto;
				.line-bar-title{
					font-size: $font-lg;
					line-height:50upx;
					color: #fe6161;
					width:100%;
					position: relative;
					display: flex;
					flex-flow:row nowrap;
				
				.title{
						text-align: center;
						flex:1;
					}
				}
				.lines{
					width:80%;
					height:28upx;
					border-radius: 28upx;
					position: relative;
					left:50%;
					transform: translateX(-50%);
					.wrap-line{
						width:98%;
						height:28upx;
						border-radius: 28upx;
						position:absolute;
						left:50%;
						top: 50%;
						transform: translate(-50%,-50%);
						background: #ffcfc1;
						.inner-line{
							transition: all 2s;
							width:0%;
							height:28upx;
							border-radius: 28upx;
							position:absolute;
							background: #fe6161;
						}
					}
				}
				.line-bar-arrow{
			
					width:100%;
					position: relative;
					display: flex;
					flex-flow:row nowrap;
					height:30upx;
				.arrow{
					height:100%;
						color: #fe6161;
						flex:1;
						position: relative;
						.icon{
								width: 20upx;
								height: 13upx;
								position:absolute;
								left:50%;
								top: 50%;
								transform: translate(-50%,-50%);
						}
					}
				}
				.sub-text{
				
					width:100%;
					position: relative;
					display: flex;
					flex-flow:row nowrap;
				.text{
					text-align: center;
					height:100%;
						color: #333;
						flex:1;
			
			
					}
				}
				
			}
			
	}
	.content-side{
		.main{
			line-height:60upx;
			font-size:$font-base;
		}
		.c{
				width: 13upx;
				height: 78upx;
				position:absolute;
				top:-45upx;
		}

		width: 658upx;
		padding:40upx 20upx;
		margin:0 auto;
		margin-top:20upx;
		position: relative;
		background: #fff;
		z-index:200;
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
