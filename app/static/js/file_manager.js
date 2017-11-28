
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
}


module.exports.FileManager = FileManager
