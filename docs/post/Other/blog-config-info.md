---
title: Blog配置详解
category: 其它
tags:
  - vuepress
date: 2020-3-2
update_date: 2020-11-20
---

## 文章配置

```sh
title: 标题
isHide: false           # 不渲染 true, 默认为false
tags:                   # 标签
  - html
  - js
  - css
category: 前端          # 分类
date: 2019-01-22        # 创建时间
update_date: 2019-09-02 # 修改时间, 上传到git后会默认渲染当前文件的git上的更新时间
```

## 导航配置

```sh
title: 标题
bookmark: false          # 不渲染 false, 要渲染则必填为true
level: 1                 # 排序, 数字越大排的越后
books                    # 导航的数组分类
  - title                # 标题
  - link                 # 外链URL
  - desc                 # 描述
```

## 个人信息

```bash
# .vuepress => config => themeConfig
userInfo: {
  nickname: '稻香',
  job: '前端',
  address: '厦门',
  links: [
    { name: 'Github', url: 'https://github.com/howezhong' },
    { name: '掘金', url: 'https://juejin.im/user/5aaa3302518825188038a8e9' }
  ]
}
```

## valine插件密钥配置

```bash
# .vuepress => config => themeConfig
valine: {
  appId: '',
  appKey: '',
  notify: false,
  verify: false,
  avatar: 'howe',
  placeholder: '欢迎留言...'
}
```

## 自定义调色板

> `.vuepress` 目录下新建 styles/variable.scss 文件

### 可调整变量

```scss
$theme: #00adb5;
$text-color: #364f6b;
$padding-top: 4rem;
$space: 1rem;
$font-color-empty: #a2a8a2;

// main
$main-bg-color: #efefef;

// header
$header-height: 3rem;
$header-zIndex: 100;
$header-box-shadow: 6px 0px 6px 0px rgba(207, 174, 249, 0.3);
$header-zIndex-mobile: 105;
$header-zIndex-bg-color-mobile: #454d66;

// sidebar
$sidebar-width: 12rem;
$sidebar-color: #6b7386;
$sidebar-color-hover: rgba(207, 174, 249, 0.3);

// aside
$width: 16rem;

// btn
$btn-color: #fff;
$btn-primary: #505bda;
$btn-warning: #b20000;

// 字体渐变色
$home-font-linear: #cfaef9;
$home-font-gradient: #00adb5;

// post
$post-title-color: #2c3e50;
$post-head-height: 4rem;

// content
$content-color-border: rgba(0, 0, 0, 0.1);
$content-color-hover: rgba(207, 174, 249, 0.3);

$line-numbers-wrapper-width: 3.5rem;
$code-bg-color: #282c34;

// popup-cover
$popup-bg-color: rgba(0, 0, 0, 0.3);

// 404
$not-found-bg-color: #007fff;

// other
$line-color: #e5e5e5;
$time-color: #989898;
$page-nav-border-color: #eaecef;

// media
$sm: 414px;
$md640: 640px;
$md: 768px;
$lg: 960px;
$xl1024: 1024px;
$xl1228: 1228px;
$xl1366: 1366px;
$xl1440: 1440px;

$codeLang: js, ts, typescript, html, md, vue, css, sass, scss, less, stylus, go,
  java, c, sh, yaml, py, docker, dockerfile, markup, markdown, json, php, svg;
```