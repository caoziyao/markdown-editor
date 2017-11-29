
const fs = require('fs')

class FileManager {
	constructor() {
		this.fileName = ''
		this.filePath = ''
	}

	static
	new (...args) {
		this.i = this.i || new this(...args)
		return this.i
	}

	save(path, content) {
		fs.writeFileSync(path, content, 'utf8');
	}

	updateFileInfo(filePath) {
		if (filePath) {
			let fileName = filePath.split('/').pop()
			this.filePath = filePath
			this.fileName = fileName
		}
	}
}


module.exports.FileManager = FileManager
