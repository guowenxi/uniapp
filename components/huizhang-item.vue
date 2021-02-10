<template>
	<view class="list-cell-icon" @click="eventClick">
		
		<image class="icon"
		v-if="item.status ==0 || item.status ==2"
		:src="`${baseUrl}fyVolunteer/file/download/${item.awardImgReceive}?rbacToken=${rbacToken}`"
		/>
		<image class="icon"
		v-if="item.status==1"
		:src="`${baseUrl}fyVolunteer/file/download/${item.awardImgReceived}?rbacToken=${rbacToken}`"
		/>
		<text class="text">{{item.awardName}}</text>
		<view class="check" v-if="item.status == 2? true : false">点击领取</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				baseUrl: getApp().globalData.baseUrl,
				rbacToken: getApp().globalData.rbacToken,
			}
		},
		props: {
			item: {
				type: [Object],
				default: {}
			},
			imgName:{
				type: [String],
				default: ""
			},
			imgIndex:{
				type: [String,Number],
				default: 0
			}
			
		},
		methods: {
			eventClick() {
				this.$emit('eventClick');
			}
		},
	}
</script>

<style lang='scss'>
	.list-cell-icon {
		float:left;
		padding: 0 10upx;
		box-sizing: initial;
		position: relative;
		width:120upx;
		.icon{
			width:100%;
			height:120upx;
		}
		.text{
			width:100%;
			display: inline-block;
			text-align: center;
		}
		.check{
		margin-top:10upx;
		background: #e32417;
		color: #fff;
		border-radius: 20upx;
		line-height: 36upx;
		font-size: 20upx;
		text-align: center;
			
		}
	}
</style>
