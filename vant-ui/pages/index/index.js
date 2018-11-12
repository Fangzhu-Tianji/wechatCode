Page({
  /**
   * 页面的初始数据
   */
  data: {
    active: 1
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  // tab改变了
  onChange: function (event) {
    wx.showToast({
      title: `切换到标签 ${event.detail.index + 1}`,
      icon: 'none'
    });
  }
})