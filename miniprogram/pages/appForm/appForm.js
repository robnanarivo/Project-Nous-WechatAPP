// miniprogram/pages/appForm/appForm.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gender: "",
    birthdate: "",
    grade: "",
    middleSchool: "",
    highSchool: "",
    university: "",
    wechatID: "",
    mobile: "",
    venue: "",
    participation: false,
    isLocal: false,
    howNous: [],
    whyNous: "",
    whyNousLength: 0,

    genderItems: ['男', '女', '其他'],
    gradeItems: ['初三', '高一', '高二', '高三', '大学本科', '大学研究生', '已工作'],
    venueItems: ['长沙', '贵阳', '凯里', '烟台'],
    howNousItems: [
          {name: '微信公众号', value: '0'},
          {name: '父母推荐', value: '1'},
          {name: '朋友推荐', value: '2'},
          {name: '其他', value: '3'},
    ],

    rules: [{
      name: 'name',
      rules: {required: true, message: '你还没有填写姓名'},
    }, {
      name: 'gender',
      rules: {required: true, message: '你还没有填写性别'},
    }, {
      name: 'birthdate',
      rules: {required: true, message: '你还没有填写生日'},
    }, {
      name: 'grade',
      rules: {required: true, message: '你还没有填写教育阶段'},
    }, {
      name: 'middleSchool',
      rules: {required: false},
    }, {
      name: 'highSchool',
      rules: {required: false},
    }, {
      name: 'university',
      rules: {required: false},   
    }, {
      name: 'mobile',
      rules: [{required: true, message: '你还没有填写电话'}, {mobile: true, message: '电话号码格式错误'}],
    }, {
      name: 'wechatID',
      rules: {required: true, message: '你还没有填写微信号'},
    }, {
      name: 'venue',
      rules: {required: true, message: '你还没有选择报名营地'},
    }, {
      name: 'participation',
      rules: {required: false},
    }, {
      name: 'isLocal',
      rules: {required: false},
    }, {
      name: 'howNous',
      rules: {required: false},
    }, {
      name: 'whyNous',
      rules: [{required: true, message: '你还没有填写申请问题'}, 
      {minlength: 150, message: '回答未达到最少字数'}]
    }],
    formData: {},
    error: '',

    submitting: false,
    submitDialogBtns: [{text: '取消'}, {text: '提交'}]
  },

  bindInputChange: function (e) {
    const {field} = e.currentTarget.dataset;
    this.setData({
      [`formData.${field}`]: e.detail.value
    })
  },

  bindGenderChange: function (e) {
    this.setData({
      gender: this.data.genderItems[e.detail.value],
      [`formData.gender`]: this.data.genderItems[e.detail.value]
    })
  },

  bindBirthDateChange: function (e) {
    this.setData({
      birthdate: e.detail.value,
      [`formData.birthdate`]: e.detail.value
    })
  },

  bindGradeChange: function (e) {
    this.setData({ 
      grade: this.data.gradeItems[e.detail.value],
      [`formData.grade`]: this.data.gradeItems[e.detail.value]
    });
  },

  bindVenueChange: function (e) {
    this.setData({
        venue: this.data.venueItems[e.detail.value],
        [`formData.venue`]: this.data.venueItems[e.detail.value]
    });
  },

  bindParticipationChange: function (e) {
    this.setData({
        participation: e.detail.value,
        [`formData.participation`]: e.detail.value
    })
  },

  bindIsLocalChange: function (e) {
    this.setData({
        isLocal: e.detail.value,
        [`formData.isLocal`]: e.detail.value
    })
  },

  bindHowNousChange: function (e) {
      var howItems = this.data.howNousItems, values = e.detail.value;
      for (var i = 0; i < howItems.length; i++) {
        howItems[i].checked = false;
      }
      for (var j = 0; j <  values.length; j++) {
        howItems[values[j]].checked = true;
      }
      this.setData({
          howNous: howItems,
          [`formData.howNous`]: howItems
      });
  },

  bindWhyNousChange: function (e) {
    this.setData({
      whyNous: e.detail.value,
      [`formData.whyNous`]: e.detail.value,
      whyNousLength: e.detail.value.length
    });
  },

  tapSubmitDialog: function (e) {
    if (e.detail.index == 1) {
      const db = wx.cloud.database();
      const studentApp = db.collection("studentApp");
      const that = this;
      const wxn = wx;
      studentApp.add({
        data: this.data.formData,
        success: function(res) {
          that.setData({
            submitting: false
          });
          wxn.showToast({
            title: "提交成功",
            duration: 2000,
            success: function() {
              setTimeout(function() {
                wx.reLaunch({
                  url: '../portal/portal',
                })
              }, 2000);          
            }
          });
        }
      });
    } else {
      this.setData({
        submitting: false
      });
    }
  },

  validateForm: function () {
    this.selectComponent('#form').validate((valid, errors) => {
        if (!valid) {
            const firstError = Object.keys(errors)
            if (firstError.length) {
                this.setData({
                    error: errors[firstError[0]].message
                })
            }
        } else {
          this.setData({
            submitting: true
          });
        }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})