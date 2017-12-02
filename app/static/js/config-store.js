
const {log} = require('./utils.js')
const Const = require('./const')
const configDefault = require('./config-default')

class Configstore {
	constructor(name, config) {
		this.name = name
		this.config = config
	}

	static new (...args) {
		this.i = this.i || new this(...args)
		return this.i
	}

	get(item) {
		return this.config[item]
	}
}

module.exports = Configstore.new(Const.name, configDefault)
