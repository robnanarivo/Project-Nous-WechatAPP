// pages/course/course.js

const app = getApp();

Page({
  data: {
    courseInfoAM: [], //上午可选的课
    courseInfoPM: [], //下午可选的课
    courseSelected: {
      AM: null,
      PM: null,
    }, //已选课程
    finishedAM: false,
    venue: null, //读书营地点
    loading: true,
  },

  onLoad: function (options) {
    const courseList = wx.cloud.database().collection("courseList");
    const studentApp = wx.cloud.database().collection("studentApp");
    let page = this;

    setVenueCourse(page, app.globalData.openid)

    // 先获取学生报名的夏令营地点，再获取课程列表
    function setVenueCourse(page, openid) {
      studentApp.where({
        _openid: openid,
      }).get({
        success: res => {
          console.log("Successfully getting student", res.data[0].name);
          page.setData({
            venue: res.data[0].venue,
          });
          setCourse(page);
        },
        fail: err => {
          console.error("Failed to get venue", err)
        },
      });
    }

    // 获取课程列表，在setVenueCourse中被调用
    function setCourse(page) {
      courseList.where({
        venue: page.data.venue
      }).get({
        success: function(res) {
          page.setData({
            courseInfoAM: res.data.filter(obj => {
              return obj.time === "AM"
            }),
            courseInfoPM: res.data.filter(obj => {
              return obj.time === "PM"
            }),
            loading: false,
          });
        },
        fail: err => {
          console.error("Failed to get course list", err)
        },
      });
    }
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