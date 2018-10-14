var data = require('../../../json/data.js');
Page({
  data: {
    upLoading: 0, //是否显示上拉加载
    page: 1, //分页的页数
    total_pages: 3, //总分页数
    pic: data.photo1,
    scrollTop: {
      goTop: true,
      top: 0
    }
  },
  onLoad: function (options) {
  },
  // 预览图片
  previewImage: function(e){
    wx.previewImage({
      current: e.target.dataset.src,
      urls: this.data.pic
    })
  },
  // 回到顶部
  goTop: function(){
    wx.pageScrollTo({
      scrollTop: 0
    })
  },
  // 获取滚动高度
  onPageScroll: function (e) {
    var top = e.scrollTop;
    if(top > 300){
      this.setData({
        "scrollTop.goTop": true
      })
    }
    else {
      this.setData({
        "scrollTop.goTop": false
      })
    }
    this.setData({
      "scrollTop.top": top
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var _this = this;
    _this.data.page++;
    //如果只有一页就不显示分页
    if (_this.data.total_pages == 1) {
      return;
    }
    if (_this.data.page > _this.data.total_pages) {
      //重置上拉加载
      _this.setData({
        upLoading: 2
      })
    }
    else {
      _this.setData({
        upLoading: 1
      })
      setTimeout(function () {
        var a = 'photo' + _this.data.page;
        _this.setData({
          pic: _this.data.pic.concat(data[a])
        })
      }, 1000);
    }
  }
})