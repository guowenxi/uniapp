
export default class Request {
  config = {
    baseUrl: '',
    header: {
      'Content-Type': 'application/json;charset=UTF-8',
	  'Access-Control-Allow-Headers':'*'
    },
    method: 'GET',
    dataType: 'json', //如果设为 json，会尝试对返回的数据做一次 JSON.parse
    responseType: 'text', //设置响应的数据类型。合法值：text、arraybuffer
    success () {
    },
    fail () {
    },
    complete () {
    }
  }

  static regUrl (url) { /* 判断url是否为绝对路径 */
    return /(http|https):\/\/([\w.]+\/?)\S*/.test(url)
  }

  interceptor = {
    request: (f) => {
      if (f) {
        this.requestBeforeFun = f
      }
    },
    response: (f) => {
      if (f) {
        this.requestComFun = f
      }
    }
  }

  static requestBeforeFun (config) {
    return config
  }


  setConfig (f) {
    this.config = f(this.config)
  }

  request (options = {}) {
    options.baseUrl = options.baseUrl || this.config.baseUrl
    options.dataType = options.dataType || this.config.dataType
    options.url = Request.regUrl(options.url) ? options.url : (options.baseUrl + options.url)
    options.data = options.data || {}
    options.header = options.header || this.config.header
    options.method = options.method || this.config.method
    return new Promise((resolve, reject) => {

      let next = true
      let _config = null
      options.complete = (response) => {
        response.config = _config

        if (response.statusCode === 200) { // 成功
          resolve(response)
        } else {
          reject(response)
        }
      }
	  
      let afC = { ...this.config, ...options }
      _config = afC;
      if (!next) return
      uni.request(_config)
    })
  }

  get (url, data, options = {}) {
    options.url = url
    options.data = data
    options.method = 'GET'
    return this.request(options)
  }

  post (url, data, options = {}) {
    options.url = url
    options.data = data
    options.method = 'POST'
    return this.request(options)
  }
  
}
