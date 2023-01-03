// pages/addMission/addMission.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    points: 1,
    name: "",
    description: ""
  },
  sliderChange(e) {
    this.setData({
      points: e.detail.value
    })
    console.log(this.data.points);
  },

  nameInput(e) {
    this.setData({
      name: e.detail.value
    })
  },
  descInput(e) {
    this.setData({
      description: e.detail.value
    })
  },
  async addMission() {
    if (this.data.name == "" || this.data.name == null) {
      wx.showToast({
        title: '任务名称不能为空',
        icon:"error"
      });
      return;
    }
    let url = app.globalData.baseUrl + "publishMission";
    let method = "POST";
    let data = {
        publisher_id: app.globalData.userInfo.id,
        name: this.data.name,
        description: this.data.description,
        points: this.data.points
      };
      const result = await app.httpRequest(url, method, data);
    console.log(result);
    if (result.statusCode == 200) {
      if(result.data.err_code==0){
        wx.showToast({
          title: '发布成功',
          mask:true,
          duration:1000,
          success:()=>{
            setTimeout(function () {
              //要延时执行的代码
              wx.switchTab({
                url: '../index/index'
              });
            }, 1000) //延迟时间
          }
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