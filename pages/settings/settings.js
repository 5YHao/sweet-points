// pages/settings/settings.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },



  async handleBreak() {
    if(app.globalData.coupleInfo==null){
      wx.showToast({
        title: '您未绑定对象',
      });
      return;
    }
    let url = app.globalData.baseUrl + "breakCouple";
    let method = "POST";
    let data = {
      couple_id: app.globalData.coupleInfo.id
    };
    const result = await app.httpRequest(url,method,data);
    console.log(result);
    if(result.statusCode==200){
      if(result.data.err_code==0){
        wx.showModal({
          content:"解绑成功",
          showCancel:false
        });
        app.globalData.coupleInfo=null;
      }else{
        wx.showModal({
          content:"解绑错误:"+result.data.msg,
          showCancel:false
        })
      }
    }else{
      wx.showToast({
        title: '网络错误',
      })
    }
  },
  break () {
    let that = this;
    wx.showModal({
      content: "确定与对象解绑吗？",
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          that.handleBreak();
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})