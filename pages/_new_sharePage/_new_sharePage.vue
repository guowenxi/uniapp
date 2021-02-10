<template>
	<view class="content no-padding">
		<view class="fix-top">
			<image class="icon" src="/static/PALM_loog.png"></image>
			<view class="text">平安联盟</view>
			<view class="download">下载App</view>
		</view>
		<view class="new-item-box">
<!-- 			<view class="item-title">
				<view class="left-line"></view>
				<view class="title">主题</view>
			</view> -->
			<view class="item-content">
				<view class="item-grey-color item-title">
					{{info.name}}
				</view>
				
				<rich-text :class="info.content ? 'top-content' : '' " class="content-box" :nodes="info.content"></rich-text>
				
				
<!-- 				<view class="item-grey-color">
					{{info.description}}
				</view> -->
			</view>
		</view>
		<view style="height:180rpx;"></view>
		<!-- <video class="video-item" v-show="info.videoUrl" @waiting="showWaiting" @error="showError" src="http://192.168.1.154:8090/123.mp4"></video> -->
		<!-- <video class="video-item" v-show="info.videoUrl" @waiting="showWaiting" @error="showError" :src="videoUrl"></video> -->
		<!-- <rich-text :class="info.videoUrl ? 'top-content' : '' " class="content-box" :nodes="content"></rich-text> -->


<!-- 		<view class="bottom-btn-box" v-if="intervalSecondTime>0 && gridType">
			<button class="bottom-float-button left-btn linear-btn" @click="shareAPP">
				马上分享
			</button>
		</view> -->

	</view>
</template>

<script>
	import leftLineTitle from '@/components/left-line-title.vue';
	import listCellComment from '@/components/list-cell-comment.vue';
	export default {
		components: {
			leftLineTitle,
			listCellComment
		},
		data() {
			return {
				gridType:0,
				intervalSecondTime:0,
				carouselIndex: 0,
				id: "",
				videoUrl: "",
				likeState: false,
				baseUrl: getApp().globalData.baseUrl,
				rbacToken: getApp().globalData.rbacToken,
				info: [],
				commentList: [],
				content: ""
			};
		},
		onLoad() {
			this.gridType = this.user.gridType == 0 ? false : true;

			this.id = this.selListItem.id;
			
			this.getFyPropagandaTaskDetailById();
		},
		computed: {
			filterTime() {
				//console.log(this.intervalSecondTime)
				if (this.intervalSecondTime <= 0) {
					return "已超时";
				}
				var t = this.intervalSecondTime;
				var d = null;
				var h = null;
				var m = null;
				var s = null;
				d = Math.floor(t / (24 * 3600));
				h = Math.floor((t - 24 * 3600 * d) / 3600);
				m = Math.floor((t - 24 * 3600 * d - h * 3600) / 60);
				s = Math.floor(t - 24 * 3600 * d - h * 3600 - m * 60);
				var s = d + '天' + h + '小时' + m + '分钟' + s + '秒';
				var s = `${d==0 ? '' : d}${d==0 ? '' : '天'}` + `${h==0 ? '' : h}${h==0 ? '' : '小时'}` + `${m}${m==0 ? '' : '分'}`;
				if (!d && !h && !m) {
					return `${t==0 ? '' : t}${t==0 ? '' : '秒'}`
				}
				return s;

			},
		},
		methods: {
			saveFyPropagandaShare(){
				this.loadingState();
				this.$http
					.post('fyMicroGridManage/fyPropagandaTask/saveFyPropagandaShare', {
						propagandaTaskId:this.info.id,
						userId:this.user.userId,
						peaceCoin:this.info.peaceCoin,
						rbacToken: this.user.rbacToken
					})
					.then(res => {
						uni.hideLoading();
						if (res.data.success == 1) {
					  // uni.showToast({
							// icon: 'none',
							// title: "分享成功!"
					  // });
						} else {
							uni.showToast({
								icon: 'none',
								title: res.data.message
							});
						}
					});
			},
			
			timeInterval() {
				setTimeout(() => {
					if (this.intervalSecondTime <= 0) {
						return;
					}
					this.intervalSecondTime = this.intervalSecondTime - 1;
					this.timeInterval();
				}, 1000)
			},
			previewImage(idx) {
				let _self = this;
				let preview = [];
				this.info.fileList.map((item, _idx) => {
					preview.push(`${this.baseUrl}fyProHandle/file/download/${item.fileId}?rbacToken=${this.rbacToken}`);
				})
				uni.previewImage({
					current: idx,
					urls: preview
				});
			},
			changeCarousel(event) {
				this.carouselIndex = event.detail.current;
			},
			shareAPP() {
				
				const _this=this;
				_this.saveFyPropagandaShare();
				//#ifdef APP-VUE
				plus.share.sendWithSystem({
					type:this.info.name,
					content: this.info.description,
					href:this.baseUrl+'/app/share.html?id='+this.id,
					}, function(){
					
					uni.showToast({
					
						icon: 'none',
						duration:2000,
						title: "分享成功..."
					});
					
					console.log('分享成功');
				}, function(e){
					console.log('分享失败：'+JSON.stringify(e));
				});
				
				// uni.share({
				//     provider: "weixin",
				//     scene: "WXSceneSession",
				//     type: 0,
				//     title: this.info.name,
				//     summary: this.info.description,
				//     imageUrl: "/static/PALM_loog.png",
				// 	href:'http://115.223.34.195:8090/app/download.html',
				//     success: function (res) {
				//       _this.saveFyPropagandaShare();

				//     },
				//     fail: function (err) {
				//         console.log("fail:" + JSON.stringify(err));
				//     }
				// });
				
				// plus.share.sendWithSystem({

				// 		type: 'web',
				// 		title: this.info.name,
				// 		content: this.info.description,
				// 		href: 'http://115.223.34.195:8090/app/download.html'
				// 	},
				// 	function() {
				// 		this.saveFyPropagandaShare();
				// 		console.log('分享成功');
				// 	},
				// 	function(e) {
				// 		console.log('分享失败：' + JSON.stringify(e));
				// 	}
				// );
				//#endif

				//#ifdef H5
				this.saveFyPropagandaShare();
				//#endif
				
			},
			//关注 不关注
			checkLike() {
				this.loadingState();
				//fyVolunteer/fySafeUserTask/insert
				this.$http.get('fyVolunteer/fySafeUserTask/insert', {
						taskId: this.info.id,
						rbacToken: this.user.rbacToken,
						type: 2,
					})
					.then(res => {
						uni.hideLoading()
						if (res.data.success == 1) {
							let text = "";
							if (res.data.data == 1) {
								text = "关注成功!"
								this.likeState = true;
							} else {
								this.likeState = false;
								text = "已取消关注!"
							}
							uni.showToast({
								icon: 'none',
								title: text
							});

						} else {
							uni.showToast({
								icon: 'none',
								title: res.data.message
							});
						}

					})
			},

			getFyPropagandaTaskDetailById() {
				this.$http.get('fyMicroGridManage/fyPropagandaTask/getFyPropagandaTaskDetailById', {
						id: this.id,
						rbacToken: this.user.rbacToken,
					})
					.then(res => {
						if (res.data.success == 1) {
							this.info = res.data.data;
							this.intervalSecondTime = this.info.intervalSecondTime;
						} else {
							uni.showToast({
								icon: 'none',
								title: res.data.message
							});
						}

					})
			},

			onKeyInput(e) {
				this.content = e.target.value;
			},
			submit() {
				if (this.content == "") {
					return;
				}
				this.$http.post('fyPeaceStudy/fySafeStudy/comment', {
						content: this.content,
						studyId: this.info.id,
						rbacToken: this.user.rbacToken,
					})
					.then(res => {
						if (res.data.success == 1) {
							uni.showToast({
								icon: 'none',
								title: "评论成功"
							});

							this.content = "";

						} else {
							uni.showToast({
								icon: 'none',
								title: res.data.message
							});
						}

					})
			}

		}
	}
</script>

<style lang="scss">
	.fix-top{
		box-sizing: content-box;
		position: fixed;
		left:0;
		top:90rpx;
		width: 100%;
		height: 60rpx;
		padding:20rpx;
		font-size:35rpx;
		line-height:60rpx;
		border-bottom:1rpx solid #efefef;
		
		.icon{
			width:60rpx;
			height:60rpx;
			float:left;
		}
		.text{
			float: left;
			margin-left: 20rpx;
		}
		.download{
			float:right;
			margin-right:50rpx;
			
		}
		
	}
	.item-title{
		text-align: center;
		font-size:$new-font-32;
		color:#333 !important;
	}
	.swiper-dots {
		display: flex;
		position: absolute;
		left: 60upx;
		bottom: 15upx;
		width: 72upx;
		height: 36upx;
		background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAABkCAYAAADDhn8LAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTMyIDc5LjE1OTI4NCwgMjAxNi8wNC8xOS0xMzoxMzo0MCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTk4MzlBNjE0NjU1MTFFOUExNjRFQ0I3RTQ0NEExQjMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTk4MzlBNjA0NjU1MTFFOUExNjRFQ0I3RTQ0NEExQjMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6Q0E3RUNERkE0NjExMTFFOTg5NzI4MTM2Rjg0OUQwOEUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6Q0E3RUNERkI0NjExMTFFOTg5NzI4MTM2Rjg0OUQwOEUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4Gh5BPAAACTUlEQVR42uzcQW7jQAwFUdN306l1uWwNww5kqdsmm6/2MwtVCp8CosQtP9vg/2+/gY+DRAMBgqnjIp2PaCxCLLldpPARRIiFj1yBbMV+cHZh9PURRLQNhY8kgWyL/WDtwujjI8hoE8rKLqb5CDJaRMJHokC6yKgSCR9JAukmokIknCQJpLOIrJFwMsBJELFcKHwM9BFkLBMKFxNcBCHlQ+FhoocgpVwwnv0Xn30QBJGMC0QcaBVJiAMiec/dcwKuL4j1QMsVCXFAJE4s4NQA3K/8Y6DzO4g40P7UcmIBJxbEesCKWBDg8wWxHrAiFgT4fEGsB/CwIhYE+AeBAAdPLOcV8HRmWRDAiQVcO7GcV8CLM8uCAE4sQCDAlHcQ7x+ABQEEAggEEAggEEAggEAAgQACASAQQCCAQACBAAIBBAIIBBAIIBBAIABe4e9iAe/xd7EAJxYgEGDeO4j3EODp/cOCAE4sYMyJ5cwCHs4rCwI4sYBxJ5YzC84rCwKcXxArAuthQYDzC2JF0H49LAhwYUGsCFqvx5EF2T07dMaJBetx4cRyaqFtHJ8EIhK0i8OJBQxcECuCVutxJhCRoE0cZwMRyRcFefa/ffZBVPogePihhyCnbBhcfMFFEFM+DD4m+ghSlgmDkwlOgpAl4+BkkJMgZdk4+EgaSCcpVX7bmY9kgXQQU+1TgE0c+QJZUUz1b2T4SBbIKmJW+3iMj2SBVBWz+leVfCQLpIqYbp8b85EskIxyfIOfK5Sf+wiCRJEsllQ+oqEkQfBxmD8BBgA5hVjXyrBNUQAAAABJRU5ErkJggg==);
		background-size: 100% 100%;

		.num {
			width: 36upx;
			height: 36upx;
			border-radius: 50px;
			font-size: 24upx;
			color: #fff;
			text-align: center;
			line-height: 36upx;
		}

		.sign {
			position: absolute;
			top: 0;
			left: 50%;
			line-height: 36upx;
			font-size: 12upx;
			color: #fff;
			transform: translateX(-50%);
		}
	}

	/* 头部 轮播图 */
	.carousel-section {
		position: relative;

		padding: 20upx;
		padding-top: 20upx;

		.titleNview-placing {
			height: var(--status-bar-height);
			// padding-top: 44px;
			box-sizing: content-box;
			padding-top: 0;
			height: 0;
		}

		.titleNview-background {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 330upx;
			transition: 0.4s;
		}

		.carousel {
			.carousel-item {
				padding: 0;
			}
		}

		.swiper-dots {
			left: 45upx;
			bottom: 40upx;
		}
	}

	.new-item-box {
		margin-top:100rpx;
		background: #fff;

		padding: 20rpx;
		border-bottom: 10rpx solid #f6f6f6;

		.item-title {
			margin-bottom: 10rpx;
			float: left;
			width: 100%;
			height: 40rpx;
			line-height: 40rpx;
			font-size:$new-font-32;
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
				font-size: $new-font-30;
				color: #333333;
			}

			.right-title {
				font-size: 22rpx;
				float: right;
				color: #b7b7b7;
			}
		}

		.item-content {
			font-size: 26rpx;
			margin-left: 30rpx;

			.item-grey-color {
				color: #b7b7b7;
				font-size: 28rpx;
			}

			.txt {
				margin-top: 10rpx;
				display: flex;
				flex-flow: row nowrap;

				width: 100%;

				.t {
					color: #7b7b7b;
					text-align-last: justify;
					min-width: 25%;
					max-width: 25%;
				}

				.r {
					text-indent: 20rpx;
					flex: 1;
					overflow: hidden;
				}
			}
		}
	}

	.bottom-btn-box {
		position: fixed;
		bottom: 0upx;
		left: 0;
		background: #fff;
		// border-top: 1px solid #eee;
		max-height: 160upx;
		min-height: 160upx;
		width: 100%;

		// padding-top: 20upx;
		flex: 1;

		display: flex;
		margin: 0 auto;

		.left-btn {
			margin-top: 40upx;
			width: 90%;
			// flex: 1;

		}

		.linear-btn {
			color: #fff;
			background-image: linear-gradient(-45deg,
				#ec6434 0%,
				#ff8a4e 100%),
				linear-gradient(#e32417,
				#e32417);
		}


	}
</style>
