/**
 * Created by Linyer on 2017/6/23.
 */
const coder = new Function();
coder.prototype = {
    code: {
        a: 1,
        b: 2,
        c: 3,
        d: 4,
        e: 5,
        f: 6,
        g: 7,
        h: 8,
        i: 9,
        j: 11,
        k: 12,
        l: 13,
        m: 14,
        n: 15,
        o: 16,
        p: 17,
        q: 18,
        r: 19,
        s: 10,
        t: 21,
        u: 22,
        v: 23,
        w: 24,
        x: 25,
        y: 26,
        z: 27,
    },
    encode: function (Strings) {
        let data = this.code,
            test = Strings;
        let dataM = test.split("").map(function (e, i) {
            if (data[e]) {
                let ret = "(";
                for (let i = 0; i < data[e]; i++) {
                    ret += "1";
                }
                for (let i = 0; i < data[e]; i++) {
                    ret += "0";
                }
                ret += ")";
                return ret;
            }
            if (!isNaN(parseInt(e))) {
                let rets = "[";
                for (let i = 0; i < parseInt(e); i++) {
                    rets += "1";
                }
                ;
                for (let i = 0; i < parseInt(e); i++) {
                    rets += "0";
                }
                rets += "]";
                return rets;
            }
            return e;
        });
        let newData = "";
        dataM.forEach(function (e) {
            newData += e;
        });
        let newDataE = encodeURI(newData).split("").map(function (e) {
            if (!isNaN(parseInt(e))) {
                if (parseInt(e) == 1) {
                    return "有";
                } else if (parseInt(e) == 0) {
                    return "没";
                } else {
                    return e;
                }
                ;
            } else {
                return e;
            }
        });
        let newDataS = "";
        newDataE.forEach(function (e) {
            newDataS += e;
        });
        return encodeURI(newDataS);
    },
    decode: function (Strings) {
        let data = this.code;
        let dataD = decodeURI(Strings).split("").map(function (e) {
            if (e == "有") {
                return "1";
            } else if (e == "没") {
                return "0";
            }
            return e;
        });
        let newDataE = "";
        dataD.forEach(function (e) {
            newDataE += e;
        });
        let newDataES = decodeURI(newDataE).match(/\(+.+?\)|\[+.+?\]|./img);
        let dataJ = newDataES.map(function (e) {
            if (e.match(/\(+.+?\)/img)) {
                let index = e.replace(/[^1]/img, "").length;
                let indexKey = null;
                for (let i in data) {
                    if (data[i] == index) {
                        indexKey = i;
                        break;
                    }
                }
                return indexKey;
            } else if (e.match(/\[+.+?\]/img)) {
                let index = e.replace(/[^1]/img, "").length;
                return index;
            } else
                return e;
        });
        let newDataJ = "";
        dataJ.forEach(function (e) {
            newDataJ += e;
        });
        return newDataJ;
    }
};
export default coder;