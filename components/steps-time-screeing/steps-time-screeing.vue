<template>
	<view class="steps-time">
		<view class="item" v-for="(item,index) in options">
			<view class="left-bar">
				<view>{{item.createTime.split(" ")[1]}}</view>
				<view style="color:#7b7b7b;">{{item.createTime.split(" ")[0]}}</view>
			</view>
			<view class="mid-bar">
<!-- 				<view class="yuan" :class="index==options.length-1 && item.handleType != 3 ? 'grey-color' : 'blue-color'"> -->
<view class="yuan blue-color" > 
				</view>
				<view class="line blue-color"  ></view>
			</view>
			<view class="right-bar">
				<view>{{item.recordContent}}</view>
				<view style="color:#7b7b7b;">{{item.subRecordContent}}</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import uniIcons from '../uni-icons/uni-icons.vue'
	export default {
		name: 'UniSteps',
		data() {
			return {
				range:[]
			};
		},
		components: {
			uniIcons
		},
		props: {
			options: {
				type: Array,
				default () {
					return []
				}
			} // 数据
		},
		data() {
			return {}
		},
		beforeUpdate(){
			let _options =  [] ;
			
			this.options.map((it,idx)=>{
				if(it.handleType == 2){
					
					_options.push(it)
					_options.push({
						"createTime":it.createTime
						,handleType:2.5})
				}else if(it.handleType == 4){
					_options.push(it)
					_options.push({
						"createTime":it.createTime
						,handleType:5})
				}else{
					_options.push(it)
				}
			})
			this.options = _options;
		}, 
		methods:{
			checkIndex(item){
				this.$emit('checkIndex',item);
			},
		}
	}
</script>

<style lang="scss" scoped>
	
	.steps-time{
		padding:20rpx 0;
		display: flex;
		flex-flow:column nowrap;
		.item{
			&:last-child{
				.line{
					display: none;
				}
			}
			display: flex;
			flex-flow:row nowrap;
			flex:1;
			.left-bar{
					margin-bottom: 30rpx;
				font-size:20rpx;
				text-align: center;
				min-width:170rpx;
				max-width:170rpx;
			}
			.mid-bar{
			margin:0 20rpx;
			margin-top: 8rpx;
					min-width:15rpx;
					max-width:15rpx;
					display: flex;
					flex-flow:column nowrap;

					
					.yuan{
						margin-top: 5rpx;
						width:15rpx;
						min-height:15rpx;
						max-height:15rpx;
						border-radius: 50%;
					}
					.line{
						
						margin:5rpx auto;
						width:1px;
						flex:1;
					}
				}
				.right-bar{
					margin-right:20rpx;
					flex:1;
					margin-bottom: 30rpx;
				}
		}
	}
	.grey-color{
		background: #8F8F94;
	}
	.blue-color{
		background: #4CD964;
	}

</style>
