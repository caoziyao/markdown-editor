

class PageTitle {
	constructor() {
		this.init()
    }

	static new(...args) {
		this.i = this.i || new this(...args)
		return this.i
	}

	updateTitleStatus(status) {
		let t = ' -*- '
		if (status) {
			document.title = this.title + t
		} else {
			document.title = this.title
		}
	}

	setTitle(title) {
		this.title = title
		document.title = title
	}

	init() {
		this.title = document.title
	}
}


module.exports = PageTitle
