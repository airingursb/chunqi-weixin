var API = require('../../../utils/config').API;

Page({
  data: {},
  onLoad: function (option) {

  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  inputTeam: function(e) {
    this.setData({
      team_name: e.detail.value
    })
  },
  createTeam: function () {

    if (this.data.team_name == '' || this.data.team_name == undefined) {
      wx.showModal({
        title: '提示',
        content: '队伍名称不允许为空！',
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
        url: API + 'create_team?team_name=' + this.data.team_name,
        data: {},
        method: 'GET',
        success: function (res) {
          console.log(res)
          that.setData({
            share_id: res.data.data.share_id,
          })
          wx.setStorageSync('share_id', res.data.data.share_id)
          wx.navigateTo({
            url: './member/member',
            success: function(res){
              // success
            },
            fail: function(res) {
              // fail
            },
            complete: function(res) {
              // complete
            }
          })
        },
        fail: function () {
        },
        complete: function () {
        }
      })
    }
  }
})