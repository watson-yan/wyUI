var express = require('express')
var path = require('path')
var app = express()


app.engine('html', require('ejs').renderFile) // 模板引擎设置
app.set('views', __dirname)                   // 设置视图路径

app.get('/dist/*', function(req, res) {
    var filePath = req.path
    res.sendFile(req.path)
})

app.get('/*', function(req, res) {
    res.render('index.html')
})

var server = app.listen(3000, function(){
    var port = server.address().port
    console.log(port)
    console.log('App listening at port:%s', port)
})