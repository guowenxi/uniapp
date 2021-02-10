<template>
	<view class="content">
		<view class="title">答题规则</view>
		<text class="text">
			通过参与答题，每次连续答对5道题可获得相应积分，每周上限20积分。每次挑战答错可有一次复活答题机会。
		</text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">

.title{
	text-align: center;
	font-size:32upx;
	font-weight: bold;
	margin-bottom:34upx;
	line-height:70upx;
}
.text{
	text-indent: 70upx;
	line-height:50upx;
	font-size:32upx;
}
</style>
