// pages/mine/mine.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    avatar: "",
    choises: [{
        title: '奖品仓库',
        src: 'http://3v.gsdse.cn/sweet-points/images/gift.svg',
        i: 1
      },
      {
        title: '我的任务',
        src: 'http://3v.gsdse.cn/sweet-points/images/list.svg',
        i: 2
      },
      {
        title: '设置',
        src: 'http://3v.gsdse.cn/sweet-points/images/setting.svg',
        i: 3
      },
    ],
  },
  clickChoise(e) {
    let itemInfo = e.currentTarget.dataset.iteminfo;
    console.log(itemInfo);
    switch (itemInfo.i) {
      case 1: {
        wx.navigateTo({
          url: '../myGetAwards/myGetAwards'
        });
        break;
      }
      case 2: {
        wx.navigateTo({
          url: '../myGetMissions/myGetMissions'
        });
        break;
      }
      case 3: {
        wx.navigateTo({
          url: '../settings/settings'
        });
        break;
      }
    }
  },

  async refreshInfo() {
    let that = this;
    let url = app.globalData.baseUrl + "selectUserById";
    let method = "POST";
    let data = {
      id: app.globalData.userInfo.id
    };
    console.log(data);
    const result = await app.httpRequest(url, method, data);
    console.log(result);
    if (result.statusCode == 200) {
      if (result.data.err_code == 0) {
        that.setData({
          userInfo: result.data.data,
          avatar: app.globalData.baseUrl + result.data.data.avatar_url
        });
        app.globalData.userInfo = result.data.data;
        console.log(that.data.userInfo);
      } else {
        wx.showToast({
          title: result.data.msg,
          icon: "none"
        })
      }
    } else {
      wx.showToast({
        title: '网络错误',
        icon: "error"
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
    this.refreshInfo();
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