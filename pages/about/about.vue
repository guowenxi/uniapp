<template>
	<view class="content no-padding">
		<scroll-view scroll-y  class="scroll-bar">
		<view class="top-box">
			<view class="title-icon">
<!-- 				<image 
				class="img"
			
				:src="
				headImg ?  `${baseUrl}fyVolunteer/file/download/${headImg}` :
				 '/static/team_Head@2x.png'"
				 ></image> -->
				<image 
				class="img"
			
				:src="
				headImg ?  `${baseUrl}fyVolunteer/file/download/${headImg}` :
				 '/static/PALM_loog.png'"
				 ></image>
				 <!-- <image class="icon" src="/static/img/team_Head_modify@2x.png"></image> -->
			</view>

			<view class="title">平安联盟</view>
			<view class=" title create-time">版本号:{{version}}</view>
			<!-- <view class="sub-text">群简介:{{info.content}}</view> -->
		</view>
		
		<view class="cover-container">
			
			<uni-list>

				<uni-list-item-right  title="检查更新"
				 @click="update()"
				 :team-name="name"
				 ></uni-list-item-right>
				<uni-list-item-right 
				 @click="show_update(true)"
				 title="版本说明" 
				></uni-list-item-right>
				<uni-list-item-right  title="分享二维码"
				@click="showERWEIMA"
				></uni-list-item-right>

				<!-- @click="navTo('/pages/teamDetailPeople/teamDetailPeople')" -->
			</uni-list>

		</view>

		</scroll-view>
		
		<view class="qiandao-box" :style="{'visibility':animateState ? 'inherit' : 'hidden'}"  @click="qiandao_success">
			<view class="qiandao-item no-animate" :class="animateState_main ? 'animate-on' : false" > 
				<image class="close-btn" src="/static/img/box_shut@2x.png" ></image>
				<image class="item-img gggg" src="/static/1571194502069_1570778409.png"></image>
<!-- 				<image class="item-img cccc" src="/static/img/Signin_light@2x.png"></image>
				<image class="item-img gggg" src="/static/img/Signin_Success@2x.png"></image> -->
			</view>
		</view>
		
		<view class="update-box" v-if="updateBox"  @click="show_update(false)">
					<view class="update-item no-animate">
						<view class="wrap-box">
							<view class="wrap-title">当前版本</view>
							<view class="version">V{{version}}</view>
							<view class="title">更新内容:</view>
							<scroll-view class="scroll-bar update-content" scroll-y="true">
							 {{versionExplain}}
							 </scroll-view>
<!-- 							<button
							class="btn" 
							type="red" 
							@click="updateBtn"
							>立即更新</button> -->
						</view>
						<image class="close-btn" src="/static/img/box_shut@2x.png"  @click="show_update(false)"></image>
						<image class="item-img " src="/static/img/update_bg@2x.png"></image>
		
					</view>
		</view>
			
			
		

	</view>
</template>

<script>
		import mInput from '../../components/m-input.vue'
	import listCellUser from '@/components/list-cell-user';
	
	import uniList from '@/components/uni-list/uni-list.vue'
	import uniListItemRight from '@/components/uni-list-item/uni-list-item-right.vue'
	
	export default {
		components: {
			listCellUser,
			uniList,
			uniListItemRight,
			mInput,
		},
		data() {
			return {
				versionExplain:"修复了一些bug",
				updateBox:false,
				animateState:false,
				animateState_main:false,
				version:"1.0.0",
				hasNewApply:0,
				showTeamState:false,
				baseUrl : getApp().globalData.baseUrl,
				rbacToken : getApp().globalData.rbacToken,
				createTime:"",
				teamNum:"",
				teamName:"",
				item:[],
				headImg:"",
				name:"",
				list: [
						  
						],
			};
		},
		onShow(){
			
			this.versionExplain = this.user.versionExplain;
			const _this = this;
			try{
				plus.runtime.getProperty(plus.runtime.appid, function(widgetInfo) {
					_this.version = widgetInfo.version;
				})
			}catch(e){
				
			}


		},
		methods:{
			show_update(bol){
				this.updateBox = bol;
			},
			//签到成功的动画
			qiandao_success(){
				
				if( !this.animateState_main){
					return ;
				}
				this.animateState_main= !this.animateState_main;
				this.animateState=false;
				setTimeout(() => {
					
				}, 1000);
			},
			showERWEIMA(){
				this.animateState_main = true; 
				this.animateState=true;
			},
			update(){
				this._updateState(this.version,this,true)
			},
			}
	}
</script>

<style lang="scss">
	.update-box{
		background: rgba(0,0,0,0.3);
	}
	.gggg{
		width:50% !important;
		height:50% !important;
		
	}
	.input-title{
		font-size:32upx;
	}
	.conten{
		width: 100%;
		height: 100%;
		overflow: hidden;
		background: #fff;
	}
	.uni-list{

		.uni-badge-success{
			background-color: #fff !important;
		}
	}
	.top-box{
		flex:1;
		
		width:100%;
		background: #fff;
		border-bottom:30upx solid #eee;
		max-height:360upx;
		min-height:360upx;
		.title {
			text-align: center;
			margin: 0 auto;
			margin-top: 20upx;
			font-size: 32upx;
		}
	}
	.cover-container{
		flex:1;
		// max-height:384upx;
		// min-height:384upx;
	}
	.scroll-bar{
		flex:1;
		height:0;
	}
	.bottom-side{
		background: #eee;
		flex:1;
		max-height:140upx;
		min-height:140upx;
		.btn{
			width:80%;
			margin-top:40upx;
		}
	}
	.list-item{
		float:left;
	}
	.title-icon {
		border-radius: 20rpx;
		display: block;
		width: 140upx;
		height: 140upx;
		margin: 0 auto;
		margin-top: 50upx;
		position:relative;
		.img{
			// border-radius: 50%;
			border-radius: 20rpx;
			width:100%;
			height:100%;
			position: absolute;
			left:0;
			top:0;
		}
		.icon{
			width:40upx;
			height:40upx;
			position: absolute;
			right:0;
			bottom:0;
		}

		
	}


	.sub-text {
		margin: 0 60upx;
		margin-top: 45upx;
		margin-bottom:35upx;
	}

	.bottom-bg-button {
		bottom: 400upx;
	}
	.create-time{
		
		font-size: 24upx !important;
		color:#bfbfbf;
	}
</style>
