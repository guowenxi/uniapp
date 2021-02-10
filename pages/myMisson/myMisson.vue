<template>
	<view class="content no-padding">
		<view class="title-box" >
<!-- 			<pickerSelect v-if="hasTeam == 1 ? true : false" class="pick-box" keyName="name" :sel-list="selectCate" @btnClick="changeSelect($event,'taskType1')"></pickerSelect> -->
			<view class="tab-list new-title-box">
				<view class="tab">
				<new-wuc-tab :tab-list="tabList" :tabCur.sync="TabCur" @change="changeSelect"></new-wuc-tab>
				</view>
			</view>
		<new-menu-select 
		class="pick-box" 
		v-if="hasTeam == 1 ? true : false"
		:selList="[selectCate]"
		 keyName="name"
		modal="absolute"
		queryName="name" valName="val" @btnClick="tabChange"></new-menu-select>
			 
<!-- 		<view class="tab-list">
			<new-wuc-tab :tab-list="selectCate" :tabCur.sync="taskType1Index" @change="tabChange"></new-wuc-tab>
		</view> -->
		</view>

<!-- 		<view>
			<scroll-view class="sub-icon" scroll-x="true"  >
				<view class="icon"
				 v-for="(item,index) in tabList"  
				@click="changeSelect(item,index,'taskType1')"
				:class="index== TabCur ? 'icon-check-on' : '' "
				>{{item.name}}</view>
			</scroll-view>
		</view> -->
		<scroll-view class="history-section icon" scroll-y  @scrolltolower="getmoreData()">
			<image v-if="Number(total) === 0  ? true : false" class="prompt_img" src="/static/img/prompt_blank@2x.png" ></image>
			<list-cell-xf v-for="(item, index) in list"
			noStreet
			:item="item"
				@eventClick="selInfo(item)"		
			 ></list-cell-xf>
			
		</scroll-view>
		
	</view>
</template>
<script>
	import newWucTab from '@/components/_new-wuc-tab/_new-wuc-tab';
	import pickerSelect from '@/components/pickerSelect';
	import listCellXf from '@/components/list-cell-xf';
	
		import newMenuSelect from '@/components/_new-menu-select.vue';
	import {
		mapState
	} from 'vuex';
	export default {
		components: {
			pickerSelect,
newMenuSelect,
			listCellXf,
			newWucTab
		},
		data() {
			return {
				taskType1Index:0,
				total:null,
				hasTeam:0,
				pageNo:1,
				pageSize:20,
				taskType1:0,
				TabCur: 0,
				taskState: '1,2',
				selectCate: [
					// {name:'全部'},
					{name:'个人任务',val:0},
					{name:'团队任务',val:1},
				],
				tabList: [{
					name: '待完成',
					key:"1,2",
				}, {
					name: '已完成',
					key:3,
				}, {
					name: '已放弃',
					key:7,
				}, {
					name: '异常',
					key:"4,5,6",
				}],
				moving: false,
				list: [
				]
			}
		},
		onLoad(){
			
		},
		onShow() {
			this.hasTeam = this.user.hasTeam;
			this.getMyTaskList();
		},
		computed: {
			
		},
		methods: {
			//选择一个任务
			selInfo(item){
				//在此拦截状态详情
				this.navToAndSaveItem(item,
				Number(this.taskType1)+1 == 1 ? 
				'/pages/personMissonDetailBegin/personMissonDetailBegin' :
				'/pages/teamMissonDetailBegin/teamMissonDetailBegin'
				)
			},
			getmoreData(){
				
				if(Math.ceil(this.total/this.pageSize)<=this.pageNo){
					if(!this.showMore){
						uni.showToast({
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
			
			tabChange(item) {
				debugger
				this['taskType1'] = item.selIndex;
				this['taskType1Index'] = item.selIndex;
				this.pageNo = 1;
				this.showMore = false;
				this.getMyTaskList();
			},
			changeSelect(index) {
				
				//(index,item,'taskType1')

				this.taskState = this.tabList[index].key;
				this.TabCur = index;
				this.pageNo = 1;
				this.showMore = false;
				this.getMyTaskList();
			},
			getMyTaskList(type) {
				this.loadingState();
				this.$http.get('fyTaskManage/peaceTaskApp/getMyTaskList', {
						pageNo:this.pageNo,
						pageSize:this.pageSize,
						rbacToken: this.user.rbacToken,
						taskType1:Number(this.taskType1)+1,
						state:this.taskState,
					})
					.then(res => {
						uni.hideLoading();
						if (res.data.success == 1) {
							if(type =="concat"){
								this.list = this.list.concat(res.data.data.list);
								uni.hideToast()
							}else{
								this.list = res.data.data.list;
							}
							this.total = res.data.data.total;	
							
						} else {
							uni.showToast({
								icon: 'none',
								title: res.data.message
							});
						}
					})
			},
		}
	}
</script>
<style lang='scss'>
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


.title-box{
	background: #f6f6f6;
		max-height: 90rpx;
		min-height: 90rpx;
	
	.pick-box{

		flex:1;

		height:90upx;
		.pick-input{
			height:90upx;
			line-height:90upx;
		}
	}
	.tab-list{
		min-width:70%;
		/* float:left; */
		flex:1;
		position:relative;
		
	}
}

	.user-section {
		/* 		padding: 100upx 30upx 0; */
		position: relative;

		.bg {
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			filter: blur(1px);
			opacity: .7;
		}
	}

	.user-info-box {
		height: 180upx;
		display: flex;
		align-items: center;
		position: relative;
		z-index: 1;

		.portrait {
			width: 130upx;
			height: 130upx;
			border: 5upx solid #fff;
			border-radius: 50%;
		}

		.renzheng_box {
			padding: 10upx 20upx;
		}

		.username {
			font-size: $font-lg + 6upx;
			color: $font-color-dark;
			margin-left: 20upx;
		}
	}

	.vip-card-box {
		display: flex;
		flex-direction: column;
		color: #f7d680;
		height: 240upx;
		background: linear-gradient(left, rgba(0, 0, 0, .7), rgba(0, 0, 0, .8));
		border-radius: 16upx 16upx 0 0;
		overflow: hidden;
		position: relative;
		padding: 20upx 24upx;

		.card-bg {
			position: absolute;
			top: 20upx;
			right: 0;
			width: 380upx;
			height: 260upx;
		}

		.b-btn {
			position: absolute;
			right: 20upx;
			top: 16upx;
			width: 132upx;
			height: 40upx;
			text-align: center;
			line-height: 40upx;
			font-size: 22upx;
			color: #36343c;
			border-radius: 20px;
			background: linear-gradient(left, #f9e6af, #ffd465);
			z-index: 1;
		}

		.tit {
			font-size: $font-base+2upx;
			color: #f7d680;
			margin-bottom: 28upx;

			.yticon {
				color: #f6e5a3;
				margin-right: 16upx;
			}
		}

		.e-b {
			font-size: $font-sm;
			color: #d8cba9;
			margin-top: 10upx;
		}
	}

	.cover-container {
		background: $page-color-base;
		/* padding: 0 30upx; */
		position: relative;
		background: #f5f5f5;

		/* padding-bottom: 20upx; */
		.arc {
			position: absolute;
			left: 0;
			top: -34upx;
			width: 100%;
			height: 36upx;
		}
	}

	.tj-sction {
		@extend %section;

		.tj-item {

			@extend %flex-center;
			flex-direction: column;
			height: 140upx;
			font-size: $font-sm;
			color: #75787d;
		}

		.num {
			font-size: $font-lg;
			color: $font-color-dark;
			margin-bottom: 8upx;
		}
	}

	.order-section {
		@extend %section;
		padding: 28upx 0;
		margin-top: 20upx;

		.order-item {
			@extend %flex-center;
			width: 120upx;
			height: 120upx;
			border-radius: 10upx;
			font-size: $font-sm;
			color: $font-color-dark;
		}

		.yticon {
			font-size: 48upx;
			margin-bottom: 18upx;
			color: #fa436a;
		}

		.icon-shouhoutuikuan {
			font-size: 44upx;
		}
	}

	.history-section {
		flex:1;
		height:0;
		background: #fff;
		border-radius: 10upx;

		.sec-header {
			display: flex;
			align-items: center;
			font-size: $font-base;
			color: $font-color-dark;
			line-height: 40upx;
			margin-left: 30upx;

			.yticon {
				font-size: 44upx;
				color: #5eba8f;
				margin-right: 16upx;
				line-height: 40upx;
			}
		}

		.h-list {
			white-space: nowrap;
			padding: 30upx 30upx 0;

			image {
				display: inline-block;
				width: 160upx;
				height: 160upx;
				margin-right: 20upx;
				border-radius: 10upx;
			}
		}
	}

</style>
