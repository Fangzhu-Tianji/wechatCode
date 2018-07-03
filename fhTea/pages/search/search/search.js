// pages/search/search/search.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    showClear: false, //是否显示清除按钮
    searchVal: '' //搜索的结果
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  // 点击输入框
  onTapInput: function (event) {
    console.log(event.detail.value);
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
    console.log(this.data.searchVal);
  },
  // 点击搜索
  goSearch: function (event) {
    wx.showNavigationBarLoading(); //显示加载菊花
    console.log(event.detail.value);
    wx.hideNavigationBarLoading(); //隐藏加载菊花
  }
})