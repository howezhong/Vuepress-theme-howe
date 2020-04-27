---
title: 用svg的方式制作渐变色字体
tags:
  - svg
category: 前端
date: 2019-11-10
update_date: 2019-11-10
---

## 结构

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 660 100" width="660" height="100">
  <defs>
    <linearGradient id="content" gradientUnits="userSpaceOnUse" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color: rgb(255, 236, 200);"></stop>
      <stop offset="75%" style="stop-color: rgb(255, 195, 122);"></stop>
    </linearGradient>
  </defs>
  <text class="gradient" font-size="38" text-anchor="middle" x="50%" y="50%" dy=".35em">对未来最大的慷慨是把一切献给现在！</text>
</svg>
```

::: tip
  - 如若想文字自适应大小，给 svg 加上 width:100%即可，来源[张鑫旭大神搏客](https://www.zhangxinxu.com/wordpress/2018/03/svg-text-font-size-auto-scale/)
  - stop即可传入开头结尾的颜色
:::

### 针对性设置属性

```css
.gradient {
  fill: url(#content);
  font-size: 60px;
  font-weight: 600;
  font-family: cursive;
}
```
