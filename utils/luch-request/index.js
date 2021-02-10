import Request from './request'
import Vue from 'vue'
/**
 * 插件地址
 * http://ext.dcloud.net.cn/plugin?id=392
 */

//http://192.168.1.131:8090/fyPeaceStudy/fySafeQuestionnaire/getList
//?rbacToken=54c38ef6371e46679eb3ef22d26195c5&urlType=wdgl
const http = new Request();
http.setConfig((config) => { /* 设置全局配置 */
	config.baseUrl = ""; /* 根域名不同 */
	config.header = {
		
	}
	return config
})
http.interceptor.request((config, cancel) => { /* 请求之前拦截器 */
	config.header = {
		...config.header,

	}
	/*
	if (!token) { // 如果token不存在，调用cancel 会取消本次请求，但是该函数的catch() 仍会执行
		cancel('token 不存在') // 接收一个参数，会传给catch((err) => {}) err.errMsg === 'token 不存在'
	}
	*/
	return config;
})
http.interceptor.response((response) => { /* 请求之后拦截器 */
	console.log(response);
	return response;
})
export {
	http
};


