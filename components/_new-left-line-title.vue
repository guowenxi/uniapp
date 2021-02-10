<template>
	<view class="left-line-title">
		<view class="line"></view>
		<view class="title">{{title}}</view>
		<!-- <view  class="border-right" @click="eventClick" v-if="rightTitle!='false' ? true : false">{{rightTitle}}</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		props: {
			rightTitle: {
				type: String,
				default: 'false'
			},
			title: {
				type: String,
				default: '标题'
			},
		},
		methods:{
			eventClick(){
				this.$emit('eventClick');
			}
		}
	}
</script>

<style lang="scss">
.left-line-title{
	// margin-top:10upx;
	// margin-bottom:20upx;
	position: relative;
	width:100%;
	float:left;
	.line{
		position: absolute;
		top:50%;
		transform: translateY(-50%);
		float:left;
		background: #ff0000;
		width:10upx;
		height:30upx;
		
	}
	.title{
		
		margin-left:20upx;
		float:left;
		font-size:30upx;
	}
	.border-right{
		position: absolute;
		top:50%;
		transform: translateY(-50%);
		right:0;
		float:right;
		font-size:24upx;
		padding:2upx 15upx;
		border-radius: 32upx;
		border:1px solid #ccc;
	}
}
</style>
