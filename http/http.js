// 云服务器
var baseUrl = "https://tomcat.gsdse.cn/lp/";
// 本地环境
// var baseUrl = "http://192.168.0.105:8081/love-point/";

function httpRequest(url, method = "POST", data = {}) {
  return new Promise(function (resolve, reject) {
    wx.request({
      method: method,
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      url: url,
      data: data,
      success(res) {
        resolve(res);
      },
      fail(err) {
        reject(err)
      }
    })
  })
}

function httpUploadFile(url, filePath,formData) {
  return new Promise(function (resolve, reject) {
    wx.uploadFile({
      url: url, //接口地址
      filePath: filePath,
      name: 'file',
      formData: formData,
      success(res) {
        resolve(res);
      },
      fail(res) {
        reject(res);
      },
    })
  })
}


module.exports = {
  baseUrl: baseUrl,
  httpRequest: httpRequest,
  httpUploadFile:httpUploadFile,
}