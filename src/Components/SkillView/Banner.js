
var $ = require('../../Libs/to')
var osani = require('osani')

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
