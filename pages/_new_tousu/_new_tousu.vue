<template>  
    <view class="content">  
			<textarea  auto-height class="textarea" placeholder="请填写您要反馈的内容" v-model="complaint">
				
			</textarea>
			<button class="bottom-button" type="red" @click="saveComplaint()">提交反馈</button>
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
				complaint:""
			}
		},
		onLoad(){

			this.gridUserId =this.selListItem.id;
			
		},
        methods: {
			saveComplaint(type) {
				this.loadingState();
				this.$http.post(`fyMicroGridManage/complaint/saveComplaint?rbacToken=${this.user.rbacToken}`, {
						complaint:this.complaint,
						gridUserId:this.gridUserId,
						progressStatus:1
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