
/*
每个模块内部，module变量代表当前模块。这个变量是一个对象，它的exports属性（即module.exports）是对外的接口。
加载某个模块，其实是加载该模块的module.exports属性。

为了方便，Node为每个模块提供一个exports变量，指向module.exports
var exports = module.exports;
*/

const e = sel => document.querySelector(sel);
const log = console.log.bind(console);



module.exports.e = e;
module.exports.log = log;
