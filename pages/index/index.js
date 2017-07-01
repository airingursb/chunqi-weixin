Page({
  onTap: function (event) {
    // wx.navigateTo({
    //     url:"../posts/post"
    // });

    wx.switchTab({
      url: "../team/team"
    });

  }
})