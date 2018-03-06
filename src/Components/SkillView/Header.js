
var $ = require('../../Libs/to')

module.exports = function (parent) {
    var parent = parent
    var header = $.elId('div','header')
    var title = $.elIdVal('div','title','DeepBrain技能商店')

    this.show = function () {
        $(parent).render({
            el:header,
            childs:title
        })
    }
}

