// pages/status/courseWechatGroup/courseWechatGroup.js
Page({

  /**
   * Page initial data
   */
  data: {
    courseAMID: "",
    courseAMName: "",
    coursePMID: "",
    coursePMName: "",
    venue: "",
    loading: true,
  },

  previewImage: function(e) {
    console.log(e)
    let current = "cloud://projectnous-app-qpb91.7072-projectnous-app-qpb91-1302093066/" + e.target.id + ".jpeg";
    console.log(current)
    wx.previewImage({
      current: current,
      urls: [current],
    });
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.setData({
      courseAMID: options.courseAMID,
      courseAMName: options.courseAMName,
      coursePMID: options.coursePMID,
      coursePMName: options.coursePMName,
      venue: options.venue,
      loading: false
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