const {log} = require('../utils.js')
const {FileDialog} = require('../file_dialog.js')
const {MarkdownEdit} = require('../page_markdown_edit.js')
const {FileManager} = require('../file_manager.js')
const {PageProject} = require('../page_project.js')

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

		pj.addFile(filePath)

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
			pj.addFile(filePath)
		})
	} else {
		fm.save(path, content)
	}

}

module.exports = {
	newFile: newFile,
	open: open,
	save: save,
}
