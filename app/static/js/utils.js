/*
每个模块内部，module变量代表当前模块。这个变量是一个对象，它的exports属性（即module.exports）是对外的接口。
加载某个模块，其实是加载该模块的module.exports属性。

为了方便，Node为每个模块提供一个exports变量，指向module.exports
var exports = module.exports;
*/

const _e = sel => document.querySelector(sel);
const _es = sel => document.querySelectorAll(sel);
const log = console.log.bind(console);

const removeClass = (element, cls) => {
	let es = _es(element)
	for (let i = 0; i < es.length; i++) {
		let e = es[i]
		e.classList.remove(cls)
	}
}

module.exports = {
	e: _e,
	es: _es,
	log: log,
	removeClass: removeClass,
}
