// pages/reportProblems/reportProblems.js
Page({

  /**
   * Page initial data
   */
  data: {
    formData: {
      problem: ""
    },

    rules: [{
      name: 'problem',
      rules: [{
          required: true,
          message: '你还没有填写用户反馈'
        },
        {
          minlength: 25,
          message: '请用至少25字描述您遇到的问题'
        }
      ]
    }],
  },

  bindReportProblems: function (e) {
    this.setData({
      "formData.problem": e.detail.value,
    });
  },

  tapSubmit: function (e) {
    const db = wx.cloud.database();
    const reportProblems = db.collection("reportProblems");
    const wxn = wx;

    this.selectComponent('#form').validate((valid, errors) => {
      if (!valid) {
        const firstError = Object.keys(errors)
        if (firstError.length) {
          this.setData({
            error: errors[firstError[0]].message
          })
        }
      } else {
        reportProblems.add({
          data: this.data.formData,
          success: function (res) {
            wxn.showToast({
              title: "提交成功",
              duration: 2000,
              success: function () {
                setTimeout(function () {
                  wx.reLaunch({
                    url: '../portal/portal',
                  })
                }, 2000);
              }
            });
          }
        });
      }
    })
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

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