const {log} = require('../utils.js')
const {FileDialog} = require('../file_dialog.js')
const {MarkdownEdit} = require('../page_markdown_edit.js')
const {FileManager} = require('../file_manager.js')

const newFile = () => {
	log('newFile click')
}

const open = () => {

	FileDialog.open(function (txt, filePath) {
		let md = MarkdownEdit.new()
		let fm = FileManager.new()
		md.setSrc(txt)
		md.setResult(txt)

		if (filePath) {
			let fileName = filePath.split('/').pop()
			fm.filePath = filePath
			fm.fileName = fileName
		}
	})

}

const save = () => {
	let fm = FileManager.new()
	let md = MarkdownEdit.new()
	let path = fm.filePath
	let content = md.getSrc()

	log('save', path, content)
	fm.save(path, content)
}

module.exports = {
	newFile: newFile,
	open: open,
	save: save,
}
