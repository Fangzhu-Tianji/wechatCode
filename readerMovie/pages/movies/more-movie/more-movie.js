// pages/movies/more-movie/more-movie.js
var util = require('../../../utils/util.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies: [], //渲染的数据
    requestUrl: '', //请求的地址
    totalCount: 0 //页数
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var category = options.category;
    var dataUrl = "";//获取请求路径
    wx.setNavigationBarTitle({
      title: category
    });
    switch (category) {
      case "正在热映":
        dataUrl = app.globalData.doubanBase + "/v2/movie/in_theaters";
        break;
      case "即将上映":
        dataUrl = app.globalData.doubanBase + "/v2/movie/coming_soon";
        break;
      case "豆瓣Top250":
        dataUrl = app.globalData.doubanBase + "/v2/movie/top250";
        break;
    }
    this.data.requestUrl = dataUrl;
    util.http(dataUrl, this.processDoubanData)
  },
  // 进入电影详情
  onMovieTap: function (event) {
    var movieid = event.currentTarget.dataset.movieid;
    wx.navigateTo({
      url: '../movie-detail/movie-detail?id=' + movieid
    })
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
    wx.stopPullDownRefresh(); // 停止下拉动作 
  },
  // 上拉加载更多
  onReachBottom: function () {
    wx.showNavigationBarLoading(); //显示加载菊花
    util.http(this.data.requestUrl + '?start=' + this.data.totalCount * 20 + '&count=20', this.processDoubanData)
  },
  // 下拉刷新
  onPullDownRefresh: function() {
    wx.showNavigationBarLoading(); //显示加载菊花
    util.http(this.data.requestUrl, this.processDoubanData);
    this.data.movies = [];
    this.data.totalCount = 0;
  }
})