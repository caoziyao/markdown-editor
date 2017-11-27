const Remarkable = require('remarkable');

class MarkdownEdit {
	constructor() {

    }

	static
	new (...args) {
		return new this(...args)
	}

	// markdown 事件监听
	markdownListener () {
	    e('#id-input-src').addEventListener('input', function(event) {
	        var src = event.target.value
	        var md = new Remarkable()
	        var html = md.render(src)
	        e('.editor-result').innerHTML = html
	    })
	}

	init() {
		this.markdownListener()
	}
}


module.exports.MarkdownEdit = MarkdownEdit;
