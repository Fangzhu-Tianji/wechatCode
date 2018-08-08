var detail = require('../../../data/goodsDetail.js')
var app = getApp();
Page({
  data: {
    isShowSpace: false, //是否显示规格
    spaceSku: [], //选中的规格sku
    syncData: {
      // banner
      imgUrls: [
        "http://mz.djmall.xmisp.cn/files/product/20161201/148057921620_middle.jpg",
        "http://mz.djmall.xmisp.cn/files/product/20161201/148057922659_middle.jpg",
        "http://mz.djmall.xmisp.cn/files/product/20161201/148057923813_middle.jpg",
        "http://mz.djmall.xmisp.cn/files/product/20161201/148057924965_middle.jpg",
        "http://mz.djmall.xmisp.cn/files/product/20161201/148057925958_middle.jpg"
      ],
      // 商品详情介绍
      detailImg: [
        "http://7xnmrr.com1.z0.glb.clouddn.com/detail_1.jpg",
        "http://7xnmrr.com1.z0.glb.clouddn.com/detail_2.jpg",
        "http://7xnmrr.com1.z0.glb.clouddn.com/detail_3.jpg",
        "http://7xnmrr.com1.z0.glb.clouddn.com/detail_4.jpg",
        "http://7xnmrr.com1.z0.glb.clouddn.com/detail_5.jpg",
        "http://7xnmrr.com1.z0.glb.clouddn.com/detail_6.jpg",
      ]
    }
  },
  onLoad: function (options) {
    this.requestData();
  },
  //处理请求数据
  requestData: function () {
    var syncData = detail.detail.data.data;
    var sku_info = syncData.sku_info;
    var attribute_info = syncData.attribute_info;
    for (var i in sku_info) {
      for (var j = 0; j < sku_info[i].value.length; j++) {
        var isActive = false;
        for (var k in attribute_info) {
          var a = k.split(',');
          for (var l = 0; l < a.length; l++) {
            if (a[l] == sku_info[i].value[j].id) {
              isActive = true;
            }
          }
        }
        if (isActive) {
          sku_info[i].value[j].type = 'disabled';
        }
        else {
          sku_info[i].value[j].type = 'disabled';
        }
      }
    }
    this.setData({ syncData: syncData });
    console.log(syncData)
  },
  //切换显示规格
  switchSpace: function () {
    this.setData({ isShowSpace: !this.data.isShowSpace });
  },
  //禁止滚动穿透
  touchMove: function () {
    return;
  },
  //点击规格
  chooseSku: function (e) {
    var _this = this;
    var index = e.currentTarget.dataset.index;
    var indexdetail = e.currentTarget.dataset.indexdetail;
    console.log(_this.data.syncData.sku_info[index].value[indexdetail].id)
    // if (_this.syncData.sku_info[index].value[indexdetail].id)
  },
  //预览图片
  previewImage: function (e) {
    var current = e.target.dataset.src;

    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls: this.data.imgUrls // 需要预览的图片http链接列表  
    })
  },
  // 收藏
  addLike() {
    this.setData({
      isLike: !this.data.isLike
    });
  },
  // 跳到购物车
  toCar() {
    wx.switchTab({
      url: '/pages/cart/cart'
    })
  },
  // 立即购买
  immeBuy() {
    wx.showToast({
      title: '购买成功',
      icon: 'success',
      duration: 2000
    });
  },
})