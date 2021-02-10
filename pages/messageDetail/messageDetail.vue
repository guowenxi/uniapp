<template>
	<view class="content no-padding">
		<view class="top-box">
					<image class="title-icon" src="/static/img/alliance_icon@2x.png"></image>
			<view class="title">{{info.groupName}}</view>
			<view class="sub-text">群简介:{{info.content}}</view>
		</view>

		<uni-list>
			
			<uni-list-item  class="list-item" title="群成员" show-badge="true" :badge-text="String(info.userNum)" @click="navTo('/pages/teamUserList/teamUserList')"></uni-list-item>
<!-- 			<uni-list-item class="list-item" title="消息历史"></uni-list-item>
 -->

			
		</uni-list>
	</view>
</template>

<script>
	import uniList from '@/components/uni-list/uni-list.vue'
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
	export default {
		components: {
			uniList,
			uniListItem
		},
		data() {
			return {
					info:{},
					
			};
		},
		onLoad(){
			this.info = this.selListItem;
			
		}
	}
</script>

<style lang="scss">
	.uni-list{
		margin-top:20upx;
		.uni-badge-success{
			background-color: #fff !important;
		}
	}
	.top-box{
		width:100%;
		background: #fff;
	}
	.content{
		background: #eee;
	}
	.list-item{
		float:left;
	}
	.title-icon {
		display: block;
		width: 140upx;
		height: 140upx;
		margin: 0 auto;
		margin-top: 50upx;
	}

	.title {
		text-align: center;
		margin: 0 auto;
		margin-top: 20upx;
		font-size: 32upx;
	}

	.sub-text {
		margin: 0 60upx;
		margin-top: 45upx;
		margin-bottom:35upx;
	}

	.bottom-bg-button {
		bottom: 400upx;
	}
</style>
