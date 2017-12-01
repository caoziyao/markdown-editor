const {log, e} = require('./utils.js')
const Remarkable = require('remarkable');
const PageTitle = require('./page_title.js')
const FileManager = require('./file_manager.js')

class MarkdownEdit {
	constructor() {
		this.hljs = hljs
		this.src = e('#id-input-src')
		this.result = e('.editor-result')
    }

	static new (...args) {
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

	setPicture(img) {
		this.src.innerHTML = img
		this.result.innerHTML = ''
	}

	getSrc() {
		return this.src.innerText
	}

	// markdown 事件监听
	markdownListener () {
		let self = this
		let pt = PageTitle.new()
		let fm = FileManager.new()
	    this.src.addEventListener('input', function(event) {
	        // let src = event.target.value
			fm.changedStatus(true)
			pt.updateTitleStatus(true)
			let src = self.getSrc()
			self.setResult(src)
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


module.exports = MarkdownEdit;
