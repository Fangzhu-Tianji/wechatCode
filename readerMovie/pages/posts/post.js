var postsData =  require('../../data/posts-data.js')
// pages/posts/post.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    postList: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      postList: postsData.postList 
    })
  },
  // 列表去详情页
  goDetail: function (event) {
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + event.currentTarget.dataset.id
    })
  },
  // 轮播去详情页
  goDetailSwiper: function (event) {
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + event.target.dataset.id
    })
  }
})