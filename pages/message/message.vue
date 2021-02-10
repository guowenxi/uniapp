<template>
	<view class="content no-padding">
		<view class="team-list">我的社群 {{listLength}} 个</view>
			<scroll-view class="history-section icon">
			<list-cell-team v-for="(item, index) in AppList" :item="item" @eventClick="navToAndSaveItem(item,'/pages/messageList/messageList')"></list-cell-team>
		</scroll-view>
	</view>

</template>

<script>
	import listCellTeam from '@/components/list-cell-team';
	export default {
		components: {
			listCellTeam
		},
		data() {
			return {
				listLength :0,
				AppList: [
/* 					{
				"content":"瓯海第一分组,用于通知消息",
				"createTime":"2019-07-18 15:29:30",
				"createUser":"1",
				"createUserName":"",
				"districtsId":"1",
				"districtsName":"",
				"groupName":"瓯海第一分组",
				"id":"1",
				"messageNum":2,
				"newMessage":"asdfsadf sadf sadf sad fasd f",
				"newMessageTime":"2019-07-18 15:30:25",
				"rbacToken":"",
				"status":1,
				"updateTime":"2019-07-18 15:29:32",
				"userNum":0
			} */
				]
			};
		},
		onLoad(){
			this.user.hasGroupReadNum = 0  ;
			this.getAppList();
		},
		methods:{
			//获取列表
			getAppList() {
				this.$http.get('fyVolunteer/fySafeMessageGroup/getAppList', {
					pageNo:'1',
					pageSize:'20',
					rbacToken:this.user.rbacToken
					})
					.then(res => {
						if (res.data.success == 1) {
							this.AppList = res.data.data.list;
							this.listLength = this.AppList.length;
						} else {
							uni.showToast({
								mask:true,
								icon: 'none',
								title: res.data.message
							});
						}
						
					})
			},
		}
	}
</script>

<style lang="scss">
	.content{
		background: #eee;
	}
	.team-list{
		background: #fff;
		padding:0 20upx;
		width:100%;
		color:red;
		height: 60upx;
		line-height:60upx;
	}
	.history-section {
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
