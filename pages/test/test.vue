<template>
	<ul >
		<li>1</li>
		<test>
			<view>123</view>
			内容测试
		</test>
		<li id="test">
			
		</li>
	</ul>
</template>

<script>
import Vue from 'vue'
import test from "@/components/test"
	export default {
		components: {
			test
		},
		data() {
			return {
				
			};
		},
		onShow() {
			setTimeout(()=>{
				// 创建构造器
				var testComponent = Vue.extend({
				  template: '<p>{{firstName}} {{lastName}} aka {{alias}}</p>',
				  data: function () {
				    return {
				      firstName: 'Walter',
				      lastName: 'White',
				      alias: 'Heisenberg'
				    }
				  }
				})
				// 创建 Profile 实例，并挂载到一个元素上。
				const extendComponent = new testComponent().$mount()
			},1000)
			
		}
	}
</script>

<style lang="scss">

</style>
