<template>
	<view class="new-box">
		<view class="title">{{title}}<text class="color-orange" v-if="isMustFill == 1">必填</text></view>
		<view>
			<picker mode="date"  @change="eventClick" :value="value">
			    <view class="uni-input">{{value}}</view>
			</picker>
		</view>
		<view v-if="description !=''">提示:{{description}}</view>
		</view>
</template>

<script>
export default {
	data() {
		return {
			value:""
		};
	},
	props: {

		title: {
			type: String,
			default: ""
		},
		defaultValue: {
			type: String,
			default: ""
		},
		placeholder: {
			type: String,
			default: "请输入"
		},
		
		isMustFill: {
			type: [String,Number],
			default: '-1'
		},
		
		description: {
			type: String,
			default: ""
		},
		type: {
			type: String,
			default: "text"
		},
	},
	mounted(){
		this.value = this.defaultValue === 'true' ||  this.defaultValue === true ? "" : this.defaultValue;
		
	},
	methods: {
		eventClick(event) {
			this.value = event.target.value;
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
		height: 60rpx;
		line-height: 60rpx;
	}
	

}
</style>
