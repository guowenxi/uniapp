<template>
	<view class="uni-tag" v-if="text" 
	:class="disabled === true || disabled === 'true' ? 'disabled' :''"
	 @click="onClick()">{{text}}</view>

</template>

<script>
	export default {
		name: 'uni-tag',
		props: {
			type: { //标签类型default、primary、success、warning、danger、royal
				type: String,
				default: 'default'
			},
			size: { //标签大小 normal, small
				type: String,
				default: 'normal'
			},
			text: String, //标签内容
			disabled: { //是否为禁用状态
				type: [String, Boolean],
				defalut: false
			},
			inverted: { //是否为空心
				type: [String, Boolean],
				defalut: false
			},
			circle: { //是否为圆角
				type: [String, Boolean],
				defalut: false
			}
		},
		methods: {
			onClick() {
				if (this.disabled === true || this.disabled === 'true') {
					return;
				}
				this.$emit('click')
			}
		}
	}
</script>

<style lang="scss">
	$tag-pd:0px 32upx;
	$tag-small-pd:0px 16upx;
	.uni-tag {
		box-sizing: border-box;
		padding: $tag-pd;
		height: 60upx;
		line-height: calc(60upx - 2px);
		font-size: $uni-font-size-base;
		display: inline-block;
		
	.disabled{
		opacity: 0.5;
	}
	
	}
</style>