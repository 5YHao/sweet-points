// pages/login/login.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  wxLogin() {
    let that = this;
    wx.login({
      success(res) {
        if (res.code) {
          console.log(res.code);
          that.codeToServer(res.code);
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  async codeToServer(code) {
    wx.showLoading({
      title: '登陆中',
    })
    //发起网络请求
    let url = app.globalData.baseUrl + "wxLogin";
    let method = "POST";
    let data = {
      js_code: code
    };
    let res = await app.httpRequest(url, method, data);
    wx.hideLoading({
      success: (res) => {},
    })
    console.log(res);
    app.globalData.userInfo = res.data.data;
    if(app.globalData.userInfo==null||app.globalData.userInfo.username==null||app.globalData.userInfo.username==""){
      wx.reLaunch({
        url: '../register/register',
      })
    }else{
      
      wx.reLaunch({
        url: '../index/index',
      })
    }
   
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(app.globalData.baseUrl);
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