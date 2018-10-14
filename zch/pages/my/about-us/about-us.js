Page({
  data: {
  },
  onLoad: function () {
  },
  //预览二维码
  previewCode: function () {
    wx.previewImage({
      current: 'http://pddo1sy32.bkt.clouddn.com/wx-code.jpg',
      urls: ['http://pddo1sy32.bkt.clouddn.com/wx-code.jpg'] 
    })
  }
})
