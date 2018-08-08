Page({
  data: {
    firstIndex: -1,
    //准备数据
    //数据结构：以一组一组来进行设定
    commodityAttr: [
      {
        "priceId": 1,
        "price": 35.0,
        "stock": 8,
        "attrValueList": [
          {
            "attrKey": "型号",
            "attrValue": "2"
          },
          {
            "attrKey": "颜色",
            "attrValue": "白色"
          },
          {
            "attrKey": "大小",
            "attrValue": "小"
          },
          {
            "attrKey": "尺寸",
            "attrValue": "S"
          }
        ]
      },
      {
        "priceId": 2,
        "price": 35.1,
        "stock": 9,
        "attrValueList": [
          {
            "attrKey": "型号",
            "attrValue": "1"
          },
          {
            "attrKey": "颜色",
            "attrValue": "黑色"
          },
          {
            "attrKey": "大小",
            "attrValue": "小"
          },
          {
            "attrKey": "尺寸",
            "attrValue": "M"
          }
        ]
      },
      {
        "priceId": 3,
        "price": 35.2,
        "stock": 10,
        "attrValueList": [
          {
            "attrKey": "型号",
            "attrValue": "1"
          },
          {
            "attrKey": "颜色",
            "attrValue": "绿色"
          },
          {
            "attrKey": "大小",
            "attrValue": "大"
          },
          {
            "attrKey": "尺寸",
            "attrValue": "L"
          }
        ]
      },
      {
        "priceId": 4,
        "price": 35.2,
        "stock": 10,
        "attrValueList": [
          {
            "attrKey": "型号",
            "attrValue": "1"
          },
          {
            "attrKey": "颜色",
            "attrValue": "绿色"
          },
          {
            "attrKey": "大小",
            "attrValue": "大"
          },
          {
            "attrKey": "尺寸",
            "attrValue": "L"
          }
        ]
      }
    ],
    attrValueList: [
      {
        "attrKey": "型号",
        "attrValues": [
          "2",
          "1"
        ],
        "attrValueStatus": [
          true,
          true
        ]
      },
      {
        "attrKey": "颜色",
        "attrValues": [
          "白色",
          "黑色",
          "绿色"
        ],
        "attrValueStatus": [
          true,
          true,
          true
        ]
      },
      {
        "attrKey": "大小",
        "attrValues": [
          "小",
          "大"
        ],
        "attrValueStatus": [
          true,
          true
        ]
      },
      {
        "attrKey": "尺寸",
        "attrValues": [
          "S",
          "M",
          "L"
        ],
        "attrValueStatus": [
          true,
          true,
          true
        ]
      }
    ]
  },
  onShow: function () {
    this.setData({
      includeGroup: this.data.commodityAttr
    });
  },
  /* 选择属性值事件 */
  selectAttrValue: function (e) {
    /*
    点选属性值，联动判断其他属性值是否可选
    {
      attrKey:'型号',
      attrValueList:['1','2','3'],
      selectedValue:'1',
      attrValueStatus:[true,true,true]
    }
    console.log(e.currentTarget.dataset);
    */
    var attrValueList = this.data.attrValueList;
    var index = e.currentTarget.dataset.index;//父级属性索引
    var key = e.currentTarget.dataset.key;//父级attrKey
    var value = e.currentTarget.dataset.value; //子级attrValues的值
    console.log('index' + index);
    console.log('key' + key);
    console.log('value' + value);
    console.log(e.currentTarget.dataset.status);//子级attrValueStatus的值
    console.log(e.currentTarget.dataset.selectedvalue);//父级selectedvalue
    console.log(e.currentTarget.dataset.value);
    console.log(this.data.firstIndex);
    if (e.currentTarget.dataset.status || index == this.data.firstIndex) {
      console.log(4444)
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
  //selectValue(list,0,'型号',2)
  selectValue: function (attrValueList, index, key, value, unselectStatus) {
    // console.log('firstIndex', this.data.firstIndex);
    var includeGroup = [];
    if (index == this.data.firstIndex && !unselectStatus) { // 如果是第一个选中的属性值，则该属性所有值可选
      var commodityAttr = this.data.commodityAttr;
      // 其他选中的属性值全都置空
      // console.log('其他选中的属性值全都置空', index, this.data.firstIndex, !unselectStatus);
      for (var i = 0; i < attrValueList.length; i++) {
        for (var j = 0; j < attrValueList[i].attrValues.length; j++) {
          attrValueList[i].selectedValue = '';
        }
      }
    } else {
      var commodityAttr = this.data.includeGroup;
      console.log(commodityAttr)
    }

    // console.log('选中', commodityAttr, index, key, value);
    for (var i = 0; i < commodityAttr.length; i++) {
      for (var j = 0; j < commodityAttr[i].attrValueList.length; j++) {
        if (commodityAttr[i].attrValueList[j].attrKey == key && commodityAttr[i].attrValueList[j].attrValue == value) {
          includeGroup.push(commodityAttr[i]);
        }
      }
    }
    attrValueList[index].selectedValue = value; //选中值赋值给selectedValue（新创建的）

    // 判断属性是否可选（全部设置为不能选择）
    for (var i = 0; i < attrValueList.length; i++) {
      for (var j = 0; j < attrValueList[i].attrValues.length; j++) {
        attrValueList[i].attrValueStatus[j] = false;
      }
    }
    console.log(includeGroup);
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
    console.log(includeGroup);
    // console.log('结果', attrValueList);
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
    if (count < 2) {// 第一次选中，同属性的值都可选
      this.setData({
        firstIndex: index
      });
    } else {
      this.setData({
        firstIndex: -1
      });
    }
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
  },
  /* 点击确定 */
  submit: function () {
    var value = [];
    for (var i = 0; i < this.data.attrValueList.length; i++) {
      if (!this.data.attrValueList[i].selectedValue) {
        break;
      }
      value.push(this.data.attrValueList[i].selectedValue);
    }
    if (i < this.data.attrValueList.length) {
      wx.showToast({
        title: '请完善属性',
        icon: 'loading',
        duration: 1000
      })
    } else {
      console.log(value.join('-'))
      wx.showToast({
        title: '选择的属性：' + value.join('-'),
        icon: 'sucess',
        duration: 1000
      })
    }
  }
})