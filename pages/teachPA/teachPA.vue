<template>
	<!-- 	v-on:touchstart="touchstart"
		v-on:touchmove="touchmove"
		v-on:touchend="touchend"
		v-on:scroll.passive="onScroll" -->
	<view class="content no-padding"
	>
	<!-- <view>{{scrollClientY}}</view> -->
		<view class="xuexi-box" >
			<view class="xuexi-item">
				<image class="text-box" src="/static/img/study_word@2x.png"></image>
				<view class="sub-text">今天已有{{userInfo.countPeople}}人参与</view>
				<view class="right-button" @click="dati">开始答题</view>
			</view>
					<image class="bg" src="/static/_new/stady_bg@2x.png"></image>
					<view class="tj-sction">
						<!-- <image class="bg" src="/static/img/List_bg@2x.png"></image> -->
						<view class="tj-item">
							<view class="num">{{userInfo.answerQuestionNum}}<text class="sub-symbol"></text></view>
							<view class="title">挑战答题总数</view>
						</view>
						<view class="middle-line" style="left:33%"></view>
						<view class="tj-item">
							<view class="num">{{userInfo.studyNum}}</view>
							<view class="title">总学习次数</view>
						</view>
							<view class="middle-line" style="left:65%"></view>
							<view class="tj-item">
							<view class="num">{{userInfo.todayIntegral}}<text class="sub-symbol">分</text></view>
							<view class="title">今日答题分数</view>
							<!-- <uni-rate class="rate-box" value="4" @change="changerate" size="20" margin="5" disabled></uni-rate> -->
						</view>
					</view>
					
					
		</view>

		<view class="title-box" :class="pageState ? 'fixed-box' :  '' ">
			<!-- <pickerSelect  class="pick-box" keyName="sub_name" :sel-list="tagList" @btnClick="changeSelect($event,'fieldName')"></pickerSelect> -->
			<scroll-view class="new-sub-icon" scroll-x="true">
				<view class="icon"
				 v-for="(item,index) in tagList"  
				@click="tabChange(index)"
				:class="item.id== type ? 'icon-check-on' : '' "
				>{{item.name}}</view>
			</scroll-view>
			
			<new-menu-select
			v-if="tabList.length>0"
			class="pick-box" 
			:selList="[tabList]"
			 keyName="name"
			modal="absolute"
			queryName="name" valName="id" @btnClick="changeSelect"></new-menu-select>
				
			
			
		</view>
		
		<view
		:class="pageState ? 'fixed-box-content' :  '' "
		class="scroll-bar"
		
		>
			
			<image v-if="Number(total) === 0  ? true : false" class="prompt_img" src="/static/img/prompt_blank@2x.png" ></image>
			<view v-if="format == 4 ? true : false">
				<list-cell-topic v-for="(item,index) in appList"
				
				:item="item"
				:idx="index"
				:format = 'format'
				@eventClick="bolNavTo('/pages/teachInfoListXX/teachInfoListXX',item)"
				 ></list-cell-topic>
			</view>
			<view v-else>
				<new-list-cell-teach v-for="(item,index) in appList"
				:item="item"
				:format = 'format'
				@eventClick="bolNavTo('/pages/teachInfoListXX/teachInfoListXX',item)"
				 ></new-list-cell-teach>
			</view>
			
		</view>
	</view>
</template>

<script>
	import leftLineTitle from '@/components/left-line-title.vue';
	import listCellTeach from "@/components/list-cell-teach.vue";
	import listCellAnswer from "@/components/list-cell-answer.vue";
	import listCellAnswerNew from "@/components/list-cell-answer-new";
	import uniRate from "@/components/uni-rate/uni-rate.vue";
	import pickerSelect from '@/components/pickerSelect.vue';
	import subLineText from '@/components/sub-line-text.vue';
	
	import newWucTab from '@/components/_new-wuc-tab/_new-wuc-tab';
	import listCellTopic from "@/components/list-cell-topic.vue"
	import newMenuSelect from '@/components/_new-menu-select.vue';
	import newListCellTeach from "@/components/_new-list-cell-teach"
	export default {
		components: {
			newMenuSelect,
	
			listCellTopic,
			leftLineTitle,
			listCellTeach,
			listCellAnswer,
			listCellAnswerNew,
			pickerSelect,
			subLineText,
			uniRate,
			newWucTab,
			newListCellTeach
		},
		data() {
			return {
				keyWord:"",
				pageState:false,
				scrollpageY:0,
				domHeight:400,
				domHeight_default:uni.upx2px(360),
				scrollClientY:0,
				start_state:false,
				reloadScrollTop:0,
				formatIndex:0,
				fieldNameIndex:0,
				type:null,
				format:0,
				total:null,
				pageNo:1,
				pageSize:20,
				TabCur:0,
				reviewStatus:0,
				wrapBoxWidth:"",
				selIndex:0,
				tabList: [],
				tagList:[],
				userInfo:{
					answerIntegral:"0",
					answerCount:"0",
					todayAnswerIntegral:"0",
					resurgence:"0",
				},
				appList:[],
				Questionnaire:[],
				loadpPageState:false,
			};
		},
		onLoad(){
			this.loadpPageState = true;
			this.getFiled();
		
			// plus.globalEvent.addEventListener('scroll', (e,_) => {
				
			// 	console.log(e.target.documentElement.scrollTop);
				
			// }, true);
			
		},
		onShow(){
			this.user.answerCG = 0 ;
			// this.fySafeStudy();
			// this.fySafeQuestionnaire();
			this.getAnwserByUser();
			//判断是否是首次加载 首次不加载
			if(this.loadpPageState){
				this.fySafeStudy();
			}
			//判断今日是否可再答题
			//this.isChange();
		},
		computed:{
			_height(){
				if(this.domHeight_default){
					
				}
				
				return 400;
			}
		},
		onPageScroll(e){
			if(e.scrollTop>this.domHeight_default){
				this.pageState = true;
				return ;
			}
			if(e.scrollTop<=this.domHeight_default){
				this.pageState = false;
				return ;
			}
		},
		methods:{
			//监听滚动
			onScroll(e,_){
				debugger
				// console.log(e);
			},
			//监听开始
			touchstart(e,_){
				// console.log(e);
				this.start_state = true ;
				//首先获取当前点
				this.touch_start_num = e.touches[0].clientY;
				//设定当前锚点
				this._domHeight = this.domHeight;
				// this.reloadScrollTop_start = e.touches[0].clientY;
			},
			//监听移动
			touchmove(e,_){
				
				this.scrollpageY= e.touches[0].pageY-e.touches[0].clientY;
				// console.log(this.scrollpageY);
				if(this.scrollpageY>this.domHeight_default){
					this.pageState = true;
					return ;
				}
				if(this.scrollpageY<=this.domHeight_default){
					this.pageState = false;
					return ;
				}
				
			},
			touchend(){
				if(this.reloadScrollTop>=75){
					this.pageNo = 1;
					this.fySafeStudy();
				}else{
					this.start_state = false ;
					this.reloadScrollTop = 0;
				}
			},
			
			
			dati(){
				// this.bolNavTo('/pages/teachInfoListNew/teachInfoListNew',{});
				this.bolNavTo('/pages/teacherWelcome/teacherWelcome',{});
			},
			tabChange(index) {
			
				this.keyWord = "";
				this.showMore = false;
				this.pageNo = 1;
				this.fieldNameIndex = index;
				this.type = this.tagList[index].id;
			
				this.fySafeStudy();
			},
			//切换类型
			changeSelect(item,type) {
				
				this.keyWord = "";
				this.format = item.val;
				this.formatIndex = item.selIndex;
				this.pageNo = 1;
				this.showMore = false;
				this.fySafeStudy();
			},
			getFiled() {
				// this.loadingState();
				this.$http.get('fyPeaceStudy/fySafeStudy/getFiled', {
					rbacToken:this.user.rbacToken
					})
					.then(res => {
							
						this.tagList = res.data.data.filed;
						this.tagList.unshift({name:"全部",id:""});
						this.tabList = res.data.data.studyType;
						this.type = this.tagList[0].id;
						this.format = this.tabList[0].id;
						this.fySafeStudy();
					})
			},
			//获取学习
			fySafeStudy(type) {
				let url = "";
				
				this.format == 4 ? url='fyPeaceStudy/fySafeStudy/initStudy' : url='fyPeaceStudy/fySafeStudy/getAppList';
				
				this.loadingState();
				this.$http.get(url, {
					type:this.type,
					format:this.format,
					rbacToken:this.user.rbacToken,
					pageNo:this.pageNo,
					pageSize:this.pageSize,
					keyWord:this.keyWord
					})
					.then(res => {
						uni.hideLoading();
						if (res.data.success == 1) {
							if(type =="concat"){
								this.appList = this.appList.concat(res.data.data.list);
								uni.hideToast()
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
			
			
			//获取挑战次数
			//判断今日是否可再答题
			isChange(){
				
				this.bolNavTo('/pages/teachInfoListNew/teachInfoListNew',{});
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
			showInfo(item,url){
				if(this.user.reviewStatus != 1){
						uni.showToast({
							icon:'none',
							title: "请进行实名认证"
						});
				}else{
					this.navToAndSaveItem(item,url)
				}
				
			},
			goToInfo(url){
				this.navTo(url);
			},
			
			getAnwserByUser() {
				this.loadingState();
				this.$http.get('fyPeaceStudy/fySafeQuestion/getAnwserByUser', {
					rbacToken:this.user.rbacToken
					})
					.then(res => {
						uni.hideLoading()
						if (res.data.success == 1) {
							this.userInfo = res.data.data;
							this.user.resurgence = 1;
							this.user.questionCount = res.data.data.questionCount;
						}else{
							uni.showToast({
								icon:'none',
								title: res.data.message
							});
						}
					})
			},
			//获取问答
			fySafeQuestionnaire() {
				
				this.$http.get('fyPeaceStudy/fySafeQuestionnaire/getAppList', {
					rbacToken:this.user.rbacToken,
					pageNo:'1',
					pageSize:"3"
					})
					.then(res => {
						if (res.data.success == 1) {
							this.Questionnaire = res.data.data.list;
						}else{
							uni.showToast({
								icon:'none',
								title: res.data.message
							});
						}
					})
			},
		
		},
		
		
		
		onBackPress(e) {
			this.switchTabTo('/pages/index/index');
			return true ;
		},
		
		onNavigationBarButtonTap(e) {
			
			uni.navigateTo({
				url:'/pages/datiguize/datiguize'
			})
			
		}
		
		
		
	}
</script>

<style lang="scss">
	.fixed-box{
		position: fixed;
		left:0;
		top:0rpx;
		width: 100%;
	}
	
	.fixed-box-content{
		margin-top: 88rpx;
	}
	.list-cell-icon{
		margin-bottom: 30rpx;
	}
	.pick-box{
		.check-title{
			height: 100rpx;
		}
		height:90upx;
		flex:1;
		max-width:250upx;
		min-width:250upx;
	}
	.xuexi-box{
		// margin-bottom: 100rpx;
		overflow: hidden;
		width: 750rpx;
		height: 360rpx;
		position: relative;
		.right-button{
			    position: absolute;
			    right: 30rpx;
			    top: 45rpx;
			    text-align: center;
			    line-height: 40px;
				color:#fff;
				font-size:$new-font-32;
				width: 186rpx;
				height: 78rpx;
				background-color: #ee6c63;
				box-shadow: 0rpx 2rpx 4rpx 0rpx 
					#ee6c63;
				border-radius: 39rpx;
				border: solid 1rpx #ee6c63;
				
		}
		.xuexi-item{
			width: 100%;
			position: relative;
			    z-index: 100;
			.text-box{
				margin-top: 38rpx;
				margin-left: 76rpx;
				width: 289rpx;
				height: 58rpx;
			}
			.sub-text{
				color:#fff;
				margin-left: 76rpx;
				font-size:$new-font-28;
				letter-spacing:4rpx;
			}
			
		}

		.bg{
		width: 750rpx;
		height: 260rpx;
				position: absolute;
				left: 0;
				top: 0;
		}
		.tj-sction {
			background-color: #fff;;
			overflow: hidden;
			background-size: 100%;
			// margin:20upx;
			padding:20rpx 20upx;
			border-radius: 10upx;
			width: 690rpx;
			height: 172rpx;
			left:50%;
			transform: translateX(-50%);
			top:172rpx;
			// background:#e32417;
			flex: 1;
			color: #333;
			position: absolute;
			display: flex;
			justify-content: space-around;
			align-content: center;
			border-radius: 10upx;
		
		
			.middle-line {
				width: 1rpx;
				transform: scale(0.5);
				height: 40rpx;
				position: absolute;
				top: 50%;
				transform: translateY(-50%);
				background: #333;
			}
		
			.tj-item {
				position: relative;
				z-index:10;
				text-align: center;
				flex: 1;
			}
		
			.title {
				font-size: 28upx;
				
			}
		
			.num {
				margin-bottom: 22upx;
				font-size: 48upx;
			}
		}
		
		
	}

	.content{
		
		overflow: hidden;
		width: 100%;
		background:#f6f6f6;
	}
	.sub-symbol{
		font-size:30upx;
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
.wrap-item-box{
	width:100%;
	padding: 0 24upx;
	background:#fff;
	float:left;
}
.mall-bar{
	height:0;
	flex:1;
}
.scroll-bar{
	padding:20rpx 24upx;
	flex:1;
    background: #fff;
}
	.slider-bar {
		width: 700upx;
		height: 150upx;
		background: #fff;

		.slider-item {
			width: 210upx;
			display: inline-block;
			position: relative;
			text-align: center;
			margin: 0 10upx;
			color: #fff;
			padding: 10upx 10upx;

			.bg {
				position: absolute;
				left: 0;
				top: 0;
				width: 100%;
				height: 100%;
			}

			.title {
				font-size: 16upx;
				position: relative;
				z-index: 10;
			}

			.number {
				position: relative;
				z-index: 10;
				font-size: 44upx;
				width: 100%;
			}

			.text {
				position: relative;
				z-index: 10;
				font-size: 16upx;
				width: 100%;
			}
		}
	}


	.title-box {
		// max-height: 90rpx;
		//     min-height: 90rpx;
			background-color: #f6f6f6;
		width: 100%;
		margin:0 auto;
		height: 90upx;
		display: flex;
		flex-flow: row nowrap;

		.pick-box {
			backgorund: #5eba8f;
			flex: 1;
		}

	}
</style>
