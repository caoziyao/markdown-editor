
const {log, e, es, removeClass} = require('./utils.js')
const fs = require('fs')
const fspath = require("path")
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

	fileTemplate(data) {
		let name = data.fileName
		let path = data.filePath
		let t = `<li class="project-window-li file" data-path="${path}"><i class="fa fa-file"></i>${name}</li>`
		return t
	}

	dirTemplate(data) {
		let name = data.fileName
		let path = data.filePath
		let t = `<li class="project-window-li dir collapsed" data-path="${path}"><i class="fa fa-folder"></i>${name}</li>`
		return t
	}

	// appendUl(html) {
	// 	e(this.ul).insertAdjacentHTML('beforeend', html)
	// }

	addFile(target, filePath) {
		//
		let path = filePath
		let name = path.split('/').pop()

		let d = {
			fileName: name,
			filePath: path
		}
		let t = this.fileTemplate(d)
		// this.appendUl(t)
		target.insertAdjacentHTML('beforeend', t)
		this.fileList[path] = name
	}



	addDir(target, dir) {
		// dir 目录路径
		let name = dir.split('/').pop()

		let d = {
			fileName: name,
			filePath: dir
		}
		let t = this.dirTemplate(d)
		// this.appendUl(t)
		target.insertAdjacentHTML('beforeend', t)
		this.fileList[dir] = name
	}

	removeFile() {

	}

	addProjectFolder(target, dirlist, filelist) {
		// dirlist, filelist 项目列表
		for (let i = 0; i < dirlist.length; i++) {
			let dir = dirlist[i]
			this.addDir(target, dir)
		}

		for (let i = 0; i < filelist.length; i++) {
			let file = filelist[i]
			this.addFile(target, file)
		}
	}

	slideDir(target, path) {
		// 划出 目录
		var files = fs.readdirSync(path);
		// collapsed  expanded

		let cls = target.classList
		//let name = target.innerHTML
		if (target.classList.contains('collapsed')) {
			// 展开
			let dirlist = []
			let filelist = []
			for (let i = 0; i < files.length; i++) {
				let file = files[i]
				let fullname = fspath.join(path,file)
				let stats = fs.statSync(fullname)
				if (stats.isDirectory()) {
					//log('dir', fullname)
					dirlist.push(fullname)
				} else {
				//	log('file', fullname)
					filelist.push(fullname)
				}
			}
			let filterDir = dirlist.filter((value, index) => {
				let name = value.split('/').pop()
				return name[0] != '.'
			})
			log('aaaa', filterDir)
			this.addProjectFolder(target, filterDir, filelist)
			target.classList.remove('collapsed')
			target.classList.add('expanded')

			target.querySelector('i').classList.remove('fa-folder')
			target.querySelector('i').classList.add('fa-folder-open')
		} else {
			// 关闭
			let ts = target.querySelectorAll('li')
			for (let t of ts) {
				t.outerHTML = ''
			}
			target.classList.remove('expanded')
			target.classList.add('collapsed')

			target.querySelector('i').classList.remove('fa-folder-open')
			target.querySelector('i').classList.add('fa-folder')
		}

	}

	addEventListener() {
		let self = this
		e(this.ul).addEventListener('click', function (event) {
			let md = MarkdownEdit.new()
			let fm = FileManager.new()
			let target = event.target
			let path = target.dataset.path

			let stats = fs.statSync(path)
			if (stats.isDirectory()) {
				//log('dir', fullname)
				self.slideDir(target, path)

			} else {
			//	log('file', fullname)
			// let name = target.innerHTML
				let txt =  fs.readFileSync(path, 'utf8');
				removeClass(self.li, 'active')
				target.classList.add('active')
				md.setSrc(txt)
				md.setResult(txt)
				fm.updateFileInfo(path)
			}
		})

	}

	init() {
		this.addEventListener()
	}
}


module.exports.PageProject = PageProject
