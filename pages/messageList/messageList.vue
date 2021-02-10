<template>
	<view>
		<!-- <view class="content" @touchstart="hideDrawer"> -->
		<view class="content" >
			<scroll-view class="msg-list" scroll-y="true" :scroll-with-animation="scrollAnimation" :scroll-top="scrollTop"
			 :scroll-into-view="scrollToView" @scrolltoupper="loadHistory" upper-threshold="50">

				<view class="row" v-for="(row,index) in msgList" :key="index" >
					<!-- 系统消息 -->
<!-- 					<block v-if="row.type=='system'">
						<view class="system">
	
							<view v-if="row.msg.type=='text'" class="text">
								{{row.msg.content.text}}
							</view>
						</view>
					</block> -->
					<!-- 用户消息 -->
					<block >
						<!-- 别人发出的消息 -->
						<view class="other">
							<!-- 左-头像 -->
							<view class="left">
								<image src="/static/img/alliance_icon@2x.png"></image>
							</view>
							<!-- 右-用户名称-时间-消息 -->
							<view class="right">
								<view class="username">
									<view class="name">{{row.createUserName}}</view>
									<view class="time">{{row.createTime.split(" ")[1]}}</view>
								</view>
								<!-- 文字消息 -->
								<view class="bubble">
									<rich-text :nodes="row.content"></rich-text>
								</view>
								<!-- 图片消息 -->
<!-- 								<view v-if="row.msg.type=='img'" class="bubble img" @tap="showPic(row.msg)">
									<image :src="row.msg.content.url" :style="{'width': row.msg.content.w+'px','height': row.msg.content.h+'px'}"></image>
								</view> -->

							</view>
						</view>

					</block>
				</view>
			</scroll-view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				groupId:"",
				//文字消息
				textMsg: '',
				//消息列表
				isHistoryLoading: false,
				scrollAnimation: false,
				scrollTop: 0,
				scrollToView: '',
				msgList: [],
				msgImgList: [],
				myuid: 0,


			};
		},
		onLoad(option) {
			
			this.groupId = this.selListItem.id;
			// this.groupId = "8e8f570954444500bf7a9f3824bb3fe2";
			
			this.getList();
		},
		onShow() {
			this.scrollTop = 9999999;
		},
		methods: {

			getList(){
				this.$http.get('fyVolunteer/fySafeMessage/getList', {
					groupId:this.groupId,
					pageNo:'1',
					pageSize:'20',
					rbacToken:this.user.rbacToken
					})
					.then(res => {
						if (res.data.success == 1) {
							this.msgList = res.data.data.list;
				// 获取消息中的图片,并处理显示尺寸
				// for (let i = 0; i < list.length; i++) {
				// 	if (list[i].type == 'user' && list[i].msg.type == "img") {
				// 		list[i].msg.content = this.setPicSize(list[i].msg.content);
				// 		this.msgImgList.push(list[i].msg.content.url);
				// 	}
				// }
				// this.msgList = list;
				// 滚动到底部
				this.$nextTick(function() {
					//进入页面滚动到底部
					this.scrollTop = 9999;
					this.$nextTick(function() {
						this.scrollAnimation = true;
					});

				});
						} else {
							uni.showToast({
								mask:true,
								icon: 'none',
								title: res.data.message
							});
						}
						
					})
			},
			//触发滑动到顶部(加载历史信息记录)
			loadHistory(e) {
				if (this.isHistoryLoading) {
					return;
				}
				this.isHistoryLoading = true; //参数作为进入请求标识，防止重复请求
				this.scrollAnimation = false; //关闭滑动动画
				let Viewid = this.msgList[0].msg.id; //记住第一个信息ID
				//本地模拟请求历史记录效果
				setTimeout(() => {
					// 消息列表
					let list = [{
							type: "user",
							msg: {
								id: 1,
								type: "text",
								time: "12:56",
								userinfo: {
									uid: 0,
									username: "大黑哥",
									face: "/static/img/face.jpg"
								},
								content: {
									text: "为什么温度会相差那么大？"
								}
							}
						},
						{
							type: "user",
							msg: {
								id: 2,
								type: "text",
								time: "12:57",
								userinfo: {
									uid: 1,
									username: "售后客服008",
									face: "/static/img/im/face/face_2.jpg"
								},
								content: {
									text: "这个是有偏差的，两个温度相差十几二十度是很正常的，如果相差五十度，那即是质量问题了。"
								}
							}
						},
						{
							type: "user",
							msg: {
								id: 3,
								type: "voice",
								time: "12:59",
								userinfo: {
									uid: 1,
									username: "售后客服008",
									face: "/static/img/im/face/face_2.jpg"
								},
								content: {
									url: "/static/voice/1.mp3",
									length: "00:06"
								}
							}
						},
						{
							type: "user",
							msg: {
								id: 4,
								type: "voice",
								time: "13:05",
								userinfo: {
									uid: 0,
									username: "大黑哥",
									face: "/static/img/face.jpg"
								},
								content: {
									url: "/static/voice/2.mp3",
									length: "00:06"
								}
							}
						},
					]
					// 获取消息中的图片,并处理显示尺寸
					for (let i = 0; i < list.length; i++) {
						if (list[i].type == 'user' && list[i].msg.type == "img") {
							list[i].msg.content = this.setPicSize(list[i].msg.content);
							this.msgImgList.unshift(list[i].msg.content.url);
						}
						list[i].msg.id = Math.floor(Math.random() * 1000 + 1);
						this.msgList.unshift(list[i]);
					}

					//这段代码很重要，不然每次加载历史数据都会跳到顶部
					this.$nextTick(function() {
						this.scrollToView = 'msg' + Viewid; //跳转上次的第一行信息位置
						this.$nextTick(function() {
							this.scrollAnimation = true; //恢复滚动动画
						});

					});
					this.isHistoryLoading = false;

				}, 1000)
			},
			// 加载初始页面消息
			getMsgList() {
				// 消息列表
				let list = [{
						type: "system",
						msg: {
							id: 0,
							type: "text",
							content: {
								text: "欢迎进入HM-chat聊天室"
							}
						}
					},
					{
						type: "user",
						msg: {
							id: 1,
							type: "text",
							time: "12:56",
							userinfo: {
								uid: 0,
								username: "大黑哥",
								face: "/static/img/face.jpg"
							},
							content: {
								text: "为什么温度会相差那么大？"
							}
						}
					},
					{
						type: "user",
						msg: {
							id: 2,
							type: "text",
							time: "12:57",
							userinfo: {
								uid: 1,
								username: "售后客服008",
								face: "/static/img/im/face/face_2.jpg"
							},
							content: {
								text: "这个是有偏差的，两个温度相差十几二十度是很正常的，如果相差五十度，那即是质量问题了。"
							}
						}
					},
					{
						type: "user",
						msg: {
							id: 3,
							type: "voice",
							time: "12:59",
							userinfo: {
								uid: 1,
								username: "售后客服008",
								face: "/static/img/im/face/face_2.jpg"
							},
							content: {
								url: "/static/voice/1.mp3",
								length: "00:06"
							}
						}
					},
					{
						type: "user",
						msg: {
							id: 4,
							type: "voice",
							time: "13:05",
							userinfo: {
								uid: 0,
								username: "大黑哥",
								face: "/static/img/face.jpg"
							},
							content: {
								url: "/static/voice/2.mp3",
								length: "00:06"
							}
						}
					},
					{
						type: "user",
						msg: {
							id: 5,
							type: "img",
							time: "13:05",
							userinfo: {
								uid: 0,
								username: "大黑哥",
								face: "/static/img/face.jpg"
							},
							content: {
								url: "/static/img/p10.jpg",
								w: 200,
								h: 200
							}
						}
					},
					{
						type: "user",
						msg: {
							id: 6,
							type: "img",
							time: "12:59",
							userinfo: {
								uid: 1,
								username: "售后客服008",
								face: "/static/img/im/face/face_2.jpg"
							},
							content: {
								url: "/static/img/q.jpg",
								w: 1920,
								h: 1080
							}
						}
					},
					{
						type: "system",
						msg: {
							id: 7,
							type: "text",
							content: {
								text: "欢迎进入HM-chat聊天室"
							}
						}
					},

					{
						type: "system",
						msg: {
							id: 9,
							type: "redEnvelope",
							content: {
								text: "售后客服008领取了你的红包"
							}
						}
					},
					{
						type: "user",
						msg: {
							id: 10,
							type: "redEnvelope",
							time: "12:56",
							userinfo: {
								uid: 0,
								username: "大黑哥",
								face: "/static/img/face.jpg"
							},
							content: {
								blessing: "恭喜发财，大吉大利，万事如意",
								rid: 0,
								isReceived: false
							}
						}
					},
					{
						type: "user",
						msg: {
							id: 11,
							type: "redEnvelope",
							time: "12:56",
							userinfo: {
								uid: 1,
								username: "售后客服008",
								face: "/static/img/im/face/face_2.jpg"
							},
							content: {
								blessing: "恭喜发财",
								rid: 1,
								isReceived: false
							}
						}
					},
				]
				// 获取消息中的图片,并处理显示尺寸
				for (let i = 0; i < list.length; i++) {
					if (list[i].type == 'user' && list[i].msg.type == "img") {
						list[i].msg.content = this.setPicSize(list[i].msg.content);
						this.msgImgList.push(list[i].msg.content.url);
					}
				}
				this.msgList = list;
				// 滚动到底部
				this.$nextTick(function() {
					//进入页面滚动到底部
					this.scrollTop = 9999;
					this.$nextTick(function() {
						this.scrollAnimation = true;
					});

				});
			},
			//处理图片尺寸，如果不处理宽高，新进入页面加载图片时候会闪
			setPicSize(content) {
				// 让图片最长边等于设置的最大长度，短边等比例缩小，图片控件真实改变，区别于aspectFit方式。
				let maxW = uni.upx2px(350); //350是定义消息图片最大宽度
				let maxH = uni.upx2px(350); //350是定义消息图片最大高度
				if (content.w > maxW || content.h > maxH) {
					let scale = content.w / content.h;
					content.w = scale > 1 ? maxW : maxH * scale;
					content.h = scale > 1 ? maxW / scale : maxH;
				}
				return content;
			},

			// 预览图片
			showPic(msg) {
				uni.previewImage({
					indicator: "none",
					current: msg.content.url,
					urls: this.msgImgList
				});
			},

		},
		onNavigationBarButtonTap(e) {
			uni.navigateTo({
				url: '/pages/messageDetail/messageDetail'
			})
		}
	}
</script>


<style lang="scss">
	.msg-list {
		width: 96%;
		padding: 0 2%;
		position: absolute;
		top: 0;
		bottom: 100upx;

		.loading {
			//loading动画
			display: flex;
			justify-content: center;

			@keyframes stretchdelay {

				0%,
				40%,
				100% {
					transform: scaleY(0.6);
				}

				20% {
					transform: scaleY(1.0);
				}
			}

			.spinner {
				margin: 20upx 0;
				width: 60upx;
				height: 100upx;
				display: flex;
				align-items: center;
				justify-content: space-between;

				view {
					background-color: #f06c7a;
					height: 50upx;
					width: 6upx;
					border-radius: 6upx;
					animation: stretchdelay 1.2s infinite ease-in-out;
				}

				.rect2 {
					animation-delay: -1.1s;
				}

				.rect3 {
					animation-delay: -1.0s;
				}

				.rect4 {
					animation-delay: -0.9s;
				}

				.rect5 {
					animation-delay: -0.8s;
				}
			}
		}

		.row {
			.system {
				display: flex;
				justify-content: center;

				view {
					padding: 0 30upx;
					height: 50upx;
					display: flex;
					justify-content: center;
					align-items: center;
					background-color: #c9c9c9;
					color: #fff;
					font-size: 24upx;
					border-radius: 40upx;
				}

				.red-envelope {
					image {
						margin-right: 5upx;
						width: 30upx;
						height: 30upx;
					}
				}
			}

			&:first-child {
				margin-top: 20upx;
			}

			padding: 20upx 0;

			.my .left,
			.other .right {
				width: 100%;
				display: flex;

				.bubble {
					max-width: 70%;
					min-height: 50upx;
					border-radius: 10upx;
					padding: 15upx 20upx;
					display: flex;
					align-items: center;
					font-size: 32upx;
					word-break: break-word;

					&.img {
						background-color: transparent;
						padding: 0;
						overflow: hidden;

						image {
							max-width: 350upx;
							max-height: 350upx;
						}
					}

					&.red-envelope {
						background-color: transparent;
						padding: 0;
						overflow: hidden;
						position: relative;
						justify-content: center;
						align-items: flex-start;

						image {
							width: 250upx;
							height: 313upx;
						}

						.tis {
							position: absolute;
							top: 6%;
							font-size: 26upx;
							color: #9c1712;
						}

						.blessing {
							position: absolute;
							bottom: 14%;
							color: #e9b874;
							width: 80%;
							text-align: center;
							overflow: hidden;
							// 最多两行
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 2;
						}
					}

					&.voice {
						.icon {
							font-size: 40upx;
							display: flex;
							align-items: center;
						}

						.icon:after {
							content: " ";
							width: 53upx;
							height: 53upx;
							border-radius: 100%;
							position: absolute;
							box-sizing: border-box;
						}

						.length {
							font-size: 28upx;
						}
					}
				}
			}

			.my .right,
			.other .left {
				flex-shrink: 0;
				width: 80upx;
				height: 80upx;

				image {
					width: 80upx;
					height: 80upx;
					border-radius: 10upx;
				}
			}

			.my {
				width: 100%;
				display: flex;
				justify-content: flex-end;

				.left {
					min-height: 80upx;

					align-items: center;
					justify-content: flex-end;

					.bubble {
						background-color: #f06c7a;
						color: #fff;

						&.voice {
							.icon {
								color: #fff;
							}

							.length {
								margin-right: 20upx;
							}
						}

						&.play {
							@keyframes my-play {
								0% {
									transform: translateX(80%);
								}

								100% {
									transform: translateX(0%);
								}
							}

							.icon:after {
								border-left: solid 10upx rgba(240, 108, 122, .5);
								animation: my-play 1s linear infinite;
							}
						}
					}
				}

				.right {
					margin-left: 15upx;
				}
			}

			.other {
				width: 100%;
				display: flex;

				.left {
					margin-right: 15upx;
				}

				.right {
					flex-wrap: wrap;

					.username {
						width: 100%;
						height: 45upx;
						font-size: 24upx;
						color: #999;
						display: flex;

						.name {
							margin-right: 50upx;
						}
					}

					.bubble {
						background-color: #fff;
						color: #333;

						&.voice {
							.icon {
								color: #333;

							}

							.length {
								margin-left: 20upx;
							}
						}

						&.play {
							@keyframes other-play {
								0% {
									transform: translateX(-80%);
								}

								100% {
									transform: translateX(0%);
								}
							}

							.icon:after {
								border-right: solid 10upx rgba(255, 255, 255, .8);

								animation: other-play 1s linear infinite;
							}
						}
					}
				}
			}
		}
	}
</style>
