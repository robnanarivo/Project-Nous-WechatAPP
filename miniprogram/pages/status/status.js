// pages/status/status.js

const app = getApp();

Page({

  /**
   * Page initial data
   */
  data: {
    // application details
    studentName: "",
    venue: "",

    // application status
    accepted: false,
    reviewed: false,

    // course selected
    hasSelectedCourse: false,
    courseSelected: {
      AM: {},
      PM: {},
    },

    // page info
    loadingStudent: true,
    loadingCourseSelected: true,
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    const studentApp = wx.cloud.database().collection("studentApp");
    const courseSelection = wx.cloud.database().collection("courseSelection");
    let page = this;

    // loading student
    studentApp.where({
      _openid: app.globalData.openid,
    })
      .limit(1)
      .get({
        success: res => {
          console.log("Successfully getting student", res.data[0].name);
          console.log(res.data[0].hasSelectedCourse);
          page.setData({
            studentName: res.data[0].name,
            venue: res.data[0].venue,
            reviewed: res.data[0].reviewed,
            accepted: res.data[0].accepted,
            hasSelectedCourse: res.data[0].hasSelectedCourse,
            loadingStudent: false,
          });
          if (res.data[0].hasSelectedCourse) {
            loadCourseSelected(page, app.globalData.openid);
          } else {
            page.setData({
              loadingCourseSelected: false,
            });
          }
        },
        fail: err => {
          console.error("Failed to get info", err)
        },
      });

    // loading course selected
    function loadCourseSelected(page, openid) {
      courseSelection.where({
        _openid: openid,
      })
        .limit(1)
        .get({
          success: res => {
            console.log("Successfully getting course selected of", res.data[0].studentName);
            page.setData({
              "courseSelected.AM": res.data[0].courseSelected.AM,
              "courseSelected.PM": res.data[0].courseSelected.PM,
              loadingCourseSelected: false,
            });
          },
          fail: err => {
            console.error("Failed to get info", err)
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