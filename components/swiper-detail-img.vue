<template>
	<view v-if="showDetail" class="bg-box" @click="hideDetail(false)">
		<swiper v-if=" imgs.constructor === Array ? true :false " class="swiper" :current="current" >
			<swiper-item v-for="(item,idx) in imgs" class="swiper-item" >
				<image class="img" 
				mode="widthFix"
				 :src="`${baseUrl}fyProHandle/file/download/${item}?rbacToken=${rbacToken}`" 
				 ></image>
			</swiper-item>
		</swiper>
		<view v-else class="swiper">
			<image class="img"
			mode="widthFix"
			 :src="`${baseUrl}fyProHandle/file/download/${imgs}?rbacToken=${rbacToken}`" 
			 ></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				baseUrl : getApp().globalData.baseUrl,
				rbacToken : getApp().globalData.rbacToken,
				showDetail:false,
			};
		},
		props: {
			current:{
				type: [Number,String],
				default: 0
			},
			imgs: {
				type: [Array,String],
				default: []
			},
		},
		watch:{
			
		},
		methods:{
			hideDetail(bol){
				this.showDetail = bol;
			}
		}
	}
</script>

<style lang="scss">
.swiper{
	position: absolute;
	left:0;
	top:0;
	width:100%;
	height:100%;
	background: rgba(0,0,0,0.5);
	z-index:2000;
	.img{
		position: absolute;
		left:50%;
		top:50%;
		transform: translate(-50%,-50%);
		width: 90%;
		height:auto;
		max-height: 90%;
	}
	.swiper-item{
			width:100%;
			height:100%;

	}

}
</style>
