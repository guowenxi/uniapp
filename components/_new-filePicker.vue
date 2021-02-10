<template>
	<view class="filePicker">
		
		<view class="audio-box" v-if="audioList.length>0 ? false:true " @click="showCate('录音')">
			<view class="audio-box-item" >
				<view class="left-line begin-line">
					<view class="bofang" >
						<image class="img"
							src="/static/_new/wwg_microphone@2x.png" 
						/>
					</view>
					<view class="bofang-text">开始录音</view>
				</view>
			</view>
		</view>
		
		<view class="audio-box" v-if="audioList.length>0 && audioList[0] !='' ? true:false ">
			<view class="audio-box-item" >
				<view class="left-line" @click="recorderPlayState()">
					<view class="bofang" >
						<image class="img"
							src="/static/_new/wwg_microphone@2x.png" 
						/>
					</view>
					<view v-if="!recorder_state" class="bofang-text">点击播放</view>
					<view v-else class="wrap-line" >
						<view class="inner-line" :style="{width:begin_time*(100/recorder_duration)+'%'}"></view>
					</view>
				</view>
		
				<view class="time">{{recorder_duration-begin_time}}秒</view>
				<image class="del-btn" v-if="itemState ? true : false" src="/static/img/icon_Photo_delete@2x.png" @click="delrecorder"></image>
			</view>
		</view>

		<view class="title color-333" style="margin-left: 0;">照片 <text class="color-666" style="margin-left: 40rpx;font-size: 26rpx;">（至少 1 张照片）</text></view>

		<view class="imgs-list" >
		
			<view class="imgs-item" v-for="(item,index) in imgsList">
				<image class="img" :src="item" @click="showDetailImg(index)"></image>
				<image class="del-item"  v-if="itemState ? true : false" @click="delImg(index)" src="/static/img/icon_Photo_delete@2x.png"></image>
			</view>
			<view class="imgs-item" v-if="itemState  && imgsList.length < 6? true : false">
				<image class="img" src="/static/_new/wwg_camera@2x.png" @click="showCate('拍摄')"></image>
			</view>
		</view>
		

<!-- 		<view class="list" v-if="itemState ? true : false">
			<view class="middle-item" v-for="item in menuList" @click="showCate(item)">
				<image class="icon" :src="item.checkDisable?  item.icon_disable :  item.icon"></image>
				<text class="text">{{item.name}}</text>
			</view>
		</view> -->
		
		
		<uni-popup ref="popup" type="bottom">
				<image 
				class="luyin toutchIn-css"
				:class="recorderStyle ? 'toutchIn-css' : '' "
				 :src="recorderStyle ? '/static/img/icon_sounding2@2x.png' : '/static/img/icon_sounding@2x.png'"  
				 @touchstart="getluy"
				  @touchend = "delluy"/>
		</uni-popup>
		
		<swiper-detail-img ref="swiperDetailImg" :imgs="imgsList" :current="current" :showDetail="showDetail"></swiper-detail-img>
		
	</view>
</template>

<script>
	
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	import swiperDetailImg from '@/components/swiper-detail-img';
		
		let voicePath = "",recorder_duration="";
		// iinnerAudioContext.autoplay = true;nnerAudioContext.autoplay = true;
	export default {
		components: {
			swiperDetailImg,
			uniPopup
		},
		props: {
			itemState: {
				type: [Boolean],
				default: true
			},
			// audioList:{
			// 	type: [Array],
			// 	default: []
			// }
		},
		data() {
			return {
				current:0,
				showDetail:false,
				firstLoadList:true,
				fileList:[],
				audioList:[],
				recorderManager:{},
				innerAudioContext: {},
				recorder_duration:0,
				recorderStyle:false,
				recorder_state:false,
				recorder_time:0,
				begin_time:0,
				
				imgsList: [

				],
				menuList: [{
						icon: "/static/img/icon_picture@2x.png",
						icon_disable: "/static/img/icon_picture_gray@2x.png",
						name: "照片",
						checkDisable:false,
					},
					{
						icon: "/static/img/icon_shot@2x.png",
						icon_disable: "/static/img/icon_shot_gray@2x.png",
						name: "拍摄",
						checkDisable:false,
					},
					{
						icon: "/static/img/icon_sound@2x.png",
						icon_disable: "/static/img/icon_sound_gray@2x.png",
						name: "录音",
						checkDisable:false,
					},
				]
			};
		},
		created() {
			// const _this =this ; 
			// try{
			// 	this.recorderManager = uni.getRecorderManager();
				
			// 	this.recorderManager.onStop( function (res) {
			// 		//获取当前录音
			// 		voicePath = res.tempFilePath;
			// 		_this.innerAudioContext.src = voicePath;
			// 		_this.innerAudioContext.onCanplay(function(){
						
			// 			//得到时间
			// 			_this.recorder_duration = Math.ceil(_this.innerAudioContext.duration);
			// 		})
			// 		_this.getFilerecorder(voicePath)
			// 		console.log('recorder stop' + JSON.stringify(res));
					
			// 	});
			// }catch(e){
			// 	//TODO handle the exception
			// }
		},

		methods: {
			
			getAudio(voicePath) {
				
				const _this = this;
				this.innerAudioContext = uni.createInnerAudioContext();
				this.innerAudioContext.src = voicePath;
				this.innerAudioContext.autoplay = false;
			
				this.innerAudioContext.onCanplay(function() {
					//得到时间
					_this.recorder_duration = Math.ceil(_this.innerAudioContext.duration);
				});
				_this.menuList[2].checkDisable = true ; 
			},
			//显示大图
			showDetailImg(idx) {
				
				try{
					plus.nativeUI.previewImage(this.imgsList,{
						 current: idx,
					});
				}catch(e){
					this.$refs.swiperDetailImg.hideDetail(true);
					this.current = idx;
				}
			
			},
			//录音文件上传
			getFilerecorder(filePath) {
				this.loadingState();
				const _this = this;
				uni.uploadFile({
					url: _this.baseUrl + "fyProHandle/file/upload",
					filePath: filePath,
					name: 'files',
					formData: {
						// rbacToken:this.user.rbacToken,
					},
					success: (res) => {
						uni.hideLoading()
						const file_id = JSON.parse(res.data).data;
						_this.audioList.push(file_id[0]);
						console.log('录音上报成功 id:'+file_id[0]);
					}
				})
			},
			//删除当前录音
			delrecorder(){
				this.audioList.splice(0, 1)
				this.menuList[2].checkDisable = false;
				voicePath = "";
				this.innerAudioContext.destroy();
			},
			//重置时间
			recorderReset(){
				this.recorder_state = false;
				this.begin_time = 0;
			},
			//时间
			recorderTimer(){
				setTimeout(()=>{
					if(this.begin_time>=this.recorder_duration){
						this.recorderReset(); 
						return ;
					}else{
						this.begin_time = this.begin_time+1;
						this.recorderTimer();
					};
				},1000)
			},
			//开始播放
			recorderPlayState(){
				this.recorder_state = !this.recorder_state; 
				if(this.recorder_state){
					console.log('播放');
					this.innerAudioContext.play();
					this.recorderTimer();
				}else{
					console.log('停止播放');
					this.innerAudioContext.stop();
					this.recorderReset()
				}
			},
			
			getluy() {
				if(this.menuList[2].checkDisable){
					return ;
				}
				//创建录音
				this.innerAudioContext  =uni.createInnerAudioContext();
				this.innerAudioContext.autoplay = true;
				this.recorderStyle = true;
				console.log('开始录音');
				this.recorderManager.start({
					duration: 600000,
					sampleRate: 8000,
					format: "mp3"
				});
				
			},
			delluy() {
				this.recorderStyle = false;
				this.menuList[2].checkDisable = true;
				console.log('录音结束');
				this.recorderManager.stop();
				this.$refs.popup.close();

			},
			
			uploadFile(data) {
				this.loadingState();
				const _this = this;
				uni.uploadFile({
					url: _this.baseUrl + "fyProHandle/file/upload",
					filePath: data,
					name: 'files',
					formData: {
						// rbacToken:this.user.rbacToken,
					},
					success: (res) => {
						uni.hideLoading();
						const file_id = JSON.parse(res.data).data;
						_this.fileList.push(file_id[0]);
					}
				})
			},
			saveRecord: function(recordPath) {
				console.log("===音频文件地址：" + recordPath + "===")
				//do... 可以使用 uni.uploadFile 接口上传到服务器
			},
			delImg(idx) {
				this.imgsList.splice(idx, 1);
				this.fileList.splice(idx, 1);
			},
			showCate(item) {
				const _this = this;
				switch (item) {
					case "照片":
						uni.chooseImage({
							count: 6 - _this.imgsList.length, //默认9
							sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
							sourceType: ['album'], //从相册选择
							success: function(res) {

								res.tempFilePaths.map((item, idx) => {
									_this.uploadFile(item);
									_this.imgsList.push(item)
								})
								// console.log(JSON.stringify(res.tempFilePaths));
							}
						});
						break;
					case "拍摄":
						uni.chooseImage({
							count: 1, //默认9
							sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
							sourceType: ['camera','album'], //从相册选择
							success: function(res) {
								_this.imgsList.push(res.tempFilePaths[0]);
								_this.uploadFile(res.tempFilePaths[0]);
								console.log(JSON.stringify(res.tempFilePaths));
							}
						});
						break;
					case "录音":
						_this.$refs.popup.open()



						break;
				}

			}

		},

		watch:{
			imgsList(val){
				if(val.length < 6){
					this.menuList[0].checkDisable = false;
					this.menuList[1].checkDisable = false;
				}else{
					this.menuList[0].checkDisable = true;
					this.menuList[1].checkDisable = true;
				}
			},
			audioList(val){
				//目前没想到比较好的办法解决
				if(this.moduleChange){
					return ;
				}
				this.moduleChange= true ; 
				this.getAudio(`${this.baseUrl}fyProHandle/file/download/${val[0]}?rbacToken=${this.user.rbacToken}`)
			}
		}
	}
</script>

<style lang="scss">
	.begin-line{
		width:200rpx !important;
	}
	.toutchIn-css{
		opacity: 0.7;

	}
	.luyin{
		margin:50upx;
		width:300upx;
		height:300upx;
		margin:0 auto;
		position: relative;
		left:50%;
		transform: translateX(-50%);
	}
	.audio-box {
		background: #fff;
		text-align: center;
		padding: 20upx 0;
		border-bottom :1rpx solid #e6e6e6;
		.audio-box-item{
			box-sizing: content-box;
			height: 52rpx;
			line-height:52rpx;
			// padding:0 20upx;
			// background: #eee;
			position: relative;
			// margin:0 auto;
			.left-line{
				float:left;
				width: 550rpx;
				height: 52rpx;
				background-color: #fff5f4;
				border-radius: 26rpx;
				border: solid 1rpx #f67c74;
			}
			.bofang{
				padding: 0 30rpx;
				box-sizing: content-box;
				position: relative;
				z-index:200;
				width: 17rpx;
				height: 26rpx;
				float:left;
				.img{
					width:100%;
					height:100%;
				}
			}
			.bofang-text{
				margin-top:-4rpx;
				font-size: $new-font-24;
				color:#e32417;
				float:left;
				line-height:inherit;
			}
			.wrap-line{
				margin: 0 20upx;
				position: relative;
				top:50%;
				float:left;
				width:70%;
				height:10upx;
				background: #ccc;
				transform: translateY(-50%);
				.inner-line{
					height:100%;
					position: absolute;
					left: 0;
					top:0;
					z-index:100;
					background: #303133;
				}
			}
			.time{
				font-size:$new-font-28;
				float:left;
				margin-left: 20rpx;
			}
			.del-btn{
				position: absolute;
				right:-10upx;
				top:50%upx;
				transform: translateY(-50%);
				width:40upx;
				height:40upx;
			}
		}
	}

	.filePicker {
		display: flex;
		flex-flow: column;
		// padding: 25upx 0;
	}

		.title{
			margin-top: 20upx;
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

	.list {
		padding: 10rpx 0 ;
		flex: 1;
		align-items: center;
		flex-wrap: wrap;
		float: left;
		width: 100%;

		.middle-item {

			float: left;
			width: 33%;
			display: flex;

			flex-direction: column;

			align-items: center;
			font-size: 14px;
			color: #303133;

			.icon {
				width: 80upx;
				height: 80upx;
			}

			.text {
				text-align: center;
			}
		}
	}
</style>
