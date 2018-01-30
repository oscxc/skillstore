
var $ = require('./lib/Util')
var osajax = require('osajax')

$(function () {
    var swiper = new Swiper('.swiper-container', {
        pagination: {
            el: '.swiper-pagination'
        }
    })

    //选项卡操作
    var tab = $('#tab')
    function create(text) {
        var el =  $.create('div')
        el.innerHTML = text
        return el
    }
    var mySkill = create('我的技能')
    var skillStore = create('技能商店')
    var smartHome = create('智慧家庭')
    var myAccount = create('我的账户')
    var list = [mySkill,skillStore,smartHome,myAccount]

    $.insert(tab,list)

    var activeIndex = 0
    function setTabActive(n) {
        list[activeIndex].className = ''
        activeIndex = n
        list[activeIndex].className = 'tab-active'
    }
    setTabActive(activeIndex)


    var container = $('#container')
    //技能商店列表组件
    function Item(wrapper,data) {
        var panel = $.create('div',{'class':'panel'})
        $.insert(wrapper,panel)
        var logo = $.create('img',{'class':'item-logo'})
        if(/images\/appstoreicons/.test(data.picUrl)){
            logo.src = 'http://deepbrain.ai/' + data.picUrl
        }
        else{
            logo.src = data.picUrl
        }
        //标题
        var title = $.create('span',{'class':'item-title'})
        title.innerHTML = data.name
        //在用设备数
        var device = $.create('span',{'class':'item-device'})
        device.innerHTML = '254万设备在使用'
        //价格
        var charge = $.create('span',{'class':'item-charge'})
        charge.innerHTML = '2.5元'
        //星评
        var score = 7
        function createStars(score) {
            var stars = []
            var full = Math.floor(score/2)
            var half = score % 2 === 0 ? 0 : 1;
            var blank = 5 - full - half;
            $.each(full,function (k,v) {
                var star = $.create('img')
                star.src = 'assets/images/ic_star-S.png'
                stars.push(star)
            })
            if(half === 1){
                var star = $.create('img')
                star.src = 'assets/images/ic_star-S-half.png'
                stars.push(star)
            }
            $.each(blank,function (k,v) {
                var star = $.create('img')
                star.src = 'assets/images/ic_star-S-blank.png'
                stars.push(star)
            })
            return stars;
        }
        var stars = $.create('div',{'class':'item-stars'})
        //评价
        var evaluation = $.create('span',{'class':'item-evaluation'})
        evaluation.innerHTML = '评价(2390)'
        //摘要
        var content = $.create('span',{'class':'item-content'})
        content.innerHTML = data.introductionText
        //获取
        var getSkill = $.create('div',{'class':'item-getskill'})
        getSkill.innerHTML = '拥有'

        $.insert(panel,[logo,title,device,charge,$.insert(stars,createStars(score)),evaluation,content,getSkill])
    }
    function ItemComponent(data) {
        var wrapper = $.create('div',{'class':'wrapper'})
        var title = $.create('div',{'class':'item-type'})
        var tag = $.create('span')
        tag.innerHTML = data.tagName
        var moreSkills = $.create('span')
        moreSkills.innerHTML = '更多技能'

        $.insert(container,$.insert(wrapper,$.insert(title,tag)))
        if(data.tagName != '本周最火'){
            $.insert(title,moreSkills)
        }
        $.each(data.skillStoreFunctionList,function (k,v) {
            var data = v.function
            new Item(wrapper,data)
        })
    }
    function handleSkillStore() {
        osajax.get('http://api.deepbrain.ai:8383/open-api/skill-store/skills?functionCategoryCode=standard&displayLimit=2&device=mobile').then(function (xhr) {
            var data = JSON.parse(xhr.response)
            $.each(data,function (k,v) {
                new ItemComponent(v)
            })
        })
    }
    $.each(list,function (k,v) {
        $.addEvent(v,'touchend',function () {
            setTabActive(k)
            switch (k){
                case 0:
                    break;
                case 1:
                    handleSkillStore();
                    break;
                case 2:
                    break;
                case 3:
                    break;
            }
        })
    })
})
