---
title: 对象属性
date: 2019-12-18
update_date: 2019-12-18
tags:
  - window
  - Js
category: 前端
---

### Location 对象和属性

```js
1、Location对象：
window.location // 对象用于获得当前页面的地址(URL),并把浏览器重定向到新的页 面。
2、Location对象的属性：
location.hostname // 返回web主机的域名
location.pathname // 返回当前页面的路径和文件名
location.port // 返回web主机的端口
location.protocol // 返回所使用的 web 协议（http:// 或 https://)
location.href // 属性返回当前页面的URL或设置URL跳转页面
location.assiqnQ // 方法加载新的文档
window.location.hash // 设置或获取 href 属性中在井号'#'后面的分段
window.location.search // 设置或获取 href 属性中跟在问号后面的部分
```

### window 对象

```js
1、window对象：
window对象是BOM的核心，window对象指当前的浏览器窗口
所有JavaScript全局对象、函数以及变量均自动成为window对象的成员
全局变量是window对象的属性
全局函数是window对象的方法
甚至HTML DOM的document也是window对象的属性之一
2、window尺寸：
window.innerHeight -浏览器窗口的内部高度
window.innerWidth -浏览器窗口的内部宽度
3、window 方法：
window.open()-打开新窗口
window.close()-关闭当前窗口
```

### Screen 对象

```js
1、Screen对象：
window.screen对象包含有关用户屏幕的信息
2、属性：
screen.availWidth -可用的屏幕宽度
screen.availHeight -可用的屏幕高度
screen.Height 屏幕高度
screen.Width -屏幕宽度
```

### History 对象

```js
1、History对象：
window.history对象包含浏览器的历史(url)的集合
2、History方法：
history.back()-与在浏览器点击后退按钮相同
history.forward()-与在浏览器中点击按钮向前相同
history.goQ -进入历寫中的某个页面
```

### 计时事件和方法

```js
1、	计时事件：
通过使用JavaScript,我们有能力作到在一个设定的时间间隔之后来执行代码，而不是在函数被调用后立即执行，我们称之为计时事件

2、	计时方法：
1) setlntervalO -间隔指定的毫秒数不停地执行指定的代码
   clearlnterval()方法用于停止setlntervalO方法执行的函数代码

2) setTimeout()-暂停指$的毫秒数后执行指定的代码
   clearTimeoutQ方法用于停止执行setTimeout()方法的函数代码
```

### window 高度, 滚动条滚动值

```js
// 可视区里内容区总高度
let areaTotalH = document.documentElement.scrollHeight;
// 可视区高度
let winH = document.documentElement.clientHeight || window.innerHeight
// 滚动条滚动高度
let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
```
