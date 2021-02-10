<template>
	<view class="content no-padding">
		<scroll-view class="screeningDetail" scroll-y>
			
			<view class="item-title">
				<view class="left-line"></view>
				<view class="title ">详情</view>
				<view class="item-title-right ">
					<view class="pinganbi" v-if="info.taskType !=3 && info.integral">
						<image class="pinganbi-icon" src="/static/_new/wwg_coin@2x.png"></image>
						<view class="pinganbi-text">{{info.integral}}</view>
					</view>
				<view v-if="info.state==1" class="right-text font-gray-border">待审核</view>
				<view v-if="info.state==2" class="right-text font-green-border">已审核</view>
				<view v-if="info.gradeName" class="right-text font-orange-border">{{info.gradeName}}</view>
				<view v-if="info.taskType ==3" class="right-text font-orange-border">微上报</view>

				</view>
			</view>
			
			<view class="title-side ">
				<view class="title-text">
					<view class="grey-bg">
						<view class="grey-bg-text color-333">类型</view>
						<view class="grey-bg-text color-666">{{ info.subName }}</view>
					</view>
				</view>
			</view>
			

			<view class="padding-content">
				<view class="middle-box" >
					<view class="text">
						<view class="title color-333">描述</view>
						<textarea v-if="changeItemState  ? true : false" auto-height class="textarea-box color-666" v-model="changeInfo.descr"  placeholder-style="color:#ccc" placeholder="请输入问题描述" @input="changeTextarea"  @confirm="changeTextarea"/>
						<view v-else class="content-color-box">{{ info.descr }}</view>
					</view>
					
					<!-- <file-picker  :fileList="fileList" :audioList="audioList"></file-picker> -->
					<new-file-picker ref="filePicker" :itemState="changeItemState" ></new-file-picker>
				</view>
				<view class="title color-333 ">地址</view>
				<view v-if="changeItemState  ? true : false">
					<view class="location-box" @click="chooseLocation">
						<image class="loc-icon-left" src="/static/_new_index/home_position@2x.png"></image>
						<view class="loc-text clamp" style="width:100%;height:100%;" >
							<scroll-view class="history-section history-section-x icon" scroll-x>{{changeInfo.address !="" ?  changeInfo.address : "请选择隐患地址"}}</scroll-view>
<!-- 							<image class="loc-icon" src="/static/img/icon_position@2x.png" @click="chooseLocation"></image> -->
						</view>
					</view>
					<!-- <textarea auto-height class="textarea-box textarea-box-info" v-model="changeInfo.descrValInfo"  placeholder-style="color:#ccc" placeholder="详细地址:如道路、门牌号、小区、楼栋号、单元室等等" @input="changeTextareaInfo"  @confirm="changeTextareaInfo"/> -->
				</view>
				
				<view class="bottom-side location-box location-box-height" v-else>
					<image class="loc-icon-left" src="/static/_new_index/home_position@2x.png"></image>
					{{ info.address }}
					
<!-- 					<scroll-view class="title-text white-space" scroll-x>
						<view class="location-box-text">{{ info.address }}</view>
					</scroll-view> -->
				</view>
				

				
<!-- 				<view class="middle-side b-b" v-if="info.state == 1 ? false : true">
					<view class="title">奖励:</view>
					<view class="right-text">
						<view>感谢您的监督上报！</view>
						<view>
							根据您的上报线索给与您
							<text class="yellow-text">15平安币</text>
							奖励
						</view>
					</view>
				</view> -->
				
				

						
			</view>
			
			<view class="shangbao-time grey-bg" >
				<view class="title color-333" style="margin-bottom:20rpx;">上报时间</view>
				<view class="time-box color-666">{{ info.commitTime }}</view>
				<!-- 				<view class="right-text" :class="info.state==1 ? 'font-green' : 'font-orange'">{{info.state==1 ? '已办结' : info.state==2 ? '已受理' :  '待受理'}}</view> -->
<!-- 				<view class="right-text" :class="info.state == 1 ? 'font-orange' : 'font-green'">{{ info.state == 1 ? '待审核' : '已审核' }}</view> -->
			</view>
			
			<view  v-if="info.checkImage && info.checkImage.length>0" style="padding:0 30rpx">
				<view class="item-title" style="margin-top: 30rpx;">
					<view class="left-line"></view>
					<view class="title ">处置照片</view>
				</view>
				
				<view class="imgs-list" >
				
					<view class="imgs-item" v-for="(item,index) in info.checkImage">
						<image class="img" :src=" `${baseUrl}fyVolunteer/file/download/${item}?rbacToken=${rbacToken}` " @click="showDetailImg(index)"></image>
					</view>
				</view>
			</view>



			<view class="item-title" style="margin-top: 30rpx;">
				<view class="left-line"></view>
				<view class="title ">处理进度</view>
			</view>
			
			
			<view class="default-box step-box item-title" v-if="newStep">
				<steps-time-screeing class="steps"
				:options="info.troubleHistoryList" 
				></steps-time-screeing>
			</view>
			
			<view class="default-box step-box item-title" v-else>
				<uni-steps :options="steps" direction="column" :active="99" />
			</view>
			

		</scroll-view>
		<!-- <button class="bottom-bg-button" type="red" @click="updateProHandle">提交评价</button> -->
		<view class="bottom-btn-box" v-if="changeItemState  ? true : false ">
			<button class="btn-item" type="red" @click="changeItem('cancel')">取消</button>
			<button class="btn-item" type="red" @click="changeItem('save')">保存</button>
		</view>
		<view class="bottom-btn-box" v-else>
			<button class="btn-item new-bg-red" type="red" @click="navigateBack(1)">返回</button>
			<button v-if="editDisabled" class="btn-item" type="red"  @click="changeItem('edit')">编辑</button>
		</view>
		<swiper-detail-img ref="swiperDetailImg" :imgs="file1" :current="current" :showDetail="showDetail"></swiper-detail-img>
	</view>
</template>

<script>
	import stepsTimeScreeing from '@/components/steps-time-screeing/steps-time-screeing';
	import uniRate from '@/components/uni-rate/uni-rate.vue';
	import swiperDetailImg from '@/components/swiper-detail-img';
	import uniSteps from '@/components/qingqing-steps/uni-steps.vue'
	import newFilePicker from "@/components/_new-filePicker.vue"
	export default {
		components: {
			stepsTimeScreeing,
			newFilePicker,
			uniRate,
			uniSteps,
			swiperDetailImg
		},
		data() {
			return {
				newStep:false,
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
			this.id = this.selListItem.id;
			this.loadData();
			
		},
		methods: {
			loadData(){
				this.$http.get('fyProHandle/proHandle/getProHandleByKeyPro', {
					rbacToken:this.user.rbacToken,
					id:this.id,
					})
					.then(res => {
						uni.hideLoading();
						if (res.data.success == 1) {
							this.info = res.data.data;
							//判断是否能编辑
							this.editDisabled = this.info.list.slice(-1)[0] == '已上报' ?  true : false;
							this.info.list.map((item, idx) => {
								this.steps.push({
									title: item
								})
							})
							
							if(this.info.troubleHistoryList.length>0){
								this.newStep = true ;
							}
							
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
								// this.getAudio(`${this.baseUrl}fyProHandle/file/download/${this.info.file2}?rbacToken=${this.user.rbacToken}`);
							};
						}else{
							uni.showToast({
								icon:'none',
								title: res.data.message
							});
						}
					})
			},
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
					plus.nativeUI.previewImage(this.info.checkImage, {
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
				debugger
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
	.shangbao-time{
		margin: 0  !important;
		width: 100%;
		display: inline-block;
		padding: 30rpx;
		padding-bottom: 0;
	}
	.padding-content{
		padding:0 30rpx;
	}
	.grey-bg{
		margin:20rpx 0;
		padding:20rpx 32rpx;
		
		.grey-bg-text{
			font-size:$new-font-30;
			&:first-child{
				margin-bottom: 30rpx;
			}
			height: 30rpx;
			line-height: 30rpx;
		}
	}
	.pinganbi{
		float:right;
	}
	.item-title-right{
		.right-text {
			float:right;
			margin-right: 10rpx;
			border-radius: 8rpx;
			padding: 3rpx 10rpx;
		}
	}
	.item-title {
		padding: 0 30rpx;
		margin-bottom: 10rpx;

		width: 100%;
		height: 30rpx;
		line-height: 30rpx;
	
		.left-line {
			float: left;
			position: relative;
			top: 50%;
			transform: translateY(-50%);
	
			width: 10rpx;
			height: 24rpx;
			background-color: #e32417;
			border-radius: 5rpx;
		}
	
		.title {
			margin-left: 20rpx;
			font-weight: bold;
			float: left;
			text-shadow: 0 2rpx 2rpx rgba(125, 133, 141, 0.4);
			font-size: $new-font-32;
			color: #333333;
		}
	
		.right-title {
			font-size: 22rpx;
			float: right;
			color: #b7b7b7;
		}
	}
	
	.location-box-height{
		height:auto !important;
	}
	
	.location-box{
		box-sizing: content-box;
		border-bottom: 1rpx solid #e6e6e6;
		font-size:30upx;
		
		position: relative;
		// float:left;
		width:100%;
		background: #fff;
		line-height:60upx;
		height:60upx;
		display: flex;
		flex-flow: row nowrap;
		.title-text{
			line-height: 60upx;
		}
		.location-box-text{
			line-height: 60upx;
		}
		.m-input{
			color:#007AFF;
			padding:0;
			height:60upx;
			float:left;
			width:85%;
			font-size:30upx;
		}
		.loc-icon-left {
	min-width: 34rpx;
	max-width: 34rpx;
	min-height: 44rpx;
	max-height: 44rpx;
			margin-right: 12upx;
			margin-top:8rpx;
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
		font-size:$new-font-30;
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
		font-size:$new-font-30;
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
			padding-bottom: 20upx;
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
				font-size:18rpx;
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
	.imgs-list {
		flex: 1;
		width: 100%;
		// margin: 0 auto;
		padding: 20upx 0;
		border-bottom: 1rpx solid #e6e6e6;
		.imgs-item {
			flex:1;
			width: 33.3%;
			height: 200upx;
			display: inline-block;
			position: relative;
	
			.img {
				position: absolute;
				width: 95%;
				height: 95%;
				left: 50%;
				top: 50%;
				transform: translate(-50%, -50%)
			}
	
			.del-item {
				width: 45upx;
				height: 45upx;
				position: absolute;
				right: 0;
				top: 0;
			}
		}
	}
	
	
</style>
