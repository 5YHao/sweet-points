// pages/ta/ta.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    haveCouple: false,
    userInfo:null,
    avatar:"",
    choises: [{
      title: '待兑现的奖品',
      src: 'http://3v.gsdse.cn/sweet-points/images/award-confirm.svg',
      i: 1
    },
    {
      title: '待确认的任务',
      src: 'http://3v.gsdse.cn/sweet-points/images/checked.svg',
      i: 2
    }
  ],
  },
  clickChoise(e) {
    let itemInfo = e.currentTarget.dataset.iteminfo;
    console.log(itemInfo);
    switch (itemInfo.i) {
      case 1: {
        wx.navigateTo({
          url: '../checkTaAwards/checkTaAwards'
        });
        break;
      }
      case 2: {
        wx.navigateTo({
          url: '../checkTaMissions/checkTaMissions'
        });
        break;
      }
    }
  },
  async getTAInfo(){
    let that=this;
    let id=null;
    if(app.globalData.userInfo.gender=="男"){
      id=app.globalData.coupleInfo.girl_id;
    }else if(app.globalData.userInfo.gender=="女"){
      id=app.globalData.coupleInfo.boy_id;
    }
    let url=app.globalData.baseUrl+"selectUserById";
    let method="POST";
    let data={
      id
    };
    const result = await app.httpRequest(url,method,data);
    console.log(result);
    if(result.statusCode==200){
      if(result.data.err_code==0){
        that.setData({
          userInfo:result.data.data,
        })
        if(that.data.userInfo.avatar_url!=null){
          that.setData({
            avatar:app.globalData.baseUrl+that.data.userInfo.avatar_url
          })
        }else{
          that.setData({
            avatar:"http://3v.gsdse.cn/sweet-points/images/default-avatar.svg"
          })
        }
      }else{
        
      }
    }else{
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
    console.log("onshow");
    console.log(app.globalData.coupleInfo);
    if(app.globalData.coupleInfo!=null){
      
      this.setData({
        haveCouple:true
      });
      this.getTAInfo();
    }else{
      console.log("coupleInfo为null");
      this.setData({
        haveCouple:false
      });
    }

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