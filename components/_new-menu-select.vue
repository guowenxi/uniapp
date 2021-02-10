<!-- keyName -->
<!-- queryName -->
<!-- valName -->
<!-- selList -->

<template>
	<view class="pick-box">
	 <view class="check-title" :class="hasBg ? 'bg-grey' : ''">
		 <view class="check-title-item"
		 :class="hasBg ? 'bg-grey-e6' : ''"
		  @click="openState(idx)"
		  v-for="(item,idx) in selListItemName"
		  >
			 <text class="check-name">{{item}}</text>
			 <view class="icon-wrap">
				<!-- <image class="icon" src="/static/img/icon_down@2x.png"></image> -->
				<image class="icon" src="/static/arrow.png"></image>
			 </view>
		 </view>
	 </view>

		
<!-- 		<view class="check-wrap-box" :class="modal == 'absolute'  ?  'check-wrap-box-absolute' : '' "   v-show="showState" @click="close">
		</view> -->
		

		<scroll-view class="pick-item-box" v-show="showState" scroll-y>
			<view class="pick-item"
			v-for="(item,idx) in selList[listIndex]"
			:class="selListItemIndex[listIndex] == idx ? 'font-color' : ''"
			 @click="bindPickerChange(item,idx,listIndex)" 
			  >
				{{item[keyName.split(',')[listIndex]]}}
			</view>
		</scroll-view>



	</view>

</template>

<script>
	export default {
		data() {
			return {
				//选择的item数组
				selListItemName:[ "",""],
				//选择的item的索引数组
				selListItemVal:["", ""],
				selListItemIndex:[ "", ""],
				firstLoad:true,
				showState:false,
				selIndex:0,
				listIndex:0,
			}
		},
		props: {
			reload:{
				type: Boolean,
				default: false
			},
			keyName:{
				type: String,
				default: null
			},
			hasBg:{
				type: Boolean,
				default: true
			},
			modal:{
				type: String,
				default: "fixed"
			},
			queryName:{
				type: String,
				default: null
			},
			valName:{
				type: String,
				default: null
			},
			selList: {
				type: Array,
				default: [
					[11,22],[11,33]
				]
			}
		},
		mounted(){
			
			//此状态控制重置
			this.firstLoad = true;
			 this._key_name = this.keyName.split(',');
			 this._val_name = this.valName.split(',');
			 this._query_name = this.queryName.split(',');
			 this.firstLoadFun();

		},
		beforeDestroy(){
			
		},
		watch:{
			selList(){
				
			}
		},
		methods: {
			close(){
				this.showState = false;
			},
			openState(idx){
				this.listIndex = idx;
				this.showState = !this.showState ;
			},
			bindPickerChange: function(item,idx,listIndex) {
					//当前的name
					this.selListItemName[listIndex] = item[this._key_name[listIndex]];
					//当前的val
					this.selListItemVal[listIndex] = item[this._val_name[listIndex]];
					//当前的索引
					this.selListItemIndex[listIndex] = idx;
					
					this.$emit('btnClick',{selIndex:idx,type:this._query_name[listIndex],val:this.selListItemVal[listIndex]})
					this.showState = false;
				},
			firstLoadFun(){
					if(this.firstLoad){
							let _this = this ;
							// 无奈只能先清空再赋值
							_this.selListItemName = [];
							_this.selListItemVal= [];
							_this.selList = this.selList;
							
							this.selList.map((item,idx)=>{
								//得到初始值
								_this.selListItemName.push(item[0][_this._key_name[idx]]);
								//得到初始val值
								_this.selListItemVal.push(item[0][_this._val_name[idx]]);
							})
							//得到初始索引
							_this.selListItemIndex = new Array(this.selList.length).fill(0);
							
							this.firstLoad = false;
						}
					
				}
		},
		computed:{

		},
		watch:{

			selList(val){
				// this.firstLoadFun();
			}
		}
	}
</script>

<style lang="scss" scope>
.bg-grey-e6{
	background: #e6e6e6 !important;
	border-bottom: 1px solid #efefef;
}
.bg-grey{
	background: #f6f6f6;
	
}

.check-wrap-box-absolute{
	left: 0;
	top:180rpx;
}

.check-wrap-box-absolute{
	left: 0;
	top:90rpx;
}

.pick-box{
	font-size:$font-base;
	z-index: 100;
	position: relative;
	// display: flex;
	// flex-flow:row nowrap;
	height:90upx;
	.font-color{
		color:red;
	}

	.check-title{
		position: absolute;
		left:0;
		top:0;
		width:100%;
		height: inherit;
		
		z-index:1000000;
		.check-title-item{
			margin:0 20rpx;
			float: right;
			top:50%;
			transform: translateY(-50%);
			right:20rpx;
			

			text-align: center;
			position: relative;
			// flex:1;
			// text-indent: 30upx;
			z-index:1200;
			height: 90upx;
			line-height: 90upx;
			display: flex;
			flex-flow:row nowrap;
			font-size:26rpx;
			padding:10rpx 20rpx;;
			height:50rpx;
			line-height:30rpx;
			border-radius: 30rpx;
			background: transparent;
		}
	}
	.pick-item-box{
		position:absolute;
		top:100%;
		left:0;
		z-index:1200;
		width:100vw;
		height:350rpx;
	}
	.check-wrap-box{
		z-index:1000;
		position: fixed;
		width:100%;
		height:100%;
		
		background: rgba(0,0,0,0.5);
	}
	.pick-item{
		font-size:26rpx;
		padding: 5upx 0;
		text-indent:30upx;
		background: #fff;
		border-bottom:1px solid #efefef;
		position: relative;
		flex:1;
		height:70upx;
		line-height:70upx;
		.pick-input{
		
			height:70upx;
			line-height:70upx;
			text-align: center;
			// position: absolute;
			// top: 50%;
			// transform: translateY(-50%);
		}
	}
	.check-name{
		flex:1;
		// float: left;
	}
	.icon-wrap{
		flex:1;
		margin-left: 10rpx;
		display: inline-block;
		max-width:20upx;
		min-width:20upx;
		height:100%;
		display: inline;
		position: relative;
		.icon{
			width:15upx;
			flex:1;
			height: 20upx;
			position: absolute;
			top:50%;
			left:0;
			transform: translateY(-50%) rotate(90deg);
		}
	}

}
</style>
