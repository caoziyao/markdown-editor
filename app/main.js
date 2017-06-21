'use strict';

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

var mainWindow = null;

app.on('ready', function() {
    mainWindow = new BrowserWindow({
        height: 600,
        width: 800
    });

    console.log('file://' + __dirname + '/index.html')
    mainWindow.loadURL('file://' + __dirname + '/index.html');
});
