<template>
	<image :src="img_url" :mode="mode" :lazy-load="lazyLoad" :style="setStyle"></image>
</template>

<script>
export default {
	name: 'image-cache',
    props: {
    	mode: {
    		type: String,
    		default: ''
    	},
        lazyLoad:{
            type:Boolean,
            default:false
        },
        imgSrc:{
            type:String
        },
        defaultImg:{
            type:String,
            default:''
        },
        setStyle:{
            type:String,
            default:''
        }
    },
	data() {
		return {
            img_url:''
		}
	},
	methods:{
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
	},
    watch:{
        img_url:{
            handler:function(){
                var the = this;
				var id = this.getFileName(the.imgSrc)
                uni.getStorage({
                    key:id,
                    success:function(res){
						
                        if(res.data!=''){
                            the.img_url = res.data;
                        }else{
                            uni.downloadFile({
                                url:the.imgSrc,
                                success: (ress) => {
                                    if (ress.statusCode === 200) {
                                        uni.setStorage({
                                            key:id,
                                            data:ress.tempFilePath,
                                            success:function(){
                                                
                                            }
                                        })
                                        the.img_url = ress.tempFilePath;
                                    }else{
                                        the.img_url = the.defaultImg;
                                    }
                                },
                                fail:()=>{
                                    the.img_url = the.defaultImg;
                                }
                            }); 
                        }
                    },
                    fail:function(res){
                        uni.downloadFile({
                            url:the.imgSrc,
                            success: (ress) => {
                                if (ress.statusCode === 200) {
                                    uni.setStorage({
                                        key:id,
                                        data:ress.tempFilePath,
                                        success:function(){
                                            
                                        }
                                    })
                                    the.img_url = ress.tempFilePath;
                                }else{
                                    the.img_url = the.defaultImg;
                                }
                            },
                            fail:()=>{
                                the.img_url = the.defaultImg;
                            }
                        }); 
                    }
                })
                
            },
            immediate: true
        }

    }
}
</script>