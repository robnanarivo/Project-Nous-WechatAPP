// pages/course/course.js

const app = getApp();

Page({
  data: {
    // course info
    courseInfoAM: [], //上午可选的课
    courseInfoPM: [], //下午可选的课
    courseSelected: {
      AM: [],
      PM: [],
    }, //已选课程，数组第一个值是课程名字，第二个是课程ID

    // student info
    venue: null, //读书营地点
    studentName: null,

    finishedAM: false,
    loading: true,
    isDisabledNext: true,
    isDisabledSubmit: true,
    isSubmitting: false,
    submitDialogBtns: [{text: '取消'}, {text: '确定'}],
    submitSuccess: false,
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
      })
        .limit(1)
        .get({
          success: res => {
            console.log("Successfully getting student", res.data[0].name);
            page.setData({
              venue: res.data[0].venue,
              studentName: res.data[0].name,
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
    let selected = e.detail.value.split(",");

    if (this.data.finishedAM === false) {
      this.setData({
        "courseSelected.AM": selected,
        isDisabledNext: false,
      });
    } else {
      this.setData({
        "courseSelected.PM": selected,
        isDisabledSubmit: false,
      });
    }
  },

  tapNext() {
    this.setData({
      finishedAM: true
    });
  },

  tapBack() {
    this.setData({
        finishedAM: false,
        "courseSelected.PM": null,
      });
  },

  submitting() {
    this.setData({
      isSubmitting: true,
    });
  },

  tapDialogConfirm(e) {
    if (e.detail.index === 1) {
    const courseSelection = wx.cloud.database().collection("courseSelection");
    let page = this;

    courseSelection.add({
      data: {
        studentName: this.data.studentName,
        courseSelected: {
          AM: this.data.courseSelected.AM[1],
          PM: this.data.courseSelected.PM[1],
        },
      },
      // TODO: 跳转确认page
      success: function(res) {
        page.setData({
          submitSuccess: true,
        });
        console.log(res);
      }
    });
    } else {
      this.setData({
        isSubmitting: false,
      });
    }
  },
})