// pages/myGetAwards/myGetAwards.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myGetAwards: []
  },
  async consume(e) {
    let that = this;
    let url = app.globalData.baseUrl + "consumeAward";
    let method = "POST";
    let data = {
      id: e.target.dataset.iteminfo.id
    };
    wx.showLoading({
      title: '申请兑现中',
    })
    const result = await app.httpRequest(url, method, data);
    wx.hideLoading({
      success: (res) => {},
    })
    if (result.statusCode == 200) {
      if (result.data.err_code == 0) {
        wx.showModal({
          showCancel: false,
          content: "发起兑现成功！请耐心等待TA确认完成"
        });
        that.requestMyGetAwards();
      } else {
        wx.showToast({
          title: result.data.msg,
          icon: "none"
        })
      }
    } else {
      wx.showToast({
        title: '网络错误',
      })
    }
  },
  async requestMyGetAwards() {
    let that = this;
    let url = app.globalData.baseUrl + "selectGetAwardRecordByUserId";
    let method = "POST";
    let data = {
      user_id: app.globalData.userInfo.id
    };
    wx.showLoading({
      title: '加载中',
    })
    const result = await app.httpRequest(url, method, data);
    wx.hideLoading({
      success: (res) => {},
    })
    if (result.statusCode == 200) {
      if (result.data.err_code == 0) {
        that.setData({
          myGetAwards: result.data.data
        });
        console.log(that.data.myGetAwards);
      } else {
        wx.showToast({
          title: result.data.msg,
          icon: "none"
        })
      }
    } else {
      wx.showToast({
        title: '网络错误',
      })
    }
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
    this.requestMyGetAwards();
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