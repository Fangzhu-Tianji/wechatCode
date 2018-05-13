var postsData = require('../../../data/posts-data.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentPostId: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.currentPostId = options.id;
    var postId = options.id;
    var postData = postsData.postList[postId];
    this.setData({
      postData: postData
    });
    var postsCollected = wx.getStorageSync('posts_collected');
    if (postsCollected == undefined) {
      this.setData({
        collected: postsCollected[postId]
      })
    }
    else {
      var postsCollected = {};
      postsCollected[postId] = false;
      wx.setStorageSync('posts_collected', postsCollected);
    }
  },
  onColletionTap: function (event) {
    var that = this;
    var postsCollected = wx.getStorageSync('posts_collected');
    var postCollected = postsCollected[that.data.currentPostId];
    postsCollected[that.data.currentPostId] = !postsCollected[that.data.currentPostId];
    wx.showModal({
      title: '收藏',
      content: postsCollected[that.data.currentPostId] ? '取消收藏该文章？' : '收藏该文章？',
      showCancel: "true",
      cancelText: "取消",
      cancelColor: "#333",
      confirmText: "确认",
      confirmColor: "#405f80",
      success: function (res) {
        if (res.confirm) {
          wx.setStorageSync('posts_collected', postsCollected);
          // 更新数据绑定变量，从而实现切换图片
          that.setData({
            collected: !postCollected
          })
        }
      }
    })
  },
  onShareTap: function (event) {
    var a = wx.getStorageSync('posts_collted');
    console.log(a)
  }

})