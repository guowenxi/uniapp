<template>
	<view class="content no-padding">
		<list-cell-user v-for="(item, index) in list" 
			:item = "item"
		></list-cell-user>
	</view>
</template>

<script>
		import listCellUser from '@/components/list-cell-user';
	export default {
		components: {
			listCellUser
		},
		onLoad(){
			this.streetId = this.selListItem.id;
			this.getAppList();
		},
		data() {
			return {
				list:[]
			}
		},
		methods:{
			//获取列表
			getAppList() {
				debugger
				this.$http.get('fyVolunteer/fySafeUseUser/getMesageGroupUsers', {
					pageNo:1,
					pageSize:999,
					streetId:this.streetId,
					rbacToken:this.user.rbacToken
					})
					.then(res => {
						if (res.data.success == 1) {
							this.list = res.data.data.list;
						} else {
							uni.showToast({
								icon: 'none',
								title: res.data.message
							});
						}
						
					})
			},
		}
	}
</script>

<style  lang="scss">

</style>
