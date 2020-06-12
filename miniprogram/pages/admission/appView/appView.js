// miniprogram/pages/appView/appView.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    app: {},
    loading: true,
    showDialog: false,
    accepting: false,
    acceptDialogBtns: [{text: '取消'}, {text: '录取'}],
    rejectDialogBtns: [{text: '取消'}, {text: '拒绝'}]
  },

  tapAcceptButton: function() {
    this.setData({
      showDialog: true,
      accepting: true
    })
  },

  tapRejectButton: function() {
    this.setData({
      showDialog: true,
      accepting: false
    })
  },

  tapAcceptDialog: function(e) {
    if (e.detail.index == 1) {
      const db = wx.cloud.database();
      const studentApp = db.collection("studentApp");
      var that = this;
      studentApp.doc(this.data.app._id).update({
        data: {
          reviewed: true,
          accepted: true
        },
        success: function(res) {
          that.setData({
            "app.reviewed": true,
            "app.accepted": true,
            showDialog: false
          });
        }
      })
    } else {
      this.setData({
        showDialog: false
      });
    }
  },

  tapRejectDialog: function(e) {
    if (e.detail.index == 1) {
      const db = wx.cloud.database();
      const studentApp = db.collection("studentApp");
      var that = this;
      studentApp.doc(this.data.app._id).update({
        data: {
          reviewed: true,
          accepted: false
        },
        success: function(res) {
          that.setData({
            "app.reviewed": true,
            "app.accepted": false,
            showDialog: false
          });
        }
      })
    } else {
      this.setData({
        showDialog: false
      });
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const db = wx.cloud.database();
    const studentApp = db.collection("studentApp");
    const appId = options.id;
    var that = this;
    studentApp.doc(appId).get({
      success: function(res) {
        that.setData({
          app: res.data,
          loading: false
        });
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