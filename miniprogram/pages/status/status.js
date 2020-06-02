// pages/status/status.js

const app = getApp();

Page({

  /**
   * Page initial data
   */
  data: {
    // application details
    studentName: null,

    // application status
    accepted: null,
    reviewed: null,

    // course selected
    courseSelected: null,
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    const studentApp = wx.cloud.database().collection("studentApp");
    let page = this;

    studentApp.where({
      _openid: app.globalData.openid,
    })
      .limit(1)
      .get({
        success: res => {
          console.log("Successfully getting student", res.data[0].name);
          page.setData({
            studentName: res.data[0].name,
            reviewed: res.data[0].reviewed,
            accepted: res.data[0].accepted,
          });
        },
        fail: err => {
          console.error("Failed to get info", err)
        },
      });
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})