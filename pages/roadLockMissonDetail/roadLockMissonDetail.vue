<template>

	<view class="content no-padding">
		<view class="map-box">
			<!-- 						:longitude="polyline[0].longitude"
			:latitude="polyline[0].latitude" -->
			<map class="Gmap" id="Gmap" :longitude="loc_longitude" :latitude="loc_latitude" :include-points="markers" :polyline="polyline" :markers="markers"></map>
		</view>
		<view class="bottom-box">
			<scroll-view class="detail-box" scroll-y>
				<view class="list-cell-icon">
					<!-- 					<view class="left-icon">
						<image class="icon" src="/static/img/icon_integral@2x.png" />
						<view class="num">{{info.peaceCoin}}</view>
					</view> -->
					<view class="cell-tit clamp">
						<view class="title title-1">
							<text class="title-text overflow-text">{{ info.taskName }}</text>
							<!-- <text class="cell-tip">{{info.hasPeople}}/{{info.maxPeople}}已领</text> -->
							<text class="cell-tip">{{ info.hasPeople ? info.hasPeople : 0 }}/{{ info.taskPeopleNum }}已领</text>
						</view>
						<!-- <view class='title title-2'>巡防服领取：{{info.placeName}}</view> -->
						<view class="title title-2">
							任务时间：

							<!-- <text>{{info.checkDate.split(" ")[0].split("-")[1]}}月{{info.checkDate.split(" ")[0].split("-")[2]}}日</text> -->
							
							<text>{{ info.taskScheduleStr }}</text>
							<!-- 						<view style="margin-top:5px;">
							<text style="padding:0 5px;" class="font-gray" v-for="(item,index) in info.taskScheduleList">{{item.checkStart}} - {{item.checkEnd}} </text>
						</view> -->
						</view>
						<view class="title title-2">
							志愿服务点位置：
							<text class="font-gray">{{ info.address }}</text>
						</view>
						<view class="title title-2">
							平安币：
							<text class="font-gray">{{ `每小时${info.peaceCoin}个平安币` }}</text>
						</view>
						<!-- 						<view v-for="(item,index) in info.taskAdminList" style="margin-top:10px">
							<text>{{`${index == 0 ? '队长' : '管理员'}`}}:  {{item.name}} {{item.phone}}</text>
						</view> -->
					</view>

					<!-- 			<text class="cell-more yticon"
							:class="typeList[navigateType]"
						></text> -->
				</view>

				<view class="time-select-box default-item-box">
					
					<view class="text">选择任务时间</view>
					<view class="main-box" v-for="(time,idx) in filterTimeDataList">
						<view class="left-title">{{time.checkDate.split(" ")[0].split("-")[1]}}月{{time.checkDate.split(" ")[0].split("-")[2]}}日</view>
						<tag
							class="tag-item"
							:class="item.isReceive == 0 ? 'uni-tag-red-border-disabled' : checkfilterTimeData.indexOf(item.id)>=0 ? 'uni-tag-red-border' : 'uni-tag-defalut-border'"
							v-for="(item, index) in time.list"
							:text="`${item.checkStart} - ${item.checkEnd}`"
							@click="changeTag(item, index)"
						></tag>
					</view>
					
				</view>
				
			</scroll-view>

			<view class="bottom-btn-box"><button class="bottom-float-button new-bg-red" type="red" @click="getCheckTask">领取任务</button></view>
			<!-- <view class="bottom-btn-box"><button class="bottom-float-button " type="red" @click="openPop">领取任务</button></view> -->
		</view>

		<uni-popup ref="popup_explain">
			<view class="time-select-box default-item-box" style="height:auto;">
				<view>
					<!-- <image class="left-icon" src="/static/img/icon_warning@2x.png"></image> -->
					<view class="title font-red">任务说明</view>
					<view class="text" style="text-indent: 30px;">在村（社区）服务站点，协助工作人员开展测量体温、查看健康码、维持出入秩序、防疫知识宣传等工作。</view>
				</view>

				<view class="bottom-btn-box"><button style="margin-top:30px;" class="bottom-float-button new-bg-red" type="red" @click="popClose">确定</button></view>
			</view>
		</uni-popup>
		
		
	</view>
</template>

<script>
import uniPopup from '@/components/uni-popup/uni-popup.vue';
import tag from '@/components/tag/tag.vue';
export default {
	components: {
		tag,
		uniPopup
	},
	data() {
		return {
			tishiState:true,
			checkfilterTimeDataList:[],
			checkfilterTimeData:[],
			filterTimeDataList: [],
			loc_longitude: '',
			loc_latitude: '',
			taskScheduleList: [],
			likeState: false,
			begin_address: '',
			end_address: '',
			info: {
				taskScheduleList: [
					// {checkStart:"00:00",checkEnd:"22:00",id:1},
					// {checkStart:"33:00",checkEnd:"32:00",id:2},
				]
			},
			polyline: [],
			markers: []
		};
	},
	onReady() {

		const _this = this;
		this.Gmap = uni.createMapContext('Gmap', this);
		//获取这个任务的详情
		this.taskId = this.selListItem.taskId;
		this.getCheckTaskList();

		// this.$refs.popup_explain.open();
	},
	onShow() {
		uni.getSubNVueById('popup').hide('auto',0);
		uni.getSubNVueById('innerBox').hide('auto',0);
		uni.getSubNVueById('lingquBox').hide('auto',0);
	},
	onLoad(options) {	

		this.likeState = options.likeState ? options.likeState : false;
	},
	onUnload(){
		//移除所有监听
		uni.$off();
	},
	methods: {
		tishiClose(){
			this.tishiState=false;
		},
		tishiOpen(){
			this.tishiState=true;
		},
		popClose() {
			this.$refs.popup_explain.close();
		},
		filterSelctDays(list) {
			let _list = [];
			this.info.canSelctDays && this.info.canSelctDays != '' ? (_list = this.info.canSelctDays.split(',')) : null;
			return _list;
		},
		//选择时间段
		changeTag(item, index) {
			
			if(item.isReceive == 0){
				return;
			}
			const _index = this.checkfilterTimeData.indexOf(item.id);
			_index>=0? this.checkfilterTimeData.splice(_index,1)  :this.checkfilterTimeData.push(item.id);
			_index>=0? this.checkfilterTimeDataList.splice(_index,1)  :this.checkfilterTimeDataList.push(item);

		},
		//关注 不关注
		checkLike() {
			this.loadingState();
			//fyVolunteer/fySafeUserTask/insert
			this.$http
				.get('fyVolunteer/fySafeUserTask/insert', {
					taskId: this.taskId,
					rbacToken: this.user.rbacToken,
					type: 1
				})
				.then(res => {
					uni.hideLoading();
					if (res.data.success == 1) {
						let text = '';
						if (res.data.data == 1) {
							text = '关注成功!';
							this.likeState = true;
						} else {
							this.likeState = false;
							text = '已取消关注!';
						}
						uni.showToast({
							icon: 'none',
							title: text
						});
					} else {
						uni.showToast({
							icon: 'none',
							title: res.data.message
						});
					}
				});
		},
		//初始化数据 地图点位和线
		filterData() {
			let polylines = [];
			let _this = this;

			this.markers.push({
				width: 28,
				height: 36.6,
				// iconPath: '/static/img/icon_map_start@2x.png',
				iconPath: '/static/img/kadian.png',
				longitude: this.info.longitude,
				latitude: this.info.latitude
			});

			/* 				this.info.points.map((item, idx) => {
					if (idx == 0) {
						this.begin_address = item.pointName;
						//如果是第一个图标
						this.markers.push({
							width: 28,
							height: 36.6,
							// iconPath: '/static/img/icon_map_start@2x.png',
							iconPath: '/static/img/kadian.png',
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
							// 
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
						polylines.push({
							longitude: item.longitude,
							latitude: item.latitude
						})
					}
					
				})
 */
			// if(this.info.ploylineList !=null && this.info.ploylineList.length>0){
			// 	this.info.ploylineList.map((item01,idx)=>{
			// 		item01.map((item02,idx)=>{
			// 			item02.points.map((item,idx)=>{
			// 				polylines.push(new plus.maps.Point(item.longitude,item.latitude));
			// 			})
			// 		})
			// 	})
			// }

			// _this.polyline.push({
			// 	width: 20,
			// 	color: "#8cd89aff",
			// 	points: polylines,
			// 	arrowLine:true
			// })

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
			this.$http
				.get('fyTaskManage/peaceTaskApp/getCheckTaskById', {
					taskId: this.taskId,
					taskType: 2,
					rbacToken: this.user.rbacToken
				})
				.then(res => {
					if (res.data.success == 1) {
						//可选择时间
						
						
						this.info = res.data.data;
						this.loc_longitude = this.info.longitude;
						this.loc_latitude = this.info.latitude;

						this.likeState = this.info.isAttention == 1 ? true : false;
						// this.info.taskScheduleList= [
						// 	{checkStart:"00:00",checkEnd:"22:00",id:1,isReceive:0,},
						// 	{checkStart:"33:00",checkEnd:"32:00",id:2,isReceive:1,},
						// ]
						// console.log(this.canSelctDays)
						// console.log(this.info)
						this.filterData();
						this.filterTimeData(this.info);
					} else {
						uni.showToast({
							icon: 'none',
							title: res.data.message
						});
					}
				});
		},
		//过滤时间段数据
		filterTimeData(data) {
			let _arr = [];
			data.taskScheduleList.map((item, idx) => {
				//先定义空值
				_arr.push(item.checkDate)
			})
			//去重
			let _list = [] ;
			const filter_list = Array.from(new Set(_arr))
			filter_list.map((item, idx) => {
				_list[idx]={};
				_list[idx].list=[];
				_list[idx].checkDate=item;
				data.taskScheduleList.map((time, _idx) => {

					if (_list[idx].checkDate == time.checkDate) {
						_list[idx].list.push({
							checkDate: item,
							checkStart: time.checkStart,
							checkEnd: time.checkEnd,
							id: time.id,
							isReceive:time.isReceive
						});
					}
				});
			});

			this.filterTimeDataList = _list;
		},

		//领取巡防任务
		getCheckTask() {
			//记得把这里打开
			// if(true){
			// 	uni.getSubNVueById('popup').show('auto',200);
			// 	uni.getSubNVueById('lingquBox').show('auto',200);
				
			// 	// uni.getSubNVueById('popup').show('auto',200);
			// 	// uni.getSubNVueById('innerBox').show('auto',200,()=>{
			// 	// 	console.log("发送啦")
			// 	// 	uni.$emit('innerBox', {
			// 	// 		title:"123",
			// 	// 		time:"5555",
			// 	// 	});
			// 	// });
			// 	return;
			// }


			// this.bolNavTo();
			// //判定时间
			if (this.checkfilterTimeData.length==0) {
				uni.showToast({
					icon: 'none',
					title: '请选择任务时间'
				});
				return;
			}
			this.loadingState();
			
			this.$http
				.post('fyTaskManage/peaceTaskApp/joinCheckTasks', {
					taskId: this.taskId,
					rbacToken: this.user.rbacToken,
					taskScheduleIds: this.checkfilterTimeData.join(",")
				})
				.then(res => {
					uni.hideLoading();
					if (res.data.success == 1) {
						// this.info = res.data.data;
						//新的逻辑 非常无奈
						uni.getSubNVueById('popup').show('auto',200);
						uni.getSubNVueById('lingquBox').show('auto',200);
						// this.navTo(`/pages/roadLock_success_lingqu/roadLock_success_lingqu`);
					} else {
						uni.showToast({
							icon: 'none',
							title: res.data.message
						});
					}
				});
		},

		//领取任务时打开弹窗选择时间段
		openPop() {
			if (this.info.taskScheduleList != '') {
				this.$refs.popup.open();
			} else {
				this.getCheckTask();
			}
		}
	}
};
</script>

<style lang="scss">
.tishi{
	.portrait{
		position: absolute;
		left:50%;
		top:50%;
		transform: translate(-50%,-50%);
		width:300upx;
		height:300upx;
		z-index:1000;
		
	}
	.inner-img{
		width: 100%;
		flex:1;
	}
	.text-view{
		margin-bottom: 10upx;
		width: 100%;
		min-height:30upx;
		max-height:30upx;
		color:#fff;
	}
	.close-btn{
		position: absolute;
		right:-0upx;
		top:-40upx;
		
		width:60upx;
		height:60upx;
	}
	position: fixed;
	width: 100%;
	height: 100%;
	left: 0;
	top: 0;
	right:0;
	bottom: var(--window-bottom) ;
	background: rgba(0,0,0,0.5);
	z-index:100000;
	

	
}

.title-text {
	line-height: 60upx;
	display: inline-block;
	width: 65%;
}
.time-select-box {
	width: 100%;
	.main-box {
		width: 100%;
		float: left;
		margin-bottom: 20upx;
		.left-title{
			font-weight: bold;
			min-width: 120upx;
			max-width: 120upx;
			font-size: 26upx;
			line-height: 58upx;;
		}
		.tag-item {
			background: #fff;
			border:none;
			margin:10upx;
			font-size: 26upx;
			float: left;
			padding: 0px 0upx;
			text-align: center;
		}
	}
	.bottom-float-button {
		float: inherit;
		width: 80%;
		margin: 0 auto;
		margin-bottom: 20upx;
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
		font-size: $font-sm;
		line-height: 32upx;
		white-space: pre-wrap;

		.cell-tip {
			line-height: 60upx;
			float: right;
			font-size: $font-sm;
			color: $font-color-light;
		}

		.title {
		}

		.title-1 {
			font-size: $font-title;
		}

		.title-2 {
			line-height: $line-height-40;
			margin-top: $font-sm;
			color: #333;
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
	background: #000000;
	flex: 1;
	width: 100%;
	border: 1px solid #ccc;
	margin: 0 auto;
	position: relative;
	#Gmap {
		position: absolute;
		left:0;
		top:0;
		width: 100%;
		height: 100%;
	}
	.Gmap {
		position: absolute;
		left:0;
		top:0;
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
		.bottom-float-button {
			float: inherit;
			width: 80%;
			margin: 0 auto;
			margin-bottom: 20upx;
		}

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
