<template>
	<view class="content no-padding">
		<view class="title-box">
			<!-- <pickerSelect  class="pick-box" keyName="sub_name" :sel-list="tagList" @btnClick="changeSelect($event,'fieldName')"></pickerSelect> -->
			<view class="tab">
				<wuc-tab  :tab-list="tagList" :tabCur.sync="TabCur" @change="tabChange"></wuc-tab>
			</view>
		</view>
			<scroll-view class="sub-icon" scroll-x="true"  >
				<view class="icon"
				 v-for="(item,index) in tabList"  
				@click="changeSelect(item,index,'format')"
				:class="index== formatIndex ? 'icon-check-on' : '' "
				>{{item.name}}</view>
			</scroll-view>
		
		<scroll-view class="history-section icon" scroll-y @scrolltolower="getmoreData()">
			<image v-if="Number(total) === 0  ? true : false" class="prompt_img" src="/static/img/prompt_blank@2x.png" ></image>
			<view v-if="format == 4 ? true : false">
				<list-cell-topic v-for="(item,index) in appList"
				
				:item="item"
				:idx="index"
				:format = 'format'
				@eventClick="bolNavTo('/pages/teachInfoListXX/teachInfoListXX',item)"
				 ></list-cell-topic>
			</view>
			<view v-else>
				<list-cell-teach v-for="(item,index) in appList"
				:item="item"
				:format = 'format'
				@eventClick="bolNavTo('/pages/teachInfoListXX/teachInfoListXX',item)"
				 ></list-cell-teach>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import listCellTeach from "@/components/list-cell-teach.vue"
	import listCellTopic from "@/components/list-cell-topic.vue"
import wucTab from '@/components/wuc-tab/wuc-tab';
	export default {
		components: {
			listCellTeach,
			listCellTopic,
			wucTab
		},
		data() {
			return {
				type:'',
				format:'',
				total:null,
				TabCur:0,
				formatIndex:0,
				pageNo:1,
				pageSize:20,
				keyWord:"",
				appList: [],
				tabList:[],
				tagList:[],
			};
		},
		onShow(){
			
		},
		onLoad(){
			this.getFiled();
		},
		methods: {
			tabChange(index) {
			
				this.keyWord = "";
				this.showMore = false;
				this.pageNo = 1;
				this.TabCur = index.selIndex;
				this.getPeaceTaskList();
			},
			//切换类型
			changeSelect(item,index,type) {
				this.keyWord = "";
				this[type] = item.id;
				this[`${type}Index`] = index;
				this.pageNo = 1;
				this.showMore = false;
				this.fySafeStudy();
			},
			tabChange(index) {

				this.keyWord = "";
				this.showMore = false;
				this.pageNo = 1;
				this.TabCur = index;
				this.type = this.tagList[index].id;

				this.fySafeStudy();
			},
			//获取列表
			getFiled() {
				this.loadingState();
				this.$http.get('fyPeaceStudy/fySafeStudy/getFiled', {
					rbacToken:this.user.rbacToken
					})
					.then(res => {
						this.tagList = res.data.data.filed;
						this.tagList.unshift({name:"全部",id:""});
						this.tabList = res.data.data.studyType;
						this.type = this.tagList[0].id;
						this.format = this.tabList[0].id;
						this.fySafeStudy();
					})
			},
			showInfo(item,url){
				if(this.user.reviewStatus != 1){
						uni.showToast({
							icon:'none',
							title: "请进行实名认证"
						});
				}else{
					this.navToAndSaveItem(item,url)
				}
				
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
				uni.showToast({
					icon : "none",
					title:"正在加载,请稍等...",
					duration:9999,
					mask:true
				})
				
				
				this.fySafeStudy("concat")
				
			},
			//获取学习
			fySafeStudy(type) {
				let url = "";
				
				this.format == 4 ? url='fyPeaceStudy/fySafeStudy/initStudy' : url='fyPeaceStudy/fySafeStudy/getAppList';
				
				this.loadingState();
				this.$http.get(url, {
					type:this.type,
					format:this.format,
					rbacToken:this.user.rbacToken,
					pageNo:this.pageNo,
					pageSize:this.pageSize,
					keyWord:this.keyWord
					})
					.then(res => {
						uni.hideLoading();
						if (res.data.success == 1) {
							if(type =="concat"){
								this.appList = this.appList.concat(res.data.data.list);
								uni.hideToast()
							}else{
								this.appList = res.data.data.list;
							}
							this.total = res.data.data.total;
						}else{
							uni.showToast({
								icon:'none',
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
			this.fySafeStudy();
		}
	}
</script>

<style lang="scss">
	.history-section{
		flex:1;
		height:0;
		padding:0 24upx;
	}
	.uni-page-head-search {
		max-width: 70%;
	}

	.title-box {
		flex:1;
		display: flex;
		flex-flow: row nowrap;
		max-height: 100upx;
		min-height: 100upx;
		margin: 0 auto;

	}

</style>
