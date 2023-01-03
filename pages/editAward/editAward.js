// pages/addAward/addAward.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemInfo:null,
  },
  sliderChange(e) {
    this.setData({
      ['itemInfo.price']: e.detail.value
    })
    console.log(this.data.itemInfo);
  },
  nameInput(e) {
    this.setData({
      ['itemInfo.name']: e.detail.value
    });
    console.log(this.data.itemInfo);
  },
  descInput(e) {
    this.setData({
      ['itemInfo.description']: e.detail.value
    });
    console.log(this.data.itemInfo);
  },
  async save() {
    let that = this;
    let url = app.globalData.baseUrl + "updateAwardInfo";
    let method = "POST";
    let data = {
      id: that.data.itemInfo.id,
      name: that.data.itemInfo.name,
      description: that.data.itemInfo.description,
      price: that.data.itemInfo.price
    }
    wx.showLoading({
      title: '保存中',
    });
    const res=await app.httpRequest(url,method,data);
    wx.hideLoading({
      success: (res) => {},
    })
    if(res.statusCode==200){
      if(res.data.err_code==0){
        wx.showToast({
          title: '保存成功',
          success:res=>{
            setTimeout(function(){
              wx.navigateBack({
                delta: 1,
              })
            },1000);
          }
        })

      }else{
        wx.showToast({
          title: 'title',
        })
      }
    }else{
      wx.showToast({
        title: '网络错误',
        icon:"error"
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
    this.setData({
      itemInfo:app.tmpdata
    });
    console.log(this.data.itemInfo);
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