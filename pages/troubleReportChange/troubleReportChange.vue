<template>
	<view class="content no-padding">
			<scroll-view class="history-section icon" scroll-y>
				<textarea auto-height class="textarea-box" v-model="descrVal"  placeholder-style="color:#ccc" placeholder="请输入问题描述" @input="changeTextarea"  @confirm="changeTextarea"/>
					<view class="middle-box">
						<!-- <file-picker  :fileList="fileList" :audioList="audioList"></file-picker> -->
						<file-picker ref="filePicker"></file-picker>
					</view>
					
					<view class="location-box">
								<view class="text" style="width:20%;float:left;">隐患地址</view>
						<view class="loc-text clamp" style="width:80%;height:100%;" >
							<!-- <view class="loc-t">{{address=='' ? '请选择隐患地址' : address}}</view> -->
							<!-- :disabled="address == '' ? true : false" -->
							<!-- <input class="m-input"  placeholder-class="placeholder" type="text" v-model="address" placeholder="请选择隐患地址"></input> -->
							<scroll-view class="history-section history-section-x icon" scroll-x>{{address !="" ?  address : "请选择隐患地址"}}</scroll-view>
							<image class="loc-icon" src="/static/img/icon_position@2x.png" @click="chooseLocation"></image>
						</view>
					</view>
					
					<textarea auto-height class="textarea-box textarea-box-info" v-model="descrValInfo"  placeholder-style="color:#ccc" placeholder="详细地址:如道路、门牌号、小区、楼栋号、单元室等等" @input="changeTextareaInfo"  @confirm="changeTextareaInfo"/>
					
					<view class="default-item-box">
								<view class="text">选择主题分类</view>

								<view 
								@click="changeTag(item,index) "
								v-for="(item,index) in tagList"
								class="uni-tag tag-item"
								 :class="tagCheck== item.id ? 'uni-tag-red-border' : 'uni-tag-defalut-border' "
								 >{{item.sub_name}}</view>
<!-- 								<uni-tag class=""   inverted :text="item.sub_name" ></uni-tag> -->
					</view>
					<!-- @click="qiandao_success" -->
				<view class="qiandao-box" :style="{'visibility':animateState ? 'inherit' : 'hidden'}"  >
					<view class="qiandao-item" :class="animateState_main ? 'animate-on' : false" @click="qiandao_success"> 
						<image class="close-btn" src="/static/img/box_shut@2x.png" ></image>
						<image class="item-img cccc" src="/static/img/Signin_light@2x.png"></image>
						<image class="item-img gggg" src="/static/img/box_thank@2x.png"></image>
					</view>
				</view>		
			
					<button class="bottom-button" type="red" @click="submit()">确认上报</button>
			</scroll-view>
			
			
	</view>
</template>

<script>
import mInput from '../../components/m-input.vue'
	import uniTag from "@/components/uni-tag/uni-tag.vue"
	import filePicker from "@/components/filePicker.vue"
	export default {
		components: {
			uniTag,
			mInput,
			filePicker
		},
		data() {
			return {
				animateState:false,
				animateState_main:false,
				descrVal:"",
				descrValInfo:"",
				taskInfo:{
					manageDepart:""
				},
				address:"",
				tagCheck:"",
				fileList:[],
				audioList:[],
				descr:"",
				menuList:[
					{icon:"/static/img/icon_picture@2x.png",icon_disable:"/static/img/icon_picture_gray@2x",name:"照片"},
					{icon:"/static/img/icon_shot@2x.png",icon_disable:"/static/img/icon_shot_gray@2x",name:"拍摄"},
					{icon:"/static/img/icon_sound@2x.png",icon_disable:"/static/img/icon_sound_gray@2x",name:"录音"},
				],
				selTags:[],
				tagList:[
					
				]
			};
		},
		onShow(){
			
		},
		onLoad(options){

			this.taskInfo = this.selListItem;
			if(this.taskInfo.manageDepart){
				this.descrVal = this.taskInfo.taskDesc1;
			}
			this.navbackIndex= options.navbackIndex ? options.navbackIndex : '1';
			this.getProType();
			this.getLocation();
			
		},
		methods: {
			//签到成功的动画
			qiandao_success(){
				if( !this.animateState_main){
					return ;
				}
				this.animateState_main= !this.animateState_main;
				
				setTimeout(() => {
					this.animateState=false;
					this.navigateBack(Number(this.navbackIndex));
					// this.navTo('/pages/personMissonDetailBegin/personMissonDetailBegin');
				}, 1000);
			},
			getLocation(){
				let _this = this;
				uni.getLocation({
					geocode:true,
					// type: 'wgs84',
					success: function (res) {
						console.log(res);
						const _address = res.address;
						// _address.streetNum  = _address.streetNum && _address.streetNum!=undefind ? _address.streetNum  :  "";
						_address.poiName  = _address.poiName && _address.poiName!='undefind' ? _address.poiName  :  "";
						_this.address = `${_address.city}${_address.district}${_address.street}${_address.streetNum}${_address.poiName}`
						_this.longitude = res.longitude;
						_this.latitude = res.latitude;
					}
				});
			},
			//获取地址
			chooseLocation(){

				let _this = this;
				uni.chooseLocation({
					 // type: 'wgs84',
					success: (res)=> {
						_this.address = res.address;
						_this.longitude = res.longitude;
						_this.latitude = res.latitude;
					}
				});
			},
			//获取列表
			getProType() {
				this.$http.get('fyProHandle/proHandle/getProType', {
					type:1,
					rbacToken:this.user.rbacToken
					})
					.then(res => {
						this.tagList = res.data.data;
						if(this.taskInfo.fieldName){
							this.tagList.map((item,idx)=>{
								if(item.sub_name == this.taskInfo.fieldName){
									this.tagCheck  = item.id;
									this.tagCheckName= item.sub_name;
								}
							})
						}

					})
			},
			changeTextarea(event){
				
				// this.descrVal =`#${this.tagCheckName}#  ${event ? event.detail.value : '' }`;
				this.descrVal =event.detail.value;

				
			},
			changeTextareaInfo(event){
				
				// this.descrVal =`#${this.tagCheckName}#  ${event ? event.detail.value : '' }`;
				this.descrValInfo =event.detail.value;

				
			},
			changeTag(item,index){
				if(this.taskInfo.fieldName){
					return ;
				}
				this.tagCheckName= item.sub_name;
				this.tagCheck= item.id;
				//修改问题描述模板
				
				// this.descr= "";
				// this.changeTextarea();
				// this.descrVal = '#'+this.tagCheckName+'#  '+this.descr ;
				//this.$set(this.tagList,index,{name:item.name,check:!this.tagList[index].check})
				// this.tagList[index].check = !this.tagList[index].check;
			},
			//确认上报
			submit(){
				debugger
				const _this = this;
				console.log(this.$refs.filePicker.fileList);
				console.log(this.$refs.filePicker.audioList);

				if(!this.tagCheck){
					uni.showToast({
						icon:'none',
						title: "请选择隐患类型"
					});
					return; 
				}
				
				this.loadingState();
				this.$http.post('fyProHandle/proHandle/saveProHandle', {
					name:this.taskInfo.taskName,
					subject:this.tagCheck,
					file1:this.$refs.filePicker.fileList,
					file2:this.$refs.filePicker.audioList,
					longitude:this.longitude,
					latitude:this.latitude,
					address:this.address+(this.descrValInfo == '' ? '' : '#')+this.descrValInfo,
					// descr:`#${this.tagCheckName}#  ${this.descrVal}`,
					descr:this.descrVal,
					rbacToken:this.user.rbacToken,
					taskType:this.taskInfo.id ? 2 : 1,
					taskId:this.taskInfo.id ? this.taskInfo.id :  this.taskInfo.taskId,
					})
					.then(res => {
						uni.hideLoading();
						if (res.data.success == 1) {
							this.animateState=true;
							this.animateState_main=true;
							// setTimeout(() => {
							// 	this.animateState=false;
							// 	_this.navigateBack(Number(_this.navbackIndex));
							// 	// this.navTo('/pages/personMissonDetailBegin/personMissonDetailBegin');
							// }, 5000);
							
							// uni.showToast({
							// 	icon:'none',
							// 	title: '感谢您参与瓯海平安建设',
							// 	complete: () => {
							// 		setTimeout(() => {
										
							// 			_this.navigateBack(Number(_this.navbackIndex));
							// 			// this.navTo('/pages/personMissonDetailBegin/personMissonDetailBegin');
							// 		}, 1500);
							// 	}
							// });
						}else{
							uni.showToast({
								icon:'none',
								title: res.data.message
							});
						}
					})
			}
		}
	}
</script>

<style lang="scss">
.history-section-x{
	height:100% !important;
	width:88%;
	color:#007AFF;
}
.history-section {
		flex:1;
		height:0;
		// background: #fff;
		border-radius: 10upx;
}

.bottom-button{
	width:90%;
	margin:40upx 5%;
	float:left;
	
}
.content{
	background:#eee;
}
.scroll-box{
	background:#eee;
	height:85%;
}

.textarea-box{

	font-size:32upx;
	background: #fff;
	padding:30upx;
	width:100%;
	min-height: 300upx;
	margin-bottom:15upx;
	color:#333;
}
.textarea-box-info{
	float:left;
	min-height: 150upx;

}
.middle-box{
	background: #fff;
	.list{
    align-items: center;
    flex-wrap: wrap;
	padding:25upx 0 ;
	width:100%;
	float:left;
	.middle-item{

    float: left;
    width: 33%;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: $font-base;
    color: #303133;
			.icon{
					width: 80upx;
				height: 80upx;
			}
			.text{
				margin-top:10upx;
				text-align: center;
			}
		}
	}
		margin-bottom:15upx;
}
.location-box{
	height:100upx;
	font-size:30upx;
	
	position: relative;
	float:left;
	width:100%;
	background: #fff;
	padding:0 32upx;
	margin-bottom:15upx;
	line-height:100upx;
	display: flex;
	flex-flow: row nowrap;
	.m-input{
		color:#007AFF;
		padding:0;
		height:100upx;
		float:left;
		width:85%;
		font-size:30upx;
	}
	.placeholder{
		color:#007AFF;
	}
	.loc-text{
		// line-height:50upx;
		position: relative;
		.loc-t{
			color:#007AFF;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			width:90%;
		}
		.loc-icon {
			width: 28upx;
			    height: 34upx;
			    margin-right: 12upx;
			    position: absolute;
			    top: 50%;
			    right: 6upx;
	    transform: translateY(-50%);
		}
	}
}
.default-item-box{
	font-size:30upx;

	position: relative;
	float:left;
	width:100%;
	background: #fff;
	padding:10upx 32upx;
	margin-bottom:15upx;
	line-height:40upx;
	.text{
		padding: 15upx 0 ;
	}
}

.tag-item{
	float:left;
	margin: 10upx  10upx;
}
.qiandao-item{
	.gggg{
		width: 460upx;
		height: 340upx;
	}
}
</style>
