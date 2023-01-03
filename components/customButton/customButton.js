// components/customButton/customButton.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    text: {
      type: String,
      value: "按钮"
    },
    bgColor: {
      type: String,
      value: "#009ffb"
    },
    width: {
      type: String,
      value: "100%"
    },
    textColor: {
      type: String,
      value: "#ffffff"
    },
    fontWeight: {
      type: String,
      value: "normal"
    },
    fontSize: {
      type: String,
      value: "32rpx"
    },
    letterSpacing:{
      type: String,
      value: ""
    },
    borderRadius:{
      type:String,
      value:"10rpx"
    },
    padding:{
      type:String,
      value:"26rpx 0"
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

  }
})