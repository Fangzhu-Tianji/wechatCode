// pages/movies/movie-search/movie-search.js
var util = require('../../../utils/util.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies: [], //渲染的数据
    showGoTop: false, //是否显示返回顶部
    totalCount: 0, //页数
    searchVal: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  // 点击搜索
  goSearch: function (event) {
    wx.showNavigationBarLoading(); //显示加载菊花
    this.data.movies = [];
    this.data.totalCount = 0;
    this.data.searchVal = event.detail.value;
    util.http(app.globalData.doubanBase + "/v2/movie/search?q=" + event.detail.value, this.processDoubanData);
  },
  // 请求后的数据进行处理
  processDoubanData: function (movieDouban) {
    var movies = [];
    var subject = movieDouban.subjects;
    for (var sub in subject) {
      var title = subject[sub].title;
      if (title.length >= 6) {
        title = title.substring(0, 6) + '...';
      }
      var temp = {
        stars: util.convertToStarsArray(subject[sub].rating.stars),
        title: title,
        average: subject[sub].rating.average,
        coverageUrl: subject[sub].images.large,
        movieId: subject[sub].id,
      }
      movies.push(temp);
    }
    this.setData({
      movies: this.data.movies.concat(movies)
    });
    this.data.totalCount += 1;
    wx.hideNavigationBarLoading(); //隐藏加载菊花
  },
  // 上拉加载更多
  onReachBottom: function () {
    wx.showNavigationBarLoading(); //显示加载菊花
    util.http(app.globalData.doubanBase + "/v2/movie/search?q=" + this.data.searchVal + '&start=' + this.data.totalCount * 20 + '&count=20', this.processDoubanData);
  },
  // 获取滚动距离
  handletouchmove: function () {
    var that = this;
    var query = wx.createSelectorQuery();
    query.select('#header').boundingClientRect();
    query.selectViewport().scrollOffset();
    query.exec(function (res) {
      if (res[1].scrollTop > 600) {
        that.setData({
          showGoTop: true
        })
      }
      else {
        that.setData({
          showGoTop: false
        })
      }
    })
  },
  // 返回顶部
  backToTop: function () {
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300
    })
    // 隐藏回到顶部按钮
    this.setData({
      showGoTop: false
    })
  }
})