// pages/course/course.js

const app = getApp();

Page({
  data: {
    // course info
    courseInfoAM: [], //上午可选的课(已选人数小于15人)
    courseInfoPM: [], //下午可选的课(已选人数小于15人)
    courseSelected: {
      AM: {
        courseName: null,
        courseID: null,
        _id: null,
      },
      PM: {
        courseName: null,
        courseID: null,
        _id: null,
      },
    }, //已选课程，对象的第一个性质是课程名字，第二个是课程ID，第三个是数据

    // student info
    venue: null, //读书营地点
    studentName: null,
    studentAppID: null,

    // page info
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
              studentAppID: res.data[0]._id,
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
              return (obj.time === "AM" && obj.enrolledStudents.length < 15)
            }),
            courseInfoPM: res.data.filter(obj => {
              return (obj.time === "PM" && obj.enrolledStudents.length < 15)
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
        "courseSelected.AM": {
          courseName: selected[0],
          courseID: selected[1],
          _id: selected[2],
        },
        isDisabledNext: false,
      });
    } else {
      this.setData({
        "courseSelected.PM": {
          courseName: selected[0],
          courseID: selected[1],
          _id: selected[2],
        },
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
      });
  },

  submitting() {
    this.setData({
      isSubmitting: true,
    });
  },

  tapDialogConfirm(e) {
    if (e.detail.index === 1) {
      const db = wx.cloud.database();
      const courseSelection = db.collection("courseSelection");
      const courseList = db.collection("courseList");
      const _ = db.command;
      let page = this;

      courseList.doc(this.data.courseSelected.AM._id).update({
        data: {
          enrolledStudents: _.push({
            studentName: page.data.studentName,
            studentAppID: page.data.studentAppID,
          })
        },
        success: function(res) {
          console.log(res.data)
        }
      });

      courseList.doc(this.data.courseSelected.PM._id).update({
        data: {
          enrolledStudents: _.push({
            studentName: page.data.studentName,
            studentAppID: page.data.studentAppID,
          })
        },
        success: function(res) {
          console.log(res.data)
        }
      });

      addCourseSelection(page, courseSelection);
    } else {
      this.setData({
        isSubmitting: false,
      });
    }

    function addCourseSelection(page, courseSelection) {
      courseSelection.add({
        data: {
          studentName: page.data.studentName,
          courseSelected: {
            AM: page.data.courseSelected.AM,
            PM: page.data.courseSelected.PM,
          },
        },
        success: function(res) {
          page.setData({
            submitSuccess: true,
          });
          console.log(res);
        }
      })
    }
  },

  tapReturnToStatus() {
    wx.navigateTo({
      url: '../status/status',
    })
  },
})