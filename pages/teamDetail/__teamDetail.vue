<template>
	<view class="content no-padding">
		<view class="top-box">
			<view class="title-icon">
				<image 
				class="img"
				:src="
				item.headImg ?  `${baseUrl}fyVolunteer/file/download/${item.headImg}` :
				 '../../static/img/alliance_icon@2x.png'"
				 ></image>
				 <!-- <image class="icon" src="/static/img/team_Head_modify@2x.png"></image> -->
			</view>

			<view class="title">{{item.name}}</view>
			<view class=" title create-time">创建于{{item.createTime}}</view>
			<!-- <view class="sub-text">群简介:{{info.content}}</view> -->
		</view>
		
		<view class="cover-container">
			
			<uni-list>

<!-- 				<uni-list-item-right  title="团队名称"
				 @click="navTo('/pages/teamDetailName/teamDetailName')"
				 :team-name="item.name"
				 ></uni-list-item-right>
				<uni-list-item-right  title="团队二维码" 
				@click="navToAndSaveItem(item,'/pages/teamDetailMa/teamDetailMa')"
				></uni-list-item-right> -->
				<uni-list-item-right  :title="`团队成员 (${item.teamCount+'/'+item.teamNum})`"
				></uni-list-item-right>
				<!-- @click="navTo('/pages/teamDetailPeople/teamDetailPeople')" -->
			</uni-list>

		</view>
		
		<scroll-view scroll-y  class="scroll-bar">
			
			<list-cell-user v-for="(item, index) in item.list" 
				:item = "item"
			></list-cell-user>
		</scroll-view>
		<view class="bottom-side">
			<button class=" btn"  type="white-border" @click="addTeam"   :class="item.isApply == 1 ?  '' : 'red-btn' " >申请加入</button>
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
				createTime:"",
				teamNum:"",
				teamName:"",
				item:[],
				headImg:"",
				name:"",
				list: [
						  
						],
			};
		},
		onLoad(){
			debugger
			this.item = this.selListItem;
		},
		methods:{
			//加入团队
			addTeam(){
				this.$http.get('fyVolunteer/apply/team', {
								teamId:	this.item.id,
								rbacToken: this.user.rbacToken,
							})
							.then(res => {
								if (res.data.success == 1) {
									uni.showToast({
										icon:'none',
										title: "您已成功申请团队,",
										complete:()=>{
											setTimeout(()=>{
												this.navigateBack(1)
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
			
			changeTeamName(){
				
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
			
			getUserByTeamId(){
				this.$http.get('fyVolunteer/fySafeTeam/getUserByTeamId', {
						rbacToken: this.user.rbacToken,
					})
					.then(res => {
						if (res.data.success == 1) {
							this.item = res.data.data;
							this.headImg = res.data.data.headImg;
							this.createTime = res.data.data.createTime;
							this.name = res.data.data.name;
							this.list = res.data.data.list;
							this.teamNum = res.data.data.teamNum;
						}else{
							uni.showToast({
								icon:'none',
								title: res.data.message
							});
						}
					})
					
			}
		}
	}
</script>

<style lang="scss">

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
		max-height:96upx;
		min-height:96upx;
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
	.red-btn{
		background: #e32417;
		color:#fff;
	}
</style>
