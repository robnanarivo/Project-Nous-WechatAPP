// pages/course/course.js

Page({
  data: {
    courseInfoAM: [], //上午可选的课
    courseInfoPM: [], //下午可选的课
    courseSelected: {
      AM: null,
      PM: null,
    }, //已选课程
    finishedAM: false,
    venue: "长沙", // TODO: need to replace this later
  },

  onLoad: function (options) {
    const courseList = wx.cloud.database().collection("courseList");

    let page = this;
    courseList.where({
      venue: this.data.venue
    }).get({
      success: function(res) {
        page.setData({
          courseInfoAM: res.data.filter(obj => {
            return obj.time === "AM"
          }),
          courseInfoPM: res.data.filter(obj => {
            return obj.time === "PM"
          }),
        });
      }
    })
  },

  selected(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);

    if (this.data.finishedAM === false) {
      this.setData({
        "courseSelected.AM": e.detail.value,
      });
    } else {
      this.setData({
        "courseSelected.PM": e.detail.value,
      });
    }
  },

  next() {
    this.setData({
      finishedAM: true
    });
  },

  back() {
    this.setData(
      {
        finishedAM: false,
        "courseSelected.PM": null,
      }
    );
  },

  submit(e) {
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