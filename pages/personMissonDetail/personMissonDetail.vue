<template>
	<view class="content no-padding">
		<view class="map-box">
<!-- 						:longitude="polyline[0].longitude"
			:latitude="polyline[0].latitude" -->
			<map id="Gmap"
			class="Gmap"
			:longitude="loc_longitude"
			:latitude="loc_latitude"
			 :include-points="markers" 
			  :polyline="polyline"
			   :markers="markers"
			   scale="15"
			   ></map>
		</view>
		<view class="bottom-box">
			<scroll-view class="detail-box" scroll-y>
				<view class="list-cell-icon">
<!-- 					<view class="left-icon">
						<image class="icon" src="/static/img/icon_integral@2x.png" />
						<view class="num">{{info.peaceCoin}}</view>
					</view> -->
					<view class="cell-tit clamp">
						<view class='title title-1'>
							<text class="title-text overflow-text">{{info.taskName}}</text>
							<view class="pinganbi" >
								<image class="pinganbi-icon" src="/static/_new/wwg_coin@2x.png"></image>
								<view class="pinganbi-text">{{info.peaceCoin}}</view>
							</view>
							<!-- <text class="cell-tip">{{info.hasPeople}}/{{info.maxPeople}}已领</text> -->
							<!-- <text class="cell-tip">参与人数:{{info.hasPeople ? info.hasPeople : 0}}/{{info.maxPeople}}人</text> -->
						</view>
						<!-- <view class='title title-2'>巡防服领取：{{info.placeName}}</view> -->
						<view class='title title-2 color-666'><text class=" text-align-justify sub-title">巡防时间</text><text >{{info.checkStart}} - {{info.checkEnd}}</text></view>
						<view class='title title-2 color-666'><text class=" text-align-justify sub-title">路线长度</text><text >共{{info.taskDistance}}米</text></view>
						<view class='title title-2 color-666'><text class=" text-align-justify sub-title">所属街道</text><text >{{info.publishDepartName}}</text></view>
						<view class='title title-2 color-666'><text class=" text-align-justify sub-title">参与人数</text><text >{{info.hasPeople ? info.hasPeople : 0}}/{{info.maxPeople}}人</text></view>
						<view class="new-middle-line"></view>
						<view class='title title-2 color-666'><text class=" text-align-justify sub-title">起点</text><text >{{begin_address}}</text></view>
						<view class='title title-2 color-666'><text class=" text-align-justify sub-title">终点</text><text >{{end_address}}</text></view>
					</view>

					<!-- 			<text class="cell-more yticon"
							:class="typeList[navigateType]"
						></text> -->
				</view>

			</scroll-view>



			<view class="bottom-btn-box">
				<button class="bottom-float-button left-btn" type="red-border" @click="checkLike">
					{{likeState ? '取消关注' : '关注'}}
				</button>
				<!-- v-if="info.taskType1 == 2 ? false : true"  -->
				<button 
				class="bottom-float-button right-btn " 
				:class="info.canSelctDays.length == 0  ? 'disabled-btn' : 'new-bg-red'" 
				type="red" 
				:disabled="info.canSelctDays.length == 0 ? true : false"
				@click="getCheckTask">领取任务</button>
				<!-- openPop -->
				<!-- getCheckTask  -->
			</view>

		</view>


		<uni-popup ref="popup" type="bottom">
			
			<view class="time-select-box default-item-box">
				<view class="text">选择任务时间</view>
				<view class="main-box">
					 <!-- v-for="(item,index) in filterSelctDays(info.canSelctDays)" -->
				<uni-tag class="tag-item" 
				:class="canSelctDays.indexOf(item)>=0 ? 'uni-tag-red-border' : 'uni-tag-defalut-border' "
				 v-for="(item,index) in info.canSelctDays"
				 inverted 
				 :text="item"
				  @click="changeTag(item,index)"></uni-tag>	
				</view>
				<button
				class="bottom-float-button" 
				type="red" 
				@click="getCheckTask">确定</button>
			</view>
			

		</uni-popup>

	</view>

</template>

<script>
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	import uniTag from "@/components/uni-tag/uni-tag.vue"
	export default {
		components: {
			uniTag,
			uniPopup
		},
		data() {
			return {
				loc_longitude:"",
				loc_latitude:"",
				canSelctDays: [],
				likeState: false,
				begin_address: "",
				end_address: "",
				info: {
					canSelctDays:""
				},
				polyline: [

				],
				markers: []
			}
		},
		onReady() {
			const _this = this;
			
			
			setTimeout(()=>{
				// this.setMap();
			},2000)
			//uniapp上还有这种方法 生成的地图是一样的对象
			// var map = plus.maps.create('Gmap', {
			// 	top:'100px',
			// 	left:'0px',
			// 	width: '100%',
			// 	height: '100%',
			// 	position: 'static'
			// });
			
			
			//获取这个任务的详情
			this.taskId = this.selListItem.taskId;
			// this.taskId = "0191128757ec4afba39dc36e42be2c9f";
			this.getCheckTaskList();
		},
		onShow() {

		},
		onLoad(options) {
			this.likeState = options.likeState ? options.likeState : false;
		},
		methods: {
			
			setMap(){
				this.Gmap = uni.createMapContext('Gmap', this);
				var map =  this.Gmap.$getAppMap();
				
				
				// var routes = new plus.maps.Route(
				// new plus.maps.Point(119.860378,30.464906), 
				// new plus.maps.Point(120.601956,28.947727)
				//  );
				// routes.startPoint=new plus.maps.Point(119.860378,30.464906);
				// routes.endPoint=new plus.maps.Point(120.601956,28.947727);
				// routes.pointCount = 5;
				// routes.pointList = [
				// 	new plus.maps.Point(119.860378,30.464906), 
				// 	new plus.maps.Point(119.943317,30.203905), 
				// 	new plus.maps.Point(120.39925,30.478869), 
				// 	new plus.maps.Point(120.305866,29.685081), 
				// 	new plus.maps.Point(120.601956,28.947727)
				// ];
				// routes.distance = 10000;
				
				
				var routes = new plus.maps.Polyline(
				[
					new plus.maps.Point(119.860378,30.464906),
					new plus.maps.Point(120.601956,28.947727)
					 
				]
				);
				routes.setLineWidth( 20 );
				routes.setStrokeColor( '#8cd89a' );
				
				routes.showDir = true;
				routes.arrowLine = true;
				
				map.addOverlay(routes)
				
				debugger
			},
			filterSelctDays(list){

				let _list = [];
				this.info.canSelctDays && this.info.canSelctDays !='' ? _list=this.info.canSelctDays.split(",") : null;
				return _list;
			},
			//选择时间段
			changeTag(item, index) {
				const _index = this.canSelctDays.indexOf(item);
				if (_index >= 0) {
					this.canSelctDays.splice(_index, 1)
				} else {
					this.canSelctDays.push(item)
				}
			},
			//关注 不关注
			checkLike() {
				this.loadingState();
				//fyVolunteer/fySafeUserTask/insert
				this.$http.get('fyVolunteer/fySafeUserTask/insert', {
						taskId: this.taskId,
						rbacToken: this.user.rbacToken,
						type:1,
					})
					.then(res => {
						uni.hideLoading()
						if (res.data.success == 1) {
							let text = "";
							if (res.data.data == 1) {
								text = "关注成功!"
								this.likeState = true;
							} else {
								this.likeState = false;
								text = "已取消关注!"
							}
							uni.showToast({
								icon: 'success',
								title: text
							});

						} else {
							uni.showToast({
								icon: 'none',
								title: res.data.message
							});
						}

					})
			},
			//初始化数据 地图点位和线
			filterData() {
				let polylines = []
				let _this = this;
				this.info.points.map((item, idx) => {
					if (idx == 0) {
						this.begin_address = item.pointName;
						//如果是第一个图标
						this.markers.push({
							width: 28,
							height: 36.6,
							iconPath: '/static/img/icon_map_start@2x.png',
							longitude: item.longitude,
							latitude: item.latitude
						});
						this.loc_longitude = item.longitude;
						this.loc_latitude = item.latitude;
					} else if (idx == this.info.points.length - 1) {
						//如果是最后一个图标
						this.end_address = item.pointName;
						this.markers.push({
							width: 28,
							height: 36.6,
							iconPath: '/static/img/icon_map_end@2x.png',
							longitude: item.longitude,
							latitude: item.latitude
						})
					} else {


							// // #ifdef APP-PLUS
							// this.Gmap = uni.createMapContext('Gmap',this);
							// const map =  this.Gmap.$getAppMap();
							// var marker=new plus.maps.Marker(new plus.maps.Point(item.longitude,item.latitude));
							// 	marker.setIcon('/static/img/map_green@2x.png');
							// 	marker.setLabel("haha");
							// 	// var bubble = new plus.maps.Bubble("打造最好的HTML5移动开发工具");
							// 	// marker.setBubble(bubble);
							// 	map.addOverlay(marker);
							// debugger
							// // #endif
				
						this.markers.push({
							width: 10,
							height: 10,
							anchor: {
								x: 0.5,
								y: 1
							},
							
							iconPath: '/static/img/map_green@2x.png',
							longitude: item.longitude,
							latitude: item.latitude,
							// callout:{
							// 	content:`第${idx}点`,
							// 	display:'ALWAYS',
							// 	fontSize:16
							// }
							// label:{
							// 	x:item.longitude+1,
							// 	y:item.latitude+1,
							// 	borderWidth:2,
							// 	borderColor:"#8cd89aff",
							// 	borderRadius:50,
							// 	content:"1",
							// 	color:"#8cd89aff",
							// 	fontSize:12,
							// 	bgColor:"#ffffff",
								
							// }
						})
					
					}
					

					if(this.info.ploylineList ==null || this.info.ploylineList == 0){
						
						
						// this.Gmap = uni.createMapContext('Gmap', this);
						// const map =  this.Gmap.$getAppMap();
						// var routeObj = new plus.maps.Route( ptStart, ptEnd );
						
						polylines.push({
							longitude: item.longitude,
							latitude: item.latitude
						})
					}
					
				})

				if(this.info.ploylineList !=null && this.info.ploylineList.length>0){
					this.info.ploylineList.map((item01,idx)=>{
						item01.map((item02,idx)=>{
							item02.points.map((item,idx)=>{
								polylines.push(new plus.maps.Point(item.longitude,item.latitude));
							})
						})
					})
				}
				
				_this.polyline.push({
					width: 20,
					color: "#8cd89aff",
					points: polylines,
					arrowLine:true,
					dottedLine:true
				})

/* 				_this.markers.push({
					width: 30,
					height: 30,
					anchor: {
						x: 0.5,
						y: 0.5
					},
					iconPath: '/static/img/map_people@2x.png',
					longitude: _this.loc_longitude,
					latitude: _this.loc_latitude
				});
 */

			},

			//获取详情
			getCheckTaskList() {
				this.$http.get('fyTaskManage/peaceTaskApp/getCheckTaskById', {
						taskId: this.taskId,
						rbacToken: this.user.rbacToken,
					})
					.then(res => {
						if (res.data.success == 1) {
							//可选择时间
							res.data.data.canSelctDays = res.data.data.canSelctDays && res.data.data.canSelctDays !='' ? res.data.data.canSelctDays.split(",") : [];
							
							this.info = res.data.data;
							this.likeState  = this.info.isAttention  == 1 ? true : false;
							this.canSelctDays = JSON.parse(JSON.stringify(res.data.data.canSelctDays));
							
							// console.log(this.canSelctDays)
							// console.log(this.info)
							this.filterData();
						} else {
							uni.showToast({
								icon: 'none',
								title: res.data.message
							});
						}

					})
			},

			//领取巡防任务
			getCheckTask() {
				this.bolNavTo();
				// //判定时间
				// if(this.canSelctDays == ''){
				// 	uni.showToast({
				// 		icon: 'none',
				// 		title: "请选择任务时间"
				// 	});
				// 	return ;
				// }
				this.loadingState();
				this.$http.post('fyTaskManage/peaceTaskApp/joinCheckTask', {
					taskId: this.taskId,
					rbacToken: this.user.rbacToken,
					taskStart :this.canSelctDays[0]
				}).then(res => {
					uni.hideLoading();
					if (res.data.success == 1) {
						this.info = res.data.data;
						this.navTo(`/pages/success_lingqu/success_lingqu`)
					} else {
						uni.showToast({
							icon: 'none',
							title: res.data.message
						});
					}
				})
			},

			//领取任务时打开弹窗选择时间段
			openPop(){
				if(this.info.canSelctDays !=''){
					this.$refs.popup.open();
				}else{
					this.getCheckTask();
				}
				
			}
		},


	}
</script>

<style lang="scss">
	.sub-title{
		width:120rpx;
		margin-right:15rpx;
		display: inline-block;
	}
	.title-text{
		line-height:40upx;
		display: inline-block;
		width:70%;
	}
	.time-select-box{
		width:100%;
		.main-box{
			float:left;
			margin-bottom:20upx;
			.tag-item {
				font-size: 26upx;
				float: left;
				margin: 10upx 10upx;
				padding: 0 30upx;
			}
		}
		.bottom-float-button{
			float: inherit;
			width:80%;
			margin:0 auto;
			margin-bottom:20upx;
		}
		
	}
	.list-cell-icon {
		box-sizing: initial;
		display: flex;
		position: relative;

		&.cell-hover {
			background: #fafafa;
		}

		.left-icon {
			width: 80upx;
			height: 100upx;
			position: relative;
			/* align-items: center; */
			color: #303133;

			.icon {
				width: 50upx;
				height: 46upx;
				position: absolute;
				left: 50%;
				top: 6%;
				transform: translateX(-50%);
			}

			.num {
				color: #ffdb14;
				line-height: 0;
				position: relative;
				width: 100%;
				top: 70%;
				left: 0;
				text-align: center;
				font-size: $font-sm;
			}

		}

		.cell-icon {
			align-self: center;
			width: 60upx;
			max-height: 60upx;
			font-size: 38upx;
		}

		.cell-more {
			align-self: center;
			font-size: 30upx;
			color: $font-color-base;
			margin-left: $uni-spacing-row-sm;
		}

		.cell-tit {

			line-height: 32upx;
			white-space: pre-wrap;

			.cell-tip {
				line-height:60upx;
				float: right;
				font-size: $font-sm;
				color: $font-color-light;
			}

			.title {}

			.title-1 {
				font-size: $new-font-30;
				margin-bottom: 20rpx;
			}

			.title-2 {
				font-size: $new-font-26;
				line-height:$line-height-40;
		

			}

			flex: 1;
			color: $font-color-dark;
			margin-right: 10upx;
			margin-left: 15upx;
			margin-bottom: 15upx;
		}


	}


	.content {
		display: flex;
		flex-flow: column nowrap;
	}

	.map-box {

		flex: 1;
		width: 100%;
		border: 1px solid #ccc;
		margin: 0 auto;
		position: relative;
	.Gmap {
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

	.bottom-box {
		overflow: hidden;
		flex: 1;
		display: flex;
		flex-flow: column nowrap;
		padding: 30upx;
		max-height: 500upx;

		.detail-box {
			flex: 1;
			height: 75%;
		}

		.bottom-btn-box {
			border-top: 1px solid #eee;
			max-height: 100upx;
			min-height: 100upx;
			padding-top: 20upx;
			flex: 1;
			display: flex;

			.left-btn {
				margin-right: 30upx;

				flex: 1;
			}

			.right-btn {

				max-width: 60%;
				min-width: 60%;
				flex: 1;
			}
		}

	}


</style>
