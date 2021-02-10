<template>
	<view class="content">
		<view class="title">防疫志愿服务说明</view>
		<text class="text">
			防疫志愿者服务介绍：
			在村（社区）服务站点，协助工作人员开展测量体温、查看健康码、维持出入秩序、防疫知识宣传等工作。
			操作步骤如下：
			1.志愿者在防疫志愿服务待领取列表—领取任务，选择任务时间段。
			2.领取任务后志愿者点击防疫志愿服务，在已领取列表中查看领取的任务并点击查看详情。
			3.志愿者在任务开始之前达到指定防疫服务站，点击开始任务，允许迟到半个小时，打卡时间为任务开始前一个小时到任务开始后半个小时。（例如任务是8点到10点，那么可以开始打卡的时间为7点到8点半）。
			4.任务时间到达后，可以点击打卡完成任务，完成任务打卡时间必须要在任务时间结束后才能点击（例如任务时间是8点到10点，必须10点之后才可以结束打卡），完成任务后，由系统自动判断本次工作时长后获取相应平安币。
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

	line-height:50upx;
	font-size:32upx;
}
</style>
