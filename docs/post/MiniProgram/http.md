---
title: 微信小程序Http封装
date: 2020-10-31
update_date: 2020-10-31
tags:
  - request
category: 小程序
---

## 封装Http

```js
import { config } from '../config/config.js'
import { tips } from '../config/tips.js';
import { showToast } from './tools.js';

export default class HTTP {
  constructor() {
    this._header = {
      'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
  }
  request(params) {
    return new Promise((resolve, reject) => {
      const args = Object.assign(params, { resolve, reject })
      this._request(args)
    })
  }
  // 内部方法用 _ 下划线
  _request({ url, data = {}, method = 'GET', header, resolve, reject }) {
    wx.request({
      url: `${config.api_root_url}${url}`,
      method: method,
      header: Object.assign(this._header, header),
      data: data,
      success: res => {
        const code = res.statusCode.toString()
        console.log(res)
        if (code.startsWith('2')) {
          resolve(res.data)
        } else {
          showToast(tips[res.statusCode])
          reject(res)
        }
      },
      fail: (err) => {
        reject(err)
      }
    })
  }
}
// tips
export const tips = {
  1000: '抱歉，出现了一个错误',
  400: '请求错误',
  403: '拒绝访问',
  404: '未找到该资源',
  405: '请求方法未允许',
  408: '请求超时',
  500: '服务器内部错误'
}
```

## model调用

```js
import HTTP from '../utils/http.js'

class HomeModel extends HTTP {
  constructor() {
    super()
  }
  getList() {
    return this.request({
      url: 'v1.0/home/lists'
    })
  }
}

export { HomeModel }
```

## 页面调用

```js
import { HomeModel } from '../../models/home'
const homeModel = new HomeModel()

homeModel.getList().then(res => {
  console.log(res)
}).catch(err => {
  console.log(err)
})
```