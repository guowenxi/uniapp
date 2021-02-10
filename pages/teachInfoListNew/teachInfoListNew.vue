<template>
	<view class="content no-padding">
		
		<view class="uni-page-head">
			<div class="uni-page-head-btn new-bg-red" 
			style="float:left;"
			@click="backPress()">
			退出答题
			</div>
			<div class="uni-page-head__title" style="font-size: 16px; opacity: 1;">学习详情</div>
		</view>
		
		<view v-if="
			 (Array.isArray(info[timuIndex].checkItem_plural) &&  info[timuIndex].checkItem_plural.length>1 ) && !disabledState"
			 >
			 
			<!-- 专门为多选题设置的下一题按钮 -->
			
			<button
			class="right-btn" 
			type="red"
			 @click="panduan">
				下一题
			</button>
			
<!-- 			<button 
			class="right-btn" 
			type="red"
			 @click="info[timuIndex].submitState ? panduan : timuIndex+1 == info.length ?  wancheng :  goNext">
				{{info[timuIndex].submitState? "确定" : timuIndex+1 == info.length ? "完成" : "下一题"}}
			</button> -->
<!-- 			<button 
			v-if="info[timuIndex].submitState ? true : false"
			class="right-btn" 
			type="red"
			 @click="panduan">
			 确定
			</button> -->
<!-- 			<button 
			v-else-if="timuIndex+1 == info.length ? true : false"
			class="right-btn" 
			type="red"
			 @click="wancheng">
			 完成
			</button> -->
<!-- 			<button 
			v-else
			class="right-btn" 
			type="red"
			 @click="goNext">
			 下一题
			</button> -->
			<!-- <button v-if="info[timuIndex].submitState" class="right-btn" type="red" @click="gotoNext">完成</button> -->
		</view>
		<view class="info-content">
			
			<view class="title">
				<view class="left-line"></view>
				<text class="t">{{info[timuIndex].typeName}}</text>
				<view class="right-side">
					<text class="timu">第{{answerCG+1}}题</text>
					<text class="sub-text"></text>
				</view>
			</view>
			
			<!-- 单选 -->
<!-- 			<view class="main" v-if="info[timuIndex].type == 0">
				<view class="content-text">{{info[timuIndex].title}}</view>
				<view class="questionList"> 
					<view class="check-btn" v-for="(item,index) in info[timuIndex].questionList" :class="info[timuIndex].checkItem == index ? 'check-this' : ''" @click="checkThis(item,index)">
						<text class="lef">{{String.fromCharCode(64 + parseInt(index+1))}}.</text>
						{{item}}
						<image class="icon" v-if="info[timuIndex].nextState && info[timuIndex].answerIndex == index" src="/static/img/Learn_Correct@2x.png"></image>
						<image class="icon" v-else-if="!info[timuIndex].answerStatus && info[timuIndex].nextState && info[timuIndex].checkItem == index" src="/static/img/Learn_wrong@2x.png"></image>
					</view>
				</view>
			</view> -->
			
			<view class="main" v-if="info[timuIndex].type == 1">
				<view class="content-text">{{info[timuIndex].title}}</view>
				
				<view class="questionList" v-if="info[timuIndex].checkItem_plural"> 
					<view class="check-btn" v-for="(item,index) in info[timuIndex].questionList" 
					:class="info[timuIndex].checkItem_plural.indexOf(index)>=0 ? 'check-this' : ''"
					 @click="checkThis_plural(item,index,'single')">
						<!-- <text class="lef">{{String.fromCharCode(64 + parseInt(index+1))}}.</text> -->
						{{item}}
						<image class="icon" 
						v-if="info[timuIndex].nextState && info[timuIndex].answerIndex.indexOf(index)>=0" 
						src="/static/img/Learn_Correct@2x.png"></image>
						<image class="icon"
						 v-else-if="info[timuIndex].nextState && info[timuIndex].checkItem_plural.indexOf(index)>=0" 
						 src="/static/img/Learn_wrong@2x.png"></image>
					</view>
				</view>
			</view>
		
		<!-- 多选 -->
			<view class="main" v-else-if="info[timuIndex].type == 3">
			<view class="content-text">{{info[timuIndex].title}}</view>
			
			<view class="questionList"> 
				<view class="check-btn" v-for="(item,index) in info[timuIndex].questionList" 
				:class="info[timuIndex].checkItem_plural.indexOf(index)>=0 ? 'check-this' : ''"
				 @click="checkThis_plural(item,index,'plural')">
					<!-- <text class="lef">{{String.fromCharCode(64 + parseInt(index+1))}}.</text> -->
					{{item}}
					<image class="icon" 
					v-if="info[timuIndex].nextState && info[timuIndex].answerIndex.indexOf(index)>=0" 
					src="/static/img/Learn_Correct@2x.png"></image>
					<image class="icon"
					 v-else-if="info[timuIndex].nextState && info[timuIndex].checkItem_plural.indexOf(index)>=0" 
					 src="/static/img/Learn_wrong@2x.png"></image>
				</view>
			</view>
		</view>
		
			<!-- 填空 -->
			<view class="main" v-else-if="info[timuIndex].type == 2">
				<view class="content-text" style="float:left;">
					// <!-- :maxlength="gapNum+1" -->
					<input 
					style="opacity: 0;" 
					class="input" 
					 type="text" 
					 @focus="inputTe" 
					 @input="changeInput"
					:maxlength="gapNum"
					 :disabled="info[timuIndex].nextState"
					 />
					<view v-for="(item,index) in info[timuIndex].title" :key="index" style="float:left;">
						<view v-if="item!='*'" class="text">{{item}}</view>
						<view v-if="item=='*'"  
						class="input-box text" 
						:class="
						textIndex == index ? 'border-red' :
						 info[timuIndex].answerStatus ? 'border-green' : '' "
						@event=" inputStateCheck('true',item,index)"
						>
							<view class="input-border">{{info[timuIndex].copyTitle[index]== '*' ?  ' ' : info[timuIndex].copyTitle[index]}}</view>
						</view>
					</view>
				</view>
				<view class="tishi" v-if="info[timuIndex].nextState && !info[timuIndex].answerStatus">正确答案:{{info[timuIndex].JoinAnswer}}</view>
			</view>
			
		</view>
		
		
		
		
		<uni-popup ref="popup" nopadding="true"  >
			
			<view class="time-select-box default-item-box">
				<view class="time-select-box-title">
					<!-- <image class="left-icon" src="/static/img/icon_warning@2x.png"></image> -->
					<view class="title font-red">提示</view>
					<view class="text">直接退出将不能获得积分哦,是否退出?</view>
				</view>
				
				<view class="bottom-btn-box">
				
				<button
				class="bottom-float-button button" 
				type="transparent" 
				@click="popMission('2')">取消</button>
				<view class="middle-line"></view>
				<button
				class="bottom-float-button button" 
				type="transparent" 
				@click="popMission('1')">确定</button>	
				</view>
				
			</view>
			
		
		</uni-popup>
		
		
		<view class="middle-box-wrap" :class="showMiddleBoxState ?  'showMiddle' : '' ">
			<view class="middle-box">
				<image class="bg" src="/static/img/Answer_end_bg@2x.png"></image>
				<view class="content-position">
					<view class="title">本次获得平安币: <text class="color-orange">{{Math.floor(answerCG/5)*5>=20 ? '20' : Math.floor(answerCG/5)*5}}</text></view>
					<view class="content-item">
						<!-- <view class="item">正确率: {{zql}}%</view> -->
						<!-- <view class="item">用  时:{{12312312}}</view> -->
						<view class="item">本次答对数: {{answerCG}}</view>
						<view class="item">历史最高答对题数: {{questionCount}}</view>
					</view>
					<view class="bottom">
						<image 
						class="btn" 
						src="/static/img/Answer_end_return@2x.png"
						@click="wancheng"
						></image>
						<image 
						v-if="resurgence == 0 ? false :true "
						class="btn" 
						src="/static/img/Answer_end_resurrection@2x.png"
						@click="fuhuo"
						></image>
					</view>
					<view class="sub-text color-999">每局仅可复活一次</view>
				</view>
			</view>
			
		</view>


		<qiandao-box  @eventClick="qiandao_success" ref="wanchengBox111"  v-if="pageState">
			
		</qiandao-box>
		
		
		
	</view>
</template>

<script>
	import qiandaoBox from "@/components/_new-qiandao-box/_new-qiandao-box"
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	export default {
		components: {
			uniPopup,
			qiandaoBox
		},
		data() {
			
			return {
				pageState:false,
				showMiddleBoxState:false,
				answerCG:0,
				gapNum:1,
				answerGapList:[],
				textIndex:null,
				answerQuestions: [],
				timuIndex: 0,
				disabledState:false,
				animateState:false,
				animateState_main:false,
				zql:0,
				chenggong:0,
				answerCG:0,
				questionCount:0,
				resurgence:1,
				info: [
				]
			};
		},
		onShow(){
			this.answerCG = this.user.answerCG ;
			// this.getDailyQuestion();
		},
		onLoad(){
			this.getDailyQuestion();
		},
		onReady(){
			
		},
		methods: {
			qiandao_success(){
						// this.user.answerCG=0;
						this.user.answerQuestions=[];
						this.navTo('/pages/teachPA/teachPA')
				},
				//完成
				wancheng(){
			
					this.loadingState();
					this.$http.post('fyPeaceStudy/fySafeQuestion/todayAnswer', {
							rbacToken: this.user.rbacToken,
							answerQuestions:this.user.answerQuestions
						})
						.then(res => {
							uni.hideLoading();
							if (res.data.success == 1) {
								
								this.pageState = true;
								// this.$refs.wanchengBox.changePageState(true,this.$refs.wanchengBox)
								this.showMiddleBoxState=false;
								// uni.showToast({
								// 	icon:'none',
								// 	title: "感谢您参与瓯海平安建设",
								// 	complete:()=>{
								// 		setTimeout(()=>{
								// 			this.user.answerCG=0;
								// 			this.user.answerQuestions=[];
								// 			this.navTo('/pages/teachPA/teachPA')
								// 		},1500)
								// 	}
								// });
							}else{
								uni.showToast({
									icon:'none',
									title: res.data.message
								});
							}
						})
				
				
				},
			
			
			//复活
			fuhuo(){
				if(this.resurgence == 0){
					uni.showToast({
						icon:'none',
						title: "您已没有复活次数啦",
						complete:()=>{
						}
					});
				}else{
					this.showMiddleBoxState = false;
					this.resurgence --;
					uni.showToast({
						icon:'none',
						title: "复活成功,可继续答题啦",
						complete:()=>{
							setTimeout(()=>{
								this.getDailyQuestion();
								this.answerGapList = [];
								// this.goNext();
								// this.navTo('/pages/teachInfoListNew/teachInfoListNew')
							},1500)
						}
					});
				}
				return ;
				
				this.loadingState();
				this.$http.get('fyPeaceStudy/fySafeQuestion/isResurgence', {
						rbacToken: this.user.rbacToken,
						number:1
					})
					.then(res => {
						uni.hideLoading();
						if (res.data.success == 1) {
							this.resurgence =res.data.data;
							if(res.data.data == 0 ){
								uni.showToast({
									icon:'none',
									title: "您已没有复活次数啦",
									complete:()=>{
									}
								});
							}else{
								uni.showToast({
									icon:'none',
									title: "复活成功,可继续答题啦",
									complete:()=>{
										setTimeout(()=>{
											this.showMiddleBoxState = false;
											this.goNext();
											// this.navTo('/pages/teachInfoListNew/teachInfoListNew')
										},1500)
									}
								});
							}
			
						}else{
							uni.showToast({
								icon:'none',
								title: res.data.message
							});
						}
					})
			
			
			},
				
				
			backPress(){
				this.popDetail();
			},
			//弹出框
			popDetail(){
				debugger
				// <view class="title font-red">提示</view>
				// <view class="text">直接退出将不能获得积分哦,是否退出?</view>
				uni.showModal({
				    title: '提示',
				    content: '直接退出将不能获得积分哦,是否退出?',
					// confirmColor:"#",
				    success:  (res)=> {
				        if (res.confirm) {
				            console.log('用户点击确定');
							this.popMission("1");
							
				        } else if (res.cancel) {
							// this.popMission("2");
				            console.log('用户点击取消');
				        }
				    }
				});
				
				// this.$refs.popup.open();
				
			},
			//弹出框
			popMission(state){
				if(state == 1){
					this.user.answerCG=0;
					this.user.answerQuestions=[];
					this.navTo('/pages/teachPA/teachPA');
				}else{
					// this.$refs.popup.close();
				}
			},
			filterListData_sel(list){
				list.map((item,idx)=>{
					item.code = String.fromCharCode(64 + parseInt(idx+1));
				})
				return  list;
			},
			filterListData(list){
				const _list = list.split("");
				console.log(_list)
				return _list;
				// list.copyTitle = list.title;
				// const _list = [];
				// list.title.split("").map((item,idx)=>{
				// 	_list.push({name:item,gap:item=='*' ? true : false})
				// })
				// list.title = _list;
			},
			//填空题
			//填写
			//删除
			changeInput(e){
				//修改提交状态
				this.info[this.timuIndex].submitState = false;
				console.log(e.detail.value)
				//找到要填写多少数字
				const repeat = (this.info[this.timuIndex].title.split('*')).length-1;
				this.gapNum = repeat;
				//复制一份文字底
				let text  = this.info[this.timuIndex].copyTitle.split("");
				let bol = 'false';
				//answerGapList 是*里面要输入的数字的数组
				if(this.answerGapList.length<=e.detail.value.length){
					e.detail.value
					text[this.textIndex]=e.detail.value.split('').pop();
					if(this.answerGapList.length>=repeat){
						this.answerGapList.pop()
						this.answerGapList.push(e.detail.value.split('').pop());
					}else{
						this.answerGapList.push(e.detail.value.split('').pop());
					}
					bol='true';
				}else{	
					bol='false';
					text[this.textIndex] = "*";
					this.answerGapList.pop();
				}
				this.info[this.timuIndex].copyTitle = text.join('');
				this.inputStateCheck(bol);
				if(this.answerGapList.length>0){
					this.info[this.timuIndex].submitState = true ;
				}
				// console.log(text)
				console.log(this.answerGapList)
				//判断是否可以点确定
			},
			inputTe(){
				this.inputStateCheck('true');
				console.log("显示input")
			},
			//只为了显示第一次的键盘
			//改变样式
			inputStateCheck(bol,e,idx){
				const text = this.info[this.timuIndex].copyTitle;
				console.log(text);
				const input_key_index = text.indexOf("*");
				if(input_key_index<0){
					return ;
				}
				if(bol == 'true'){

					this.textIndex = input_key_index;
				}else{
					this.textIndex --;
					
					if(this.info[this.timuIndex].title[this.textIndex-1]!='*'){
						const filterList = this.info[this.timuIndex].title.slice(0,this.textIndex+1);
						this.textIndex = filterList.lastIndexOf("*");
						// let text  = this.info[this.timuIndex].copyTitle.split("");
						// text[this.textIndex] = "*";
						// this.info[this.timuIndex].copyTitle = text.join('');
					}

				}
				console.log(this.textIndex)
			},
			
			//选择题
			checkThis(item, idx) {
				if (this.info[this.timuIndex].nextState) {
					return;
				}
				this.$set(this.info[this.timuIndex], "checkItem", idx);
				this.info[this.timuIndex].submitState = true;
			},
			//选择题 -- 多选
			checkThis_plural(item, idx,type){
				
				//已经有下一题了则不选择
				if (this.info[this.timuIndex].nextState) {
					return;
				}
				//判断单选还是多选
				
				switch(type){
					
					case "single" : 
					this.info[this.timuIndex].checkItem_plural = [];
					this.info[this.timuIndex].checkItem_plural.push(idx);
					this.info[this.timuIndex].submitState = true;
					this.panduan();
					break;
					case "plural" : 
						if(!this.info[this.timuIndex].checkItem_plural){
							this.info[this.timuIndex].checkItem_plural = [];
						}
						const  _index = this.info[this.timuIndex].checkItem_plural.indexOf(idx);
						if(_index>=0){
							this.info[this.timuIndex].checkItem_plural.splice(_index,1);
						}else{
							this.info[this.timuIndex].checkItem_plural.push(idx);
						}
						if(this.info[this.timuIndex].checkItem_plural.length == 0 ){
							this.info[this.timuIndex].submitState = false;
						}else{
							this.info[this.timuIndex].submitState = true;
						}
					break;
					
				}

			},
			//判断对错
			panduan() {
				this.disabledState = true ; 
				//状态判断进入下一题
				this.$set(this.info[this.timuIndex], "nextState", true);
				//不可再次点击
				this.info[this.timuIndex].submitState = false;
				//判断是否对错
				if(this.info[this.timuIndex].type== 1  || this.info[this.timuIndex].type== 3 ){
					//多选单选判断
					//多选判断
						this.$set(this.info[this.timuIndex], "answerStatus", true);
					this.info[this.timuIndex].checkItem_plural.map((item,idx)=>{
						if(this.info[this.timuIndex].answerIndex.indexOf(item)<0){
							this.$set(this.info[this.timuIndex], "answerStatus", false);
						}
					})
					//单选判断
					// if (this.info[this.timuIndex].checkItem == this.info[this.timuIndex].answerIndex) {
					// 	this.$set(this.info[this.timuIndex], "answerStatus", true);
					// } else {
					// 	this.$set(this.info[this.timuIndex], "answerStatus", false);
					// }
					
				}else{
					//填空题判断
					if (this.info[this.timuIndex].JoinAnswer == this.answerGapList.join("")) {
						this.$set(this.info[this.timuIndex], "answerStatus", true);
					} else {
						this.$set(this.info[this.timuIndex], "answerStatus", false);
					}
					
				}
				
				
				
				// this.info[this.timuIndex].answerStatus ? this.answerCG++ :  null;
				this.user.answerQuestions.push({
					// qustionnaireId: this.info[this.timuIndex].qustionnaireId,
					questionId: this.info[this.timuIndex].id,
					answerStatus: this.info[this.timuIndex].answerStatus ? 1 : 2,
				})
				
				setTimeout(()=> {
				
					this.goNext()
				}, 2000);
				
			},
			//下一题
			goNext() {
				
				//如果这道题写错了
				if(!this.info[this.timuIndex].answerStatus){
					//复活次数减一
					this.showMiddleBoxState = true;
					// this.navTo(`/pages/teachInfoSuccess/teachInfoSuccess?chenggong=${this.answerCG}`);
					return ;
				}
				//答对题目加一
				this.answerCG++;
				this.user.answerCG ++ ;
				
				this.getDailyQuestion();
				this.answerGapList = [];
				// if (this.timuIndex + 1 < this.info.length) {
				// 	this.timuIndex++;
				// 	this.answerGapList = [];
				// }
			},

			//获得题目
			getDailyQuestion() {
				this.loadingState();
				this.$http.get('fyPeaceStudy/fySafeQuestion/getDailyQuestion', {
						rbacToken: this.user.rbacToken
					})
					.then(res => {
						uni.hideLoading();
						if (res.data.success == 1) {
							this.disabledState = false ;
							let _data = res.data.data;
							if(_data.length<=0){
								this.resurgence = 0;
								this.showMiddleBoxState=true;
								// this.navTo(`/pages/teachInfoSuccess/teachInfoSuccess?chenggong=${this.answerCG}`);
								
								return ;
							}
							_data.map((item,idx)=>{
								
								if(item.type == 2){
										item.copyTitle = item.title;
								}else{
									// if(item.answerIndex.length == 1){
									// 	item.type =  3
									// }
									this.$set(item, "checkItem_plural", []);
										// item.checkItem_plural=[];
								}
							})
							this.info = _data;
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
			
			return true ;
		}
		
	}
</script>

<style lang="scss">

	.showMiddle{
		display: block !important;
	}
	.uni-popup__wrapper-box{
		padding:0;
		
	}
	
	
	.uni-page-head{
		position: relative;
		
		margin-top: 88rpx;
		.uni-page-head-btn{
			padding:5rpx 10rpx;
			z-index:1000;
			position: absolute;
			top:50%;
			left:2%;
			transform: translateY(-50%);
			float:left;
		}
		.uni-page-head__title{
			text-align: center;
			position: relative;
			top:50%;
			transform: translateY(-50%);
		}
	}
	.time-select-box{
		width:500rpx;
		height: auto !important;
		overflow: hidden;
		.time-select-box-title{
			padding:20rpx;
		}
		.bottom-btn-box{
			.middle-line{
				position: absolute;
				left:50%;
				transform: translateX(-50%);
				height:100%;
				width:1rpx;
				background-color: #efefef;
			}
			border-top:1rpx solid #efefef;
		}
		
	}
	.uni-popup {
		top: 0;
	}
	

	.tishi{
		width:100%;
		float:left;
		color:#e32417;
	}
	.border-green{
		border:1px solid green !important;
		
	}
	.border-red{
		border:1px solid #e32417;
	}
	.inline{
		display: inline;
	}
	.noinline{
		display: inline-block;
	}
			.input{
		font-size:inherit;
		line-height:inherit;
		position: absolute;
		left:0;
		top:0;
		width:100%;
		height:100%;
		// opacity: 0;
		z-index:10;
	}
	
		.content-text {
			position: relative;
			font-size:40upx;
			line-height:60upx;
			padding: 30upx 0;
		}
		.text{
			margin:8upx;
		}
	.input-box{
		
		position: relative;
		float:left;

		width:60upx;
	

		.input-border{
			text-align: center;
			position: absolute;
			left:0;
			top:0;
			width:100%;
			height:100%;
			border:1px solid #ccc;
		}

		
	}
	.right-btn {
		float: right;
	}

	.check-this {
		background: #def2ff;
		color: #009cff;
	}

	.info-content {

		background: #fff;
		padding: 20upx;
		font-size: 30upx;

		.title {

			height: 50upx;
			font-size: 30upx;
			line-height: 50upx;
			position: relative;
			margin-bottom: 20upx;

			.left-line {
				float: left;
				height: 100%;
				width: 10upx;
				background: #e32417;
			}

			.t {
				text-indent: 10upx;
				margin-left: 10upx;
			}

			.right-side {
				float: right;
				font-size: 50upx;

				.timu {
					font-size: 30upx;
					font-weight: bold;
					padding: 0 10upx;

				}

				.sub-text {
					
					color: #ccc;
					font-size: 20upx;
				}
			}
		}

		.main {
			border-top: 1px solid #f0f0f0;
		}



		.questionList {
			.check-btn {
				position: relative;
				.lef {
					padding: 0 20upx;
				}

				.icon {
					position: absolute;
					right:20rpx;
					top:50%;
					transform: translateY(-50%);
					width: 40upx;
					height: 40upx;
					float: right;
				}

				padding:20upx;
				padding-right:70rpx;
				border: 1px solid #f0f0f0;
				border-radius: 10upx;
				margin:50upx 0;
			}
		}
	}
	
	.middle-box-wrap{
		z-index:100;
		background-color: rgba(0,0,0,0.5);
		position: absolute;
		width:100%;
		height:100%;
		display: none;
	}
	.middle-box{
		
		position: absolute;
		left:50%;
		top:50%;
		transform: translate(-50%,-50%);
		width:100%;
		height:58%;
		.bg{
			width:100%;
			height:100%;
			position: absolute;
			left:0;
			top:0;
			
		}
		.content-position{
			display: flex;
			flex-flow: column nowrap;
			position: absolute;
			left: 50%;
			top: 57%;
			transform: translate(-50%, -50%);
			width: 64%;
			height: 45%;
			.title{
				flex:1;
				width:100%;
				font-size:35upx;
				.color-orange{
					border: none !important;
					color:orange;
					font-size:50upx;
					margin:0 10upx;
				}
			}
			.content-item{
				flex:1;
				font-size:30upx;
				.item{
					line-height:60upx;
					width:100%;
					float:left;
				}
			}
			.sub-text{
				text-align: center;
			}
			.bottom{
				text-align: center;
				margin-top:20upx;
				flex:1;
				max-height:90upx;
				min-height:90upx;
				.btn{
					height: 90upx;
					width:40%;
					
					display: inline-block;
				}
			}
		}
	}
	
	
	
</style>
