<template>  
    <view class="content no-padding">  
	
		<!--图片  -->
		<view class="display-img-box">
			<image src="/static/img/Shape759copy@2x.png" class="display-img"></image>
		</view>
	
		<scroll-view class="history-section icon"  scroll-y   @scrolltolower="getmoreData()">
			<image v-if="Number(total) === 0  ? true : false" class="prompt_img" src="/static/img/prompt_blank@2x.png" ></image>
			<list-cell-fk v-for="(item, index) in list" 
			:item = "item"
			 @eventClick="navToAndSaveItem(item,'/pages/fankuiDetail/fankuiDetail')"
			 ></list-cell-fk>
		</scroll-view>
		<view class="fab-box"
		 
		  @click="navTo('/pages/fankuiAdd/fankuiAdd')">
			<image class="img" src="/static/_new/wwg_pen@2x.png"></image>
			<text class="text color-fff ">金点子</text>
		</view>
    </view>  	
</template>  
<script>  
	import listCellFk from '@/components/list-cell-fk';
	import listCellIcon from '@/components/list-cell-icon';
    import {  
        mapState 
    } from 'vuex';  
    export default {
		components: {
			listCellFk,
			listCellIcon
		},
		data(){
			return {
				total:null,
				pageNo:1,
				pageSize:20,
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
							mask:true,
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
			
			getList(type) {
				this.loadingState();
				this.$http.get('fyVolunteer/suggest/getAcceptList', {
						pageNo:this.pageNo,
						pageSize:this.pageSize,
						isAccept :1,
						rbacToken: this.user.rbacToken,

					})
					.then(res => {
						uni.hideLoading();
						if (res.data.success == 1) {
							if(type =="concat"){
								this.list = this.list.concat(res.data.data.list);
								uni.hideToast()
							}else{
								this.list = res.data.data.list;
							}
							this.total = res.data.data.total;	
							
						} else {
							uni.showToast({
								mask:true,
								icon: 'none',
								title: res.data.message
							});
						}
			
					})
			}
        
		},
		onNavigationBarButtonTap(e) {
			uni.navigateTo({
				url:'/pages/fankuiAdd/fankuiAdd'
			})
		}
    }  
</script>  
<style lang='scss'>
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
	  background: #fff;
	  border-radius: 10upx;
	}



	.display-img-box{
		box-sizing: content-box;
		padding: 17upx 30upx 20upx;
		height: 180upx;
		background-color: #f0f0f0;
		.display-img{
			width: 100%;
			height: 100%;
		}
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
		background: #fff;
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
	
	.fab-box{
			z-index:100;
			position: fixed;
			left:0;
			bottom:100rpx;
		width: 213rpx;
		height: 85rpx;
		line-height: 85rpx;
		background-image: linear-gradient(-90deg, 
			#e32417 0%, 
			#ff7352 100%), 
		linear-gradient(
			#ffffff, 
			#ffffff);
		background-blend-mode: normal, 
			normal;
		box-shadow: 0rpx 2rpx 8rpx 0rpx 
			rgba(227, 36, 23, 0.5);
		border-top-right-radius: 43rpx;
		border-bottom-right-radius: 43rpx;
	
			.img{
				margin:0 17rpx;
				width: 34rpx;
				height: 34rpx;
				position: relative;
				top:50%;
				transform: translateY(-50%);
				display: block;
				float: left;
			}
			.text{
				line-height: inherit;
			}
		}
		
	
</style>