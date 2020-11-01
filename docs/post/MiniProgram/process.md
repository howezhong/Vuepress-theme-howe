---
title: 微信小程序授权流程
date: 2020-11-01
update_date: 2020-11-01
category: 小程序
---

## 获取用户信息流程

```js
/**
  * https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/login/auth.code2Session.html#请求地址
  * 1. 先调用wx.login登录获取 code
  * 2. 用code走接口获取openId和session_key等信息
  * 3. 判断是否授权了, 授权了获取用户信息
  * 
  * 登录流程中后端所需的参数:
  * appid 小程序 appId
  * secret 小程序 appSecret
  * 是从小程序管理后台注册申请的: https://mp.weixin.qq.com/wxamp/devprofile/get_profile?token=565245476&lang=zh_CN
  */
wx.login({
  success: res => {
    // 发送 res.code 到后台换取 openId, sessionKey, unionId...
    this.request({
      url: 'v1.0/pub/openId',
      method: 'POST',
      data: { code: res.code },
      success: result => {
        resolve(result)
      },
      fail: error => {
        reject(error)
      }
    })
  }
})
// 判断用户是否授权
isAuthorized() {
  return new Promise((resolve, reject) => {
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          resolve(res)
        } else {
          reject(res)
        }
      },
      fail: err => {
        reject(err)
        tools.showToast("请求失败,请检查网络！");
      }
    })
  })
}
// 获取用户信息
wx.getUserInfo({
  success: res => {
    // 由于 getUserInfo 是异步请求，会在 Page.onLoad 之后才返回
    // 所以此处加入 callback 以防止这种情况
    if (this.userInfoReadyCallback) {
      this.userInfoReadyCallback(res.userInfo)
    }
  },
  fail: () => {
    if (this.userInfoReadyCallback) {
      this.userInfoReadyCallback(false)
    }
  }
})
```
## 获取手机号码

> 个人主体是无权限获取手机号码, 需要企业认证的主体方可

```js
// model
/**
  * 获取手机号码
  * @param {Object} data
  */
getPhoneNumber(data) {
  return this.request({
    url: 'v1.0/pub/decode',
    method: 'POST',
    data
  })
}
// 调用
getPhoneNumber(e) {
  if (e.detail.errMsg === 'getPhoneNumber:fail') {
    tools.showToast('未获取到手机号码, 请手动输入吧!')
    return false
  } else if (e.detail.iv === undefined || !e.detail.iv) {
    tools.showToast('授权失败, 请手动输入吧!')
    return false
  }
  userModel.getPhoneNumber({
    encrypted_data: e.detail.encryptedData,
    iv: e.detail.iv,
    session_key: app.globalData.session_key
  }, res => {
    this.setData({
      'userInfo.user_phone': res.purePhoneNumber
    })
  })
}
```