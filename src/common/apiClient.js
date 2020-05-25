import Axios from "axios"
const qs = require('querystring')

let $http = null;

class ApiClient {
    constructor(config = DEFAULTCONFIG) {
        this.config = config
        $http = Axios.create(this.config)
        $http.interceptors.request.use(ApiClient.interceptorsRequest, ApiClient.interceptorsRequestErr)
        $http.interceptors.response.use(ApiClient.interceptorsRespond, ApiClient.interceptorsRespondErr)
    }

    request({ url, data = {}, type = 'post', showError = true, showLoading = true, specialCode, config: config }) {
        return new Promise((resolve, reject) => {
            if (!url) {
                reject({ retCode: 'url_null', message: 'url未定义' })
                if (showError) {
                    console.log('调用message的弹窗提示');
                }
                return
            }
            if (type === 'get') {
                data = Object.keys(data).length ? { params: data } : {}
                // const nowTime = new Date().getTime()
                // data.params ? data.params.nowTime = nowTime : data = { params: { nowTime } }
            }
            $http[type](url, data, config)
                .then((response) => {
                    const { code, message } = response
                    if (showLoading) {
                        console.log('showLoading');
                    }
                    if (code === '000000') {
                        resolve(response.data)
                        return
                    } else {
                        if (code === '401') {
                            console.log('用户权限过时了');
                            alert('用户权限过时了')
                            return
                        }
                        if (showError && code !== specialCode) {
                            console.log('个别接口的特殊成功code不等于当前返回code，需弹窗');
                        }
                        reject(response)
                    }
                },
                    (err) => {
                        if (showLoading) {
                            console.log('全局的showLoading');
                        }
                        if (showError) {
                            console.log('网络异常');
                        }
                        reject({
                            code: 'requestFail',
                            message: '网络异常'
                        })
                    })
        })
    }

    static interceptorsRequest(config) {
        console.log('apiClient->请求成功拦截');
        if (config.method === 'get') {
            config.data = qs.stringify(config.data)
        }
        return config
    }

    static interceptorsRequestErr(error) {
        console.log('apiClient->请求失败拦截');
        return Promise.reject(error)
    }

    static interceptorsRespond(response) {
        return response.data
    }

    static interceptorsRespondErr(error) {
        console.log('apiClient->响应失败拦截');
        return Promise.reject(error)
    }
}

const DEFAULTCONFIG = {
    // baseURL: 'http://localhost:4000',
    timeout: 6000,
    headers: {
        'Content-Type': 'application/json;chartset=utf-8'
    },
    // withCredentials: true
}

export default new ApiClient(DEFAULTCONFIG)