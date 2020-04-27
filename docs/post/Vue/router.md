---
title: 路由百宝箱
tags: 
  - Vue
category: 前端
date: 2020-1-3
update_date: 2020-1-3
---

## 动态改变路由参数

```js
// 如果index?type=home, 要变更type的值
this.$router.push({ query: { type: this.type } })
```