<template>
	<view class="list-cell-icon b-b"   hover-class="cell-hover" :hover-stay-time="50">
		<view class="left-icon">
			<image class="icon" :src="
			item.headImg ?  `${baseUrl}fyVolunteer/file/download/${item.headImg}` :
			 '/static/team_Head@2x.png'
			 " />
		</view>
		<view class="cell-tit " @click="eventClick">
			<view class='title title-1 overflow-text-two' style="text-indent: 0;">
				{{item.name}}
			</view>
			<view class='title title-2'>
				　队长: {{item.headName}}
			</view>
			<view class='title title-3'>
				团队成员 : {{item.teamCount}}/{{item.teamNum}}人
			</view>
		</view>
		<view class="right-box">
			<button class="bottom-float-button "
			 :class="isApply == 1 ?  'new-bg-default' : 'new-bg-red' "

			  @click.stop="addTeam(item)"
			  >{{isApply == 1 ? '等待通过' : '申请加入'}}</button>
		</view>
		
		<!-- 			<text class="cell-more yticon"
				:class="typeList[navigateType]"
			></text> -->
	</view>

</template>

<script>
	export default {
		data() {
			return {
				isApply:0,
				baseUrl : getApp().globalData.baseUrl,
				rbacToken : getApp().globalData.rbacToken,
			}
		},
		props: {
			item: {
				type: [Object,String],
				default: {
					
				}
			}
		},
		mounted(){
			this.isApply = this.item.isApply;
		},
		methods: {
			//加入团队
			addTeam(item){
				debugger
				if(this.isApply == 1){
					return 
				}
				this.$http.get('fyVolunteer/apply/team', {
								teamId:	this.item.id,
								rbacToken: this.user.rbacToken,
							})
							.then(res => {
								if (res.data.success == 1) {
									uni.showToast({
										mask:true,
										icon:'none',
										title: "您已成功申请团队,",
										complete:()=>{
											
										}
									});
									
									this.isApply = 1;
								}else{
									uni.showToast({
										mask:true,
										icon:'none',
										title: res.data.message
									});
								}
							})
			},
			
			eventClick() {
				this.$emit('eventClick');
			},
			btnClick() {
				this.$emit('btnClick');
			}
		},
	}
</script>

<style lang='scss'>
	.list-cell-icon {
		box-sizing: initial;
		line-height: 95upx;
		display: flex;
		position: relative;
		padding: 10px;

		&.cell-hover {
			background: #fafafa;
		}

		.left-icon {
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
			width: 110upx;
			
			height: 110rpx;
			/* align-items: center; */
			color: #303133;

			.icon {
				width: 100%;
				height: 100%;
/* 				position: absolute;
				left: 50%;
				top: 50%;
				border-radius: 50%;
				transform: translate(-50%,-50%); */
			}

			.num {
							color:#ffdb14;
				line-height: 0;
				position: relative;
				width: 100%;
				top: 70%;
				left: 0;
				text-align: center;
				font-size: 24upx;
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
			
			.cell-tip {
				float: right;
				font-size:16upx;
				color: $font-color-light;
			}

			line-height: 30upx;

			.title {}

			.title-1 {
				margin-top: 10rpx;
				font-size:$new-font-32;
				line-height: $line-height-40;
			}

			.title-2 {
				margin-top: 10rpx;
				color: #909399;
				font-size: 26upx;
			}

			.title-3 {
				margin-top: 10rpx;
				color: #ccc;
				font-size: 26upx;
			}

			flex: 1;
			font-size: $font-base;
			color: $font-color-dark;
			margin-right: 10upx;
			
			margin-left: 140rpx;
		}
		.right-box{
			max-width:25%;
			flex:1;
			.img{
				width:100%;
				height:100%;
			}
			.red-btn{
				background: #e32417;
				color:#fff;
			}

			.bottom-float-button{
				position: relative;
				top: 50%;
				transform: translateY(-50%);
				font-size:26upx;
				height:70upx;
				line-height:70upx;
			}
		}

	}
</style>
