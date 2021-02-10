<template>
	<view class="content no-padding">
		
				<view class="fab-box"
				 v-if="gridType != '0'"
				  @click="navTo('/pages/_new_troubleReport/_new_troubleReport')">
					<image class="img" src="/static/_new/wwg_pen@2x.png"></image>
					<text class="text color-fff ">微上报</text>
				</view>
		
		<view class="title-box" @click="changeTitleSearch">
			<image class="left-icon" src="/static/_new/wwg_address@2x.png"></image>
			<scroll-view scroll-x class="right-b" @click="location">
				<view>{{ filterText == '' ? '选择街道/社区' : filterText}}</view>
			</scroll-view>
		</view>
		<view class="new-title-bar" v-if="gridType == '0'">
			<view class="title">微网格</view>
			<view class="right-title" @click="navTo('/pages/_new_weiwangge_more/_new_weiwangge_more')">更多微网格>></view>
		</view>

		<scroll-view scroll-x class="swiper-box">
			<view v-if="gridType != '0'" class="swiper-box-wangge swiper-item-side" @click="gonInfo">
				<view class="title main-text">
					<image class="icon" src="/static/_new/wwg_ID@2x.png"></image>
					<text class="title-text">{{ info_grid.microGridName }}</text>
				</view>
				<view class="middle-line"></view>
				<view class="swiper-content">
					<view class="left">
						<image class="star position" v-if="info_grid.isHeader == 1" src="/static/_new/wwg_captain@2x.png"></image>
						<image class="img position" :src=" info_grid.microGridLeaderFileIds != null &&info_grid.microGridLeaderFileIds != '' ? `${baseUrl}fyVolunteer/file/download/${info_grid.microGridLeaderFileIds}?rbacToken=${rbacToken}` : '/static/_new/wwg_photo_default_s@2x.png'" />
					</view>
					<view class="right">
						<view class="main-text sub">
							<image class="icon" src="/static/_new/wwg_name_y@2x.png"></image>
							<text class="title-text">{{ info_grid.microGridLeader }}</text>
						</view>
<!-- 						<view class="main-text sub">
							<image class="icon" src="/static/_new/wwg_phone_y@2x.png"></image>
							<text class="title-text">{{ info_grid.microGridLeaderPhone }}</text>
							<view class="right-icon" @click="makePhone(info_grid.microGridLeaderPhone)">电话</view>
						</view> -->
<!-- 						<view class="main-text sub">
							<image class="icon" src="/static/_new/wwg_VX@2x.png"></image>
							<text class="title-text">{{ info_grid.microGridNumber }}</text>
						</view> -->
						<view class="main-text sub">
							<image class="icon" src="/static/_new/wwg_range_y@2x.png"></image>
							<text class="title-text letter-hidden">{{ info_grid.microGridAddress }}</text>
						</view>
					</view>
				</view>
			</view>
			<view v-if="gridType != '0'" class="swiper-box-wangge swiper-item-side bg-color">
				<view class="title main-text">
					<text class="title-text" style="margin-left: 0;">{{ info_grid.gridName }}</text>
				</view>
				<view class="middle-line"></view>
				<view class="item-content">
					<view class="txt">
						<text class="t">网格指导员:</text>
						<text class="r">{{ info_grid.gridUser1 }}</text>
					</view>
					<view class="txt">
						<text class="t">网格长:</text>
						<text class="r">{{ info_grid.gridUser2 }}</text>
					</view>
					<view class="txt">
						<text class="t">网格员:</text>
						<text class="r">{{ info_grid.gridUser3 }}</text>
					</view>
					<!-- 						<view class="txt">
						<text class="t">网格员:</text>
						<text class="r">{{info_grid.microGridNumber}}</text>
					</view> -->
				</view>
			</view>
			<view v-for="item in swiperList" class="swiper-box-wangge swiper-item-side">
				<view class="title main-text">
					<image class="icon" src="/static/_new/wwg_ID@2x.png"></image>
					<text class="title-text letter-hidden">{{ item.microGridName }}</text>
					<view v-if="item.followType ==-1 " class="right-icon" @click="guanzhu(item)">关注</view>
					<view v-if="item.followType == 1 " class="right-icon cancel-icon" @click="guanzhu(item)">
						<image class="wwg_heart" src="/static/_new/wwg_heart@2x.png"></image>
						已关注
					</view>
				</view>
				<view class="middle-line"></view>
				<view class="swiper-content">
					<view class="left">
						<image class="star position" v-if="item.microGridLeader != ''" src="/static/_new/wwg_captain@2x.png"></image>
						<image class="img position" :src="item.microGridUserFileIds != null && item.microGridUserFileIds != '' ? `${baseUrl}fyVolunteer/file/download/${item.microGridUserFileIds}?rbacToken=${rbacToken}` : '/static/_new/wwg_photo_default_s@2x.png'" />
					</view>
					<view class="right">
						<view class="main-text sub">
							<image class="icon" src="/static/_new/wwg_name_y@2x.png"></image>
							<text class="title-text">{{ item.microGridUserName }}</text>
						</view>
<!-- 						<view class="main-text sub">
							<image class="icon" src="/static/_new/wwg_phone_y@2x.png"></image>
							<text class="title-text">{{ item.microGridUserPhone }}</text>
							<view class="right-icon" @click="makePhone(item.microGridUserPhone)">电话</view>
						</view> -->
						<!-- <view class="main-text sub">
							<image class="icon" src="/static/_new/wwg_VX@2x.png"></image>
							<text class="title-text">{{ item.microGridNumber }}</text>
						</view> -->
						<view class="main-text sub">
							<image class="icon" src="/static/_new/wwg_range_y@2x.png"></image>
							<text class="title-text letter-hidden">{{ item.microGridAddress }}</text>
						</view>
					</view>
				</view>
			</view>
			<view class="add-rect" @click="navTo('/pages/_new_weiwangge_more/_new_weiwangge_more')">
				<view class="add-rect-text">　</view>
				<view class="add-rect-text">　</view>
				<view class="add-rect-text">关注更多</view>
				<view class="add-rect-text">微网格</view>
				<view class="add-rect-text">　</view>
			</view>
			
		</scroll-view>


		<view class="new-title-box" v-if="gridType != '0'">
			<view class="tab">
				<new-wuc-tab :tab-list="tabList" :tabCur.sync="TabCur" @change="tabChange"></new-wuc-tab>
			</view>
		</view>
		<view class="new-title-bar" v-if="gridType == '0'">
			<view class="title">看一看</view>
		</view>
		<!-- 隐患上报 -->
		<view class="title-box-menu" v-if="selectCate_fieldName.length > 0 && gridType !='0' && TabCur == 1">
			<new-menu-select class="pick-box" :selList="[selectCate_taskType, selectCate_fieldName]" keyName="name,sub_name"
			 queryName="taskType,fieldName" valName="val,sub_name" @btnClick="changeSelect($event)"></new-menu-select>
		</view>

		<!-- 隐患上报 -->

		<view class="new-title-box" srtle="margin-bottom:10rpx;" v-if="gridType !='0' && TabCur == 2">
			<view class="tab">
				<new-wuc-tab :tab-list="tabList_xxsb" :tabCur.sync="TabCur_xxsb" @change="tabChange_xxsb"></new-wuc-tab>
			</view>
		</view>



<!-- 		<scroll-view class="history-section icon" scroll-y @scrolltolower="getmoreData()" v-if="gridType == '0'">
			<image v-if="Number(total) === 0 ? true : false" class="prompt_img" src="/static/img/prompt_blank@2x.png"></image>
			<new-list-cell-wg v-for="(item, index) in list" :item="item" :share="false"  @eventClick="selInfo(item)"></new-list-cell-wg>
		</scroll-view>
 -->
		<scroll-view class="history-section icon" scroll-y @scrolltolower="getmoreData()" v-if="TabCur == 0">
			<image v-if="Number(total) === 0 ? true : false" class="prompt_img" src="/static/img/prompt_blank@2x.png"></image>
			<new-list-cell-wg v-for="(item, index) in list" :item="item" @eventClick="selInfo(item)"></new-list-cell-wg>
		</scroll-view>

		<scroll-view class="history-section icon" scroll-y @scrolltolower="getmoreData()" v-else-if="TabCur == 1">
			<image v-if="Number(total) === 0 ? true : false" class="prompt_img" src="/static/img/prompt_blank@2x.png"></image>
			<new-list-cell-misson v-for="(item, index) in list" :item="item" @eventClick="navToAndSaveItem(item, '/pages/areaMissonDetail/areaMissonDetail')"></new-list-cell-misson>
		</scroll-view>

		<scroll-view class="history-section icon" scroll-y @scrolltolower="getmoreData()" v-else-if="TabCur == 2">
			<image v-if="Number(total) === 0 ? true : false" class="prompt_img" src="/static/img/prompt_blank@2x.png"></image>

			<new-list-cell-xxsb v-for="(item, index) in list" :item="item" :state="TabCur_xxsb" @shanchu="xxsb(item, '删除')"
			 @chakan="xxsb(item, '查看')" @xiugai="xxsb(item, '修改')" @tianxie="xxsb(item, '填写')"></new-list-cell-xxsb>
		</scroll-view>

		<uni-popup ref="popup_explain" type="bottom" @closeed="closePopup">
			<view class="time-select-box default-item-box">
				<steps-click class="steps" direction="column" :options="searchOption" :active="searchOption_active" @checkIndex="checkIndex"></steps-click>
				<scroll-view class="scoll" scroll-y style="height:0;">
					<view class="scoll-item" v-for="item in scrolList" :class="item.name == checkedText ? 'check-on' : ''" @click="checkItem(item)">{{ item.name }}</view>
				</scroll-view>
				<view class="bottom-btn-box" v-if="show_checkIndex">
						<button class="bottom-float-button left-btn" type="red" @click.stop="searchFilter">
							确定
						</button>
				</view>
			</view>
		</uni-popup>
	</view>
</template>
<script>
	import newWucTab from '@/components/_new-wuc-tab/_new-wuc-tab';
	import stepsClick from '@/components/steps-click/steps-click.vue';
	import newSwiperItem from '@/components/_new-swiper-item.vue';
	import wucTab from '@/components/wuc-tab/wuc-tab';
	import pickerSelect from '@/components/pickerSelect';
	import newListCellWg from '@/components/_new-list-cell-wg';
	import menuSelectSimple from '@/components/menu-select-simple.vue';
	import newMenuSelect from '@/components/_new-menu-select.vue';
	import newListCellMisson from '@/components/_new-list-cell-misson';
	import newListCellXxsb from '@/components/_new-list-cell-xxsb.vue';
	import {
		mapState
	} from 'vuex';
	export default {
		components: {
			stepsClick,
			pickerSelect,
			wucTab,
			newListCellWg,
			menuSelectSimple,
			newMenuSelect,
			newSwiperItem,
			newWucTab,
			newListCellMisson,
			newListCellXxsb
		},
		data() {
			return {
				checkedText:"",
				filterText:"",
				show_checkIndex:true,
				gridType: '0',
				microGridId: 0,
				baseUrl: getApp().globalData.baseUrl,
				rbacToken: getApp().globalData.rbacToken,
				TabCur_xxsb: 0,
				tabList_xxsb: [{
						name: '填表区',
						key: 1
					},
					{
						name: '已填写',
						key: 2
					}
				],
				info_grid: [],
				selectCate_fieldName: [],
				selectCate_taskType: [{
						name: '领域任务',
						val: 1
					},
					{
						name: '区域任务',
						val: 2
					}
				],
				taskType: 1,
				fieldName: '全部',
				wanggezhang: true,
				keyWord: '',
				total: null,
				pageNo: 1,
				pageSize: 20,
				scrolList: [],
				list: [

				],
				swiperList: [],
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
				TabCur: 0,
				tabList: [{
						name: '微宣传',
						key: 1,
						show:true,
					},
					{
						name: '隐患上报',
						key: 2,
						show:false,
					},
					{
						name: '智能填表',
						key: 3,
						show:true,
					}
				]
			};
		},
		onLoad() {

			// 监听事件
			uni.$on('_new_xinxishangbao', info => {
				switch (info.type) {
					case 'del':
						this.delFormInfo();
						break;
					case 'complete':
						break;
				}
				console.log('接收啦');
			});

			// 判断是否网格/
			this.microGridId = this.user.microGridId;
			this.filterText=this.user.searchOptionText !='' ? this.user.searchOptionText.join(' ') : '';
			this.searchOptionText = this.user.searchOptionText;
			this.searchOptionText_id=this.user.searchOptionText_id ;
			
			this.gridType = this.user.gridType.toString();
			//获取街道列表数据
			this.getDistrictsByParentIdAndLevel(0);
			//获取网格列表
			// this.getMicrogridList();
			//获取列表
			this.getFyPropagandaTaskPageList();
			//获取数据层select
			this.getProType();

			//获取网格长  网格员的详细信息
			this.gridType == '0' ? '' : this.getMicroGridUser();
		},
		onUnload() {
			//移除所有监听
			uni.$off();
		},
		onShow() {
			//#ifdef APP-PLUS
			uni.getSubNVueById('popupShangbao').hide('auto', 0);
			uni.getSubNVueById('innerBoxShangbao').hide('auto', 0);
			//#endif

			//获取网格长  网格员的已关注列表
			this.getMyFollowMicrogridList();

		},
		computed: {
			
		},
		methods: {
			closePopup(){
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
				this.searchOption_active = 0;
			},
			searchFilter(){
				this.filterText=this.searchOptionText.join(' ');
				this.getMyFollowMicrogridList();
				this.getFyPropagandaTaskPageList();
				this.$refs.popup_explain.close();
				this.user.searchOptionText = this.searchOptionText;
				this.user.searchOptionText_id = this.searchOptionText_id;
				uni.setStorageSync('searchOptionText',this.user.searchOptionText)
				uni.setStorageSync('searchOptionText_id',this.user.searchOptionText_id)
			},
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
							debugger
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
			gonInfo() {
				this.navToAndSaveItem({
					id: this.microGridId
				}, '/pages/_new_weiwangge_detail_grid/_new_weiwangge_detail_grid');
			},
			showWidth() {

			},
			//删除 上报信息
			delFormInfo(id) {
				this.loadingState();
				this.$http
					.post('fyMicroGridManage/fyFormInfo/delFormInfo', {
						id: this.delId,
						rbacToken: this.user.rbacToken
					})
					.then(res => {
						uni.hideLoading();
						if (res.data.success == 1) {
							uni.showToast({
								mask: true,
								icon: 'none',
								duration: 2000,
								title: "删除成功..."
							});
							setTimeout(() => {
								this.getAppList();
							}, 2000)
						} else {
							uni.showToast({
								icon: 'none',
								title: res.data.message
							});
						}
					});
			},
			//getMyFollowMicrogridList
			getMyFollowMicrogridList(once) {
				const _this = this;
				this.loadingState();
				this.$http
					.get('fyMicroGridManage/fyMicrogrid/getMyFollowMicrogridList', {
						roadId: this.searchOptionText_id[0] ? this.searchOptionText_id[0] : "",
						communityId: this.searchOptionText_id[1] ? this.searchOptionText_id[1] : "",
						gridId: this.searchOptionText_id[2] ? this.searchOptionText_id[2] : "",
						microGridId: this.searchOptionText_id[3] ? this.searchOptionText_id[3] : "",
						pageNo: this.pageNo,
						pageSize: this.pageSize,
						followType: once ? -1 : 1,
						// userId:this.user.userId,
						rbacToken: this.user.rbacToken
					})
					.then(res => {
						uni.hideLoading();
						if (res.data.success == 1) {

							this.swiperList = res.data.data.list;
							// 首先 判断是不是普通用户
							if (once) {
								return;
							} else if (this.gridype == 0 && this.swiperList.length <= 0) {
								//普通用户得去拿那个什么鬼网格数据 如果没有的话
								_this.getMyFollowMicrogridList('once');
							}
						} else {
							uni.showToast({
								icon: 'none',
								title: res.data.message
							});
						}
					});
			},

			getAppList(type) {
				this.loadingState();
				this.$http
					.get('fyMicroGridManage/fyFormInfo/getAppList', {
						pageNo: this.pageNo,
						pageSize: this.pageSize,
						type: this.TabCur_xxsb + 1,
						rbacToken: this.user.rbacToken
					})
					.then(res => {
						uni.hideLoading();
						if (res.data.success == 1) {
							debugger
							if (type == 'concat') {
								this.list = this.list.concat(res.data.data.list);
								uni.hideToast();
							} else {
								this.list = res.data.data.list;
							}
							this.total = res.data.data.total;

						} else {
							uni.showToast({
								icon: 'none',
								title: res.data.message
							});
						}
					});
			},
			tabChange_xxsb(index) {
				debugger
				this.keyWord = '';
				this.taskState = this.tabList[index].key;
				this.distanceScope = '';
				this.TabCur_xxsb = index;
				this.pageNo = 1;
				this.showMore = false;
				this.getAppList();
			},
			xxsb(item, type) {
				switch (type) {
					case '查看':
						item.TabCur_xxsb = this.TabCur_xxsb;
						item.pageType = 1;
						this.navToAndSaveItem(item, '/pages/_new_xinxishangbao_detail/_new_xinxishangbao_detail');
						break;
					case '修改':
						item.TabCur_xxsb = this.TabCur_xxsb;
						item.pageType = 2;
						this.navToAndSaveItem(item, '/pages/_new_xinxishangbao_detail/_new_xinxishangbao_detail');
						break;
					case '填写':
						this.navToAndSaveItem(item, '/pages/_new_xinxishangbao_add/_new_xinxishangbao_add');
						break;
					case '删除':
						this.delId = item.id;
						//#ifdef APP-VUE
						uni.getSubNVueById('popupShangbao').show('auto', 200);
						uni.getSubNVueById('innerBoxShangbao').show('auto', 200);
						//#endif
						//#ifdef H5
						this.delFormInfo();
						//#endif
						break;
				}
			},

			makePhone(item) {
				uni.makePhoneCall({
					phoneNumber: item //仅为示例
				});
			},
			//如果是网格 / 网格长 就换他么的
			getMicroGridUser() {
				this.loadingState();

				this.$http
					.get('fyMicroGridManage/fyMicrogrid/getMicroGridUser', {
						id: this.user.microGridId,
						rbacToken: this.user.rbacToken
					})
					.then(res => {
						uni.hideLoading();
						if (res.data.success == 1) {

							this.info_grid = res.data.data;
						} else {
							uni.showToast({
								icon: 'none',
								title: res.data.message
							});
						}
					});
			},
			//获取列表
			getProType() {
				this.$http
					.get('fyProHandle/proHandle/getProType', {
						type: 1,
						rbacToken: this.user.rbacToken
					})
					.then(res => {

						this.selectCate_fieldName = res.data.data;
						// this.tagList.pop();
						// this.tagList.unshift({sub_name:"全部"})
						this.fieldName = this.selectCate_fieldName[0].sub_name;
					});
			},
			//隐患上报
			getPeaceTaskList(type) {
				this.loadingState();
				this.$http
					.get('fyTaskManage/peaceTaskApp/getPeaceTaskList', {
						pageNo: this.pageNo,
						pageSize: this.pageSize,
						taskType: this.taskType,
						fieldName: this.fieldName == '全部' ? '' : this.fieldName,
						taskState: 2,
						keyWord: this.keyWord,
						rbacToken: this.user.rbacToken,
						d: '',
						longitude: this.user.longitude,
						latitude: this.user.latitude
					})
					.then(res => {
						uni.hideLoading();
						this.reloadScrollTop = 0;
						if (res.data.success == 1) {
							if (type == 'concat') {
								this.list = this.list.concat(res.data.data.list);
								uni.hideToast();
							} else {
								this.list = res.data.data.list;
							}
							this.total = res.data.data.total;
						} else {
							uni.showToast({
								mask: true,
								icon: 'none',
								title: res.data.message
							});
						}
					});
			},
			//选择
			changeSelect(e) {
				this[e.type] = e.val;
				this.pageNo = 1;
				this.showMore = false;
				this.getPeaceTaskList();
			},

			tabChange(index) {
				this.keyWord = '';
				this.taskState = this.tabList[index].key;
				this.distanceScope = '';
				this.TabCur = index;
				this.pageNo = 1;
				this.showMore = false;

				switch (index.toString()) {
					case '0':
						this.getFyPropagandaTaskPageList();
						break;
					case '1':
						this.getPeaceTaskList();
						break;
					case '2':
						this.getAppList();
						break;
				}
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
			switchSearch(idx) {
				this.getDistrictsByParentIdAndLevel(idx);
				return;
				// switch (idx.toString()) {
				// 	case '0':
				// 		this.getStreet();
				// 		break;
				// 	case '1':
				// 		this.getCommunity();
				// 		break;
				// }
			},
			//选中一个过滤字段
			checkIndex(item, idx) {

				if (item.id == '' || idx == 3) {
					return;
				}
				this.searchOptionText = this.searchOptionText.slice(0, idx);
				this.searchOptionText_id = this.searchOptionText_id.slice(0, idx);
				
				this.searchOption_active = idx;

				this.searchOption.map((it, _idx) => {
					if (_idx >= idx) {
						it.name = it.lname;
						it.id = '';
					}
				});
				//选择上一个的id
				//但初始不加id所以不怕
				this.searchOptionId = this.searchOption[idx == 0 ? 0 : idx - 1].id;
				this.switchSearch(idx);
			},
			//选地址
			checkItem(item) {
				
				this.searchOption[this.searchOption_active].name = item.name;
				this.searchOption[this.searchOption_active].id = item.id;
				this.searchOptionId = item.id;
				// console.log(this.searchOptionText_id)
				if(this.searchOption_active == 3){
					this.searchOptionText[3]=item.name;
					this.searchOptionText_id[3]=item.id;
					this.show_checkIndex = true;
					this.checkedText  = item.name;
				}else{
					//增加命名
					this.searchOptionText.push(item.name);
					this.searchOptionText_id.push(item.id);
					this.searchOption_active = this.searchOption_active + 1;
					this.switchSearch(this.searchOption_active);
				}

			},
			//选择一个任务
			selInfo(item) {
				this.navToAndSaveItem(item, '/pages/_new_weiwangge_xuanchuan/_new_weiwangge_xuanchuan');
				//在此拦截状态详情
			},
			getmoreData() {
				if (Math.ceil(this.total / this.pageSize) <= this.pageNo) {
					if (!this.showMore) {
						uni.showToast({
							icon: 'none',
							title: '没有更多了.',
							success: () => {
								this.showMore = true;
							}
						});
					}
					return;
				} else {
					this.pageNo = this.pageNo + 1;
				}
				switch (this.TabCur.toString()) {
					case '1':
						this.getFyPropagandaTaskPageList('concat');
						break;
					case '2':
						this.getPeaceTaskList('concat');
						break;
					case '3':
						this.getFyPropagandaTaskPageList('concat');
						break;
				}
			},
			//获取网格
			getMicrogridList() {
				// this.loadingState();
				this.$http
					.get('fyMicroGridManage/fyMicrogrid/getMicrogridList', {
						pageNo: this.pageNo,
						pageSize: this.pageSize,
						keyWord: this.keyWord,
						rbacToken: this.user.rbacToken
					})
					.then(res => {
						uni.hideLoading();
						if (res.data.success == 1) {
							this.swiperList = res.data.data.list.slice(0, 5);
						} else {
							uni.showToast({
								icon: 'none',
								title: res.data.message
							});
						}
					});
			},
			//宣传任务—分页查询宣传任务列表
			getFyPropagandaTaskPageList(type) {

				// this.loadingState();
				this.$http
					.get('fyMicroGridManage/fyPropagandaTask/getFyPropagandaTaskPageList', {
						roadId: this.searchOptionText_id[0] ? this.searchOptionText_id[0] : "",
						communityId: this.searchOptionText_id[1] ? this.searchOptionText_id[1] : "",
						gridId: this.searchOptionText_id[2] ? this.searchOptionText_id[2] : "",
						microGridId: this.searchOptionText_id[3] ? this.searchOptionText_id[3] : "",
						taskUserType: this.gridType,
						pageNo: this.pageNo,
						pageSize: this.pageSize,
						keyWord: this.keyWord,
						rbacToken: this.user.rbacToken,
						isPublish: 1
					})
					.then(res => {
						uni.hideLoading();
						if (res.data.success == 1) {
							if (type == 'concat') {
								this.list = this.list.concat(res.data.data.list);
								uni.hideToast();
							} else {
								this.list = res.data.data.list;
							}
							this.total = res.data.data.total;
						} else {
							uni.showToast({
								icon: 'none',
								title: res.data.message
							});
						}
					});
			}
		},
		onNavigationBarSearchInputConfirmed() {},
		onBackPress() {
			this.switchTabTo('/pages/index/index');
		}
	};
</script>
<style lang="scss">
				.fab-box{
			z-index:100;
			position: fixed;
			left:0;
			bottom:100rpx;
		width: 213rpx;
		height: 85rpx;
		line-height: 85rpx;
		background-image: linear-gradient(-90deg, 
			#e32417 0%, 
			#ff7352 100%), 
		linear-gradient(
			#ffffff, 
			#ffffff);
		background-blend-mode: normal, 
			normal;
		box-shadow: 0rpx 2rpx 8rpx 0rpx 
			rgba(227, 36, 23, 0.5);
		border-top-right-radius: 43rpx;
		border-bottom-right-radius: 43rpx;
	
				.img{
					margin:0 17rpx;
					width: 34rpx;
					height: 34rpx;
					position: relative;
					top:50%;
					transform: translateY(-50%);
					display: block;
					float: left;
				}
				.text{
					line-height: inherit;
				}
		}
	.check-on{
		color:#3984f3;
	}
	.letter-hidden {
		width: 65%;
		float: left;
	}

	.cancel-icon {
		background: transparent !important;
		color: #fff !important;
		width: 100rpx !important;

		.wwg_heart {
			margin-top: -5rpx;
			margin-right: 10rpx;
			position: relative;
			top: 41%;
			transform: translateY(-50%);
			display: inline-block;
			width: 26rpx;
			height: 23rpx;

		}
	}

	.add-rect {
		padding: 20rpx;
		display: inline-block;
		width: 300rpx;
		height: 240rpx;
		position: relative;
		margin-right: 40rpx;
		border-radius: 10rpx;
		background: linear-gradient(-45deg, #ec6434 0%, #ff8a4e 100%), linear-gradient(#e32417, #e32417);

		.add-rect-text {
			height: 36rpx;
			line-height: 30rpx;
			color: #fff;
			text-align: center;
			width: 100%;
		}
	}

	.swiper-box {
		.swiper-mian {
			height: 100%;
		}

		// height:280rpx;
		// font-size: 0;
		padding: 20rpx;
		white-space:nowrap;


		.swiper-item-side {
			vertical-align: top;
			font-size: 22rpx;
			position: relative;
			z-index: 11;

			&:last-child {
				margin-right: 0;
			}

			// float: left;
			display: inline-block;
			margin-right: 40rpx;
			padding: 20rpx;
			width: 450rpx;
			height: 240rpx;
			background: linear-gradient(-45deg, #ec6434 0%, #ff8a4e 100%),
			linear-gradient(#e32417, #e32417);
			background-blend-mode: normal,
			normal;
			box-shadow: 0rpx 3rpx 18rpx 0rpx rgba(101, 101, 101, 0.3);
			border-radius: 10rpx;
		}
	}

	.bg-color {
		.middle-line {
			margin-top: 0;
		}

		// margin-top: 12rpx;
		// height: 216rpx !important;
		background-image: linear-gradient(-45deg, #7057ff 0%, #cda0ff 100%),
		linear-gradient(#ffffff, #ffffff) !important;
		background-blend-mode: normal,
		normal;
		box-shadow: 0rpx 3rpx 18rpx 0rpx rgba(101, 101, 101, 0.2) !important;
	}

	.swiper-box-wangge {
		.item-content {
			font-size: 24rpx;

			// margin-left: 30rpx;
			.txt {
				margin-top: 14rpx;
				display: flex;
				flex-flow: row nowrap;

				width: 100%;

				.t {
					opacity: 0.7;
					color: #fff;
					text-align-last: justify;
					min-width: 32%;
					max-width: 32%;
				}

				.r {
					color: #fff;
					text-indent: 20rpx;
					flex: 1;
					overflow: hidden;
				}
			}
		}

		.title {
			.right {
				color: #e32417;
				text-align: center;
				float: right;
				width: 80rpx;
				height: 36rpx;
				background-color: #fef1bc;
				border-radius: 18rpx;
			}
		}

		.middle-line {
			margin-top: 12rpx;
			width: 100%;
			height: 1rpx;
			background-color: #f0f0f0;
			opacity: 0.4;
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
				max-width: 70rpx;
				min-width: 70rpx;
				height: 94rpx;

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
						background: transparent;
						color: #fff;
						border-radius: 18rpx;
						border: solid 1rpx #ffffff;
					}
				}
			}
		}
	}

	.title-box {
		background: #fff;
	}

	.content {
		background: #f6f6f6;
	}

	.new-title-box {
		max-height: 80rpx;
		min-height: 80rpx;
		background: #f6f6f6;
	}

	.time-select-box {
		.uni-steps__column-text {
			border-bottom: none;
		}
	}

	.time-select-box {
		min-height: 900rpx;
		width: 100%;
		display: flex;
		flex-flow: column nowrap;

		.steps {}

		.scoll {
			border-top: 1px solid #f6f6f6;
			flex: 1;

			.scoll-item {
				padding: 20rpx;
				font-size: 28rpx;
			}
		}
	}

	.title-box {
		width: 100%;
		height: 80rpx;
		padding: 0 20rpx;

		.left-icon {
			margin-left: 20rpx;
			width: 20rpx;
			height: 26rpx;
			float: left;
			position: relative;
			top: 50%;
			transform: translateY(-50%);
		}

		.right-b {
			width: 90%;
			white-space:nowrap;
			text-indent: 16rpx;
			position: relative;
			top: 50%;
			transform: translateY(-50%);
			font-size: 28rpx;
			height: 36rpx;
			letter-spacing: 0px;
			color: #3984f3;
			float: left;
		}
	}

	.main-text {
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
			color: #ffffff;
		}

		.right-icon {
			font-size:$new-font-22;
			color: #e32417;
			text-align: center;
			float: right;
			width: 80rpx;
			height: 36rpx;
			line-height: 30rpx;
			background-color: #fef1bc;
			border-radius: 18rpx;
		}
	}

	.history-section {
		flex: 1;
		height: 0;
		background: #fff;
		border-radius: 10rpx;

		.sec-header {
			display: flex;
			align-items: center;
			font-size: $font-base;
			color: $font-color-dark;
			line-height: 40rpx;
			margin-left: 30rpx;

			.yticon {
				font-size: 44rpx;
				color: #5eba8f;
				margin-right: 16rpx;
				line-height: 40rpx;
			}
		}

		.h-list {
			white-space: nowrap;
			padding: 30rpx 30rpx 0;

			image {
				display: inline-block;
				width: 160rpx;
				height: 160rpx;
				margin-right: 20rpx;
				border-radius: 10rpx;
			}
		}
	}
</style>
