const {log, e} = require('../utils.js')
const {FileDialog} = require('../file_dialog.js')
const {MarkdownEdit} = require('../page_markdown_edit.js')
const {FileManager} = require('../file_manager.js')
const {PageProject} = require('../page_project.js')
const path = require("path")
const fs = require("fs")

const newFile = () => {
	log('newFile click')
}

const open = () => {

	FileDialog.open(function (txt, filePath) {
		let md = MarkdownEdit.new()
		let fm = FileManager.new()
		let pj = PageProject.new()

		md.setSrc(txt)
		md.setResult(txt)
		fm.updateFileInfo(filePath)
		let target = e(pj.ul)
		pj.addFile(target, filePath)

	})
}

const save = () => {
	let fm = FileManager.new()
	let md = MarkdownEdit.new()
	let path = fm.filePath
	let content = md.getSrc()

	if (path === '') {
		FileDialog.new(content, function(filePath) {
			fm.updateFileInfo(filePath)
			let pj = PageProject.new()

			let target = e(pj.ul)
			pj.addFile(target, filePath)
		})
	} else {
		fm.save(path, content)
	}
}

const addProjectFolder = () => {
	FileDialog.openDir(function (dir, files) {

		let md = MarkdownEdit.new()
		let fm = FileManager.new()
		let pj = PageProject.new()

		let dirlist = []
		let filelist = []
		for (let i = 0; i < files.length; i++) {
			let file = files[i]
			let fullname = path.join(dir,file)
 			let stats = fs.statSync(fullname)
			if (stats.isDirectory()) {
				//log('dir', fullname)
				dirlist.push(fullname)
			} else {
			//	log('file', fullname)
				filelist.push(fullname)
			}
		}

		let target = e(pj.ul)
		pj.addDir(target, dir)
		//pj.addProjectFolder(target, dirlist, filelist)
	})
}


module.exports = {
	newFile: newFile,
	open: open,
	save: save,
	addProjectFolder: addProjectFolder,
}
