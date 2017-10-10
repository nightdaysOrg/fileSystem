let fs = require('fs');
let fileDealer = require('./main.js');
let cprocess = require('child_process');
let mysql = require('mysql');
let connection = mysql.createConnection({
    // host : '120.24.235.91',
    user: 'root' , 
    password : 'Nuoyadb_1',
    database : 'nightdays_dev'
});



let controllers = {

    testDb(req,res) {
        connection.connect();
        let sql = "select article_id from t_article";
        connection.query(sql,function(error , result){
            if(error){
                console.log('error');
                res.send("数据库操作失败");
            }else{
                res.send(result);
            }
            console.log('查询结束');    
        });
        console.log('连接结束');
        connection.end();
    },

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
        let files = req.files;
        let path = req.body.filePath;
        for (let f of files) {
            fs.writeFile(path + "\\" + f.originalname, f.buffer, { 'flag': 'w' }, function (error) {
                if (error) {
                    throw error;
                }
            });

        }
        res.send('{"code":"success"}');
    },

    deleteFile(req, res) {
        let path = req.body.filePath;
        try {
            let state = fs.statSync(path);
            fileDealer.deleteFile(path);
            res.send('{"code":"success"}');
        } catch (error) {
            res.send(`{"code":"fail" , "message":"${error}"}`);
        }
    }
}


module.exports = {
    root: "fileSystem",
    controllers: controllers
}