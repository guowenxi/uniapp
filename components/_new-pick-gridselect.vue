<template>
	<view class="new-box">
		<view class="title">街道</view>
		<view>
			<picker @change="eventClick($event,0)" :value="index[0]" :range="list[0]" range-key="name">
				<view class="uni-input">{{list[0][index[0]] ? list[0][index[0]].name : ''}}</view>
			</picker>
		</view>
		<view class="title">社区</view>
		<view>
			<picker @change="eventClick($event,1)" :value="index[1]" :range="list[1]" range-key="name">
				<view class="uni-input">{{list[1][index[1]] ? list[1][index[1]].name : ''}}</view>
			</picker>
		</view>

		<view class="title">网格</view>
		<view>
			<picker @change="eventClick($event,2)" :value="index[2]" :range="list[2]" range-key="name">
				<view class="uni-input">{{list[2][index[2]] ? list[2][index[2]].name : ''}}</view>
			</picker>
		</view>
<!-- 		<view class="title">片区</view>
		<view>
			<picker @change="eventClick($event,3)" :value="index[3]" :range="list[3]" range-key="name">
				<view class="uni-input">{{list[3][index[3]] ? list[3][index[3]].name : ''}}</view>
			</picker>
		</view> -->

<view>
	<view class="title">微网格</view>
	<view>
		<picker @click.stop="load_weiwangge(3)" @change="eventClick($event,3)" :value="index[3]" :range="list[3]" range-key="name">
			<view class="uni-input">{{list[3][index[3]] ? list[3][index[3]].name : ''}}</view>
		</picker>
	</view>
</view>


		<view v-if="description !=''">提示:{{description}}</view>
		</view>
</template>

<script>
export default {
	data() {
		return {
			idx:0,
			list:{
				0:[],
				1:[],
				2:[],
				3:[],
			},
			pushList:{
					nameList:[],
					idList:[],
					idxList:[],
			},
			index:[
				0,
				0,
				0,
				0,
			],
		};
	},
	props: {
		description: {
			type: String,
			default: ""
		},
		defaultValue: {
			type: [Array,String,Object],
			default: ""
		},
		type: {
			type: String,
			default: ""
		},
	},
	async mounted(){
		
		const _this = this;
		if(this.defaultValue.idList && this.defaultValue.idList.length>0){
			this.pushList=this.defaultValue;
			_this.getDistrictsByParentIdAndLevel(0,"",'load');
			
			 this.defaultValue.idList.map((item,idx)=>{
				 this.index[idx] = this.defaultValue.idxList[idx];
				_this.getDistrictsByParentIdAndLevel(idx+1,item,'load');
			})
		}else{
			await _this.getDistrictsByParentIdAndLevel(0);
		}
		// this.filterVal();
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
		load_weiwangge(s){
			//获取网格员
		this.$http
			.get('fyMicroGridManage/fyMicrogrid/selectMicroGridList', {
				roadId:this.list[0][this.index[0]],
				communityId:this.list[1][this.index[1]],
				gridId:this.list[2][this.index[2]],
				// zoneId:this.list[3][this.index[3]],
				rbacToken: this.user.rbacToken
			})
			.then(res => {
				uni.hideLoading();
				this.list[s]= res.data.data;
				return res.data.data
			})
		},
		// fyMicroGridManage/fyDistricts/getDistrictsByParentIdAndLevel
		//获取街道列表数据
		async getDistrictsByParentIdAndLevel(s,id,load){
			const _this=this;
			uni.showLoading();
			if(s == 3){
				//获取网格员
				await this.$http
					.get('fyMicroGridManage/fyMicrogrid/selectMicroGridList', {
						roadId:this.list[0][this.index[0]].id ? this.list[0][this.index[0]].id :'',
						communityId:this.list[1][this.index[1]].id? this.list[1][this.index[1]].id :'',
						gridId:this.list[2][this.index[2]].id? this.list[2][this.index[2]].id :'',
						// zoneId:this.list[3][this.index[3]].id? this.list[3][this.index[3]].id :'',
						rbacToken: this.user.rbacToken
					})
					.then(res => {
						uni.hideLoading();
						this.list[s]= res.data.data;
						return res.data.data
					})
			}else{

				let data = {
					parentId:s != 0  && id ? id : "",
					rbacToken: this.user.rbacToken
				}
				s == 0 ? data.districtLevel = 4 : "";
				await this.$http
					//fyVolunteer/fyDistricts/getStreet
					//fyMicroGridManage/fyDistricts/getDistrictsByParentIdAndLevel
					.get('fyMicroGridManage/fyDistricts/getDistrictsByParentIdAndLevel', data)
					.then(res => {
						uni.hideLoading();
						
						// 如果说他要查 的话 是空 则去把这个list放到下一个列表里去
						this.list[s]= res.data.data;
						if(load){
							
						}else if(_this.list[s].length>0){
							_this.pushList.nameList[s+1] = _this.list[s][0].name;
							_this.pushList.idList[s+1] = _this.list[s][0].id;
							_this.pushList.idxList[s+1] = 0;
						}

						return res.data.data;
					})
			}

		},
		eventClick(event,i) {
			
			const idx = event.detail.value;
			const id= this.list[i][idx].id;
			const name= this.list[i][idx].name;
			this.index[i]= idx;
			
			this.pushList.nameList[i] = name;
			this.pushList.idList[i] = id;
			this.pushList.idxList[i] = idx;

			//重置其他的
			for(var key in this.list){
				if(key>i){
					this.list[key] = [];
					this.index[key] = 0;
					this.pushList.nameList.length= i+1;
					this.pushList.idList.length= i+1;
					this.pushList.idxList.length= i+1;
				}
			}
			this.getDistrictsByParentIdAndLevel(i+1,id)
			// this.$emit('eventClick',this.pushIndex.join(","));
			// this.$emit('eventClick',this.pushList.idList.join(","));
			this.$emit('eventClick',JSON.stringify(this.pushList));
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
		margin-bottom: 10rpx;
		border-bottom:1px solid #f6f6f6;
		height: 60rpx;
		line-height: 60rpx;
	}
	

}
</style>
