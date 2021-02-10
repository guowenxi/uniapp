<template>
	<view class="content no-padding">
		<view style="padding:30rpx 30rpx 0;">
			<view class="title">{{info.title}}</view>
					<view class="middle-title">
						<text class="text" style="margin-right:30rpx;">{{info.departName}}</text>
						<text class="text">{{info.createTime}}</text>
					</view>
		<!-- 			<view class="sub-title">
							<text class="text" style="margin-left:0;">领域:{{info.departName}}</text>
							<text class="text">类型:{{info.formatName}}</text>
					</view> -->
					<!-- <video class="video-item" v-show="info.videoUrl" @waiting="showWaiting" @error="showError" src="http://192.168.1.154:8090/123.mp4"></video> -->
					
					<view>
						<video class="video-item"
						 v-if="info.videoUrl" 
						 @waiting="showWaiting" 
						 @error="showError" 
						 :src="videoUrl"
						 ></video>
					</view>
			
					<rich-text :class="info.videoUrl ? 'top-content' : '' " class="content-box" :nodes="content"></rich-text>
					
					<view class="cell-tit clamp">
						<view class='title title-3'>
							<view class="sub-item">
								<image class="icon" src="/static/img/study_heat@2x.png"></image>
								<text class="mall-po">{{info.hitNum < 0 ? '0' : info.hitNum}}</text>
							</view>
							<view class="sub-item">
								<image class="icon" 
								:src="isLike ?  `/static/img/study_agree_R@2x.png` : `/static/img/Learn_like@2x.png`"></image>
								<text class="mall-po">{{info.likeNum < 0 ? '0' : info.likeNum}}</text>
							</view>
						</view>
					</view>
					<view style="width: 100%;height:80rpx;"></view>
								
			
			<!-- 		<view>
						<button class="bottom-bg-button" type="red-border"  @click="checkLike">{{likeState ? '取消关注' : '关注'}}</button>
					</view> -->
			<!-- 		<view class="comment">
						<left-line-title 
						 title="评论"
						 ></left-line-title>
						 <list-cell-comment 
						  v-for="(item,index) in commentList" 
						  :item="item"></list-cell-comment>
					</view>
					<view class="comment-box">
						<input
						 class="uni-input"
						 @input="onKeyInput" 
						 placeholder="请输入评论" />
						<view 
						class="right-btn"
						  @click="submit()">评论</view>
					</view>
							 -->
		</view>
		
				 
				 <view style="height:100rpx;"></view>
				 <view class="btn-row bottom-btn-box">
				 	<button
				 	class="bottom-float-button left-btn " 
				 	type="red-border" 
				 	 @click="checkLike">{{likeState ? '取消关注' : '关注'}}</button>
				 	
				 	<button
				 	class="bottom-float-button new-button-color" 
				 	type="red" 
					@click="like"
				 	>{{isLike ? '取消点赞' : '点赞'}}</button>	
				 	
				 </view>
				 


		 
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
				isLike:false,
				videoUrl:"",
				likeState: false,
				baseUrl : getApp().globalData.baseUrl,
				rbacToken : getApp().globalData.rbacToken,
				info:[],
				commentList:[],
				content:"",
			};
		},
		onLoad(){
			this.info = this.selListItem;
			this.isLike = this.selListItem.isLike;
			this.videoUrl = `${this.baseUrl}${this.info.videoUrl}`;
			
			
			
			this.getCommentList();
			this.ContentById();
		},
		methods:{
			showWaiting(e){
				
			},
			showError(e){

				
				console.log(e);
				
			},
			//关注 不关注
			checkLike() {
				this.loadingState();
				//fyVolunteer/fySafeUserTask/insert
				this.$http.get('fyVolunteer/fySafeUserTask/insert', {
						taskId: this.info.id,
						rbacToken: this.user.rbacToken,
						type:2,
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
			
			//
			like() {
				this.loadingState();
				//fyVolunteer/fySafeUserTask/insert
				this.$http.get('fyPeaceStudy/fySafeStudy/like', {
						id: this.info.id,
						rbacToken: this.user.rbacToken,
						type:2,
					})
					.then(res => {
						uni.hideLoading()
						if (res.data.success == 1) {
							let text = "";
							if (res.data.data == 1) {
								text = "点赞成功!"
								this.info.likeNum = this.info.likeNum +1;
								this.isLike = true;
							} else {
								this.info.likeNum = this.info.likeNum -1;
								this.isLike = false;
								text = "已取消点赞!"
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
			
			
			ContentById() {
				this.$http.get('fyPeaceStudy/fySafeStudy/ContentById', {
						id: this.info.id,
						rbacToken:this.user.rbacToken
					})
					.then(res => {
						if (res.data.success == 1) {
							this.content = res.data.data.content;
							this.isLike = res.data.data.isLike;
							this.likeState  =  res.data.data.isAttention  == 1 ? true : false;
						} else {
							uni.showToast({
								icon: 'none',
								title: res.data.message
							});
						}
			
					})
			},
			getCommentList() {
				this.$http.get('fyPeaceStudy/fySafeStudy/getCommentList', {
						id: this.info.id,
						rbacToken: this.user.rbacToken,
					})
					.then(res => {
						if (res.data.success == 1) {
							this.commentList = res.data.data.list;
							
							// this.likeState  = res.data.data.isAttention  == 1 ? true : false;
							
						} else {
							uni.showToast({
								icon: 'none',
								title: res.data.message
							});
						}
					})
			},
			onKeyInput(e){
				this.content = e.target.value;
			},
			submit() {
				if(this.content == ""){
					return ;
				}
				this.$http.post('fyPeaceStudy/fySafeStudy/comment', {
						content:this.content,
						studyId: this.info.id,
						rbacToken: this.user.rbacToken,
					})
					.then(res => {
						if (res.data.success == 1) {
							uni.showToast({
								icon: 'none',
								title: "评论成功"
							});
							this.getCommentList();
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

	.content{
		font-size:$font-base;
	}
	.middle-title{
		color:#a4a4a4;
		margin:32upx 0 60rpx;
		text-align: left;
	}
	.sub-title{
		color:#a4a4a4;
		width:100%;
		float:left;
		height:50upx;
		margin-top:20upx;
		margin-bottom:60upx;
		
		.text{
			float:left;
		}
		.text:last-child{
			float:right;
		}
	}
	
	.content{
		display: flex;
		flex-flow:column nowrap;
		overflow: hidden;
	}
	
	// .top-content{
	// 	position:relative;
	// 	top:400upx;
	// }
	.history-section{
		flex:1;
	}
	.title{
		text-align: left;
		width:100%;
		font-size:$new-font-36;
		line-height: $line-height-40;
		// margin:20upx;
		// margin-bottom:40upx;
	}
	.video-item{
		margin-bottom:20upx;
		width:100%;
		height:400upx;
	}
	.comment{
		padding:20upx;
	}
	.content-box{
		font-size:28upx;
		line-height:40upx;
		img{
			width:100%;
			height:auto;
		}
		image{
			width:100%;
			height:auto;
		}
	}
	.comment-box{
		display: flex;
		flex-flow: row nowrap;
		position: absolute;
		bottom:0;
		width:100%;
		height:80upx;
		background: #eee;
		padding:10upx;
		.uni-input{
			flex:1;
			background: #fff;
			height:60upx;
			line-height:60upx;
			margin:0 30upx;
			padding:0 15upx;
		}
		.right-btn{
			flex:1;
			max-width:20%;
			min-width:20%;
			text-align: center;
			line-height:60upx;
		}
	}
	
.bottom-btn-box {
		z-index:300;
		position: fixed;
		bottom: 0;
		width: 100%;
		background: #f6f6f6;
		// max-height: 100upx;
		// min-height: 100upx;
		padding-top: 20upx;
		flex: 1;
		display: flex;
	.bottom-float-button{
		float: inherit;
		width:80%;
		margin:0 auto;
		margin-bottom:20upx;
	}
	
		.left-btn {
			margin-right: 30upx;
	

		}
	
		.right-btn {
	
			max-width: 60%;
			min-width: 60%;
			flex: 1;
		}
	}
		.cell-tit {
			margin-top: 50rpx;
			flex:1;
			line-height: 30upx;
			.mall-po {
				
				width:100%;
				float:left;
				margin-left:40upx;
				
			}



			.title {}

			.title-1 {
				min-height:56upx;
				white-space:pre-wrap;
				/* margin-bottom:22upx; */
				font-size: $font-title;
				line-height:$line-height-40;
			}

			.title-2 {
				color:#333;
				font-size: $new-font-30;
				white-space:pre-wrap;
				line-height:$line-height-40;

				.mall-po{
					min-height: 80rpx;
				}
			}

			.title-3 {
				width: 100%;
				color: #909399;
				font-size: 22upx;
				display: flex;
				flex-flow: row nowrap;
				.sub-item{
					height:40upx;
					line-height:40upx;
					margin-right:40rpx;
					position: relative;
					.icon{
						position: absolute;
						top:50%;
						transform: translateY(-50%);
						width: 30upx;
						height: 30upx;
					}
				}
			}

			flex: 1;
			font-size: $font-base;
			color: $font-color-dark;
			margin-right: 10upx;
			margin-left: 15upx;
			
		}
		
</style>
