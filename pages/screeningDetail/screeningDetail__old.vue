<template>
	<view class="content">
		<scroll-view class="screeningDetail" scroll-y>
			<view class="title-side ">

				<view class="title-text">
					<view class="red-text">
						<text>领域类型:</text>
						<text>{{ info.subName }}</text>
						<view class="title-icon">
							<view v-if="info.gradeName == '重大隐患'" class="icon icon-1">{{ info.gradeName }}</view>
							<view v-else-if="info.gradeName == '一般隐患'" class="icon icon-2">{{ info.gradeName }}</view>
							<view v-else-if="info.gradeName == '无效信息'" class="icon icon-3">{{ info.gradeName }}</view>
						</view>
					</view>
					<view class="text">
						<view>描述:</view>
						<view class="content-color-box">{{ info.descr }}</view>
					</view>
				</view>
			</view>
			<view class="cell-imgs">
				<view v-if="info.file1.length > 0">
					<image
						mode="aspectFill"
						v-for="(item, index) in file1"
						class="img-item"
						@click="showDetailImg(index)"
						:src="item ? `${baseUrl}fyProHandle/file/download/${item}?rbacToken=${rbacToken}` : '/static/errorImage.jpg'"
					></image>
				</view>

				<view class="audio-box" v-if="info.file2">
					<view class="item">
						<view class="bofang" @click="recorderPlayState()">
							<image class="img" :src="!recorder_state ? '/static/img/icon_Play@2x.png' : '/static/img/icon_halt@2x.png'" />
						</view>
						<view class="wrap-line"><view class="inner-line" :style="{ width: begin_time * (100 / recorder_duration) + '%' }"></view></view>
						<view class="time">{{ recorder_duration - begin_time }}秒</view>
						<!-- <image class="del-btn" src="/static/img/icon_Photo_delete@2x.png" @click="delrecorder"></image> -->
					</view>
				</view>
			</view>
			<view class="bottom-side">
				<view class="title-text">
					<image class="loc-icon" src="/static/img/icon_position@2x.png"></image>
					{{ info.address }}
				</view>
			</view>

			<view class="bottom-side b-b">
				<view class="time-box">上报时间:{{ info.commitTime }}</view>
				<!-- 				<view class="right-text" :class="info.state==1 ? 'font-green' : 'font-orange'">{{info.state==1 ? '已办结' : info.state==2 ? '已受理' :  '待受理'}}</view> -->
				<view class="right-text" :class="info.state == 1 ? 'font-orange' : 'font-green'">{{ info.state == 1 ? '待审核' : '已审核' }}</view>
			</view>
			<view class="middle-side b-b" v-if="info.state == 1 ? false : true">
				<view class="title">奖励:</view>
				<view class="right-text">
					<view>感谢您的监督上报！</view>
					<view>
						根据您的上报线索给与您
						<text class="yellow-text">15平安币</text>
						奖励
					</view>
				</view>
			</view>
			<!-- 			<view class="rate-side">
			
				<view class="title">请您对我们的工作进行评价：</view>
				<uni-rate class="rate-box" :value="info.evaluate" @change="changerate" size="35" margin="5"></uni-rate>
			</view> -->

		<view class="default-box step-box">
			<view class="title">处理进度:</view>
				 <uni-steps :options="steps" direction="column"  :active="99" />
		</view>
		</scroll-view>
		<!-- <button class="bottom-bg-button" type="red" @click="updateProHandle">提交评价</button> -->
			<view class="bottom-btn-box" >
					<button class="bottom-bg-button" type="red" @click="navigateBack(1)">返回</button>
			</view>
		<swiper-detail-img ref="swiperDetailImg" :imgs="file1" :current="current" :showDetail="showDetail"></swiper-detail-img>
	</view>
</template>

<script>
import uniRate from '@/components/uni-rate/uni-rate.vue';
import swiperDetailImg from '@/components/swiper-detail-img';
import uniSteps from '@/components/qingqing-steps/uni-steps.vue'
export default {
	components: {
		uniRate,
		uniSteps,
		swiperDetailImg
	},
	data() {
		return {
			baseUrl: getApp().globalData.baseUrl,
			rbacToken: getApp().globalData.rbacToken,
			file1: [],
			showFlies:[],
			showDetail: false,
			current: 0,
			recorder_state: false,
			recorder_duration: 0,
			begin_time: 0,
			info: [],
			steps:[]
		};
	},
	props: {},
	onShow() {
		this.info = this.selListItem;
		this.info.list.map((item,idx)=>{
			this.steps.push({
				title:item
			})
		})
		this.file1 = this.info.file1.split(',');
		this.file1.map((item,idx)=>{
			this.showFlies[idx] = `${this.baseUrl}fyProHandle/file/download/${item}?rbacToken=${this.rbacToken}`
		})
		if (this.info.file2) {
			// this.getAudio(this.baseUrl+'fyProHandle/file/download/'+this.info.file2)
			this.getAudio(`${this.baseUrl}fyProHandle/file/download/${this.info.file2}?rbacToken=${this.user.rbacToken}`);
		}
	},
	methods: {

		//重置时间
		recorderReset() {
			this.recorder_state = false;
			this.begin_time = 0;
		},
		//时间
		recorderTimer() {
			setTimeout(() => {
				if (this.begin_time >= this.recorder_duration) {
					this.recorderReset();
					return;
				} else {
					this.begin_time = this.begin_time + 1;
					this.recorderTimer();
				}
			}, 1000);
		},
		//开始播放
		recorderPlayState() {
			this.recorder_state = !this.recorder_state;
			if (this.recorder_state) {
				console.log('播放');
				this.innerAudioContext.play();
				this.recorderTimer();
			} else {
				console.log('停止播放');
				this.innerAudioContext.stop();
				this.recorderReset();
			}
		},

		getAudio(voicePath) {
			const _this = this;
			this.innerAudioContext = uni.createInnerAudioContext();
			this.innerAudioContext.autoplay = true;
			this.innerAudioContext.src = voicePath;
			this.innerAudioContext.onCanplay(function() {
				//得到时间
				_this.recorder_duration = Math.ceil(_this.innerAudioContext.duration);
			});
		},
		updateProHandle() {
			this.$http
				.post('fyProHandle/proHandle/updateProHandle', {
					id: this.info.id,
					evaluate: this.info.evaluate,
					rbacToken: this.user.rbacToken
				})
				.then(res => {
					if (res.data.success == 1) {
						uni.showToast({
							title: '评价成功',
							success: () => {
								setTimeout(() => {
									this.navTo('/pages/myScreening/myScreening');
								}, 1500);
							}
						});
					} else {
						uni.showToast({
							icon: 'none',
							title: res.data.message
						});
					}
				});
		},
		changerate(val) {
			this.info.evaluate = val;
		}
	}
};
</script>

<style lang="scss">
	.bottom-btn-box {
		z-index:100;
		// position: fixed;
		bottom:0upx;
		left:0;
		background: #fff;
		// border-top: 1px solid #eee;
		max-height: 160upx;
		min-height: 160upx;
		width:100%;
	
		// padding-top: 20upx;
		flex: 1;
		
		display: flex;
	    margin: 0 auto;
		
		.left-btn {
			margin-top:40upx;
			width:90%;
			// flex: 1;
	
		}
	
	
	}
	
	.step-box{
		padding:20upx 0 !important;
	}
	.default-box{
		margin-bottom:20upx;
		padding:20upx;
		background: #fff;
		font-size:26upx;
		.title{
			font-size:$font-title;
			margin-bottom:20upx;
		}
		}
.time-box {
	color: #ccc;
}
.audio-box {
	width: 100%;
	float: left;
	text-align: center;
	margin: 20upx 0;
	.item {
		height: 100upx;
		line-height: 60upx;
		padding: 20upx;
		background: #eee;
		position: relative;
		width: 90%;
		margin: 0 auto;
		.bofang {
			position: relative;
			z-index: 200;
			width: 60upx;
			height: 60upx;
			float: left;
			.img {
				width: 100%;
				height: 100%;
			}
		}
		.wrap-line {
			margin: 0 20upx;
			position: relative;
			top: 50%;
			float: left;
			width: 70%;
			height: 10upx;
			background: #ccc;
			transform: translateY(-50%);
			.inner-line {
				height: 100%;
				position: absolute;
				left: 0;
				top: 0;
				z-index: 100;
				background: #303133;
			}
		}
		.time {
			font-size: 30upx;
			float: right;
		}
		.del-btn {
			position: absolute;
			right: -10upx;
			top: -10upx;
			width: 40upx;
			height: 40upx;
		}
	}
}

.screeningDetail {
	flex:1;
	height:0;
	box-sizing: initial;
	padding: 28upx 0;
	display: flex;
	position: relative;
	flex-flow: column nowrap;
	.title-side {
		position: relative;
		font-size: $font-lg;
		width: 100%;
		.title-icon {
			float:right;
			.icon {
				line-height:30upx;
				background: #e32417;
				padding: 5upx;
				border-radius: 10upx;
				color: #fff;
				font-size: 18upx;
				display: inline-block;
			}
		}

		.title-text {
			line-height: 80upx;

			overflow: hidden;
		}
	}

	.bottom-side {
		padding-top: 20upx;
		padding-bottom: 32upx;
		position: relative;
		font-size: $font-base;
		display: flex;
		flex-flow: row nowrap;
		flex: 1;
		width: 100%;

		.loc-icon {
			width: 21upx;
			height: 25upx;
			margin-right: 12upx;
		}

		.title-text {
			// max-width: 85%;
			// min-width: 85%;
			flex: 1;
			overflow: hidden;
		}

		.right-text {
			position: absolute;
			right: 0;
			font-size: $font-sm;
			flex: 1;
		}
	}

	.cell-imgs {
		.img-item {
			margin:0 1%;
			width: 30%;
			height: 150upx;
			float: left;
		}
	}

	.middle-side {
		font-size: 30upx;
		padding: 30upx 10upx;
		position: relative;
		display: flex;
		.title {
			font-weight: bold;
			flex: 1;
		}
		.right-text {
			width: 90%;
		}
	}
	.rate-side {
		font-size: $font-sm;
		padding: 30upx 5upx;
		.title {
			font-weight: bold;
		}
		.rate-box {
			padding: 30upx 0;
		}
	}
}
</style>
