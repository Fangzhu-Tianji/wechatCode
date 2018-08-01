// pages/category/category.js
var util = require('../../utils/util.js')
var app = getApp();
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
    console.log(util)
  },
  //点击扫码
  onSweep: function () {
    wx.scanCode({
      success: function (res) {
        wx.showToast({
          title: res.result,
          icon: 'none'
        });
      }
    })
  },
  //进入搜索页
  onSearchTap: function () {
    wx.navigateTo({
      url: '../search/search/search'
    })
  }
})