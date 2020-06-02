// pages/status/status.js
const db = wx.cloud.database({});
const studentApp = db.collection('studentApp');
var openid = 'oWwqY5FY1ThckBypGr83wjSVKh1U';

function checkstatus(accepted){
  if(accepted == true){
    return 1;
  }
  else if(accepted == false){
    return 2;
  }
  else{
    return 0;
  }
}



Page({
  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    db.collection('studentApp').where({
      _openid: openid
    })
    .get({
      success(res){
        that.setData({
          Status: checkstatus(res.data[0].accepted)
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})

