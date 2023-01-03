// pages/checkTaAwards/checkTaAwards.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    taGetAwards: [],
    showList: []
  },
  async requestTaGetAwards() {
    let that = this;
    let url = app.globalData.baseUrl + "selectGetAwardRecordByUserId";
    let method = "POST";
    let user_id = null;
    if (app.globalData.userInfo.id == app.globalData.coupleInfo.boy_id) {
      user_id = app.globalData.coupleInfo.girl_id;
    } else if (app.globalData.userInfo.id == app.globalData.coupleInfo.girl_id) {
      user_id = app.globalData.coupleInfo.boy_id;
    }
    let data = {
      user_id
    };
    console.log(app.globalData.coupleInfo);
    console.log(data);
    wx.showLoading({
      title: '加载中',
    })
    const result = await app.httpRequest(url, method, data);
    wx.hideLoading({
      success: (res) => {},
    })
    console.log(result);
    if (result.statusCode == 200) {
      if (result.data.err_code == 0) {
        that.setData({
          taGetAwards: result.data.data
        });
        that.filterStatus1();
      }
    } else {
      wx.showToast({
        title: '网络错误',
        icon: "error"
      })
    }
  },
  filterStatus1() {
    let tmpList = [];
    let taGetAwards = this.data.taGetAwards;
    console.log(taGetAwards);
    for (var i = 0; i < taGetAwards.length; i++) {
      if (taGetAwards[i].status == 1) {
        tmpList = tmpList.concat(taGetAwards[i]);
      }
    }
    this.setData({
      showList: tmpList
    })
    console.log(this.data.showList);
  },

  async handleFinishConfirm(id) {
    let that=this;
    let url = app.globalData.baseUrl + "finishConsumeAward";
    let method="POST";
    let data={
      id
    }
    wx.showLoading({
      title: '请求中',
    })
    const res = await app.httpRequest(url, method, data);
    wx.hideLoading({
      success: (res) => {},
    })
    console.log(res);
    if (res.statusCode == 200) {
      if(res.data.err_code==0){
        wx.showToast({
          title: '完成兑现成功！',
        });
        that.requestTaGetAwards();
      }else{
        wx.showToast({
          title: '请求失败，请重试',
          icon:"error"
        })
      }
    } else {
      wx.showToast({
        title: '网络错误',
        icon: "error"
      })
    }
  },
  finishConfirm(e) {
    let that = this;
    wx.showModal({
      content: "您是否确定已经完成兑现？",
      success(res) {
        if (res.confirm) {
          console.log("用户点击确定")
          that.handleFinishConfirm(e.target.dataset.iteminfo.id);
        } else if (res.cancel) {

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
    this.requestTaGetAwards();
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