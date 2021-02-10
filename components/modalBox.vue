<template>
		<cover-view v-if="modalState" class="uni-wrap-mask">
			<cover-view class="uni-mask" @click="close()"></cover-view>
			<cover-view class="uni-modal">
				<cover-view class="uni-modal__hd"><cover-view class="uni-modal__title">{{title}}</cover-view></cover-view>
				<cover-view class="uni-modal__bd">{{content}}</cover-view>
				<cover-view class="uni-modal__ft">
					<cover-view class="uni-modal__btn uni-modal__btn_default"  @click="close()">取消</cover-view>
					<cover-view class="uni-modal__btn uni-modal__btn_primary"  @click="eventClick">确定</cover-view>
				</cover-view>
			</cover-view>
		</cover-view>

</template>

<script>
	export default {
		name: 'ModalBox',
		data() {
			return {
				modalState:false
			}
		},
		props: {
			title:{
				type: String,
				default: "提示"
			},
			content: {
				type: String,
				default: ""
			}
		},
		methods: {
			close(){
				debugger
				this.modalState = false;
				// this.$nextTick(() => {
				//   setTimeout(() => {
				//    this.modalState = false;
				//   }, 30)
				// })
				
				
			},
			open(){				
				this.modalState = true;
				this.$nextTick(() => {
				  setTimeout(() => {
				   this.modalState = true;
				  }, 30)
				})
				
			},
			eventClick() {
				this.$emit('eventClick');
			}
		},
	}
</script>

<style lang="scss">

.uni-wrap-mask{
	position: fixed;
	z-index: 999;
	top: 0;
	right: 0;
	left: 0;
	bottom: 0;
	.uni-mask{
		position: fixed;
		z-index: 999;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
		background: rgba(0,0,0,.6);
	}
	.uni-modal{
		position: fixed;
		    z-index: 999;
		    width: 80%;
		    max-width: 300px;
		    top: 50%;
		    left: 50%;
		    -webkit-transform: translate(-50%,-50%);
		    transform: translate(-50%,-50%);
		    background-color: #fff;
		    text-align: center;
		    border-radius: 3px;
		    overflow: hidden;
		.uni-modal__title{
			    padding: 1em 1.6em .3em;
			    color: #e32417;
			    font-size: 20px;
				word-wrap: break-word;
				    word-break: break-all;
				    white-space: pre-wrap;
			padding: 1em 1.6em .3em;
			color:#e32417;
			font-size:40upx;
		}
		.uni-modal__bd{
			padding: 1.3em 1.6em 1.3em;
			min-height: 40px;
			font-size: 15px;
			line-height: 1.4;
			color: #999;
			max-height: 400px;
			overflow-y: auto;
			color:#333;
			font-size:30upx;
		}
		.uni-modal__ft{
		    position: relative;
		    line-height: 48px;
		    font-size: 18px;
		    display: -webkit-box;
		    display: -webkit-flex;
		    display: flex;
			.uni-modal__btn{
				display: block;
				flex: 1;
				color: #3cc51f;
				line-height: inherit;
				text-decoration: none;
				-webkit-tap-highlight-color: rgba(0,0,0,0);
				position: relative;
				background: #e32417;
				color:#fff !important;
			}
		}
	}
	
}

</style>
