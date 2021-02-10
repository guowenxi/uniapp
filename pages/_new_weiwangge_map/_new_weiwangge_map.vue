<template>
	<view class="content no-padding">
		<view class="map-box" >
			<map id="Gmap"
			class="Gmap"
			ref="Gmap"
			:scale="10"
			:markers="markers"
			:longitude="longitude"
			:latitude="latitude"
			@markertap="showInfo"
			></map>
		</view>
		<view class="detail-box" v-if="detailBoxState"   @click="selInfo(item)">
			<image class="bg" style="top:auto;bottom:0;height:50%" src="../../static/_new/bg_wei@2x.png"></image>
		<view class="title main-text">

			<text class="title-text" style="margin-left: 0;">{{item.microGridName}}</text>
			<!-- <text class="middle-text">距离18x</text> -->
<!-- 			<view v-if="item.followType ==-1 "  class="right-icon-gz" style="margin-right:0;" @click.stop="guanzhu(item)">关注</view>
			<view v-if="item.followType == 1 " class="right-icon-gz cancel-icon"  @click.stop="guanzhu(item)">
				<image class="wwg_heart" src="/static/_new/wwg_heart@2x.png" ></image>
				已关注
			</view> -->
		</view>
		<view class="middle-line"></view>
		<view class="swiper-content">
			<view  class="left">
				<image class="star position" v-if="item.microGridUserName  !=''"  src="/static/_new/wwg_captain@2x.png"></image>
				<image
				class="img position"
				:src="item.microGridUserFileIds != '' &&  item.microGridUserFileIds != null ? `${baseUrl}fyVolunteer/file/download/${item.microGridUserFileIds}?rbacToken=${rbacToken}` : '/static/_new/wwg_photo_default_s@2x.png'" />
			</view>
			<view class="right">
				<view class="main-text sub">
					<image class="icon" src="/static/_new/wwg_name@2x.png"></image>
					<text class="title-text">{{item.microGridUserName}}</text>
				</view>
<!-- 				<view class="main-text sub">
					<image class="icon" src="/static/_new/wwg_phone@2x.png"></image>
					<text class="title-text">{{item.microGridUserPhone}}</text>
					<view class="right-icon" @click.stop="makePhone(item.microGridUserPhone)">电话</view>
				</view> -->
<!-- 				<view class="main-text sub">
					<image class="icon" src="/static/_new/wwg_VX@2x.png"></image>
					<text class="title-text">{{item.microGridUserWechat}}</text>
				</view> -->
				<view class="main-text sub">
					<image class="icon" src="/static/_new/wwg_range@2x.png"></image>
					<text class="title-text letter-hidden">{{item.microGridAddress}}</text>
				</view>
			</view>
		</view>
	</view>
		
	</view>
</template>

<script>

	export default {
		components: {

		},

		data() {
			return {
				Gmap:"",
				ggMao:"",
				showMap:false,
				detailBoxState:false,
				followType:-1,
				item:{},
				pageNo: 1,
				pageSize: 20,
				start_state:false,
				reloadScrollTop:0,
				total:null,
				hasTeam:0,
				markers:[],
				longitude:this.user.longitude,
				latitude:this.user.latitude,
				distanceScope: "",
				list:[],
				coinScop: "",
				timeScop: "",
				TaskList: [],
				searchOptionText: [],
				searchOptionText_id: [],
				searchOption_active: 0,
				searchOption: [{
						lname: '请选择街道',
						name: '请选择街道',
						id: ''
					},
					{
						lname: '请选择社区/村舍',
						name: '请选择社区/村舍',
						id: ''
					},
					{
						lname: '请选择网格',
						name: '请选择网格',
						id: ''
					},
					{
						lname: '请选择微网格',
						name: '请选择微网格',
						id: ''
					}
				],
				searchOptionId: '',
			};
		},
		onLoad(){

			this.searchOptionText_id = this.user.searchOptionText_id ;
			
			
			//#ifdef APP-PLUS
			this.getLocation();
			//#endif
		
			this.getMyFollowMicrogridList();
			
			
			
			
		},
		onReady() {
			// #ifdef APP-PLUS
			try{
				this.Gmap = uni.createMapContext('Gmap', this)
				this.Gmap.$getAppMap().showUserLocation( true );
				// this.ggMao = this.Gmap.$getAppMap();
			}catch(res){
				
			}
			// #endif
			
		},
		onShow() {	

			
		},
		watch:{
			
		},
		methods: {
			guanzhu(item) {
			
				item.followType = item.followType == 1 ? -1 : 1;
				this.$http.post('fyMicroGridManage/fyFollowType/followMicroGrid', {
						microGridId: item.id,
						followType: item.followType,
						rbacToken: this.user.rbacToken
					})
					.then(res => {
						if (res.data.success == 1) {
							uni.showToast({
								mask: true,
								icon: 'none',
								title: item.followType == 1 ? "关注成功!" : "已取消关注"
							});
							
							if (item.followType == -1) {
								setTimeout(() => {
									//获取列表
									this.getMyFollowMicrogridList();
								}, 2000)
			
							}
						} else {
							this.item.followType = -1;
						}
					})
			},
			//选择一个任务
			selInfo(item) {
				this.navToAndSaveItem(item,'/pages/_new_weiwangge_detail/_new_weiwangge_detail');
				//在此拦截状态详情
			},
			
			changeTitleSearch() {
				this.searchOptionId = "";
				this.$refs.popup_explain.open();
				this.searchOption=[{
						lname: '请选择街道',
						name: '请选择街道',
						id: ''
					},
					{
						lname: '请选择社区/村舍',
						name: '请选择社区/村舍',
						id: ''
					},
					{
						lname: '请选择网格',
						name: '请选择网格',
						id: ''
					},
					{
						lname: '请选择微网格',
						name: '请选择微网格',
						id: ''
					}
				],
				this.searchOptionText = [];
				this.searchOptionText_id=[];
				this.searchOption_active = 0;
				this.getDistrictsByParentIdAndLevel(0);
			},
			//获取村社/网格列表  什么社区啊 街道啊杂七杂八的
			getDistrictsByParentIdAndLevel(idx) {
				if(idx == 3 ){
					this.$http
						.get('fyMicroGridManage/fyMicrogrid/selectMicroGridList', {
							roadId: this.searchOptionText_id[0] ? this.searchOptionText_id[0] : "",
							communityId: this.searchOptionText_id[1] ? this.searchOptionText_id[1] : "",
							gridId: this.searchOptionText_id[2] ? this.searchOptionText_id[2] : "",
							// microGridId: this.user.searchOptionText_id[3] ? this.user.searchOptionText_id[3] : "",
							rbacToken: this.user.rbacToken
						})
						.then(res => {
							uni.hideLoading();
							this.scrolList= res.data.data;
					})
					return ;
				}
				
				let _data = {
					parentId: this.searchOptionId,
					rbacToken: this.user.rbacToken
				}
				idx == 0 ? _data.districtLevel = 4 : "";
				
				this.$http
					.get('fyMicroGridManage/fyDistricts/getDistrictsByParentIdAndLevel', _data)
					.then(res => {
						this.scrolList = res.data.data;
						// if(this.scrolList.length <= 0){
						// 	this.getDistrictsByParentIdAndLevel();
						// }
					});
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
				
				console.log(event);

				this.markers = [];
				this.item = this.TaskList[event.detail.markerId-1];
				this.detailBoxState = true;
				

				
				this.TaskList.map((item,idx)=>{
					this.markers.push({
						id:idx+1,
						iconPath: idx+1 ==  event.detail.markerId ? '/static/_new/location@3x.png'  : '/static/_new/location@2x.png',
						longitude: item.longitude ? item.longitude : "",
						latitude: item.latitude ? item.latitude : ""
					})
				})


				// const idx = event.detail.markerId;
				// this.navToAndSaveItem(this.TaskList[idx],"/pages/personMissonDetail/personMissonDetail")
			},
			setMarkers(){
				
				
				
				this.markers = [];
				this.TaskList.map((item,idx)=>{
					this.markers.push({
						id:idx+1,
						iconPath:'/static/_new/location@2x.png',
						// iconPath:'/static/img/icon_map_task_full@2x.png',
						longitude: item.longitude ? item.longitude : "",
						latitude: item.latitude ? item.latitude : ""
					})
				})
				
				
				// #ifdef APP-PLUS
				const map =  this.Gmap.$getAppMap();
				
				
				// this.list.map((item,idx)=>{
				// 	marker=new plus.maps.Marker(new plus.maps.Point(120.699312,27.994051));
				// 	marker.setIcon("/static/_new/location@2x.png");
				// 	// this.markers.push(marker)
				// 	map.addOverlay(marker);
				// })
				
				
				// 	var marker=new plus.maps.Marker(new plus.maps.Point(120.699312,27.994051));
				// 	marker.setIcon("/static/_new/location@2x.png");
				// 	map.addOverlay(marker);
				// 	var marker=new plus.maps.Marker(new plus.maps.Point(120.622312,27.99443));
				// 	marker.setIcon("/static/img/icon_map_task_full@2x.png");
				// 	map.addOverlay(marker);
				
				// #endif	
				
			},
			
			//获取网格
			getMyFollowMicrogridList(type) {
				this.loadingState();
				this.$http.get('fyMicroGridManage/fyMicrogrid/getMyFollowMicrogridList', {
						longitude : this.longitude,
						latitude : this.latitude,
						pageNo: this.pageNo,
						pageSize: this.pageSize,
						rbacToken: this.user.rbacToken,
						roadId: this.searchOptionText_id[0] ? this.searchOptionText_id[0] : "",
						communityId: this.searchOptionText_id[1] ? this.searchOptionText_id[1] : "",
						gridId: this.searchOptionText_id[2] ? this.searchOptionText_id[2] : "",
						microGridId: this.searchOptionText_id[3] ? this.searchOptionText_id[3] : "",
						
					})
					.then(res => {
						uni.hideLoading();
						if (res.data.success == 1) {
							this.TaskList = res.data.data.list;

							this.setMarkers();
							this.total = res.data.data.total;
						} else {
							uni.showToast({
								icon: 'none',
								title: res.data.message
							});
						}
					});
			},
			
		},
	}
</script>

<style lang="scss">
	.detail-box{
		flex:1;
		width: 100%;
		min-height:280rpx;
		max-height: 280rpx;
		position: relative;
	}
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
	
	.detail-box{
		padding:20rpx 50rpx;
		.cancel-icon{
			box-shadow: none !important;
			background: #f6f6f6 !important;
			color:#333 !important;
			width: 160rpx !important;
			.wwg_heart{
				margin-top: -5rpx;
				margin-right: 10rpx;
				position: relative;
				top:41%;
				transform: translateY(-50%);
				display: inline-block;
				width:26rpx;
				height:23rpx;
				
			}
		}
		.middle-line {
			margin-top: 12rpx;
			width: 100%;
			height: 1rpx;
			background-color: #f0f0f0;
			opacity: 0.4;
		}
		.right-icon-gz{
			font-size:$new-font-22;
			position: relative;
			top: 50%;
			transform: translateY(-50%);
			color: #fff;
			text-align: center;
			float: right;
			width: 80rpx;
			height: 36rpx;
			background-image: linear-gradient(-90deg, #e32417 0%, #ff7352 100%), linear-gradient(#e32417, #e32417);
			background-blend-mode: normal, normal;
			box-shadow: 0rpx 3rpx 18rpx 0rpx rgba(227, 36, 23, 0.2);
			border-radius: 18rpx;
		}
		.main-text {
			margin-top:14rpx;
			width: 100%;
			height: 36rpx;
			.icon {
				float: left;
				position: relative;
				top: 50%;
				transform: translateY(-50%);
				width: 21rpx;
				height: 16rpx;
			}
			.title-text {
				margin-left: 12rpx;
				font-size: 28rpx;
				line-height: 36rpx;
				color: #333;
			}
			.middle-text {
				margin-left: 12rpx;
				font-size: 22rpx;
				line-height: 36rpx;
				color: #b7b7b7;
			}
			.right-icon {
				// margin-right: 100rpx;
				text-align: center;
				float: right;
				width: 80rpx;
				height: 36rpx;
				line-height: 30rpx;
		
				border-radius: 18rpx;
			}
		}
		.swiper-content {
			display: flex;
			flex-flow: row nowrap;
			.left {
				overflow: hidden;
				border-radius: 6rpx;
				margin-top: 19rpx;
				margin-left: 4rpx;
				margin-right: 14rpx;
				position: relative;
				max-width: 110rpx;
				min-width: 110rpx;
				height: 148rpx;
				.position {
					position: absolute;
					width: 100%;
					height: 100%;
					left: 0;
					right: 0;
				}
				.star {
					z-index: 11;
					width: 29rpx;
					height: 30rpx;
				}
			}
			.right {
				margin-top: 15rpx;
				flex: 1;
				overflow: hidden;
				display: flex;
				flex-flow: column nowrap;
				.sub {
					.icon {
						width: 22rpx;
						height: 22rpx;
					}
					.right-icon {
						color: #00c52f;
						text-align: center;
						float: right;
						width: 80rpx;
						height: 36rpx;
						background-color: #ffffff;
						border-radius: 18rpx;
						border: solid 1rpx #00c52f;
					}
				}
			}
		}
	}
</style>
