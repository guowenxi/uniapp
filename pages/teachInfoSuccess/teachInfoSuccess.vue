<template>
	<view class="content no-padding">

	</view>
</template>

<script>
	export default {
		data() {
			return {
				animateState:false,
				animateState_main:false,
				zql:0,
				chenggong:0,
				answerCG:0,
				questionCount:0,
				resurgence:0,
			};
		},
		onLoad(option){
			
			// this.chenggong = option.chenggong;
			
			this.questionCount = this.user.questionCount;
			this.answerCG = this.user.answerCG;
			this.resurgence = this.user.resurgence;
			this.chenggong = Math.floor(this.answerCG/5);
			// this.zql = parseInt((this.chenggong/5)*100);
		},
		methods:{
			qiandao_success(){
				if( !this.animateState_main){
					return ;
				}
				this.animateState_main= !this.animateState_main;
				
				setTimeout(() => {
					this.animateState=false;
					// this.user.answerCG=0;
					this.user.answerQuestions=[];
					this.navTo('/pages/teachPA/teachPA')
				}, 1000);
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
							this.animateState=true;
							this.animateState_main=true;
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
			if(this.user.resurgence == 0){
				uni.showToast({
					icon:'none',
					title: "您已没有复活次数啦",
					complete:()=>{
					}
				});
			}else{
				this.user.resurgence --;
				uni.showToast({
					icon:'none',
					title: "复活成功,可继续答题啦",
					complete:()=>{
						setTimeout(()=>{
							this.navTo('/pages/teachInfoListNew/teachInfoListNew')
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
						this.user.resurgence =res.data.data;
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
										this.navTo('/pages/teachInfoListNew/teachInfoListNew')
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
				
		}
	}
</script>

<style lang="scss">

.sub-text{
	width: 100%;
	text-align: center;
	line-height: $line-height-40;
}
.middle-box{
	position: absolute;
	left:50%;
	top:35%;
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
