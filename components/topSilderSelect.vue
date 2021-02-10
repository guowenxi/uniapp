<template>
	<view class="pick-box">
		<view class="pick-item">
			<text>{{selList[0][keyName]}}</text>
			<image class="icon" src="/static/img/icon_down@2x.png"></image>
		</view>
		<view class="pick-wrap-box">
			<view v-for="(item,indx) in selList" class="pick-wrap-box">
				<text>{{item[keyName]}}</text>
			</view>
		</view>
		<picker class="pick-item" @change="bindPickerChange"  :range-key="keyName" :value="selIndex" :range="selList">
			<view class="pick-input">{{selList[selIndex][keyName]}}</view>
		</picker>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				selIndex:0,
			}
		},
		props: {
			keyName:{
				type: String,
				default: null
			},
			selList: {
				type: Array,
				default: [
					'1', '2', '3', '4'
				]
			}
		},
		methods: {
				bindPickerChange: function(e) {
					this.$emit('btnClick',{selIndex:e.target.value})
					this.selIndex = e.target.value
				}
		},
	}
</script>

<style lang="scss">

.pick-box{
	position: relative;
	font-size:26upx;
	display: flex;
	flex-flow:row nowrap;
	height:70upx;
	.pick-item{
		padding-left:10upx;
		padding-right:40upx;
		position: relative;
		flex:1;
		width:auto;
		.pick-input{
		
			height:70upx;
			line-height:70upx;
			text-align: center;
			// position: absolute;
			// top: 50%;
			// transform: translateY(-50%);
		}
	}
	.icon{
		right:10upx;
		max-width: 20upx;
		flex:1;
		height: 10upx;
		position: absolute;
		top:50%;
		transform: translateY(-50%);
	}
}
</style>
