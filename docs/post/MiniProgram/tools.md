---
title: 微信小程序Tools封装
date: 2020-10-31
update_date: 2020-10-31
tags:
  - js
  - tools
category: 小程序
---

## 获得元素上绑定的 data 值

```js
// 获得元素上绑定的data值
export function getElDataVal(event, key) {
  return event.currentTarget.dataset[key]
}
```

## 获取 input 的 value 值

```js
// 获取input的value值
export function getInputVal(event) {
  return event.detail.value
}
```

## 弹窗

```js
export const showToast = (msg, icon = 'none', duration = 3000) => {
  wx.showToast({
    title: msg || '抱歉, 出现了一个未知错误！',
    icon: icon,
    duration: duration,
  })
}
```
