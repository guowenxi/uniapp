<template>
	<img class="img" :mode="mode" :style="imageStyle" :src="resource" alt="图片加载失败">
</template>

<script>
	export default {
		props: {
			mode:{
				type: String,
				default: 'scaleToFill',
			},
			imageStyle: String,
			src: {
				type: String,
				default: '',
				required: true
			},
			saveDirectory: {
				type: String,
				default: '_doc/uniapp_save/images/'
			},
			errorImage: String,
			loadingImage: String
		},
		computed: {
			resource() {
				if (!this.isCached && this.error) {
					// 加载失败
					return this.errorImage
				} else if (this.isCached) {
					return this.localFile
				} else if (!this.isCached && !this.error) {
					// 正在加载
					return this.loadingImage
				}
			}
		},
		created() {
			this.id = this.getFileName(this.src);
			
			console.log('image-containerinit')
			//#ifdef APP-PLUS
			this.init()
			console.log(this.src)
			//#endif
			// #ifdef H5
			this.isCached = true;
			this.localFile = this.src;
			//#endif
		},
		data() {
			return {
				baseUrl: getApp().globalData.baseUrl,
				rbacToken: getApp().globalData.rbacToken,
				
				error: false,
				isCached: false,
				localFile: null
			};
		},
		methods: {
			async init() {
				
				let isCache = await this.isCache(this.src);
				
				
				if (!isCache) {
					let filePath = await this.downloadFile(this.src).catch((e) => {
						this.error = true
					})
					this.isCached = true
					this.localFile = filePath
				} else {
					this.isCached = true
					this.localFile = isCache
				}
			},
			async downloadFile(url) {
				return new Promise((resolve, reject) => {
					uni.downloadFile({
					      url: this.src,
					      success:  (res)=> {
					        var tempFilePath = res.tempFilePath;
							uni.setStorageSync(this.id,res.tempFilePath);
							uni.saveFile({  
							   tempFilePath: res.tempFilePath,  
							   complete(res) {  
								 resolve(tempFilePath) 
							   }  
							 });  
					      },
						  fail: function (res) {
							  
					      },
					    });
				})
				
				
			},
			async isCache() {
				
				uni.getSavedFileList({
				  success: function (res) {
					  debugger
				    console.log(res.fileList);
				  }
				});
				
				return uni.getStorageSync(this.id);
				
			},
			getFileName(path) {
				let  _p  = "";
				if(path.indexOf('rbacToken')>0){
					_p =path.split("?")[0];
					_p =_p.substring(_p.lastIndexOf("/")+1);
				}else{
					_p = path.substring(path.lastIndexOf("/") + 1);
				}
				return  _p;
			}
		}
	}
</script>

<style>
	.img {
		width: 100%;
		height: 100%;
	}
</style>
