// pages/portal/portal.js

const app = getApp();

Page({

  /**
   * Page initial data
   */
  data: {
    IsNewuser: true
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    
    getOpenId();
    
    // 通过微信云函数获取Open ID
    function getOpenId() {
      wx.cloud.callFunction({
        name: "login",
        data: {},
        success: res => {
          console.log("Open ID is", res.result.openid);
          app.globalData.openid = res.result.openid;
        },
        fail: err => {
          console.error("Failed to get open ID", err);
        },
      });
    }
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
