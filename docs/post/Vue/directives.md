---
title: Vue指令
date: 2019-12-23
update_date: 2019-12-23
tags:
  - Vue
  - directive
category: 前端
---

### 示列

```js
import Vue from 'vue'

Vue.directive('numberOnly', {
  bind: function (el) {
    el.handler = function () {
      if (el.value) {
        el.value = el.value.replace(/\D+/, '')
      }
    }
    el.addEventListener('input', el.handler)
  },
  unbind: function (el) {
    el.removeEventListener('input', el.handler)
  }
})

```

### 使用

```js
import { numberOnly } from '@/utils/directives'

<Input type="number" v-model="value" v-number-only />
```
