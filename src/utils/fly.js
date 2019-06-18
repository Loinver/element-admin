import axios from "axios";

/**
 * axios数据请求
 * 请求拦截
 * @author：Dll
 */
axios.interceptors.request.use(
  config =>
  config,
  error =>
  Promise.reject(error)
);
/**
 * 响应拦截
 * @author Dll
 */
axios.interceptors.response.use(
  response =>
  response,
  error =>
  Promise.reject(error)
);

axios.defaults.retry = 4;
axios.defaults.retryDelay = 1000;

axios.interceptors.response.use(undefined, (err) => {
  const config = err.config;
  // If config does not exist or the retry option is not set, reject
  if (!config || !config.retry) return Promise.reject(err);

  // Set the variable for keeping track of the retry count
  config.__retryCount = config.__retryCount || 0;

  // Check if we've maxed out the total number of retries
  if (config.__retryCount >= config.retry) {
    // Reject with the error
    return Promise.reject(err);
  }

  // Increase the retry count
  config.__retryCount += 1;

  // Create new promise to handle exponential backoff
  const backoff = new Promise(((resolve) => {
    setTimeout(() => {
      resolve();
    }, config.retryDelay || 1);
  }));

  // Return the promise in which recalls axios to retry the request
  return backoff.then(() => axios(config));
});
const fly = {
  /**
   * 生成随机数
   * @param min
   * @param max
   * @returns {*}
   */
  createRandom: function (min, max) {
    return min + Math.round(Math.random() * (max - min))
  },
  /**
   * 根据环境生成变量
   * @author Dll
   */
  // 接口地址
  baseUrl: process.env.VUE_APP_CURRENTMODE === 'prod' ? 'http://activity.v4.kxdpm.com/' :
    'http://dpm.kxpic.cn/',
  /**
   * 封装axios请求
   */
  $axios: {
    /**
     * 检查请求的状态码 是否请求成功
     * @param response
     * @returns {{status: number, Message: string}}
     * @author：Dll
     */
    checkStatus(response) {
      // loading
      // 如果http状态码正常，则直接返回数据
      if (response && (response.status === 200 || response.status === 304 || response.status ===
          400 || response.status === 204)) {
        return response.data;
        // 如果不需要除了data之外的数据，可以直接 return response.data
      }
      // 异常状态下，把错误信息返回去
      return {
        status: 404,
        Message: '网络异常，请稍候重试'
      };
    },
    /**
     * 根据接口返回的ResultType来返回相应的结果
     * @author：Dll
     */
    checkCode(res) {
      if (res) {
        switch (res.ResultType) {
          case 1:
            break;
          case 3:
            console.log(res.Message);
            break;
          default:
            console.log(res.Message);
        }
      }
      return res;
    },
    /**
     * post方法 支持自定义config
     * @param url
     * @param data
     * @param config
     * @returns {Promise.<TResult>}
     * @author Dll
     */
    post(url, data, config) {
      return axios({
        method: 'post',
        baseURL: fly.baseUrl,
        url,
        ...config,
        data,
        timeout: 30000
      }).then(response =>
        fly.$axios.checkStatus(response)
      ).then(res =>
        fly.$axios.checkCode(res)
      );
    },
    /**
     * get方法
     * @param url
     * @param params
     * @returns {Promise.<TResult>}
     * @author Dll
     */
    get(url, params) {
      return axios({
        method: 'get',
        baseURL: fly.baseUrl,
        url,
        params, // get 请求时带的参数
        timeout: 30000,
      }).then(response =>
        fly.$axios.checkStatus(response)
      ).then(res =>
        fly.$axios.checkCode(res)
      );
    },
  },
  /**
   * @description 检测字符串
   * @param str 待处理字符串
   * @param type 待检测的类型
   */
  checkType(str, type) {
    switch (type) {
      case 'email':
        return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
      case 'mobile':
        return /^1[3|4|5|7|8][0-9]{9}$/.test(str);
      case 'tel':
        return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);
      case 'number':
        return /^[0-9]$/.test(str);
      case 'english':
        return /^[a-zA-Z]+$/.test(str);
      case 'text':
        return /^\w+$/.test(str);
      case 'chinese':
        return /^[\u4E00-\u9FA5]+$/.test(str);
      case 'lower':
        return /^[a-z]+$/.test(str);
      case 'upper':
        return /^[A-Z]+$/.test(str);
      default:
        return true;
    }
  },
  getQueryString: (name) => {
    const url = window.location.href;
    const arr = url.split('?');
    for (let i = 0; i < arr.length; i++) {
      if (fly.getStrParam(arr[i], name)) {
        return fly.getStrParam(arr[i], name);
      }
    }
    return null;
  },
  getStrParam: (str, name) => {
    /**
     * 获取字符串中参数
     */
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    let r = str.substr(0).match(reg);
    if (r !== null) return decodeURI(r[2]);
    return null;
  },
  strTrim: (str, isG) => {
    /**
     * 清除字符串中空格
     * params is_global == 'g' 则字符串内的空格都清除掉
     */
    let result = str.replace(/(^\s+)|(\s+$)/g, '');
    if (isG.toLowerCase() === 'g') {
      result = result.replace(/\s/g, '');
    }
    return result;
  },
  setCookie: (name, value) => {
    const Days = 30;
    const exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${escape(value)};expires=${exp.toGMTString()}`;
  },
  /**
   * 读取cookie
   * @param name
   * @returns {null}
   * @author Dll
   */
  getCookie: (name) => {
    let arr;
    const reg = new RegExp(`(^| )${name}=([^;]*)(;|$)`);
    if (arr = document.cookie.match(reg)) {
      return unescape(arr[2]);
    }
    return null;
  },
  /**
   * 删除cookies
   * @author Dll
   */
  delCookie: (name) => {
    const exp = new Date();
    exp.setTime(exp.getTime() - 1);
    const val = fly.getCookie(name);
    if (val !== null) {
      document.cookie = `${name}=${val};expires=${exp.toGMTString()}`;
    }
  },
  /**
   * 获取时间戳  秒级
   */
  getTimer: () => parseInt((new Date()).getTime() / 1000),
  formatTime: (s) => {
    /**
     * 格式化时间戳 秒级
     */
    let dt = new Date(s * 1000);
    return [
      [dt.getFullYear(), dt.getMonth() + 1, dt.getDate()].join('-'), [dt.getHours(), dt
        .getMinutes(), dt.getSeconds()
      ].join(':')
    ].join(' ').replace(/(?=\b\d\b)/g, '0');
  },
  /**
   * 获取本地存储
   * @param key
   * @param data
   * @param expires
   * @returns {*}
   * @author Dll
   */
  localStore: (key, data, expires) => {
    /**
     * 基于本地存储的缓存模块
     *
     * @param {String} key 键名
     * @param {any} data 数据
     * @param {Number} expires 有效期(秒), 0永久
     * @returns {any}
     *
     * 使用例子：
     * localStore('aaa', { a: 1 }); //  永久存储
     * localStore('bbb', { b: 2 }, 3); //  存储3秒
     *
     * setTimeout(function() {
     *     console.log(localStore('aaa'), localStore('bbb')); //  {a: 1} {b: 2}
     * }, 1000);
     *
     * setTimeout(function() {
     *     console.log(localStore('aaa'), localStore('bbb')); //  {a: 1} undefined
     * }, 4000);
     */
    const localStorage = window.localStorage;
    //  不兼容返回空
    if (!localStorage) {
      return undefined;
    }
    const now = +new Date(); //  当前时间戳
    //  有值则存储数据
    if (data) {
      const storeData = {
        data,
        expires: 0 //  有效期
      };
      if (expires) {
        storeData.expires = now + (expires * 1000); //  到期时间戳
      }
      //  无法存入情况
      try {
        return localStorage.setItem(key, JSON.stringify(storeData));
      } catch (er) {
        //  不做处理统一返回
      }
    } else {
      //  获取数据
      try {
        const storeData = JSON.parse(localStorage.getItem(key));
        if (storeData.expires === 0 || now <= storeData.expires) {
          return storeData.data;
        }
        return localStorage.removeItem(key); //  清理过期数据
      } catch (er) {
        //  不做处理统一返回
      }
    }
    return undefined;
  }
};
/**
 * 数组排序
 * @param {name} name
 * arr.sort(arr.sortBy('age'))
 * @author Dll
 */
Array.prototype.sortBy = prop => (a, b) => {
  let val1 = a[prop];
  let val2 = b[prop];
  if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
    val1 = Number(val1);
    val2 = Number(val2);
  }
  if (val1 < val2) {
    return -1;
  } else if (val1 > val2) {
    return 1;
  }
  return 0;
};

/**
 *删除数组指定下标或指定对象
 * @author Dll
 */
Array.prototype.remove = function (obj) {
  for (let i = 0; i < this.length; i++) {
    let temp = this[i];
    if (!isNaN(obj)) {
      temp = i;
    }
    if (temp === obj) {
      for (let j = i; j < this.length; j++) {
        this[j] = this[j + 1];
      }
      this.length = this.length - 1;
    }
  }
};
/**
 * 是否是汉字
 * @author Dll
 */
String.prototype.isChinese = function () {
  const reg = /^[\u0391-\uFFE5]+$/;
  //       [\u4E00-\u9FA5];
  return reg.test(this);
};
/**
 * 对普通数组排序
 * @author Dll
 */
Array.prototype.sorting = function () {
  return this.sort((a, b) => a - b);
};
/**
 * 是否是有效的身份证(中国)
 * @author Dll
 */
String.prototype.isIDCard = function () {
  let iSum = 0;
  let sId = this;
  const aCity = {
    11: '北京',
    12: '天津',
    13: '河北',
    14: '山西',
    15: '内蒙古',
    21: '辽宁',
    22: '吉林',
    23: '黑龙江',
    31: '上海',
    32: '江苏',
    33: '浙江',
    34: '安徽',
    35: '福建',
    36: '江西',
    37: '山东',
    41: '河南',
    42: '湖北',
    43: '湖南',
    44: '广东',
    45: '广西',
    46: '海南',
    50: '重庆',
    51: '四川',
    52: '贵州',
    53: '云南',
    54: '西藏',
    61: '陕西',
    62: '甘肃',
    63: '青海',
    64: '宁夏',
    65: '新疆',
    71: '台湾',
    81: '香港',
    82: '澳门',
    91: '国外'
  };
  if (!/^\d{17}(\d|x)$/i.test(sId)) {
    return false;
  }
  sId = sId.replace(/x$/i, 'a');
  // 非法地区
  if (aCity[parseInt(sId.substr(0, 2), 10)] === null) {
    return false;
  }
  const sBirthday =
    `${sId.substr(6, 4)}-${Number(sId.substr(10, 2))}-${Number(sId.substr(12, 2))}`;
  const d = new Date(sBirthday.replace(/-/g, '/'));
  // 非法生日
  if (sBirthday !== (`${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`)) {
    return false;
  }
  for (let i = 17; i >= 0; i--) {
    iSum += ((2 ** i) % 11) * parseInt(sId.charAt(17 - i), 11);
  }
  return iSum % 11 !== 1;
};
export default fly;
