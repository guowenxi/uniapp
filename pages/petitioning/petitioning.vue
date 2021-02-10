<template>  
    <view class="content">  
		<view class="input-box">
			<view class="login-title-view">手机号码</view>
			<view class="input-row border input-row-99">
				<!-- <view class="title">手机号码：</view> -->
				<!-- <view class="title title-emp"> </view> -->
				<m-input class="m-input security"  type="text"  focus v-model="phone" placeholder="请输入手机号码"></m-input>
			</view>
			<view class="login-title-view">验证码</view>
			<view class="input-row border input-row-99">
				<m-input class="security" type="text" clearable v-model="verificationCode" placeholder="请输入验证码"></m-input>
				<button type="opacity" class="opacity getPhone" @tap="sendRegister">获取验证码</button>
			</view>
		<view class="input-row border input-row-99">

		</view>
		<view class="btn-row">
			<button type="red" class="red new-bg-red" @tap="getCheckTask">查询</button>
		</view>
	</view>

		<scroll-view class="history-section icon" scroll-y>
			<list-cell-sf v-for="(item, index) in list" :item="item"  @eventClick="navToAndSaveItem(item,'/pages/petitioningDetail/petitioningDetail')"></list-cell-sf>
		</scroll-view>
		
		
    </view>  
</template>  
<script>  
	import mInput from '../../components/m-input.vue';
	import listCellSf from '@/components/list-cell-sf';
    import {  
        mapState 
    } from 'vuex';  
    export default {
		components: {
			listCellSf,
			mInput
		},
		data(){
			return {
				phonereg:/^[1][3,4,5,7,8][0-9]{9}$/,
				phone:"",
				verificationCode:"",
				moving: false,
				userInfo:{
					
				},
				list:[
			// 		{
			// 	"disposeName":"未处理",
			// 	"incidentContent":"qwe",
			// 	"handleList":[
			// 		"茶山街道批转到平安办",
			// 		"平安办批转到景山街道",
			// 		"景山街道批转到茶山街道",
			// 		"茶山街道批转到景山街道",
			// 		"茶山街道上报到协同处置系统茶山街道"
			// 	],
			// 	handType:0,
			// 	"petitionPeople":"cd",
			// 	"petitionPhone":"118855",
			// 	"handleStatus":0,
			// 	"id":"b55ef4e7684d4c12a2256777aca8c8bb",
			// 	"incidentTime":"2019-07-27 15:34:14",
			// 	"title":"d"
			// }
				],
			}
		},
		onLoad(){
			const user  = JSON.parse(uni.getStorageSync('userInfo'));
			user.phone !='' ?  this.phone = user.phone : null;
		},
        computed: {
		},
        methods: {

			sendRegister() {
				if (!this.phonereg.test(this.phone)) {
					uni.showToast({
						icon: 'none',
						title: '请输入正确的手机号'
					});
					return;
				}
				this.$http.get('fyVolunteer/SendMessage/sendPetition', {
						number: this.phone
					})
					.then(res => {
						if (res.data.success == 1) {
							uni.showToast({
								icon: 'none',
								title: res.data.data
							});

						} else {
							uni.showToast({
								icon: 'none',
								title: res.data.message
							});
						}
					})
			},
			getCheckTask() {
			this.$http.get('fyVolunteer/petition/getList', {
					phone: this.phone,
					verificationCode: this.verificationCode,
				}).then(res => {
					if (res.data.success == 1) {
						
						this.list = res.data.data.list;

					} else {
						uni.showToast({
							icon: 'none',
							title: res.data.message
						});
					}
				})
			}
        }  
    }  
</script>  
<style lang='scss'>
	.m-input{
		line-height:100upx;
		height:100upx;
		
	}
	.input-row{
		font-size:28upx;
	}
	.content{
		display: flex;
		flex-flow: column nowrap;
	}
	.input-box{
		max-height: 500upx;
		min-height: 500upx;
		flex:1;
	}
	.getPhone {
		width:150upx;
		padding:0;
		font-size: 26upx;
	}

	.security {
		padding: 0 25upx;
	}
	.history-section{
		height:0;
		flex:1;
		background: #fff;
		border-radius:10upx;
		.sec-header{
			display:flex;
			align-items: center;
			font-size: $font-base;
			color: $font-color-dark;
			line-height: 40upx;
			margin-left: 30upx;
			.yticon{
				font-size: 44upx;
				color: #5eba8f;
				margin-right: 16upx;
				line-height: 40upx;
			}
		}
		.h-list{
			white-space: nowrap;
			padding: 30upx 30upx 0;
			image{
				display:inline-block;
				width: 160upx;
				height: 160upx;
				margin-right: 20upx;
				border-radius: 10upx;
			}
		}
	}
	
</style>