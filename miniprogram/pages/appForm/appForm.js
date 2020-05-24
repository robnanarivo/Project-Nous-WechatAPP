// pages/appForm/appForm.js

Page({
  onShareAppMessage() {
    return {
      title: 'form',
      path: 'page/component/pages/form/form'
    }
  },

  formSubmit(e) {
    const db = wx.cloud.database();
    const studentApp = db.collection("studentApp");

    studentApp.add({
      data: e.detail.value,
      success: function(res) {
        console.log(res);
      }
    })
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
    wx.reLaunch({
      url: '../portal/portal',
    })
  },
})