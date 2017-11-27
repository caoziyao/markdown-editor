/**
 * Created by cczy on 2017/7/4.
 */

const {log, e} = require('./static/js/utils.js')
const {remote} = require('electron');
const {Menu, BrowserWindow, MenuItem, shell} = remote;
const {GwMenu} = require('./static/js/menu.js')
const {MarkdownEdit} = require('./static/js/markdown_edit.js')


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
}
