let fileDealer = require('./main.js')


let controllers = {

    getFileList(req,res){
           let menu = {children:[]};
        fileDealer.recruiveFile(fileDealer.root,menu)
        res.send(menu);
    }



}


module.exports = {
    root : "fileSystem",
    controllers : controllers
}