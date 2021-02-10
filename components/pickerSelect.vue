<template>
	<view class="pick-box">
		<picker class="pick-item" @change="bindPickerChange"  :range-key="keyName" :value="selIndex" :range="selList">
			<view class="pick-input">{{selList[selIndex][keyName]}}</view>
		</picker>
		<image class="icon" src="/static/img/icon_down@2x.png"></image>
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
	font-size:28upx;
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
		right:20upx;
		max-width: 20upx;
		flex:1;
		height: 10upx;
		position: absolute;
		top:50%;
		transform: translateY(-50%);
	}
}
</style>
