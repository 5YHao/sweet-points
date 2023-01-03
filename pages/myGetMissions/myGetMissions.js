// pages/myGetMissions/myGetMissions.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myGetMissions: []
  },
  async requestMyMissions() {
    let that = this;
    let url = app.globalData.baseUrl + "selectGetMissionRecordByUserId";
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
          myGetMissions: result.data.data
        });
        console.log(that.data.myGetMissions);
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
  async handleGiveup(id) {
    let that = this;
    let url = app.globalData.baseUrl + "giveupMission";
    let method = "POST";
    let data = {
      id
    };
    wx.showLoading({
      title: '放弃中',
    })
    const result = await app.httpRequest(url, method, data);
    wx.hideLoading({
      success: (res) => {},
    })
    if (result.statusCode == 200) {
      if (result.data.err_code == 0) {
        wx.showToast({
          title: '放弃完成',
        });
        that.requestMyMissions();
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
  async giveup(e) {
    let that = this;
    wx.showModal({
      content: "确定放弃该任务吗？",
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定');
          console.log(e.target.dataset.iteminfo.id);
          that.handleGiveup(e.target.dataset.iteminfo.id);
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
    this.requestMyMissions();
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