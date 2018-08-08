Page({
  data: {
    startX: 0, //开始坐标
    startY: 0,
    isCheckAll: false, //是否全选
    countAll: 0, //总数量
    priceAll: '0.00', //总价钱
    switchEdit: true,
    goodList: [
      {
        'name': '孤独是生命的礼物1',
        'author': '200KG',
        'cover': 'https://bsoss.oss-cn-hangzhou.aliyuncs.com/goods/201805/20180526123850_6554.JPG',
        'price': '25.00',
        'count': 1,
        'isTouchMove': false,
        'checked': false
      },
      {
        'name': '孤独是生命的礼物2',
        'author': '200KG',
        'cover': 'https://bsoss.oss-cn-hangzhou.aliyuncs.com/goods/201805/20180526123850_6554.JPG',
        'price': 25.94,
        'count': 1,
        'isTouchMove': false,
        'checked': false
      },
      {
        'name': '孤独是生命的礼物3',
        'author': '200KG',
        'cover': 'https://bsoss.oss-cn-hangzhou.aliyuncs.com/goods/201805/20180526123850_6554.JPG',
        'price': 29.94,
        'count': 1,
        'isTouchMove': false,
        'checked': false
      },
      {
        'name': '孤独是生命的礼物4',
        'author': '200KG',
        'cover': 'https://bsoss.oss-cn-hangzhou.aliyuncs.com/goods/201805/20180526123850_6554.JPG',
        'price': 29.94,
        'count': 1,
        'isTouchMove': false,
        'checked': false
      },
      {
        'name': '孤独是生命的礼物5',
        'author': '200KG',
        'cover': 'https://bsoss.oss-cn-hangzhou.aliyuncs.com/goods/201805/20180526123850_6554.JPG',
        'price': 29.94,
        'count': 1,
        'isTouchMove': false,
        'checked': false
      },
      {
        'name': '孤独是生命的礼物6',
        'author': '200KG',
        'cover': 'https://bsoss.oss-cn-hangzhou.aliyuncs.com/goods/201805/20180526123850_6554.JPG',
        'price': 29.94,
        'count': 1,
        'isTouchMove': false,
        'checked': false
      }
    ] 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  onShow: function () {
    console.log(22222)
  },
  //编辑，完成
  edit: function () {
    this.setData({
      switchEdit: !this.data.switchEdit
    });
  },
  //减商品数量
  goodsMinus: function (e) {
    var index = e.target.dataset.index;
    var goodList = this.data.goodList;
    if (goodList[index].count <= 1) {
      return;
    } else {
      goodList[index].count--;
      this.setData({
        'goodList': goodList
      });
      this.countAll();
    }
  },
  //加商品数量
  goodsAdd: function (e) {
    var index = e.target.dataset.index;
    var goodList = this.data.goodList;
    goodList[index].count++;
    this.setData({
      'goodList': goodList
    });
    this.countAll();
  },
  //输入商品数量
  goodsInp: function (e) {
    var index = e.target.dataset.index;
    var val = e.detail.value;
    var goodList = this.data.goodList;
    if (val == '' || val == 0) {
      goodList[index].count = 1;
    }
    else {
      goodList[index].count = Number(val);
    }
    //更新数据
    this.setData({
      'goodList': goodList
    });
    this.countAll();
  },
  //单选
  checkChange: function (e) {
    var _this = this;
    var index = e.currentTarget.dataset.index;
    var checkboxItems = _this.data.goodList;
    var checkAll = true;
    var checkbox = _this.data.goodList[index]['checked'];
    _this.data.goodList[index]['checked'] = !checkbox;
    //更新数据
    _this.setData({
      goodList: _this.data.goodList
    })
    //判断是否是全选
    for (var i = 0; i < checkboxItems.length; i++) {
      if (!checkboxItems[i].checked) {
        checkAll = false;
      }
    }
    if (checkAll) {
      _this.setData({
        isCheckAll: true
      })
    }
    else {
      _this.setData({
        isCheckAll: false
      })
    }
    _this.countAll();
  },
  //全选
  checkChangeAll: function () {
    var _this = this;
    var checkboxItems = _this.data.goodList;
    var isCheck = false;
    _this.data.isCheckAll ? isCheck = false : isCheck = true;
    for (var i = 0; i < checkboxItems.length; i++) {
      checkboxItems[i].checked = isCheck;
    }
    //更新数据
    _this.setData({
      goodList: _this.data.goodList,
      isCheckAll: !_this.data.isCheckAll
    })
    _this.countAll();
  },
  //单删除事件
  delSingle: function (e) {
    var _this = this;
    wx.showModal({
      content: '确定删除吗？',
      confirmColor: "#f60500",
      success: function (res) {
        if (res.confirm) {
          _this.data.goodList.splice(e.currentTarget.dataset.index, 1);
          _this.setData({
            goodList: _this.data.goodList
          })
        }
        else if (res.cancel) {
          _this.outClose();
        }
      }
    })
  },
  //提交删除
  submitDel: function () {
    var _this = this;
    var goodList = this.data.goodList;
    if (this.data.switchEdit && this.datacountAll != 0) {
      wx.showToast({
        title: '共计：￥' + this.data.priceAll,
        icon: 'none'
      })
    }
    else if (!this.data.switchEdit && this.datacountAll != 0) {
      wx.showModal({
        content: '确定删除吗？',
        confirmColor: "#f60500",
        success: function (res) {
          if (res.confirm) {
            for (var i = goodList.length - 1; i >= 0; i--) {
              var good = goodList[i];
              if (good.checked) {
                _this.data.goodList.splice(i, 1);
              }
            }
            _this.setData({
              goodList: _this.data.goodList
            })
          }
          else if (res.cancel) {
            _this.outClose();
          }
        }
      })
    }
  },
  //计算总量
  countAll: function () {
    var goodList = this.data.goodList;
    var totalCount = 0;
    var totalPrice = 0;
    for (var i = 0; i < goodList.length; i++) {
      var good = goodList[i];
      if (good.checked) {
        totalCount += good.count;
        totalPrice += good.count * good.price;
      }
    }
    totalPrice = totalPrice.toFixed(2);
    this.setData({
      'countAll': totalCount,
      'priceAll': totalPrice
    })
  },
  //关闭删除
  outClose: function () {
    var goodList = this.data.goodList;
    for (var i = 0; i < goodList.length; i++) {
      var good = goodList[i];
      good.isTouchMove = false;
    }
    this.setData({
      'goodList': this.data.goodList
    })
  },
  //手指触摸动作开始 记录起点X坐标
  touchstart: function (e) {
    //开始触摸时 重置所有删除
    this.data.goodList.forEach(function (v, i) {
      if (v.isTouchMove)//只操作为true的
        v.isTouchMove = false;
    })
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY
    })
  },
  //滑动事件处理
  touchmove: function (e) {
    var _this = this,
      index = e.currentTarget.dataset.index,//当前索引
      startX = _this.data.startX,//开始X坐标
      startY = _this.data.startY,//开始Y坐标
      touchMoveX = e.changedTouches[0].clientX,//滑动变化坐标
      touchMoveY = e.changedTouches[0].clientY,//滑动变化坐标
      //获取滑动角度
      angle = _this.angle({ X: startX, Y: startY }, { X: touchMoveX, Y: touchMoveY });
    _this.data.goodList.forEach(function (v, i) {
      v.isTouchMove = false
      //滑动超过30度角 return
      if (Math.abs(angle) > 30) return;
      if (i == index) {
        if (touchMoveX > startX) //右滑
          v.isTouchMove = false
        else //左滑
          v.isTouchMove = true
      }
    })
    //更新数据
    _this.setData({
      goodList: _this.data.goodList
    })
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