const {log} = require('../utils.js')

const cut = () => {
	log('cut click')
}

const copy = () => {
	log('copy click')
}

module.exports = {
	cut: cut,
	copy: copy,
}
