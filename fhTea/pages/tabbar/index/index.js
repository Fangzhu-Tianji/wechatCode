//index.js
//获取应用实例
var util = require('../../../utils/util.js');
var app = getApp();

Page({
  data: {
    city: '',
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ]
  },
  onLoad: function () {
    // util.T.ajaxPostLoading('http://fh.22um.com/index.php/index/index/index', {aa:333}, function (r) {
    //   console.log(r);
    // })
    var _this = this;
    //获取地理信息
    wx.getLocation({
      success: function(res) {
        _this.loadCity(res.longitude, res.latitude)
      },
    })
    //设置tabbar角标
    wx.setTabBarBadge({
      index: 2,
      text: '1'
    })
  },
  //上拉加载更多
  onReachBottom: function () {
    console.log('到底部了');
  },
  goDetail: function () {
    wx.navigateTo({
      url: '/pages/goods/detail/detail'
    })
  },
  //百度地图获取城市列表
  loadCity: function (longitude, latitude) {
    var _this = this
    wx.request({
      url: 'https://api.map.baidu.com/geocoder/v2/?ak=GaVuWcSAEfDWASQriGF2mlcVs54d9nI2&location=' + latitude + ',' + longitude + '&output=json',
      data: {},
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        var city = res.data.result.addressComponent.city;
        _this.setData({ city: city });
      },
      fail: function () {
        _this.setData({ city: "定位失败" });
      },

    })
  }
})
