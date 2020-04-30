const express = require('express')

const app = express()

app.all('*', (req, res, next) => {
    console.log(req.headers.origin, 'req.headers.origin');
    // res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
})

app.get('/user', (req, res) => {
    res.json({ code: '000000', message: '成功', data: { name: '小明' } })
})

app.listen(4000, function () {
    console.log('express listening');
})