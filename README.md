# VuePress Theme howe

## Introduction

* [Vuepress](https://vuepress.vuejs.org/)
* [Live Demo](https://howezhong.github.io/howe/)
* [国内源 Demo](https://howezhong.gitee.io/howe/)

## Quick start

**npm**
```sh
# init
git clone https://github.com/howezhong/Vuepress-theme-howe.git

# install
cd Vuepress-theme-howe
npm i

# run
npm run dev

# build
npm run build

# deploy Need to configure gitee and github ssh
npm run deploy
```

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

```sh
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

```sh
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

> `.vuepress` 目录新建 styles/variable.scss 文件（[可调整变量](https://howezhong.gitee.io/howe/post/Other/blog-config-info.html)）

## License

[MIT](https://github.com/howezhong/Vuepress-theme-howe/master/LICENSE)
