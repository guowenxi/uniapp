<!-- keyName -->
<!-- queryName -->
<!-- valName -->
<!-- selList -->

<template>
	<view class="pick-box">
		<view class="check-title"
		 @click="openState(idx)"
		 v-for="(item,idx) in selListItemName"
		 >
			<text class="check-name">{{item}}</text>
			<view class="icon-wrap">
				<!-- <image class="icon" src="/static/img/icon_down@2x.png"></image> -->
				<image class="icon" src="/static/arrow.png"></image>
			</view>
			
		</view>
		
		<view class="check-wrap-box"  v-show="showState" @click="close">
		</view>
		

		
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
			keyName:{
				type: String,
				default: null
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
					
					this.$emit('btnClick',{selIndex:idx,type:this._query_name[listIndex]})
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

<style lang="scss">

.pick-box{
	font-size:$font-base;
	z-index: 1200;
	position: relative;
	display: flex;
	flex-flow:row nowrap;
	height:90upx;
	.font-color{
		color:red;
	}

	.check-title{
		
		border-bottom: 1px solid #efefef;
		background: #fff;
		text-align: center;
		position: relative;
		flex:1;
		// text-indent: 30upx;
		z-index:1200;
		height: 90upx;
		line-height: 90upx;
	}
	.pick-item-box{
		position:absolute;
		top:100%;
		left:0;
		z-index:1200;
		width:100vw;
		height:50vh;
		
	}
	.check-wrap-box{
		z-index:1000;
		position: fixed;
		width:100%;
		height:100%;
		
		background: rgba(0,0,0,0.5);
	}
	.pick-item{
		padding: 5upx 0;
		text-indent:30upx;
		background: #fff;
		border-bottom:1px solid #efefef;
		position: relative;
		flex:1;
		height:90upx;
		line-height:90upx;
		.pick-input{
		
			height:90upx;
			line-height:90upx;
			text-align: center;
			// position: absolute;
			// top: 50%;
			// transform: translateY(-50%);
		}
	}
	.icon-wrap{
		width:10upx;
		height:100%;
		display: inline;
		position: relative;
		margin-left:15upx;
		.icon{
			width:15upx;
			flex:1;
			height: 20upx;
			position: absolute;
			top:50%;
			transform: translateY(-50%) rotate(90deg);
		}
	}

}
</style>
