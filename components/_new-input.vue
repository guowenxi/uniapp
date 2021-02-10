<template>
	<view class="new-box">
		<view class="title">{{title}}<text class="color-orange" v-if="isMustFill == 1">必填</text></view>
		<view class="input-box">
			<input class="uni-input" :placeholder="disable ? '' :placeholder" :type="type" @input="input" :value="value"/>
			<view class="fieldUnit" v-if="type == 'number'">{{fieldUnit}}</view>
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
		
		description: {
			type: String,
			default: ""
		},
		disable: {
			type: Boolean,
			default: false
		},
		fieldUnit: {
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
			default: "-1"
		},
		defaultValue: {
			type: [Array,String,Boolean],
			default: ""
		},
	},
	mounted(){
		
		this.value = this.defaultValue === true ? "" : this.defaultValue;
	},
	methods: {
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
	.input-box{
		margin-bottom: 10rpx;
		border-bottom:1px solid #f6f6f6;
		display: flex;
		flex-flow:row nowrap;
		height: 60rpx;
		line-height: 60rpx;
		.uni-input{

			flex:1;
			height: 60rpx;
			line-height: 60rpx;
		}
		.fieldUnit{
			min-width:50rpx;
			max-width:200rpx;
		}
	}

	

}
</style>
