//app.js
var API = require('./utils/config').API;
App({
  onLaunch: function () {
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    wx.checkSession({
      success: function() {
        wx.login({
          success: function (res) {
            if (res.code) {
              wx.request({
                url: API + 'login',
                method: 'GET',
                data: {
                  code: res.code
                },
                success: function (res) {
                  console.log(res);
                  console.log(res.data.openid);
                  wx.setStorageSync('openid', res.data.openid)
                }
              })
            }
          }
        })
      },
      fail: function() {
        wx.login({
          success: function (res) {
            if (res.code) {
              wx.request({
                url: API + 'login',
                method: 'GET',
                data: {
                  code: res.code
                },
                success: function (res) {
                  console.log(res);
                  console.log(res.data.openid);
                  wx.setStorageSync('openid', res.data.openid)
                }
              })
            }
          }
        })
      }
    })
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo:null
  }
})