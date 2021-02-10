<template>
	<view class="content no-padding">
		<view class="top-box">
			<view class="title-icon">
				<image class="bg-title" src="/static/img/QR_code_head@2x.png"></image>
				<image 
				class="img"
				:src="
				info.headImg ?  `${baseUrl}fyVolunteer/file/download/${info.headImg}` :
				 '/static/img/alliance_icon@2x.png'"
				 ></image>
				 <view class="right-box">
					 <view>{{info.name}}</view>
					 <view>{{info.list.length}}/{{info.teamNum}}人</view>
				 </view>
			</view>
			<image class="erweima" 
			:src="
				info.qrCodeImg ?  `${baseUrl}fyVolunteer/file/download/${info.qrCodeImg}` :
				 '/static/img/alliance_icon@2x.png'"
				 >
			</image>
			
		</view>
		
	</view>
</template>

<script>
	import listCellUser from '@/components/list-cell-user';
	
	import uniList from '@/components/uni-list/uni-list.vue'
	import uniListItemRight from '@/components/uni-list-item/uni-list-item-right.vue'
	
	export default {
		components: {
			listCellUser,
			uniList,
			uniListItemRight
		},
		data() {
			return {
				baseUrl : getApp().globalData.baseUrl,
				rbacToken : getApp().globalData.rbacToken,
				info:{},
			};
		},
		onLoad(){
				this.info  =this.selListItem;
		},
		methods:{
			
		}
	}
</script>

<style lang="scss">
	.bg-title{
		width:100%;
		height: 200upx;
		position: absolute;
		left:0;
		top:0;
		z-index:0;
	}
	.content{
		background: #eee;
	}
	.erweima{
		position:relative;
		
		left:50%;
		transform: translateX(-50%);
		width: 430upx;
		height: 430upx;
		margin:0 auto;
		margin-top:60upx;
		
	}
	.conten{
		background: #fff;
	}
	.uni-list{

		.uni-badge-success{
			background-color: #fff !important;
		}
	}
	.top-box{

		position:relative;
		width: 660upx;
		height: 780upx;
		background-color: #ffffff;
		border-radius: 20upx;
		margin:0 auto;
		margin-top:80upx;
		overflow: hidden;
	}
	.list-item{
		float:left;
	}
	.title-icon {
			float:left;
			width: 100%;
			padding:50upx;
			// background-color: #e32417;
			
		.img{
			
			margin-right:20upx;
			float:left;
				border-radius: 50%;
				display: block;
				width: 100upx;
				height: 100upx;
		}
		.right-box{
			position: relative;
			z-index:10;
			float:left;
			color:#fff;
			font-size:30upx;
			line-height:50upx;
		}
		}

	.title {
		text-align: center;
		margin: 0 auto;
		margin-top: 20upx;
		font-size: 32upx;
	}

	.sub-text {
		margin: 0 60upx;
		margin-top: 45upx;
		margin-bottom:35upx;
	}

	.bottom-bg-button {
		bottom: 400upx;
	}
</style>
