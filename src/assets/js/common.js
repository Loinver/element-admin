var fly = {
	parseJson: function(obj) {
		/**
		 * 转化json
		 */
		return JSON.stringify(obj);
	},
	formatTime: function(s) {
		/**
		 * 格式化时间戳 秒级
		 */
		var dt = new Date(s * 1000);
		var date = [
			[dt.getFullYear(), dt.getMonth() + 1, dt.getDate()].join('-'), [dt.getHours(), dt.getMinutes(), dt.getSeconds()].join(':')
		].join(' ').replace(/(?=\b\d\b)/g, '0');
		return date;
	},
	getNowDate: function() {
		/**
		 * 获取当前时间
		 */
		var now = new Date();
		return now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate() + " " + now.getHours() + "-" + now.getMinutes() + "-" + now.getSeconds();
	},
	countDown: function(start) {
		/**
		 * 计算时间差   xx天xx小时xx分xx秒
		 */
		var startTime = new Date(start);
		var diff = startTime - (new Date());
		var result;
		if(diff >= 0) {
			var ss = parseInt(diff / 1000); // 秒
			var mm = 0; // 分
			var hh = 0; // 小时
			var dd = 0; //天
			if(ss > 60) {
				mm = parseInt(ss / 60);
				ss = parseInt(ss % 60);
				if(mm > 60) {
					hh = parseInt(mm / 60);
					mm = parseInt(mm % 60);
					if(hh > 24) {
						dd = parseInt(hh / 24);
						hh = parseInt(hh % 24);
					}
				}
			}
			var result = "" + parseInt(ss) + "秒";
			if(mm > 0) {
				result = "" + parseInt(mm) + "分" + result;
			}
			if(hh > 0) {
				result = "" + parseInt(hh) + "小时" + result;
			}
			if(dd > 0) {
				result = "" + parseInt(dd) + "天" + result;
			}
		} else {
			result = 0;
		}
		return result;
	},
	timeDiff: function(olddate) {
		/**
		 *	时间差
		 */
		var old = new Date(olddate);
		var dateNum = (new Date()) - old;
		var day = dateNum / 1000 / 60 / 60 / 24;
		return Math.floor(days);
	},
	getTimer: function() {
		/**
		 * 获取时间戳  秒级
		 */
		return parseInt((new Date()).getTime() / 1000);
	},
	formatDay: function(day) {
		/**
		 * 格式化0000-00-00格式的时间
		 */
		var arr = day.split("-");
		return arr[0] + "年" + arr[1] + "月" + arr[2] + "日";
	},
	format_Day: function(day) {
		/**
		 * 格式化yyyy年MM月dd日格式的时间
		 */
		return day.match(/\d+/g).join('-');
	},
	formatDate: function(day) {
		/**
		 * 格式化yyyy年MM月dd日格式的时间
		 */
		var dt = new Date(day);
		//var date = [[dt.getFullYear(), dt.getMonth() + 1, dt.getDate()].join('-'), [dt.getHours(), dt.getMinutes(), dt.getSeconds()].join(':')].join(' ').replace(/(?=\b\d\b)/g, '0'); // 正则补零 (略微改动)
		dt.setMinutes(dt.getMinutes() - dt.getTimezoneOffset()); // 修正时区偏移
		var date = dt.toISOString().slice(0, -5).replace(/[T]/g, ' ');
		return date;
	},
	isDate: function(datastr) {
		/**
		 * 判断是否是时间格式
		 */
		var result = datestr.match(/((^((1[8-9]\d{2})|([2-9]\d{3}))(-)(10|12|0?[13578])(-)(3[01]|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))(-)(11|0?[469])(-)(30|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))(-)(0?2)(-)(2[0-8]|1[0-9]|0?[1-9])$)|(^([2468][048]00)(-)(0?2)(-)(29)$)|(^([3579][26]00)(-)(0?2)(-)(29)$)|(^([1][89][0][48])(-)(0?2)(-)(29)$)|(^([2-9][0-9][0][48])(-)(0?2)(-)(29)$)|(^([1][89][2468][048])(-)(0?2)(-)(29)$)|(^([2-9][0-9][2468][048])(-)(0?2)(-)(29)$)|(^([1][89][13579][26])(-)(0?2)(-)(29)$)|(^([2-9][0-9][13579][26])(-)(0?2)(-)(29)$))/);
		if(result == null) {
			return false;
		}
		return true;
	},
	isEmpty: function(str) {
		/**
		 * 判断是否为空
		 */
		if(str == null || typeof str == "undefined" || str.trim() == "") {
			return true;
		} else {
			return false;
		}
	},
	splitStr: function(str, len) {
		/**
		 * 截取字符串
		 */
		var temp;
		var icount = 0;
		var patrn = /[^\x00-\xff]/;
		var strre = "";
		for(var i = 0; i < str.length; i++) {
			if(icount < len - 1) {
				temp = str.substr(i, 1);
				if(patrn.exec(temp) == null) {
					icount = icount + 1;
				} else {
					icount = icount + 2;
				}
				strre += temp;
			} else {
				break
			}
		}
		return strre + "...";
	},
	getHost: function(url) {
		/**
		 * 获取域名
		 * @param {Object} url
		 */
		var host = "null";
		if(typeof url == "undefined" || null == url) {
			url = window.location.href;
		}
		var regex = /^\w+\:\/\/([^\/]*).*/;
		var match = url.match(regex);
		if(typeof match != "undefined" && null != match) {
			host = match[1];
		}
		return host;
	},
	getUrlStr: function(name) {
		/*
		 * 获取地址栏参数
		 */
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if(r != null) return unescape(r[2]);
		return null;
	},
	strTrim: function(str, is_global) {
		var result;
		result = str.replace(/(^\s+)|(\s+$)/g, "");
		if(is_global.toLowerCase() == "g")
			result = result.replace(/\s/g, "");
		return result;
	},
	getCookie: function(name) {
		/*
		 *--------------- getCookie(name) -----------------
		 * getCookie(name)
		 * 功能:取得变量name的值
		 * 参数:name,字符串.
		 * 实例:alert(getCookie("baobao"));
		 *--------------- getCookie(name) -----------------
		 */
		var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
		if(arr != null) return unescape(arr[2]);
		return null;
	},
	setCookie: function(name, value, url) {
		/*
		 *--------------- setCookie(name,value) -----------------
		 * setCookie(name,value)
		 * 功能:设置得变量name的值
		 * 参数:name,字符串;value,字符串.
		 * 实例:setCookie('username','baobao')
		 *--------------- setCookie(name,value) -----------------
		 */
		var Days = 7; //此 cookie 将被保存 7 天
		var exp　 = new Date();
		exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
		document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
		location.href = url; //接收页面.
	}
}
/**
 * 数组排序
 * @param {name} name
 * arr.sort(sortBy('name'))
 */
const sortBy = function sortBy(prop) {
	return function(a, b) {
		var val1 = a[prop];
		var val2 = b[prop];
		if(!isNaN(Number(val1)) && !isNaN(Number(val2))) {
			val1 = Number(val1);
			val2 = Number(val2);
		}
		if(val1 < val2) {
			return -1;
		} else if(val1 > val2) {
			return 1;
		} else {
			return 0;
		}
	}
};
/*
 * 是否是汉字
 */
String.prototype.isChinese = function() {
	var reg = /^[\u0391-\uFFE5]+$/;
	//      [\u4E00-\u9FA5];   
	return reg.test(this);
};
/**
 * 是否是手机号码
 */
String.prototype.isMobile = function() {
	var reg = /^(13|14|15|18|17)[0-9]{9}$/;
	return reg.test(this);
};
/**
 * 对普通数组排序
 */
Array.prototype.sorting = function() {
	return this.sort(function(a, b) {
		return a - b;
	});
};
export default fly;