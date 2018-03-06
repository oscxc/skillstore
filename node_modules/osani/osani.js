// osani.js
// author：七八个星天怪
// LICENSE：MIT

'use strict';
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
