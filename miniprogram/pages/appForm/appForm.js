// pages/appForm/appForm.js

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
    venue: undefined,
    participation: undefined,
    howNous: [],
    whyNous: "",

    showTopTips: false,

    venues: ['长沙', '贵阳', '凯里', '烟台'],

    participations: ['是', '否', '不确定'],

    how: [
          {name: '微信公众号', value: '0'},
          {name: '父母推荐', value: '1'},
          {name: '朋友推荐', value: '2'}
    ],

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

//   venueChange: function (e) {
//       console.log('venue发生change事件，携带value值为：', e.detail.value);

//       var venueItems = this.data.venues;
//       for (var i = 0, len = venueItems.length; i < len; ++i) {
//           venueItems[i].checked = venueItems[i].value == e.detail.value;
//       }

//       this.setData({
//           venues: venueItems
//       });
//   },

//   participationChange: function (e) {
//     console.log('participation发生change事件，携带value值为：', e.detail.value);

//     var participationItems = this.data.participation;
//     for (var i = 0, len = participationItems.length; i < len; ++i) {
//         participationItems[i].checked = participationItems[i].value == e.detail.value;
//     }

//     this.setData({
//         participation: participationItems
//     });
// },

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