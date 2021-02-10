<template>
	<view class="new-box">
		<view class="title">{{title}}<text class="color-orange" v-if="isMustFill == 1">必填</text></view>
		<view>
			<view class="check-item" v-for="(it,idx) in range" @click="eventClick(it)">
				<image
				v-if="single == true " 
				class="icon" 
				:src="value.indexOf(it)<0 ? '/static/_new/wwg_single@2x.png' : '/static/_new/wwg_single_click@2x.png'"></image>
				<image
				v-else 
				class="icon" 
				:src="value.indexOf(it)<0 ? '/static/_new/wwg_multiple@2x.png' : '/static/_new/wwg_multiple_click@2x.png'"></image>
				<text :class="value.indexOf(it)<0 ? '' : 'color-red'">{{it}}</text>
			</view>
		</view>
		<view v-if="isOther == 1" class="new-box" >
			<view  @click="check_input" class="check-item">
			<image
			class="icon" 
			:src="!checkInput ? '/static/_new/wwg_multiple@2x.png' : '/static/_new/wwg_multiple_click@2x.png'"></image>
			<text>其他</text>
			</view>
			<input v-if="checkInput" class="uni-input" placeholder="请输入" :type="type" @input="input" :value="text"/>
		</view>
		<view v-if="description !=''">提示:{{description}}</view>
		</view>
</template>

<script>
export default {
	data() {
		return {
			value:[],
			checkInput:false,
			text:""
		};
	},
	props: {
		range: {
			type:[Object,Array],
			default: {}
		},
		single: {
			type: [String,Boolean],
			default: true
		},

		disable: {
			type: Boolean,
			default:false
		},

		title: {
			type: String,
			default: ""
		},
		type: {
			type: String,
			default: ""
		},

		isOther: {
			type: [String,Number],
			default: '-1'
		},
		isMustFill: {
			type: [String,Number],
			default: '-1'
		},
		description: {
			type: String,
			default: ""
		},
		defaultValue: {
			type: [Array,String],
			default:  () => {
				return [];
			}
		},
	},
	mounted(){
		
		
		if(this.single && this.defaultValue.indexOf(",")>=0){
			this.checkInput= true;
			this.value = this.defaultValue.indexOf(",")[1];
		}else{
			this.value = this.defaultValue;
		}
	},
	methods: {
		check_input(){
			this.checkInput = !this.checkInput;
			if(this.checkInput){
				this.value = [];
			}
		},
		input(event){
			this.text = event.target.value;
			this.value = `other,${event.target.value}`
			this.$emit('eventClick',this.value);
		},
		eventClick(item) {
			if(this.checkInput){
				this.checkInput = false;
				this.value = [];
			}
			if(this.single){
				this.value = [item];	
			}else{
				const _idx= this.value.indexOf(item);
				_idx >=0 ? this.value.splice(_idx,1) : this.value.push(item);
			}
			this.$emit('eventClick',this.value.join(","));
		}
	}
};
</script>

<style lang="scss">
.new-box {
	.uni-input{
		margin: 20rpx;
	}
	.color-red{
		color: #e72f20;
	}
	.title {
		font-size: 28rpx;
		line-height: 40rpx;
		color: #7b7b7b;
	}
	.check-item{
		height: 50rpx;
		line-height: 50rpx;
		.icon{
			display: inline-block;
			margin-right: 18rpx;;
				width: 24rpx;
				height: 24rpx;
		}
		.text{
			font-size: 28rpx;
		}
	}

}
</style>
