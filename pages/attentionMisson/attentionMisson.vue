<template>  
    <view class="content no-padding">  
<!-- 	<view class="title-box">

		<view class="tab">
			<wuc-tab  :tab-list="tabList" :tabCur.sync="TabCur" @change="tabChange"></wuc-tab>
		</view>
	</view> -->
		<scroll-view class="history-section icon" v-if="TabCur == 0 ? true : false ">
			<image v-if="Number(total) === 0  ? true : false" class="prompt_img" src="/static/img/prompt_blank@2x.png" ></image>
			<list-cell-xf v-for="(item, index) in list" 
			:item="item"
			 @eventClick="navToAndSaveItem(item,'/pages/personMissonDetail/personMissonDetail?likeState=true')"
			 ></list-cell-xf>
		</scroll-view>
		<scroll-view class="history-section icon" v-else-if="TabCur == 1 ? true : false ">
			<image v-if="Number(total) === 0  ? true : false" class="prompt_img" src="/static/img/prompt_blank@2x.png" ></image>
			<list-cell-teach 
			v-for="(item,index) in list" 
			:item="item" 
			@eventClick="bolNavTo('/pages/teachInfoListXX/teachInfoListXX',item)"
			></list-cell-teach>
		</scroll-view>
		<scroll-view class="history-section icon" v-else-if="TabCur == 2 ? true : false ">
			<image v-if="Number(total) === 0  ? true : false" class="prompt_img" src="/static/img/prompt_blank@2x.png" ></image>
			
			
		 <new-list-cell-misson v-for="(item, index) in list" 
		 :item="item"
		  @eventClick="navToAndSaveItem(item,'/pages/areaMissonDetail/areaMissonDetail')"></new-list-cell-misson>
		  
			

		</scroll-view>
		
		<scroll-view class="history-section icon" v-else-if="TabCur == 3 ? true : false ">
			<image v-if="Number(total) === 0  ? true : false" class="prompt_img" src="/static/img/prompt_blank@2x.png" ></image>
			
			<new-siper-item-wg-more class="swiper-item" v-for="item in list" :item="item"
			 @eventClick="navToAndSaveItem(item,'/pages/_new_weiwangge_detail/_new_weiwangge_detail')"></new-siper-item-wg-more>
			 
		</scroll-view>
		

    </view>  	
</template>  
<script>  
	import listCellXf from '@/components/list-cell-xf';
	import listCellTeach from '@/components/list-cell-teach';
	import newListCellItem from '@/components/_new-list-cell-item.vue';
	import newListCellMisson from '@/components/_new-list-cell-misson';
	import newSiperItemWgMore from '@/components/_new-siper-item-wg-more.vue';
	import listCellIcon from '@/components/list-cell-icon';
	import wucTab from '@/components/wuc-tab/wuc-tab';
    import {  
        mapState 
    } from 'vuex';  
    export default {
		components: {
			newListCellItem,
			listCellXf,
			listCellTeach,
			newListCellMisson,
			listCellIcon,
			wucTab,
			newSiperItemWgMore
		},
		data(){
			return {
				pageNo:1,
				pageSize:20,
				total:null,
				tabList: [{
					name: '巡防任务'
				}, {
					name: '平安学习'
				}, {
					name: '平安任务'
				}],
				TabCur: 0,
				userInfo:{
					
				},
				list:[
				]
			}
		},
		onShow(){
			
			this.getList();
		},
		onLoad(data){
			this.TabCur = data.type;
		},
        computed: {
		},	
        methods: {
			//
			tabChange(index) {
				this.keyWord = "";
				this.showMore = false;
				this.pageNo = 1;
				this.TabCur = index;
				this.getList();
			},
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
				debugger
				this.$http.get('fyVolunteer/fySafeUserTask/getList', {
						rbacToken: this.user.rbacToken,
						pageNo:this.pageNo,
						pageSize:this.pageSize,
						type:Number(this.TabCur)+1
					})
					.then(res => {
						uni.hideLoading()
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
        }  
    }  
</script>  
<style lang='scss'>
	
	.history-section{
		flex:1;
		height:0;
		padding:0 30upx;
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
	  background: #fff;
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
	
</style>