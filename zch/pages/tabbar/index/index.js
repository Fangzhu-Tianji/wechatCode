var indexData = require("../../../json/data.js");
Page({
  data: {
    imgUrls: [
      '/images/banner-2.jpg',
      '/images/banner-1.jpg',
      '/images/banner-3.jpg'
    ],
    contentItem: ['', '', '', ''],
    listItem: ['', '', '', '']
  },
  onLoad: function (options) {
    this.setData({
      contentItem: indexData.indexGood
    })
    this.setData({
      listItem: indexData.indexHot
    })
    //自定义组件弹框
    this.dialog = this.selectComponent("#dialog");
  },
  // 全部爆款
  hotAll: function () {
    this.dialog.showDialog();
  },
  // 自定义组件dialog点击确定
  _confirmEvent: function () {
    console.log('进入爆款页面');
    this.dialog.hideDialog();
  },
  //点击旅游攻略
  goTour: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/tour/tour1/tour'
    })
  },
  // 转发分享
  onShareAppMessage: function (res) {
    return {
      title: '首页',
      path: '/pages/tabbar/index/index',
      imageUrl: '/images/transmit-img.jpg',
      success: function (res) {
        // 转发成功
        console.log(res)
      },
      fail: function (res) {
        // 转发失败
        console.log(res)
      }
    }
  }
})