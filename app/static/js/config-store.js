
const {log} = require('./utils.js')
const Const = require('./const')
const configDefault = require('./config-default')

class Configstore {
	constructor(name, config) {
		for (let k of Object.keys(config)) {
			this[k] = config[k]
		}
	}

	static new (...args) {
		this.i = this.i || new this(...args)
		return this.i
	}
}

const option = Configstore.new(Const.name, configDefault)
module.exports = option
