var express = require('express')
var path = require('path')
var app = express()
var router = require('./config/server-router.js')

app.engine('html', require('ejs').renderFile) // 模板引擎设置
app.set('views', __dirname)                   // 设置视图路径
app.use('/', router)                          // 路由配置

var server = app.listen(3000, function(){
    var port = server.address().port
    console.log('App listening at port:%s', port)
})