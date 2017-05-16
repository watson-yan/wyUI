const express = require('express')
const path = require('path')
const app = express()
const router = require('./config/server-router.js')

app.engine('html', require('ejs').renderFile) // 模板引擎设置
app.set('views', __dirname)                   // 设置视图路径
app.use('/', router)                          // 路由配置

var server = app.listen(3000, () => {
    const port = server.address().port
    console.log('App listening at port:%s', port)
})
