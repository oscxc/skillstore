/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {


var $ = __webpack_require__(1)
var osajax = __webpack_require__(2)

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


/***/ }),
/* 1 */
/***/ (function(module, exports) {


function type(v) {
    return Object.prototype.toString.apply(v).slice(8,-1);
}

function extend(t,o) {
    for(var n in o){
        t[n]=o[n] ;
    }
}

function each(v,f) {
    var t = type(v);
    if (t==="Array"||t==="NodeList"||t==='Arguments') {
        for (var i=0;i<v.length;i++) {
            f(i,v[i]);
        }
    }
    else if(t==="Object"){
        for (var key in v) {
            f(key,v[key]);
        }
    }
    else if(t==="Number"){
        for (var i=0;i<v;i++) {
            f(i,v);
        }
    }
    else{
        throw new TypeError("该对象不支持遍历");
    }
}

function createTree(obj) {
    var el = obj.el;
    var childs = obj.childs;
    if(childs){
        each(childs,function (k,v) {
            createTree(v);
            el.appendChild(v.el);
        });
    }
}

function insert(el,data,_mode) {
    var mode = _mode?_mode:"beforeEnd"
    var arr = type(data)=="Array"?data:[data]
    each(arr,function (k,v) {
        if(type(v)=="String"){
            el.insertAdjacentHTML(mode, v)
        }
        else{
            el.insertAdjacentElement(mode, v)
        }
    })
    return el
}

function Util(selector){
    if(type(selector)==="Function"){
        var tmp = function () {
            document.removeEventListener("DOMContentLoaded",tmp);
            selector();
        };
        document.addEventListener("DOMContentLoaded",tmp);
    }
    else{
        var els = document.querySelectorAll(selector);
        if(els.length === 0){
            throw new Error("选择器未选到元素");
        }
        return els.length>1?els:els[0];
    }
}

extend(Util,{

    //Tools
    type:type,
    extend:extend,
    each:each,
    log:function (s){
        console.log(s);
    },
    isEmptyObject:function (o) {
        for (var k in o)
            return false;
        return true;
    },
    cannotSelect:function () {
        window.getSelection().removeAllRanges();
    },

    //Element
    create:function (tagName,attrs) {
        var el;
        switch (tagName){
            case "text":
                el = document.createTextNode(attrs);
                break;
            case "comment":
                el = document.createComment(attrs);
                break;
            case "fragment":
                el = document.createDocumentFragment();
                break;
            default:
                el = document.createElement(tagName);
                if(attrs){
                    each(attrs,function (k,v) {
                        el.setAttribute(k,v);
                    });
                }
                break;
        }
        return el;
    },
    createTree:createTree,
    insert:insert,
    createSvgIcon:function (obj) {
        function create(name) {
            return document.createElementNS('http://www.w3.org/2000/svg',name);
        }
        function attr(el,p,v) {
            el.setAttribute(p,v);
        }
        var path = create('path');
        attr(path,'fill',obj.color?obj.color:'white');
        attr(path,'d',obj.data);
        var svg = create('svg');
        attr(svg,'viewBox',obj.viewBox?obj.viewBox:'0 0 24 24');
        if(obj.className){
            svg.setAttribute('class',obj.className);
        }
        svg.appendChild(path);
        return svg;
    },
    setSvgData:function (el,data) {
        el.children[0].setAttribute('d',data);
    },
    show:function (el) {
        el.style.display = 'block';
    },
    hide:function (el) {
        el.style.display = 'none';
    },
    setLT:function (el,L,T) {
        el.style.left = L + 'px';
        el.style.top = T + 'px';
    },
    setWH:function (el,W,H) {
        el.style.width = W + 'px';
        el.style.height = H + 'px';
    },

    //Events
    addEvent:function (el,name,cb) {
        el.addEventListener(name,cb);
    },
    delEvent:function (el,name,cb) {
        el.removeEventListener(name,cb);
    },
    click:function (el,cb) {
        el.addEventListener("click",cb);
    },

    //Style
    css:function (el,obj) {
        if(type(obj)==="String"){
            return window.getComputedStyle(el).getPropertyValue(obj);
        }
        else {
            each(obj,function (k,v) {
                el.style[k] = v;
            });
        }
    },
    WH:function (el,n) {
        el.style.width = el.style.height = n + 'px';
    },

    //Throttle
    Throttle:function(interval,callback) {
        var time;
        this.filter = function (args) {
            if(time&&new Date()-time<interval)
                return;
            time = new Date();
            args?callback(args):callback();
        };
    }
});

module.exports = Util;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

(function(){function c(g){return Object.prototype.toString.apply(g).slice(8,-1)}function f(g,j){for(var h=0;h<g.length;h++){j(h,g[h])}}function a(h,i){for(var g in h){i(g,h[g])}}function e(g){return c(g)=="String"?{url:g}:g}function d(h,g){return new Promise(function(i){var j=new XMLHttpRequest();g.headers&&a(g.headers,function(m,l){j.setRequestHeader(m,l)});j.onreadystatechange=function(){if(j.readyState===4){i(j)}};j.open(h,g.url);j.send(g.body?g.body:"")})}var b={};f(["head","get","copy","purge","unlock"],function(h,g){b[g]=function(i){return d(g,e(i))}});f(["post","put","patch","delete","options","link","unlink","lock","propfind","view"],function(h,g){b[g]=function(i){return d(g,i)}});if(typeof module==="object"&&typeof module.exports==="object"){module.exports=b}else{this.osajax=b}})();


/***/ })
/******/ ]);
//# sourceMappingURL=app.js.map