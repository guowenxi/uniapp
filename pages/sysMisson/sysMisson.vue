<template>  
    <view class="content">  
		<scroll-view class="history-section icon" scroll-y  @scrolltolower="getmoreData()">
			<image v-if="Number(total) === 0  ? true : false" class="prompt_img" src="/static/img/prompt_blank@2x.png" ></image>
			<new-list-cell-sys v-for="(item, index) in list" 
			:item="item"
			 @eventClick="readMessage(item)"
			 ></new-list-cell-sys>
		</scroll-view>
    </view>  
</template>
<script>  
	import newListCellSys from '@/components/_new-list-cell-sys';
	import listCellIcon from '@/components/list-cell-icon';
    import {  
        mapState 
    } from 'vuex';  
    export default {
		components: {
			newListCellSys,
			listCellIcon
		},
		data(){
			return {
				total:-1,
				pageNo:1,
				pageSize:20,
				moving: false,
				userInfo:{
					
				},
				list:[
				]
			}
		},
		onShow(){
			this.getList();
		},
        computed: {
		},
        methods: {
			getmoreData(){
				
				if(Math.ceil(this.total/this.pageSize)<=this.pageNo){
					if(!this.showMore){
						uni.showToast({
							icon:'none',
							title: "没有更多了.",
							success:()=>{
								this.showMore = true;
							}
						});
					}
					return ;
				}else{
					this.pageNo = this.pageNo+1;
				}
				// uni.showToast({
				// 	icon : "none",
				// 	title:"正在加载,请稍等...",
				// 	duration:9999,
				// 	mask:true
				// })
				
				
				this.getList("concat")
				
			},
			
			
			//点击了并跳转
			readMessage(item) {
					// this.loadingState();
					this.$http.post('fyTaskManage/peaceTaskApp/readMessage', {
							rbacToken: this.user.rbacToken,
							id: item.id,
						})
						.then(res => {
							// uni.hideLoading()
							var url = "";
							if (res.data.success == 1) {
								switch(item.messageType){
									case 0:

										return ;
									break;
									case 2:
									return ;
									item.id = item.taskId;
									url= '/pages/roadLockMissonDetailBegin/roadLockMissonDetailBegin'
									break;
									case 3:
									item.id = item.taskId;
									item.formPublishId = item.taskId;
									url= '/pages/_new_xinxishangbao_add/_new_xinxishangbao_add';
									break;
									case 4:
									item.id = item.taskId;
									url= "/pages/personMissonDetailBegin/personMissonDetailBegin"
									break;
									case 5:
									item.id = item.taskId;
									url= "/pages/_new_screeningDetail/_new_screeningDetail"
									break;
									case 6:
									item.id = item.taskId;
									url= "/pages/_new_systemDetail/_new_systemDetail"
									break;
								}
								this.navToAndSaveItem(item,url);
							} else {
								uni.showToast({
									icon: 'none',
									title: res.data.message
								});
							}
						})
			},
			
			getList(type) {
				this.loadingState();
				this.$http.get('fyTaskManage/peaceTaskApp/getMessageList', {
						pageNo:this.pageNo,
						pageSize:this.pageSize,
						rbacToken: this.user.rbacToken,
					})
					.then(res => {
						uni.hideLoading();
						if (res.data.success == 1) {
							if(type =="concat"){
								this.list = this.list.concat(res.data.data.list);
								uni.hideToast();
							}else{
								this.list = res.data.data.list;
							}
							if(res.data.data.length == 0 ){
								this.total = 0;
							}
						} else {
							uni.showToast({
								icon: 'none',
								title: res.data.message
							});
						}
			
					})
			}
        
		}  
    }  
</script>  
<style lang='scss'>
	.content{
		background: #f0f0f0  !important;
	}
	%flex-center {
	 display:flex;
	 flex-direction: column;
	 justify-content: center;
	 align-items: center;
	}
	%section {
	  display:flex;
	  justify-content: space-around;
	  align-content: center;

	  border-radius: 10upx;
	}


	.user-section{
/* 		padding: 100upx 30upx 0; */
		position:relative;
		.bg{
			position:absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			filter: blur(1px);
			opacity: .7;
		}
	}
	.user-info-box{
		height: 180upx;
		display:flex;
		align-items:center;
		position:relative;
		z-index: 1;
		.portrait{
			width: 130upx;
			height: 130upx;
			border:5upx solid #fff;
			border-radius: 50%;
		}
		.renzheng_box{
			padding:10upx 20upx;
		}
		.username{
			font-size: $font-lg + 6upx;
			color: $font-color-dark;
			margin-left: 20upx;
		}
	}

	.vip-card-box{
		display:flex;
		flex-direction: column;
		color: #f7d680;
		height: 240upx;
		background: linear-gradient(left, rgba(0,0,0,.7), rgba(0,0,0,.8));
		border-radius: 16upx 16upx 0 0;
		overflow: hidden;
		position: relative;
		padding: 20upx 24upx;
		.card-bg{
			position:absolute;
			top: 20upx;
			right: 0;
			width: 380upx;
			height: 260upx;
		}
		.b-btn{
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
		.tit{
			font-size: $font-base+2upx;
			color: #f7d680;
			margin-bottom: 28upx;
			.yticon{
				color: #f6e5a3;
				margin-right: 16upx;
			}
		}
		.e-b{
			font-size: $font-sm;
			color: #d8cba9;
			margin-top: 10upx;
		}
	}
	.cover-container{
		background: $page-color-base;
		/* padding: 0 30upx; */
		position:relative;
		background: #f5f5f5;
		/* padding-bottom: 20upx; */
		.arc{
			position:absolute;
			left: 0;
			top: -34upx;
			width: 100%;
			height: 36upx;
		}
	}
	.tj-sction{
		@extend %section;
		.tj-item{

			@extend %flex-center;
			flex-direction: column;
			height: 140upx;
			font-size: $font-sm;
			color: #75787d;
		}
		.num{
			font-size: $font-lg;
			color: $font-color-dark;
			margin-bottom: 8upx;
		}
	}
	.order-section{
		@extend %section;
		padding: 28upx 0;
		margin-top: 20upx;
		.order-item{
			@extend %flex-center;
			width: 120upx;
			height: 120upx;
			border-radius: 10upx;
			font-size: $font-sm;
			color: $font-color-dark;
		}
		.yticon{
			font-size: 48upx;
			margin-bottom: 18upx;
			color: #fa436a;
		}
		.icon-shouhoutuikuan{
			font-size:44upx;
		}
	}
	.history-section{

		border-radius:10upx;
		.sec-header{
			display:flex;
			align-items: center;
			font-size: $font-base;
			color: $font-color-dark;
			line-height: 40upx;
			margin-left: 30upx;
			.yticon{
				font-size: 44upx;
				color: #5eba8f;
				margin-right: 16upx;
				line-height: 40upx;
			}
		}
		.h-list{
			white-space: nowrap;
			padding: 30upx 30upx 0;
			image{
				display:inline-block;
				width: 160upx;
				height: 160upx;
				margin-right: 20upx;
				border-radius: 10upx;
			}
		}
	}
	
</style>