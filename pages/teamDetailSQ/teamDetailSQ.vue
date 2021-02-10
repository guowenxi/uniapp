<template>
	<view class="content no-padding">
		<scroll-view scroll-y  class="scroll-bar"
		v-on:touchstart="touchstart"
		v-on:touchmove="touchmove"
		v-on:touchend="touchend"
		>
<!-- 			<image v-if="Number(total) === 0  ? true : false" class="prompt_img" src="/static/img/prompt_blank@2x.png" ></image> -->
			<image
			class="refresh-ccw"
			:style="{transform:`translateY(${reloadScrollTop}px) rotate(${reloadScrollTop*5}deg)`}"
			:class="!start_state == true? 'scroll-up-retrun' : ''"
			 src="/static/img/refresh-ccw.png"></image>

			<view
			:class="!start_state == true? 'scroll-up-retrun' : ''"
						:style="{transform:`translateY(${reloadScrollTop}px)`}"
			>
			<list-cell-user v-for="(item, index) in list" 
				:item = "item"
				hasBtn="true"
				@eventClick="eventClick(item)"
			></list-cell-user>
						 </view>
		</scroll-view>
	</view>
</template>

<script>
		import mInput from '../../components/m-input.vue'
	import listCellUser from '@/components/list-cell-user';
	
	import uniList from '@/components/uni-list/uni-list.vue'
	import uniListItemRight from '@/components/uni-list-item/uni-list-item-right.vue'
	
	export default {
		components: {
			listCellUser,
			uniList,
			uniListItemRight,
			mInput,
		},
		data() {
			return {
				start_state:false,
				reloadScrollTop:0,
				total:null,
				teamId:"",
				list: [
						  
						],
			};
		},
		onLoad(){
			this.teamId  =this.selListItem.teamId;
			this.getUserByTeamId();
		},
		methods:{
			//监听开始
			touchstart(e,_){
				this.start_state = true ;
				this.reloadScrollTop_start = e.touches[0].clientY;
			},
			//监听移动
			touchmove(e,_){
				if((e.touches[0].clientY - this.reloadScrollTop_start) < 0){
					return
				}
				if((e.touches[0].clientY - this.reloadScrollTop_start) <= 100){
					this.reloadScrollTop = (e.touches[0].clientY - this.reloadScrollTop_start);
				}
			},
			touchend(){
				if(this.reloadScrollTop>=75){
					this.getUserByTeamId();
				}else{
					this.start_state = false ;
					this.reloadScrollTop = 0;
				}
			},
			
			eventClick(item){
				
				this.check(item)
			},
			
			check(item){
				this.$http.get('fyVolunteer/apply/check', {
					userId:item.userId,
					teamId:this.teamId,
					rbacToken: this.user.rbacToken,
					})
					.then(res => {
						if (res.data.success == 1) {
							uni.showToast({
								icon:'none',
								title: "邀请加入成功!",
								complete:()=>{
									setTimeout(()=> {
										this.navigateBack(1)
									}, 1500);
								}
							});
						}else{
							uni.showToast({
								icon:'none',
								title: res.data.message
							});
						}
					})
			},
			getUserByTeamId(){
				this.$http.get('fyVolunteer/apply/approve', {
					teamId:this.teamId,
					rbacToken: this.user.rbacToken,
					})
					.then(res => {
						this.reloadScrollTop = 0;
						if (res.data.success == 1) {
							this.list = res.data.data;
							
							if(res.data.data.length  == 0 ){
								this.total = 0;
							}
						}else{
							uni.showToast({
								icon:'none',
								title: res.data.message
							});
						}
					})
			}
			
		}
	}
</script>

<style lang="scss">
	.scroll-bar{
		position: relative;
		width: 100%;
		height: 100%;
	}
	.btn-row{
		position:absolute;
		bottom:40upx;
		width:100%;
	}
	.input-title{
		font-size:32upx;
	}
	.conten{
		background: #fff;
	}
	.uni-list{

		.uni-badge-success{
			background-color: #fff !important;
		}
	}
	.top-box{
		width:100%;
		background: #fff;
		border-bottom:30upx solid #eee;
		height:360upx;
		.title {
			text-align: center;
			margin: 0 auto;
			margin-top: 20upx;
			font-size: 32upx;
		}
	}
	.list-item{
		float:left;
	}
	.title-icon {
		border-radius: 50%;
		display: block;
		width: 140upx;
		height: 140upx;
		margin: 0 auto;
		margin-top: 50upx;
		position:relative;
		.img{
	
			width:100%;
			height:100%;
			position: absolute;
			left:0;
			top:0;
		}
		.icon{
			width:40upx;
			height:40upx;
			position: absolute;
			right:0;
			bottom:0;
		}

		
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
