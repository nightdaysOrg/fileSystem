const fs = require('fs');
const join = require('path').join;
const config = require('./config');
const root = config.ROOT_DIR;

function dirIcon(num, str) {
    return new Array(num*10 + 1).join(str);
}

let x = 0;
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

let result = fs.readdirSync(root + "/test");
let menu = {children:[]};
function recruiveFile(path,parent) {
    let files = fs.readdirSync(path);
    files.forEach(function (filename) {
        let fpath = join(path, filename);
        let state = fs.statSync(fpath);
        let f = {name:filename,path:fpath};
        if (state.isDirectory()) {
            f.children = Array();
            recruiveFile(fpath,f);
        }
        parent.children.push(f);
    });
}


recruiveFile(root+"/test",menu);
console.log(menu);