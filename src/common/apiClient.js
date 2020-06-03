import axios from "axios";
const qs = require("querystring");
import { message } from "ant-design-vue";

const ERRORCODELIST = ["500"];

class ApiClient {
  constructor(config) {
    this.config = config;
  }

  request({
    url,
    data = {},
    type = "post",
    showError = true,
    // showLoading = true,
    specialCode = ERRORCODELIST,
    config: config
  }) {
    const instance = axios.create();
    ApiClient.setInterceptors(instance);
    return new Promise((resolve, reject) => {
      if (!url) {
        reject({ retCode: "url_null", message: "url未定义" });
        if (showError) {
          console.log("调用message的弹窗提示");
        }
        return;
      }
      if (type === "get") {
        data = Object.assign({}, { params: { ...data } });
        // const nowTime = new Date().getTime();
        // data.params
        //   ? (data.params.nowTime = nowTime)
        //   : (data = { params: { ...data.params, nowTime } });
      }
      instance[type](url, data, config).then(
        response => {
          const { code } = response;
          //   if (showLoading) {
          //     console.log("showLoading");
          //   }
          if (code === "00000") {
            resolve(response.data);
          } else {
            // 后端respondBody中的code在错误code列表中时，统一处理
            if (showError && specialCode.includes(code)) {
              console.log("包含在specialCode数组错误code里");
              message.error(response.msg);
              return;
            }
            reject(response);
          }
        },
        err => {
          console.log(err, "$http的error");
          //   if (showLoading) {
          //     console.log("全局的showLoading");
          //   }
          if (showError) {
            console.log("axios响应错误打印", err);
            message.error(err.msg);
            return;
          }
          reject(err);
        }
      );
    });
  }

  static setInterceptors(axiosInstance) {
    axiosInstance.interceptors.request.use(
      ApiClient.interceptorsRequest,
      ApiClient.interceptorsRequestErr
    );
    axiosInstance.interceptors.response.use(
      ApiClient.interceptorsRespond,
      ApiClient.interceptorsRespondErr
    );
  }

  static interceptorsRequest(config) {
    // 在这里添加loading
    // 配置token
    // config.headers.AuthorizationToken =
    //   localStorage.getItem("AuthorizationToken") || "";

    if (config.method === "get") {
      config.data = qs.stringify(config.data);
    }
    return config;
  }

  static interceptorsRequestErr(error) {
    return Promise.reject(error);
  }

  static interceptorsRespond(response) {
    return response.data;
  }

  static interceptorsRespondErr(error) {
    // eslint-disable-next-line no-console
    console.log(error, "axios响应错误拦截", error.response);
    if (error.response) {
      // 响应错误码处理
      let errMsg = "";
      switch (error.response.status) {
        case 403:
          break;
        case 404:
          errMsg = "网络请求找不到";
          break;
        case 500:
          errMsg = "网络异常";
          break;
        default:
          errMsg = "未知错误";
          break;
      }
      return Promise.reject({
        msg: errMsg,
        code: error.response.status
      });
    }
    return Promise.reject(error);
  }
}

const apiClient = new ApiClient({
  timeout: 10000,
  headers: {
    "Content-Type": "application/json;chartset=utf-8"
  },
  withCredentials: true
});

export default apiClient;
export const { request } = apiClient;
