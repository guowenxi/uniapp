<template>
	<view class="content no-padding">
		<scroll-view class="swiper-box" scroll-y @scrolltolower="getmoreData()">
			<image v-if="Number(total) === 0 ? true : false" class="prompt_img" src="/static/img/prompt_blank@2x.png"></image>
			<new-siper-item-wg-gz class="swiper-item" v-for="item in list" :item="item" @eventClick="eventClick(item)"></new-siper-item-wg-gz>

		</scroll-view>

		
	</view>
</template>
<script>
import newSiperItemWgGz from '@/components/_new-siper-item-wg-gz.vue';
import uniSteps from '@/components/uni-steps/uni-steps.vue'
import wucTab from '@/components/wuc-tab/wuc-tab';
import pickerSelect from '@/components/pickerSelect';
import newListCellWg from '@/components/_new-list-cell-wwg';
import menuSelectSimple from '@/components/menu-select-simple.vue';
import { mapState } from 'vuex';
export default {
	components: {
		uniSteps,
		pickerSelect,
		wucTab,
		newListCellWg,
		menuSelectSimple,
		newSiperItemWgGz
	},
	data() {
		return {
			keyWord:"",
			total:null,
			pageNo: 1,
			pageSize: 20,
			list:[
				
			],
		};
	},
	onLoad() {
		
	},
	onShow() {
		this.getMyFollowMicrogridList();
		
	},
	computed: {},
	methods: {
		getmoreData() {
			if (Math.ceil(this.total / this.pageSize) <= this.pageNo) {
				if (!this.showMore) {
					uni.showToast({
						icon: 'none',
						title: '没有更多了.',
						success: () => {
							this.showMore = true;
						}
					});
				}
				return;
			} else {
				this.pageNo = this.pageNo + 1;
			}

			this.getMyFollowMicrogridList('concat');
		},
		
		eventClick(item){

			this.navToAndSaveItem(item,'/pages/_new_guanzhuweiwangge_detail/_new_guanzhuweiwangge_detail')
		},
		getMyFollowMicrogridList(type) {
			this.loadingState();
			this.$http
				.get('fyMicroGridManage/fyMicrogrid/getMyFollowMicrogridList', {
					followType:1,
					pageNo: this.pageNo,
					pageSize: this.pageSize,
					keyWord:this.keyWord,
					// userId:this.user.userId,
					rbacToken: this.user.rbacToken
				})
				.then(res => {
					uni.hideLoading();
					if (res.data.success == 1) {
						if (type == 'concat') {
							this.list = this.list.concat(res.data.data.list);
							uni.hideToast();
						} else {
							this.list = res.data.data.list;
						}
						this.total = res.data.data.total;
					} else {
						uni.showToast({
							icon: 'none',
							title: res.data.message
						});
					}
				});
		}
	},
	onNavigationBarSearchInputChanged(e, _) {
		
		this.keyWord =e.text ;
	},
	onNavigationBarSearchInputConfirmed(){
		this.pageNo = 1;
			this.getMyFollowMicrogridList();
			},
};
</script>
<style lang="scss">

.swiper-box{
	background: #fff;
	.swiper-item{
		box-sizing:content-box;
		float: left;
		border-bottom: 10rpx solid #f8f8f8;
		width: 650rpx;
		padding:20rpx 50rpx ;
	}
}
	.title-bar{
		margin:18rpx 20rpx;
		.title{
			float: left;
				font-size: 36rpx;
				font-weight: bold;
				color: #333333;
		}
		.right-title{
			position: relative;
			top:50%;
			transform: translateY(-50%);
			color:#fff;
			text-align: center;
			float: right;
			width: 80rpx;
				height: 36rpx;
				background-image: linear-gradient(-90deg, 
					#e32417 0%, 
					#ff7352 100%), 
				linear-gradient(
					#e32417, 
					#e32417);
				background-blend-mode: normal, 
					normal;
				box-shadow: 0rpx 3rpx 18rpx 0rpx 
					rgba(227, 36, 23, 0.2);
				border-radius: 18rpx;
		}
		
	}
	
	
	.new-item-box{
		background: #fff;
		
		padding:20rpx;
		border-bottom: 10rpx solid #f6f6f6;
		.item-title{
			margin-bottom: 10rpx;
			float: left;
			width: 100%;
			height: 30rpx;
			line-height: 30rpx;
			.left-line{
				float: left;
				position: relative;
				top:50%;
				transform: translateY(-50%);
				
					width: 10rpx;
					height: 24rpx;
					background-color: #e32417;
					border-radius: 5rpx;
			}
			.title{
				margin-left: 20rpx;
				font-weight: bold;
				float: left;
				text-shadow: 0 2rpx 2rpx rgba(125, 133, 141, 0.4);
				font-size: $new-font-30;
				color: #333333;
			}
			.right-title{
				font-size: 22rpx;
				float: right;
				color:#b7b7b7;
				
			}
		}
		.item-content{
			
			
			font-size: 26rpx;
			margin-left: 30rpx;
			.txt{
				margin-top: 10rpx;
				display: flex;
				flex-flow: row nowrap;
				
				width: 100%;
				.t{
					color: #7b7b7b;
					text-align-last: justify;
					min-width: 25%;
					max-width: 25%;
				}
				.r{
					text-indent: 20rpx;
					flex:1;
					overflow: hidden;
				}
			}
			
		}
			}
	
	

	
	
</style>
