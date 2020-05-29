// pages/appForm/appForm.js

// Page({

//   appData: {
//     hasFinishedFirst: false,
//     name: "",
//     gender: "",
//     school: "",
//     wechatID: "",
//     dial: "",
//     hasFinishedSecond: false,
//     venue: "",
//     guaranteeParticipation: false,
//     howNous: [],
//     whatFromNous: "",
//     hasFinishedThird: false,
//     whyNous: "",
  // },

  // onShareAppMessage() {
  //   return {
  //     title: 'form',
  //     path: 'page/component/pages/form/form'
  //   }
  // },



Page({
  // mixins: [require('../../mixin/themeChanged')],
  data: {

    name: "",
    gender: "",
    school: "",
    birthdate: "",
    wechatID: "",
    dial: "",
    venue: "",
    guaranteeParticipation: false,
    howNous: [],
    whyNous: "",

    showTopTips: false,

    venues: [
        {name: '长沙', value: '长沙'},
        {name: '贵阳', value: '贵阳'},
        {name: '凯里', value: '凯里'},
        {name: '烟台', value: '烟台'}
    ],

    participation: [
        {name: '是', value: 'yes'},
        {name: '否', value: 'no'},
        {name: '不确定', value: 'notSure'},
    ],

    how: [
          {name: '微信公众号', value: '0', checked: true},
          {name: '父母推荐', value: '1'},
          {name: '朋友推荐', value: '2'}
    ],

    date: "2000-01-01",

    isAgree: false
  },

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
  radioChange: function (e) {
      console.log('radio发生change事件，携带value值为：', e.detail.value);

      var radioItems = this.data.radioItems;
      for (var i = 0, len = radioItems.length; i < len; ++i) {
          radioItems[i].checked = radioItems[i].value == e.detail.value;
      }

      this.setData({
          radioItems: radioItems
      });
  },
  checkboxChange: function (e) {
      console.log('checkbox发生change事件，携带value值为：', e.detail.value);

      var checkboxItems = this.data.checkboxItems, values = e.detail.value;
      for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
          checkboxItems[i].checked = false;

          for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
              if(checkboxItems[i].value == values[j]){
                  checkboxItems[i].checked = true;
                  break;
              }
          }
      }

      this.setData({
          checkboxItems: checkboxItems
      });
  },
  bindDateChange: function (e) {
      this.setData({
          date: e.detail.value
      })
  },

  bindAgreeChange: function (e) {
      this.setData({
          isAgree: !!e.detail.value.length
      });
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
  }

});