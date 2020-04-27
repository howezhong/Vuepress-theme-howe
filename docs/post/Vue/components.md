---
title: 组件封装的fn方法使用
date: 2019-12-23
update_date: 2019-12-23
tags:
  - Vue
category: 前端
---

### props 传方法

> table 组件

```html
<div>{{fn(item)}}</div>
```

```js
props: {
	fn: {
		type: Function,
		default: function (v) {
			// 其它逻辑处理
			return v
		}
	}
}
```

### 使用

```html
<table :fn="formatterFn"></table>
```

```js
formatterFn(v) {
  // 其它逻辑
  return v.substr(3)
}
```

### 模版中使用封装的方法

```js
// 问题: 在utils中封装的函数方法, 在template模版中使用不了, 如下亦可使用
// 模版
<template>
  <nav if="fn(***)"></nav>
</template>;
// JS中定义
import { fn } from "@/utils/tools"
export default {
  methods: {
    fn
  }
}
```
