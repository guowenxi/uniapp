<template>
	<view class="content no-padding">
		<view class="top-box">
					<view class="title-icon" @click="selImg">
						<view class="img-box">
							<image
							class="img"

							:src="
							headImg ?  `${baseUrl}fyVolunteer/file/download/${headImg}` :
							 '/static/team_Head@2x.png'"
							 ></image>
						</view>
						 <image class="icon" src="/static/img/team_Head_modify@2x.png"></image>
					</view>
				</view>
				
		<view class="input-row border input-row-99">
			<view class="title input-title">团队名称</view>
			<m-input class="m-input " type="text" clearable focus v-model="info.name" placeholder="请输入团队名称"></m-input>
		</view>
		
		<view class="btn-row ">
			<button type="red" class="red" @tap="changeTeam">确定</button>
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
				teamNum:"",
				teamName:"",
				item:[],
				headImg:"",
				name:"",
				info:{},
				list: [],
			};
		},
		onLoad(){
			this.info  =this.selListItem;
			this.headImg = this.info.headImg;
		},
		methods:{
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
			changeTeam(){
				this.$http.post('fyVolunteer/fySafeTeam/updateTeamName', {
							name:this.info.name,
							id:this.info.teamId,
							rbacToken: this.user.rbacToken,
						})
						.then(res => {
							if (res.data.success == 1) {
								uni.showToast({
									icon:'none',
									title: "修改成功!",
									complete:()=>{
										setTimeout(()=> {
											this.navigateBack(1);
										}, 1500);
										
									}
								});
							}else{
								uni.showToast({
									icon:'none',
									title: res.data.message
								});
							}
						})
						
				}
				
			},
			
	}
</script>

<style lang="scss">
	.team-title{
		text-align: center;
	}
	.btn-row{
		position:absolute;
		bottom:40upx;
		width:100%;
	}
	.input-title{
		line-height: 98rpx;
		font-size:32upx;
		text-align: center;
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
		width:100%;
		background: #fff;
		border-bottom:30upx solid #eee;
		height:360upx;
		.title {
			text-align: center;
			margin: 0 auto;
			margin-top: 20upx;
			font-size: 32upx;
		}
	}
	.list-item{
		float:left;
	}
	.title-icon {
		
		display: block;
		width: 140upx;
		height: 140upx;
		margin: 0 auto;
		margin-top: 50upx;
		position:relative;
		.img-box{
			position: absolute;
			left:0;
			top:0;
			width:100%;
			height:100%;
			border-radius: 50%;
			overflow: hidden;
		}
		.img{
			width:100%;
			height:100%;
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
</style>
