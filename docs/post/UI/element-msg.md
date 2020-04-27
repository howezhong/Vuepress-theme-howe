---
title: elementUI二次封装
date: 2019-12-23
update_date: 2019-12-23
tags:
  - element
category: 前端
---

### 弹窗封装
```js
import { visualAreaHeight } from '@/utils/tool'

/**
 * 基于element的消息提示二次封装
 * @param {Object} that 当前上下文的this对象
 * @param {String} msg 提示语
 * @param {String} type type 类型:success/warning/info/error
 * @param {Number} offset 显示位置, 越大距离顶部越远
 */
export function msgFn(that, msg = '出错啦!', type = 'warning', offset = 3) {
    that.$message({
        type: type,
        message: msg,
        offset: visualAreaHeight(offset)
    })
}

```
