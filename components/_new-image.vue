<template>
	<view class="new-box">
		<view class="title">{{title}}<text class="color-orange" v-if="isMustFill == 1">必填</text></view>
		<view>
			<sunui-upimg :disable="disable" :defaultValue="defaultValue" @change="getImageInfo1" :url="url" :upload_auto="true" ref="upimg1" :upload_count="3" ></sunui-upimg>
		</view>
		<view v-if="description !=''">提示:{{description}}</view>
		</view>
</template>

<script>
import sunUiUpimg from '@/components/sunui-upimg/sunui-upimg.vue';
export default {
	
	components: {
		'sunui-upimg': sunUiUpimg
	},
	data() {
		return {
			value:[],
			url: getApp().globalData.baseUrl + "fyProHandle/file/upload",
			baseUrl: getApp().globalData.baseUrl,
			rbacToken: getApp().globalData.rbacToken,
		};
	},
	props: {

		defaultValue: {
			type: [Object,Array],
			default:  () => {
				return [];
			}
		},	
		title: {
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
		disable: {
			type: Boolean,
			default: false
		},
	},
	mounted(){
		
		this.defaultValue = this.defaultValue;
		
	},
	methods: {
		imgs(data){
			
		},
		getImageInfo1(e) {
			let _list = [];
			if(this.defaultValue.length>0){
				_list = this.defaultValue;
			}
			e.map((item,idx)=>{
				_list.push(item.data[0])
			})
			this.$emit('eventClick',_list.join(","))
			
			console.log('图片返回1：', e)
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
