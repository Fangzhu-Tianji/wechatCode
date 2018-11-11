// components/good-list/good-list.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    content: { //类型名
      type: Object,
      value: {}
    }
  },
  /**
   * 组件的初始数据
   */
  data: {

  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 进入详情页
    goDetail: function (e) {
      var id = e.currentTarget.dataset.id;
      wx.navigateTo({
        url: '/pages/tour/tour'+id+'/tour'
      })
    }
  }
})
