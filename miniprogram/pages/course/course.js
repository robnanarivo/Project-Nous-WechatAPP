// pages/course/course.js
Page({

  /**
   * Page initial data
   */
  data: {
    courseInfo: [],
  },

  /**
   * Lifecycle function--Called when page load
   */
  // TODO: load only contents related to the camp of selection
  onLoad: function (options) {
    const courseList = wx.cloud.database().collection("courseList");

    let page = this;
    courseList.get({
      success: function(res) {
        page.setData({
          courseInfo: res.data,
        });
      }
    })
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

  },

  formSubmit(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
    const db = wx.cloud.database();
    const courseSelection = db.collection("courseSelection");
    courseSelection.add({
      data: e.detail.value,
      success: function(res) {
        console.log(res);
      }
    })
    wx.reLaunch({
      url: '../portal/portal',
    })
  },
})