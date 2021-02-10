<template>
	<view class="content no-padding">
			<view class=" title-box" v-if="hasTeam == 1 && changeShowList ? true : false">
				<new-wuc-tab :tab-list="tabList" :tabCur.sync="TabCur" @change="tabChange"></new-wuc-tab>
			</view>
			<view class="title-box-menu" v-if="hasTeam == 1 && changeShowList ? true : false">
				<new-menu-select class="pick-box"
				 :selList="[selectCate_distanceScope,selectCate_coinScop,selectCate_timeScop]" 
				 keyName="name,name,name"
				 queryName="distanceScope,coinScop,timeScop"
				 valName="val,val,val"
				  @btnClick="changeSelect($event)"
				  ></new-menu-select>
				
<!-- 				<topSilderSelect
				class="pick-box"
				 keyName="name" 
				:sel-list="selectCate_distanceScope"
				 :sel-index="distanceScope"
				  @btnClick="changeSelect($event,'distanceScope')"
				></topSilderSelect> -->
<!-- 				<picker-select class="pick-box" keyName="name" :sel-list="selectCate_distanceScope" :sel-index="distanceScope" @btnClick="changeSelect($event,'distanceScope')"></picker-select>
				<pickerSelect class="pick-box" keyName="name" :sel-list="selectCate_coinScop" :sel-index="coinScop" @btnClick="changeSelect($event,'coinScop')"></pickerSelect>
				<pickerSelect class="pick-box" keyName="name" :sel-list="selectCate_timeScop" :sel-index="timeScop" @btnClick="changeSelect($event,'timeScop')"></pickerSelect> -->
			</view>
			


		<scroll-view class="history-section icon" v-if="changeShowList" scroll-y @scrolltolower="getmoreData()"
		v-on:touchstart="touchstart"
		v-on:touchmove="touchmove"
		v-on:touchend="touchend"
		>
			<image
			class="refresh-ccw"
			:style="{transform:`translateY(${reloadScrollTop}px) rotate(${reloadScrollTop*5}deg)`}"
			:class="!start_state == true? 'scroll-up-retrun' : ''"
			 src="/static/img/refresh-ccw.png"></image>

			<image v-if="Number(total) === 0  ? true : false" class="prompt_img" src="/static/img/prompt_blank@2x.png" ></image>
			<view
			:class="!start_state == true? 'scroll-up-retrun' : ''"
						:style="{transform:`translateY(${reloadScrollTop}px)`}"
			>
			<list-cell-xf v-for="(item, index) in TaskList" 
			:item="item"
			 @eventClick="navToAndSaveItem(item,'/pages/personMissonDetail/personMissonDetail')"
			 ></list-cell-xf>
			 
			 </view>
		</scroll-view>
		
		<view class="map-box" v-if="!changeShowList">
			<map id="Gmap"  
			class="Gmap"
			:markers="markers" 
			:longitude="longitude"
			:latitude="latitude"
			@markertap="showInfo"
			></map>
		</view>
	</view>
</template>

<script>
	import topSilderSelect from '@/components/topSilderSelect.vue';
	import pickerSelect from '@/components/pickerSelect.vue';
	import listCellXf from '@/components/list-cell-xf';
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import wucTab from '@/components/wuc-tab/wuc-tab';
	import newWucTab from '@/components/_new-wuc-tab/_new-wuc-tab';
	import menuSelect from '@/components/menu-select.vue';
	import newMenuSelect from '@/components/_new-menu-select.vue';
	export default {
		components: {
			uniNavBar,
			wucTab,
			listCellXf,
			pickerSelect,
			topSilderSelect,
			menuSelect,
			newWucTab,
			newMenuSelect
		},

		data() {
			return {
				start_state:false,
				reloadScrollTop:0,
				total:null,
				hasTeam:0,
				markers:[],
				longitude:0,
				latitude:0,
				pageNo:1,
				pageSize:20,
				changeShowList: true,
				TabCur: 0,
				distanceScope: "",
				coinScop: "",
				timeScop: "",
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
				tabList: [{
					name: '个人任务'
				}, {
					name: '团队任务'
				}],
				TaskList: []
			};
		},
		onLoad(){
			this.hasTeam = this.user.hasTeam;
		},
		onReady() {
			
			try{
				this.Gmap = uni.createMapContext('Gmap', this)
				this.Gmap.$getAppMap().showUserLocation( true );
			}catch(res){
				
			}
			
		},
		onShow() {
			this.getLocation();
			this.getCheckTaskList()
		},
		methods: {
			//监听开始
			touchstart(e,_){
				this.start_state = true ;
				this.reloadScrollTop_start = e.touches[0].clientY;
			},
			//监听移动
			touchmove(e,_){
				if((e.touches[0].clientY - this.reloadScrollTop_start) < 0){
					return
				}
				if((e.touches[0].clientY - this.reloadScrollTop_start) <= 100){
					this.reloadScrollTop = (e.touches[0].clientY - this.reloadScrollTop_start);
				}
			},
			touchend(){
				if(this.reloadScrollTop>=75){
					this.pageNo = 1;
					this.getCheckTaskList();
				}else{
					this.start_state = false ;
					this.reloadScrollTop = 0;
				}
			},
			//获取点的位置
			getLocation(){
				let _this = this;
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
			},
			//点击点
			showInfo(event){
				const idx = event.detail.markerId;
				this.navToAndSaveItem(this.TaskList[idx],"/pages/personMissonDetail/personMissonDetail")
			},
			setMarkers(){
				const _markers = [];

				this.TaskList.map((item,idx)=>{
					_markers.push({
						id:idx,
						iconPath:
						 this.TabCur == 0 ? '/static/img/icon_map_task_full@2x.png' : '/static/img/icon_map_task_Someone@2x.png'
						,
						longitude: item.longitude,
						latitude: item.latitude
					})
				})
				this.markers = _markers;
			},
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
				
				
				this.getCheckTaskList("concat")
				
			},
			//选择
			changeSelect(e, type) {
				this[e.type] = this["selectCate_"+e.type][e.selIndex].val;
				this.pageNo = 1;
				this.showMore = false;
				this.getCheckTaskList()
			},
			
			getCheckTaskList(type) {
				this.loadingState();
				this.$http.get('fyTaskManage/peaceTaskApp/getCheckTaskList', {
						pageNo: this.pageNo,
						pageSize: this.pageSize,
						taskType1: this.TabCur+1,
						taskState:2,
						distanceScope: this.distanceScope,
						coinScop: this.coinScop,
						timeScop: this.timeScop,
						rbacToken: this.user.rbacToken,
						d:"",
						longitude:this.user.longitude,
						latitude:this.user.latitude,
					})
					.then(res => {
						uni.hideLoading();
						this.reloadScrollTop = 0;
						if (res.data.success == 1) {
							if(type =="concat"){
								this.TaskList = this.TaskList.concat(res.data.data.list);
								uni.hideToast()
							}else{
								this.TaskList = res.data.data.list;
							}
							this.total = res.data.data.total;
							if(this.TabCur == 0){
								this.setMarkers();
							}else{
								
							}
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
				this.showMore = false;
				this.pageNo = 1;
				this.TabCur = index;
				this.getCheckTaskList();
			}

		},
		onNavigationBarButtonTap(e, _) {
			this.changeShowList = !this.changeShowList;
		},
	}
</script>

<style lang="scss">
	.top-box {
		width: 100%;
		flex: 1;
		// border-bottom:1px solid #ccc;
	}

	.uni-page-head-search {
		max-width: 70%;
	}

	.map-box {
		flex: 1;
		width: 100%;
		position: relative;
		.Gmap{
			position: absolute;
			left:0;
			top:0;
			width: 100%;
			height: 100%;
		}
		#Gmap {
			width: 100%;
			height: 100%;
		}
	}

	.title-box-menu {
		background: #f6f6f6;
		flex:1;
		width: 100%;
		margin: 0 auto;
		min-height: 90upx;
		max-height: 90upx;
		display: flex;
		flex-flow: row nowrap;

		.pick-box {

			backgorund: #5eba8f;
			flex: 1;
		}

	}
	.history-section{
		height:0;
		flex:1;
	}
</style>
