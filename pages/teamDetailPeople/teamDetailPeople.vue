<template>
	<view class="content no-padding">
		
		<view>
			
			<list-cell-user v-for="(item, index) in list" 
				:item = "item"
				:hander="index == 0 ? true :false"
			></list-cell-user>
			
		</view>
		
	</view>
</template>

<script>
	import listCellUser from '@/components/list-cell-user';
	
	import uniList from '@/components/uni-list/uni-list.vue'
	import uniListItemRight from '@/components/uni-list-item/uni-list-item-right.vue'
	
	export default {
		components: {
			listCellUser,
			uniList,
			uniListItemRight
		},
		data() {
			return {
				headImg:"",
				name:"",
				list: [
						  
						],
			};
		},
		onLoad(){
			
			this.list = this.selListItem.list;
			
			// this.getUserByTeamId();
			
		},
		methods:{
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
							this.headImg = res.data.data.headImg;
							this.name = res.data.data.name;
							this.list = res.data.data.list;
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

	.title {
		text-align: center;
		margin: 0 auto;
		margin-top: 20upx;
		font-size: 32upx;
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
