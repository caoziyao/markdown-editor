
const {log, e, es, removeClass} = require('./utils.js')
const fs = require('fs')
const {MarkdownEdit} = require('./page_markdown_edit.js')
const {FileManager} = require('./file_manager.js')

class PageProject {
	constructor() {
		this.fileList = {}
		this.tree = null
		this.ul = '.project-window-ul'
		this.li = '.project-window-li'
		this.init()
    }

	static
	new (...args) {
		this.i = this.i || new this(...args)
		return this.i
	}

	liTemplate(data) {
		let name = data.fileName
		let path = data.filePath
		let t = `<li class="project-window-li" data-path="${path}">${name}</li>`
		return t
	}

	appendUl(html) {
		e(this.ul).insertAdjacentHTML('beforeend', html)
	}

	addFile(filePath) {
		let path = filePath
		let name = path.split('/').pop()

		let d = {
			fileName: name,
			filePath: path
		}
		let t = this.liTemplate(d)
		this.appendUl(t)
		this.fileList[path] = name
	}

	removeFile() {

	}

	addEventListener() {
		let self = this
		e(this.ul).addEventListener('click', function (event) {
			let target = event.target
			let path = target.dataset.path
			let name = target.innerHTML
			let md = MarkdownEdit.new()
			let fm = FileManager.new()
			let txt =  fs.readFileSync(path, 'utf8');

			removeClass(self.li, 'active')
			target.classList.add('active')

			md.setSrc(txt)
			md.setResult(txt)
			fm.updateFileInfo(path)
		})

	}

	init() {
		this.addEventListener()
	}
}


module.exports.PageProject = PageProject
