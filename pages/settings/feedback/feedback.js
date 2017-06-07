// pages/settings/feedback/feedback.js
var API = require('../../../utils/config').API;
var app = getApp()

Page({
  data: {
    userInfo: {},
    content: "",
    connect: ""
  },
  onLoad: function (options) {

    const that = this;
    // 页面初始化 options为页面跳转所带来的参数
    app.getUserInfo(function (userInfo) {
      that.setData({
        userInfo: userInfo
      })
    })
  },
  getContent: function (e) {
    this.setData({
      content: e.detail.value
    })
  },
  getConnection: function (e) {
    this.setData({
      connect: e.detail.value
    })
  },
  submitSuggestion: function () {
    var that = this
    wx.request({
      url: API + 'feedback',
      data: {
        openid: wx.getStorageSync('openid'),
        content: that.data.content,
        contact: that.data.connect
      },
      method: 'GET',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function(res) {
        console.log(wx.getStorageSync('openid'));
        console.log(that.data.connect);
        console.log(that.data.content);       
        console.log(res);
        wx.showModal({
          title: '提示',
          content: '提交成功！感谢您的反馈！',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            }
          }
        })
      }
    })
  }
  
})