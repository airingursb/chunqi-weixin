var API = require('../../../../utils/config').API;

Page({
  data: {},
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
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
  sexChange: function (e) {
    this.setData({
      sex: e.detail.value
    })
  },
  sizeChange: function (e) {
    this.setData({
      shit_size: e.detail.value
    })
  },
  inputName: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  inputIdCard: function (e) {
    this.setData({
      id_card: e.detail.value
    })
  },
  inputPhone: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  inputSosName: function (e) {
    this.setData({
      sos_name: e.detail.value
    })
  },
  inputSosPhone: function (e) {
    this.setData({
      sos_phone: e.detail.value
    })
  },
  inputLike: function (e) {
    this.setData({
      like: e.detail.value
    })
  },
  inputWork: function (e) {
    this.setData({
      work: e.detail.value
    })
  },
  join: function () {
    if (this.data.name == '' || this.data.name == undefined
      || this.data.id_card == '' || this.data.id_card == undefined
      || this.data.phone == '' || this.data.phone == undefined
      || this.data.sex == '' || this.data.sex == undefined
      || this.data.shit_size == '' || this.data.shit_size == undefined
      || this.data.sos_name == '' || this.data.sos_name == undefined
      || this.data.sos_phone == '' || this.data.sos_phone == undefined
      || this.data.like == '' || this.data.like == undefined
      || this.data.work == '' || this.data.work == undefined) {
      wx.showModal({
        title: '提示',
        content: '请填完信息表！',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      })


    } else {
      wx.request({
        url: API + 'add_manager?name=' + this.data.name + '&phone=' + this.data.phone + '&id_card=' + this.data.id_card + '&sex=' + this.data.sex + '&shit_size=' + this.data.shit_size + '&sos_name=' + this.data.sos_name + '&sos_phone=' + this.data.sos_phone + '&like=' + this.data.like + '&work=' + this.data.work + '&share_id=' + wx.getStorageSync('share_id') + '&nick_name=' + wx.getStorageSync('nick_name') + '&face_url=' + wx.getStorageSync('face_url'),
        data: {},
        method: 'GET',
        success: function (res) {
          console.log(res)
          wx.setStorageSync('team_id', res.data.data.teamId)
          wx.showModal({
            title: '提示',
            content: '创建成功！！',
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
        },
        fail: function () {
        },
        complete: function () {
        }
      })
    }
  },
})