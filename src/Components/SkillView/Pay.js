
var $ = require('../../Libs/to')
var osani = require('osani')
var Confirm = require('./Confirm')

module.exports = function (obj) {

    var parent = obj.parent
    var charge = obj.charge

    var wrapper = $.elId('div','pay')
    var pay_panel = $.elId('div','pay_panel')

    var Alipay = $.elId('div','Alipay')
    var AlipayImg = $.el('img')
    AlipayImg.src = 'assets/images/Alipay.jpg'
    var AlipayName = $.elVal('span','支付宝支付')

    var WeChat = $.elId('div','WeChat')
    var WeChatImg = $.el('img')
    WeChatImg.src = 'assets/images/WeChat.jpg'
    var WeChatName = $.elVal('span','微信支付')

    var DBC = $.elId('div','DBC')
    var DBCImg = $.el('img')
    DBCImg.src = 'assets/images/DBC.jpg'
    var DBCName = $.elVal('span','DBC支付(优惠20%)')


    this.remove = function () {
        document.body.removeChild(wrapper)
    }
    var _this = this
    this.show = function () {
        $(parent).render({
            el:wrapper,
            childs:[
                {
                    el:pay_panel,
                    childs:[
                        {
                            el:Alipay,
                            childs:[AlipayImg,AlipayName]
                        },
                        {
                            el:WeChat,
                            childs:[WeChatImg,WeChatName]
                        },
                        {
                            el:DBC,
                            childs:[DBCImg,DBCName]
                        }
                    ]
                }
            ]
        },true)

        new osani({
            el:pay_panel,
            type:'translateY',
            begin:-60,
            end:0,
            time:200
        }).run()
        new osani({
            el:pay_panel,
            type:'opacity',
            begin:0.4,
            end:1,
            time:200
        }).run()
        $(wrapper).addEvent('touchend',function () {
            _this.remove()
        })

        var dbc = charge * 0.8
        $(DBC).addEvent('touchend',function () {
            new Confirm({
                msg:'将扣除'+ dbc + '个DBC'
            }).show()
        })
    }

}