<template>
	<view class="content no-padding">
<view class="new-item-box">
						<view class="item-title">
							<!-- <view class="left-line"></view> -->
							<view class="title">{{info.title}}</view>
							<!-- <view class="title" style="font-size: 28rpx;">{{info.prompting}}</view> -->
						</view>
						<view class="item-content">
							<view class="txt">
								<text class="t">发布人:</text>
								<text class="r">{{info.createUserName}}</text>
							</view>
							<view class="txt">
								<text class="t">发布时间:</text>
								<text class="r">{{info.updateTime}}</text>
							</view>
						</view>
					</view>
		<view class="formFieldList" v-for="(item,idx) in info.formFieldList" v-if="pageShowState">
			<!-- :range="JSON.parse(item.fieldOptions)"  -->
			<view v-if="item.fieldType == 'checkboxgroup' ">
				<new-check-box  
				:title="item.title" 
				:single="false"
				:range="item.fieldOptions.split(',')" 
				:isOther = "item.isOther"
				:isMustFill="item.isMustFill"
				:description="item.description"
				 @eventClick="changeVal($event,item.fieldKey)"></new-check-box>
			</view>
			
			<view v-else-if="item.fieldType == 'radiogroup' ">
				<new-check-box  
				:title="item.title" 
				:single="true"
				:range="item.fieldOptions.split(',')"
				:isOther = "item.isOther"
				:isMustFill="item.isMustFill"
				:description="item.description"
				 @eventClick="changeVal($event,item.fieldKey)"></new-check-box>
			</view>
			<view v-else-if="item.fieldType == 'text' " >
				<new-input :title="item.title"
				:defaultValue="''"
				 type="text"
				  :isMustFill="item.isMustFill"
				  :description="item.description"
				  @eventClick="changeVal($event,item.fieldKey)"></new-input>
			</view>
			<view v-else-if="item.fieldType == 'number' " >
				<new-input :title="item.title"
				:defaultValue="''"
				 type="number"
				  :isMustFill="item.isMustFill"
				  :fieldUnit="item.fieldUnit"
				  :description="item.description"
				   @eventClick="changeVal($event,item.fieldKey)"></new-input>
			</view>
			<view v-else-if="item.fieldType == 'datetime' " >
				<new-datetime :title="item.title"
				:defaultValue="''"
				  :isMustFill="item.isMustFill"
				 :description="item.description"
				   @eventClick="changeVal($event,item.fieldKey)"
				   ></new-datetime>
			</view>
			<view v-else-if="item.fieldType == 'location' " >
				<new-location 
				:title="item.title"
				:defaultValue="''"
				:isMustFill="item.isMustFill"
				:description="item.description"
				@eventClick="changeVal($event,item.fieldKey)"
				></new-location>
			</view>
			<view v-else-if="item.fieldType == 'image' " >
				<new-image
				 :title="item.title"
				  :defaultValue="[]" 
				   :isMustFill="item.isMustFill"
				  :description="item.description"
				   @eventClick="changeVal($event,item.fieldKey)"
				   ></new-image>
			</view>
			

			<view v-else-if="item.fieldType == 'gridSelect' " >
				<new-pick-gridselect 
				@eventClick="changeVal($event,item.fieldKey)" 
				:description="item.description"
				:defaultValue="{}"></new-pick-gridselect>
			</view>
<!-- 						<view v-else-if="item.fieldType == 'street' " >
							<new-pick-street :title="item.title"  @eventClick="changeVal($event,item.fieldKey)" :value="'330304001000'"></new-pick-street>
						</view>
						<view v-else-if="item.fieldType == 'community' " >
							<new-pick-community :title="item.title" @eventClick="changeVal($event,item.fieldKey)" :parentId="'330304001000'" :value="'330304001000'"></new-pick-community>
						</view> -->
						

		</view>
		<view style="height:160rpx;"></view>
		<view class="btn-row bottom-btn-box">
			<button
			class="bottom-float-button left-btn " 
			type="red-border" 
			@click="navigateBack(1)">取消</button>
			
			<button
			class="bottom-float-button new-button-color" 
			type="red" 
			@click="openSubNvue">提交</button>	
		</view>
		
		
		<uni-popup ref="popup" nopadding="true"  >
			
			<view class="time-select-box default-item-box">
				<view class="time-select-box-title">
					<!-- <image class="left-icon" src="/static/img/icon_warning@2x.png"></image> -->
					<view class="title font-red">提示</view>
					<view class="text">提交成功! 可在已填写中查看详情</view>
				</view>
				
				<view class="bottom-btn-box">
				
				<button
				class="bottom-float-button button" 
				type="transparent" 
				@click="popMission('2')">完成</button>
				<view class="middle-line"></view>
				<button
				class="bottom-float-button button" 
				type="transparent" 
				@click="popMission('1')">继续填写</button>	
				</view>
				
			</view>
			
		
		</uni-popup>
		
		
	</view>
</template>

<script>
	import service from '../../service.js';
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import mInput from '../../components/m-input.vue'
	import newCheckBox from '../../components/_new-check-box.vue'
	import newInput from '../../components/_new-input.vue'
	import newDatetime from '../../components/_new-datetime.vue'
	import newLocation from '../../components/_new-location.vue'
	import newImage from '@/components/_new-image.vue';
	import newPickStreet from '@/components/_new-pick-street.vue';
	import newPickCommunity from '@/components/_new-pick-community.vue';
	import newPickGridselect from '@/components/_new-pick-gridselect.vue';
		import uniPopup from "@/components/uni-popup/uni-popup.vue"
	export default {
		components: {
			mInput,
			newCheckBox,
			newInput,
			newDatetime,
			newLocation,
			newImage,
			newPickStreet,
			newPickCommunity,
			newPickGridselect,
			uniPopup,
			
		},
		data() {
			return {
				pageShowState:false,
				// content:"{\"key8\":[\"5649bae0ca594b4da8d01882e9227b4c\",\"259fb57a47d14c7190e1798eef370eb5\"],\"key1\":[\"中国\",\"美国\",\"日本\"],\"key3\":[\"巴西\"],\"key4\":\"中国12321\",\"key6\":\"11111\"},
				content:{},
				selContent:[],
				info:{
					formFieldList:[]
				},
				DutyIndex:0,
				Duty:[],
			}
		},
		onReady(){
			
		},
		onUnload(){
			//移除所有监听
			uni.$off();
		},
	onShow() {
		//#ifdef APP-PLUS
		uni.getSubNVueById('tipsPopup').hide('auto',0);
		uni.getSubNVueById('tips').hide('auto',0);
		uni.getSubNVueById('success').hide('auto',0);
		//#endif
	},
		onLoad(){
	
			
			this.id = this.selListItem.id;
			this.formPublishId = this.selListItem.formPublishId;
			this.getFormPublishDetail() 
			
			
			// 监听事件
			uni.$on('_new_xinxishangbao_add',(info)=>{  
				switch(info.type){
					case "abandon" :
					
					break;
					case "complete" :
					this.saveFormInfo();
					break;
				}
				console.log("接收啦")
			})
			
		},
		methods: {
			//弹出框
			popDetail(){
				this.$refs.popup.open();
			},
			//弹出框
			popMission(state){
				if(state == 1){
					this.content = {};
					this.getFormPublishDetail();
					this.$refs.popup.close();
				}else{
					this.$refs.popup.close();
					this.navigateBack(1);
				}
			},
			
			openSubNvue(){

				//#ifdef APP-PLUS
				uni.getSubNVueById('tipsPopup').show('auto',200);
				uni.getSubNVueById('tips').show('auto',200);
				//#endif

				//#ifdef H5
				this.saveFormInfo();
				//#endif
				
			},
			changeVal(_,key){
				
				this.content[key] = _;
				console.log(this.content)
				console.log(JSON.stringify(this.content))
			},
			
			saveFormInfo(){
				const _this = this;
				this.$http.post('fyMicroGridManage/fyFormInfo/saveFormInfo', {
					"formPublishId":this.formPublishId, //已发布表单表id
					"content":JSON.stringify(this.content),
					rbacToken:this.user.rbacToken
					})
					.then(res => {
						if (res.data.success == 1) {
							this.popDetail();
							// uni.showToast({
							// 	mask:true,
							// 	icon: 'none',
							// 	duration:2000,
							// 	title: "提交成功,正在为您返回微上报..."
							// });
							// setTimeout(()=>{
							// 	this.navigateBack(1);
							// },2000)
							
							// uni.getSubNVueById('tipsPopup').show('auto',200);
							// uni.getSubNVueById('success').show('auto',200);
						}else{
							uni.showToast({
								mask:true,
								icon:'none',
								title: res.data.message
							});
						}
					})
			},
			//编辑的信息上报
			getFormInfoAppDetail(){

				this.$http.get('fyMicroGridManage/fyFormInfo/getFormInfoAppDetail', {
					id:this.id,
					rbacToken:this.user.rbacToken
					})
					.then(res => {
						if (res.data.success == 1) {
							this.info = res.data.data;

						}else{
							uni.showToast({
								mask:true,
								icon:'none',
								title: res.data.message
							});
						}
					})
			},
			//填写的信息上报
			getFormPublishDetail(){
				this.pageShowState = false;
				this.$http.get('fyMicroGridManage/fyForm/getFormPublishDetail', {
					id:this.id,
					rbacToken:this.user.rbacToken
					})
					.then(res => {
						if (res.data.success == 1) {

							this.info = res.data.data;
							this.pageShowState = true;
						}else{
							uni.showToast({
								mask:true,
								icon:'none',
								title: res.data.message
							});
						}
					})
			},
			getDuty(){
				const _this = this; 
				this.$http.get('fyVolunteer/fyDistricts/getDuty', {
					id:this.StreetId,
					rbacToken:this.user.rbacToken
					})
					.then(res => {
						if (res.data.success == 1) {
							_this.Duty = res.data.data;
							if(_this.Duty.length>0){
								_this.DutyId = this.Duty[0].id;
							}
							_this.Duty.map((item,idx)=>{
								if(_this.info.duty == item.id){
									_this.DutyIndex = idx;
									_this.DutyId = item.id;
								}
							})
						}else{
							uni.showToast({
								mask:true,
								icon:'none',
								title: res.data.message
							});
						}
					})
			},
			changeSelect(e, type) {
				//DepartmentIndex
				
				this[`${type}Index`] = e.target.value;
				if(type=="Street"){
					this.StreetId = this.Street[e.target.value].id;
					
					this.getCommunity();
				}else if(type=="Community"){
					this.CommunityId= this.Community[e.target.value].id;
				}else if(type=="Department"){
					this.departmentId= this.Department[e.target.value].id;
					this.departmentName= this.Department[e.target.value].name;
			
				}else if(type=="Duty"){
					this.DutyId= this.Duty[e.target.value].id;
				}else{
					this.sexId = this.sex[e.target.value].id;
				}
				
			},
		}
	}
</script>

<style lang="scss">
	.formFieldList{
		border-bottom: 20rpx solid #f6f6f6;
		padding:24rpx 20rpx 20rpx;
	}
	.input-row-no{
		padding-top:0 !important;
		padding-bottom: 0 !important;
	}
	.login-title-view{
		color:#7b7b7b !important;
	}

	.btn-row {
		z-index:300;
		position: fixed;
		bottom: 0;
		width: 100%;
		background: #f6f6f6;
		// max-height: 100upx;
		// min-height: 100upx;
		padding-top: 20upx;
		flex: 1;
		display: flex;
	.bottom-float-button{
		float: inherit;
		width:80%;
		margin:0 auto;
		margin-bottom:20upx;
	}
	
		.left-btn {
			margin-right: 30upx;
	

		}
	
		.right-btn {
	
			max-width: 60%;
			min-width: 60%;
			flex: 1;
		}
	}
	.login-title-view {
		color: #333;
		margin-top: 20upx;
		font-size: $font-lg;
		margin-left: 30upx;
		width: 100%;
	}
.new-item-box {
	background: #fff;
	
	padding: 20rpx;
	border-bottom: 10rpx solid #f6f6f6;
	.item-title {


		width: 100%;

		line-height: 40rpx;
		.left-line {
			float: left;
			position: relative;
			top: 50%;
			transform: translateY(-50%);

			width: 10rpx;

			background-color: #e32417;
			border-radius: 5rpx;
		}
		.title {
			margin-left: 0rpx;
			font-weight: bold;

			
			font-size: $new-font-30;
			color: #333333;
		}
		.right-title {
			font-size: 22rpx;
			float: right;
			color: #b7b7b7;
		}
	}
	.item-content {
		font-size: 26rpx;
		margin-left: 0rpx;
		.txt {
			margin-top: 10rpx;
			display: flex;
			flex-flow: row nowrap;

			width: 100%;
			.t {
				color: #7b7b7b;
				text-align-last: justify;
				min-width: 20%;
				max-width: 20%;
			}
			.r {
				text-indent: 20rpx;
				flex: 1;
				overflow: hidden;
			}
		}
	}
}

.forget{
	padding-top:20upx;
	padding-right:20upx;
	font-size:30upx;
	line-height:50upx;
	float: right;
}
.content{
	overflow: hidden;
}
.m-input-view{
	padding:0;
}
.input-row{
	padding:30upx;
	
}
.m-input{
	line-height:100upx;
	height:100upx;
	
}
.title-emp{
	width:0 !important;
}
.title-box-view{
	padding-left:30upx;
	margin-top:100upx;
	margin-bottom:50upx;
	font-size:56upx;
	color: #e32417;
}
	.uni-page-head-hd{
		display: none;
	}
	.action-row {
		font-size: 30upx;
		display: flex;
		flex-direction: row;
		justify-content: center;
	}

	.action-row navigator {
		color: #007aff;
		padding: 0 20upx;
	}

	.oauth-row {
		display: flex;
		flex-direction: row;
		justify-content: center;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
	}

	.oauth-image {
		width: 100upx;
		height: 100upx;
		border: 1upx solid #dddddd;
		border-radius: 100upx;
		margin: 0 40upx;
		background-color: #ffffff;
	}

	.oauth-image image {
		width: 60upx;
		height: 60upx;
		margin: 20upx;
	}
	
	.time-select-box{
		width:500rpx;
		height: auto !important;
		overflow: hidden;
		.time-select-box-title{
			padding:20rpx;
		}
		.bottom-btn-box{
			.middle-line{
				position: absolute;
				left:50%;
				transform: translateX(-50%);
				height:100%;
				width:1rpx;
				background-color: #efefef;
			}
			border-top:1rpx solid #efefef;
		}
		
	}
	
</style>
