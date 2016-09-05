var onceWarn = true //只警告一次
var dom2vdom = require('../../strategy/dom2vdom')

function scan(nodes) {
    //var getHTML = avalon.scan.htmlfy
    for (var i = 0, elem; elem = nodes[i++]; ) {
        if (elem.nodeType === 1) {
            var $id = getController(elem)

            var vm = avalon.vmodels[$id]
            if (vm && !vm.$element) {
                avalon(elem).removeClass('ms-controller')
                vm.$element = elem

                //IE6-8下元素的outerHTML前面会有空白
                //第一次扫描就清空所有空白节点,并生成最初的vtree
                var vtree = dom2vdom(elem)
                var now = new Date()
                elem.vtree = avalon.speedUp(vtree)
                 
                var now2 = new Date()
                onceWarn && avalon.log('构建虚拟DOM耗时', now2 - now, 'ms')

                vm.$render = avalon.render(elem.vtree)
                avalon.scopes[vm.$id] = {
                    vmodel: vm,
                    local: {},
                    isTemp: true
                }
                var now3 = new Date()
                onceWarn && avalon.log('构建当前vm的$render方法耗时 ', now3 - now2, 'ms\n',
                        '如果此时间太长,达100ms以上\n',
                        '建议将当前ms-controller拆分成多个ms-controller,减少每个vm管辖的区域')
                avalon.rerenderStart = now3
                onceWarn = false
                avalon.batch($id)

            } else if (!$id) {
                scan(elem.childNodes)
            }
        }
    }
}

module.exports = avalon.scan = function (a) {
    if (!a || !a.nodeType) {
        avalon.warn('[avalon.scan] first argument must be element , documentFragment, or document')
        return
    }
    scan([a])
}
// vm.$watch = [{expr:expr,cb:cb,args:args, vm:vm,type:type.    }]
function getController(a) {
    return a.getAttribute('ms-controller') ||
            a.getAttribute(':controller')
}