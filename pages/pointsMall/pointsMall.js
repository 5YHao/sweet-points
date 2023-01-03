// pages/pointsMall/pointsMall.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    awards: []
  },
  onlyClick(e){
    app.tmpdata=e.currentTarget .dataset.iteminfo;
    console.log(app.tmpdata);
    wx.navigateTo({
      url: '../editAward/editAward',
    });
  },
  longPress(e) {
    let that=this;
    console.log(e.currentTarget.dataset.iteminfo);
    let itemInfo=e.currentTarget.dataset.iteminfo;
    wx.showModal({
      content: '确定要删除此奖品吗?',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定');
          that.deleteAward(itemInfo);
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  async deleteAward(itemInfo){
    let that=this;
    let url=app.globalData.baseUrl+"deleteAward";
    let method = "POST";
    let data={
      award_id:itemInfo.id
    };
    wx.showLoading({
      title: '删除中',
    })
    const res = await app.httpRequest(url,method,data);
    wx.hideLoading({
      success: (res) => {},
    });
    console.log(res);
    if(res.statusCode==200){
      if(res.data.err_code==0){
        wx.showToast({
          title: '删除成功',
        });
        that.requestOurAwards();
      }else{
        wx.showToast({
          title: res.data.msg,
          icon:"none"
        })
      }
    }else{
      wx.showToast({
        title: '网络错误',
        icon:"error"
      })
    }
  },
  async requestOurAwards() {
    console.log("requestOurAwards");
    let that = this;
    let url = app.globalData.baseUrl + "selectCoupleAwardsByUserId";
    let method = "POST";
    let data = {
      user_id: app.globalData.userInfo.id
    };
    wx.showLoading({
      title: '加载中',
    })
    const result = await app.httpRequest(url, method, data);
    console.log(result);
    wx.hideLoading({
      success: (res) => {},
    })
    if (result.statusCode == 200) {
      if (result.data.err_code == 0) {
        that.setData({
          awards: result.data.data
        });
        console.log(that.data.awards);
      } else {
        that.setData({
          awards: []
        })
        wx.showToast({
          title: result.data.msg,
          icon:"none"
        })
      }
    } else {
      wx.showToast({
        title: '网络错误',
      })
    }
  },

  addAward(){
    wx.navigateTo({
      url: '../addAward/addAward',
    });
  },

  async handleExchange(award_id){
    let url=app.globalData.baseUrl+"getAward";
    let method="POST";
    let data={
      user_id:app.globalData.userInfo.id,
      award_id:award_id
    };
    console.log("data",data);
    const result =await app.httpRequest(url,method,data);
    console.log(result);
    if(result.statusCode==200){
      if(result.data.err_code==0){
        wx.showModal({
          content:"恭喜您兑换成功！",
          showCancel:false
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
  exchange(e){
    let that=this;

    let itemInfo=e.target.dataset.iteminfo;
    console.log(itemInfo);

    wx.showModal({
      content:"确定消费"+itemInfo.price+"积分\r\n兑换【"+itemInfo.name+"】吗",
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定');
          that.handleExchange(itemInfo.id);
        } else if (res.cancel) {
          console.log('用户点击取消');
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
    this.requestOurAwards();
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