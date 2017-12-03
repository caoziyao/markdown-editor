
const fs = require('fs')
// const storage = require('electron-json-storage');   // 缓存
// const notifier = require('node-notifier')           // 通知功能

class FileManager {
	constructor() {
		this.setup()
	}

	static new (...args) {
		this.i = this.i || new this(...args)
		return this.i
	}

	setup() {
		this.filterExtNames = ['.docx', '.doc',]
		this.picExtNames = ['.png', '.jpg', '.jpeg']
		this.fileName = ''
		this.filePath = ''
		this.changed = false
		this.historyDir = this.loadHistoryDir()
	}


	save(path, content) {
		fs.writeFileSync(path, content, 'utf8');
	}

	cleanHistoryDir() {
		this.historyDir = []
		localStorage.removeItem('dir')
	}

	addHistoryDir(dir) {
		this.historyDir.push(dir)
		localStorage.removeItem('dir')
		localStorage.setItem('dir', JSON.stringify(this.historyDir));
	}

	loadHistoryDir() {
		let h = localStorage.getItem('dir') || '[]'
		return JSON.parse(h)
	}

	updateFileInfo(filePath) {
		if (filePath) {
			let fileName = filePath.split('/').pop()
			this.filePath = filePath
			this.fileName = fileName
		}
	}

	changedStatus(status) {
		// this.changed  状态
		// true: 改变未保存。 false 已经保存
		this.changed = status
	}
}


module.exports = FileManager
