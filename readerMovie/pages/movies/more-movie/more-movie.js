// pages/movies/more-movie/more-movie.js
var util = require('../../../utils/util.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    category: ''
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
    util.http(dataUrl, this.processDoubanData)
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
      movies: movies
    });
  }
})