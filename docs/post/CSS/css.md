---
title: CSS百宝箱
tags:
  - css
category: 前端
date: 2019-11-10
update_date: 2019-11-10
---

## background 背景图片简写模式

```css
background: [background-color] [background-image] [background-repeat]
  [background-attachment] [background-position] / [ background-size]
  [background-origin] [background-clip];

.example {
  background: url(img.png) no-repeat fixed center center / 50% content-box
    content-box;
}
```

## 自适应

> [京东方法](https://aotu.io/notes/2017/04/28/2017-4-28-CSS-viewport-units/)

### 媒体查询

> 来源张鑫旭的年度小测

```css
@media screen and (min-width: 375px) {
  html {
    /* iPhone6的375px尺寸作为16px基准，414px正好18px大小, 600 20px */
    font-size: calc(100% + 2 * (100vw - 375px) / 39);
    font-size: calc(16px + 2 * (100vw - 375px) / 39);
  }
}

@media screen and (min-width: 414px) {
  html {
    /* 414px-1000px每100像素宽字体增加1px(18px-22px) */
    font-size: calc(112.5% + 4 * (100vw - 414px) / 586);
    font-size: calc(18px + 4 * (100vw - 414px) / 586);
  }
}

@media screen and (min-width: 600px) {
  html {
    /* 600px-1000px每100像素宽字体增加1px(20px-24px) */
    font-size: calc(125% + 4 * (100vw - 600px) / 400);
    font-size: calc(20px + 4 * (100vw - 600px) / 400);
  }
}

@media screen and (min-width: 1000px) {
  html {
    /* 1000px往后是每100像素0.5px增加 */
    font-size: calc(137.5% + 6 * (100vw - 1000px) / 1000);
    font-size: calc(22px + 6 * (100vw - 1000px) / 1000);
  }
}
```

### 网易 H5 自适应写法

```css
html {
  font-size: -webkit-calc(13.33333333vw);
  font-size: calc(13.33333333vw);
}
@media screen and (max-width: 320px) {
  html {
    font-size: 42.667px;
    font-size: -webkit-calc(13.33333333vw);
    font-size: calc(13.33333333vw);
  }
}
@media screen and (min-width: 321px) and (max-width: 360px) {
  html {
    font-size: 48px;
    font-size: -webkit-calc(13.33333333vw);
    font-size: calc(13.33333333vw);
  }
}
@media screen and (min-width: 361px) and (max-width: 375px) {
  html {
    font-size: 50px;
    font-size: -webkit-calc(13.33333333vw);
    font-size: calc(13.33333333vw);
  }
}
@media screen and (min-width: 376px) and (max-width: 393px) {
  html {
    font-size: 52.4px;
    font-size: -webkit-calc(13.33333333vw);
    font-size: calc(13.33333333vw);
  }
}
@media screen and (min-width: 394px) and (max-width: 412px) {
  html {
    font-size: 54.93px;
    font-size: -webkit-calc(13.33333333vw);
    font-size: calc(13.33333333vw);
  }
}
@media screen and (min-width: 413px) and (max-width: 414px) {
  html {
    font-size: 55.2px;
    font-size: -webkit-calc(13.33333333vw);
    font-size: calc(13.33333333vw);
  }
}
@media screen and (min-width: 415px) and (max-width: 480px) {
  html {
    font-size: 64px;
    font-size: -webkit-calc(13.33333333vw);
    font-size: calc(13.33333333vw);
  }
}
@media screen and (min-width: 481px) and (max-width: 540px) {
  html {
    font-size: 72px;
    font-size: -webkit-calc(13.33333333vw);
    font-size: calc(13.33333333vw);
  }
}
@media screen and (min-width: 541px) and (max-width: 640px) {
  html {
    font-size: 85.33px;
    font-size: -webkit-calc(13.33333333vw);
    font-size: calc(13.33333333vw);
  }
}
@media screen and (min-width: 641px) and (max-width: 720px) {
  html {
    font-size: 96px;
    font-size: -webkit-calc(13.33333333vw);
    font-size: calc(13.33333333vw);
  }
}
@media screen and (min-width: 721px) and (max-width: 768px) {
  html {
    font-size: 102.4px;
    font-size: -webkit-calc(13.33333333vw);
    font-size: calc(13.33333333vw);
  }
}
@media screen and (min-width: 769px) {
  html {
    font-size: 102.4px;
    font-size: -webkit-calc(13.33333333vw);
    font-size: calc(13.33333333vw);
  }
}
```

::: tip pc 端用 rem 之动态计算 html 基准值
```js
!(function() {
  // 计算 rem 基准单位
  function changeRem() {
    let rem = window.innerWidth / 100;
    document.documentElement.style.fontSize = `${rem}px`;
  }
  changeRem();
  window.addEventListener("resize", function() {
    changeRem();
  });
})();
```
:::

## 调试神器

> js 方法, 直接在控制台输出即可

```js
[].forEach.call($$("*"), function(a) {
  a.style.outline =
    "1px solid #" + (~~(Math.random() * (1 << 24))).toString(16);
});
```

> css 方法

```css
* {
  border: red solid thin;
  outline: red;
}
```
