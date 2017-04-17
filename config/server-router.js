var express = require('express')
var router = express.Router()
var multiparty = require('multiparty')
var path = require('path')
var fs = require('fs')
var util = require('util')

router.get('/dist/*', function(req, res) {
    var filePath = req.path
    res.sendFile(path.join(__dirname, '../' + req.path))
})
router.post('/api/imgs', function(req, res) {
    var form = new multiparty.Form({uploadDir: path.join(__dirname, '../static')})
    form.parse(req, function(err, fields, files) {
        var filesTmp = JSON.stringify(files, null, 2)
        if (err) {
            console.log('parse error:' + err)
        } else {
            // console.log('parse files:' + filesTmp)
            console.warn(files)
            for (f in files) {
                var inputFile = files[f][0]
                console.log('inputFile:' + JSON.stringify(inputFile))
                var uploadedPath = inputFile.path
                var dstPath = path.join(__dirname, '../static/' + inputFile.originalFilename)
                //重命名为真实文件名
                fs.rename(uploadedPath, dstPath, function(err) {
                    if(err){
                        console.log('rename error: ' + err)
                    } else {
                        console.log('rename ok');
                    }
                })
            }
            
        }
        // res.writeHead(200, {'content-type': 'text/plain;charset=utf-8'});
        // res.write('received upload:\n\n');
        // res.end(util.inspect({fields: fields, files: filesTmp}));
        res.status(200).end()
    })
})
router.get('/*', function(req, res) {
    res.render('index.html')
})

module.exports = router