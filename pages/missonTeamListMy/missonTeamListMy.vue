<template>
	<view class="content no-padding">
<!-- 		<view class="tj-sction">
			<image class="bg" src="/static/img/List_bg@2x.png"></image>
			<view class="tj-item">
				<view class="title">团队人数</view>
				<view class="num">{{title.teamNum ? title.teamNum : 0 }}</view>
			</view>
			<view class="middle-line" style="left:33%"></view>
			<view class="tj-item">
				<view class="title">任务完成率</view>
				<view class="num">{{title.allRate ? title.allRate : 0}}<text class="sub-symbol">%</text></view>
			</view>
			<view class="middle-line" style="left:67%"></view>
			<view class="tj-item">
				<view class="title">团队排名</view>
				<view class="num">{{title.line? title.line : 0}}</view>
			</view>
		</view> -->
		<view class="title-box">
			<new-wuc-tab :tab-list="tabList" :tabCur.sync="TabCur" @change="tabChange"></new-wuc-tab>
		</view>

		<scroll-view scroll-y class="mall-bar" scroll-y  @scrolltolower="getmoreData()">
			<image v-if="Number(total) === 0  ? true : false" class="prompt_img" src="/static/img/prompt_blank@2x.png" ></image>
			<list-cell-xf v-for="(item, index) in TaskList" 
			:item="item"
			 @eventClick="navToAndSaveItem(item,'/pages/teamMissonDetailBegin/teamMissonDetailBegin')"
			 ></list-cell-xf>
		</scroll-view>
	</view>
</template>

<script>
	import newWucTab from '@/components/_new-wuc-tab/_new-wuc-tab';
	import wucTab from '@/components/wuc-tab/wuc-tab';
	import uniRate from "@/components/uni-rate/uni-rate.vue"
	import listCellXf from '@/components/list-cell-xf';
	export default {
		components: {
			wucTab,
			uniRate,
			listCellXf,
			newWucTab
		},
		data() {
			return {
				total:null,
				taskState: '1,2',
				title:{
					teamNum:0,
					allRate:0,
					line:0,
				},
				TaskList:[],
				pageNo:1,
				pageSize:20,
				TabCur: 0,
				wrapBoxWidth: "",
				selIndex: 0,
				tabList: [{
					name: '待完成',
					key:"1,2",
				}, {
					name: '已完成',
					key:3,
				}
				],
				
			};
		},
		onLoad() {
			this.selectTeamByApp();
			this.getMyTaskList();
		},
		methods: {
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
				uni.showToast({
					
					icon : "none",
					title:"正在加载,请稍等...",
					duration:9999,
					mask:true
				})
				
				this.getMyTaskList("concat")
				
			},
			
			getMyTaskList(type) {
				this.$http.get('fyTaskManage/peaceTaskApp/getMyTaskList', {
						pageNo:this.pageNo,
						pageSize:this.pageSize,
						rbacToken: this.user.rbacToken,
						taskType1:2,
						state:this.taskState
						
					})
					.then(res => {
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
			selectTeamByApp() {
	
				this.$http.get('fyVolunteer/fySafeTeam/selectTeamByApp', {
						rbacToken: this.user.rbacToken,
					})
					.then(res => {
						if (res.data.success == 1) {
							
							this.title = res.data.data;	
						
						} else {
							uni.showToast({
								mask:true,
								icon: 'none',
								title: res.data.message
							});
						}
					})
			},
			
			tabChange(index) {
				this.taskState = this.tabList[index].key;
				this.pageNo = 1;
				this.showMore = false;
				this.TabCur = index;
				this.getMyTaskList()
			}
		},
		onNavigationBarButtonTap(e) {
			
			uni.navigateTo({
				url:'/pages/teamDetailMy/teamDetailMy'
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
