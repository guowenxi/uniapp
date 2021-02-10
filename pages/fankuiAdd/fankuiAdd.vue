<template>  
    <view class="content no-padding">  
			<view style="background-color: #fff;padding:20rpx;">
				<view class="title">描述</view>
				
				<textarea 
				 auto-height 
				 maxlength="144"
				class="textarea"
				 placeholder="请认真填写金点子描述"
				 v-model="userSuggest">
				
				</textarea>
				<view
				 :class="userSuggest.length>=144 ? 'color-red' : ''"
				 class="text-right">{{userSuggest.length}}/144字</view>
			</view>

			<button class="bottom-button new-bg-red" type="red" @click="insert()">提交反馈</button>
    </view>  
</template>  
<script>  

    import {  
        mapState 
    } from 'vuex';  
    export default {
		components: {

		},
		data(){
			return {
				userSuggest:""
			}
		},
		onLoad(){
			
		},
        methods: {
			insert(type) {
				
				if(this.userSuggest.length<=10){
					uni.showToast({
						mask:true,
						icon: 'none',
						title: "请至少输入10个字"
					});
					return ;
				}
				this.loadingState();
				this.$http.post('fyVolunteer/suggest/insert', {
						userSuggest:this.userSuggest,
						rbacToken: this.user.rbacToken,
					})
					.then(res => {
						uni.hideLoading();
						if (res.data.success == 1) {
							uni.showToast({
								mask:true,
								icon: 'none',
								title: "提交成功!",
								complete:()=>{
									setTimeout(()=>{
										this.navigateBack(1)
									},1500)
								}
							});
						} else {
							uni.showToast({
								mask:true,
								icon: 'none',
								title: res.data.message
							});
						}
			
					})
			}
			        
		}  
    }  
</script>  
<style lang='scss'>
	.color-red{
		color:#e32417 !important;
	}
	.content{
			background-color: #f0f0f0;
	}
	.text-right{
		text-align:right;
		color:#999999;
	}
	.title{
		line-height: $line-height-40;
		padding:20rpx 0;
	}
	.bottom-button{
		width:80%;
		position: absolute;
		bottom:40upx;
		left:50%;
		transform: translateX(-50%);
		margin:0 auto;
	}
	.textarea{
		min-height:300upx;
		/* padding:10upx; */
		width:100%;
		/* background-color: #fbfbfb; */
		border-radius: 4upx;
		/* border: solid 1px #f5e2e1; */
	}
</style>