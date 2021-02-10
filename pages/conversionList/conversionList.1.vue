<template>
	<view class="content ">
		<view class="title-box">
			<pickerSelect class="pick-box" :sel-list="dateList" @btnClick="changeSelect($event)"></pickerSelect>
			<view class="right-side">-{{info.userIntegral}}</view>
		</view>
		<scroll-view class="history-section icon">
			<list-cell-pay v-for="(item, index) in list" 
			:name="item.tradeName"
			:num="item.exchangeIntegral"
			:location = "item.shopAddress"
			:subText = "item.exchangeTime"
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
				dateList: [],
				allNum:0,
				list: [{
					"applyTime": "2019-07-09 18:28",
					"createTime": "2019-07-09 18:28:29",
					"exchangeCount": 1,
					"exchangeIntegral": 60,
					"exchangeTime": "兑换时间",
					"flag": 0,
					"id": "c58c5051eb314dbbb17be03101404cdf",
					"opFlag": "",
					"pageInfo": null,
					"personId": "1",
					"personName": "老李",
					"shopId": "商店id",
					"shopName": "商店名",
					" exchangeType ": "商品类型",
					"status": 1,
					"tradeId": "6bc0e212297943a4b60e8420a7f6a582",
					"tradeName": "商品名",
					"updateTime": "2019-05-01 08:57:57"
				}]
			};
		},
		onReady() {

		},
		onLoad() {
			this.info= this.selListItem;
			this.list = this.selListItem.list;
			let _this = this;
			Array(12).fill("").map((item, idx) => {
				_this.dateList.push(_this._moment().subtract(idx, "months").format("YYYY-M"))
			})
			this.year = _this.dateList[0].split("-")[0];
			this.month = _this.dateList[0].split("-")[1];
			this.getHistoryPageForPersonal();
			

			
		},
		methods: {
			//修改日期
			changeSelect(idx) {
			this.year = this.dateList[idx.selIndex].split("-")[0];
			this.month = this.dateList[idx.selIndex].split("-")[1];
				this.getHistoryPageForPersonal()
			},
			//获取列表
			getHistoryPageForPersonal() {
				this.$http.get('peaceShopManage/exchangeHistory/getHistoryPageForPersonal', {
						rbacToken:this.user.rbacToken,
						month: this.month,
						year: this.year,
					})
					.then(res => {

						//this.TradePage = res.data
					})
			},
		
		}
	}
</script>

<style lang="scss">
	.right-side {
		flex: 1;
		text-align: right;
		font-size:30upx;
	}

	.title-box {
		width: 100%;
		margin: 0 auto;
		height: 60upx;
		line-height: 60upx;
		display: flex;
		flex-flow: row nowrap;

		.pick-box {
			max-width: 30%;
			backgorund: #5eba8f;
			flex: 1;
		}

	}
</style>
