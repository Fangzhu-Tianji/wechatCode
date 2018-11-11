// pages/tour/tour2/tour.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 弹幕
    danmuList: [
      {
        text: '第 1s 出现的弹幕',
        color: '#ff0000',
        time: 1
      },
      {
        text: '第 3s 出现的弹幕',
        color: '#ff00ff',
        time: 3
      },
      {
        text: '第 10s 出现的弹幕',
        color: '#ff00ff',
        time: 10
      }
    ],
    // 发送的弹幕
    setDanmu: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.videoContext = wx.createVideoContext('myVideo');
  },
  // 发送弹幕
  goSend: function (e) {
    var detailVal = e.detail.value;
    this.setData({
      setDanmu: ''
    })
    this.videoContext.sendDanmu({
      text: detailVal,
      color: '#ff4400'
    })
  },
  //上拉加载更多
  lower: function () {
    console.log('到底了')
  }
})