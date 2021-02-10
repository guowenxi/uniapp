<template>
	<view class="list-cell-icon"  hover-class="cell-hover" :hover-stay-time="50">
		<view class="list-cell">
			<view class="title">{{idx+1}}.{{item.title}}</view>
			<view class="uit" v-for="(uit,index) in item.questionList">{{uit}}</view>
			<view class="miss">
				<text class="green">正确答案:</text>
				<text class="mi">{{item.trueAnswer}}</text>
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
			
			}
		},
		props: {
			item: {
				type: [String,Object],
				default: {}
			},
			idx:{
				type: [String,Object,Number],
				default: 0
			}
		},
		methods: {
			eventClick() {
				this.$emit('eventClick');
			}
		},
	}
</script>

<style lang='scss'>
	.list-cell-icon {
		.list-cell{
			margin-bottom:30upx;
		}
		line-height:50upx;
		.title{
			font-size:$new-font-30;
			line-height: $line-height-40;
			font-weight: bold;
		}
		.uit{
			font-size:$new-font-28;
			line-height: $line-height-40;
			line-height:60upx;
			padding-left:30upx;
			color:#333;
		}
		.miss{
			color:#36CB59;
			.green{
				
			}
			.mi{
				padding-left:10upx;
			}
		}
	}
</style>
