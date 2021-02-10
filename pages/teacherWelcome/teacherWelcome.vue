<template>
	<view class="content no-padding" @click="dati">
		<image class="icon"  src="/static/img/图层21@2x.png"></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		onLoad(option){
			
			
		},
		methods:{
			/* 答题 */
			dati() {
				this.bolNavTo('/pages/teachInfoListNew/teachInfoListNew',{});
			},
		}
	}
</script>

<style lang="scss">
	.content{
		background-color: #fff4e4;
	}
	.icon{
		width: 490upx;
		height: 365upx;
		position: relative;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
	}
</style>
