
const fs = require('fs')
const {log} = require('./utils.js')
const {dialog} = require('electron').remote

class FileDialog {
    constructor() {

    }

    static open(callback) {
        let options ={
            properties: [
                'openFile',
                //'openDirectory',
                //'multiSelections',
        ]}
        dialog.showOpenDialog(options, (fileNames) => {
            if (fileNames === undefined){
                log("You didn't add the file");
                return;
            }

            let text = ''
            let fileName = ''
            if (fileNames.length > 0) {
                fileName = fileNames[0]
                text = fs.readFileSync(fileName, 'utf8');
            } else {
                text = ''
                fileName = ''
            }
            callback(text, fileName)
        });
    }

    static new(content, callback) {
        dialog.showSaveDialog((fileName) => {
            if (fileName === undefined){
                log("You didn't save the file");
                return;
            }
            // fileName is a string that contains the path and filename created in the save file dialog.
            fs.writeFile(fileName, content, (err) => {
                if(err){
                    alert("An error ocurred creating the file "+ err.message)
                } else {
                    callback(fileName)
                //    alert("The file has been succesfully saved");
                }

            });
        });
    }

    static openDir(callback) {
        let options ={
            properties: [
                // 'openFile',
                'openDirectory',
                //'multiSelections',
        ]}
        dialog.showOpenDialog(options, (dirs) => {
            if (dirs === undefined){
                log("You didn't add the file");
                return;
            }
            let dir = dirs[0]
            let files = fs.readdirSync(dir);

            let filter = files.filter((value, index) => {
                return value[0] != '.'
            })

            callback(dir, filter)
        });
    }

}


const readSingleFile = function () {
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

const updateExistingFile = function () {
    var filepath = "C:/Previous-filepath/existinfile.txt";
    // you need to save the filepath when you open the file to update without use the filechooser dialog againg
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

const deleteFile = function () {
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

const selectAFolder = function () {
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

const readMultiFile = function (fileNames) {
    dialog.showOpenDialog({
        properties: [
            'openFile', 'multiSelections', (fileNames) => {
                console.log(fileNames);
            }
        ]
    });
}

module.exports = FileDialog
