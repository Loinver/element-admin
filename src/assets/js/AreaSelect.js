var AreaSelecter = function () {
    this.gearArea;
    this.data;
    this.index = 0;
    this.value = [0, 0, 0];
}
var cssHtml = ".gearArea{fonts-family:Helvetica Neue,Helvetica,Arial,sans-serif;fonts-size:10px;background-color:rgba(0,0,0,0);display:block;position:fixed;top:0;left:0;width:100%;height:100%;z-index:9900;overflow:hidden;-webkit-animation-fill-mode:both;animation-fill-mode:both}.area_ctrl{vertical-align:middle;background-color:#d5d8df;color:#000;margin:0;height:auto;width:100%;position:absolute;left:0;bottom:0;z-index:9901;overflow:hidden;-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}.slideInUp{-webkit-animation:slideInUp .3s;animation:slideInUp .3s;}@-webkit-keyframes slideInUp{from{-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0)}to{-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}}@keyframes slideInUp{from{-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0)}to{-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}}.area_roll{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;width:100%;height:auto;overflow:hidden;background-color:transparent;-webkit-mask:-webkit-gradient(linear,0% 50%,0% 100%,from(#debb47),to(rgba(36,142,36,0)));-webkit-mask:-webkit-linear-gradient(top,#debb47 50%,rgba(36,142,36,0))}.area_roll>div{fonts-size:1.6em;height:10em;float:left;background-color:transparent;position:relative;overflow:hidden;-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1}.area_roll>div .gear{width:100%;float:left;position:absolute;z-index:9902;margin-top:4em}.area_roll_mask{-webkit-mask:-webkit-gradient(linear,0% 40%,0% 0%,from(#debb47),to(rgba(36,142,36,0)));-webkit-mask:-webkit-linear-gradient(bottom,#debb47 50%,rgba(36,142,36,0));padding:0}.area_grid{position:relative;top:4em;width:100%;height:2em;margin:0;box-sizing:border-box;z-index:0;border-top:1px solid #abaeb5;border-bottom:1px solid #abaeb5}.area_roll>div:nth-child(3) .area_grid>div{left:42%}.area_btn{color:#0575f2;fonts-size:1.6em;line-height:1em;text-align:center;padding:.8em 1em}.area_btn_box:before,.area_btn_box:after{content:'';position:absolute;height:1px;width:100%;display:block;background-color:#96979b;z-index:15;-webkit-transform:scaleY(0.33);transform:scaleY(0.33)}.area_btn_box{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:stretch;-webkit-align-items:stretch;-ms-flex-align:stretch;align-items:stretch;background-color:#f1f2f4;position:relative}.area_btn_box:before{left:0;top:0;-webkit-transform-origin:50% 20%;transform-origin:50% 20%}.area_btn_box:after{left:0;bottom:0;-webkit-transform-origin:50% 70%;transform-origin:50% 70%}.tooth{height:2em;line-height:2em;text-align:center;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;line-clamp:1;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;overflow:hidden}";
var cssEle = document.createElement("style");
cssEle.type = "text/css";
cssEle.appendChild(document.createTextNode(cssHtml));
document.getElementsByTagName("head")[0].appendChild(cssEle);
AreaSelecter.prototype = {
    init: function (params) {
        this.params = params;
        this.trigger = document.querySelector(params.trigger);
        if (params.valueTo) {
            this.valueTo = document.querySelector(params.valueTo);
        }
        this.keys = params.keys;
        this.bindEvent();
    },
    getData: function (callback) {
        var _self = this;
        if (typeof _self.params.data == "object") {
            _self.data = _self.params.data;
            callback();
        } else {
            var xhr = new XMLHttpRequest();
            xhr.open('get', _self.params.data);
            xhr.onload = function (e) {
                if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 0) {
                    var responseData = JSON.parse(xhr.responseText);
                    _self.data = responseData.data;
                    if (callback) {
                        callback()
                    }
                }
            }
            xhr.send();
        }
    },
    bindEvent: function () {
        var _self = this;
        //呼出插件
        function popupArea(e) {
            _self.gearArea = document.createElement("div");
            _self.gearArea.className = "gearArea";
            _self.gearArea.innerHTML = '<div class="area_ctrl slideInUp">' +
                '<div class="area_btn_box">' +
                '<div class="area_btn larea_cancel">取消</div>' +
                '<div class="area_btn larea_finish">确定</div>' +
                '</div>' +
                '<div class="area_roll_mask">' +
                '<div class="area_roll">' +
                '<div>' +
                '<div class="gear area_province" data-areatype="area_province"></div>' +
                '<div class="area_grid">' +
                '</div>' +
                '</div>' +
                '<div>' +
                '<div class="gear area_city" data-areatype="area_city"></div>' +
                '<div class="area_grid">' +
                '</div>' +
                '</div>' +
                '<div>' +
                '<div class="gear area_county" data-areatype="area_county"></div>' +
                '<div class="area_grid">' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>';
            document.body.appendChild(_self.gearArea);
            areaCtrlInit();
            var larea_cancel = _self.gearArea.querySelector(".larea_cancel");
            larea_cancel.addEventListener('touchstart', function (e) {
                _self.close(e);
            });
            var larea_finish = _self.gearArea.querySelector(".larea_finish");
            larea_finish.addEventListener('touchstart', function (e) {
                _self.finish(e);
            });
            var area_province = _self.gearArea.querySelector(".area_province");
            var area_city = _self.gearArea.querySelector(".area_city");
            var area_county = _self.gearArea.querySelector(".area_county");
            area_province.addEventListener('touchstart', gearTouchStart);
            area_city.addEventListener('touchstart', gearTouchStart);
            area_county.addEventListener('touchstart', gearTouchStart);
            area_province.addEventListener('touchmove', gearTouchMove);
            area_city.addEventListener('touchmove', gearTouchMove);
            area_county.addEventListener('touchmove', gearTouchMove);
            area_province.addEventListener('touchend', gearTouchEnd);
            area_city.addEventListener('touchend', gearTouchEnd);
            area_county.addEventListener('touchend', gearTouchEnd);
        }

        //初始化插件默认值
        function areaCtrlInit() {
            _self.gearArea.querySelector(".area_province").setAttribute("val", _self.value[0]);
            _self.gearArea.querySelector(".area_city").setAttribute("val", _self.value[1]);
            _self.gearArea.querySelector(".area_county").setAttribute("val", _self.value[2]);
            _self.setGearTooth(_self.data);
        }

        //触摸开始
        function gearTouchStart(e) {
            e.preventDefault();
            var target = e.target;
            while (true) {
                if (!target.classList.contains("gear")) {
                    target = target.parentElement;
                } else {
                    break
                }
            }
            clearInterval(target["int_" + target.id]);
            target["old_" + target.id] = e.targetTouches[0].screenY;
            target["o_t_" + target.id] = (new Date()).getTime();
            var top = target.getAttribute('top');
            if (top) {
                target["o_d_" + target.id] = parseFloat(top.replace(/em/g, ""));
            } else {
                target["o_d_" + target.id] = 0;
            }
            target.style.webkitTransitionDuration = target.style.transitionDuration = '0ms';
        }

        //手指移动
        function gearTouchMove(e) {
            e.preventDefault();
            var target = e.target;
            while (true) {
                if (!target.classList.contains("gear")) {
                    target = target.parentElement;
                } else {
                    break
                }
            }
            target["new_" + target.id] = e.targetTouches[0].screenY;
            target["n_t_" + target.id] = (new Date()).getTime();
            var f = (target["new_" + target.id] - target["old_" + target.id]) * 30 / window.innerHeight;
            target["pos_" + target.id] = target["o_d_" + target.id] + f;
            target.style["-webkit-transform"] = 'translate3d(0,' + target["pos_" + target.id] + 'em,0)';
            target.setAttribute('top', target["pos_" + target.id] + 'em');
            if (e.targetTouches[0].screenY < 1) {
                gearTouchEnd(e);
            }
        }

        //离开屏幕
        function gearTouchEnd(e) {
            e.preventDefault();
            var target = e.target;
            while (true) {
                if (!target.classList.contains("gear")) {
                    target = target.parentElement;
                } else {
                    break;
                }
            }
            var flag = (target["new_" + target.id] - target["old_" + target.id]) / (target["n_t_" + target.id] - target["o_t_" + target.id]);
            if (Math.abs(flag) <= 0.2) {
                target["spd_" + target.id] = (flag < 0 ? -0.08 : 0.08);
            } else {
                if (Math.abs(flag) <= 0.5) {
                    target["spd_" + target.id] = (flag < 0 ? -0.16 : 0.16);
                } else {
                    target["spd_" + target.id] = flag / 2;
                }
            }
            if (!target["pos_" + target.id]) {
                target["pos_" + target.id] = 0;
            }
            rollGear(target);
        }

        //缓动效果
        function rollGear(target) {
            var d = 0;
            var stopGear = false;

            function setDuration() {
                target.style.webkitTransitionDuration = target.style.transitionDuration = '200ms';
                stopGear = true;
            }

            clearInterval(target["int_" + target.id]);
            target["int_" + target.id] = setInterval(function () {
                var pos = target["pos_" + target.id];
                var speed = target["spd_" + target.id] * Math.exp(-0.03 * d);
                pos += speed;
                if (Math.abs(speed) > 0.1) {
                } else {
                    var b = Math.round(pos / 2) * 2;
                    pos = b;
                    setDuration();
                }
                if (pos > 0) {
                    pos = 0;
                    setDuration();
                }
                var minTop = -(target.dataset.len - 1) * 2;
                if (pos < minTop) {
                    pos = minTop;
                    setDuration();
                }
                if (stopGear) {
                    var gearVal = Math.abs(pos) / 2;
                    setGear(target, gearVal);
                    clearInterval(target["int_" + target.id]);
                }
                target["pos_" + target.id] = pos;
                target.style["-webkit-transform"] = 'translate3d(0,' + pos + 'em,0)';
                target.setAttribute('top', pos + 'em');
                d++;
            }, 30);
        }

        //控制插件滚动后停留的值
        function setGear(target, val) {
            val = Math.round(val);
            target.setAttribute("val", val);
            _self.setGearTooth(_self.data);
        }

        _self.getData(function () {
            _self.trigger.addEventListener('click', popupArea);
        });
    },
    //重置节点个数
    setGearTooth: function (data) {
        var _self = this;
        var item = data || [];
        var l = item.length;
        try {
            var gearChild = _self.gearArea.querySelectorAll(".gear");
            var gearVal = gearChild[_self.index].getAttribute('val');
            var maxVal = l - 1;
            if (gearVal > maxVal) {
                gearVal = maxVal;
            }
            gearChild[_self.index].setAttribute('data-len', l);
            if (l > 0) {
                var id = item[gearVal][this.keys['id']];
                var childData = item[gearVal].child;
                var itemStr = "";
                for (var i = 0; i < l; i++) {
                    itemStr += "<div class='tooth'  ref='" + item[i][this.keys['id']] + "'>" + item[i][this.keys['name']] + "</div>";
                }
                gearChild[_self.index].innerHTML = itemStr;
                gearChild[_self.index].style["-webkit-transform"] = 'translate3d(0,' + (-gearVal * 2) + 'em,0)';
                gearChild[_self.index].setAttribute('top', -gearVal * 2 + 'em');
                gearChild[_self.index].setAttribute('val', gearVal);
                _self.index++;
                if (_self.index > 2) {
                    _self.index = 0;
                    return;
                }
                _self.setGearTooth(childData);
            } else {
                gearChild[_self.index].innerHTML = "<div class='tooth'></div>";
                gearChild[_self.index].setAttribute('val', 0);
                if (_self.index == 1) {
                    gearChild[2].innerHTML = "<div class='tooth'></div>";
                    gearChild[2].setAttribute('val', 0);
                }
                _self.index = 0;
            }
        } catch (e) {

        }
    },
    finish: function (e) {
        var _self = this;
        var area_province = _self.gearArea.querySelector(".area_province");
        var area_city = _self.gearArea.querySelector(".area_city");
        var area_county = _self.gearArea.querySelector(".area_county");
        var provinceVal = parseInt(area_province.getAttribute("val"));
        var provinceText = area_province.childNodes[provinceVal].textContent;
        var provinceCode = area_province.childNodes[provinceVal].getAttribute('ref');
        var cityVal = parseInt(area_city.getAttribute("val"));
        var cityText = area_city.childNodes[cityVal].textContent;
        var cityCode = area_city.childNodes[cityVal].getAttribute('ref');
        var countyVal = parseInt(area_county.getAttribute("val"));
        var countyText = area_county.childNodes[countyVal].textContent;
        var countyCode = area_county.childNodes[countyVal].getAttribute('ref');
        _self.trigger.value = provinceText + ((cityText) ? ('' + cityText) : ('')) + ((countyText) ? ('' + countyText) : (''));
        _self.value = [provinceVal, cityVal, countyVal];
        if (this.valueTo) {
            if (_self.trigger == _self.valueTo) {
                this.valueTo.value = provinceText + ((cityText) ? ('' + cityText) : ('')) + ((countyText) ? ('' + countyText) : (''));
            } else {
                this.valueTo.value = provinceCode + ((cityCode) ? (',' + cityCode) : ('')) + ((countyCode) ? (',' + countyCode) : (''));
            }
        }
        _self.close(e);
    },
    close: function (e) {
        e.preventDefault();
        var _self = this;
        var evt = new CustomEvent('input');
        _self.trigger.dispatchEvent(evt);
        document.body.removeChild(_self.gearArea);
        _self.gearArea = null;
    }
};
export default AreaSelecter;