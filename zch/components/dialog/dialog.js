Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   */
  properties: {
    content: { //类型名
      type: String, //类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: '' //属性初始值（可选），如果未指定则会根据类型选择一个
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    isShow: false //弹框的显示与隐藏
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 显示弹框
    showDialog: function () {
      this.setData({
        isShow: true
      })
    },
    // 隐藏弹框
    hideDialog: function () {
      this.setData({
        isShow: false
      })
    },
    /*
     * 内部私有方法建议以下划线开头
     * triggerEvent 用于触发事件
     */
    _confirmEvent: function () {
      this.triggerEvent("confirmEvent");
    }
  }
})
