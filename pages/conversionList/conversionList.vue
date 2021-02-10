<template>
	<view class="content ">
		<view class="title-box">
			<pickerSelect class="pick-box" :sel-list="dateList" keyName="name" @btnClick="changeSelect($event)"></pickerSelect>
			<view class="right-side">-{{info.integralSum}}</view>
		</view>
		<scroll-view class="history-section"  @scrolltolower="getmoreData()">
			<list-cell-pay v-for="(item, index) in list" 
			:item="item"
			></list-cell-pay>
		</scroll-view>
	</view>
</template>

<script>
	import listCellPay from '@/components/list-cell-pay';
	import pickerSelect from '@/components/pickerSelect.vue';
	export default {
		components: {
			pickerSelect,
			listCellPay
		},

		data() {
			return {
				info:[],
				selIndex: 0,
				dateList: [
					{name:"全部",val:'',},
					{name:"本季度",val:'s',},
					{name:"本月",val:'m',},
					{name:"本周",val:'w',},
				],

				allNum:0,
				list: [
					
				]
			};
		},
		onReady() {

		},
		onUnload(){
			uni.hideKeyboard();
		},
		onLoad() {
			this.info= this.selListItem;
			this.list = this.selListItem.list;
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
				
				
				this.getTradePageForApp("concat")
				
			},
			
			//修改日期
			changeSelect(idx) {
				
				this.getHistoryPageForPersonal(idx.selIndex)
			},
			//获取列表
			getHistoryPageForPersonal(idx) {
				this.$http.get('peaceShopManage/exchangeHistory/getHistoryPageForPersonal', {
						rbacToken:this.user.rbacToken,
						d:this.date[idx].val,
						
					})
					.then(res => {
						if(res.data.success === 1){
							if(type =="concat"){
								this.list = this.list.concat(res.data.data.list);
								uni.hideToast()
							}else{
								this.list = res.data.data.list;
							}
							this.total = res.data.data.total;
							uni.hideToast();
						}else{
							uni.showToast({
								mask:true,
								icon:'none',
								title: res.data.message
							});
						}
					})
			},
		
		}
	}
</script>

<style lang="scss">
	.right-side {
		flex: 1;
		text-align: right;
		font-size:40upx;
		line-height:70upx;
		height:70upx;
	}

	.title-box {
		width: 100%;
		margin: 0 auto;
		height: 60upx;
		line-height: 60upx;
		display: flex;
		flex-flow: row nowrap;
		.pick-box {
			height:70upx;
			max-width:250upx;
			min-width:250upx;
			background: #eee;
			border-radius: 10upx;
			flex: 1;
			.pick-item{
				width:100upx;
			}
			.pick-input{
				width:100upx;
			}
		}

	}
</style>
