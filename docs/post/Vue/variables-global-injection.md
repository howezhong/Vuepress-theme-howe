---
title: Vue全局引入主题色配置文件
tags: 
  - Vue
  - less
  - scss
date: 2020-07-01
update_date: 2020-07-01
category: 前端
---

## less 全局引入

```js
// vue.config.js
pluginOptions: {
  'style-resources-loader': {
    preProcessor: 'less',
    patterns: [
      path.resolve(__dirname, 'src/styles/variables.less')
    ]
  }
}
```

## scss 全局引入

```js
// vue.config.js
css: {
  // 定位样式所在的vue文件及行数
  sourceMap: true,
  loaderOptions: {
    sass: {
      // sass 全局变量, $path 可以配置图片cdn 前缀, scss 里 background: url($path + '/images/404.png')
      prependData: `
        @import "@/styles/_variable.scss";
        @import "@/styles/_mixin.scss";
        $path: "${process.env.VUE_APP_ROOT_PATH}";
      `
    }
  }
}
```