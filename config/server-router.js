var express = require('express')
var router = express.Router()
var path = require('path')

router.get('/dist/*', function(req, res) {
    var filePath = req.path
    res.sendFile(path.join(__dirname, '../' + req.path))
})

router.get('/*', function(req, res) {
    res.render('index.html')
})

module.exports = router