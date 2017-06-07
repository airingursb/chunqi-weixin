var API = require('../../../utils/config').API;

Page({
  data: {

  },
  onLoad: function (options) {
    // 生命周期函数--监听页面加载

  },
  onReady: function () {
    // 生命周期函数--监听页面初次渲染完成

  },
  onShow: function () {
    // 生命周期函数--监听页面显示

  },
  onShareAppMessage: function () {
    // 用户点击右上角分享
    return {
      title: 'title', // 分享标题
      desc: 'desc', // 分享描述
      path: 'path' // 分享路径
    }
  },
  inputTeam: function (e) {
    this.setData({
      share_id: e.detail.value
    })
  },
  join: function () {

    if (this.data.share_id == '' || this.data.share_id == undefined) {
      wx.showModal({
        title: '提示',
        content: '邀请码不允许为空！',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      })
    } else {
      var that = this;
      wx.request({
        url: API + 'join_team?share_id=' + this.data.share_id,
        data: {},
        method: 'GET',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success: function (res) {
          console.log(res)
          wx.setStorageSync('share_id', that.data.share_id)
          if (res.data.status == 0) {
            wx.navigateTo({
              url: './member/member',
              success: function (res) {
                // success
              },
              fail: function (res) {
                // fail
              },
              complete: function (res) {
                // complete
              }
            })
          } else {
            wx.showModal({
              title: '提示',
              content: '邀请码不存在！',
              showCancel: false,
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                }
              }
            })
          }
        },
        fail: function () {
        },
        complete: function () {
        }
      })
    }
  }
})