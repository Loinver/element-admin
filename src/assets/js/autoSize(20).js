!(function(win, doc) {
	function setFontSize() {
		var winWidth = document.documentElement.clientWidth;
		doc.documentElement.style.fontSize = (winWidth / 640) * 20 + 'px'; //1rem=20px
	}
	var evt = 'onorientationchange' in win ? 'orientationchange' : 'resize';
	var timer = null;
	win.addEventListener(evt, function() {
		clearTimeout(timer);
		timer = setTimeout(setFontSize, 100);
	}, false);
	win.addEventListener("pageshow", function(e) {
		if(e.persisted) {
			clearTimeout(timer);
			timer = setTimeout(setFontSize, 100);
		}
	}, false);
	setFontSize();
}(window, document));