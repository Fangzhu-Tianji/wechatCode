// pages/category/category.js
var util = require('../../../utils/util.js')
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    switchItem: true, //切换排列方式
    showShades: false, //是否显示筛选内容
    contentItemId: 0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(util)
  },
  //点击切换排列结构
  onSwitch: function () {
    this.setData({ switchItem: !this.data.switchItem });
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
      url: '../../search/search/search'
    })
  },
  //显示筛选遮罩
  switchShade: function () {
    this.setData({ showShades: !this.data.showShades });
  },
  //禁止滚动穿透
  touchMove: function () {
    return;
  },
  //上拉加载更多
  onReachBottom: function () {
    console.log('到底部了');
  },
  //点击筛选请求数据
  requestData: function (event) {
    var _this = this;
    var id = event.currentTarget.dataset.id;
    if (id == _this.data.contentItemId) {
      _this.setData({ contentItemId: 0 });
    }
    else {
      _this.setData({ contentItemId: event.currentTarget.dataset.id });
    }
    setTimeout(function () {
      _this.switchShade();
    }, 200)
  }
})