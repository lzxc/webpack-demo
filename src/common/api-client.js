import axios from 'axios'
const qs = require('querystring')
import { message } from 'ant-design-vue'

const ERRORCODELIST = ['500']

class ApiClient {
  constructor(config) {
    this.defaultConfig = config
  }
    static defaultConfig = {}

    request({
      url,
      data = {},
      type = 'post',
      showError = true,
      // showLoading = false,
      cancelToken = false,
      specialCode = ERRORCODELIST,
      config = {}
    }) {
      const that = this
      const subConfig = Object.assign({}, ApiClient.defaultConfig, config, {
        cancelToken: cancelToken ? new axios.CancelToken(function(c) {
          that.axiosCancel = c
        }) : null
      })
      const instance = axios.create(subConfig)
      ApiClient.setInterceptors(instance)
      return new Promise((resolve, reject) => {
        if (!url) {
          reject({ retCode: 'url_null', message: 'url未定义' })
          return
        }
        if (type === 'get') {
          data = Object.assign({}, { params: { ...data }})
        }
        instance[type](url, data, config).then(
          response => {
            const { code } = response
            if (code === '000000') {
              resolve(response.data)
            } else {
              if (showError) {
                message.error(response.msg)
                return
              }
              // 后端respondBody中的code在错误code列表中时，统一处理
              if (specialCode.includes(code)) {
                // xxxx
              }
              reject(response)
            }
          },
          err => {
            console.log(err, '$http的error')
            if (showError) {
              console.log('axios响应错误打印', err)
              message.error(err.msg)
            }
            reject(err)
          }
        )
      })
    }

    static setInterceptors(axiosInstance) {
      axiosInstance.interceptors.request.use(
        ApiClient.interceptorsRequest,
        ApiClient.interceptorsRequestErr
      )
      axiosInstance.interceptors.response.use(
        ApiClient.interceptorsRespond,
        ApiClient.interceptorsRespondErr
      )
    }

    static interceptorsRequest(config) {
      // 在这里添加loading
      // 配置token
      // config.headers.AuthorizationToken =
      //   localStorage.getItem("AuthorizationToken") || "";

      if (config.method === 'get') {
        config.data = qs.stringify(config.data)
      }
      return config
    }

    static interceptorsRequestErr(error) {
      return Promise.reject(error)
    }

    static interceptorsRespond(response) {
      return response.data
    }

    static interceptorsRespondErr(error) {
      // eslint-disable-next-line no-console
      console.log(error, 'axios响应错误拦截', error.response)
      if (error.response) {
        // 响应错误码处理
        let errMsg = ''
        switch (error.response.status) {
          case 403:
            break
          case 404:
            errMsg = '网络请求找不到'
            break
          case 500:
            errMsg = '网络异常'
            break
          default:
            errMsg = '未知错误'
            break
        }
        return Promise.reject({
          msg: errMsg,
          code: error.response.status
        })
      }
      return Promise.reject(error)
    }
}

const apiClient = new ApiClient({
  timeout: 20 * 1000,
  headers: {
    'Content-Type': 'application/json;chartset=utf-8'
  },
  withCredentials: true
})

export default apiClient
export const request = apiClient.request
