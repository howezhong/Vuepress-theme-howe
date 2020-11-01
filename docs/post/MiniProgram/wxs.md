---
title: 微信小程序wxs封装
date: 2020-11-01
update_date: 2020-11-01
tags:
  - wxs
category: 小程序
---

## 封装 wxs

```js
function isZero(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

var formatDate = function (timestamp) {
  if (!timestamp) {
    return ''
  }
  var strTime = getDate(timestamp * 1000);
  var year = strTime.getFullYear()
  var month = isZero(strTime.getMonth() + 1)
  var date = isZero(strTime.getDate())
  return year + '年' + month + '月' + date + '日'
}

var formatNumber = function (v) {
  return Number(v)
}
// 导出
module.exports = {
  formatDate: formatDate,
  formatNumber: formatNumber
}
```

## [使用](https://developers.weixin.qq.com/miniprogram/dev/reference/wxs/01wxs-module.html)

```html
<!-- 导入, 模块名 module(可自定义) -->
<wxs src="../../utils/filters.wxs" module="utils" />
<!-- 使用 -->
<text>{{utils.formatDate(open_date)}}</text>

Note: <template> 标签中，只能使用定义该 <template> 的 WXML 文件中定义的 <wxs> 模块, 
```