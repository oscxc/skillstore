
var $ = require('../../Libs/to')
var Index = require('../index')
var Header = require('./Header')
var Banner = require('./Banner')
var Tabs = require('./Tabs')

module.exports = function () {

    var wrapper = $.elId('div','skill_view')

    Index.Header = new Header(wrapper)
    var banner = new Banner({
        parent:wrapper,
        images:[
            'assets/images/DeepBrainBanner.png',
            'assets/images/DeepBrainBanner.png',
            'assets/images/DeepBrainBanner.png',
            'assets/images/DeepBrainBanner.png',
            'assets/images/DeepBrainBanner.png'
        ]
    })
    Index.Tabs = new Tabs({
        parent:wrapper,
        tabs:[
            '我的技能',
            '技能商店',
            '智慧家庭',
            '我的账户'
        ]
    })

    this.show = function (parent) {
        parent.appendChild(wrapper)
        Index.Header.show()
        banner.run()
        Index.Tabs.run()
    }
}
