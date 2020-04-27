---
title: 函数封装(收藏)
date: 2019-12-18
update_date: 2019-12-18
tags:
  - Js
category: 前端
---

### 获取元素属性

```js
/**
 * currentStyle属性和getComputedStyle属性不能设置属性,只能获取
 * currentStyle:该属性只兼容IE,不兼容火狐和谷歌
 * 写法:ele.currentStyle['attr']或者ele.currentStyle.attr;
 * getComputedStyle:该属性是兼容火狐谷歌,不兼容IE
 * 写法:window.getComputedStyle(ele,null)[attr]或者是window.getComputedStyle(ele,null).attr
 * @param {Object} el 获取计算样式的Element
 * @param {String} prop css 属性名, 如: width
 * @param {String} pseudoElt 指定一个要匹配的伪元素的字符串, 必须对普通元素省略(或null)
 */
export const getTheStyle = (el, prop, pseudoElt = null) => {
  // 返回当前 document 对象所关联的 window 对象, 没有则返回null; 或者el.currentStyle校验
  const win = document.defaultView;
  if (win && win.getComputedStyle) {
    return win.getComputedStyle(el, pseudoElt)[prop];
  } else {
    return el.currentStyle[prop]; // IE
  }
};
```

### 遍历

```js
/**
 * 遍历
 * @param {Array} arr 数组
 * @param {Function} fn 回调函数
 */
export const forEach = (arr, fn) => {
  if (!arr.length || !fn) return;
  let i = -1;
  let len = arr.length;
  while (++i < len) {
    let item = arr[i];
    fn(item, i, arr);
  }
};
```

### 把一维数组转成二维数组

```js
/**
 * 把一维数组转成二维数组(比如日历的天数转成, 按一行7天切割)
 * @param {Array} arr 一维数组数据
 * @param {Number} num 每行显示数量
 */
export const oneToTwoInArray = (arr, num = 7) => {
  if (!arr) return;
  const len = arr.length;
  // 超出一行 num 增加行数
  let lineNum = len % num === 0 ? len / num : Math.floor(len / num + 1);
  let res = [];
  for (let i = 0; i < lineNum; i++) {
    // (0 * 7, 0 * 7 + 7) (1 * 7, 1 * 7 + 7)
    res.push(arr.slice(i * num, i * num + num));
  }
  return res;
};
```

### 对象数组转二维数组

```js
/**
 * 对象数组转二维数组
 * @param objArr
 */
function obj2Arr(objArr) {
  objArr.length > 0 &&
    objArr.map(item => {
      return Object.values(item);
    });
}
/**
 * 找出对象数组中某属性的最大值
 * @param array
 * @param item
 * @returns val
 */
function maxItemInObjArr(array, item) {
  let max = Math.max.apply(
    Math,
    array.map(function(obj) {
      return obj[item];
    })
  );
  return max;
}
```

### 判断要查询的数组是否至少有一个元素包含在目标数组中

```js
/**
 * @param {Array} target 目标数组
 * @param {Array} arr 需要查询的数组
 * @description 判断要查询的数组是否至少有一个元素包含在目标数组中
 */
export const hasOneOf = (targetarr, arr) => {
  return targetarr.some(_ => arr.indexOf(_) > -1);
};
```

### 验证的字符串或数值

```js
const Utils = {};
/**
 * @param {String|Number} value 要验证的字符串或数值
 * @param {*} validList 用来验证的列表
 */
Utils.oneOf = (value, validList) => {
  for (let i = 0; i < validList.length; i++) {
    if (value === validList[i]) {
      return true;
    }
  }
  return false;
};
```

### 如果要检索的字符串值没有出现

```js
// 如果要检索的字符串值没有出现, 则该方法返回-1
export const isInclude = (item, str) => {
  return item.indexOf(str) !== -1;
};
```

### 查找目标元素

```js
/**
 * 查找目标元素, 存在返回下标, 不存在返回-1
 * @param {Array} arr 数组元素
 * @param {String, Number} elem
 */
export const isHave = (arr, elem) => {
  return arr.findIndex(item => item === elem);
};
```

### 格式化时间

```js
/**
 * 格式化时间
 * @param {Number/empty} timestamp 时间
 * @param {String} joiner 连接符
 */
export const FormatDate = (timestamp, joiner = "-") => {
  const strTime = new Date(timestamp);
  const y = strTime.getFullYear();
  const m = strTime.getMonth() + 1;
  const d = strTime.getDate();
  return `${y}${joiner}${zero(m)}${joiner}${zero(d)}`;
};
/**
 * 格式化时间/获取时间
 * @param {Number/empty} timestamp 时间
 * @param {String} sign 连接符
 * @return {Object|String}
 */
export const DateFormat = (timestamp = "", sign = "") => {
  const strTime = timestamp ? new Date(timestamp) : new Date();
  const year = strTime.getFullYear();
  const month = zero(strTime.getMonth() + 1);
  const date = zero(strTime.getDate());
  const hours = zero(strTime.getHours());
  const minutes = zero(strTime.getMinutes());
  const seconds = zero(strTime.getSeconds());
  if (sign) {
    return `${year}${sign}${month}${sign}${date} ${hours}:${minutes}:${seconds}`;
  } else {
    return { year, month, date, hours, minutes, seconds };
  }
};
/**
 * 时分转成时间戳
 * 得到当前的年月日秒, 然后组合传进来的时分, 转成时间戳存入数据库, Date.parse只精确到秒,毫秒会用0补
 * @param {String} time 时分
 */
export const timeFormat = time => {
  if (!time) return;
  let arrTime = time.split(":");
  let dateTime = new Date();
  let year = dateTime.getFullYear();
  let month = dateTime.getMonth() + 1;
  let date = dateTime.getDate();
  let hours = arrTime[0];
  let minutes = arrTime[1];
  let seconds = dateTime.getSeconds();
  let strTime = `${year}/${month}/${date}/ ${hours}:${minutes}:${seconds}`;
  return Date.parse(strTime);
};
// 补零
export const zero = date => {
  return date < 10 ? `0${date}` : date;
};
```

### 获取时间戳

```js
/**
 * 获取时间戳, 如今天,昨天
 * @param {String} param 天数60 * 60 * 24 * 1000
 * @param {Boolean} isSecond 是否转成秒时间戳
 */
export const getAssignrTime = (param = 0, isSecond = true) => {
  if (isSecond) return Math.floor((new Date().getTime() - param) / 1000);
  else return new Date().getTime() - param;
};
```

### 格式化日期

```js
/**
 * 格式化日期, 因为IE浏览器用toLocaleDateString()这个获取日期是2019年10月30日, 其它主流浏览器是2019/10/30或2019-10-30
 * IE下就会获取时间不对, 故需要另行处理
 * @param {String} localeDate 日期年月日
 * @param {String} bridge 连接符
 */
export const timeFormat = (localeDate, bridge = "/") => {
  let strTime = "";
  for (let i = 0; i < localeDate.length; i++) {
    let code = localeDate.charCodeAt(i);
    if (code > 47 && code <= 57) {
      strTime += localeDate.charAt(i);
    }
    if (code === 47 || code === 24180 || code === 26376 || code === 26085) {
      strTime += bridge;
    }
  }
  return strTime.substring(0, 10);
};
// 示列:
export const GetStartAndEndDate = (
  end = 24 * 60 * 60 * 1000 - 1,
  start = ""
) => {
  let startTime = new Date(
    new Date(timeFormat(new Date().toLocaleDateString())).getTime()
  ); // 当前日期0点0分0秒
  let endTime = new Date(
    new Date(timeFormat(new Date().toLocaleDateString())).getTime() + end
  ); // 当前时间的23时23分59
  return { startTime, endTime };
};
/**
 * 获取当天的开始和结束时间
 */
export const getStartAndEndTime = () => {
  let start = new Date(
    new Date(timeFormat(new Date().toLocaleDateString())).getTime()
  ); // 当前日期0点0分0秒
  let end = new Date(
    new Date(timeFormat(new Date().toLocaleDateString())).getTime() +
      24 * 60 * 60 * 1000 -
      1
  ); // 当前时间的23时59分59秒
  let startTime = parseInt(
    new Date(start).getTime(new Date(start)).toString() / 1000
  );
  let endTime = parseInt(
    new Date(end).getTime(new Date(end)).toString() / 1000
  );
  return { startTime, endTime };
};
```

### 本地存储

```js
/**
 * 本地存储
 * @param {String} key 键
 * @param {any} value 值
 */
export const setStore = (key, value) => {
  if (!key || typeof key !== "string") return;
  if (typeof value !== "string") {
    value = JSON.stringify(value);
  }
  window.sessionStorage.setItem(key, value);
};

/**
 * 获取
 * @param {String} key 键
 */
export const getStore = key => {
  if (!key || typeof key !== "string") return;
  let val = window.sessionStorage.getItem(key);
  return val && JSON.parse(val);
};

/**
 * 清空
 * @param {String} key 键
 */
export const clearStore = key => {
  if (!key || typeof key !== "string") return;
  window.sessionStorage.setItem(key, "");
};

/**
 * 删除
 * @param {String} key 键
 */
export const removeStore = key => {
  if (!key) return;
  if (isArray(key) && key.length !== 0) {
    forEach(key, res => {
      window.sessionStorage.removeItem(res);
    });
  }
  if (typeof key === "string") {
    window.sessionStorage.removeItem(key);
  }
};
```

::: tips

- localStorage 永久缓存, 除非手动清除
- sessionStorage 短期缓存, 浏览器关闭后自动清除
  :::

### 判断是否是数组

```js
/**
 * 判断是否是数组
 * @param {Object} arr
 */
export const isArray = arr => {
  if (!Array.isArray) {
    Array.isArray = function(arr) {
      return Object.prototype.toString.call(arr) === "[object Array]";
    };
  } else {
    return Array.isArray(arr);
  }
};
```

### 生成随机字符串

```js
/**
 * 生成随机字符串(可指定长度)
 * @param len
 * @returns {string}
 */
export const randomString = len => {
  len = len || 8;
  let $chars = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678";
  /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
  let maxPos = $chars.length;
  let pwd = "";
  for (let i = 0; i < len; i++) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd;
};

/**
 * randomWord 产生任意长度随机字母数字组合
 * @param randomFlag 是否任意长度 min-任意长度最小位[固定位数] max-任意长度最大位
 * @param min
 * @param max
 * @returns {string}
 * 调用方法:
 * 生成 3 - 32 位随即字符串
 * randomWord(true,3,32);  例如: olyOXUF5oDsuMmXl3Mi48
 * 生成 32 位随机字符串
 * randomWord(false,32);   例如: fjpnWj29Bb8boiXbLeDF0nxkR4aYcLRl
 */
export const randomWord = (randomFlag, min, max) => {
  let str = "",
    range = min,
    arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  // 随机产生
  if (randomFlag) {
    range = Math.round(Math.random() * (max - min)) + min;
  }
  for (let i = 0; i < range; i++) {
    let pos = Math.round(Math.random() * (arr.length - 1));
    str += arr[pos];
  }
  return str;
};

/**
 * 生成随机颜色值
 */
export const getRandomColor = () => {
  const rgb = [];
  for (let i = 0; i < 3; ++i) {
    let color = Math.floor(Math.random() * 256).toString(16);
    color = color.length === 1 ? "0" + color : color;
    rgb.push(color);
  }
  return "#" + rgb.join("");
};
```

### 获取字符串字节长度

```js
/**
 * 获取字符串字节长度
 * @param {String}
 * @returns {Boolean}
 */
export const checkLength = v => {
  let realLength = 0;
  let len = v.length;
  for (let i = 0; i < len; i++) {
    let charCode = v.charCodeAt(i);
    if (charCode >= 0 && charCode <= 128) realLength += 1;
    else realLength += 2;
  }
  return realLength;
};
```

### 验证身份证号

```js
/**
 * 验证身份证号
 * @param el 号码输入input
 * @returns {boolean}
 */
export const checkCardNo = el => {
  let txtval = el.value;
  let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  return reg.test(txtval);
};
```

### cookies

```js
/**
 * 写cookies
 */
export const setCookie = (name, value, time) => {
  let strsec = getsec(time);
  let exp = new Date();
  exp.setTime(exp.getTime() + strsec * 1 // 30 * 24 * 60 * 60 * 1000);
  document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
};

/**
 * 读取cookies
 */
export const getCookie = (name) => {
  let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg)) return unescape(arr[2]);
  else return null;
};

/**
 * 删除cookies
 */
export const delCookie = (name) => {
  let exp = new Date();
  exp.setTime(exp.getTime() - 1);
  let cval = getCookie(name);
  if (cval != null) document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
};

```

### 生成 UUID

```js
/**
 * 生成UUID
 * @returns {string}
 */
export const generateUUID = () => {
  let d = new Date().getTime();
  let uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(
    c
  ) {
    let r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === "x" ? r : (r & 0x7) | 0x8).toString(16);
  });
  return uuid;
};
```

### 删除空格

```js
/**
 * 删除左右两端的空格
 * @param str
 * @returns {string | * | void}
 */
function trim(str) {
  return str.replace(/(^\s*)|(\s*$)/g, "");
}

/**
 * 删除左边的空格
 * @param str
 * @returns {string | * | void}
 */
function ltrim(str) {
  return str.replace(/(^\s*)/g, "");
}

/**
 * 删除右边的空格
 * @param str
 * @returns {string | * | void}
 */
function rtrim(str) {
  return str.replace(/(\s*$)/g, "");
}
```

### 判断当前网络环境

```js
/**
 * 判断当前网络环境
 */
export const isWifi = () => {
  try {
    let wifi = true;
    let ua = window.navigator.userAgent;
    let con = window.navigator.connection;
    // 如果是微信
    if (/MicroMessenger/.test(ua)) {
      if (ua.indexOf("WIFI") >= 0) {
        return true;
      } else {
        wifi = false;
      }
      // 如果支持navigator.connection
    } else if (con) {
      let network = con.type;
      if (network !== "wifi" && network !== "2" && network !== "unknown") {
        wifi = false;
      }
    }
    return wifi;
  } catch (e) {
    return false;
  }
};
```

### 首字母大写

```js
/**
 * 首字母大写
 * @param str
 * @returns {string}
 */
export const fistLetterUpper = str => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
```

### 获取属性值和变更 class

```js
/**
 * 获取属性值
 * @param {HTMLElement} el DOM节点
 * @param {String} ab 属性名称
 */
function getAttributeVal(el, ab) {
  return el.getAttribute(ab);
}

// ( \\s|^ ) 判断前面是否有空格 (\\s | $) 判断后面是否有空格 两个感叹号为转换为布尔值 以方便做判断
function hasClass(el, cName) {
  return !!el.className.match(new RegExp("(?:^|\\s)" + cName + "(?:\\s|$)"));
}

// 添加class
function addClass(el, cName) {
  if (!hasClass(el, cName)) {
    el.className += " " + cName;
  }
}

// 删除class
function removeClass(el, cName) {
  if (hasClass(el, cName)) {
    el.className = el.className
      .replace(new RegExp("(?:^|\\s)" + cName + "(?:\\s|$)"), " ")
      .trim();
  }
}
/**
 * 判断是否支持 classList
 * @param {Object} el Dom对象
 */
export function isClassList(el) {
  if (el.classList) {
    return true;
  } else {
    return false;
  }
}
```

### 字符串截取,字符串分割转数组

```
// 字符串分割转数组
function splitToArray(el) {
	return el.split(" ");
}
/**
 * 字符串截取
 * @param {HTMLElement} el DOM节点
 * @param {String} sign 分割符
 */
function replaceCut(el, sign) {
	return el.replace(sign, "");
}
```

### 计算百分比

```js
/**
 * 计算百分比, 如果参数是数组则另行处理
 * @param [Number] mach
 * @param [Number] arg
 * @param [Number] fiexd 小数点尾数
 */
export function calcRate(mach = 0, arg = 0, fiexd = 2) {
  let rate = 0;
  if (mach === 0 || arg === 0) {
    return rate;
  }
  rate = (mach / (mach + arg)) * 100;

  return Number(rate.toFixed(fiexd));
}
```

### 获取可视区或正文的高度

```js
// 获取可视区的高度
export const visualAreaHeight = (param = "") => {
  const offsetH =
    document.documentElement.clientHeight || document.body.clientHeight;
  if (!param) {
    return offsetH;
  }
  return offsetH / param;
};
// 获取正文的高度
export const bodyHeight = (param = 1) => {
  const offsetH =
    document.documentElement.scrollHeight || document.body.scrollHeight;
  return offsetH / param;
};
```

### 新开页面

```js
/**
 * 新开页面
 * @param {String} URL
 * @param {String} name 可选的字符串,其中包括数字、字母和下划线,该字符声明了新窗口的名称,如果有则不在创建一个新窗口,会在已有的窗口上变更
 */
export const jumpNewPage = (URL, name = 1) => {
  window.open(URL, name);
};
```

### 获取滚动条的偏距

```js
export const getScrollOffset = () => {
  if (window.pageXOffset) {
    // 主流浏览器 ie9及以上
    return {
      x: window.pageXOffset,
      y: window.pageYOffset
    };
  } else {
    // ie8及以下
    return {
      x: document.documentElement.scrollLeft,
      y: document.documentElement.scrollTop
    };
  }
};
```

### 下划线转换驼峰

```js
// 下划线转换驼峰
export function toHump(name) {
  return name.replace(/\_(\w)/g, (all, letter) => {
    return letter.toUpperCase();
  });
}
// 驼峰转换下划线
export function toLine(name) {
  return name.replace(/([A-Z])/g, "_$1").toLowerCase();
}
```

### 判断元素是否是 Dom 元素

```js
/**
 * 先要对HTMLElement进行类型检查, 因为即使在支持HTMLElement的浏览器中, 类型却是有差别的,
 * 在Chrome,Opera中HTMLElement的类型为function, 此时就不能用它来判断了
 * @param {Dom元素} oElement
 */
export function isDom(oElement) {
  if (typeof HTMLElement === "object") {
    return oElement instanceof HTMLElement;
  } else {
    return (
      oElement &&
      typeof oElement === "object" &&
      oElement.nodeType === 1 &&
      typeof oElement.nodeName === "string"
    );
  }
}
```

### 判断浏览器

```js
export function getOs() {
  const ua = window.navigator.userAgent;
  if (ua.indexOf("MSIE 8.0") > 0) {
    return "MSIE8";
  } else if (ua.indexOf("MSIE 6.0") > 0) {
    return "MSIE6";
  } else if (ua.indexOf("MSIE 7.0") > 0) {
    return "MSIE7";
  } else if (ua.indexOf("Firefox") > 0) {
    return "Firefox";
  }
  if (ua.indexOf("Chrome") > 0) {
    return "Chrome";
  } else {
    return "Other";
  }
}
/**
 * @returns {String} 当前浏览器名称
 */
Utils.getExplorer = () => {
  const ua = window.navigator.userAgent;
  const isExplorer = exp => {
    return ua.indexOf(exp) > -1;
  };
  if (isExplorer("MSIE")) return "IE";
  else if (isExplorer("Firefox")) return "Firefox";
  else if (isExplorer("Chrome")) return "Chrome";
  else if (isExplorer("Opera")) return "Opera";
  else if (isExplorer("Safari")) return "Safari";
};
/**
 * 移动端
 * 用法示例——多套页面判断是否显示移动端：
 * let ua = parseUA();
 * if (!ua.mobile) {
 *   location.href = './pc.html';
 * }
 */
export const parseUA = () => {
  let u = navigator.userAgent;
  let u2 = navigator.userAgent.toLowerCase();
  return {
    //移动终端浏览器版本信息
    trident: u.indexOf("Trident") > -1,
    //IE内核
    presto: u.indexOf("Presto") > -1,
    //opera内核
    webKit: u.indexOf("AppleWebKit") > -1,
    //苹果、谷歌内核
    gecko: u.indexOf("Gecko") > -1 && u.indexOf("KHTML") == -1,
    //火狐内核
    mobile: !!u.match(/AppleWebKit.*Mobile.*/),
    //是否为移动终端
    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
    //ios终端
    android: u.indexOf("Android") > -1 || u.indexOf("Linux") > -1,
    //android终端或uc浏览器
    iPhone: u.indexOf("iPhone") > -1,
    //是否为iPhone或者QQHD浏览器
    iPad: u.indexOf("iPad") > -1,
    //是否iPad
    webApp: u.indexOf("Safari") == -1,
    //是否web应该程序，没有头部与底部
    iosv: u.substr(u.indexOf("iPhone OS") + 9, 3),
    weixin: u2.match(/MicroMessenger/i) == "micromessenger",
    ali: u.indexOf("AliApp") > -1
  };
};
/**
 * 判断微信浏览器
 * @returns {Boolean}
 */
export const isWeiXin = () => {
  let ua = window.navigator.userAgent.toLowerCase();
  if (ua.match(/MicroMessenger/i) == "micromessenger") {
    return true;
  } else {
    return false;
  }
};
/**
 * 判断是否是IE浏览器
 */
export function isIE() {
  if (!!window.ActiveXObject || "ActiveXObject" in window) {
    return true;
  } else {
    return false;
  }
}
```

### 函数节流

```js
/**
 * 函数节流
 * @param {Function} fn 执行函数
 * @param {Number} delay 延时时间
 */
export function throttle(fn, delay = 160) {
  let timeout = null;
  let pending = true;
  return function() {
    if (!pending) return;
    if (timeout) clearTimeout(timeout);
    pending = false;
    timeout = setTimeout(() => {
      fn.apply(this, arguments);
      pending = true;
      timeout = null;
    }, delay);
  };
}
// 如vue中无效, 则把方法放在methods里, 用this去调用
```

### 函数防抖动

```js
/**
 * @param {Function} fn
 * @param {Number} wait 等待时间
 */
export function debounce(fn, wait) {
  let timeout = null;
  return function() {
    if (timeout !== null) clearTimeout(timeout);
    timeout = setTimeout(fn, wait);
  };
}
// 如:
window.addEventListener("scroll", this.debounce(this.loadScroll, 500));
```

### 数组对象去重

```js
/**
 * 数组对象去重
 * @param {Array} arrs 数组
 * @param {String} id 键名
 */
export function unique(arrs, key = 'id') {
  let res = []
  let ids = []
  for (let item of arrs) {
    if (ids.indexOf(item[key]) === -1) {
      res.push(item)
      ids.push(item[key])
    }
  }
  return res
```

### 获取不重复的随机数字数组

```js
/**
 * 获取不重复的随机数字数组
 * @param {Number} min 最小值
 * @param {Number} max 最大值
 * @param {Number} len 长度
 * @param {Array} arr 存放最终结果的数组
 */
export function randomDiff(min, max, len = 0, arr = []) {
  let _arr = arr;
  if (max == null) {
    max = min;
    min = 0;
  }
  let ran = min + Math.floor(Math.random() * (max - min + 1));
  if (_arr.indexOf(ran) === -1) {
    _arr.push(ran);
  }
  if (_arr.length >= len) {
    return _arr;
  } else {
    return randomDiff(min, max, len, _arr);
  }
}
```

### 打乱数组

```js
/**
 * 打乱数组
 * @param {Array} arr
 */
export function shuffle(arr) {
  for (let i = 0, len = arr.length; i < len - 1; i++) {
    let idx = parseInt(Math.random() * (len - i));
    let temp = arr[idx];
    arr[idx] = arr[len - i - 1];
    arr[len - i - 1] = temp;
  }
  return arr;
}
```

### 添加收藏

```js
addFavorite() {
	let url = window.location;
	let title = document.title;
	let ua = navigator.userAgent.toLowerCase();
	if (ua.indexOf("360se") > -1) {
		msgFn(this, '由于360浏览器功能限制，请按 Ctrl+D 手动收藏！')
	} else if (ua.indexOf("msie 8") > -1) {
		// IE8
		window.external.AddToFavoritesBar(url, title)
	} else if (document.all) {
		// IE类浏览器
		try {
			window.external.addFavorite(url, title)
		} catch (e) {
			msgFn(this, '您的浏览器不支持,请按 Ctrl+D 手动收藏!')
		}
	} else if (window.sidebar) {
		// firfox等浏览器
		window.sidebar.addPanel(title, url, "");
	} else {
		msgFn(this, '您的浏览器不支持,请按 Ctrl+D 手动收藏!')
	}
}
```
