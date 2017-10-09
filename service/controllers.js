let fs = require('fs');
let fileDealer = require('./main.js')


let controllers = {

    test(req, res) {
        console.log(req.body.name);
    },

    getFileList(req, res) {
        let param = { dir: '/' };
        if (req.body.dir) {
            param.dir = req.body.dir;
        }
        let menu = { children: [] };
        fileDealer.getFileList(param.dir, menu);
        if (menu) {
            res.send(menu);
        } else {
            res.send('没有数据');
        }
    },

    uploadFile(req, res) {
        // console.log(req.files);
        // console.log(req.body);
        let file = req.files[0];
        let path = req.body.filePath;
        fs.writeFile(path + file.originalname, file.buffer, { 'flag': 'w' }, function (error) {
            if (error) {
                throw error;
            }
            console.log('write success');
        });
        res.send('{"code":"success"}');
    }
}


module.exports = {
    root: "fileSystem",
    controllers: controllers
}