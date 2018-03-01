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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

(function () {

    function type(v) {
        return Object.prototype.toString.apply(v).slice(8,-1)
    }

    function extend(t,o) {
        for(var n in o){
            t[n]=o[n]
        }
    }

    function inArray(v,arr) {
        for (var i=0;i<arr.length;i++){
            if(v == arr[i]){
                return true
            }
        }
        return false
    }

    function each(v,f) {
        var t = type(v)
        if (t==='Array'||t==='NodeList'||t==='Arguments') {
            for (var i=0;i<v.length;i++) {
                f(i,v[i])
            }
        }
        else if(t==='Object'){
            for (var k in v) {
                f(k,v[k])
            }
        }
        else if(t==='Number'){
            for (var i=0;i<v;i++) {
                f(i,v)
            }
        }
    }

    // Class To
    function To(p) {
        this.value = p
    }

    // common
    extend(To.prototype,{
        type:function () {
            return type(this.value)
        },
        extendBy:function (o) {
            extend(this.value,o)
            return this
        },
        inArray:function (arr) {
            return inArray(this.value,arr)
        },
        each:function (f) {
            each(this.value,f)
            return this
        }
    })

    // event
    function addEvent(el,t,cb) {
        el.addEventListener(t,cb)
    }
    function delEvent(el,t,cb) {
        el.removeEventListener(t,cb)
    }
    function onceEvent(el,t,cb) {
        function tmp() {
            delEvent(el,t,tmp)
            cb()
        }
        addEvent(el,t,tmp)
    }
    extend(To.prototype,{
        addEvent:function (t,cb) {
            addEvent(this.value,t,cb)
            return this
        },
        delEvent:function (t,cb) {
            delEvent(this.value,t,cb)
            return this
        },
        onceEvent:function (t,cb) {
            onceEvent(this.value,t,cb)
            return this
        },
        click:function (cb) {
            addEvent(this.value,'click',cb)
            return this
        }
    })

    // value(set|get)
    extend(To.prototype,{
        val:function (val) {
            var thisType = type(this.value)
            if(thisType === 'Array'){
                if(val||val==='') {
                    var valType = type(val)
                    if (valType === 'Array'){
                        each(this.value,function (k,v) {
                            v[type(v)==='HTMLInputElement'?'value':'innerHTML'] = val[k]
                        })
                    }
                    else{
                        each(this.value,function (k,v) {
                            v[type(v)==='HTMLInputElement'?'value':'innerHTML'] = val
                        })
                    }
                }
                else {
                    var tmp = []
                    each(this.value,function (k,v) {
                        tmp.push(type(v)==='HTMLInputElement'?v.value:v.innerHTML)
                    })
                    return tmp
                }
            }
            else{
                var isInput = thisType === 'HTMLInputElement'
                if(val||val===''){
                    this.value[isInput?'value':'innerHTML'] = val
                }
                else {
                    return isInput?this.value.value:this.value.innerHTML
                }
            }
            return this
        }
    })

    // property(set|get)
    extend(To.prototype,{
        attr:function () {
            var arg = arguments
            var arr = type(this.value)==='Array'?this.value:[this.value]
            if(arg.length===1){
                if(type(arg[0])==='String'){
                    if(arr.length===1){
                        return arr[0].getAttribute(arg[0])
                    }
                    else{
                        var tmp=[]
                        each(arr,function (k,v) {
                            tmp.push(v.getAttribute(arg[0]))
                        })
                        return tmp
                    }
                }
                else if(type(arg[0])==='Object'){
                    each(arr,function (k,v) {
                        each(arg[0],function (k1,v1) {
                            v.setAttribute(k1,v1)
                        })
                    })
                    return this
                }
            }
            else if(arg.length===2){
                each(arr,function (k,v) {
                    v.setAttribute(arg[0],arg[1])
                })
                return this
            }
        }
    })

    // style(set|get)
    function toIntArray(arr) {
        var array = []
        each(arr,function (k,v) {
            array.push = parseInt(v)
        })
        return array
    }
    function css2int(o,t,v) {
        if(type(v)=== 'Number'){
            return o.css(t,v+'px')
        }
        else{
            var tmp = o.css(t)
            return type(tmp)==='String'?parseInt(tmp):toIntArray(tmp)
        }
    }
    extend(To.prototype,{
        css:function () {
            var arg = arguments
            var arr = type(this.value)==='Array'?this.value:[this.value]
            if(arg.length===1){
                if(type(arg[0])==='String'){
                    if(arr.length===1){
                        return window.getComputedStyle(arr[0]).getPropertyValue(arg[0])
                    }
                    else{
                        var tmp = []
                        each(arr,function (k,v) {
                            tmp.push(window.getComputedStyle(v).getPropertyValue(arg[0]))
                        })
                        return tmp
                    }
                }
                else if(type(arg[0])==='Object'){
                    each(arr,function (k,v) {
                        each(arg[0],function (k1,v1) {
                            v.style[k1] = v1
                        })
                    })
                    return this
                }
            }
            else if(arg.length===2){
                each(arr,function (k,v) {
                    v.style[arg[0]] = arg[1]
                })
                return this
            }
        },
        W:function (v) {
            return css2int(this,'width',v)
        },
        H:function (v) {
            return css2int(this,'height',v)
        },
        L:function (v) {
            return css2int(this,'left',v)
        },
        T:function (v) {
            return css2int(this,'top',v)
        },
        R:function (v) {
            return css2int(this,'right',v)
        },
        B:function (v) {
            return css2int(this,'bottom',v)
        },
        fontSize:function (v) {
            return css2int(this,'font-size',v)
        },
        hide:function () {
            this.display = this.css('display')
            return this.css('display','none')
        },
        show:function () {
            return this.css('display',this.display?this.display:'block')
        }
    })

    // element(insert|render)
    function insert(el,d,m) {
        var mode = m?m:'beforeEnd'
        var arr = type(d) === 'Array'?d:[d]
        each(arr,function (k,v) {
            if(type(v) === 'String'){
                el.insertAdjacentHTML(mode, v)
            }
            else{
                el.insertAdjacentElement(mode, v)
            }
        })
    }
    function render(el,d,add) {
        if(!add){
            el.innerHTML = ''
        }
        var t = type(d)
        if(t === 'Array'){
            each(d,function (k,v) {
                var t = type(v)
                if(t === 'Object'){
                    if(v.childs){
                        render(v.el,v.childs)
                    }
                    insert(el,v.el)
                }
                else{
                    insert(el,v)
                }
            })
        }
        else if(t === 'Object'){
            if(d.childs){
                render(d.el,d.childs)
            }
            insert(el,d.el)
        }
        else{
            insert(el,d)
        }
    }
    extend(To.prototype,{
        insert:function (d,m) {
            insert(this.value,d,m)
            return this
        },
        render:function (d,add) {
            render(this.value,d,add)
            return this
        }
    })

    // Function _To
    function _To(p) {
        return new To(p)
    }

    function create(name,id,classList,value,attrs,event) {
        var el = document.createElement(name)
        if(id){
            el.id = id
        }
        if(classList){
            var classT = type(classList)
            if(classT === 'String'){
                el.className = classList
            }
            else if(classT === 'Array'){
                each(classList,function (k,v) {
                    el.classList.add(v)
                })
            }
        }
        if(value){
            if(type(el)==='HTMLInputElement')
                el.value = value
            else
                el.innerHTML = value
        }
        if(attrs){
            each(attrs,function (k,v) {
                el.setAttribute(k,v)
            })
        }
        if(event){
            addEvent(el,event.type,event.handle)
        }
        return el
    }
    extend(_To,{
        version: '1.0.0',
        prototype:To.prototype,//可扩展
        log: function (s) {
            console.log(s)
        },
        start:function (cb) {
            onceEvent(document,'DOMContentLoaded',cb)
        },
        //element create
        el: function (name) {
            return create(name)
        },
        elId: function (name,id) {
            var el = create(name)
            return create(name,id)
        },
        elClass: function (name,classes) {
            return create(name,false,classes)
        },
        elVal:function (name,value) {
            return create(name,false,false,value)
        },
        elAttr:function (name,attrs) {
            return create(name,false,false,false,attrs)
        },
        elEvent:function (name,event) {
            return create(name,false,false,false,false,event)
        },
        elIdClass: function (name,id,classes) {
            return create(name,id,classes)
        },
        elIdVal:function (name,id,value) {
            return create(name,id,false,value)
        },
        elIdAttr:function (name,id,attrs) {
            return create(name,id,false,false,attrs)
        },
        elIdEvent:function (name,id,event) {
            return create(name,id,false,false,false,event)
        },
        elClassVal:function (name,classes,value) {
            return create(name,false,classes,value)
        },
        elClassAttr:function (name,classes,attrs) {
            return create(name,false,classes,false,attrs)
        },
        elClassEvent:function (name,classes,event) {
            return create(name,false,classes,false,false,event)
        },
        elValAttr:function (name,value,attrs) {
            return create(name,false,false,value,attrs)
        },
        elValEvent:function (name,value,event) {
            return create(name,false,false,value,false,event)
        },
        elAttrEvent:function (name,attrs,event) {
            return create(name,false,false,false,attrs,event)
        },
        elIdClassVal:function (name,id,classes,value) {
            return create(name,id,classes,value)
        },
        elIdClassAttr:function (name,id,classes,attrs) {
            return create(name,id,classes,false,attrs)
        },
        elIdClassEvent:function (name,id,classes,event) {
            return create(name,id,classes,false,false,event)
        },
        elIdValAttr:function (name,id,value,attrs) {
            return create(name,id,false,value,attrs)
        },
        elIdValEvent:function (name,id,value,event) {
            return create(name,id,false,value,false,event)
        },
        elIdAttrEvent:function (name,id,attrs,event) {
            return create(name,id,false,false,attrs,event)
        },
        elClassValAttr:function (name,classes,value,attrs) {
            return create(name,false,classes,value,attrs)
        },
        elClassValEvent:function (name,classes,value,event) {
            return create(name,false,classes,value,false,event)
        },
        elClassAttrEvent:function (name,classes,attrs,event) {
            return create(name,false,classes,false,attrs,event)
        },
        elValAttrEvent:function (name,value,attrs,event) {
            return create(name,false,false,value,attrs,event)
        },
        elIdClassValAttr:function (name,id,classes,value,attrs) {
            return create(name,id,classes,value,attrs)
        },
        elIdClassValEvent:function (name,id,classes,value,event) {
            return create(name,id,classes,value,false,event)
        },
        elIdClassAttrEvent:function (name,id,classes,attrs,event) {
            return create(name,id,classes,false,attrs,event)
        },
        elIdValAttrEvent:function (name,id,value,attrs,event) {
            return create(name,id,false,value,attrs,event)
        },
        elClassValAttrEvent:function (name,classes,value,attrs,event) {
            return create(name,false,classes,value,attrs,event)
        },
        create:create
    })

    // support commonjs
    if (typeof module === 'object' && typeof module.exports === 'object'){
        module.exports = _To
    }
    else{
        window.To = _To
    }

})()

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// osani.js
// author：七八个星天怪
// LICENSE：MIT


(function (f) {
    if (typeof module === "object" && typeof module.exports === "object"){
        module.exports = f
    }
    else{
        window.osani = f
    }
})(function (obj) {
    //state = init | running | pause | finish
    function extend(t,o) {
        for(var n in o){
            t[n]=o[n] ;
        }
    }
    function type(v) {
        return Object.prototype.toString.apply(v).slice(8,-1);
    }
    function each(v,f) {
        var t = type(v);
        if (t==="Array"||t==="NodeList") {
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
    function draw(v,current,p) {
        function inArray(arr){
            for(var i=0;i<arr.length;i++){
                if(p==arr[i]){
                    return true;
                }
            }
            return false;
        }
        if(inArray(["width","height","left","top","right","bottom","fontSize","marginLeft","marginTop","marginRight","marginBottom",
                "paddingLeft","paddingTop","paddingRight","paddingBottom"])){
            v.style[p] = current + "px";
        }
        else if(inArray(["opacity"])){
            v.style[p] = current;
        }
        else{
            var tmp;
            if(inArray(["scaleX","scaleY"])){
                tmp = p+"("+ current + ")";
            }
            else if(inArray(["translateX","translateY"])){
                tmp = p+"("+ current + "px)";
            }
            else if(inArray(["rotate","skewX","skewY"])){
                tmp = p+"("+ current + "deg)";
            }
            if(new RegExp(p).test(v.style.transform)){
                v.style.transform = v.style.transform.replace(new RegExp(p+"[\\w\\W]+\\)"),tmp);
            }
            else{
                v.style.transform += tmp;
            }
        }
    }

    this.el = type(obj.el)!='Array'?[obj.el]:obj.el;
    this.type = obj.type;
    this.value = this.begin = obj.begin;
    this.end = obj.end;
    this.time = obj.time;
    this.state = 'init';
    var runCallback = null;
    var _n = Math.ceil(this.time * 60 / 1000);
    var n = _n;
    var step = (this.end - this.begin) / n;
    var _this = this;
    function change() {
        if(_this.state === 'running'){
            n--;
            _this.value += step;
            if(n>0){
                if(n===1){
                    _this.value = _this.end;
                }
                each(_this.el,function (k,v) {
                    draw(v,_this.value,_this.type);
                });
                runCallback && runCallback(_this.value);
                requestAnimationFrame(change);
            }
            else{
                _this.state = 'finish';
                obj.endCallback && obj.endCallback();
            }
        }
    }
    this.run = function (_callback) {
        if(this.state === 'init' || this.state === 'pause'){
            this.state = 'running';
            runCallback = _callback?_callback:null;
            requestAnimationFrame(change);
        }
    };
    this.pause = function () {
        if(this.state === 'running'){
            this.state = 'pause';
        }
    };
    this.reset = function () {
        if(this.state != 'init'){
            this.state = 'init';
            this.value = this.begin;
            n = _n;
            each(this.el,function (k,v) {
                draw(v,_this.value,_this.type);
            });
        }
    };
})


/***/ }),
/* 2 */
/***/ (function(module, exports) {


module.exports = {
    SkillView:null,
    Header:null,
    Tabs:null
}


/***/ }),
/* 3 */
/***/ (function(module, exports) {

(function(){function c(g){return Object.prototype.toString.apply(g).slice(8,-1)}function f(g,j){for(var h=0;h<g.length;h++){j(h,g[h])}}function a(h,i){for(var g in h){i(g,h[g])}}function e(g){return c(g)=="String"?{url:g}:g}function d(h,g){return new Promise(function(i){var j=new XMLHttpRequest();g.headers&&a(g.headers,function(m,l){j.setRequestHeader(m,l)});j.onreadystatechange=function(){if(j.readyState===4){i(j)}};j.open(h,g.url);j.send(g.body?g.body:"")})}var b={};f(["head","get","copy","purge","unlock"],function(h,g){b[g]=function(i){return d(g,e(i))}});f(["post","put","patch","delete","options","link","unlink","lock","propfind","view"],function(h,g){b[g]=function(i){return d(g,i)}});if(typeof module==="object"&&typeof module.exports==="object"){module.exports=b}else{this.osajax=b}})();


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {


var $ = __webpack_require__(0)
var Index = __webpack_require__(2)
var SkillView = __webpack_require__(5)

$.start(function () {
    Index.SkillView = new SkillView()
    Index.SkillView.show(document.body)
})


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {


var $ = __webpack_require__(0)
var Index = __webpack_require__(2)
var Header = __webpack_require__(6)
var Banner = __webpack_require__(7)
var Tabs = __webpack_require__(8)

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


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {


var $ = __webpack_require__(0)

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



/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {


var $ = __webpack_require__(0)
var osani = __webpack_require__(1)

module.exports = function (obj) {

    var parent = obj.parent
    var images = obj.images
    var len = images.length

    var wrapper = $.elId('div','banner_wrapper')

    var divs = []
    var controlsWrapper = $.elId('div','controls_wrapper')
    var controls = []
    $(len).each(function (k,v) {
        var imgDiv = $.elClass('div', 'img_wrapper')
        imgDiv.style.backgroundImage = 'url(' + images[k] + ')'
        $(imgDiv).L(640)
        divs.push(imgDiv)
        var imgControl = $.elClass('div', 'img_control')
        imgControl.style.left = k * (8 + 40) + 'px'
        controls.push(imgControl)
    })
    // 首尾循环
    $(divs).each(function (k,v) {
        v.nex = divs[(k+1)%len]
        if(k==0){
            v.pre = divs[len-1]
        }
        else{
            v.pre = divs[k-1]
        }
    })
    var w = len * 40 + 8 * (len-1)
    var l = (640 - w)/2
    $(controlsWrapper).W(w).L(l)

    var active = 0
    controls[active].classList.add('img_active')
    $(divs[active]).L(0)
    $(divs[len-1]).L(-640)

    var startX,currentX,endX
    var startTime,endTime
    var dX
    var auto
    function switchImg(t) {
        if(t==='left'){
            $(divs[(active+2)%len]).L(640)
            new osani({
                el:divs[active],
                type:'left',
                begin:0,
                end:-640,
                time:500
            }).run()
            new osani({
                el:divs[(active+1)%len],
                type:'left',
                begin:640,
                end:0,
                time:500
            }).run()
            controls[active].classList.remove('img_active')
            active = (active + 1)%len
            controls[active].classList.add('img_active')
        }
        else{
            if(active === 0){
                $(divs[len - 2]).L(-640)
            }
            else if(active === 1){
                $(divs[len - 1]).L(-640)
            }
            else{
                $(divs[active - 2]).L(-640)
            }
            new osani({
                el:divs[active],
                type:'left',
                begin:0,
                end:640,
                time:500
            }).run()
            new osani({
                el:divs[active==0?len-1:active-1],
                type:'left',
                begin:-640,
                end:0,
                time:500
            }).run()
            controls[active].classList.remove('img_active')
            active = active==0?len-1:active-1
            controls[active].classList.add('img_active')
        }
    }
    $(divs).each(function (k,v) {
        $(v).addEvent('touchstart',function (e) {
            clearInterval(auto)
            startX = e.changedTouches[0].clientX;
            startTime = new Date().getTime();
        }).addEvent('touchmove',function (e) {
            currentX  = e.changedTouches[0].clientX;
            dX = currentX - startX;
            if(dX<=0){
                $(divs[active]).L(dX)
                $(divs[active].nex).L(640 + dX)
            }
            else {
                $(divs[active]).L(dX)
                $(divs[active].pre).L(-640 + dX)
            }
        }).addEvent('touchend',function (e) {
            endX = e.changedTouches[0].clientX;
            endTime = new Date().getTime();
            var dTime = endTime-startTime;
            if(dTime<300){
                if(dX<=0){
                    new osani({
                        el:divs[active],
                        type:'left',
                        begin:dX,
                        end:-640,
                        time:500
                    }).run()
                    new osani({
                        el:divs[active].nex,
                        type:'left',
                        begin:640 + dX,
                        end:0,
                        time:500
                    }).run()
                    controls[active].classList.remove('img_active')
                    active = (active + 1)%len
                    controls[active].classList.add('img_active')
                }
                else{
                    new osani({
                        el:divs[active],
                        type:'left',
                        begin:dX,
                        end:640,
                        time:500
                    }).run()
                    new osani({
                        el:divs[active].pre,
                        type:'left',
                        begin:-640 + dX,
                        end:0,
                        time:500
                    }).run()
                    controls[active].classList.remove('img_active')
                    active = active==0?len-1:active-1
                    controls[active].classList.add('img_active')
                }
            }
            else{
                if(dX<=0){
                    new osani({
                        el:divs[active],
                        type:'left',
                        begin:dX,
                        end:0,
                        time:200
                    }).run()
                    new osani({
                        el:divs[active].nex,
                        type:'left',
                        begin:640 + dX,
                        end:640,
                        time:200
                    }).run()
                }
                else{
                    new osani({
                        el:divs[active],
                        type:'left',
                        begin:dX,
                        end:0,
                        time:200
                    }).run()
                    new osani({
                        el:divs[active].pre,
                        type:'left',
                        begin:-640 + dX,
                        end:-640,
                        time:200
                    }).run()
                }
            }
            auto = setInterval(switchImg,5000,'left')
        })
    })

    this.run = function () {
        parent.appendChild(wrapper)
        wrapper.appendChild(controlsWrapper)
        $(len).each(function (k,v) {
            wrapper.appendChild(divs[k])
            controlsWrapper.appendChild(controls[k])
        })
        auto = setInterval(switchImg,5000,'left')
    }
}


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {


var $ = __webpack_require__(0)
var MySkill = __webpack_require__(9)
var SkillStore = __webpack_require__(10)
var SmartHome = __webpack_require__(13)
var MyAccount = __webpack_require__(14)

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



/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {


var $ = __webpack_require__(0)
var osajax = __webpack_require__(3)

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
        var content = $.elClassVal('span','item-content-myskill',data.introductionText)

        $(panel).render([logo,title,device,charge,{
            el:stars,
            childs:createStars(score)
        },evaluation,content],true)
    }
    function SkillCategory(data) {
        var wrapper = $.elClass('div','wrapper')
        $(parent).insert(wrapper)
        new Skill(wrapper,data)
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



/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {


var $ = __webpack_require__(0)
var osajax = __webpack_require__(3)
var Pay = __webpack_require__(11)

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



/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {


var $ = __webpack_require__(0)
var osani = __webpack_require__(1)
var Confirm = __webpack_require__(12)

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

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {


var $ = __webpack_require__(0)
var osani = __webpack_require__(1)

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


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {



var $ = __webpack_require__(0)

module.exports = function (parent) {
    var parent = parent
    var panel = $.elIdVal('div','smartHome','敬请期待')

    this.show = function () {
        $(parent).render({
            el:panel
        })
    }
}



/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {



var $ = __webpack_require__(0)

module.exports = function (parent) {
    var parent = parent
    var panel = $.elIdVal('div','myAccount','敬请期待')

    this.show = function () {
        $(parent).render({
            el:panel
        })
    }
}



/***/ })
/******/ ]);
//# sourceMappingURL=app.js.map