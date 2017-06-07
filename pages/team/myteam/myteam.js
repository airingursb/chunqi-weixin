var API = require('../../../utils/config').API;
var app = getApp()
var str = ''

Page({
  data:{
    userInfo: {},
    items: [],
    team: {}
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
      url: API + 'get_team?team_id=' + wx.getStorageSync('team_id'),
      data: {},
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'GET',
      success: function (res) {
        console.log(res);
        that.setData({
          team: res.data.data
        })
      }
    })
    
    wx.request({
      url: API + 'show_team?team_id=' + wx.getStorageSync('team_id'),
      data: {},
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'GET',
      success: function(res){
        console.log(res);
        that.setData({
          items: res.data.data
        })
      }
    })
  },
  onShareAppMessage: function() {
    console.log(str)
    return {
      title: str, 
      desc: '邀请码：' + this.data.team.share_id, 
      path: 'path' 
    }
  },
  showButton: function(e) {
    var user_id = e.target.dataset.id;
    console.log('user_id ' + user_id)
    if(wx.getStorageSync('role')==4){
      wx.showActionSheet({
        itemList: ['查看信息', '踢出队员'],
        success: function(res) {
          console.log(res.tapIndex)
          console.log('user_id ' + user_id)
          if(res.tapIndex == 0) {
            wx.navigateTo({
              url: './member/member?user_id=' + user_id
            })
          }
          if(res.tapIndex == 1) {
            wx.showModal({
              title: '提示',
              content: '您确定要踢出该队员吗？',
              success: function(res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                  wx.request({
                    url: API + 'remove_user?user_id=' + user_id + '&openid=' + wx.getStorageSync('openid'),
                    method: 'GET',
                    success: function(res) {
                      console.log(res);
                      if(res.data.status == 1010) {
                        wx.showModal({
                          title: '警告',
                          content: '队长不能踢出自己！',
                        })
                      }
                    }
                  })
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
  }
})