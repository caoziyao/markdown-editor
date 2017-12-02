const {log} = require('./utils.js')
const MarkdownEdit = require('./page_markdown_edit.js')
const FileManager = require('./file_manager.js')
const PageTitle = require('./page_title.js')
const config = require('./config-store.js')

const save = () => {
	let fm = FileManager.new()
	let md = MarkdownEdit.new()
	let pt = PageTitle.new()

	let path = fm.filePath
	let content = md.getSrc()

	if (path !== '') {
		fm.save(path, content)
		fm.changedStatus(false)
		pt.updateTitleStatus(false)
	}
}

const startTask = () => {

	let ms = config.get('auto-save-ms')
	let fm = FileManager.new()
	const auto = config.get('auto-save');

	setInterval( () => {
		if (fm.changed && ( auto === 'enabled')) {
			save()
		} else {
			//log('save')
		}
	}, ms)
}

module.exports = {
	startTask: startTask,
	save: save,
}
