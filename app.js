// app.js
const http = require('./http/http');
App({
  //全局数据
  globalData: {
    userInfo: null,
    coupleInfo: null,
    baseUrl: http.baseUrl,
  },
  //用于页面跳转参数传递
  tmpdata:null,
  httpRequest: http.httpRequest,
  httpUploadFile:http.httpUploadFile,


  onLaunch() {


  },

})