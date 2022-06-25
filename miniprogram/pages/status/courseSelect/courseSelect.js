// pages/course/course.js

//TODO: show how many students has selected a given course; disable selection if more than 15 students have selected the given course; use slot="footer"

const app = getApp();

Page({
  data: {
    // course info
    numberOfSpots: 0,
    courseInfoAM: [], //上午可选的课
    courseInfoPM: [], //下午可选的课
    courseSelected: {
      AM: {
        courseName: "",
        courseID: "",
        _id: "",
      },
      PM: {
        courseName: "",
        courseID: "",
        _id: "",
      },
    }, //已选课程，对象的第一个性质是课程名字，第二个是课程ID，第三个是数据

    // student info
    venue: "", //读书营地点
    studentName: "",
    studentAppID: "",

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
    wx.cloud.callFunction({
      name: "getCourseInfoNew",
      data: {},
      success: res => {
        console.log("Successfully getting course info for", res.result.studentInfo.venue);
        this.setData({
          venue: res.result.studentInfo.venue,
          studentName: res.result.studentInfo.studentName,
          studentAppID: res.result.studentInfo.studentAppID,
          courseInfoAM: res.result.courseInfoAM_valid,
          courseInfoPM: res.result.courseInfoPM_valid,
          loading: false,
        });

        // 课程人数
        this.setData({
          numberOfSpots: 15,
        });
 
      },
      fail: err => {
        console.error("Failed to get course info", err);
      },
    });
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
      const studentApp = db.collection("studentApp");
      const courseSelection = db.collection("courseSelection");
      const _ = db.command;
      let page = this;

      // set hasSelectedCourse of studentApp to true
      studentApp.doc(this.data.studentAppID).update({
        data: {
          hasSelectedCourse: true,
        },
        success: function(res) {
          addCourseSelection(page, courseSelection);
        }
      });

    } else {
      this.setData({
        isSubmitting: false,
      });
    }

    function addCourseSelection(page, courseSelection) {
      let timeSubmitted = new Date();
      courseSelection.add({
        data: {
          timeSubmitted: timeSubmitted,
          studentName: page.data.studentName,
          venue: page.data.venue,
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

  // 跳转加入课程微信群页面
  tapNavigateToCourseWechatGroup() {
    let url = '../courseWechatGroup/courseWechatGroup?courseAMID=' + this.data.courseSelected.AM.courseID + '&courseAMName=' + this.data.courseSelected.AM.courseName + '&coursePMID=' + this.data.courseSelected.PM.courseID + '&coursePMName=' + this.data.courseSelected.PM.courseName + '&venue=' + this.data.venue
    wx.reLaunch({
      url: url,
    })
  },
})