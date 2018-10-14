Page({
  /**
   * 页面的初始数据
   */
  data: {
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  //进入我的相册
  goPhone: function () {
    wx.navigateTo({
      url: '/pages/my/photo/photo'
    })
  },
  //进入关于我们
  goAboutUs: function () {
    wx.navigateTo({
      url: '/pages/my/about-us/about-us'
    })
  }
})