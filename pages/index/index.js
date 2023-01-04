//Page构造函数，参数类型为Object
const app = getApp();

Page({
  //=========【数据区】(类比Vue实例中的data)==========
  data: {
    ourMissions: [],
    haveCouple: false,
  },
  //=========【方法定义区】(类比Vue实例中的methods)==========
  async getCoupleInfo() {
    let that = this;
    wx.showLoading({
      title: '获取信息中',
    });
    let url = app.globalData.baseUrl + 'selectCoupleInfoByUserId';
    let method = "POST";
    let data = {
      userId: app.globalData.userInfo.id
    };

    let result = await app.httpRequest(url, method, data);
    wx.hideLoading({
      success: (res) => {},
    })
    console.log(result);
    if (result.statusCode == 200) {
      if (result.data.err_code == 0) {
        that.setData({
          haveCouple: true
        })
        console.log(that.data.haveCouple);
        app.globalData.coupleInfo = result.data.data;
        console.log(app.globalData.coupleInfo);
        that.getOurMissions();
      } else {
        // wx.showToast({
        //   title: result.data.msg,
        //   icon: "error"
        // })
        that.setData({
          haveCouple: false,
          ourMissions: []
        });
        console.log(that.data);
      }
    } else {
      wx.showToast({
        title: '网络错误',
        icon: "error"
      })
    }
  },


  async getOurMissions() {
    let that = this;
    if (app.globalData.coupleInfo != null) {
      let boy_res = await app.httpRequest(app.globalData.baseUrl + "selectMissionsByPublisherId", "POST", {
        publisher_id: app.globalData.coupleInfo.boy_id
      });
      let girl_res = await app.httpRequest(app.globalData.baseUrl + "selectMissionsByPublisherId", "POST", {
        publisher_id: app.globalData.coupleInfo.girl_id
      });
      // console.log(boy_res);
      // console.log(girl_res);
      if (boy_res.statusCode == 200 && girl_res.statusCode == 200) {
        let tmpMissions = [];
        if (boy_res.data.data.length != 0) {
          tmpMissions = tmpMissions.concat(boy_res.data.data);
        }
        if (girl_res.data.data.length != 0) {
          tmpMissions = tmpMissions.concat(girl_res.data.data);
        }
        that.setData({
          ourMissions: tmpMissions
        })
        console.log(that.data.ourMissions);
      } else {
        wx.showModal({
          showCancel: false,
          content: "请求失败:boy_res=" + boy_res.statusCode + ",girl_res=" + girl_res.statusCode
        })
      }
    } else {
      console.log("getOurMissions:没有获取到对象信息");
    }
  },

  async getMission(e) {

    let url = app.globalData.baseUrl + "getMission";
    let method = "POST";
    let data = {
      mission_id: e.target.dataset.iteminfo.id,
      user_id: app.globalData.userInfo.id
    };
    console.log(data);
    const result = await app.httpRequest(url, method, data);
    console.log(result);
    if (result.statusCode == 200) {
      if (result.data.err_code == 0) {
        wx.showToast({
          title: '领取成功！',
        })
      } else {
        wx.showModal({
          content: result.data.msg,
          showCancel: false,
          icon: "error"
        })
      }
    } else {
      wx.showToast({
        title: '网络错误',
        icon: "error"
      })
    }
  },

  navToAddMision() {
    wx.navigateTo({
      url: '../addMission/addMission',
    })
  },
  navToPointsMall() {
    wx.navigateTo({
      url: '../pointsMall/pointsMall',
    })
  },
  onlyClick(e){
    app.tmpdata=e.currentTarget .dataset.iteminfo;
    console.log(app.tmpdata);
    wx.navigateTo({
      url: '../editMission/editMission',
    });
  },
  longPress(e) {
    let that=this;
    console.log(e.currentTarget.dataset.iteminfo);
    let itemInfo=e.currentTarget.dataset.iteminfo;
    wx.showModal({
      content: '确定要删除此任务吗?',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定');
          that.deleteMission(itemInfo);
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  async deleteMission(itemInfo){
    let that=this;
    let url=app.globalData.baseUrl+"deleteMission";
    let method = "POST";
    let data={
      mission_id:itemInfo.id
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
        that.getCoupleInfo();
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

  //=========【生命周期区】(类比Vue实例中的生命周期钩子)==========
  /**
   * 生命周期函数--页面加载时执行
   */
  onLoad(options) {

  },

  navToBindCouple() {
    wx.navigateTo({
      url: '../coupleBind/coupleBind',
    })
  },

  /**
   * 生命周期函数--页面初次渲染完成时执行
   */
  onReady() {

  },

  /**
   * 生命周期函数--页面显示时执行
   */
  onShow() {

    console.log(this.data.test);

    this.getCoupleInfo();


  },

  /**
   * 生命周期函数--页面隐藏时执行
   */
  onHide() {

  },

  /**
   * 生命周期函数--页面卸载时执行
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--用户下拉动作时执行
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