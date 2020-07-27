// import $ from 'jquery'
// import { LogLuvEncoding } from 'three'
import Vue from 'vue'
import router from './router'
import App from './App.vue'
import moment from "moment";
import Antd from 'ant-design-vue'


import { request } from '@/common/apiClient'
import apiClient from '@/common/apiClient'

Vue.prototype.$http = request

import(
    /* webpackPrefetch: true */
    'assets/style/index.less'
)
import "ant-design-vue/dist/antd.less";

moment.locale("zh-cn");
Vue.use(Antd)
Vue.prototype.$moment = moment;

new Vue({
    router,
    render: h => h(App)
}).$mount("#app");

// function Conter() {
//     var start = Date.now()
//     this.num = 0
//     this.timer1 = setTimeout(function () {
//         var gap = Date.now() - start
//         this.num++
//         console.log('timer1', this.num, gap);
//         console.log(Date.now(), 'timer1-秒');
//     }, 3000)

//     // 耗时约等于1900
//     console.time();
//     for (let index = 0; index < 50000; index++) {
//         document.body.appendChild(document.createElement('img'))
//     }
//     console.timeEnd();
//     console.log('阻塞完成');
//     this.timer2 = setTimeout(() => {
//         var gap = Date.now() - start
//         this.num++
//         console.log('timer2', this.num, gap);
//         // console.log(new Date().getSeconds(), 'timer2-秒');
//         console.log(Date.now(), 'timer2-秒');
//     }, 0)
// }

// Conter()

