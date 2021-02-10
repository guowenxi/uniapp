<template>
  <scroll-view class="wuc-tab" :class="tabClass" :style="tabStyle" scroll-with-animation scroll-x > <!-- :scroll-left="scrollLeft" -->
    <div v-if="!textFlex" class="wuc-tab-wrap">
      <div class="wuc-tab-item" 
	  :class="[index === tabCur ? selectClass + ' cur':'']"
	  :style="{'display': item.show !='undefined' && item.show == false ?   'none'  :'block'} "
	   v-for="(item,index) in tabList" 
	   :key="index" 
	   :id="index"
		@tap="tabSelect(index,$event)">
        <text :class="item.icon"></text>
        <span :class="[index === tabCur ? 'check-text' :'default-text']">{{item.name}}</span>
		<span class="sub-line" v-show="index === tabCur"></span>
      </div>
    </div>

    <div class="flex text-center" v-if="textFlex">
      <div class="wuc-tab-item flex-sub" :class="index === tabCur ? selectClass + ' cur':''" v-for="(item,index) in tabList" :key="index" :id="index" @tap="tabSelect(index,$event)">
        <text :class="item.icon"></text>
        <span>{{item.name}}</span>
		<span class="sub-line"></span>
      </div>
    </div>
  </scroll-view>
</template>
<script>
export default {
    name: 'wuc-tab',
    data() {
        return {};
    },
    props: {
        tabList: {
            type: Array,
            default() {
                return [];
            }
        },
        tabCur: {
            type: Number,
            default() {
                return 0;
            }
        },
        tabClass: {
            type: String,
            default() {
                return '';
            }
        },
        tabStyle: {
            type: String,
            default() {
                return '';
            }
        },
        textFlex: {
            type: Boolean,
            default() {
                return false;
            }
        },
        selectClass: {
            type: String,
            default() {
                return 'text-blue';
            }
        }
    },
    methods: {
        tabSelect(index, e) {
            if (this.currentTab === index) return false;
            this.$emit('update:tabCur', index);
            this.$emit('change', index);
        }
    },
    computed: {
        scrollLeft() {
			// debugger
			// const _this = this;
			// // let view =uni.createSelectorQuery().select('.wuc-tab-item');
			// let view =uni.createSelectorQuery().in(this);
			// const viewItem = view.selectAll('.wuc-tab-item') ;
			// if(viewItem){
			// 	viewItem.fields({size: true}, data => {
			// 		debugger
			// 		_this.categoryHeight = data.height + 'px';
			// 	}).exec();
			// }

            return (this.tabCur - 1) * 80;
        }
    }
};
</script>
<style>
div,
scroll-view,
swiper {
	box-sizing: border-box;
}
.default-text{
	color: #6f6f6f;
}
.check-text{

		line-height: 36rpx;

		color: #333333;
text-shadow: 0 2rpx 2rpx rgba(125, 133, 141, 0.4);

}
.wuc-tab {
			font-size: 26rpx;
	position: absolute;
	left: 50%;
	transform: translateX(-50%);
	text-align:center;
	font-size:30upx;
    white-space: nowrap;
}
.sub-line{
	position: absolute;
	bottom:5rpx;
	left: 50%;
	transform: translateX(-50%);
		width: 42rpx;
		height: 8rpx;
		background-color: #e32417;
		box-shadow: 0rpx 3rpx 3rpx 0rpx 
			rgba(227, 36, 23, 0.4);
		border-radius: 4rpx;
}

.wuc-tab-wrap{
	background: #f6f6f6;
	display: flex;
}

.wuc-tab-item {
	position: relative;
    height: 60upx;
	flex:1;
    /* display: inline-block; */
    line-height: 60upx;
    /* margin: 0 10upx; */
    padding: 0 20upx;
}

.wuc-tab-item.cur {
    /* border-bottom: 4upx solid; */
}

.wuc-tab.fixed {
	position: fixed;
	width: 100%;
	top: 0;
	z-index: 1024;
	box-shadow: 0 1upx 6upx rgba(0, 0, 0, 0.1);
}

.flex {
    display: flex;
}
.text-center {
    text-align: center;
}
.flex-sub {
    flex: 1;
}
.text-blue{
  
}
.text-white{
  color:#ffffff;
}
.bg-white{
    background-color: #ffffff;
}
.bg-blue{
    background-color: #e32417;
}
.text-orange{
  color: #f37b1d
}

.text-xl {
	font-size: 24upx;
}
</style>
