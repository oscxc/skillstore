

var $ = require('../../Libs/to')

module.exports = function (parent) {
    var parent = parent
    var panel = $.elIdVal('div','smartHome','敬请期待')

    this.show = function () {
        $(parent).render({
            el:panel
        })
    }
}

