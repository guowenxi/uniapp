<template>
		<!-- <view class="qiandao-box" :style="{'visibility':pageState ? 'inherit' : 'hidden'}"  > -->
		<view class="qiandao-box" >
			<view class="qiandao-item qiandao-samll-item" :class="animateState_main ? 'animate-on' : false" @click="eventClick"> 
				<!-- <image class="close-btn" src="/static/img/box_shut@2x.png" ></image>
				<image class="item-img cccc" src="/static/img/Signin_light@2x.png"></image>
				<image class="item-img gggg" src="/static/img/box_thank@2x.png"></image> -->
				
				<!-- <image class="item-img" src="/static/img/4.png"></image>
				<image class="hand-img" src="/static/img/1.png" :class="animateState_main ? 'hand-ani' : false"></image>
				<image class="item-samll-img" src="/static/img/3.png"></image>
				<image class="circle-img" src="/static/img/2.png" :class="animateState_main ? 'circle-ani' : false"></image>
				<view class="text-prompt">感谢您参与平安瓯海建设</view>
				<view class="close-btn">关闭</view> -->
				<view class="top-icon-box">
					<image class="item-img-ying" src="/static/img/光影@2x.png"></image>
					<image class="item-img-zan" src="/static/img/点赞@2x.png"></image>
				</view>
				<view class="bottom-text-box">
					感谢您参与平安瓯海建设
				</view>
			</view>
		</view>
</template>

<script>
	export default {
		data() {
			return {
				animateState_main:false,
			};
		},
		mounted(){
			this.animateState_main = true;
		},
		props: {
			pageState: {
				type:[Boolean,String],
				default: false
			},
		},
		methods: {
			changePageState(bol,_this){
				this.animateState_main = true;
			},
			eventClick(){
				if( !this.animateState_main){
					return ;
				}
				this.animateState_main= !this.animateState_main;
				setTimeout(() => {
					this.animateState=false;
					this.$emit('eventClick');
				}, 1000);
				
			},
		}
	}
</script>

<style lang="scss">
	.qiandao-box{
		.qiandao-samll-item{
			width: 488upx;
			height: 390upx;
			.text-prompt{
				font-size: 30upx;
				color: #111;
				margin-top: 195upx;
				position: relative;
				text-align: center;
			}
			.close-btn{
				width: 220upx;
					height: 72upx;
					background-image: linear-gradient(90deg, 
						#fa261f 0%, 
						#ff6255 50%, 
						#fa261f 100%), 
					;
					background-blend-mode: normal, 
						normal;
					box-shadow: 0px 8upx 0px 0px 
						rgba(255, 123, 123, 0.4);
					border-radius: 36px;
					top: 261upx;
					left: 50%;
					transform: translateX(-50%);
					line-height: 72upx;
					text-align: center;
					font-size: 32upx;
					color: #fff;
					cursor: pointer;
			}
			.item-samll-img{
				    width: 100%;
				    height: 77.7%;
				    position: absolute;
				    bottom: 0;
			}
			.hand-img{
				position: absolute;
				width: 114upx;
					height: 115upx;
				left: 50%;
				transform: translateX(-50%);
				top: 40%;
			}
			.hand-ani{
				animation: handAni 500ms infinite  linear;
				animation-delay: 1s;
				animation-iteration-count: 1;
				animation-fill-mode:forwards;
			}
			.circle-img{
				position: absolute;
				left: 50%;
				transform: translateX(-50%);
				top: -10%;
				opacity: 0;
			}
			.circle-ani{
				animation: circleAni 500ms infinite linear;
				animation-delay: 1.5s;
				animation-iteration-count: 1;
				animation-fill-mode:forwards;
			}
			
			
			.top-icon-box{
				width: 488upx;
				height: 290upx;
				position: relative;
				background-color: #fff;
				border-radius:  10upx 10upx 0 0;
				.item-img-zan{
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%,-50%);
					width: 200upx;
					height: 184upx;
				}
				.item-img-ying{
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%,-50%);
					width: 374upx;
					height: 346upx;
					animation: circleYing 5s linear infinite;
				}
			}
			.bottom-text-box{
				width: 488upx;
				height: 119upx;
				background-color: #faece4;
				font-size: 28upx;
				line-height: 119upx;
				text-align: center;
				color: #6d2d2d;
				border-radius: 0 0 10upx 10upx;
			}
		}
	}
	@keyframes handAni
	{
		from {
			top: 40%;
		}
		to {
			top: 16upx
		}
	}
	
	@keyframes circleAni
	{
		from {
			width: 10upx;
			height: 10upx;
			opacity: 1;
		}
		to {
			width: 167upx;
			height: 96upx;
			opacity: 1;
		}
	}
	
	@keyframes circleYing
	{
		0% {
			transform:translate(-50%,-50%) rotate(0deg);
		}
		25% {
			transform:translate(-50%,-50%) rotate(90deg);
		}
		50% {
			transform:translate(-50%,-50%)  rotate(180deg);
		}
		75% {
			transform:translate(-50%,-50%) rotate(270deg);
		}
		100% {
			transform:translate(-50%,-50%)  rotate(360deg);
		}
	}
	
	
	
</style>
