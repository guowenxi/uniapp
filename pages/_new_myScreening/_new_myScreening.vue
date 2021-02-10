<template>
	<view class="content no-padding">
		<view class="title-box">
			<view class="new-title-box " >
				<view class="tab">
					<new-wuc-tab :tab-list="tabList" :tabCur.sync="TabCur" @change="tabChange"></new-wuc-tab>
				</view>
			</view>
			<new-menu-select class="pick-box" :selList="[levelList]" keyName="grade_name"
			modal="absolute"
				 queryName="grade_name" valName="state" @btnClick="changeSelect($event)"></new-menu-select>
				 

<!-- 			<menu-select class="pick-box"
			 :selList="[levelList,stateList]" 
			 keyName="grade_name,sub_name"
			 queryName="grade_name,sub_name"
			 valName="state,state"
			  @btnClick="changeSelect($event)"
			  ></menu-select> -->
			 
<!-- 			<picker-select class="pick-box" :sel-list="levelList" keyName="grade_name" @btnClick="changeSelect($event,'grade_name')"></picker-select> -->
	<!-- 		<pickerSelect class="pick-box" :sel-list="stateList" keyName="sub_name" @btnClick="changeSelect($event,'sub_name')"></pickerSelect> -->
		</view>
		<scroll-view class="history-section" scroll-y  @scrolltolower="getmoreData()">
			<image v-if="Number(total) === 0  ? true : false" class="prompt_img" src="/static/img/prompt_blank@2x.png" ></image>
			<new-list-cell-item
			 v-for="(item,index) in list"
			 :item = "item"
			 @eventClick="navToAndSaveItem(item,'/pages/_new_screeningDetail/_new_screeningDetail')"></new-list-cell-item>
		</scroll-view>
	</view>
</template>
<script>
		import newListCellItem from '@/components/_new-list-cell-item.vue';
		import pickerSelect from '@/components/pickerSelect.vue';
		import menuSelect from '@/components/menu-select.vue';
			import newWucTab from '@/components/_new-wuc-tab/_new-wuc-tab';
				import newMenuSelect from '@/components/_new-menu-select.vue';
	import {
		mapState
	} from 'vuex';
	export default {
		components: {
			menuSelect,
			pickerSelect,
			newListCellItem,
			newWucTab,
			newMenuSelect
		},
		data() {
			return {
				tabList: [{
						name: '全部',
						key: 1
					},
					{
						name: '待审核',
						key: 2
					},
					{
						name: '已审核',
						key: 3
					}
				],
				total:null,
				pageNo:1,
				pageSize:20,
				TabCur: 0,
				grade_name:"",
				sub_name:"",
				 levelList: [
					 {grade_name:"全部",state:""},
				 ],
				 stateList: [
					 {sub_name:"全部",state:""},
					 {sub_name:"待审核",state:1},
					 {sub_name:"已审核",state:2}
				 ],
				moving: false,
				list: [
					
				]
			}
		},
		onShow() {
			// try{
			// 	const subNVue = uni.getSubNVueById('popup')
			// 	// 打开 nvue 子窗体  
			// 	subNVue.show('fade-in', 300, function(){  
			// 		debugger
			// 	    // 打开后进行一些操作...  
			// 	    //   
			// 	});  

			// }catch(e){
				
			// 	// 关闭 nvue 子窗体
			// 	subNVue.hide('fade-out', 300)
			// 	//TODO handle the exception
			// }

			
			this.getProType();
			this.getProHandleListByKey();
		},
		computed: {},
		methods: {
			tabChange(index) {
				
				this.TabCur = index;
			
				this.pageNo = 1;
				this.showMore = false;
				this.sub_name = index == 0 ? '' : index ;
			
				this.getProHandleListByKey();
				
				
			},
			
			
			changepage(item){
				
			
				this.navToAndSaveItem(item,
				item.list.slice(-1)[0] == '已上报' ?
				'/pages/troubleReportChange/troubleReportChange':
				'/pages/_new_screeningDetail/_new_screeningDetail' 
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
				
				
				this.getProHandleListByKey("concat")
				
			},
			
			//修改选择框
			changeSelect(idx) {
				
				switch(idx.type){
					case "grade_name":
					if(this.levelList[idx.selIndex].grade_name == "全部"){
						this[idx.type] = "";
					}else{
						this[idx.type] = this.levelList[idx.selIndex].grade_name ;
					}

					break;
					case "sub_name":
					if(this.stateList[idx.selIndex].sub_name == "全部"){
						this[idx.type] = "";
					}else{
						// this[type] = this.stateList[idx.selIndex].sub_name ;
						this[idx.type] = this.stateList[idx.selIndex].state ;
					}
					break;
				}
				this.pageNo = 1;
				this.showMore = false;
				
				
				this.getProHandleListByKey();
				
			},
			
			getProType() {
				 this.$http.get('fyProHandle/proHandle/getProType', {
					type:2,
					rbacToken:this.user.rbacToken,

					})
					.then(res => {
						if (res.data.success == 1) {
							
							this.levelList = res.data.data;
							this.levelList.unshift({grade_name:"全部",state:""})
						} else {
							uni.showToast({
								icon: 'none',
								title: res.data.message
							});
						}
					})
			},
			getProHandleListByKey(type) {
				this.loadingState();
				this.$http.get('fyProHandle/proHandle/getProHandleListByKey', {
					pageNo: this.pageNo,
					pageSize: this.pageSize,
					gradeName:this.grade_name,
					// subName:this.sub_name,
					state:this.sub_name,
					rbacToken:this.user.rbacToken,
					p:""
					})
					.then(res => {
						uni.hideLoading()
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
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index = e.target.value
			},

			
		}
	}
</script>

<style lang='scss'>
	
		.icon-1{
		background: #e32417;
	}
	.icon-2{
		background: #ffa800;
	}
	.icon-3{
		background: #cecece;
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


.title-box{

	background: #fff;
	flex:1;
	width:100%;
	max-height:90upx;
	min-height:90upx;
	display: flex;
	flex-flow:row nowrap;
	.pick-box{
		height:90upx;
		position: relative;
		line-height:90upx;
		flex:1;
	}
	
	.new-title-box{
		max-width:71%;
		min-width: 71%;
		background: #f6f6f6;
		min-height:90rpx;
		max-height:90rpx;
		
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
