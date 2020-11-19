---
title: 环境变量和模式
tags: 
  - Vue
category: 前端
date: 2020-11-19
update_date: 2020-11-19
---

## 新增自定义环境变量

> 基于同一套代码进行个性化定制, 如不同UI

```sh
# 模式
.env                # 在所有的环境中被载入
.env.local          # 在所有的环境中被载入，但会被 git 忽略
.env.[mode]         # 只在指定的模式中被载入
.env.[mode].local   # 只在指定的模式中被载入，但会被 git 忽略

# 根目录新建文件
.env.howe

# 写入内容, 一个环境文件只包含环境变量的 "键=值" 对, 如:
BRANCH_ENV = 'howe'
VUE_APP_BRANCH_ENV = 'howe'

# 调整配置文件 package.json
"dev": "vue-cli-service serve --copy --mode howe", # --copy是把启动后的URL复制到剪切板
"howe": "vue-cli-service build --mode howe"

# 如果要根据不同的环境变量打包成不同的名称则可:
outputDir: process.env.BRANCH_ENV ? process.env.BRANCH_ENV : 'dist',
```

## 键名有无 VUE_APP_ 前缀的区别

1. 有 `VUE_APP_` 会自动加入 `process.env` 对象里
2. 无 `VUE_APP_` 需要另行处理, 如下:

```js
// 1. 在 vue.config.js 配置, 必须要进行JSON.stringify()处理, 否则页面读取会报错
module.exports = {
  configureWebpack: config => {
    return {
      plugins: [
        new webpack.DefinePlugin({
          'process.env.BRANCH_ENV': JSON.stringify(process.env.BRANCH_ENV)
        })
      ]
    }
  }
}

// 2. 页面读取
export default {
  mounted () {
    console.log(process.env) // { NODE_ENV: "development", VUE_APP_BRANCH_ENV: "howe", BASE_URL: "/" }
    console.log(process.env.BRANCH_ENV) // howe
  }
}
```

## 其它方式

```sh
# 安装
npm i -D minimist

# 配置 package.json
"serve": "vue-cli-service serve --copy --BRANCH_ENV=howe",
"howe": "vue-cli-service build --BRANCH_ENV=howe"

# 读取
const minimist = require('minimist')
const argv = minimist(process.argv)
console.log(argv.BRANCH_ENV)

# 定义全局变量
module.exports = {
  configureWebpack: config => {
    return {
      plugins: [
        new webpack.DefinePlugin({
          'process.env.BRANCH_ENV': JSON.stringify(argv.BRANCH_ENV)
        })
      ]
    }
  }
}
```