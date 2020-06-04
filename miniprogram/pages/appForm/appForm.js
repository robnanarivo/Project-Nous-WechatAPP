// pages/appForm/appForm.js

Page({
  data: {
    name: "",
    gender: "",
    school: "",
    birthdate: "",
    wechatID: "",
    dial: "",
    venue: undefined,
    participation: undefined,
    isLocal: undefined,
    howNous: [],
    whyNous: "",
    
    formData: {

    },

    venues: ['长沙', '贵阳', '凯里', '烟台'],

    participations: ['是', '否', '不确定'],

    isLocalItems: ['是', '否'],

    how: [
          {name: '微信公众号', value: '0'},
          {name: '父母推荐', value: '1'},
          {name: '朋友推荐', value: '2'},
          {name: '其他', value: '3'},
    ],

    showTopTips: false,

  },

  rules: [{
    name: 'name',
    rules: {required: true, message: '你还没有填写姓名'},
  }, {
    name: 'school',
    rules: {required: true, message: '你还没有填写学校'},
  }, {
    name: 'birthdate',
    rules: {required: true, message: '你还没有填写生日'},
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
    rules: {required: true, message: '你还没有回答完报名信息'},
  }, {
    name: 'whyNous',
    rules: [{required: true, message: '你还没有填写申请问题'},{rangelength: [150, 500], message: '回答长度超出字数范围'}]
  }],

  showTopTips: function(){
      var that = this;
      this.setData({
          showTopTips: true
      });
      setTimeout(function(){
          that.setData({
              showTopTips: false
          });
      }, 3000);
  },



  bindDateChange: function (e) {
    this.setData({
        birthdate: e.detail.value
    })
  },

  bindVenueChange: function (e) {
    this.setData({
        venue: e.detail.value
    })
  },

  bindParticipationChange: function (e) {
    this.setData({
        participation: e.detail.value
    })
  },

  bindIsLocalChange: function (e) {
    this.setData({
        isLocal: e.detail.value
    })
  },

  howChange: function (e) {
      console.log('how发生change事件，携带value值为：', e.detail.value);

      var howItems = this.data.how, values = e.detail.value;
      for (var i = 0, lenI = howItems.length; i < lenI; ++i) {
          howItems[i].checked = false;

          for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
              if(howItems[i].value == values[j]){
                  howItems[i].checked = true;
                  break;
              }
          }
      }

      this.setData({
          how: howItems
      });
  },

  formInputChange(e) {
    const {field} = e.currentTarget.dataset
    this.setData({
        [`formData.${field}`]: e.detail.value
    })
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

  submitForm() {
    this.selectComponent('#form').validate((valid, errors) => {
        console.log('valid', valid, errors)
        if (!valid) {
            const firstError = Object.keys(errors)
            if (firstError.length) {
                this.setData({
                    error: errors[firstError[0]].message
                })

            }
        } else {

            this.formSubmit
            wx.showToast({
                title: '提交成功'
            })
        }
    })
}

})
