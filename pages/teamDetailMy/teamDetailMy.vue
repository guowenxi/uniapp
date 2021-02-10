<template>
	<view class="content no-padding">
		<scroll-view scroll-y  class="scroll-bar" >
		<view class="top-box">
			<view class="title-icon"  @click="changeName()">
				<image 
				class="img"
				:src="
				headImg ?  `${baseUrl}fyVolunteer/file/download/${headImg}` :
				 '/static/team_Head@2x.png'"
				 ></image>
				 <image class="icon" v-if="isHead == 1" src="/static/img/team_Head_modify@2x.png"></image>
			</view>
<!-- @click="selImg" -->

			<view class="title team-title">{{name}}</view>
			<!-- <view class=" title create-time">创建于{{createTime}}</view> -->
			<!-- <view class="sub-text">群简介:{{info.content}}</view> -->
			
			<view class="tj-sction">
				<view class="tj-item " @click="navToAndSaveItem('1','/pages/record/record')">
					<text class="num color-333">0</text>
					<text class="title color-666">团队荣誉值</text>
					
				</view>
				<view class="tj-item" @click="navToAndSaveItem('3','/pages/record/record')">
					<text class="num color-333">0</text>
					<text class="title color-666">团队排名</text>
					
				</view>
				<view class="tj-item " @click="navToAndSaveItem('2','/pages/record/record')">
					<text class="num color-333">0</text>
					<text class="title color-666">任务完成率</text>
					
				</view>
			</view>
			
		</view>
		
		
		<view class="cover-container cover-img-box" @click="navToAndSaveItem(item,'/pages/teamDetailPeople/teamDetailPeople')">
			<view class="title">团队成员<text>({{list.length+'/'+teamNum}})</text></view>
			<view class="cover-img">
				<view class="cover-img-item"  v-for="(item, index) in list">
					<!-- <view class=""></view> -->
					<view class="img-wrap">
									<image class="img" :src="item.img != '' ? `${baseUrl}fyVolunteer/file/download/${item.headImg}?rbacToken=${rbacToken}` : '/static/team_Head@2x.png'" />
					</view>
					
					<image v-if="index== 0 " class="icon" src="/static/_new_user/star@2x.png"></image>
				</view>
			</view>
			<view class="uni-list-cell__extra" >
				<uni-icon  color="#bbb" size="20" type="arrowright"></uni-icon>
			</view>
		</view>
		<view class="cover-container">
			
			<uni-list>
<!-- 				<uni-list-item-right  title="团队名称"
				 @click="changeName()"
				 :team-name="name"
				 ></uni-list-item-right> -->
				 <uni-list-item-right  title="团队任务"
				 @click="navToAndSaveItem(item,'/pages/missonTeamListMy/missonTeamListMy')"
				 ></uni-list-item-right>
				<uni-list-item-right  title="团队二维码" 
				@click="navToAndSaveItem(item,'/pages/teamDetailMa/teamDetailMa')"
				></uni-list-item-right>

				<uni-list-item-right  title="申请列表"
				:redIcon= "hasNewApply == 1 ?  'true' : 'false' "
				 @click="navToAndSaveItem(item,'/pages/teamDetailSQ/teamDetailSQ')"
				 ></uni-list-item-right>
<!-- 				<uni-list-item-right  :title="`团队成员 (${list.length+'/'+teamNum})`"
				@click="showTeam()"
				></uni-list-item-right> -->

				<!-- @click="navTo('/pages/teamDetailPeople/teamDetailPeople')" -->
			</uni-list>

		</view>
		
<!-- 		<scroll-view scroll-y  class="scroll-bar">
			
			<list-cell-user v-for="(item, index) in list" 
				:item = "item"
			></list-cell-user>
		</scroll-view> -->
		
		<view  v-if="showTeamState ? true : false">
			<list-cell-user v-for="(item, index) in list"
				:item = "item"
			></list-cell-user>
		</view>

		</scroll-view>
		<view class="bottom-side">
			<button class=" btn new-bg-red" type="red" @click="cancelTeamBtn">退出团队</button>
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
				hasNewApply:0,
				showTeamState:false,
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
		onShow(){
			
			this.getUserByTeamId();
		},
		methods:{
			//修改团队名称
			changeName(){
				if(this.isHead == 0){
					return ;
				}
				this.navToAndSaveItem(this.item,'/pages/teamDetailName/teamDetailName')
			},
			//显示团队
			showTeam(){
				this.showTeamState= !this.showTeamState;
			},
			//确定按钮
			cancelTeamBtn(){
				uni.showModal({
					title: '提示',
					content: '是否退出当前团队?',
					// confirmColor:"#",
					success:  (res)=> {
						if (res.confirm) {
							console.log('用户点击确定');
							this.cancelTeam();
							
						} else if (res.cancel) {
							// this.popMission("2");
							console.log('用户点击取消');
						}
					}
				});	
			},
			//退出团队
			cancelTeam(){
				this.$http.get('fyVolunteer/apply/exit', {
								teamId:	this.item.teamId,
								rbacToken: this.user.rbacToken,
							})
							.then(res => {
								if (res.data.success == 1) {
									uni.showToast({
										icon:'none',
										title: "您已成功退出团队",
										complete:()=>{
											setTimeout(()=>{
												this.switchTabTo("/pages/index/index")
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
				if(this.isHead == 0){
					return ;
				}
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
							this.isHead = res.data.data.isHead;
							this.hasNewApply = res.data.data.hasNewApply;
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
	.cover-img-box{
		padding: 24rpx 30rpx;
		.uni-list-cell__extra{
			position: absolute;
			right:50rpx;
			top:50%;
			transform: translateY(-50%);
		}
	}
	.cover-img{
		width: 100%;
		height:80rpx;
		margin-top: 16rpx;
		.cover-img-item{
			
			margin-right: 16rpx;
			
			width: 80rpx;
			height: 80rpx;
			
			float:left;
			position: relative;
			.icon{
				width: 30rpx;
				height: 27rpx;
				position: absolute;
				bottom:0;
				right:0;
				z-index:100;
			}
			.img-wrap{
				background-color: #efefef;
				overflow: hidden;
				border-radius: 50%;
				width: 80rpx;
				height: 80rpx;
				.img{
					width: 100%;
					height:100%;
				}
			}

		}
	}
	%flex-center {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.tj-sction {
		margin-top: 10rpx;
		flex: 1;
		color: #fff;
		position: relative;
		display: flex;
		justify-content: space-around;
		align-content: center;
		border-radius: 10upx;
		padding:10rpx 34rpx 0;
		.tj-item {
			position: relative;
			@extend %flex-center;
			flex-direction: column;
			font-size: $font-sm;
		}

		.title {
			font-size:$new-font-28;
			margin-bottom: 35upx;
		}

		.num {
			font-size: $new-font-40;
			/* margin-bottom: 35upx; */
		}
	}

.team-title{
	margin-top: 20rpx;
	font-size: $new-font-36;
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
		// max-height:384upx;
		// min-height:384upx;
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
