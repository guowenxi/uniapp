<template>  
    <view class="content">  
			<textarea  auto-height class="textarea" placeholder="请填写填写申请原因" v-model="requestReason">
				
			</textarea>
			<button class="bottom-button" type="red" @click="applyFinishTask()">提交申请</button>
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
				requestReason:""
			}
		},
		onLoad(){
			debugger
			this.taskId = this.selListItem;
		},
        methods: {
			applyFinishTask(type) {
				this.loadingState();
				this.$http.post('fyTaskManage/peaceTaskApp/applyFinishTask', {
					taskId: this.taskId,
					requestReason:this.requestReason,
					rbacToken: this.user.rbacToken,
				}).then(res => {
					uni.hideLoading();
					if (res.data.success == 1) {
								uni.showToast({
									mask:true,
									icon: 'none',
									title: "您的申请已经提交!",
									sccuess: () => {
									},
									fail:(res)=>{
									},
									complete:()=>{
										setTimeout(()=> {
											this.navigateBack(1);
										}, 1500);
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
		padding:10upx;
		width:100%;
		background-color: #fbfbfb;
		border-radius: 4upx;
		border: solid 1px #f5e2e1;
	}
</style>