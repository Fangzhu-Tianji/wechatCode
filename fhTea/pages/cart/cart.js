Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: false,
    items: [],
    startX: 0, //开始坐标
    startY: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  aaaa: function () {
    this.setData({ active: !this.data.active });
  },
  //手指触摸动作开始 记录起点X坐标
  // touchstart: function (e) {
  //   //开始触摸时 重置所有删除
  //   this.data.items.forEach(function (v, i) {
  //     if (v.isTouchMove)//只操作为true的
  //       v.isTouchMove = false;
  //   })
  //   this.setData({
  //     startX: e.changedTouches[0].clientX,
  //     startY: e.changedTouches[0].clientY,
  //     items: this.data.items
  //   })
  // },
  //滑动事件处理
  touchmove: function (e) {
    console.log(e)
    var that = this,
      startX = that.data.startX,//开始X坐标
      startY = that.data.startY,//开始Y坐标
      touchMoveX = e.changedTouches[0].clientX,//滑动变化坐标
      touchMoveY = e.changedTouches[0].clientY,//滑动变化坐标
      //获取滑动角度
      angle = that.angle({ X: startX, Y: startY }, { X: touchMoveX, Y: touchMoveY });
    if (Math.abs(angle) > 30) return;
    if (touchMoveX > startX) {
      console.log(222)
      this.setData({ active: true });
    }
    
    else {
      this.setData({ active: false });
    }
      
  },
  /**
   * 计算滑动角度
   * @param {Object} start 起点坐标
   * @param {Object} end 终点坐标
   */
  angle: function (start, end) {
    var _X = end.X - start.X,
      _Y = end.Y - start.Y
    //返回角度 /Math.atan()返回数字的反正切值
    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
  }
})