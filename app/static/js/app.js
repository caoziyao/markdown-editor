
const {log, e} = require('./static/js/utils.js')
const {remote} = require('electron');
const {Menu, BrowserWindow, MenuItem, shell} = remote;
const {GwMenu} = require('./static/js/menu/menu.js')
const MarkdownEdit = require('./static/js/page_markdown_edit.js')
const {startTask, save} = require('./static/js/watchfile.js')

const initMenu = function () {
    let menu = GwMenu.new()
    menu.init()
};

const initMarkdown = function () {
    let md = MarkdownEdit.new()
    md.init()
};

const __main = function () {
    initMenu()
    initMarkdown()
}

window.onload = function () {
    __main()
    //startTask()
}

window.onblur = function () {
    save()
}
