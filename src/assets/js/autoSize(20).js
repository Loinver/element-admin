/*
 * @description: 响应式布局JS
 * @author: 郑小芳
 * @update: 郑小芳 (2016-09-20)
 */
!(function(win, doc) {
	function setFontSize() {
		var winWidth = document.documentElement.clientWidth;
		doc.documentElement.style.fontSize = (winWidth / 640) * 20 + 'px'; //1rem=20px
	}
	var evt = 'onorientationchange' in win ? 'orientationchange' : 'resize';
	var timer = null;
	win.addEventListener(evt, function() {
		clearTimeout(timer);
		timer = setTimeout(setFontSize, 300);
	}, false);
	win.addEventListener("pageshow", function(e) {
		if(e.persisted) {
			clearTimeout(timer);
			timer = setTimeout(setFontSize, 300);
		}
	}, false);
	setFontSize();
}(window, document));