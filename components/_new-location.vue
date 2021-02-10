<template>
	<view class="new-box">
		<view class="title">{{title}}
		 <text class="color-orange" v-if="isMustFill == 1">必填</text> 
		<text  v-if="!disable" style="color:#3d81ff;float:right" @click="resetLocation">刷新</text>
		</view>
		<view>
			<view class="uni-input">{{value}} </view>
			<!-- <input class="uni-input" :placeholder="placeholder" :type="type" @input="input" :value="value"/> -->
			<view  v-if="!disable"  style="color:#3d81ff;" class="title" @click="location">地址微调</view>
		</view>
		
		<view v-if="description !=''">提示:{{description}}</view>
		</view>
	
</template>

<script>
export default {
	data() {
		return {
			value:"请选择地址"
		};
	},
	props: {
		defaultValue: {
			type: [String,Object,Boolean],
			default: ""
		},
		disable: {
			type: Boolean,
			default: false
		},
		title: {
			type: String,
			default: ""
		},
		placeholder: {
			type: String,
			default: "请输入"
		},
		type: {
			type: String,
			default: "text"
		},
		isMustFill: {
			type: [String,Number],
			default: '-1'
		},
		description: {
			type: String,
			default: ""
		},
	},
	mounted(){
		this.value = this.defaultValue === true ? "" : this.defaultValue;
	},
	methods: {
		resetLocation(){
			const _this = this;
			uni.getLocation({
			    type: 'gcj02', //返回可以用于uni.openLocation的经纬度
				altitude: true,
				geocode: true, //默认false，是否解析地址信息
			    success: function (res) {
					uni.hideLoading();
					const _ad  = res.address;
					_this.value = `${_ad.district}${_ad.street}${_ad.streetNum}${_ad.poiName}`; 
					_this.user.longitude = res.longitude;
					_this.user.latitude = res.latitude;
					_this.$emit('eventClick',_this.value);
			    }
			});
		},
		location(){
			const _this = this;
			uni.chooseLocation({
				success: function (res) {
					_this.value = res.address; 
					_this.user.longitude = res.longitude;
					_this.user.latitude = res.latitude;
					_this.$emit('eventClick',_this.value);
				}
			});
		},
		input(event) {
			
			this.$emit('eventClick',event.target.value);
		}
	}
};
</script>

<style lang="scss">
.new-box {
	.color-red{
		color: #e72f20;
	}
	.title {
		font-size: 28rpx;
		line-height: 40rpx;
		color: #7b7b7b;
	}
	.uni-input{
		color:#3d81ff;
		height: 60rpx;
		line-height: 60rpx;
	}
	

}
</style>
