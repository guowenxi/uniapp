<template>
	<view class="new-box">
		<view class="title">{{title}}</view>
		<view>
			<picker @change="eventClick" :value="index" :range="list" range-key="name">
				<view class="uni-input">{{list[index] ? list[index].name : ''}}</view>
			</picker>
		</view>
		</view>
</template>

<script>
export default {
	data() {
		return {
			list:[],
			index:0,
		};
	},
	props: {
		value: {
			type: [String,Object],
			default: ""
		},
		title: {
			type: String,
			default: ""
		},
		parentId: {
			type: String,
			default: '0'
		},
		type: {
			type: String,
			default: ""
		},
	},
	async mounted(){
		await this.getCommunity();
		this.filterVal();
	},
	methods: {
		filterVal(){
			const _this= this;
			this.list.map((item,idx)=>{
				if(item.id == _this.value){
					_this.index = idx;
				}
			})
		},
		//获取街道列表数据
		async getCommunity(){
			await this.$http
				.get('fyVolunteer/fyDistricts/getCommunity', {
					id:this.parentId,
					rbacToken: this.user.rbacToken
				})
				.then(res => {
					this.list= res.data.data;
					return res.data.data
				})
		},
		eventClick(event) {
			const idx = event.detail.value
			this.index = idx;
			this.$emit('eventClick',this.list[idx].id);
		}
	}
};
</script>

<style lang="scss">
.new-box {

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
