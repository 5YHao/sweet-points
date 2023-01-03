// pages/register/register.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

    avatarImageInfo: {
      tempFilePath: "http://3v.gsdse.cn/sweet-points/images/chooseimage.svg"
    },
    username: "",
    gender: "",
    avatar: "",
    radioItems: [{
        name: '男',
        value: '男',
      },
      {
        name: '女',
        value: '女'
      }
    ],
  },
  radioChange(e) {
    this.setData({
      gender: e.detail.value
    });
    console.log(this.data.gender);
  },

  usernameInput(e) {
    this.setData({
      username: e.detail.value
    })
    console.log(this.data.username);
  },


  async save() {
    console.log("点击【完成注册】");
    console.log(app.globalData.userInfo);
    if (this.data.username == "") {
      wx.showToast({
        title: '用户名不能为空',
        icon: "error",
        duration: 2000
      })
      return;

    }
    if (this.data.gender == "") {
      wx.showToast({
        title: '请选择性别',
        icon: "error",
        duration: 2000
      })
      return;
    }
    if (this.data.avatarImageInfo.size == null) {
      wx.showToast({
        title: '请上传头像',
        icon: "error",
        duration: 2000
      })
      return;
    }
    let url = app.globalData.baseUrl + "updateUserInfoById";
    let filePath = this.data.avatarImageInfo.tempFilePath;
    let formData = {
      id:app.globalData.userInfo.id,
      username: this.data.username,
      gender: this.data.gender
    }
    const result = await app.httpUploadFile(url, filePath, formData);
    console.log(result);
    if (result.statusCode == 200) {
      let data = JSON.parse(result.data);
      console.log(data);
      let userData = data.data;
      if (data.err_code == 0) {
        app.globalData.userInfo.username = userData.username;
        app.globalData.userInfo.gender = userData.gender;
        app.globalData.userInfo.points = userData.points;
        app.globalData.userInfo.avatar_url = userData.avatar_url;
        console.log(app.globalData.userInfo);
        wx.reLaunch({
          url: '../index/index',
        })
      } else {
        wx.showToast({
          title: '注册失败,请重试',
          icon: 'none'
        })
      }


    } else {
      wx.showToast({
        title: '请求失败',
        icon:"error"
      })
    }
  },

  chooseIamge() {
    wx.chooseMedia({
      count: 1,
      mediaType: "image",
      success: res => {
        // console.log(res);
        if (res.tempFiles != null) {
          this.setData({
            avatarImageInfo: res.tempFiles[0]
          });
          console.log(this.data.avatarImageInfo);
        }
      },
      fail: res => {
        console.log(res);
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