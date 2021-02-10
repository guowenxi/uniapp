<template>
	<web-view :src="httpUrl">
		
	
	</web-view>
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
				httpUrl:"",
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
			// this.httpUrl = `http://www.baidu.com`;
			this.httpUrl = this.selListItem.linkRecord ;
			this.info.videoId !="" ? this.videoUrl = `${this.baseUrl}${JSON.parse(this.info.videoId).video} ` : this.videoUrl = "";
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
