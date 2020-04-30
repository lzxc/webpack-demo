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

import $ from 'jquery'
import(
    /* webpackPrefetch: true */
    'assets/css/index.less'
)
import 'assets/css/test1.less'
import { getUser, loginAccount } from '@/assets/api/index.js'
import Api from '@/assets/js/apiClient'


import { LogLuvEncoding } from 'three'
console.log(LogLuvEncoding, 'LogLuvEncoding');

window.$http = Api.request.bind(Api)
const isHas = [123, 456].includes(2)
new Promise(() => { })
console.log(isHas, 'isHas');

const img = document.createElement('img')
img.src = require('assets/img/img.jpg')
document.body.appendChild(img)

const button = document.createElement('button')
button.innerHTML = '点击我加载js'
button.addEventListener('click', () => {
    import('assets/js/import').then(importJs => {
        console.log(importJs.import, 'importJs的内容');
    })
    getUser().then(res => {
        console.log(res, '请求响应');
    })
})

document.body.appendChild(button)

document.getElementById('loginBtn').addEventListener('click', () => {
    // window.$http({
    //     url: '/login/account',
    //     data: {
    //         username: 'admin',
    //         password: 'system'
    //     },
    //     config: {
    //         headers: { 'x-token': 'test-token' },
    //     }
    // }).then(res => {
    //     console.log('请求login成功', res);
    // })

    loginAccount({
        username: 'admin',
        password: 'system'
    })
        .then(res => {
            console.log('请求login成功', res);
        })
})


class Parent {
    num = 1;
    static state = {
        name: 'parent'
    }
    constructor() {
        this.getName = () => {
            console.log(this, 'this');
            console.log(this.name);
        }
    }
}
console.log(Parent.state, 'Parent.state');
console.log(Parent.num, 'Parent.num');
const p = new Parent()
p.getName()