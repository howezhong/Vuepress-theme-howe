---
title: 计算属性传参
tags:
  - Vue
category: 前端
date: 2019-12-23
update_date: 2019-12-23
---

### 计算属性传参

```js
// 使用闭包的方式传参
computed: {
	fn(){
		return function(option){
			return this.$store.getters.fn(option)
		}
	}
}
```

::: tip
- 1.计算属性自带缓存功能, 不是所有传参方式还能保留缓存功能, 因此如若可无需缓存, 则直接使用 `methods` 方法进行接收参数处理
- 2.`computed`里的计算属性方法于其它(出了 watch 监听)地方 `this.fn` 也可以调用(fn 后不可加括号)
:::
