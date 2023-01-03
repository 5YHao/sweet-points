// pages/coupleBind/coupleBind.js
const app=getApp();
Page({
  data: {
    avatarUrl:null,
    username: "",
    resultUserInfo: null
  },
  // =======【方法定义区】==========
  usernameInput(e) {
    if(e.detail.value==""||e.detail.value==null){
      this.setData({
        resultUserInfo:null
      })
    }
    this.setData({
      username: e.detail.value,
    });
    // console.log(this.data.username);
  },

  //绑定对象
  async bindCouple(){
    let that=this;
    let url=app.globalData.baseUrl+"bindCouple";
    let method="POST";
    let boy_id=null;
    let girl_id=null;
    if(app.globalData.userInfo.gender==this.data.resultUserInfo.gender){
      wx.showModal({
        content:"不支持同性绑定",
        showCancel:false
      });
      return;
    }
    if(app.globalData.userInfo.gender=="男"){
      boy_id=app.globalData.userInfo.id;
      girl_id=that.data.resultUserInfo.id
    }else if(app.globalData.userInfo.gender=="女"){
      boy_id=that.data.resultUserInfo.id;
      girl_id=app.globalData.userInfo.id
    }
    let data={
      boy_id,
      girl_id
    };
    wx.showLoading({
      title: '绑定中',
    });
    const result = await app.httpRequest(url,method,data); 
    wx.hideLoading({
      success: (res) => {},
    })
    console.log(result);
    if(result.statusCode==200){
      if(result.data.err_code==0){
        wx.showModal({
          content:"绑定成功！",
          showCancel:false,
          success (res) {
            if (res.confirm) {
              console.log('用户点击确定');
              wx.switchTab({
                url: '../index/index'
              })
            } 
          }
        })
      }else{
        wx.showModal({
          content:result.data.msg,
          showCancel:false
        })
      }
    }else{
      wx.showToast({
        title: '网络错误',
      })
    }
  },

  //查找用户
  async searchUser() {
    let that=this;
    if(this.data.username==""||this.data.username==null){
      wx.showToast({
        title: '请输入对方用户名',
        icon:"none",
        duration:2000
      })
      return;
    }
    let url=app.globalData.baseUrl + "selectUserByUsername";
    let method="POST";
    let data={
      username:this.data.username
    };
    wx.showLoading({
      title: '查找中',
    })
    const result = await app.httpRequest(url,method,data);
    wx.hideLoading({
      success: (res) => {},
    })
    console.log(result);
    if(result.statusCode==200){
      if(result.data.err_code==0){
        that.setData({
          resultUserInfo:result.data.data,
        });
        console.log(that.data.resultUserInfo);
        if(that.data.resultUserInfo.avatarUrl!=null){
          console.log(app.globalData.baseUrl+that.data.resultUserInfo.avatar_url);
          that.setData({
            avatarUrl:app.globalData.baseUrl+that.data.resultUserInfo.avatar_url
          });
        }
        

      }else{
        that.setData({
          resultUserInfo:null
        });
       wx.showModal({
         content:'用户名不存在',
         showCancel:false
       })
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