<template>
	<view class="content no-padding">
		<!-- <image class="title-img" src="/static/1571194502069_1570778409.png"></image> -->
		<view class="new-item-box">
			<view class="item-title">
				<view class="left-line"></view>
				<view class="title">详情</view>
			</view>
			<view class="item-content">
				<view class="txt">
					<text class="t">标题:</text>
					<text class="r">
						<text >{{ info.title  }}</text>
					</text>
				</view>
				<view class="txt">
					<text class="t">发布人:</text>
					<text class="r">
						<text >{{ info.publishPerson   }}</text>
					</text>
				</view>
				<view class="txt">
					<text class="t">发布时间:</text>
					<text class="r">{{ info.publishTime  }}</text>
				</view>
			</view>
		</view>
		<view class="new-item-box">
			<view class="item-title">
				<view class="left-line"></view>
				<view class="title">公告内容</view>
			</view>
			<view >
				{{info.content}}
			</view>
		</view>
		

	</view>
</template>

<script>
import leftLineTitle from '@/components/left-line-title.vue';
import listCellComment from '@/components/list-cell-comment.vue';
export default {
	components: {
		leftLineTitle,
		listCellComment
	},
	data() {
		return {
			gridType: 0,
			intervalSecondTime: 0,
			carouselIndex: 0,
			id: '',
			videoUrl: '',
			likeState: false,
			baseUrl: getApp().globalData.baseUrl,
			rbacToken: getApp().globalData.rbacToken,
			info: [],
			commentList: [],
			content: ''
		};
	},
	onLoad() {
		this.gridType = this.user.gridType == 0 ? false : true;

		this.id = this.selListItem.id;

		this.selectDetailById();
	},
	methods: {
		selectDetailById() {
			this.$http
				.get('/fyVolunteer/fySafeMessage/selectDetailById', {
					id: this.id,
					rbacToken: this.user.rbacToken
				})
				.then(res => {
					if (res.data.success == 1) {
						this.info = res.data.data;
						
					} else {
						uni.showToast({
							icon: 'none',
							title: res.data.message
						});
					}
				});
		},
	}
};
</script>

<style lang="scss">
.item-title {
	text-align: center;
	font-size: $new-font-40;
	color: #333 !important;
}

/* 头部 轮播图 */
.carousel-section {
	position: relative;

	padding: 20upx;
	padding-top: 20upx;

	.titleNview-placing {
		height: var(--status-bar-height);
		// padding-top: 44px;
		box-sizing: content-box;
		padding-top: 0;
		height: 0;
	}

	.titleNview-background {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 330upx;
		transition: 0.4s;
	}

	.carousel {
		.carousel-item {
			padding: 0;
		}
	}

	.swiper-dots {
		left: 45upx;
		bottom: 40upx;
	}
}

.new-item-box {
	background: #fff;

	padding: 20rpx;
	border-bottom: 10rpx solid #f6f6f6;

	.item-title {
		margin-bottom: 10rpx;
		float: left;
		width: 100%;
		height: 30rpx;
		line-height: 30rpx;

		.left-line {
			float: left;
			position: relative;
			top: 50%;
			transform: translateY(-50%);

			width: 10rpx;
			height: 24rpx;
			background-color: #e32417;
			border-radius: 5rpx;
		}

		.title {
			margin-left: 20rpx;
			font-weight: bold;
			float: left;
			text-shadow: 0 2rpx 2rpx rgba(125, 133, 141, 0.4);
			font-size: $new-font-30;
			color: #333333;
		}

		.right-title {
			font-size: 22rpx;
			float: right;
			color: #b7b7b7;
		}
	}

	.item-content {
		font-size: 26rpx;
		margin-left: 30rpx;

		.item-grey-color {
			color: #b7b7b7;
			font-size: 28rpx;
		}

		.txt {
			margin-top: 10rpx;
			display: flex;
			flex-flow: row nowrap;

			width: 100%;

			.t {
				color: #7b7b7b;
				text-align-last: justify;
				min-width: 25%;
				max-width: 25%;
			}

			.r {
				text-indent: 20rpx;
				flex: 1;
				overflow: hidden;
			}
		}
	}
}

.bottom-btn-box {
	position: fixed;
	bottom: 0upx;
	left: 0;
	background: #fff;
	// border-top: 1px solid #eee;
	max-height: 160upx;
	min-height: 160upx;
	width: 100%;

	// padding-top: 20upx;
	flex: 1;

	display: flex;
	margin: 0 auto;

	.left-btn {
		margin-top: 40upx;
		width: 90%;
		// flex: 1;
	}

	.linear-btn {
		color: #fff;
		background-image: linear-gradient(-45deg, #ec6434 0%, #ff8a4e 100%), linear-gradient(#e32417, #e32417);
	}
}
</style>
