const Base64 = function Base64() {
	let _keyStr;
	let _utf8_encode;
	let _utf8_decode;
	_keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", this.encode = function (r) {
		let e, t, a, h, c, n, o, f = "", i = 0;
		for (r = _utf8_encode(r); i < r.length;)e = r.charCodeAt(i++), t = r.charCodeAt(i++), a = r.charCodeAt(i++), h = e >> 2, c = (3 & e) << 4 | t >> 4, n = (15 & t) << 2 | a >> 6, o = 63 & a, isNaN(t) ? n = o = 64 : isNaN(a) && (o = 64), f = f + _keyStr.charAt(h) + _keyStr.charAt(c) + _keyStr.charAt(n) + _keyStr.charAt(o);
		return f
	}, this.decode = function (r) {
		let e, t, a, h, c, n, o, f = "", i = 0;
		for (r = r.replace(/[^A-Za-z0-9\+\/\=]/g, ""); i < r.length;)h = _keyStr.indexOf(r.charAt(i++)), c = _keyStr.indexOf(r.charAt(i++)), n = _keyStr.indexOf(r.charAt(i++)), o = _keyStr.indexOf(r.charAt(i++)), e = h << 2 | c >> 4, t = (15 & c) << 4 | n >> 2, a = (3 & n) << 6 | o, f += String.fromCharCode(e), 64 != n && (f += String.fromCharCode(t)), 64 != o && (f += String.fromCharCode(a));
		return f = _utf8_decode(f)
	}, _utf8_encode = function (r) {
		let e, t;
		r = r.replace(/\r\n/g, "\n");
		for (e = "", t = 0; t < r.length; t++) {
			let a = r.charCodeAt(t);
			128 > a ? e += String.fromCharCode(a) : a > 127 && 2048 > a ? (e += String.fromCharCode(192 | a >> 6), e += String.fromCharCode(128 | 63 & a)) : (e += String.fromCharCode(224 | a >> 12), e += String.fromCharCode(128 | 63 & a >> 6), e += String.fromCharCode(128 | 63 & a))
		}
		return e
	}, _utf8_decode = function (r) {
		let e, a, c1, c2, t, c3;
		for (e = "", t = 0, a = c1 = c2 = 0; t < r.length;)a = r.charCodeAt(t), 128 > a ? (e += String.fromCharCode(a), t++) : a > 191 && 224 > a ? (c2 = r.charCodeAt(t + 1), e += String.fromCharCode((31 & a) << 6 | 63 & c2), t += 2) : (c2 = r.charCodeAt(t + 1), c3 = r.charCodeAt(t + 2), e += String.fromCharCode((15 & a) << 12 | (63 & c2) << 6 | 63 & c3), t += 3);
		return e
	}
};
export default Base64;