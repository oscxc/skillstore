
var $ = require('../../Libs/to')
var osani = require('osani')

module.exports = function (obj) {

    var wrapper = $.elId('div','confirmWindow')
    var DBCConfirm = $.elId('div','DBCConfirm')
    var confirmTitle = $.elIdVal('div','confirmTitle',obj.msg)
    var btWrapper = $.elClass('div','bt-wrapper')
    var cancel = $.elIdVal('div','cancel','取消')
    var ok = $.elIdVal('div','ok','确定')

    this.remove = function () {
        document.body.removeChild(wrapper)
    }
    var _this = this
    this.show = function () {
        $(document.body).render({
            el:wrapper,
            childs:[
                {
                    el:DBCConfirm,
                    childs:[confirmTitle,
                        {
                            el:btWrapper,
                            childs:[cancel,ok]
                        }
                    ]
                }
            ]
        },true)
        new osani({
            el:DBCConfirm,
            type:'scaleX',
            begin:0.5,
            end:1,
            time:200
        }).run()
        new osani({
            el:DBCConfirm,
            type:'scaleY',
            begin:0.5,
            end:1,
            time:200
        }).run()
        $(cancel).addEvent('touchend',function () {
            _this.remove()
        })
        $(ok).addEvent('touchend',function () {
            // 转到我的账户查看余额
        })
    }

}
