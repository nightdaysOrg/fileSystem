const fs = require('fs');
const join = require('path').join;
const config = require('./config');
const root = config.ROOT_DIR;

function dirIcon(num, str) {
    return new Array(num * 10 + 1).join(str);
}

function recruiveFileAsyn(filePath, index) {
    index++;
    fs.readdirSync(filePath, function (err, files) {
        files.forEach(function (val) {
            let fpath = join(filePath, val);
            let state = fs.statSync(fpath);
            if (state.isDirectory()) {
                // console.log(index,dirIcon(index,'-'));
                console.log("--" + val + "--");
                recruiveFile(fpath, index);
            }
            if (state.isFile()) {
                console.log(val);
            }
        })
    });
}

//遍历目录下所有文件 耗时很长 不建议使用
let menu = { children: [] };
function recruiveFile(path, parent) {
    let files = fs.readdirSync(path);
    files.forEach(function (filename) {
        let fpath = join(path, filename);
        let state = fs.statSync(fpath);
        let f = { name: filename, path: fpath };
        if (state.isDirectory()) {
            f.children = Array();
            recruiveFile(fpath, f);
        }
        parent.children.push(f);
    });
}
// recruiveFile(root,menu);
// console.log(menu);

//获取目录下直接子文件
function getFileList(path, parent) {
    let files = fs.readdirSync(path);
    files.forEach(function (filename) {
        let fpath = join(path, filename);
        try {
            let state = fs.statSync(fpath);
            let f = { name: filename, path: fpath, pPath: path };
            if (state.isDirectory()) {
                f.type = 'dir';
                parent.children.push(f);
            } else {
                f.type = 'file';
                parent.children.push(f);
            }
        } catch (error) {
        }
    });
}

//删除文件
function deleteFile(path) {
    let state = fs.statSync(path);
    if (state.isDirectory()) {
        let files = fs.readdirSync(path);
        for (let f of files) {
            deleteFile(join(path,f));
        }
         fs.rmdirSync(path);

    } else {
        fs.unlinkSync(path);
    }
}

module.exports = {
    root: root,
    menu: menu,
    recruiveFile: recruiveFile,
    getFileList: getFileList,
    deleteFile : deleteFile
}