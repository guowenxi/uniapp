<template>  
    <view class="content no-padding"> 
	<view class="default-box">
		<view class="title">事件名称 
		<text v-if="info.handType==0" class="cell-tip" >{{info.disposeName}}</text>
		<text v-else-if="info.handType==1" class="cell-tip font-green" >{{info.disposeName}}</text>
		<text v-else-if="info.handType==2" class="cell-tip font-red" >{{info.disposeName}}</text>
		<text v-else-if="info.handType==3" class="cell-tip font-orange" >{{info.disposeName}}</text>
		</view>
		<view>
			{{info.title}}
		</view>
	</view>
	<view class="default-box">
		<view class="title">事件说明</view>
		<view>
			{{info.incidentContent}}
		</view>
	</view>
	<view class="default-box">
		<view class="title">上访时间</view>
		<view>
			{{info.incidentTime}}
		</view>
	</view>
	<view class="default-box">
		<view class="title">上访人</view>
		<view>
			{{info.petitionPeople}}
		</view>
	</view>
	<view class="default-box">
		<view class="title">联系方式</view>
		<view>
			{{info.petitionPhone}}
		</view>
	</view>
	 <view class="default-box">
		 <uni-steps :options="info.handleList" direction="column"  :active="info.handType" />
	 </view>
    </view>  
</template>  
<script>  
import uniSteps from '@/components/qingqing-steps/uni-steps.vue'
    import {  
        mapState 
    } from 'vuex';  
    export default {
		components: {
			uniSteps
		},
		data(){
			return {
				info:{},
				active:2,
				list2: [{
					title: '买家下单',
					desc: '2018-11-11'
				}, {
					title: '卖家发货',
					desc: '2018-11-12'
				}, {
					title: '买家签收',
					desc: '2018-11-13'
				}, {
					title: '交易完成',
					desc: '2018-11-14'
				}]
			}
		},
		onLoad(){
			this.info = this.selListItem;
		},
        computed: {
		},
        methods: {

			getCheckTask() {

			this.$http.get('fyTaskManage/peaceTaskApp/getCheckTask', {
					instanceId: this.taskId,
					rbacToken: this.user.rbacToken,
				}).then(res => {
					if (res.data.success == 1) {
						this.info = res.data.data;

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
		background: #eee;
	}
.cell-tip {
		float: right;
		font-size:26upx;
		color: $font-color-light;
	}
	.default-box{
		margin-bottom:20upx;
		padding:20upx;
		background: #fff;
		font-size:26upx;
		.title{
			font-size:30upx;
			margin-bottom:20upx;
		}
		
	}
	
</style>