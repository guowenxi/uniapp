<template>
	<view class="content no-padding">
		<!-- <image class="title-img" src="/static/1571194502069_1570778409.png"></image> -->
		<view class="new-item-box">
			<view class="item-title">
				<view class="left-line"></view>
				<view class="title">任务介绍</view>
			</view>
			<view class="item-content">
				<view class="txt">
					<text class="t">发布人:</text>
					<text class="r">
						<text >{{ info.title }}</text>
					</text>
				</view>
				<view class="txt">
					<text class="t">截止时间:</text>
					<text class="r">{{ info.endTime }}</text>
				</view>
			</view>
		</view>
		
	<scroll-view class="history-section icon"  scroll-y   @scrolltolower="getmoreData()">
		<image v-if="Number(total) === 0  ? true : false" class="prompt_img" src="/static/img/prompt_blank@2x.png" ></image>
		
		<new-list-cell-xxsb-item v-for="(item, index) in list" :item="item" 
	 		:itemIndex = "index+1"
		:itemClick="item.state != 0 ? true:  false"
		@eventClick="showDetail(item)"
		@onlongpress = "onlongpress(item,'删除')"
		></new-list-cell-xxsb-item>
		
	</scroll-view>
	
	<uni-popup ref="popup" nopadding="true"  >
		
		<view class="time-select-box default-item-box">
			<view class="time-select-box-title">
				<!-- <image class="left-icon" src="/static/img/icon_warning@2x.png"></image> -->
				<view class="title font-red">提示</view>
				<view class="text">是否删除当前表单?</view>
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
	

	</view>
</template>

<script>

import newListCellXxsbItem from '@/components/_new-list-cell-xxsb-item.vue';
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
export default {
	components: {
newListCellXxsbItem,
uniPopup
	},
	data() {
		return {
			total:null,
			pageNo:1,
			pageSize:20,
			baseUrl: getApp().globalData.baseUrl,
			rbacToken: getApp().globalData.rbacToken,
			list:[
			],
			info:{},
		};
	},
	onShow(){
		this.getFormDetail();
	},
	onLoad() {
		
		this.info = this.selListItem;
		this.formPublishId = this.selListItem.formPublishId;
		this.id = this.selListItem.id;
		this.state = this.selListItem.state;
		
	},
	methods: {
		delFormInfo(id) {
			this.loadingState();
			this.$http
				.post('fyMicroGridManage/fyFormInfo/delFormInfo', {
					id: this.delId,
					rbacToken: this.user.rbacToken
				})
				.then(res => {
					uni.hideLoading();
					if (res.data.success == 1) {
						uni.showToast({
							mask: true,
							icon: 'none',
							duration: 2000,
							title: "删除成功..."
						});
						setTimeout(() => {
							this.getFormDetail();
						}, 2000)
					} else {
						uni.showToast({
							icon: 'none',
							title: res.data.message
						});
					}
				});
		},
		onlongpress(item){
			this.delId = item.id;
			this.$refs.popup.open();
		},
		popMission(state){
			if(state == 1){
				this.delFormInfo();
			}else{
				this.$refs.popup.close();
			}
		},
		showDetail(item){
			item.TabCur_xxsb = 0;
			item.pageType = 2;
			this.navToAndSaveItem(item, '/pages/_new_xinxishangbao_detail/_new_xinxishangbao_detail');
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
		
		getFormDetail(type) {
			this.loadingState();
			this.$http.get('fyMicroGridManage/fyFormInfo/getFormDetail', {
					state:this.state,
					formPublishId:this.formPublishId,
					id:this.id,
					pageNo:this.pageNo,
					pageSize:this.pageSize,
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
		        
	}
};
</script>

<style lang="scss">
	.content{
		display: flex;
		flex-flow:column  nowrap;
		
	}
	.history-section{
		height:0;
		flex:1;
		background: #f6f6f6;
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
	
.new-item-box {
	background: #fff;

	padding: 20rpx;
	border-bottom: 10rpx solid #f6f6f6;

	.item-title {
		margin-bottom: 10rpx;
		float: left;
		width: 100%;
		height: 30rpx;
		line-height: 30rpx;

		.left-line {
			float: left;
			position: relative;
			top: 50%;
			transform: translateY(-50%);

			width: 10rpx;
			height: 24rpx;
			background-color: #e32417;
			border-radius: 5rpx;
		}

		.title {
			margin-left: 20rpx;
			font-weight: bold;
			float: left;
			text-shadow: 0 2rpx 2rpx rgba(125, 133, 141, 0.4);
			font-size: $new-font-30;
			color: #333333;
		}

		.right-title {
			font-size: 22rpx;
			float: right;
			color: #b7b7b7;
		}
	}

	.item-content {
		font-size: 26rpx;
		margin-left: 30rpx;

		.item-grey-color {
			color: #b7b7b7;
			font-size: 28rpx;
		}

		.txt {
			margin-top: 10rpx;
			display: flex;
			flex-flow: row nowrap;

			width: 100%;

			.t {
				color: #7b7b7b;
				text-align-last: justify;
				min-width: 25%;
				max-width: 25%;
			}

			.r {
				text-indent: 20rpx;
				flex: 1;
				overflow: hidden;
			}
		}
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

</style>
