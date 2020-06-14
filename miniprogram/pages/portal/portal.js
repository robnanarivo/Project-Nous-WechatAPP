// pages/portal/portal.js

const app = getApp();

Page({

  /**
   * Page initial data
   */
  data: {
    hasApplied: false,
    isAdmin: false,

    loading: true,
  },

  tapApply: function() {
    wx.navigateTo({
      url: '../appForm/appForm',
    });
  },

  tapStatus: function() {
    wx.navigateTo({
      url: '../status/status',
    });
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    wx.cloud.callFunction({
      name: "login",
      data: {},
      success: res => {
        console.log("Open ID is", res.result.openid);
        app.globalData.openid = res.result.openid;
        this.setData({
          isAdmin: res.result.isAdmin,
          hasApplied: res.result.hasApplied,
          loading: false,
        })
      },
      fail: err => {
        console.error("Failed to get open ID", err);
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
