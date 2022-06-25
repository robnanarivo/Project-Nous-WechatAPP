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
    mobile: "",
    subject: "",
    subjectInfo: "",
    plan: "",
    venue: "",
    participation: false,
    isLocal: false,
    howNous: [],
    whyNous: "",
    whyNousLength: 0,
    whichCourse: "",
    whichCourseLength: 0,

    genderItems: ['男', '女', '其他'],
    gradeItems: ['初三', '高一', '高二', '高三', '大学本科', '大学研究生', '已工作'],
    subjectItems: ['文科', '理科', '不分科'],
    planItems: ['高考', '出国', '未定'],
    venueItems: ['青岛', '绵阳2022', '长沙2022', '贵阳2022', '三门2022', '烟台2022', '遵义2022'],
    howNousItems: [
          {name: '微信公众号', value: '0'},
          {name: '微信朋友圈', value: '1'},
          {name: '老师推荐', value: '2'},
          {name: '父母推荐', value: '3'},
          {name: '朋友推荐', value: '4'},
          {name: '其他', value: '5'},
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
      rules: [{required: true, message: '你还没有填写手机号码'}, {mobile: true, message: '手机号码格式错误'}],
    }, {
      name: 'subject',
      rules: {required: false},
    }, {
      name: 'subjectInfo',
      rules: {required: false},
    }, {
      name: 'plan',
      rules: {required: false},
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
      rules: [{required: true, message: '你还没有填写第一个申请问题'}, 
      {minlength: 150, message: '回答未达到最少字数'}]
    }, {
      name: 'whichCourse',
      rules: [{required: true, message: '你还没有填写第二个申请问题'}, {minlength: 200, message: '回答未达到最少字数'}]
    }],

    error: '',
  
    formData: {
      hasSelectedCourse: false,
      birthdate: "2002-01-01",
      participation: false,
      isLocal: false,
    },

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

  bindSubjectChange: function (e) {
    this.setData({ 
      subject: this.data.subjectItems[e.detail.value],
      [`formData.subject`]: this.data.subjectItems[e.detail.value]
    });
  },

  bindPlanChange: function (e) {
    this.setData({ 
      plan: this.data.planItems[e.detail.value],
      [`formData.plan`]: this.data.planItems[e.detail.value]
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
    let howItems = this.data.howNousItems, values = e.detail.value;
    let howNous = [];
    for (let j = 0; j < values.length; j++) {
      howNous.push(howItems[values[j]].name);
    }
    this.setData({
        howNous: howNous,
        [`formData.howNous`]: howNous
    });
  },

  bindWhyNousChange: function (e) {
    this.setData({
      whyNous: e.detail.value,
      [`formData.whyNous`]: e.detail.value,
      whyNousLength: e.detail.value.length
    });
  },

  bindWhichCourseChange: function (e) {
    this.setData({
      whichCourse: e.detail.value,
      [`formData.whichCourse`]: e.detail.value,
      whichCourseLength: e.detail.value.length
    });
  },

  tapSubmitDialog: function (e) {
    if (e.detail.index == 1) {
      const db = wx.cloud.database();
      const studentApp = db.collection("studentApp");
      const that = this;
      const wxn = wx;

      this.data.formData.timeSubmitted = Date();

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