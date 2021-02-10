<template>
	<view class="content">
		
		<view class="title">{{info.title}}</view>
		<view class="middle-title">
			<text class="text">发布时间:{{info.createTime}}</text>
		</view>
<!-- 		<view class="sub-title">
				<text class="text" style="margin-left:0;">领域:{{info.departName}}</text>
				<text class="text">类型:{{info.formatName}}</text>
		</view> -->
		<!-- <video class="video-item" v-show="info.videoUrl" @waiting="showWaiting" @error="showError" src="http://192.168.1.154:8090/123.mp4"></video> -->
		<view>
			<video class="video-item" v-if="videoUrl !='' " :src="
			videoUrl !='' ? videoUrl : null
			
			"></video>
		</view>
		

		<rich-text :class="videoUrl !='' ? 'top-content' : '' " class="content-box" :nodes="descr"></rich-text>

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
				 
				 
<!-- 		 <view class="bottom-btn-box">
			<button class="bottom-float-button left-btn" type="red-border" @click="checkLike">
				{{likeState ? '取消关注' : '关注'}}
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
				videoUrl:"",
				likeState: false,
				baseUrl : getApp().globalData.baseUrl,
				rbacToken : getApp().globalData.rbacToken,
				info:{
					videoId:""
				},
				commentList:[],
				descr:""
			};
		},
		onLoad(){

			this.info = this.selListItem;
			this.info.videoId !="" ? this.videoUrl = `${this.baseUrl}${JSON.parse(this.info.videoId).video} ` : this.videoUrl = "";
			this.loadData();
		},
		methods:{
			loadData(){
				this.$http.get('fyTaskManage/fyBanners/getFyBanner', {
					rbacToken: this.user.rbacToken,
						id: this.info.id
					})
					.then(res => {
						if (res.data.success == 1) {							
							this.descr = res.data.data.descr;
						} else {
							uni.showToast({
								icon: 'none',
								title: res.data.message
							});
						}
							
					})
			},
			showWaiting(e){
				debugger
			},
			showError(e){
				debugger
				
				console.log(e);
				
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
		margin-top:20upx;
		text-align: center;
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
		text-align: center;
		width:100%;
		font-size:40upx;
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
		position: fixed;
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
	

</style>
