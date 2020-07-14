// pages/status/campLogistics/campLogistics.js
Page({

  /**
   * Page initial data
   */
  data: {
    venue: "",
    year: 0,
    month: 0,
    date: 0,
    hours: 0,
    location: "",
    long: 0,
    lat: 0,
    loading: true,

    markers: [{
      iconPath: "../../../images/pin.png",
      id: 0,
      latitude: 0,
      longitude: 0,
      width: 60,
      height: 60
    }],
    controls: [{
      id: 1,
      iconPath: '../../../images/格致计划logo-horizontal.png',
      position: {
        left: 0,
        top: 300 - 40,
        width: 102,
        height: 30
      },
      clickable: true
    }]
  },
  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e.detail.markerId)
  },
  controltap(e) {
    console.log(e.detail.controlId)
  },
  previewImage: function(e) {
    console.log(e)
    let current = "cloud://projectnous-app-qpb91.7072-projectnous-app-qpb91-1302093066/" + e.target.id + ".jpeg";
    console.log(current)
    wx.previewImage({
      current: current,
      urls: [current],
    });
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    const campLogistics = wx.cloud.database().collection("campLogistics");
    this.setData({
      venue: options.venue,
    });

    let page = this;
    campLogistics.where({
      venue: options.venue
    }).get({
      success: res => {
        let year = res.data[0].date.getFullYear();
        let month = res.data[0].date.getMonth() + 1;
        let date = res.data[0].date.getDate();
        let hours = res.data[0].date.getHours();
        page.setData({
          year: year,
          month: month,
          date: date,
          hours: hours,
          location: res.data[0].location,
          long: res.data[0].long,
          lat: res.data[0].lat,
          [`markers[0].latitude`]: res.data[0].lat,
          [`markers[0].longitude`]: res.data[0].long,
          loading: false,
        });
      }
    })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})