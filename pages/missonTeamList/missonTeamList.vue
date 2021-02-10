<template>
	<view class="content ">
		
		<scroll-view scroll-y class="mall-bar" scroll-y  @scrolltolower="getmoreData()">
			<list-cell-team-item v-for="(item, index) in TaskList" 
			:item = "item"
			 @eventClick="navToAndSaveItem(item,'/pages/teamDetail/teamDetail')"
			 
			 ></list-cell-team-item>
		</scroll-view>
	
	</view>
</template>

<script>
	import listCellTeamItem from '@/components/list-cell-team-item';
	export default {
		components: {
			listCellTeamItem
		},
		data() {
			return {
				keyWord:"",
				pageNo:1,
				pageSize:20,
				TaskList:[]
				}
		},
		onLoad() {
			this.getMyTaskList();
		},
		methods: {
			//加入团队

			
			getmoreData(){
				
				if(Math.ceil(this.total/this.pageSize)<=this.pageNo){
					if(!this.showMore){
						uni.showToast({
							mask:true,
							icon:'none',
							title: "没有更多了.",
							success:()=>{
								this.showMore = true;
							}
						});
					}
					
					return ;
				}else{
					this.pageNo = this.pageNo+1;
				}
				// uni.showToast({
				// 	icon : "none",
				// 	title:"正在加载,请稍等...",
				// 	duration:9999,
				// 	mask:true
				// })
				
				this.getMyTaskList("concat")
				
			},
			
			getMyTaskList(type) {
				this.loadingState();
				this.$http.get('fyVolunteer/fySafeTeam/getAppList', {
					keyWord:this.keyWord,
						pageNo:this.pageNo,
						pageSize:this.pageSize,
						rbacToken: this.user.rbacToken,		
					})
					.then(res => {
						uni.hideLoading()
						if (res.data.success == 1) {
							if(type =="concat"){
								this.TaskList = this.TaskList.concat(res.data.data.list);
								uni.hideToast()
							}else{
								this.TaskList = res.data.data.list;
							}
							this.total = res.data.data.total;	
							
						} else {
							uni.showToast({
								mask:true,
								icon: 'none',
								title: res.data.message
							});
						}
					})
			},
			
		},
		
		onNavigationBarSearchInputChanged(e, _) {
			
			this.keyWord =e.text ;
			
		},
		
		onNavigationBarSearchInputConfirmed(){
			this.pageNo=1;
			this.pageSize=20;
			this.getMyTaskList();
		},

		onNavigationBarButtonTap(e) {
			uni.navigateTo({
				url:'/pages/teamDetailNew/teamDetailNew'
			})
		}
	}
</script>

<style lang="scss">
	.title-box-menu {
		position: relative;
		display: inline-block;
		flex: 1;
		max-height: 60upx;
		margin: 25upx auto;
	}

	%flex-center {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	%section {
		display: flex;
		justify-content: space-around;
		align-content: center;
		background: #fff;
		border-radius: 10upx;
	}

	.mall-bar {
		height:0;
		flex: 1;
	}

	.slider-bar {
		width: 700upx;
		height: 150upx;
		background: #fff;

		.slider-item {
			width: 210upx;
			display: inline-block;
			position: relative;
			text-align: center;
			margin: 0 10upx;
			color: #fff;
			padding: 10upx 10upx;

			.bg {
				position: absolute;
				left: 0;
				top: 0;
				width: 100%;
				height: 100%;
			}

			.title {
				font-size: 16upx;
				position: relative;
				z-index: 10;
			}

			.number {
				position: relative;
				z-index: 10;
				font-size: 44upx;
				width: 100%;
			}

			.text {
				position: relative;
				z-index: 10;
				font-size: 16upx;
				width: 100%;
			}
		}
	}

	.tj-sction {
		margin:20upx;
		max-height: 200upx;
		overflow: hidden;
		background-size: 100%;
		padding: 40rpx 20upx;
		border-radius: 10upx;
		// max-height: 200upx;
		// background:#e32417;
		flex: 1;
		color: #fff;
		position: relative;
		display: flex;
		justify-content: space-around;
		align-content: center;
		border-radius: 10upx;


		.middle-line {
			width: 1px;
			height: 60%;
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
			background: #fff;
		}

		.tj-item {
			position: relative;
			z-index: 10;
			text-align: center;
			flex: 1;

			.sub-symbol {
				font-size: 30upx;
			}
		}

		.title {
			font-size: 28upx;
			margin-bottom: 22upx;
		}

		.num {
			font-size: 48upx;
		}
	}


</style>
