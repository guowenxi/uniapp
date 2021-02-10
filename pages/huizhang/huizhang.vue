<template>  
    <view class="content">
		<view v-for="(item,name,index) in list">
			<left-line-title
			:title="name"
			></left-line-title>
			<view class="huizhang-item">
				<huizhang-item
				 v-for="(it, idx) in item" 
					:item="it"
					:imgIndex="idx"
					@eventClick="checkIndex(it,idx,name)"
				></huizhang-item>
			</view>
		</view>

<!-- 			<view class="huizhang-item">
				<huizhang-item
				 v-for="(item, index) in list['1']" 
					:item="item"
					imgName="yinhuan"
					:imgIndex="index"
					@eventClick="checkIndex(item,index,'yinhuan')"
				></huizhang-item>
			</view> -->
			
			
			<!-- <left-line-title
			title="平安巡防徽章"

			></left-line-title>
			<view class="huizhang-item">
				<huizhang-item
				 v-for="(item, index) in list['2']" 
					:item="item"
					imgName="xunfang"
					:imgIndex="index"
					@eventClick="checkIndex(item,index,'xunfang')"
				></huizhang-item>
			</view>
			<left-line-title
			title="签到徽章"

			></left-line-title>
			<view class="huizhang-item">
				<huizhang-item
				 v-for="(item, index) in list['3']" 
					:item="item"
					imgName="qiandao"
					:imgIndex="index"
					@eventClick="checkIndex(item,index,'qiandao')"
				></huizhang-item>
			</view>
			<left-line-title
			title="知识问答"

			></left-line-title>
			<view class="huizhang-item">
				<huizhang-item
				 v-for="(item, index) in list['4']" 
					:item="item"
					imgName="wenda"
					:imgIndex="index"
					@eventClick="checkIndex(item,index,'wenda')"
				></huizhang-item>
			</view> -->
			
			
			<view class="lingqu-box" :style="{'visibility':updateBox ? 'inherit' : 'hidden'}"  @click="qiandao_success">
						<view class="update-item no-animate">
							<view class="wrap-box">
								<image class="title-icon" 
									:src="`${baseUrl}fyVolunteer/file/download/${item.awardImgReceived}?rbacToken=${rbacToken}`"
								 />
								 <view class="textAlgin margin-top-50">
									 {{`您已成功领取${checkedIndex.awardName}徽章`}}
								 </view>
								 <view class="textAlgin">请您继续努力</view>
								<button
								class="btn"
								type="red" 
								@click="updateBtn"
								>确定</button>
							</view>
							<!-- <image class="close-btn" src="/static/img/box_shut@2x.png"  @click="qiandao_success"></image> -->
							<image class="item-img gggg" src="/static/img/badge_prompt_bg@2x.png"></image>
			
						</view>
			</view>
				
				
    </view>  
</template>  
<script>  
	import leftLineTitle from '@/components/left-line-title.vue';
	import huizhangItem from '@/components/huizhang-item.vue';
    import {  
        mapState
    } from 'vuex';  
    export default {
		components: {
			huizhangItem,
			leftLineTitle
		},
		data(){
			return {
				baseUrl: getApp().globalData.baseUrl,
				rbacToken: getApp().globalData.rbacToken,
				list:[],
				updateBox:false,
				checkedIndex:[],
				imgName:"",
				imgIndex:0,
				item:[],
			}
		},
		onShow(){
			this.getList();
		},
        computed: {
		},
        methods: {
			qiandao_success(){
			
				this.updateBox = false;
			
			},

			checkIndex(item,idx,imgName){
				this.item = item;
				
				this.imgName  = imgName;
				this.imgIndex  = idx;
				this.checkedIndex = item;
				if(item.status != 2){
					return ;
				}
				
				this.postItem(item)
				
			},
			postItem(item){
				this.loadingState();
				this.$http.post('fyAwardRecord/awardRecord/setUserAward', {
						awardName:item.awardName,
						awardId:item.awardId,
						type:item.type,
						rbacToken: this.user.rbacToken,
					})
					.then(res => {
						uni.hideLoading();
						if (res.data.success == 1) {
							item.status  = 1;
							this.updateBox = true;
						} else {
							uni.showToast({
								mask:true,
								icon: 'none',
								title: res.data.message
							});
						}
							
					})
			},
			getList(type) {
				this.loadingState();
				this.$http.get('fyAwardRecord/awardRecord/checkUserAwardNew', {
						rbacToken: this.user.rbacToken,
					})
					.then(res => {
						uni.hideLoading();
						if (res.data.success == 1) {
							this.list = res.data.data;
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
				url:'/pages/huizhangInfo/huizhangInfo'
			})
		},
    }  
</script>  
<style lang='scss'>
	.huizhang-item{
		float:left;
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