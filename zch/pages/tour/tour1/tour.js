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
      dataUrl: 'http://mp3file.mafengwo.net/201810252131/88ed8ca03f6058046bd3f4e15250dd17/s5/M00/1C/2C/wKgB3FCkRdaABP1rAD2RzZolouU532.mp3'
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
        dataUrl: 'http://mp3file.mafengwo.net/201810252131/88ed8ca03f6058046bd3f4e15250dd17/s5/M00/1C/2C/wKgB3FCkRdaABP1rAD2RzZolouU532.mp3'
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