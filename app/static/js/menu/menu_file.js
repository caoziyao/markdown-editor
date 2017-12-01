const {log, e} = require('../utils.js')
const FileDialog = require('../file_dialog.js')
const MarkdownEdit = require('../page_markdown_edit.js')
const PageProject = require('../page_project.js')
const FileManager = require('../file_manager.js')
const PageTitle = require('../page_title.js')

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
	let pt = PageTitle.new()

	let path = fm.filePath
	let content = md.getSrc()

	if (path === '') {
		FileDialog.new(content, function(filePath) {
			fm.updateFileInfo(filePath)
			let pj = PageProject.new()

			let target = e(pj.ul)
			pj.addFile(target, filePath)
			fm.changedStatus(false)
			pt.updateTitleStatus(false)
		})
	} else {
		fm.save(path, content)
		fm.changedStatus(false)
		pt.updateTitleStatus(false)
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
		fm.addHistoryDir(dir)
		//pj.addProjectFolder(target, dirlist, filelist)
	})
}

const _addDir = (dir)=> {
	let pj = PageProject.new()
	let target = e(pj.ul)
	pj.addDir(target, dir)
}

const reopenProjectItem = () => {
	let subitem = []
	let fm = FileManager.new()
	let items = fm.loadHistoryDir()
	for (let i=0; i < items.length; i++) {
		let item = items[i]
		let t = {
			label: item,
			click: function() {
				_addDir(item)
			},
		}
		subitem.push(t)
	}
	return subitem
}
const clearProjectHistory = () => {
	let fm = FileManager.new()
	fm.cleanHistoryDir()
}

module.exports = {
	newFile: newFile,
	open: open,
	save: save,
	addProjectFolder: addProjectFolder,
	reopenProjectItem: reopenProjectItem,
	clearProjectHistory: clearProjectHistory,
}
