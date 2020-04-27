---
title: 过滤filters
date: 2019-12-23
update_date: 2019-12-23
tags:
  - Vue
  - filters
category: 前端
---

### 示列

```js
export const fn = () => {}
```

### 使用

```js
// 入口文件main.js引入, 就可全局使用了
import * as filters from '@/utils/filters'

Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})
```
