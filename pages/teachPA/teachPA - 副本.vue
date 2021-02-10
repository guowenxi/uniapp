<template>
	<view class="content no-padding">
		<view class="xuexi-box">
					<image class="bg" src="/static/_new_user/My_bg@2x.png"></image>
					<view class="tj-sction">
						<image class="bg" src="/static/img/List_bg@2x.png"></image>
						<view class="tj-item">
							<view class="title">挑战答题总数</view>
							<view class="num">{{userInfo.answerQuestionNum}}<text class="sub-symbol"></text></view>
						</view>
						<view class="middle-line" style="left:33%"></view>
						<view class="tj-item">
							<view class="title">总学习次数</view>
							<view class="num">{{userInfo.studyNum}}</view>
						</view>
									<view class="middle-line" style="left:65%"></view>
									<view class="tj-item">
							<view class="title">今日答题分数</view>
							<view class="num">{{userInfo.todayIntegral}}<text class="sub-symbol">分</text></view>
							<!-- <uni-rate class="rate-box" value="4" @change="changerate" size="20" margin="5" disabled></uni-rate> -->
						</view>
					</view>
					
					
		</view>

		<scroll-view scroll-y class="scroll-bar">
			<view class="wrap-item-box">
				<left-line-title  
				title="平安问答"
				right-title="答题规则"
				 @eventClick="goToInfo('/pages/datiguize/datiguize')"
				></left-line-title>
				<list-cell-answer-new
				:countPeople="userInfo.countPeople"
				@eventClick="isChange"
				></list-cell-answer-new>
						<left-line-title 
						 title="学习广场"
						 right-title="更多"
						 @eventClick="goToInfo('/pages/teachListXX/teachListXX')"></left-line-title>
						<list-cell-teach 
						v-for="(item,index) in appList" 
						:item="item" 
						@eventClick="bolNavTo('/pages/teachInfoListXX/teachInfoListXX',item)"
						></list-cell-teach>
						
<!-- 						<left-line-title  
						title="平安问答"
						 right-title="问答广场"
						 @eventClick="goToInfo('/pages/teachListWD/teachListWD')"></left-line-title> -->
<!-- 						<list-cell-answer
						v-for="(item,index) in Questionnaire" 
						:item="item"
						@eventClick="showInfo(item,'/pages/teachInfoList/teachInfoList')"
						></list-cell-answer> -->

			</view>
		</scroll-view>
	</view>
</template>

<script>
	import leftLineTitle from '@/components/left-line-title.vue';
	import listCellTeach from "@/components/list-cell-teach.vue"
	import listCellAnswer from "@/components/list-cell-answer.vue"
	import listCellAnswerNew from "@/components/list-cell-answer-new"
	import uniRate from "@/components/uni-rate/uni-rate.vue"
	import pickerSelect from '@/components/pickerSelect.vue';
	import subLineText from '@/components/sub-line-text.vue';
	export default {
		components: {
			leftLineTitle,
			listCellTeach,
			listCellAnswer,
			listCellAnswerNew,
			pickerSelect,
			subLineText,
			uniRate
		},
		data() {
			return {
				reviewStatus:0,
				wrapBoxWidth:"",
				selIndex:0,
				selectCate: ['中国', '美国', '巴西', '日本'],
				userInfo:{
					answerIntegral:"0",
					answerCount:"0",
					todayAnswerIntegral:"0",
					resurgence:"0",
				},
				appList:[],
				Questionnaire:[]
			};
		},
		onShow(){
			this.user.answerCG = 0 ;
			this.fySafeStudy();
			// this.fySafeQuestionnaire();
			this.getAnwserByUser();
			
			//判断今日是否可再答题
			//this.isChange();
		},
		methods:{
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
			//获取学习
			fySafeStudy() {
				this.loadingState();
				
				this.$http.get('fyPeaceStudy/fySafeStudy/getAppList', {
					rbacToken:this.user.rbacToken,
					pageNo:'1',
					pageSize:"3"
					})
					.then(res => {
						uni.hideLoading()

						if (res.data.success == 1) {
							this.appList = res.data.data.list;
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
		}
		
		
	}
</script>

<style lang="scss">
	.xuexi-box{
		width: 750rpx;
		height: 260rpx;
		position: relative;
		.bg{
		width: 750rpx;
		height: 260rpx;
				position: absolute;
				left: 0;
				top: 0;
		}
		.tj-sction {
			overflow: hidden;
			background-size: 100%;
			// margin:20upx;
			padding:40rpx 20upx;
			border-radius: 10upx;
			width: 690rpx;
			height: 172rpx;
			left:50%;
			transform: translateX(-50%);
			top:172rpx;
			// background:#e32417;
			flex: 1;
			color: #fff;
			position: absolute;
			display: flex;
			justify-content: space-around;
			align-content: center;
			border-radius: 10upx;
		
		
			.middle-line {
				width: 1px;
				height: 60%;
				position: absolute;
				top: 50%;
				transform: translateY(-50%);
				background: #fff;
			}
		
			.tj-item {
				position: relative;
				z-index:10;
				text-align: center;
				flex: 1;
			}
		
			.title {
				font-size: 28upx;
				margin-bottom: 22upx;
			}
		
			.num {
				font-size: 48upx;
			}
		}
		
		
	}

	.content{
		background:#eee;
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
	margin-top: 110rpx;
	flex:1;
	height:0;
	overflow: hidden;
	padding-bottom: 80upx;
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
		width: 80%;
		margin:0 auto;
		height: 60upx;
		display: flex;
		flex-flow: row nowrap;

		.pick-box {
			backgorund: #5eba8f;
			flex: 1;
		}

	}
</style>
