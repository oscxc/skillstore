
var $ = require('../../Libs/to')
var MySkill = require('./MySkill')
var SkillStore = require('./SkillStore')
var SmartHome = require('./SmartHome')
var MyAccount = require('./MyAccount')

module.exports = function (obj) {
    var parent = obj.parent
    var tabs = obj.tabs
    var len = tabs.length

    var wrapper = $.elId('div','tabs')
    var tabsEl = []
    var panelsWrapper = $.elId('div','tabsPanelsWrapper')
    var panels = []
    var loaded = []
    $(len).each(function (k,v) {
        tabsEl.push($.elVal('div',tabs[k]))
        panels.push($.elClass('div','tabs_panels'))
        loaded.push(false)
    })

    var activeIndex = 0
    function setTabActive(n) {
        tabsEl[activeIndex].className = ''
        $(panels[activeIndex]).hide()
        activeIndex = n
        tabsEl[activeIndex].className = 'tab-active'
        $(panels[activeIndex]).show()
    }


    function switchTab(n) {
        setTabActive(n)
        if(loaded[n]){
            return
        }
        loaded[n] = true
        switch (n){
            case 0:
                var mySkill = new MySkill({
                    parent:panels[n],
                    datasource:'http://api.deepbrain.ai:8383/open-api/skill-store/user-skills?appId=com.voice.assistant.main&robotId=573e0d07-2ee9-469e-ace8-a6cc611968e4&userId=4503'
                })
                mySkill.update()
                break
            case 1:
                var skillStore = new SkillStore({
                    parent:panels[n],
                    datasource:'http://api.deepbrain.ai:8383/open-api/skill-store/skills?functionCategoryCode=standard&displayLimit=2&device=mobile'
                })
                skillStore.update()
                break
            case 2:
                var smartHome = new SmartHome(panels[n])
                smartHome.show()
                break
            case 3:
                var myAccount = new MyAccount(panels[n])
                myAccount.show()
                break
        }
    }
    this.run = function () {
        $(parent).render([{
            el:wrapper,
            childs:tabsEl
        },{
            el:panelsWrapper,
            childs:panels
        }],true)

        switchTab(activeIndex)
        $(tabsEl).each(function (k,v) {
            $(v).addEvent('touchend',function () {
                if(k != activeIndex){
                    switchTab(k)
                }
            })
        })
    }
}

