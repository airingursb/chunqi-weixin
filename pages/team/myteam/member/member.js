var API = require('../../../../utils/config').API;

Page({
  data:{
    user:{}
  },
  onLoad:function(options){
    // 生命周期函数--监听页面加载
    var user_id = options.user_id;
    var that = this;
    console.log('user id:' + user_id);
    wx.request({
      url: API + 'show_user?user_id=' + user_id,
      method: 'GET',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function(res){
        console.log(res)
        that.setData({
          user: res.data.data
        })
      }
    })
  },
  onReady:function(){
    // 生命周期函数--监听页面初次渲染完成
    
  },
  onShow:function(){
    // 生命周期函数--监听页面显示
    
  },
  pass: function() {
    var user_id = this.data.user.id
    wx.request({
      url: API + 'pass_user?user_id=' + user_id,
      method: 'GET',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function(res) {
        console.log(res)
        wx.showModal({
          title: '提示',
          content: '审核成功！',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
              wx.navigateBack({
                delta: 2, // 回退前 delta(默认为1) 页面
                success: function (res) {
                  wx.setStorageSync('role', 4);
                },
                fail: function (res) {
                  // fail
                },
                complete: function (res) {
                  // complete
                }
              })
            }
          }
        })
      }
    })
  },
  nopass: function() {
    var user_id = this.data.user.id
    wx.request({
      url: API + 'nopass_user?user_id=' + user_id,
      method: 'GET',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        console.log(res)
        wx.showModal({
          title: '提示',
          content: '确定该队员审核不通过！',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
              wx.navigateBack({
                delta: 2,
              })
            }
          }
        })
      }
    })
  }
})