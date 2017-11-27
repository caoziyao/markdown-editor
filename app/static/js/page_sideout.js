

// 新建按钮
const newListener = function () {
    var ele = e('#id-new');
    ele.addEventListener('click', function () {
        var c = e('#id-input-src')
        var content = c.value
        createFile(content)
    })
}



// 填出侧边栏
const sideLoutListener = function () {
    e('#id-slide-btn').addEventListener('click', function(event) {
        var sideMenu = e('#id-slidemenu');
        var elemClass = sideMenu.classList

        if (elemClass.contains('showhide')) {
            elemClass.remove('showhide')
        } else {
            elemClass.add('showhide')
        }

    })
}
