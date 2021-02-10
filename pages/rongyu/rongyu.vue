<template>
	<view class="content">
		<view class="title">如何获得荣誉值？</view>
		<view class="main">通过参与平安任务、平安巡防进行上报隐患，待隐患核实后确认隐患属于“一般隐患”“较大隐患”“重大隐患”时，可获得相应“荣誉值”10，20，30。每次平安巡防任务完成后，由系统自动判断此次符合巡防要求的，可获得相应“荣誉值”20。通过挑战答题，可获得“荣誉值”，当累计到一定荣誉值的时候，可以自动提升星级。</view>
		<view class="title">荣誉值分哪些等级？</view>
		<view class="item" v-for="(item,idx) in list ">
			<view class="left">{{item.name}}</view>
			<view class="star" v-if="item.star == 0 ">
				<image class="icon" src="/static/img/crown@2x.png"></image>
			</view>
			<view class="star" v-else>
				<image class="icon"   v-for="item02 in item.star " src="/static/img/star@2x.png"></image>
			</view>
			<view class="right">{{item.num}}</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[
					{name:"平安志愿者",star:[1],num:"0-999"},
					{name:"平安志愿者",star:[1,2],num:"1000-1999"},
					{name:"平安志愿者",star:[1,2,3],num:"2000-2999"},
					{name:"平安志愿者",star:[1,2,3,4],num:"3000-3999"},
					{name:"平安志愿者",star:[1,2,3,4,5],num:"4000-4999"},
					{name:"平安卫士",star:[1],num:"5000-6999"},
					{name:"平安卫士",star:[1,2],num:"7000-9999"},
					{name:"平安卫士",star:[1,2,3],num:"10000-11999"},
					{name:"平安卫士",star:[1,2,3,4],num:"12000-13999"},
					{name:"平安卫士",star:[1,2,3,4,5],num:"14000-18999"},
					{name:"平安模范",star:"0",num:"19000-1000000"},
				]
			};
		}
	}
</script>

<style lang="scss">
.title{
	margin:10upx 0 ;
	font-size: 30upx;
	line-height: 40upx;
	color: #333333;
	font-weight: bold;
}
.main{
		text-indent: 40upx;
		font-size: 28upx;
		line-height: 40upx;
		color: #606060;
}
.item{
	display: flex;
	flex-flow: row nowrap;
	margin:10upx 0 ;
	line-height:40upx;
	font-size: 28upx;
	padding:0 30upx;
	.icon{
		vertical-align: middle;
		width:30upx;
		height:30upx;
		display: inline-block;
		margin:0 4upx;
	}
	.left{

		max-width:22%;
		min-width:22%;
		flex:1;
	}
	.star{
		flex:1;
	}
	.right{
		flex:1;
	}
	
}
</style>
