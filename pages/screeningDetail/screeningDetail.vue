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
						<textarea v-if="changeItemState  ? true : false" auto-height class="textarea-box" v-model="changeInfo.descr"  placeholder-style="color:#ccc" placeholder="请输入问题描述" @input="changeTextarea"  @confirm="changeTextarea"/>
						<view v-else class="content-color-box">{{ info.descr }}</view>
					</view>
				</view>
			</view>
			
			<view class="middle-box" >
				<!-- <file-picker  :fileList="fileList" :audioList="audioList"></file-picker> -->
				<file-picker ref="filePicker" :itemState="changeItemState" ></file-picker>
			</view>
			
			<view v-if="changeItemState  ? true : false">
				<view class="location-box" >
					<!-- <image class="loc-icon-left" src="/static/img/icon_position@2x.png"></image> -->
					<view class="loc-text clamp" style="width:100%;height:100%;" >
						<scroll-view class="history-section history-section-x icon" scroll-x>{{changeInfo.address !="" ?  changeInfo.address : "请选择隐患地址"}}</scroll-view>
						<image class="loc-icon" src="/static/img/icon_position@2x.png" @click="chooseLocation"></image>
					</view>
				</view>
				<textarea auto-height class="textarea-box textarea-box-info" v-model="changeInfo.descrValInfo"  placeholder-style="color:#ccc" placeholder="详细地址:如道路、门牌号、小区、楼栋号、单元室等等" @input="changeTextareaInfo"  @confirm="changeTextareaInfo"/>
			</view>

			<view class="bottom-side" v-else>
				<view class="title-text">
					
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
				<uni-steps :options="steps" direction="column" :active="99" />
			</view>
		</scroll-view>
		<!-- <button class="bottom-bg-button" type="red" @click="updateProHandle">提交评价</button> -->
		<view class="bottom-btn-box" v-if="changeItemState  ? true : false ">
			<button class="btn-item" type="red" @click="changeItem('cancel')">取消</button>
			<button class="btn-item" type="red" @click="changeItem('save')">保存</button>
		</view>
		<view class="bottom-btn-box" v-else>
			<button class="btn-item" type="red" @click="navigateBack(1)">返回</button>
			<button v-if="editDisabled" class="btn-item" type="red"  @click="changeItem('edit')">编辑</button>
		</view>
		<swiper-detail-img ref="swiperDetailImg" :imgs="file1" :current="current" :showDetail="showDetail"></swiper-detail-img>
	</view>
</template>

<script>
	import uniRate from '@/components/uni-rate/uni-rate.vue';
	import swiperDetailImg from '@/components/swiper-detail-img';
	import uniSteps from '@/components/qingqing-steps/uni-steps.vue'
	import filePicker from "@/components/filePicker.vue"
	export default {
		components: {
			filePicker,
			uniRate,
			uniSteps,
			swiperDetailImg
		},
		data() {
			return {
				editDisabled:false,
				changeItemState:false,
				baseUrl: getApp().globalData.baseUrl,
				rbacToken: getApp().globalData.rbacToken,
				file1: [],
				showFlies: [],
				showDetail: false,
				current: 0,
				recorder_state: false,
				recorder_duration: 0,
				begin_time: 0,
				info: [],
				changeInfo:[],
				steps: []
			};
		},
		props: {},
		onLoad() {
			this.info = this.selListItem;
			//判断是否能编辑
			this.editDisabled = this.info.list.slice(-1)[0] == '已上报' ?  true : false;
			this.info.list.map((item, idx) => {
				this.steps.push({
					title: item
				})
			})

			this.file1 = this.info.file1.split(',');
			
			this.file1.map((item, idx) => {
				this.showFlies[idx] = `${this.baseUrl}fyProHandle/file/download/${item}?rbacToken=${this.rbacToken}`
			})
			setTimeout(() =>{
				this.$refs.filePicker.imgsList = this.showFlies;
				this.$refs.filePicker.fileList = this.file1;
				this.$refs.filePicker.moduleChange = false;
				this.$refs.filePicker.audioList = this.info.file2.split(',');
				
			}, 500);
			if (this.info.file2) {
				// this.getAudio(this.baseUrl+'fyProHandle/file/download/'+this.info.file2)
				this.getAudio(`${this.baseUrl}fyProHandle/file/download/${this.info.file2}?rbacToken=${this.user.rbacToken}`);
			}
		},
		methods: {
			changeTextareaInfo(event){
				
				// this.descrVal =`#${this.tagCheckName}#  ${event ? event.detail.value : '' }`;
				this.descrValInfo =event.detail.value;
			
				
			},
			//获取地址
			chooseLocation(){
			
				let _this = this;
				uni.chooseLocation({
					 // type: 'wgs84',
					success: (res)=> {
						_this.changeInfo.address = res.address;
						_this.changeInfo.longitude = res.longitude;
						_this.changeInfo.latitude = res.latitude;
					}
				});
			},
			
			//修改描述
			changeTextarea(event){
				
				// this.descrVal =`#${this.tagCheckName}#  ${event ? event.detail.value : '' }`;
				this.changeInfo.descr =event.detail.value;
			
			},
			
			//
			changeItem(bol){
				switch(bol){
					case "cancel" :
					this.changeInfo.file1.split(',').map((item, idx) => {
						this.showFlies[idx] = `${this.baseUrl}fyProHandle/file/download/${item}?rbacToken=${this.rbacToken}`
					})
					this.$refs.filePicker.moduleChange = false;
					this.$refs.filePicker.imgsList = this.showFlies;
					this.$refs.filePicker.fileList = this.changeInfo.file1.split(',');
					this.$refs.filePicker.audioList = this.changeInfo.file2.split(',');
					
					this.changeItemState = false;
					break;
					case "edit" :
					this.changeInfo = JSON.parse(JSON.stringify(this.info));
					//因为要编辑, 所以要重组设置
					let address  = this.changeInfo.address.split('#');
					this.changeInfo.address = address[0];
					this.changeInfo.descrValInfo = address[1];
					
					this.changeItemState = true;
					break;
					case "save" :
					this.submit();
					break;
				}
				
				
			},
			
			//确认上报
			submit(){
				debugger
				const _this = this;
				console.log(this.$refs.filePicker.fileList);
				console.log(this.$refs.filePicker.audioList);
		
		
				
				this.loadingState();
				this.$http.post('fyProHandle/proHandle/updateProHandleForApp', {
					file1:this.$refs.filePicker.fileList,
					file2:this.$refs.filePicker.audioList,
					longitude:this.changeInfo.longitude,
					latitude:this.changeInfo.latitude,
					address:this.changeInfo.address+(this.changeInfo.descrValInfo == '' ? '' : '#')+this.changeInfo.descrValInfo,
					// descr:`#${this.tagCheckName}#  ${this.descrVal}`,
					descr:this.changeInfo.descr,
					rbacToken:this.user.rbacToken,
					id:this.info.id,
					})
					.then(res => {
						uni.hideLoading();
						if (res.data.success == 1) {

						}else{
							uni.showToast({
								icon:'none',
								title: res.data.message
							});
						}
					})
			},

			
			//
			showDetailImg(idx) {

				try {
					plus.nativeUI.previewImage(this.showFlies, {
						current: idx,
					});
				} catch (e) {
					this.$refs.swiperDetailImg.hideDetail(true);
					this.current = idx;
				}

			},
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
	
	.location-box{
		height:100upx;
		font-size:30upx;
		
		position: relative;
		float:left;
		width:100%;
		background: #fff;
		padding:0 32upx;
		margin-bottom:15upx;
		line-height:100upx;
		display: flex;
		flex-flow: row nowrap;
		.m-input{
			color:#007AFF;
			padding:0;
			height:100upx;
			float:left;
			width:85%;
			font-size:30upx;
		}
		.loc-icon-left {
			width: 21upx;
			height: 25upx;
			margin-right: 12upx;
			position: relative;
			top: 50%;
			transform: translateY(-50%);
		}
		.history-section-x{
			height:100% !important;
			width:88%;
			color:#007AFF;
		}
		.history-section {
				flex:1;
				height:0;
				// background: #fff;
				border-radius: 10upx;
		}
		.placeholder{
			color:#007AFF;
		}
		.loc-text{
			// line-height:50upx;
			position: relative;
			.loc-t{
				color:#007AFF;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				width:90%;
			}
			.loc-icon {
				width: 28upx;
				    height: 34upx;
				    margin-right: 12upx;
				    position: absolute;
				    top: 50%;
				    right: 6upx;
		    transform: translateY(-50%);
			}
		}
	}
	
	
	.textarea-box{
	    border: 1px solid #efefef;
	    border-radius: 5px;
		font-size:32upx;
		background: #fff;
		padding:30upx;
		width:100%;
		min-height: 300upx;
		margin-bottom:15upx;
		color:#333;
	}
	.textarea-box-info{
		float:left;
		min-height: 150upx;
	
	}
	
	.middle-box{
		background: #fff;
		.list{
	    align-items: center;
	    flex-wrap: wrap;
		padding:25upx 0 ;
		width:100%;
		float:left;
		.middle-item{
	
	    float: left;
	    width: 33%;
	    display: flex;
	    flex-direction: column;
	    align-items: center;
	    font-size: $font-base;
	    color: #303133;
				.icon{
						width: 80upx;
					height: 80upx;
				}
				.text{
					margin-top:10upx;
					text-align: center;
				}
			}
		}
			margin-bottom:15upx;
	}
	
	
	
	.bottom-btn-box {
		z-index: 100;
		// position: fixed;
		bottom: 0upx;
		left: 0;
		background: #fff;
		// border-top: 1px solid #eee;
		max-height: 100upx;
		min-height: 100upx;
		width: 100%;

		// padding-top: 20upx;
		flex: 1;

		display: flex;
		margin: 0 auto;

		.btn-item{
			flex:1;
			margin: 0 5px;
		}
		
		.left-btn {
			margin-top: 40upx;
			width: 90%;
			// flex: 1;

		}


	}

	.step-box {
		padding: 20upx 0 !important;
	}

	.default-box {
		margin-bottom: 20upx;
		padding: 20upx;
		background: #fff;
		font-size: 26upx;

		.title {
			font-size: $font-title;
			margin-bottom: 20upx;
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
		flex: 1;
		height: 0;
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
				float: right;

				.icon {
					line-height: 30upx;
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
				margin: 0 1%;
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
