
var $ = require('../../Libs/to')
var osajax = require('osajax')
var Pay = require('./Pay')

module.exports = function (obj) {
    var parent = obj.parent
    var url = obj.datasource
    var str = ''
    var data = null

    //技能商店列表组件
    function Skill(wrapper,v) {
        var data = v.function
        var panel = $.elClass('div','panel')
        $(wrapper).insert(panel)
        var logo = $.elClass('img','item-logo')
        if(/images\/appstoreicons/.test(data.picUrl)){
            logo.src = 'http://deepbrain.ai/' + data.picUrl
        }
        else{
            logo.src = data.picUrl
        }
        //标题
        var title = $.elClassVal('span','item-title',data.name)
        //在用设备数
        var device = $.elClassVal('span','item-device','254万设备在使用')
        //价格
        var RMB = data.price
        var charge = $.elClassVal('span','item-charge',RMB == 0||RMB==null?'免费':RMB  + '元')
        //星评
        var score = Math.round(v.averageScore)
        function createStars(score) {
            var stars = []
            var full = Math.floor(score/2)
            var half = score % 2 === 0 ? 0 : 1;
            var blank = 5 - full - half;
            $(full).each(function (k,v) {
                var star = $.el('img')
                star.src = 'assets/images/ic_star-S.png'
                stars.push(star)
            })
            if(half === 1){
                var star = $.el('img')
                star.src = 'assets/images/ic_star-S-half.png'
                stars.push(star)
            }
            $(blank).each(function (k,v) {
                var star = $.el('img')
                star.src = 'assets/images/ic_star-S-blank.png'
                stars.push(star)
            })
            return stars;
        }
        var stars = $.elClass('div','item-stars')
        //评价数
        var reviewCount = v.reviewCount
        var evaluation = $.elClassVal('span','item-evaluation','评价('+reviewCount+')')
        //摘要
        var content = $.elClassVal('span','item-content',data.introductionText)
        //获取
        var getSkill = $.elClassVal('div','item-getskill','拥有')

        $(panel).render([logo,title,device,charge,{
            el:stars,
            childs:createStars(score)
        },evaluation,content,getSkill],true)

        $(getSkill).addEvent('touchend',function () {
            new Pay({
                parent:document.body,
                charge:2.5
            }).show()
        })
    }
    function SkillCategory(data) {
        var wrapper = $.elClass('div','wrapper')
        var title = $.elClass('div','item-type')
        var tag = $.elVal('span',data.tagName)
        var moreSkills = $.elVal('span','更多技能')

        $(parent).render({
            el:wrapper,
            childs:{
                el:title,
                childs:tag
            }
        },true)

        if(data.tagName != '本周最火'){
            $(title).insert(moreSkills)
        }
        $(data.skillStoreFunctionList).each(function (k,v) {
            new Skill(wrapper,v)
        })
    }

    this.update = function (parent) {
        // loading
        osajax.get(url).then(function (xhr) {
            str = xhr.response
            data = JSON.parse(str)
            $(data).each(function (k,v) {
                new SkillCategory(v)
            })
            // remove loading
        })
    }
}

