const Remarkable = require('remarkable');
const {log, e} = require('./utils.js')

class MarkdownEdit {
	constructor() {
		this.hljs = hljs
		this.src = e('#id-input-src')
		this.result = e('.editor-result')
    }

	static
	new (...args) {
		this.i = this.i || new this(...args)
		return this.i
	}

	setSrc(txt) {
		this.src.innerText = txt
	}

	setResult(txt) {
		let md = new Remarkable()
		let html = md.render(txt)
		this.result.innerHTML = html
		this.renderHightLine()
	}

	getSrc() {
		return this.src.innerText
	}

	// markdown 事件监听
	markdownListener () {
		let self = this
	    this.src.addEventListener('input', function(event) {
	        // let src = event.target.value
			let src = self.getSrc()
			self.setResult(src)
	        // let md = new Remarkable()
	        // let html = md.render(src)
	        // self.result.innerHTML = html
			// self.renderHightLine()
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
