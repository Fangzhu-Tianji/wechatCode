var postsData = require('../../../data/posts-data.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentPostId: 0,
    isPlayingMusic: false //是否进行背景音乐播放
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 上一页面传输的数据
    this.data.currentPostId = options.id;
    var postId = options.id;
    // 获取app.js公共的数据
    var globalData = app;
    // 设置数据
    var postData = postsData.postList[postId];
    this.setData({
      postData: postData
    });
    // 设置标题
    wx.setNavigationBarTitle({
      title: postData.title
    })
    // 收藏读取或者设置本地缓存
    var postsCollected = wx.getStorageSync('posts_collected');
    if (postsCollected) {
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
  // 收藏
  onColletionTap: function (event) {
    var that = this;
    // 先读取本地缓存再设置本地缓存
    var postsCollected = wx.getStorageSync('posts_collected');
    var postCollected = postsCollected[that.data.currentPostId];
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
          postsCollected[that.data.currentPostId] = !postsCollected[that.data.currentPostId];
          wx.setStorageSync('posts_collected', postsCollected);
          // 更新数据绑定变量，从而实现切换图片
          that.setData({
            collected: !postCollected
          })
        }
      }
    })
  },
  // 分享
  onShareTap: function (event) {
    var a = wx.getStorageSync('posts_collted');
    var itemList = [
      '分享给微信好友',
      '分享到朋友圈',
      '分享到QQ',
      '分享到微博'
    ];
    wx.showActionSheet({
      itemList: itemList,
      itemColor: '#405f80',
      success: function(res) {
        // res.cancel 用户是不是点击了取消按钮
        // res.tapIndex 数组元素的序号，从0开始
        wx.showToast({
          title: "用户 " + itemList[res.tapIndex],
          icon: 'success'
        })
      }
    })
  },
  // 播放音乐
  onMusicTap: function(event) {
    var currentPostId = this.data.currentPostId;
    var postData = postsData.postList[currentPostId];
    var isPlayingMusic = this.data.isPlayingMusic;
    if (isPlayingMusic) {
      wx.pauseBackgroundAudio();
      this.setData({
        isPlayingMusic: false
      })
    }
    else {
      wx.playBackgroundAudio({
        dataUrl: postData.music.url,
        title: postData.music.title,
        coverImgUrl: postData.music.coverImg
      });
      this.setData({
        isPlayingMusic: true
      })

    }
  }

})