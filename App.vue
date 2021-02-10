<script>
	export default {
		globalData: {
			baseUrl: "http://47.96.115.177:9000/",
			// baseUrl: "http://115.223.34.195:8090/",

			rbacToken: ''
		},
		onLaunch: function() {

			switch(uni.getSystemInfoSync().platform){
			    case 'android':
					this.user.SystemInfoSync = 'android';
			       console.log('运行Android上')
			       break;
			    case 'ios':
					this.user.SystemInfoSync = 'ios';
			       console.log('运行iOS上')
			       break;
			    default:
			       console.log('运行在开发者工具上')
			       break;
			}
			
			console.log('App Launch');
		},


		onShow: function() {
			console.log('App Show');
		},
		 
		onHide: function() {
			switch(uni.getSystemInfoSync().platform){
			    case 'android':
					console.log('运行安卓上')
					var main = plus.android.runtimeMainActivity();
					const dcRichAlert = uni.requireNativePlugin('DCloud-RichAlert');
					// let PalmGps = uni.requireNativePlugin('palmgpsservice-debug');
					let PalmGps = uni.requireNativePlugin('Gwx-PalmGPS');
					
					PalmGps.getLocation(main);
			       break;
			    case 'ios':
					this.user.SystemInfoSync = 'ios';
			       console.log('运行iOS上')
			       break;
			    default:
			       console.log('运行在开发者工具上')
			       break;
			}
			
			console.log('App Hide');
			return true;
		}
	};
</script>

<style lang="scss">
	
	
	/* 页面左右间距 */
	$page-row-spacing: 30upx;
	$page-color-base: #f8f8f8;
	$page-color-light: #f8f6fc;
	$base-color: #fa436a;

	/* 文字尺寸 */

	$font-sm: 28upx;
	$font-sim: 30upx;
	$font-base: 30upx;
	$font-lg: 34upx;
	$font-title:38upx;
	$line-height-40: 40upx;

	/*文字颜色*/
	$font-color-dark: #303133;
	$font-color-base: #606266;
	$font-color-light: #909399;
	$font-color-disabled: #c0c4cc;
	$font-color-spec: #4399fc;
	/* 边框颜色 */
	$border-color-dark: #dcdfe6;
	$border-color-base: #e4e7ed;
	$border-color-light: #ebeef5;
	/* 图片加载中颜色 */
	$image-bg-color: #eee;
	/* 行为相关颜色 */
	$uni-color-primary: #fa436a;
	$uni-color-success: #4cd964;
	$uni-color-warning: #f0ad4e;
	$uni-color-error: #dd524d;

	@font-face {
		font-family: SourceHanSansCN-Normal;
		font-weight: normal;
		font-style: normal;
		src: url('/static/SourceHanSansCN-Normal.ttf') format('truetype');
	}

.yindao-bg{
	position: fixed;
	width: 100%;
	height: 100%;
	left: 0;
	top: 0;
	// background-color: rgba(0,0,0,0.5);
	z-index:1000;
}
.yindao-img-1{
	width: 416rpx;
	height:270rpx;
	position: absolute;
	left:160rpx;
	top:460rpx;
}
.z-index-1000{
	z-index:1000;
}
.mask-box{
	position: absolute;
border-radius: 10rpx;
	box-shadow:0 0 0 1500rpx rgba(0,0,0,0.8);
}

.mask-box-0{
	left:5rpx;
	top: 178rpx;
	width:740rpx;
	height:280rpx;
}
.mask-box-1{
	left: 10rpx;
	top: 92rpx;
	width:480rpx;
	height:280rpx;
}
.mask-box-2{
    left: 100rpx;
    top: 376rpx;
    width: 180rpx;
    height: 82rpx;
}
.mask-box-3{
     left: 0;
     bottom: 90rpx;
     width: 230rpx;
     height: 110rpx;
}
.mask-box-4{
    left: 470rpx;
    top: 376rpx;
    width: 180rpx;
    height: 82rpx;
}
.yindao-img{
	
	position: absolute;
}
.yindao-img-0{
	width: 416rpx;
	height:270rpx;
	left:130rpx;
	top:472rpx;
}
.yindao-img-1{
	width: 416rpx;
	height:270rpx;
	left:160rpx;
	top:472rpx;
}
.yindao-img-2{
	width: 416rpx;
	height:270rpx;
	left:246rpx;
	top:468rpx;
}
.yindao-img-3{
    width: 532rpx;
    height: 154rpx;
    left: 132rpx;
    bottom: 200rpx;
}
.yindao-img-4{
    width: 416rpx;
    height: 247rpx;
    left: 132rpx;
    top: 472rpx;
}
.button[type='transparent']  {
	background-color: transparent !important;
	
}
.button[type='newred']  {

	background-image: linear-gradient(-30deg, 
		#f03810 0%, 
		#f96137 50%, 
		#ff8358 100%), 
	linear-gradient(
		#e32417, 
		#e32417);
	background-blend-mode: normal, 
		normal;
	box-shadow: 0rpx 0rpx 4rpx 0rpx 
		#f43405;
	border-style: solid;
	border-width: 1rpx;
	border-image-source: linear-gradient(159deg, 
		#ff8251 0%, 
		#c1220e 100%);
	border-image-slice: 1;
}


	.huodong-box{
		width: 690upx;
			height: 160upx;
			// background-image: linear-gradient(90deg, 
			// 	#fd9f61 0%, 
			// 	#eb3002 100%);
			box-shadow: 0px 7upx 8upx 0px 
				rgba(235, 49, 3, 0.32);
			border-radius: 80upx;
			position: relative;
			margin: 20rpx auto;
			// bottom: 10px;
			// left: 0;
			// right: 0;
			.huodong-swiper{
				height:40upx;
			}
		.huodong-bg{
			width:100%;
			height:100%;
			position:absolute;
			left:0;
			top:0;
		}
		.inner{
			margin-left:50upx;
			padding:10upx 0 ;
			color:#fff;
			height:100%;
			width:70%;
			position:absolute;
			left:0;
			top:0;
			z-index:100;
			.title{
				text-shadow: 1px 2px 2px rgba(0,0,0,1);
				font-size:$font-base;
				margin-bottom:10upx;
			}
			.main{
				height:80upx;
				.portrait {
					width: 80upx;
					height: 80upx;
					border: 1px solid #E32417;
					border-radius: 50%;
					float: left;
					
				}
				.right-side{
					line-height: 40upx;
					width:80%;
					float:left;
					text-indent: 20upx;
					.sub-main{
						color: #ffc6ad;
						float: left;
						width:100%;
					}
				}
			}
		}
		.right-icon{
			width: 123upx;
			height: 123upx;
			position:absolute;
			right:20upx;
			top:50%;
			transform: translateY(-50%);
		}
		
	}
	cover-view,
	cover-image {
		display: inline-block;
	}
	
	.placeholder-class{
		line-height: 100upx;
		text-align: right;
		padding-right: 30upx;
		color: grey;
		float: right;
		display: block;
		flex: 1;
	}
	.uni-scroll-view{
		&>div{
			height:100%;
		}
	}
	
	.height-100{
		height:100%;
	}
	
	uni-tabbar .uni-tabbar__label{
		font-size:20upx !important;
	}
	.refresh-ccw{
		position:absolute;
		width:50upx;
		height:50upx;
		left:0;
		right:0;
		margin:0 auto;
		top:-100upx;
	}

.scroll-up-retrun{
	transition: all 0.5s;
}
.srcoll-top-box{
width:100%;
height:200upx;
background: #eee;
}
	.time-select-box {
		width: 400upx;
		position: relative;
		height: 250upx;

		.title {
			font-size: 36upx;
			text-align: center;
		}

		.left-icon {
			width: 60upx;
			height: 60upx;
			float: left;
		}

		.text {
			line-height: 60upx;
			margin-left: 20upx;
			font-size: 30upx;
			// float: left;
		}

		.bottom-btn-box {
			width: 100%;
			display: flex;

			.bottom-float-button {
				flex: 1;

				&:nth-child(1) {
					margin-right: 10upx;
				}
			}
		}


	}



	.content-color-box {
		color: #666;
	}
	.hide-update-box-an{
		
		
		.bg{
			background-color: transparent !important;
		}
		.update-item{
			opacity: 0 !important;
			transform: translate(-50%, -110%) scale(0) !important;
		}
	}
	.update-box {
		transition: all 0.75s;
		z-index: 1000;
		width: 100%;
		height: 100%;
		position: fixed;
		overflow: hidden;
		left: 0;
		top: 0;
		.bg{
			transition: all 0.2s;
			background: rgba(0, 0, 0, 0.5);
		}
		.no-animate{
			// transition:null !important;
		}

		.wrap-box{
				z-index:100;
				width: 555upx;
				height: 750upx;
				// background-color: #ffffff;
				position: absolute;
				left: 50%;
				top: 58%;
				transform: translate(-50%, -50%) scale(1);
				.wrap-title{
					margin-left:33upx;
					font-weight: bold;
					color:#e64239;
					font-size:46upx;
					line-height:50upx;
					margin-top:56upx;
				}
				.version{
					font-size: 26upx;
					line-height:30upx;
					padding:12upx;
					border-radius: 22upx;
					background:#e64239;
					color:#fff;
					display: inline-block;
					margin-left:150upx;
					margin-top:20upx;
				}
				.title{
					margin-left:33upx;
					font-weight: bold;
					color:#e64239;
					font-size:34upx;
					line-height:50upx;
					margin-top:100upx;
				}
				.update-content{
					height:280upx;
					padding:0 40upx;
					font-size:26upx;
					line-height:40upx;
					margin: 20upx 0 ;
				}
				.btn{
					margin: 0 auto;
					    width: 80%;
				}
		}
	
		.update-item {
			transition: all 0.75s;
			width: 555upx;
			height: 888upx;
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%) scale(1);
	
			.item-img {
	
	
				width: 100%;
				height: 100%;
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-50%, -50%);
			}
	
			.close-btn {
				width: 50upx;
				height: 50upx;
				position: absolute;
				left: 90%;
				top: 5%;
				z-index:100;
			}
			.btn{
				
			}
	
		}
	}
	
	.lingqu-box {
		z-index: 1000;
		width: 100%;
		height: 100%;
		position: fixed;
		overflow: hidden;
		left: 0;
		top: 0;
		// background: rgba(0, 0, 0, 0.5);
		.no-animate{
			transition:null !important;
		}
		
		.title-icon{
			width:140upx;
			height:140upx;
			margin: 0 auto;
			margin-top:220upx;
			margin-bottom:80upx;
			display: block;
			
		}
		.textAlgin{
			text-align: center;
			font-size:$font-base;
			line-height:50upx;
		}


		.wrap-box{
				z-index:100;
				width: 600upx;
				height: 760upx;
				// background-color: #ffffff;
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-50%, -50%) scale(1);
				.wrap-title{
					margin-left:33upx;
					font-weight: bold;
					color:#e64239;
					font-size:46upx;
					line-height:50upx;
					margin-top:56upx;
				}
				.version{
					font-size: 26upx;
					line-height:30upx;
					padding:12upx;
					border-radius: 22upx;
					background:#e64239;
					color:#fff;
					display: inline-block;
					margin-left:150upx;
					margin-top:20upx;
				}
				.title{
					margin-left:33upx;
					font-weight: bold;
					color:#e64239;
					font-size:34upx;
					line-height:50upx;
					margin-top:100upx;
				}
				.update-content{
					height:280upx;
					padding:0 40upx;
					font-size:26upx;
					line-height:40upx;
					margin: 20upx 0 ;
				}
				.btn{
					margin: 0 auto;
					width: 80%;
					left: 0;
					position: absolute;
					right: 0;
					bottom: 7%;
				}
		}
	
		.update-item {
			width: 600upx;
			height: 760upx;
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%) scale(1);
	
			.item-img {
	
	
				width: 100%;
				height: 100%;
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-50%, -50%);
			}
	
			.close-btn {
				width: 50upx;
				height: 50upx;
				position: absolute;
				left: 90%;
				top: 5%;
			}
			.btn{
				
			}
	
		}
	}
	

	.qiandao-box {
		z-index: 1200;
		width: 100%;
		height: 100%;
		position: fixed;
		overflow: hidden;
		left: 0;
		top: 0;
		right:0;
		bottom:0;
		background: rgba(0, 0, 0, 0.5);

		.animate-on {

			transform: translate(-50%, -50%) scale(1) !important;
		}
		.no-animate{
			transition:null !important;
		}

		.qiandao-item {
			width: 650upx;
			height: 650upx;
			position: absolute;
			left: 50%;
			top: 50%;
			transition: all 1s;
			transform: translate(-50%, -50%) scale(0);

			.item-img {


				width: 100%;
				height: 100%;
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-50%, -50%);
			}

			.close-btn {
				width: 50upx;
				height: 50upx;
				position: absolute;
				left: 80%;
				top: 20%;
			}

			.cccc {
				animation: mymove 20s infinite linear;

				@keyframes mymove {
					0% {
						transform: translate(-50%, -50%) rotate(0);
					}

					100% {
						transform: translate(-50%, -50%) rotate(360deg);
					}
				}
			}

			.gggg {
				// width:380upx;
				// height:360upx;
			}

		}
	}

	.cover-qiandao-box {
		z-index: 100;
		width: 100%;
		height: 100%;
		position: fixed;
		overflow: hidden;
		left: 0;
		top: 0;
		background: rgba(0, 0, 0, 0.5);

		.animate-on {

			transform: translate(-50%, -50%) scale(1) !important;
		}

		.item-img {
			transition: all 10s;
			transform: translate(-50%, -50%) scale(0);
			width: 650upx;
			height: 650upx;
			transition: all 1s;
			position: absolute;
			left: 50%;
			top: 50%;

		}

		.close-btn {
			width: 50upx;
			height: 50upx;
			position: absolute;
			left: 80%;
			top: 31%;
		}

		.cccc {
			animation: mymove 20s infinite linear;

			@keyframes mymove {
				0% {
					transform: translate(-50%, -50%) rotate(0);
				}

				100% {
					transform: translate(-50%, -50%) rotate(360deg);
				}
			}
		}

		.gggg {
			// width:380upx;
			// height:360upx;
		}

		.qiandao-item {}
	}

	.margin-bottom-160 {
		margin-bottom: 160upx !important;
	}

	.sub-icon {
		font-size:$font-base;
		margin: 20upx auto;
		white-space: nowrap;
		flex: 1;
		width: 90%;

		max-height: 60upx;
		min-height: 60upx;

		.icon-check-on {
			background: #e32417 !important;
			color: #fff !important;
		}

		.icon {
			padding: 10upx 16upx;
			background: #efefef;
			color: #666;
			border-radius: 5upx;
			display: inline-block;
			margin: 0 20upx;

			&:first-child {
				margin-left: 0;
			}

			&:last-child {
				margin-right: 0;
			}
		}
	}
	.new-sub-icon {
		box-sizing: content-box;
		
		font-size:$font-base;
		white-space: nowrap;
		flex: 1;
		max-width: 70%;
		min-width: 70%;
		max-height: 90upx;
		min-height: 90upx;	
		position: relative;
		&::before{
			z-index:10;
			content: "";
			position: absolute;
			left:0;
			top:0;
			height: 100%;
			width: 50rpx;
			background: linear-gradient(to left, transparent, #f6f6f6);
		}
		&:after{
			z-index:10;
			content: "";
			position: absolute;
			right:0;
			top:0;
			height: 100%;
			width: 50rpx;
			background: linear-gradient(to right, transparent, #f6f6f6);
		}
		

		
		.icon-check-on {
			position: relative;
			// background: #e32417 !important;
			color: #e8040a !important;
			&:after{
				content:"";
				position: absolute;
				bottom: 12rpx;
				left: 50%;
				-webkit-transform: translateX(-50%);
				transform: translateX(-50%);
				width: 42rpx;
				height: 8rpx;
				background-color: #e32417;
				box-shadow: 0px 2rpx 2rpx 0px rgba(227, 36, 23, 0.4);
				border-radius: 4rpx;
				
			}
		}

		.icon {

			// padding: 10upx 5upx;
			// background: #efefef;
			color: #666;
			border-radius: 5upx;
			display: inline-block;
			margin: 0 10upx;
			line-height: 90rpx;
			
			&:first-child {
				margin-left: 40rpx;
			}

			&:last-child {
				margin-right: 40rpx;
			}
		}
	}

	.login-title-view {
		color: #333;
		margin-top: 20upx;
		font-size: $font-lg;
		margin-left: 30upx;
		width: 100%;
	}

	uni-image>img {
		opacity: 1 !important;
	}

	/*每个页面公共css */
	/* uni-app默认全局使用flex布局。因为flex布局有利于跨更多平台，尤其是采用原生渲染的平台。如不了解flex布局，请参考http://www.w3.org/TR/css3-flexbox/。如不使用flex布局，请删除或注释掉本行。*/
	.input-row-99 {
		.title {
			flex: 1;
			max-width: 200upx !important;
			min-width: 200upx !important;
		}
	}

	.title-box {
		border-bottom: 1px solid #efefef;
		position: relative;
		width: 100%;
		// background: #fef3f2;
		flex: 1;
		display: flex;
		flex-flow: row nowrap;
		max-height: 90upx;
		min-height: 90upx;
		margin: 0 auto;

		.wuc-tab-item {
			height: 90upx !important;
			line-height: 90upx !important;
		}
	}
	.new-title-box {
		// border-bottom: 1px solid #efefef;
		position: relative;
		width: 100%;
		// background: #fef3f2;
		flex: 1;
		display: flex;
		flex-flow: row nowrap;
		max-height: 100upx;
		min-height: 100upx;
		margin: 0 auto;

		.wuc-tab-item {
			height: 80upx !important;
			line-height: 80upx !important;
		}
	}
	.prompt_img {
		position: absolute;
		left: 50%;
		top: 50%;
		width: 300upx;
		height: 300upx;
		transform: translate(-50%, -50%);
	}
	
	.font-red {
		color: #e32417 !important;
	}
	.font-orange {
		color: #ff965c;
	}
	.font-gray {
		// color: #bfbfbf;
		color: #999999;
	}
	
	.font-green {
		color: #26d31d;
	}
	
	.font-gray-border {
		color: #999999;
		border: solid 1rpx #999999;
	}
	.font-orange-border {
		color: #ff965c;
		border: solid 1rpx #ff965c;
	}
	.font-green-border {
		color: #26d31d;
		border: solid 1rpx #26d31d;
	}


	body,
	page {
		font-family: SourceHanSansCN-Normal;
		font-size: 26upx;
		min-height: 100%;
		display: flex;
	}

	.yellow-text {
		color: #ffdb14;
	}

	.red-text {
		color: #e32417;
	}

	.bottom-bg-button {
		left: 50%;
		transform: translateX(-50%);
		position: absolute;
		bottom: 50upx;
		width: 700upx;
	}

	.bg {
		position: absolute;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
	}

	/* #ifdef MP-BAIDU */
	page {
		width: 100%;
		height: 100%;
		display: block;
	}

	swan-template {
		width: 100%;
		min-height: 100%;
		display: flex;
	}

	/* 原生组件模式下需要注意组件外部样式 */
	custom-component {
		width: 100%;
		min-height: 100%;
		display: flex;
	}

	/* #endif */

	/* 原生组件模式下需要注意组件外部样式 */
	m-input {
		width: 100%;
		min-height: 100%;
		display: flex;
	}

	input {
		font-size: 26upx;
	}

	.content {
		width: 100%;
		display: flex;
		flex: 1;
		flex-direction: column;
		background-color: #fff;
		padding: 20upx;
	}

	.input-group {
		background-color: #ffffff;
		margin-top: 40upx;
		position: relative;
	}

	.input-group::before {
		position: absolute;
		right: 0;
		top: 0;
		left: 0;
		height: 1upx;
		content: '';
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
		background-color: #c8c7cc;
	}

	.input-group::after {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 0;
		height: 1upx;
		content: '';
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
		background-color: #c8c7cc;
	}

	.input-row {
		display: flex;
		flex-direction: row;
		position: relative;
	}

	.input-row .title {
		// width: 20%;
		height: 50upx;
		min-height: 50upx;

		// padding-left: 30upx;
		line-height: 50upx;
	}

	.input-row.border::after {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 0;
		height: 1upx;
		content: '';
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
		background-color: #c8c7cc;
	}

	.btn-row {
		margin-top: 50upx;
		padding: 20upx;
	}

	button.primary {
		background-color: #0faeff;
	}

	.button-hover[type='red'] {
		opacity: 0.8;
		color: #fff;
		background-color: #e32417;
	}

	button[type='red'] {
		color: #fff;
		background-color: #e32417;
	}

	button[disabled='true'] {
		color: #666;
		background-color: #eee;
	}

	.disabled-btn {
		color: #666 !important;
		background-color: #eee !important;
	}

	button[type='red-border'] {
		color: #e32417;
		background-color: #fff !important;
		border: 1px solid #e32417;
	}

	button[type='empty'] {
		color: #666;
		background-color: transparent;
	}

	button[type='empty']::after {
		display: none;
	}

	.button-hover[type='opacity'] {
		opacity: 0.8;
		color: #e32417;
		background-color: #transparent;

		&::after {
			border: none;
		}
	}

	button[type='opacity'] {
		color: #e32417;
		background-color: transparent;

		&::after {
			border: none;
		}
	}

	.input-row-99 {
		font-size: $font-base;

		.title {
			width: 25%;
			height: 99upx;
			line-height: 99upx;
		}

		.uni-input-wrapper {
			font-size: $font-base;
		}
	}

	button {
		font-size: $font-base;
		line-height: 88upx;
		height: 88upx;
	}

	/*
		全局公共样式和字体图标
	*/
	// @font-face {
	// 	font-family: yticon;
	// 	font-weight: normal;
	// 	font-style: normal;
	// 	src: url('https://at.alicdn.com/t/font_1078604_w4kpxh0rafi.ttf') format('truetype');
	// }

	@font-face {
		font-family: iconFon;
		font-weight: normal;
		font-style: normal;
		src: url('https://at.alicdn.com/t/font_1078604_w4kpxh0rafi.ttf') format('truetype');
	}

	// .yticon {
	// 	font-family: "yticon" !important;
	// 	font-size: 16px;
	// 	font-style: normal;
	// 	-webkit-font-smoothing: antialiased;
	// 	-moz-osx-font-smoothing: grayscale;
	// }

	view,
	scroll-view,
	swiper,
	swiper-item,
	cover-view,
	cover-image,
	icon,
	text,
	rich-text,
	progress,
	button,
	checkbox,
	form,
	input,
	label,
	radio,
	slider,
	switch,
	textarea,
	navigator,
	audio,
	camera,
	image,
	video {
		box-sizing: border-box;
	}

	/* 骨架屏替代方案 */
	.Skeleton {
		background: #f3f3f3;
		padding: 20upx 0;
		border-radius: 8upx;
	}

	/* 图片载入替代方案 */
	.image-wrapper {
		font-size: 0;
		background: #f3f3f3;
		border-radius: 4px;

		image {
			width: 100%;
			height: 100%;
			transition: 0.6s;
			opacity: 0;

			&.loaded {
				opacity: 1;
			}
		}
	}

	.clamp {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		display: block;
	}



	.common-hover {
		background: #f5f5f5;
	}

	/*边框*/
	.b-b:after,
	.b-t:after {
		position: absolute;
		z-index: 3;
		left: 0;
		right: 0;
		height: 0;
		content: '';
		transform: scaleY(0.5);
		border-bottom: 1px solid $border-color-base;
	}

	.b-m-r:after {
		position: absolute;
		z-index: 3;
		right: -56upx;
		height: 100%;
		width: 1px;
		content: '';
		transform: scaleY(0.5);
		opacity: 0.7;
		border-right: 1px solid $border-color-base;
	}

	.b-b:after {
		bottom: 0;
	}

	.b-t:after {
		top: 0;
	}

	/* button样式改写 */
	uni-button,
	button {
		height: 80upx;
		line-height: 80upx;
		font-size: $font-lg + 2upx;
		font-weight: normal;

		&:after {
			border: 0;
		}

		&.no-border:before,
		&.no-border:after {
			border: 0;
		}
	}

	uni-button[type='default'],
	button[type='default'] {
		color: $font-color-dark;
	}

	/* input 样式 */
	.input-placeholder {
		color: #999999;
	}

	.placeholder {
		color: #999999;
	}

	.uni-page-head {
		z-index: 100;
		height: 88upx !important;
	}
	// .uni-page-head .uni-page-head__title{
	// 	line-height: 72upx !important;
	// }
	// .uni-placeholder{
	// 	height: 88upx !important;
	// }
	

	.no-padding {
		padding: 0 !important;
	}

	.margin-line {
		margin-top: 35upx;
		margin-bottom: 20upx;
	}

	.bottom-float-button {
		float: left;
	}

	.b-line {
		color: #e32417;
		text-decoration: underline;
	}

	.uni-tag-defalut-border {
		color: #b8b8b8 ;
		background-color: #fff ;
		border: 1px solid #ccc  !important;
	}

	.uni-tag-red-border {
		color: #e32417 ;
		background-color: #fff ;
		border: 1px solid #e32417 !important;
	}

	.uni-tag-red-border-disabled {
		color: #eee !important;
		background-color: #fff !important;
		border: 1px solid #eee !important;
	}

	.no-border-button {
		border: none;
		border-radius: 0;
	}


	$tag-pd:0px 32upx;
	$tag-small-pd:0px 16upx;

	@mixin tag-disabled {
		opacity: 0.5;
	}


	.uni-tag {
		box-sizing: border-box;
		padding: $tag-pd;
		height: 60upx;
		line-height: calc(60upx - 2px);
		font-size: $uni-font-size-base;
		display: inline-block;
		color: $uni-text-color;
		border-radius: 8upx;
		background-color: $uni-bg-color-grey;
		border: 1px solid #ccc;

		&--circle {
			border-radius: 30upx;
		}

		&--disabled {
			@include tag-disabled;
		}

		&--small {
			height: 40upx;
			padding: $tag-small-pd;
			line-height: calc(40upx - 2px);
			font-size: $uni-font-size-sm;
		}

		&--primary {
			color: $uni-text-color-inverse;
			background-color: $uni-color-primary;
			border: 1px solid $uni-color-primary;

			&.uni-tag--inverted {
				color: $uni-color-primary;
				background-color: $uni-bg-color;
				border: 1px solid $uni-color-primary;
			}

		}

		&--success {
			color: $uni-text-color-inverse;
			background-color: $uni-color-success;
			border: 1px solid $uni-color-success;

			&.uni-tag--inverted {
				color: $uni-color-success;
				background-color: $uni-bg-color;
				border: 1px solid $uni-color-success;
			}

		}

		&--warning {
			color: $uni-text-color-inverse;
			background-color: $uni-color-warning;
			border: 1px solid $uni-color-warning;

			&.uni-tag--inverted {
				color: $uni-color-warning;
				background-color: $uni-bg-color;
				border: 1px solid $uni-color-warning;
			}

		}

		&--error {
			color: $uni-text-color-inverse;
			background-color: $uni-color-error;
			border: 1px solid $uni-color-error;

			&.uni-tag--inverted {
				color: $uni-color-error;
				background-color: $uni-bg-color;
				border: 1px solid $uni-color-error;
			}

		}


		&--inverted {
			color: $uni-text-color;
			background-color: $uni-bg-color;
			border: 1px solid $uni-bg-color-grey;
		}
	}
	
	
	
	
	.new-title-bar{
		box-sizing: content-box;
		background: #f6f6f6;
		padding:24rpx 20rpx;
		height:40rpx;
		line-height: 40rpx;
		.title{
			font-weight: bold;
			float: left;
			text-shadow: 0 2rpx 2rpx rgba(125, 133, 141, 0.4);
			font-size: 26rpx;
			color: #333333;
		}
		.right-title{
			font-size: 22rpx;
			float: right;
			color:#b7b7b7;
			
		}
	}
	
	
</style>
