var detail = require('../../../data/goodsDetail.js')
var app = getApp();
Page({
  data: {
    isShowSpace: false, //是否显示规格
    firstIndex: -1, //商品规格索引值
    commodityAttr: [],  //商品规格请求的数据
    attrValueList: [], //商品规格转换的数据
    commodityAttrName: '', //选中之后的商品规格值
    skuCount: 0, //规格数量
    buyCount: 1, //购买数量
    buyCountMax: 10, //最大购买量
    skuInfo: {
      image: '',
      name: '',
      member_price: '', //会员价
      market_price: '', //市场价
      quantity: 0, //库存
      max_buy: 0, //最大购买量
    }, //点击选择规格展示的数据
    skuInfos: {}, //点击选择规格展示的默认数据
    syncData: {} //
  },
  onLoad: function (options) {
    this.requestData();
  },
  //处理请求数据
  requestData: function () {
    var syncData = detail.detail.data.data;
    syncData.description = syncData.description.replace(/\<img/gi, '<img style="max-width:100%;height:auto" ');
    //点击选择规格展示的数据
    var skuInfo = {};
    skuInfo.image = syncData.thumb;
    skuInfo.name = syncData.name;
    skuInfo.member_price = syncData.member_price;
    skuInfo.market_price = syncData.market_price;
    skuInfo.quantity = syncData.quantity;
    skuInfo.max_buy = syncData.max_buy;
    // 商品规格操作
    this.setData({
      skuInfo: skuInfo,
      skuInfos: skuInfo,
      syncData: syncData,
      includeGroup: syncData.commodityAttr,
      commodityAttr: syncData.commodityAttr
    });
    this.distachAttrValue(this.data.commodityAttr);
    // 只有一个属性组合的时候默认选中
    if (this.data.commodityAttr.length == 1) {
      for (var i = 0; i < this.data.commodityAttr[0].attrValueList.length; i++) {
        this.data.attrValueList[i].selectedValue = this.data.commodityAttr[0].attrValueList[i].attrValue;
      }
      this.setData({
        attrValueList: this.data.attrValueList
      });
    }
  },
  //切换显示规格
  switchSpace: function () {
    this.setData({ isShowSpace: !this.data.isShowSpace });
  },
  //禁止滚动穿透
  touchMove: function () {
    return;
  },
  //减商品数量
  countMinus: function (e) {
    var buyCount = this.data.buyCount;
    if (buyCount <= 1) {
      return;
    } else {
      buyCount--;
      this.setData({
        'buyCount': buyCount
      });
    }
  },
  //加商品数量
  countAdd: function (e) {
    var buyCount = this.data.buyCount;
    var buyCountMax = this.data.buyCountMax;
    if (buyCount >= buyCountMax) {
      wx.showToast({
        title: '已超出最大购买量',
        icon: 'none'
      });
      return;
    }
    buyCount++;
    this.setData({
      'buyCount': buyCount
    });
  },
  //输入商品数量
  buyCountInp: function (e) {
    var val = e.detail.value;
    var buyCount = this.data.buyCount;
    var buyCountMax = this.data.buyCountMax;
    if (val == '' || val == 0) {
      buyCount = 1;
    }
    else if (val >= buyCountMax) {
      buyCount = buyCountMax;
      wx.showToast({
        title: '已超出最大购买量',
        icon: 'none'
      });
    }
    else {
      buyCount = Number(val);
    }
    //更新数据
    this.setData({
      'buyCount': buyCount
    });
  },
  //提交
  submit: function (e) {
    if (!this.data.isShowSpace) {
      this.switchSpace();
      return;
    }
    var type = e.currentTarget.dataset.type;
    var value = [];
    for (var i = 0; i < this.data.attrValueList.length; i++) {
      if (!this.data.attrValueList[i].selectedValue) {
        break;
      }
      value.push(this.data.attrValueList[i].selectedValue);
    }
    if (i < this.data.attrValueList.length) {
      wx.showToast({
        title: '请选择商品属性',
        icon: 'none'
      });
    } else {
      wx.showToast({
        title: this.data.commodityAttrName,
        icon: 'none',
        duration: 2000
      });
    }
  },
  // //预览图片
  // previewImage: function (e) {
  //   var current = e.target.dataset.src;

  //   wx.previewImage({
  //     current: current, // 当前显示图片的http链接  
  //     urls: this.data.imgUrls // 需要预览的图片http链接列表  
  //   })
  // },
  // // 收藏
  // addLike() {
  //   this.setData({
  //     isLike: !this.data.isLike
  //   });
  // },
  // // 跳到购物车
  // toCar() {
  //   wx.switchTab({
  //     url: '/pages/cart/cart'
  //   })
  // }
  /* 选择规格逻辑操作 */
  /* 获取数据 */
  distachAttrValue: function (commodityAttr) {
    var attrValueList = this.data.attrValueList;
    // 遍历获取的数据
    for (var i = 0; i < commodityAttr.length; i++) {
      for (var j = 0; j < commodityAttr[i].attrValueList.length; j++) {
        var attrIndex = this.getAttrIndex(commodityAttr[i].attrValueList[j].attrKey, attrValueList);
        // 如果还没有属性索引为-1，此时新增属性并设置属性值数组的第一个值；索引大于等于0，表示已存在的属性名的位置
        if (attrIndex >= 0) {
          // 如果属性值数组中没有该值，push新值；否则不处理
          if (!this.isValueExist(commodityAttr[i].attrValueList[j].attrValue, attrValueList[attrIndex].attrValues)) {
            attrValueList[attrIndex].attrValues.push(commodityAttr[i].attrValueList[j].attrValue);
          }
        } else {
          attrValueList.push({
            attrKey: commodityAttr[i].attrValueList[j].attrKey,
            attrValues: [commodityAttr[i].attrValueList[j].attrValue]
          });
        }
      }
    }
    for (var i = 0; i < attrValueList.length; i++) {
      for (var j = 0; j < attrValueList[i].attrValues.length; j++) {
        if (attrValueList[i].attrValueStatus) {
          attrValueList[i].attrValueStatus[j] = true;
        } else {
          attrValueList[i].attrValueStatus = [];
          attrValueList[i].attrValueStatus[j] = true;
        }
      }
    }
    this.setData({
      attrValueList: attrValueList
    });
  },
  getAttrIndex: function (attrName, attrValueList) {
    // 判断数组中的attrKey是否有该属性值
    for (var i = 0; i < attrValueList.length; i++) {
      if (attrName == attrValueList[i].attrKey) {
        break;
      }
    }
    return i < attrValueList.length ? i : -1;
  },
  isValueExist: function (value, valueArr) {
    // 判断是否已有属性值
    for (var i = 0; i < valueArr.length; i++) {
      if (valueArr[i] == value) {
        break;
      }
    }
    return i < valueArr.length;
  },
  /* 选择属性值事件 */
  selectAttrValue: function (e) {
    var attrValueList = this.data.attrValueList;
    var index = e.currentTarget.dataset.index;//属性索引
    var key = e.currentTarget.dataset.key;
    var value = e.currentTarget.dataset.value;
    if (e.currentTarget.dataset.status || index == this.data.firstIndex) {
      if (e.currentTarget.dataset.selectedvalue == e.currentTarget.dataset.value) {
        // 取消选中
        this.disSelectValue(attrValueList, index, key, value);
      } else {
        // 选中
        this.selectValue(attrValueList, index, key, value);
      }

    }
  },
  /* 选中 */
  selectValue: function (attrValueList, index, key, value, unselectStatus) {
    var includeGroup = [];
    // 如果是第一个选中的属性值，则该属性所有值可选
    if (index == this.data.firstIndex && !unselectStatus) {
      var commodityAttr = this.data.commodityAttr;
      // 其他选中的属性值全都置空
      for (var i = 0; i < attrValueList.length; i++) {
        for (var j = 0; j < attrValueList[i].attrValues.length; j++) {
          attrValueList[i].selectedValue = '';
        }
      }
    } else {
      var commodityAttr = this.data.includeGroup;
    }
    for (var i = 0; i < commodityAttr.length; i++) {
      for (var j = 0; j < commodityAttr[i].attrValueList.length; j++) {
        if (commodityAttr[i].attrValueList[j].attrKey == key && commodityAttr[i].attrValueList[j].attrValue == value) {
          includeGroup.push(commodityAttr[i]);
        }
      }
    }
    attrValueList[index].selectedValue = value;
    // 判断属性是否可选
    for (var i = 0; i < attrValueList.length; i++) {
      for (var j = 0; j < attrValueList[i].attrValues.length; j++) {
        attrValueList[i].attrValueStatus[j] = false;
      }
    }
    for (var k = 0; k < attrValueList.length; k++) {
      for (var i = 0; i < includeGroup.length; i++) {
        for (var j = 0; j < includeGroup[i].attrValueList.length; j++) {
          if (attrValueList[k].attrKey == includeGroup[i].attrValueList[j].attrKey) {
            for (var m = 0; m < attrValueList[k].attrValues.length; m++) {
              if (attrValueList[k].attrValues[m] == includeGroup[i].attrValueList[j].attrValue) {
                attrValueList[k].attrValueStatus[m] = true;
              }
            }
          }
        }
      }
    }
    this.setData({
      attrValueList: attrValueList,
      includeGroup: includeGroup
    });
    var count = 0;
    for (var i = 0; i < attrValueList.length; i++) {
      for (var j = 0; j < attrValueList[i].attrValues.length; j++) {
        if (attrValueList[i].selectedValue) {
          count++;
          break;
        }
      }
    }
    // 第一次选中，同属性的值都可选
    if (count < 2) {
      this.setData({
        firstIndex: index
      });
    } else {
      this.setData({
        firstIndex: -1
      });
    }
    this.getStock();
  },
  /* 取消选中 */
  disSelectValue: function (attrValueList, index, key, value) {
    var commodityAttr = this.data.commodityAttr;
    attrValueList[index].selectedValue = '';
    // 判断属性是否可选
    for (var i = 0; i < attrValueList.length; i++) {
      for (var j = 0; j < attrValueList[i].attrValues.length; j++) {
        attrValueList[i].attrValueStatus[j] = true;
      }
    }
    this.setData({
      includeGroup: commodityAttr,
      attrValueList: attrValueList
    });
    for (var i = 0; i < attrValueList.length; i++) {
      if (attrValueList[i].selectedValue) {
        this.selectValue(attrValueList, i, attrValueList[i].attrKey, attrValueList[i].selectedValue, true);
      }
    }
    this.getStock();
  },
  // 获取库存等信息
  getStock: function () {
    var value = [];
    for (var i = 0; i < this.data.attrValueList.length; i++) {
      if (!this.data.attrValueList[i].selectedValue) {
        break;
      }
      value.push(this.data.attrValueList[i].selectedValue);
    }
    //规格全部选择之后的操作
    if (i >= this.data.attrValueList.length) {
      value = value.join(",");
      for (var j = 0; j < this.data.commodityAttr.length; j++) {
        if (this.data.commodityAttr[j].merge_attribute_value_name == value) {
          this.data.skuInfo.image = this.data.commodityAttr[j].image;
          this.data.skuInfo.member_price = this.data.commodityAttr[j].member_price;
          this.data.skuInfo.market_price = this.data.commodityAttr[j].market_price;
          this.data.skuInfo.quantity = this.data.commodityAttr[j].quantity;
          this.setData({
            skuInfo: this.data.skuInfo,
            commodityAttrName: this.data.commodityAttr[j].name
          });
        }
      }
    }
    else {
      this.setData({
        skuInfo: this.data.skuInfos,
        commodityAttrName: ''
      });
    }
  }
})