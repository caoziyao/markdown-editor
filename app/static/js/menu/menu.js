const {template} = require('./menu_template.js')
const {log, e} = require('../utils.js')
const {remote} = require('electron');
const {Menu, BrowserWindow, MenuItem, shell} = remote;
const electron = require('electron')
const app = remote.app

class GwMenu {
    constructor() {

    }

	static
	new (...args) {
		return new this(...args)
	}

    addUpdateMenuItems(items, position) {
        if (process.mas) {
            return
        }

        const version = remote.app.getVersion()
        let updateItems = [{
            label: `Version ${version}`,
            enabled: false
        }, {
            label: 'Checking for Update',
            enabled: false,
            key: 'checkingForUpdate'
        }, {
            label: 'Check for Update',
            visible: false,
            key: 'checkForUpdate',
            click: function () {
                require('electron').autoUpdater.checkForUpdates()
            }
        }, {
            label: 'Restart and Install Update',
            enabled: true,
            visible: false,
            key: 'restartToUpdate',
            click: function () {
                require('electron').autoUpdater.quitAndInstall()
            }
        }]

        items.splice.apply(items, [position, 0].concat(updateItems))
    }

    findReopenMenuItem() {
        const menu = Menu.getApplicationMenu()
        if (!menu) return

        let reopenMenuItem
        menu.items.forEach(function (item) {
            if (item.submenu) {
                item.submenu.items.forEach(function (item) {
                    if (item.key === 'reopenMenuItem') {
                        reopenMenuItem = item
                    }
                })
            }
        })
        return reopenMenuItem
    }

    defaultMenuItem() {
        const name = remote.app.getName()

        template.unshift({
            label: name,
            submenu: [{
                label: `About ${name}`,
                role: 'about'
            }, {
                type: 'separator'
            }, {
                label: 'Services',
                role: 'services',
                submenu: []
            }, {
                type: 'separator'
            }, {
                label: `Hide ${name}`,
                accelerator: 'Command+H',
                role: 'hide'
            }, {
                label: 'Hide Others',
                accelerator: 'Command+Alt+H',
                role: 'hideothers'
            }, {
                label: 'Show All',
                role: 'unhide'
            }, {
                type: 'separator'
            }, {
                label: 'Quit',
                accelerator: 'Command+Q',
                click: function () {
                    app.quit()
                }
            }]
        })

        this.addUpdateMenuItems(template[0].submenu, 1)
    }

    init() {
        if (process.platform === 'darwin') {
            this.defaultMenuItem()
        }

        if (process.platform === 'win32') {
            const helpMenu = template[template.length - 1].submenu
            this.addUpdateMenuItems(helpMenu, 0)
        }

        const menu = Menu.buildFromTemplate(template)
        Menu.setApplicationMenu(menu)

        let reopenMenuItem = this.findReopenMenuItem()
        if (reopenMenuItem) {
            reopenMenuItem.enabled = false
        }

        if (reopenMenuItem) {
            reopenMenuItem.enabled = true
        }
    }
}

module.exports.GwMenu = GwMenu;
