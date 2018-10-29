Page({
  /**
   * 页面的初始数据
   */
  data: {
    music: 'play'
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 页面进入时音乐自动播放
    wx.playBackgroundAudio({
      dataUrl: 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46'
    })
    // 监听音乐变化
    this.setMusicMonitor();
  },
  // 设置音乐
  setMusicMonitor: function () {
    var _this = this;
    wx.onBackgroundAudioPlay(function () {
      _this.setData({
        music: 'begin_music'
      })
      setTimeout(function () {
        _this.setData({
          music: 'play'
        })
      }, 500);
    });
    wx.onBackgroundAudioPause(function () {
      _this.setData({
        music: 'pause'
      })
    });
    wx.onBackgroundAudioStop(function () {
      _this.setData({
        music: 'pause'
      })
    });
  },
  // 控制音乐
  controlMusic: function () {
    var _this = this;
    if(this.data.music == 'play') {
      this.setData({
        music: 'pause'
      })
      //暂停音乐播放
      wx.pauseBackgroundAudio();
    }
    else {
      //开始音乐播放
      wx.playBackgroundAudio({
        dataUrl: 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46'
      })
      this.setData({
        music: 'begin_music'
      })
      setTimeout(function(){
        _this.setData({
          music: 'play'
        })
      },500);
    }
  }
})