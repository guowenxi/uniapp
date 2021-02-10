<template>
	<view class="content">
		<view class="tj-sction">
			<image class="bg" src="/static/img/List_bg@2x.png" style="height:120%;"></image>
			<view class="tj-item">
				<view class="title">我的平安币</view>
				<view class="num">{{personalCount.integral}}</view>
			</view>
			<view class="middle-line"></view>
			<view class="tj-item" @click="navTo('/pages/conversionList/conversionList')">
				<view class="title">兑换次数</view>
				<view class="num">{{personalCount.selfCount}}</view>
			</view>
		</view>
		<sub-line-text class="margin-line" icon text="热门推荐"></sub-line-text>
		<scroll-view scroll-x class="slider-bar">
			<view :style="{width:wrapBoxWidth}">
				<!-- <view style="width:2000px"> -->
				<view class="slider-item" v-for="(item,index) in TradePage_hot" @click="navTo('/pages/conversionPhone/conversionPhone')">
					<image class="bg" :src="bgColorList[parseInt(bgColorList.length*Math.random())]"></image>
					<view class="title">所需平安币</view>
					<view class="number">{{item.tradeIntegral}}</view>
					<view class="text">{{item.tradeName}}</view>
				</view>
			</view>
		</scroll-view>
		<sub-line-text class="margin-line" text="其他推荐"></sub-line-text>
		<view class="title-box">
			<!-- <picker-select class="pick-box" :sel-list="selectCate" :sel-index="selIndex"></picker-select> -->
			<pickerSelect class="pick-box" keyName="name" :sel-list="selectCate_jfien" @btnClick="changeSelect($event,'exchangeCount')"></pickerSelect>
			<pickerSelect class="pick-box" keyName="name" :sel-list="selectCate_redu" @btnClick="changeSelect($event,'tradeIntegral')"></pickerSelect>
		</view>
		<scroll-view scroll-y class="mall-bar" @scrolltolower="getmoreData()">
			<list-cell-mall v-for="(item, index) in TradePage" @btnClick="navToAndSaveItem(item,'/pages/conversionCommodity/conversionCommodity')"
			 :name="item.shopName" :num="item.exchangeCount" :image="item.tradeImage"></list-cell-mall>

		</scroll-view>

	</view>
</template>

<script>
	import pickerSelect from '@/components/pickerSelect.vue';
	import subLineText from '@/components/sub-line-text.vue';
	import listCellMall from '@/components/list-cell-mall.vue';
	export default {
		components: {
			listCellMall,
			pickerSelect,
			subLineText
		},
		data() {
			return {
				pageNo:1,
				pageSize:20,
				wrapBoxWidth: "",
				exchangeCount: 0,
				tradeIntegral: 0,
				// selectCate: ['全部','积分', '兑换次数', '创建时间'],
				selectCate_jfien: [
					{name:'积分从高到低'},
					{name:'积分从低到高'},
					],
				selectCate_redu: [
					{name:'热度从高到低'},
					{name:'热度从低到高'},
					],
				bgColorList: [
					"/static/img/shop_bg_1.png",
					"/static/img/shop_bg_2.png",
					"/static/img/shop_bg_3.png",
					"/static/img/shop_bg_4.png",
				],
				personalCount: {
					Integral: "",
					selfCount: ""	
				},
				TradePage_hot:[],
				TradePage: [
					
				]
			};
		},
		onShow() {
			//this.wrapBoxWidth = uni.upx2px(this.TradePage_hot.length * 230) + 'px';
			this.getPersonalCount()
			this.getTradePageForApp()
			this.getTradePageForApp_hot()
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
			
			changeSelect(e, type) {
				this[type] = e.selIndex;
				this.pageNo = 1;
				this.showMore = false;
				this.getTradePageForApp();
			},
			//获取热门商品
			getTradePageForApp_hot() {

				this.$http.get('peaceShopManage/tradeInfo/getTradePageForApp', {
						pageNo: '1',
						pageSize: '5',
						keyWords: '',
						exchangeCount: '1',
					})
					.then(res => {
						if(res.data.success === 1){
						 this.TradePage_hot = res.data.data.list;
						this.wrapBoxWidth = uni.upx2px(this.TradePage_hot.length * 230) + 'px';
						}else{
							uni.showToast({
								mask:true,
								icon:'none',
								title: res.data.message
							});
						}

					})
			},
			//获取列表
			getTradePageForApp(type) {

				this.$http.get('peaceShopManage/tradeInfo/getTradePageForApp', {
						pageNo: this.pageNo,
						pageSize: this.pageSize,
						keyWords: '',
						exchangeCount: this.exchangeCount,
						tradeIntegral: this.tradeIntegral,
					})
					.then(res => {
						if(res.data.success === 1){
							if(type =="concat"){
								this.TradePage = this.TradePage.concat(res.data.data.list);
								uni.hideToast()
							}else{
								this.TradePage = res.data.data.list;
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
			//个人平安币和兑换次数统计
			getPersonalCount() {
				this.$http.get('peaceShopManage/exchangeHistory/getPersonalCount', {
						rbacToken: this.user.rbacToken
					})
					.then(res => {
						if(res.data.success === 1){
							this.personalCount = res.data.data;
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
				overflow: hidden;
				white-space: nowrap;
      text-overflow: ellipsis;
				background: rgba(0, 0, 0, 0.3);
				position: relative;
				z-index: 10;
				font-size: 16upx;
				width: 100%;
			}
		}
	}

	.tj-sction {
		overflow: hidden;
		background-size: 100%;
		margin: 0 40upx;
		padding: 40upx;
		border-radius: 10upx;
		max-height: 200upx;
		min-height: 200upx;
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
			left: 50%;
			top: 50%;
			transform: translateY(-50%);
			background: #fff;
		}

		.tj-item {
			position: relative;
			z-index: 10;
			text-align: center;
			flex: 1;
		}

		.title {
			font-size: 28upx;
			margin-bottom: 22upx;
		}

		.num {
			font-size: 48upx;
		}
	}

	.title-box {
		width: 80%;
		margin: 0 auto;
		height: 60upx;
		display: flex;
		flex-flow: row nowrap;

		.pick-box {
			backgorund: #5eba8f;
			flex: 1;
		}

	}
</style>
