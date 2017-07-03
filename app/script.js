/**
 * Created by cczy on 2017/7/4.
 */

const {remote} = require('electron');
const {Menu, BrowserWindow, MenuItem, shell} = remote;
var fs = require('fs');
const {dialog} = require('electron').remote;

var Remarkable = require('remarkable');
var e = sel => document.querySelector(sel);

var log = console.log.bind(console);

var closeParent = (target, element) => {
    var ele = e(element)
    var par = target.parentElement
    log('par', par)
}

// append default actions to menu for OSX
var initMenu = function () {
    try {
        var nativeMenuBar = new Menu();
        if (process.platform == "darwin") {
            nativeMenuBar.createMacBuiltin && nativeMenuBar.createMacBuiltin("FileExplorer");
        }
    } catch (error) {
        console.error(error);
        setTimeout(function () { throw error }, 1);
    }
};

// markdown 事件监听
var markdownListener = function () {
    e('#id-input-src').addEventListener('input', function() {
        var src = event.target.value
        var md = new Remarkable()
        var html = md.render(src)
        e('.editor-result').innerHTML = html
    })

}

// 填出侧边栏
var sideLoutListener = function () {
    e('#id-slide-btn').addEventListener('click', function(event) {
        var sideMenu = e('#id-slidemenu');
        var elemClass = sideMenu.classList

        if (elemClass.contains('showhide')) {
            elemClass.remove('showhide')
        } else {
            elemClass.add('showhide')
        }

    })
}

// 新建按钮
var newListener = function () {
    var ele = e('#id-new');
    ele.addEventListener('click', function () {
        var c = e('#id-input-src')
        var content = c.value
        createFile(content)
    })
}


var createFile = function (content) {
    // let content = "Some text to save into the file";

    // You can obviously give a direct path without use the dialog (C:/Program Files/path/myfileexample.txt)
    dialog.showSaveDialog((fileName) => {
        if (fileName === undefined){
            console.log("You didn't save the file");
            return;
        }

        // fileName is a string that contains the path and filename created in the save file dialog.
        fs.writeFile(fileName, content, (err) => {
            if(err){
                alert("An error ocurred creating the file "+ err.message)
            }

            alert("The file has been succesfully saved");
        });
    });
}


var readSingleFile = function () {
    dialog.showOpenDialog((fileNames) => {
        // fileNames is an array that contains all the selected
        if(fileNames === undefined){
            console.log("No file selected");
            return;
        }
        var filepath = '/Users/cczy/Downloads/hloow'
        fs.readFile(filepath, 'utf-8', (err, data) => {
            if(err){
                alert("An error ocurred reading the file :" + err.message);
                return;
            }

            // Change how to handle the file content
            console.log("The file content is : " + data);
        });
    });
}

var updateExistingFile = function () {
    var filepath = "C:/Previous-filepath/existinfile.txt";// you need to save the filepath when you open the file to update without use the filechooser dialog againg
    var content = "This is the new content of the file";

    fs.writeFile(filepath, content, (err) => {
        if (err) {
            alert("An error ocurred updating the file" + err.message);
            console.log(err);
            return;
        }

        alert("The file has been succesfully saved");
    });
}

var deleteFile = function () {
    var filepath = "C:/Path-toFile/file.txt";// Previously saved path somewhere

    if (fs.existsSync(filepath)) {
        fs.unlink(filepath, (err) => {
            if (err) {
                alert("An error ocurred updating the file" + err.message);
                console.log(err);
                return;
            }
            console.log("File succesfully deleted");
        });
    } else {
        alert("This file doesn't exist, cannot delete");
    }
}

var selectAFolder = function () {
    dialog.showOpenDialog({
        title:"Select a folder",
        properties: ["openDirectory"]
    }, (folderPaths) => {
        // folderPaths is an array that contains all the selected paths
        if(fileNames === undefined){
            console.log("No destination folder selected");
            return;
        }else{
            console.log(folderPaths);
        }
    });
}

var readMultiFile = function (fileNames) {
    dialog.showOpenDialog({
        properties: [
            'openFile', 'multiSelections', (fileNames) => {
                console.log(fileNames);
            }
        ]
    });
}


var __main = function () {
    markdownListener()
    newListener()
    sideLoutListener()
    initMenu()


}



window.onload = function () {
    __main()
}