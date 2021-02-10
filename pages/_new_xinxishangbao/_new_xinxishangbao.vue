<template>
	<view class="content no-padding">
		<view class="new-title-box" v-if="changeShowList">
			<view class="tab"><new-wuc-tab :tab-list="tabList" :tabCur.sync="TabCur" @change="tabChange"></new-wuc-tab></view>
		</view>
		<scroll-view class="history-section icon" scroll-y v-if="changeShowList" @scrolltolower="getmoreData()">
			<image v-if="Number(total) === 0 ? true : false" class="prompt_img" src="/static/img/prompt_blank@2x.png"></image>

			<new-list-cell-xxsb
				v-for="(item, index) in list"
				:item="item"
				:state="TabCur"
				@shanchu="selInfo(item, '删除')"
				@chakan="selInfo(item, '查看')"
				@xiugai="selInfo(item, '修改')"
				style="margin: 30rpx auto;"
			></new-list-cell-xxsb>
		</scroll-view>

	</view>
</template>
<script>
import newWucTab from '@/components/_new-wuc-tab/_new-wuc-tab';
import pickerSelect from '@/components/pickerSelect';
import newListCellXxsb from '@/components/_new-list-cell-xxsb.vue';
import menuSelectSimple from '@/components/menu-select-simple.vue';
import { mapState } from 'vuex';
export default {
	components: {
		pickerSelect,
		newWucTab,
		newListCellXxsb,
		menuSelectSimple
	},
	data() {
		return {
			markers: [],
			longitude: '',
			latitude: '',
			distanceScope: '',
			changeShowList: true,

			keyWord: '',
			taskType1Index: 0,
			total: null,
			hasTeam: 0,
			pageNo: 1,
			pageSize: 20,
			taskType1: 0,
			TabCur: 0,
			taskState: 3,
			tabList: [
				{
					name: '已上报',
					key: 1
				},
				{
					name: '未上报',
					key: 2
				}
			],
			moving: false,
			list: [{
            "id": "表单填写信息表id",
            "title": "表单名称",
            "publishUserId": "发布人id",
            "publishUserName": "发布人",
            "createTime": "创建时间",
            "state": 0,//0=未进行，1=进行中，2=已结束
            "formId":"" ,//表单模板id
            "formPublishId":"",//已发布表单表id
            "formFillId":"",//信息上报填写记录表id
            "formFillPersonId":"",//发布的表单填写人员表id
            "isRepeat":"",//是否重复
            "repeatType":"1",//重复类型,1=没日，2=每周，3=每月，4=每季，5=每年
            "endTime":""//截止时间
        }]
		};
	},
	onLoad() {
		uni.getSubNVueById('popupShangbao').hide('auto',0);
		uni.getSubNVueById('innerBoxShangbao').hide('auto',0);
		// 监听事件
		uni.$on('_new_xinxishangbao',(info)=>{  
			switch(info.type){
				case "del" :
				this.delFormInfo();
				break;
				case "complete" :

				break;
			}
			console.log("接收啦")
		})
	},
	onUnload(){
		//移除所有监听
		uni.$off();
	},
	onShow() {

		// this.getAppList();
	},
	computed: {},
	methods: {
		selInfo(item,type){
			switch(type){
				case "查看":
				this.navToAndSaveItem(item,'/pages/_new_xinxishangbao_detail/_new_xinxishangbao_detail');
				break;
				case "修改":
				this.navToAndSaveItem(item,'/pages/_new_xinxishangbao_detail/_new_xinxishangbao_detail');
				break;
				case "删除":
				uni.getSubNVueById('popupShangbao').show('auto',200);
				uni.getSubNVueById('innerBoxShangbao').show('auto',200);
				break;
			}
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
			// uni.showToast({
			// 	icon : "none",
			// 	title:"正在加载,请稍等...",
			// 	duration:9999,
			// 	mask:true
			// })

			if (this.TabCur == 0) {
				this.getCheckTaskList('concat');
			} else {
				this.getMyTaskList('concat');
			}
		},
		tabChange(index) {
			this.keyWord = '';
			this.taskState = this.tabList[index].key;
			this.distanceScope = '';
			this.TabCur = index;
			this.pageNo = 1;
			this.showMore = false;
			this.getAppList();
		},
		changeSelect(item, index, type) {
			this.taskState = this.tabList[index].key;
			this.TabCur = index;
			this.pageNo = 1;
			this.showMore = false;

			this.getAppList();
		},
		//放弃任务
		delFormInfo(){
			this.$http.post('fyMicroGridManage/fyFormInfo/delFormInfo', {
				id:this.info.id,
				rbacToken: this.user.rbacToken,
			}).then(res => {
				if (res.data.success == 1) {
					uni.showToast({
						mask:true,
						icon: 'none',
						duration:3000,
						title: "您的表格已删除,正在为您返回信息上报列表..."
					});
					setTimeout(()=>{
						this.navigateBack(1);
					},3000)
				}
			})
		},
		
		getAppList(type) {
			this.loadingState();
			this.$http
				.get('fyMicroGridManage/fyFormInfo/getAppList', {
					pageNo: this.pageNo,
					pageSize: this.pageSize,
					type: this.TabCur + 1,
					rbacToken: this.user.rbacToken
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
						this.setMarkers();
					} else {
						uni.showToast({
							icon: 'none',
							title: res.data.message
						});
					}
				});
		}
	}
};
</script>
<style lang="scss">
.content {
	background: #f6f6f6;
}

.map-box {
	flex: 1;
	width: 100%;

	#Gmap {
		width: 100%;
		height: 100%;
	}
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

.title-box {
	.pick-box {
		min-width: 160upx;
		max-width: 160upx;
		flex: 1;
		margin-left: 20upx;
		height: 70upx;
		.pick-input {
			height: 70upx;
			line-height: 70upx;
		}
	}
	.tab-list {
		flex: 1;
		position: relative;
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
		opacity: 0.7;
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
	background: linear-gradient(left, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.8));
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
		font-size: $font-base + 2upx;
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
	flex: 1;
	height: 0;
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
