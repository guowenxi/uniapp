<template>
	<view class="time-count">
		
		<view class="item">{{h}}</view>
		<view class="item">{{m}}</view>
		<view class="item">{{s}}</view>

<!-- 		<view>{{hour < 10 ? '0'+hour : hour}}</view>
		<view>{{second < 10 ? '0'+second : second}}</view> -->
		
	</view>
</template>

<script>
	export default {
		props: {
			second: {
				type: [String, Number],
				default: 0
			},
		},
		mounted(){
			this.countTime();
			debugger
		},
		data() {
			return {
				d:"",
				h:"",
				m:"",
				s:"",
			};
		},
		methods: {
			countTime: ()=> {
				
				//获取当前时间
				var date = new Date();
				var now = date.getTime();
				//设置截止时间 
				var endDate = new Date("2019-10-22 23:23:23");
				var end = endDate.getTime();
				//时间差
				var leftTime = end - now;
				//定义变量 d,h,m,s保存倒计时的时间 
				if (leftTime >= 0) {
					this.d = Math.floor(leftTime / 1000 / 60 / 60 / 24);
					this.h = Math.floor(leftTime / 1000 / 60 / 60 % 24);
					this.m = Math.floor(leftTime / 1000 / 60 % 60);
					this.s = Math.floor(leftTime / 1000 % 60);
				}
				console.log(this.s); 
				//递归每秒调用countTime方法，显示动态时间效果 
				setTimeout(this.countTime, 1000); 
				}
			}
		}
</script>

<style lang="scss">
.time-count{
	.item{
		float:left;
	}
}
</style>
