
const {log} = require('./utils.js')
const {remote} = require('electron');
const app = remote.app
const appPath = app.getAppPath();

module.exports = {
    name: "MdEditor",
    path: appPath,
};
