<template>
	<view class="content">
		<view class="input-group">
			<view class="input-row border input-row-99">
				<view class="title">姓名</view>

				<m-input class="m-input" type="text" v-model="name" placeholder="请输入姓名"></m-input>
			</view>
			<view class="input-row border input-row-99">
				<view class="title">身份证号</view>
				<m-input type="idcard" v-model="cardId" placeholder="请输入身份证号"></m-input>
			</view>
			<view class="input-row border input-row-99">
				<view class="title">职业</view>
				<!-- <m-input class="m-input" type="text" clearable focus v-model="duty" placeholder="请输入职业"></m-input> -->
				<picker class="pick-item" @change="changeSelect($event, 'Duty')" range-key="name" :value="DutyIndex" :range="Duty">
					<view class="pick-input">{{ Duty[DutyIndex]['name'] }}</view>
				</picker>
			</view>
			<view class="input-row border input-row-99">
				<view class="title">部门(选填)</view>
				<picker v-if="Street.length > 0" class="pick-item" @change="changeSelect($event, 'Department')" range-key="name" :value="DepartmentIndex" :range="Department">
					<view class="pick-input">{{ Department[DepartmentIndex]['name'] }}</view>
				</picker>
				<!-- 			<pickerSelect v-if="Street.length>0" class="pick-box-item" keyName="name" :sel-list="Department" @btnClick="changeSelect($event,'departmentId')"></pickerSelect> -->
			</view>
			<view class="input-row border input-row-99">
				<view class="title">镇街</view>
				<picker v-if="Street.length > 0" class="pick-item" @change="changeSelect($event, 'Street')" range-key="name" :value="StreetIndex" :range="Street">
					<view class="pick-input">{{ Street[StreetIndex]['name'] }}</view>
				</picker>
				<!-- <pickerSelect v-if="Street.length>0" class="pick-box-item" keyName="name" :sel-list="Street" @btnClick="changeSelect($event,'StreetId')"></pickerSelect> -->
			</view>
			<view class="input-row border input-row-99">
				<view class="title">村社</view>
				<picker v-if="Community.length > 0" class="pick-item" @change="changeSelect($event, 'Community')" range-key="name" :value="CommunityIndex" :range="Community">
					<view class="pick-input">{{ Community[CommunityIndex]['name'] }}</view>
				</picker>
				<!-- <pickerSelect  v-if="Community.length>0" class="pick-box-item" keyName="name" :sel-list="Community" @btnClick="changeSelect($event,'CommunityId')"></pickerSelect> -->
			</view>
			<view class="input-row border input-row-99">
				<view class="title">性别</view>
				<picker class="pick-item" @change="changeSelect($event, 'sex')" range-key="name" :value="sexIndex" :range="sex">
					<view class="pick-input">{{ sex[sexIndex]['name'] }}</view>
				</picker>
				<!-- <pickerSelect class="pick-box-item" keyName="name" :sel-list="sex" @btnClick="changeSelect($event,'sexId')"></pickerSelect> -->
			</view>
		</view>
		<view class="btn-row "><button type="red" class="red" @click="bindLogin">实名验证</button></view>
		<!-- 		<view class="action-row">
			<navigator url="../reg/reg">注册账号</navigator>
			<view>|</view>
			<navigator url="../pwd/pwd">忘记密码</navigator>
		</view> -->
		<!-- 		<view class="oauth-row" v-if="hasProvider" v-bind:style="{top: positionTop + 'px'}">
			<view class="oauth-image" v-for="provider in providerList" :key="provider.value">
				<image :src="provider.image" @tap="oauth(provider.value)"></image>
			</view>
		</view> -->
	</view>
</template>

<script>
import pickerSelect from '@/components/pickerSelect.vue';
import service from '../../service.js';
import mInput from '../../components/m-input.vue';

export default {
	components: {
		pickerSelect,
		mInput
	},
	data() {
		return {
			DepartmentIndex: 0,
			DutyIndex: 0,
			StreetIndex: 0,
			CommunityIndex: 0,
			sexIndex: 0,
			sex: [{ name: '男', id: 1 }, { name: '女', id: 2 }],
			sexId: 1,
			duty: '',
			name: '',
			cardId: '',
			Duty: [],
			Department: [],
			Street: [],
			Community: [],
			providerList: [],
			hasProvider: false,
			phone: '',
			passWord: '',
			positionTop: 0
		};
	},
	onLoad() {
		this.getDepartment();
		this.getStreet();
		this.getDuty();
	},
	methods: {
		changeSelect(e, type) {
			//DepartmentIndex
			this[`${type}Index`] = e.target.value;
			if (type == 'Street') {
				this.StreetId = this.Street[e.target.value].id;

				this.getCommunity();
			} else if (type == 'Community') {
				this.CommunityId = this.Community[e.target.value].id;
			} else if (type == 'Department') {
				this.departmentId = this.Department[e.target.value].id;
				this.departmentName = this.Department[e.target.value].name;
			} else if (type == 'Duty') {
				this.DutyId = this.Department[e.target.value].id;
			} else {
				this.sexId = this.sex[e.target.value].id;
			}
		},

		getStreet() {
			const _this = this;
			this.$http
				.get('fyVolunteer/fyDistricts/getStreet', {
					rbacToken: this.user.rbacToken
				})
				.then(res => {
					if (res.data.success == 1) {
						_this.Street = res.data.data;
						if (_this.Street.length > 0) {
							_this.StreetId = this.Street[0].id;
						}
						this.getCommunity();
					} else {
						uni.showToast({
							mask: true,
							icon: 'none',
							title: res.data.message
						});
					}
				});
		},
		getCommunity() {
			const _this = this;
			this.$http
				.get('fyVolunteer/fyDistricts/getCommunity', {
					id: this.StreetId,
					rbacToken: this.user.rbacToken
				})
				.then(res => {
					if (res.data.success == 1) {
						_this.Community = res.data.data;
						if (_this.Community.length > 0) {
							_this.CommunityId = this.Community[0].id;
						}
					} else {
						uni.showToast({
							mask: true,
							icon: 'none',
							title: res.data.message
						});
					}
				});
		},
		getDuty() {
			const _this = this;
			this.$http
				.get('fyVolunteer/fyDistricts/getDuty', {
					id: this.StreetId,
					rbacToken: this.user.rbacToken
				})
				.then(res => {
					if (res.data.success == 1) {
						_this.Duty = res.data.data;
						if (_this.Duty.length > 0) {
							_this.DutyId = this.Duty[0].id;
						}
					} else {
						uni.showToast({
							mask: true,
							icon: 'none',
							title: res.data.message
						});
					}
				});
		},
		getDepartment() {
			const _this = this;
			this.$http
				.get('fyVolunteer/department/getList', {
					rbacToken: this.user.rbacToken
				})
				.then(res => {
					if (res.data.success == 1) {
						_this.Department = res.data.data;
						_this.Department.unshift({
							name: '无',
							id: ''
						});
					} else {
						uni.showToast({
							mask: true,
							icon: 'none',
							title: res.data.message
						});
					}
				});
		},

		bindLogin() {
			debugger;
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
	},
	onReady() {},
	onBackPress(event) {
		// if(event.from =="backButton"){
		// 	this.switchTabTo('/pages/user/user');
		// }
		this.switchTabTo('/pages/user/user');
		return true;
	}
};
</script>

<style lang="scss">
.m-input-view {
	margin-left: 35upx;
}
.pick-item {
	flex: 1;
	height: 57upx;
	line-height: 57upx;
	margin: 20upx 0;
	.pick-input {
		height: 57upx;
		line-height: 57upx;
		font-size: 30upx;
		margin: 20upx 0;
		text-align: left;
		padding-left: 35upx;
	}
}

.title {
	border-right: 1px solid #ccc;
	height: 57upx;
	line-height: 57upx;
	font-size: 30upx;
	margin: 20upx 0;
	padding-left: 0;
	text-align: center;
}
.pick-box-item {
	width: 100%;
	line-height: 90upx;
	height: 90upx;
	.pick-item {
		.pick-input {
			line-height: 90upx !important;
			height: 90upx !important;
		}
	}
}
.uni-page-head-hd {
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
</style>
