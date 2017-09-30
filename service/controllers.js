let fileDealer = require('./main.js')


let controllers = {

    getFileList(req,res){
        let param = {dir:'/'};
        if(req.body.dir){
            param.dir = req.body.dir;
        }
        let menu = {children:[]};
        fileDealer.getFileList(param.dir,menu);
        if(menu){
            res.send(menu);
        }else{
            res.send('没有数据');
        }
    },

    uploadFile(req,res){
        console.log(req.files);
    }
}


module.exports = {
    root : "fileSystem",
    controllers : controllers
}