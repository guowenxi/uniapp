<template>
	<view class="content no-padding">
		
			<view class="title-box"  v-if="changeShowList" >
				<view class="new-title-box">
					<view class="tab">
						<new-wuc-tab  :tab-list="tabList" :tabCur.sync="TabCur" @change="tabChange"></new-wuc-tab>
					</view>
				</view>

	
					<new-menu-select class="pick-box"  v-if="changeShowList && TabCur ==0" 
					 :selList="[selectCate_distanceScope]" 
					 modal="absolute"
					 keyName="name"
					 queryName="distanceScope"
					 valName="val"
					  @btnClick="changeSelectFilfter($event)"
					  ></new-menu-select>
			<!-- 		<view>
						<scroll-view class="sub-icon" scroll-x="true"  >
							<view class="icon"
							 v-for="(item,index) in tabList"  
							@click="changeSelect(item,index,'taskType1')"
							:class="index== TabCur ? 'icon-check-on' : '' "
							>{{item.name}}</view>
						</scroll-view>
					</view> -->
					
			</view>
					<scroll-view class="history-section icon" scroll-y   v-if="changeShowList"   @scrolltolower="getmoreData()">
						<image v-if="Number(total) === 0  ? true : false" class="prompt_img" src="/static/img/prompt_blank@2x.png" ></image>
						 
						<list-cell-kd v-for="(item, index) in list"
						:item="item"
						:state="TabCur"
							@eventClick="selInfo(item)"		
						 ></list-cell-kd>
						
					</scroll-view>


		<view class="map-box" v-if="!changeShowList">
			<map id="Gmap"
			:markers="markers" 
			:longitude="longitude"
			:latitude="latitude"
			@markertap="showInfo"
			></map>
		</view>
		
	</view>
</template>
<script>
	import newWucTab from '@/components/_new-wuc-tab/_new-wuc-tab';
	import newMenuSelect from '@/components/_new-menu-select';
	import pickerSelect from '@/components/pickerSelect';
	import listCellKd from '@/components/list-cell-kd';
	import menuSelectSimple from '@/components/menu-select-simple.vue';
	import {
		mapState
	} from 'vuex';
	export default {
		components: {
			pickerSelect,
			newWucTab,
			listCellKd,
			menuSelectSimple,
			newMenuSelect
		},
		data() {
			return {
				markers:[],
				longitude:"",
				latitude:"",
				distanceScope: "",
				changeShowList: true,
				selectCate_distanceScope: [
					{name:"全部距离",val:""},
					{name:"0-0.5公里",val:"0-0.5"},
					{name:"0.5-1公里",val:"0.5-1"},
					{name:"1-2公里",val:"1-2"},
					{name:"2公里以上",val:"2"},
				],
				selectCate_coinScop: [
					{name:"全部平安币",val:""},
					{name:"0-20",val:"0-20"},
					{name:"20-30",val:"20-30"},
					{name:"30-40",val:"30-40"},
					{name:"40",val:"40"},
				],
				selectCate_timeScop: [
					{name:"全部时间段",val:""},
					{name:'08:00-09:00',val:'08:00-09:00'},
					{name:'09:00-10:00',val:'09:00-10:00'},
					{name:'10:00-11:00',val:'10:00-11:00'},
					{name:'11:00-12:00',val:'11:00-12:00'},
					{name:'12:00-13:00',val:'12:00-13:00'},
					{name:'13:00-14:00',val:'13:00-14:00'},
					{name:'14:00-15:00',val:'14:00-15:00'},
					{name:'15:00-16:00',val:'15:00-16:00'},
					{name:'16:00-17:00',val:'16:00-17:00'},
					{name:'17:00-18:00',val:'17:00-18:00'},
					{name:'18:00-19:00',val:'18:00-19:00'},
					{name:'19:00-20:00',val:'19:00-20:00'},
					{name:'20:00-21:00',val:'20:00-21:00'},
					{name:'21:00-22:00',val:'21:00-22:00'},
				],
				
				keyWord:"",
				taskType1Index:0,
				total:null,
				hasTeam:0,
				pageNo:1,
				pageSize:20,
				taskType1:0,
				TabCur: 0,
				taskState: 3,
				tabList: [{
					name: '待领取',
					key:1,
				}, {
					name: '已领取',
					key:2,
				}, {
					name: '已完成',
					key:3,
				}],
				moving: false,
				list: [
				]
			}
		},
		onLoad(){
			
		},
		onShow() {
			this.getLocation();
			this.hasTeam = this.user.hasTeam;
			if(this.TabCur == 0 ){
				this.getCheckTaskList();
			}else{
				this.getMyTaskList();
			}

		},
		computed: {
			
		},
		methods: {
			//获取点的位置
			getLocation(){
				let _this = this;
				try{
					uni.getLocation({
						geocode:true,
						// type: 'wgs84',
						success: function (res) {
							console.log(res);
							const _address = res.address;
							
							// _this.address = _address.city + _address.district + _address.street + _address.streetNum + _address.poiName;
							
							_this.longitude = res.longitude;
							_this.latitude = res.latitude;
						}
					});
				}catch(e){
					//TODO handle the exception
				}

			},
			//点击点
			showInfo(event){
				const idx = event.detail.markerId;
				this.navToAndSaveItem(this.list[idx],'/pages/roadLockMissonDetail/roadLockMissonDetail');
			},
			setMarkers(){
				const _markers = [];
			
				this.list.map((item,idx)=>{
					_markers.push({
						id:idx,
						iconPath:'/static/img/kadian.png',
						longitude: item.longitude,
						latitude: item.latitude
					})
				})
				this.markers = _markers;
			},
			//选择
			changeSelectFilfter(e, type) {
				this[e.type] = this["selectCate_"+e.type][e.selIndex].val;
				this.pageNo = 1;
				this.showMore = false;
				this.getCheckTaskList()
			},
			goToInfo(url){
				this.navTo(url);
			},
			//选择一个任务
			selInfo(item){
				//在此拦截状态详情
				if(item.state == 8){
					return ;
				}
				this.navToAndSaveItem(item,
				this.TabCur == 0  ? 
				'/pages/roadLockMissonDetail/roadLockMissonDetail' :
				'/pages/roadLockMissonDetailBegin/roadLockMissonDetailBegin'
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
				
				if(this.TabCur == 0 ){
					this.getCheckTaskList("concat")
				}else{
					this.getMyTaskList("concat")
				}
				
				
				
			},
			tabChange(index) {
				this.keyWord = "";
				this.taskState = this.tabList[index].key;
				this.distanceScope = "";
				this.TabCur = index;
				this.pageNo = 1;
				this.showMore = false;
				if(index == 0 ){
					this.getCheckTaskList();
				}else{
					this.getMyTaskList();
				}

				
			},
			changeSelect(item,index,type) {

				this.taskState = this.tabList[index].key;
				this.TabCur = index;
				this.pageNo = 1;
				this.showMore = false;

				if(index == 0 ){
					this.getCheckTaskList();
				}else{
					this.getMyTaskList();
				}
			
			},
			getMyTaskList(type) {
				this.loadingState();
				this.$http.get('fyTaskManage/peaceTaskApp/getMyTaskList', {
						pageNo:this.pageNo,
						pageSize:this.pageSize,
						keyWord:this.keyWord,
						rbacToken: this.user.rbacToken,
						
						taskType:2,  //2为卡口任务
						state:this.TabCur == 1 ? '1,2,8' : '3'
					})
					.then(res => {
						
						uni.hideLoading();
						if (res.data.success == 1) {
							if(type =="concat"){
								this.list = this.list.concat(res.data.data.list);
								uni.hideToast();
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
		getCheckTaskList(type) {
			this.loadingState();
			this.$http.get('fyTaskManage/peaceTaskApp/getCheckTaskList', {
					pageNo:this.pageNo,
					pageSize:this.pageSize,
					keyWord:this.keyWord,
					rbacToken: this.user.rbacToken,
					longitude:this.user.longitude,
					latitude:this.user.latitude,
					distanceScope: this.distanceScope,
					// taskType1:Number(this.taskType1)+1,
					d:1,//判断是否过期任务
					taskType:2,  //2为卡口任务
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
						this.setMarkers();
						
					} else {
						uni.showToast({
							icon: 'none',
							title: res.data.message
						});
					}
				})
		},
				
		},
		
		onNavigationBarButtonTap(e, _) {
			if(e.index == 1){
				this.goToInfo('/pages/roadblockguize/roadblockguize')
			}else{
				if(this.TabCur !=0){
					return ;
				}
				this.distanceScope = "";
				this.getCheckTaskList()
				this.changeShowList = !this.changeShowList;
			}
			
		},
		onNavigationBarSearchInputChanged(e, _) {
			
			this.keyWord =e.text ;
			
		},
		onNavigationBarSearchInputConfirmed(){
			this.pageNo = 1;
			if(this.TabCur == 0 ){
				this.getCheckTaskList()
			}else{
				this.getMyTaskList()
			}
		},
		onBackPress(){
			// this.switchTabTo('/pages/index/index')
		},
	}
</script>
<style lang='scss'>
	
	.map-box {
		flex: 1;
		width: 100%;
	
		#Gmap {
			width: 100%;
			height: 100%;
		}
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
	.new-title-box{

		background: #f6f6f6;
		min-height:90rpx;
		max-height:90rpx;
		
	}

.title-box{
	background-color: #f6f6f6;

	.pick-box{
		min-width:260upx;
		max-width:260upx;
		flex:1;
	
		height:90upx;
		.pick-input{
			height:90upx;
			line-height:90upx;
		}
	}
	.tab-list{
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
