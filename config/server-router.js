const express = require('express')
const router = express.Router()
const multiparty = require('multiparty')
const path = require('path')
const fs = require('fs')
const util = require('util')

router.get('/dist/*', (req, res) => {
    const filePath = req.path
    res.sendFile(path.join(__dirname, `../${req.path}`))
})
router.post('/api/imgs', (req, res) => {
    const form = new multiparty.Form({ uploadDir: path.join(__dirname, '../static') })
    form.parse(req, (err, fields, files) => {
        const filesTmp = JSON.stringify(files, null, 2)
        if (err) {
            console.log(`parse error:${err}`)
        } else {
            // console.log('parse files:' + filesTmp)
            console.warn(files)
            for (f in files) {
                const inputFile = files[f][0]
                console.log(`inputFile:${JSON.stringify(inputFile)}`)
                const uploadedPath = inputFile.path
                const dstPath = path.join(__dirname, `../static/${inputFile.originalFilename}`)
                // 重命名为真实文件名
                fs.rename(uploadedPath, dstPath, (err) => {
                    if (err) {
                        console.log(`rename error: ${err}`)
                    } else {
                        console.log('rename ok')
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
router.get('/*', (req, res) => {
    res.render('index.html')
})

module.exports = router
