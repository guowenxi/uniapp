<template>
	<view class="content">
		<scroll-view class="history-section icon" scroll-y @scrolltolower="getmoreData()">
			<list-cell-answer
			v-for="(item,index) in Questionnaire" 
			:item="item"
			@eventClick="showInfo(item,'/pages/teachInfoList/teachInfoList')"
			></list-cell-answer>
		</scroll-view>
	</view>
</template>

<script>
	import listCellAnswer from "@/components/list-cell-answer.vue"

	export default {
		components: {
			listCellAnswer
		},
		data() {
			return {
				pageNo:1,
				pageSize:20,
				keyWord:"",
				Questionnaire: []
			};
		},
		onLoad(){
			this.fySafeQuestionnaire();
		},
		methods: {
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
				
				
				this.fySafeQuestionnaire("concat")
				
			},
			//获取问答
			fySafeQuestionnaire(type) {
				this.$http.get('fyPeaceStudy/fySafeQuestionnaire/getAppList', {
					rbacToken:this.user.rbacToken,
					pageNo:'1',
					pageSize:"20"
					})
					.then(res => {
						if (res.data.success == 1) {
							if(type =="concat"){
								this.Questionnaire = this.Questionnaire.concat(res.data.data.list);
								uni.hideToast()
							}else{
								this.Questionnaire = res.data.data.list;
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
			this.fySafeQuestionnaire();
		}
	}
</script>

<style lang="scss">
	.uni-page-head-search {
		max-width: 70%;
	}

	.title-box {
		display: flex;
		flex-flow: row nowrap;
		height: 60upx;
		margin: 0 auto;
	}
</style>
