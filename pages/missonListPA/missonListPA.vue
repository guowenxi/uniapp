<template>
	<view class="content no-padding">
		<view class="title-box">
			<!-- <pickerSelect  class="pick-box" keyName="sub_name" :sel-list="tagList" @btnClick="changeSelect($event,'fieldName')"></pickerSelect> -->
			
			
			<scroll-view class="new-sub-icon" scroll-x="true">
				<view class="icon"
				 v-for="(item,index) in tagList"  
				@click="changeSelect(item,index,'fieldName')"
				:class="index== fieldNameIndex ? 'icon-check-on' : '' "
				>{{item.sub_name}}</view>
			</scroll-view>
			
			<new-menu-select
			class="pick-box" 
			
			:selList="[tabList]"
			 keyName="name"
			modal="absolute"
			queryName="name" valName="val" @btnClick="tabChange"></new-menu-select>
				
			
			
		</view>
		<scroll-view class="history-section icon" 
		scroll-y
		 @scrolltolower="getmoreData()"
		 v-on:touchstart="touchstart"
		 v-on:touchmove="touchmove"
		 v-on:touchend="touchend"
		>
		<image
		class="refresh-ccw"
		:style="{transform:`translateY(${reloadScrollTop}px) rotate(${reloadScrollTop*5}deg)`}"
		:class="!start_state == true? 'scroll-up-retrun' : ''"
		 src="/static/img/refresh-ccw.png"></image>
		 <view
		 class="height-100"
		 :class="!start_state == true? 'scroll-up-retrun' : ''"
		 			:style="{transform:`translateY(${reloadScrollTop}px)`}"
		 >
		 
		 <image v-if="Number(total) === 0  ? true : false" class="prompt_img" src="/static/img/prompt_blank@2x.png" ></image>
		 
		 <new-list-cell-misson v-for="(item, index) in TaskList" 
		 :item="item"
		  @eventClick="navToAndSaveItem(item,'/pages/areaMissonDetail/areaMissonDetail')"></new-list-cell-misson>
		  
		 </view>
		</scroll-view>
	</view>
</template>

<script>
	import pickerSelect from '@/components/pickerSelect';
	import listCellMisson from '@/components/list-cell-misson';
	import newListCellMisson from '@/components/_new-list-cell-misson';
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import wucTab from '@/components/wuc-tab/wuc-tab';
	import newMenuSelect from '@/components/_new-menu-select.vue';
	import {
		mapState,mapActions,mapMutations
	} from 'vuex';
	
	export default {
		computed: {
			...mapState(['_fieldName'])
		},
		components: {
			pickerSelect,
			uniNavBar,
			wucTab,
			listCellMisson,
			newMenuSelect,
			newListCellMisson
		},
		data() {
			return {
				start_state:false,
				reloadScrollTop:0,
				total:null,
				fieldName:"",
				fieldNameIndex:0,
				pageNo:1,
				pageSize:20,
				keyWord:"",
				TabCur: 0,
				tagList: [
				],
				tabList: [{
					name: '领域任务',
					val:0,
				}, {
					name: '区域任务',
					val:0,
				}],
				TaskList: [
					
				]
			};
		},
		onShow(){
			
			if(this.$store.state._fieldName){
				debugger
				this.fieldName=this.$store.state._fieldName;
				this.getPeaceTaskList();
			};
			
			
		},
		async onLoad(){
			await  this.getProType();
			this.getPeaceTaskList();
		},
		onUnload(){
			
			this.$store.commit({
			    type:'saveData',
			    payload:{
			        _fieldName:"",
			    }
			})
			
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
					this.getPeaceTaskList();
				}else{
					this.start_state = false ;
					this.reloadScrollTop = 0;
				}
			},
			
			//切换类型
			changeSelect(item,index,type) {

				this.$store.commit({
					type:'saveData',
					payload:{
						_fieldName:item.sub_name
					}
				})
				this[type] = item.sub_name;
				this[`${type}Index`] = index;
				this.pageNo = 1;
				this.showMore = false;
				this.getPeaceTaskList();
			},
			//加载更多
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
				
				
				this.getPeaceTaskList("concat")
				
			},
			//获取列表
			async  getProType() {
				await this.$http.get('fyProHandle/proHandle/getProType', {
					type:1,
					rbacToken:this.user.rbacToken
					})
					.then(res => {
						
						this.tagList = res.data.data;
						// this.tagList.pop();
						// this.tagList.unshift({sub_name:"全部"})
						this.fieldName = this.tagList[0].sub_name ; 
						this.$store.commit({
						    type:'saveData',
						    payload:{
						        _fieldName:this.fieldName,
						    }
						})
						return this.fieldName;
					})
			},
			//获取数据
			getPeaceTaskList(type) {
				this.loadingState();
				this.$http.get('fyTaskManage/peaceTaskApp/getPeaceTaskList', {
						pageNo: this.pageNo,
						pageSize: this.pageSize,
						taskType: this.TabCur+1,
						fieldName: this.fieldName  == "全部" ? '' : this.fieldName,
						taskState: 2,
						keyWord: this.keyWord,
						rbacToken:this.user.rbacToken,
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
							
						}else{
							uni.showToast({
								mask:true,
								icon:'none',
								title: res.data.message
							});
						}
						
					})
			},
			tabChange(index) {

				this.keyWord = "";
				this.showMore = false;
				this.pageNo = 1;
				this.TabCur = index.selIndex;
				this.getPeaceTaskList();
			}

		},
		onNavigationBarSearchInputChanged(e, _) {
			
			this.keyWord =e.text ;
			
		},
		onNavigationBarSearchInputConfirmed(){
			this.getPeaceTaskList();
		}
	}
</script>

<style lang="scss">

.title-box{
	
	background-color: #f6f6f6;
}
.pick-box{
	.check-title{
		height: 100rpx;
	}
	height:90upx;
	flex:1;
	max-width:250upx;
	min-width:250upx;
}
	.tab{
		flex:1;
		position: relative;
	}
	.uni-page-head-search {
		max-width: 70%;
	}

	.history-section{
		flex:1;
		height:0;
	}
</style>
