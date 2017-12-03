

class Object {
	constructor() {

	}

	static new (...args) {
		return new this(...args)
	}
}
