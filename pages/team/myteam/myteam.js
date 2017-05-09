var API = require('../../../utils/config').API;
var app = getApp()
var str = ''

Page({
  data:{
    userInfo: {}
  },
  onLoad:function(options){
    console.log('onLoad')
    var that = this
    app.getUserInfo(function (userInfo) {
      that.setData({
        userInfo: userInfo
      })
      str = userInfo.nickName + '邀请你加入春骑'
    })

    wx.request({
      url: API + 'show_team?team_id=' + wx.getStorageSync('team_id'),
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
        console.log(res);
      },
      fail: function(res) {
        // fail
      },
      complete: function(res) {
        // complete
      }
    })
  },
  onShareAppMessage: function() {
    console.log(str)
    return {
      title: str, 
      desc: '邀请码：', 
      path: 'path' 
    }
  },
  showButton: function() {
    wx.showActionSheet({
      itemList: ['查看信息', '踢出队员'],
      success: function(res) {
        console.log(res.tapIndex)
        if(res.tapIndex == 0) {
          wx.navigateTo({
            url: './member/member',
            success: function (res) {
              // success
            },
            fail: function () {
              // fail
            },
            complete: function () {
              // complete
            }
          })
        }
        if(res.tapIndex == 1) {
          wx.showModal({
            title: '提示',
            content: '您确定要踢出该队员吗？',
            success: function(res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }
      },
      fail: function(res) {
        console.log(res.errMsg)
      }
    })
  }
})