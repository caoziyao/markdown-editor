const {log} = require('../utils.js')
const {GwDialog} = require('../file_system.js')


const newFile = () => {
	log('newFile click')
}

const open = () => {
	log('open click')
	GwDialog.open()
}

module.exports = {
	newFile: newFile,
	open: open,
}
