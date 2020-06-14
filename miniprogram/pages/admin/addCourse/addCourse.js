// pages/addCourse/addCourse.js

Page({
  formSubmit(e) {
    const db = wx.cloud.database();
    const courseList = db.collection("courseList");

    let toUpload = e.detail.value
    toUpload.enrolledStudents = []
    courseList.add({
      data: toUpload,
      success: function(res) {
        wx.showToast({
          title: "提交成功",
          icon: "success",
          duration: 2000,
        });
      }
    })
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
  },
})