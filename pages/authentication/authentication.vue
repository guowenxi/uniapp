<template>
	<view class="content no-padding">
		<view class="input-group ">
			<view class="input-row border input-row-99">
				<text class="title">姓名</text>
				<!-- <text class="placeholder-class">{{info.name}}</text> -->
				<m-input  class="placeholder-class" type="text"  v-model="name" placeholder="请输入姓名"></m-input>
				<!-- <m-input type="text" focus :placeholder="info.name" disabled></m-input> -->
			</view>
			<view class="input-row border input-row-99">
				<view class="title">性别</view>
				<picker  class="pick-item" @change="changeSelect($event,'sex')"  range-key="name" :value="sexIndex" :range="sex">
					<view class="pick-input">{{sex[sexIndex]['name']}}</view>
				</picker>
			<!-- <pickerSelect class="pick-box-item" keyName="name" :sel-list="sex" @btnClick="changeSelect($event,'sexId')"></pickerSelect> -->
			</view>
			<view class="input-row border input-row-99">
				<view class="title">身份证号</view>
				<m-input   class="placeholder-class" type="idcard" v-model="cardId" placeholder="请输入身份证号"></m-input>
			</view>
			<view class="input-row border input-row-99">
				<text class="title">职业</text>
				<picker class="pick-item" @change="changeSelect($event,'Duty')"  range-key="name" :value="DutyIndex" :range="Duty">
					<view class="pick-input">{{Duty[DutyIndex]['name']}}</view>
				</picker>
			</view>
			<view class="input-row border input-row-99">
				<text class="title">部门(选填)</text>

				<picker  class="pick-item" @change="changeSelect($event,'Department')"  range-key="name" :value="DepartmentIndex" :range="Department">
					<view class="pick-input">{{Department[DepartmentIndex]['name']}}</view>
				</picker>
			</view>
			<view class="input-row border input-row-99">
				<text class="title">镇街</text>
				<picker v-if="Street.length>0"  class="pick-item" @change="changeSelect($event,'Street')"  range-key="name" :value="StreetIndex" :range="Street">
					<view class="pick-input">{{Street[StreetIndex]['name']}}</view>
				</picker>
			</view>
			<view class="input-row border input-row-99">
				<text class="title">村社</text>
				<picker v-if="Community.length>0"  class="pick-item" @change="changeSelect($event,'Community')"  range-key="name" :value="CommunityIndex" :range="Community">
					<view class="pick-input">{{Community[CommunityIndex]['name']}}</view>
				</picker>
			</view>
		</view>

		<view class="btn-row">
			<button type="red" class="red new-bg-red" @tap="bindLogin">实名验证</button>
		</view>
	</view>
</template>


<script>
	import service from '../../service.js';
	import mInput from '../../components/m-input.vue';
	import pickerSelect from '@/components/pickerSelect.vue';
	export default {
		components: {
			mInput,
			pickerSelect
		},
		data() {
			return {
				DepartmentIndex:0,
				DutyIndex:0,
				StreetIndex:0,
				CommunityIndex:0,
				sexIndex:0,
				cardId:"",
				sexId:"1",
				sex:[
					{name:'男',id:1},
					{name:'女',id:2},
				],
				departmentName:"无",
				departmentId:"",
				Duty:[],
				Department:[],
				Street:[],
				Community:[],
				name:"",
				newpassword:"",
				phonereg:/^[1][3,4,5,7,8][0-9]{9}$/,
				phone: '',
				password: '',
				security: '',
				info:{}
			}
		},
		onLoad(){
			this.info = this.selListItem;
			this.getDepartment();
			this.getStreet();
			this.getDuty();
		},
		methods: {
			
			changeSelect(e, type) {
				//DepartmentIndex
				debugger
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
			
			getStreet(){
				const _this = this; 
				this.$http.get('fyVolunteer/fyDistricts/getStreet', {
					rbacToken:this.user.rbacToken
					})
					.then(res => {
						if (res.data.success == 1) {
							
							_this.Street = res.data.data;
							if(_this.Street.length>0){
								_this.StreetId = this.Street[0].id;
							}
							//StreetIndex
							_this.Street.map((item,idx)=>{
								if(_this.info.streetId == item.id){
									_this.StreetIndex = idx;
									_this.StreetId = item.id;
								}
							})
							this.getCommunity();
						}else{
							uni.showToast({
								mask:true,
								icon:'none',
								title: res.data.message
							});
						}
					})
			},
			getCommunity(){
				const _this = this; 
				this.$http.get('fyVolunteer/fyDistricts/getCommunity', {
					id:this.StreetId,
					rbacToken:this.user.rbacToken
					})
					.then(res => {
						if (res.data.success == 1) {
							_this.Community = res.data.data;
							if(_this.Community.length>0){
								_this.CommunityId = this.Community[0].id;
							}
							_this.Community.map((item,idx)=>{
								if(_this.info.communityId == item.id){
									_this.CommunityIndex = idx;
									_this.CommunityId = item.id;
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
			getDepartment(){
				const _this = this;
				this.$http.get('fyVolunteer/department/getList', {
					rbacToken:this.user.rbacToken
					})
					.then(res => {
						if (res.data.success == 1) {
						
							_this.Department = res.data.data;
							_this.Department.unshift({
								name:"无",
								id:""
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
			
			bindLogin() {
				debugger
				
				const _this = this;
				if (this.name.length == '') {
					uni.showToast({
						mask: true,
						icon: 'none',
						title: '请输入名字'
					});
					return;
				}
				if (this.cardId.length < 18) {
					uni.showToast({
						mask: true,
						icon: 'none',
						title: '请输入正确身份证号码'
					});
					return;
				}
				// if (this.duty.length  < 2) {
				// 	uni.showToast({
				// 		icon: 'none',
				// 		title: '请输入正确的职业'
				// 	});
				// 	return;
				// }
			
				this.$http
					.post('fyVolunteer/user/authentication', {
						name: this.name,
						cardId: this.cardId,
						streetId: this.StreetId,
						communityId: this.CommunityId,
						sex: this.sexId,
						duty: this.DutyId,
						departmentName: this.departmentName == '无' ? '' : this.departmentName,
						departmentId: this.departmentId,
						rbacToken: this.user.rbacToken
					})
					.then(res => {
						if (res.data.success == 1) {
							uni.showToast({
								mask: true,
								title: '认证成功',
								success: () => {
									setTimeout(() => {
										this.switchTabTo('/pages/index/index');
									}, 1500);
								}
							});
						} else {
							uni.showToast({
								mask: true,
								icon: 'none',
								title: res.data.message
							});
						}
					});
			}
			

		}
	}
</script>

<style lang="scss">
.pick-item{
	flex:1;
	height:57upx;
	line-height:57upx;
	.pick-input{
		height:57upx;
		line-height:57upx;
		font-size:30upx;
		margin: 20upx 0 ;
		text-align: right;
		padding-right:30upx;
	}
}


.input-group{
	margin-left:30upx;
	
	&:before{
		display: none;
	}
	margin-top:0;
}
	.btn-row{
		position: absolute;
		bottom:40upx;
		left:0;
		width:100%;
	}
	.title,.security{
		// border-right:1px solid #ccc;
		height:100upx;
		line-height:100upx;
		font-size:30upx;
		// margin: 20upx 0 ;
		padding-left:0;
		text-align: left;
	}
	.m-input-view{
		padding-right:35upx;
		
		// text-indent: 35upx;
	}
	.getPhone {
		height:57upx;
		line-height:57upx;
		font-size:30upx;
		margin: 20upx 0 ;
	}

	.security {
		text-align: left;
		padding: 0 25upx;
	}
	
	.bottom-btn-box {
		max-height:80upx;
		min-height:80upx;
		margin-top: 20upx;
		flex: 1;
		display: flex;
		.left-btn {
			margin:0 30upx;
			flex: 1;
		}
	
		.right-btn {
			margin:0 30upx;
			flex: 1;
		}
	}
	
</style>
