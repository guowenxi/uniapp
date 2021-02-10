<template>
	<view class="content no-padding">
		<view class="top-box">
			<view class="title-icon">
				<image 
				class="img"
				@click="selImg"
				:src="
				headImg ?  `${baseUrl}fyVolunteer/file/download/${headImg}` :
				  '/static/team_Head@2x.png'"
				 ></image>
				 <image class="icon" src="/static/img/team_Head_modify@2x.png"></image>
			</view>
		</view>
		
		<view class="cover-container">
			<view class="input-row border input-row-99">
				<view class="title input-title">团队名称</view>
				<m-input class="m-input " type="text" clearable focus v-model="name" placeholder="请输入团队名称"></m-input>
			</view>
			<view class="input-row border input-row-99">
				<view class="title input-title">团队人数</view>
				<m-input class="m-input " type="number" clearable focus v-model="teamNum" placeholder="请输入团队人数"></m-input>
			</view>
			<!-- <view class="input-row border input-row-99">
				<view class="title">团队名称</view>
				<m-input class="m-input" type="text"   v-model="name" placeholder="请输入团队名称"></m-input>
			</view>
			<view class="input-row border input-row-99">
				<view class="title">团队人数</view>
				<m-input class="m-input" type="number"   v-model="teamNum" placeholder="请输入团队人数"></m-input>
			</view> -->

		</view>
		
		<scroll-view scroll-y  class="scroll-bar">
			
		</scroll-view>
		<view class="bottom-side ">
			<button class=" btn new-bg-red" type="red" @click="addTeam">新增团队</button>
		</view>
	</view>
</template>

<script>
		import mInput from '../../components/m-input.vue'
	import listCellUser from '@/components/list-cell-user';
	
	import uniList from '@/components/uni-list/uni-list.vue'
	import uniListItemRight from '@/components/uni-list-item/uni-list-item-right.vue'
	
	export default {
		components: {
			listCellUser,
			uniList,
			uniListItemRight,
			mInput,
		},
		data() {
			return {
				baseUrl : getApp().globalData.baseUrl,
				rbacToken : getApp().globalData.rbacToken,
				name:"",
				teamNum:"",
				headImg:"",
				"regexp": /^[1-9]+[0-9]*$/,
				
			};
		},
		onLoad(){
			
		},
		methods:{
			//新增团队
			addTeam(){
				if(!this.regexp.test(this.teamNum)){
					uni.showToast({
						icon:'none',
						title: "请输入正确的团队人数"
					});
					return ; 
				}
				if(this.teamNum <5){
					uni.showToast({
						icon:'none',
						title: "团队人数不能小于5人"
					});
					return ; 
				}
				
				this.loadingState();
				this.$http.post('fyVolunteer/fySafeTeam/apply', {
								name:this.name,
								teamNum:this.teamNum,
								headImg:this.headImg,
								rbacToken: this.user.rbacToken,
							})
							.then(res => {
								uni.hideLoading()
								if (res.data.success == 1) {
									uni.showToast({
										icon:'none',
										title: "提交成功",
										complete:()=>{
											setTimeout(()=>{
												this.switchTabTo("/pages/user/user")
												// this.navigateBack(1)
											},1500)
										}
									});
								}else{
									uni.showToast({
										icon:'none',
										title: res.data.message
									});
								}
							})
			},
			selImg(){
				const _this = this;
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album','compressed'], //从相册选择
					success: function(res) {
						uni.uploadFile({
							url: _this.baseUrl + "fyVolunteer/fySafeTeam/changeImg",
							filePath: res.tempFilePaths[0],
							name: 'files',
							formData: {
								 rbacToken:_this.user.rbacToken,
							},
							success: (res) => {
								_this.headImg =JSON.parse(res.data).data;
								if(JSON.parse(res.data).success === 1){
									uni.showToast({
										icon:'none',
										title: "上传成功"
									});
								}else{
									uni.showToast({
										icon:'none',
										title: res.data.message
									});
								}
							}
						})
					}
				});
			},
			
			
		}
	}
</script>

<style lang="scss">

.input-row-99{
	// .title{
	// 	// border-right:1px solid #ccc;
	// 	height:57upx;
	// 	line-height:57upx;
	// 	font-size:30upx;
	// 	margin: 20upx 0 ;
	// 	text-align: center;
	// }
	// .m-input-view{
	// 	margin-left:35upx;
	// }
	.input-title{
		line-height: 98rpx;
		font-size:32upx;
		text-align: center;
	}
}
	.input-title{
		font-size:32upx;
	}
	.conten{
		background: #fff;
	}
	.uni-list{

		.uni-badge-success{
			background-color: #fff !important;
		}
	}
	.top-box{
		flex:1;
		
		width:100%;
		background: #fff;
		border-bottom:30upx solid #eee;
		max-height:360upx;
		min-height:360upx;
		.title {
			text-align: center;
			margin: 0 auto;
			margin-top: 20upx;
			font-size: 32upx;
		}
	}
	.cover-container{
		flex:1;
		max-height:288upx;
		min-height:288upx;
	}
	.scroll-bar{
		flex:1;
		height:0;
	}
	.bottom-side{
		background: #eee;
		flex:1;
		max-height:140upx;
		min-height:140upx;
		.btn{
			width:80%;
			margin-top:40upx;
		}
	}
	.list-item{
		float:left;
	}
	.title-icon {
		border-radius: 50%;
		display: block;
		width: 140upx;
		height: 140upx;
		margin: 0 auto;
		margin-top: 50upx;
		position:relative;
		.img{
			border-radius: 50%;
			width:100%;
			height:100%;
			position: absolute;
			left:0;
			top:0;
		}
		.icon{
			width:40upx;
			height:40upx;
			position: absolute;
			right:0;
			bottom:0;
		}

		
	}


	.sub-text {
		margin: 0 60upx;
		margin-top: 45upx;
		margin-bottom:35upx;
	}

	.bottom-bg-button {
		bottom: 400upx;
	}
	.create-time{
		
		font-size: 24upx !important;
		color:#bfbfbf;
	}
</style>
