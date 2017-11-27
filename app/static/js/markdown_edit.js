const Remarkable = require('remarkable');

class MarkdownEdit {
	constructor() {
		this.hljs = hljs
    }

	static
	new (...args) {
		return new this(...args)
	}

	// markdown 事件监听
	markdownListener () {
		let self = this
	    e('#id-input-src').addEventListener('input', function(event) {
	        let src = event.target.value
	        let md = new Remarkable()
	        let html = md.render(src)
	        e('.editor-result').innerHTML = html
			self.renderHightLine()
	    })
	}

	// 高亮语法
   renderHightLine() {
	   let hljs = this.hljs;
	   let codes = document.querySelectorAll('pre code')
	   for (let i = 0; i < codes.length; i++) {
		   let block = codes[i]
		   hljs.highlightBlock(block);
	   }
   };

	init() {
		this.markdownListener()
	}
}


module.exports.MarkdownEdit = MarkdownEdit;
