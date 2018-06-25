// pages/movies/movies.js
var util = require('../../utils/util.js')
var app = getApp();
Page({
  data: {
    inTheaters: {},
    comingSoon: {},
    top250: {}
  },
  onLoad: function (options) {
    var baseUrl = app.globalData.doubanBase;
    var inTheatersUrl = baseUrl + '/v2/movie/in_theaters?start=0&count=3';
    var comingSoonUrl = baseUrl + '/v2/movie/coming_soon?start=0&count=3';
    var top250Url = baseUrl + '/v2/movie/top250?start=0&count=3';
    this.getMovieListData(inTheatersUrl, 'inTheaters');
    this.getMovieListData(comingSoonUrl, 'comingSoon');
    this.getMovieListData(top250Url, 'top250');
  },
  // 更多页面
  onMoreTap: function(event) {
    var category = event.currentTarget.dataset.category;
    wx.navigateTo({
      url: 'more-movie/more-movie?category=' + category
    })
  },
  // 搜索页面
  onSearchTap: function() {
    wx.navigateTo({
      url: 'movie-search/movie-search'
    })
  },
  // 进入电影详情
  onMovieTap: function (event) {
    var movieid = event.currentTarget.dataset.movieid;
    wx.navigateTo({
      url: 'movie-detail/movie-detail?id=' + movieid
    })
  },
  // 数据请求
  getMovieListData: function (url, categoryTitle) {
    var that = this;
    wx.request({
      url: url,
      method: 'GET',
      header: {
        "Content-Type": "application"
      },
      success: function (res) {
        that.processDoubanData(res.data, categoryTitle);
      }
    })
  },
  // 请求后的数据进行处理
  processDoubanData: function (movieDouban, categoryTitle) {
    var movies = [];
    var subject = movieDouban.subjects;
    for (var sub in subject) {
      var title = subject[sub].title;
      if(title.length >= 6) {
        title = title.substring(0,6) + '...';
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
    // 动态设置数据，技巧，牢记
    var readyData = {};
    readyData[categoryTitle] = movies;
    this.setData(readyData);
  }
})