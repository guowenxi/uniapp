<template>
	<view class="content">

		<!-- (info[timuIndex].checkItem != 'undefind' &&  info[timuIndex].checkItem ) || -->
		<view v-if="
			 (Array.isArray(info[timuIndex].checkItem_plural) &&  info[timuIndex].checkItem_plural.length>0 ) || 
			answerGapList.length>=gapNum" >
<!-- 			<button 
			class="right-btn" 
			type="red"
			 @click="info[timuIndex].submitState ? panduan : timuIndex+1 == info.length ?  wancheng :  goNext">
				{{info[timuIndex].submitState? "确定" : timuIndex+1 == info.length ? "完成" : "下一题"}}
			</button> -->
			<button 
			v-if="info[timuIndex].submitState ? true : false"
			class="right-btn" 
			type="red"
			 @click="panduan">
			 确定
			</button>
			<button 
			v-else-if="timuIndex+1 == info.length ? true : false"
			class="right-btn" 
			type="red"
			 @click="wancheng">
			 完成
			</button>
			<button 
			v-else
			class="right-btn" 
			type="red"
			 @click="goNext">
			 下一题
			</button>
			<!-- <button v-if="info[timuIndex].submitState" class="right-btn" type="red" @click="gotoNext">完成</button> -->
		</view>
		<view class="info-content">
			
			<view class="title">
				<view class="left-line"></view>
				<text class="t">{{info[timuIndex].typeName}}</text>
				<view class="right-side">
					<text class="timu">{{timuIndex+1}}</text>
					<text class="sub-text">/5</text>
				</view>
			</view>
			
			<!-- 单选 -->
<!-- 			<view class="main" v-if="info[timuIndex].type == 1">
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
		
		<!-- 多选 -->
			<view class="main" v-if="info[timuIndex].type == 1">
			<view class="content-text">{{info[timuIndex].title}}</view>
			
			<view class="questionList"> 
				<view class="check-btn" v-for="(item,index) in info[timuIndex].questionList" 
				:class="info[timuIndex].checkItem_plural.indexOf(index)>=0 ? 'check-this' : ''"
				 @click="checkThis_plural(item,index)">
					<!-- <text class="lef">{{String.fromCharCode(64 + parseInt(index+1))}}.</text> -->
					{{item}} 1111
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
	</view>
</template>

<script>
	export default {
		data() {
			return {
				answerCG:0,
				gapNum:1,
				answerGapList:[],
				textIndex:null,
				answerQuestions: [],
				timuIndex: 0,
				info: [
/* 					{
					type:1,
						answerIndex: 1,
						submitState: false,
						typeName: "12312",
						title: "按时打算的辣椒水都拉进来了",
						"questionList": [
							"选项1.78",
							"选项1.288",
							"选项1.38",
							"选项1.48",
							"选项1.68",
						],
					},
					{
						"answerIndex": null,
						"answerList": [
							"填空题答案",
							"",
							""
						],
						"JoinAnswer":"的的的的的",
						"calkingAnswer1": "填空题答案",
						"calkingAnswer2": "",
						"calkingAnswer3": "",
						"chooseAnswer": "",
						"chooseFive": "",
						"chooseFour": "",
						"chooseOne": "",
						"chooseSix": "",
						"chooseThree": "",
						"chooseTwo": "",
						"createTime": "2019-07-15 15:47:26",
						"id": "34379743e300464186eeca50c99e23e0",
						"questionIntegral": 1212,
						"questionList": null,
						"questionLists": null,
						"questionStatus": 2,
						"questionType": null,
						"status": 1,
						"copyTitle":"填空题*****老爹发觉洒了看的和斤斤",
						"title": "填空题*****老爹发觉洒了看的和斤斤",
						"type": 2,
						"typeName": "填空题",
						"updateTime": "2019-07-18 08:44:44",
						"uploadStreet": ""
					},
					{
						type:1,
						answerIndex: 3,
						submitState: false,
						typeName: "卧槽",
						title: "粑粑都给你打出来",
						"questionList": [
							"选项1.78",
							"选项1.288",
							"选项1.38",
							"选项1.48",
							"选项1.68",
						],
					},
				 */
				]
			};
		},
		onLoad(){
			this.getDailyQuestion();
		},
		onReady(){
			
			
		},
		methods: {
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
			checkThis_plural(item, idx){
				if (this.info[this.timuIndex].nextState) {
					return;
				}
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
				
				
			},
			//判断对错
			panduan() {
				
				//状态判断进入下一题
				this.$set(this.info[this.timuIndex], "nextState", true);
				//不可再次点击
				this.info[this.timuIndex].submitState = false;
				//判断是否对错
				if(this.info[this.timuIndex].type== 1 ){
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
				
				this.info[this.timuIndex].answerStatus ? this.answerCG++ :  null;
				this.answerQuestions.push({
					// qustionnaireId: this.info[this.timuIndex].qustionnaireId,
					questionId: this.info[this.timuIndex].id,
					answerStatus: this.info[this.timuIndex].answerStatus ? 1 : 2,
				})
			},
			//下一题
			goNext() {
				if (this.timuIndex + 1 < this.info.length) {
					this.timuIndex++;
					this.answerGapList = [];
				}
			},
			//完成
			wancheng(){
				this.loadingState();
				this.$http.post('fyPeaceStudy/fySafeQuestion/todayAnswer', {
						rbacToken: this.user.rbacToken,
						answerQuestions:this.answerQuestions
					})
					.then(res => {
						uni.hideLoading();
						if (res.data.success == 1) {
							this.navTo(`/pages/teachInfoSuccess/teachInfoSuccess?chenggong=${this.answerCG}`);
						}else{
							uni.showToast({
								icon:'none',
								title: res.data.message
							});
						}
					})


			},
			//获得题目
			getDailyQuestion() {
				this.$http.get('fyPeaceStudy/fySafeQuestion/getDailyQuestion', {
						rbacToken: this.user.rbacToken
					})
					.then(res => {
						if (res.data.success == 1) {
							let _data = res.data.data;
							_data.map((item,idx)=>{
								if(item.type == 2){
										item.copyTitle = item.title;
								}else{
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

		}
	}
</script>

<style lang="scss">
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
					height:60upx;
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
				.lef {
					padding: 0 20upx;
				}

				.icon {
					width: 40upx;
					height: 40upx;
					float: right;
				}

				padding:20upx;
				border: 1px solid #f0f0f0;
				border-radius: 10upx;
				margin:20upx 0;
			}
		}
	}
</style>
