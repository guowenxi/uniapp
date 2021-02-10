<template>
  <view class="mask" :class= "mask == 'true' || mask == true ? 'mask-show' : ''" @click="Mclose" v-if="show">
		<!-- 加载动画开始 -->    <!-- loading1~loading30挑选任意一个替换下方html 且替换对应css -->
  <view class="loading15">
    <view></view>
    <view></view>
    <view></view>
    <view></view>
    <view></view>
  </view>
		<!-- 加载动画结束 -->
		<view class="title">{{text}}</view>
  </view>
  <!-- 遮罩层-->
</template>

<script scoped="true">
export default {
  name: "w-loading",
	props:{
		text: String,
		mask: Boolean | String,
		click: Boolean | String,
	},
  data() {
    return {
			show: false
		};
  },
	methods:{
		Mclose(){
			if(this.click == 'false' || this.click == false){
				this.show = false
			}
		},
		open(){
			this.show = true
    },
    close(){
      this.show = false
    }
	}
};
</script>

<style>
.mask {
  /* pointer-events: none; */
  position: fixed;
  z-index: 99999;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100vh;
  width: 100vw;
  display: flex;
	flex-direction:column;
  justify-content: center;
  align-items: center;
	flex-wrap: wrap;
}
.mask.mask-show{
	background: rgba(7, 17, 27, .3);
}
.title{
	color: #fff;
	font-size: 28upx;
}





/* loading加载动画的css */

.loading15 {
	transform: scale(2);
  position: relative;
  width: 100upx;
  height: 40upx;
}
.loading15 view {
  position: absolute;
  width: 20upx;
  height: 20upx;
  background: dodgerblue;
  border-radius: 50%;
  -webkit-animation: loading15 1s infinite ease-in-out;
  animation: loading15 1s infinite ease-in-out;
}
.loading15 view:nth-child(2) {
  left: 20upx;
  -webkit-animation-delay: 0.2s;
  animation-delay: 0.2s;
}
.loading15 view:nth-child(3) {
  left: 40upx;
  -webkit-animation-delay: 0.4s;
  animation-delay: 0.4s;
}
.loading15 view:nth-child(4) {
  left: 60upx;
  -webkit-animation-delay: 0.6s;
  animation-delay: 0.6s;
}
.loading15 view:nth-child(5) {
  left: 80upx;
  -webkit-animation-delay: 0.8s;
  animation-delay: 0.8s;
}

@-webkit-keyframes loading15 {
  0%,
  100% {
    opacity: 0.3;
    -webkit-transform: translateY(0);
    transform: translateY(0);
    box-shadow: 0 0 3upx rgba(255, 255, 255, 0.1);
  }
  50% {
    opacity: 1;
    -webkit-transform: translateY(-10upx);
    transform: translateY(-10upx);
    box-shadow: 0 20upx 3upx rgba(255, 255, 255, 0.05);
  }
}

@keyframes loading15 {
  0%,
  100% {
    opacity: 0.3;
    -webkit-transform: translateY(0);
    transform: translateY(0);
    box-shadow: 0 0 3upx rgba(255, 255, 255, 0.1);
  }
  50% {
    opacity: 1;
    -webkit-transform: translateY(-10upx);
    transform: translateY(-10upx);
    box-shadow: 0 20upx 3upx rgba(255, 255, 255, 0.05);
  }
}
</style>
