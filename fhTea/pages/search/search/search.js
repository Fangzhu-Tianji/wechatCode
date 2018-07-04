// pages/search/search/search.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    showClear: false, //是否显示清除按钮
    cacheData: [], //缓存搜索数据
    searchVal: '' //搜索的结果
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var searchNote = wx.getStorageSync('searchNote');
    if (searchNote) {
      this.setData({
        cacheData: searchNote.split("-")
      });
    }
  },
  // 点击输入框
  onTapInput: function (event) {
    this.setData({
      searchVal: event.detail.value
    });
    if (event.detail.value == "") {
      this.setData({
        showClear: false
      });
    }
    else {
      this.setData({
        showClear: true
      });
    }
  },
  // 清除输入框
  clearInput: function () {
    this.setData({
      showClear: false,
      searchVal: ''
    });
  },
  // 清除搜索记录
  clearSearch: function () {
    var that = this;
    if (that.data.cacheData.length != 0) {
      wx.showModal({
        title: '提示',
        content: '确定清除历史记录？',
        success: function (res) {
          if (res.confirm) {
            that.setData({
              cacheData: []
            });
            wx.removeStorageSync('searchNote');
            wx.showToast({
              title: '清除成功',
              icon: 'none'
            });
          }
        }
      })
    }
  },
  // 点击搜索
  goSearch: function (event) {
    var that = this;
    var content = event.detail.value;
    if (!content) {
      wx.showToast({
        title: '请输入搜索内容',
        icon: 'none'
      });
      return false;
    }
    //缓存数据,判断是否重复缓存
    var isEcho = 1;
    for (var i = 0; i < that.data.cacheData.length; i++) {
      if (content == that.data.cacheData[i]) {
        isEcho = 0;
      }
    }
    if (isEcho) {
      that.data.cacheData.unshift(content);
      that.setData({
        cacheData: that.data.cacheData
      });
    }
    var search = that.data.cacheData.join("-");
    wx.setStorageSync("searchNote", search);

    wx.showNavigationBarLoading(); //显示加载菊花
    wx.hideNavigationBarLoading(); //隐藏加载菊花
  }
})