<template>  
    <view class="content">  
		<scroll-view class="history-section icon"  scroll-y>
			
		</scroll-view>
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
				
			}
		},
		onShow(){
			
		},
		onLoad(){
			// #ifdef APP-PLUS
			debugger
			var main = plus.android.runtimeMainActivity(); //获取activity  
			
			var huawei = plus.android.importClass('com.huawei.systemmanager');
			var StartupNormalAppListActivity = plus.android.importClass('com.huawei.systemmanager.startupmgr.ui.StartupNormalAppListActivity');
			var intent = new Intent(StartupNormalAppListActivity);
			main.startActivity(intent);
			
			
			var Intent = plus.android.importClass('android.content.Intent');  
			var Settings = plus.android.importClass('android.provider.Settings');  
			// var intent = new Intent(Settings.ACTION_LOCATION_SOURCE_SETTINGS);//可设置表中所有Action字段  
			var intent = new Intent(Settings.ACTION_APPLICATION_DEVELOPMENT_SETTINGS);
			main.startActivity(intent);
			debugger
			// #endif	
		},
        computed: {
		},
        methods: {
			
        
		},
		onNavigationBarButtonTap(e) {

		}
    }  
</script>  
<style lang='scss'>
	
</style>