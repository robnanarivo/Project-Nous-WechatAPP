// miniprogram/pages/admission/admission.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    apps: [],
    loading: true,
    totalBatches: 0,
    batchCount: 0,
    venueArray: ['所有申请', '青岛', '绵阳2022', '长沙2022', '贵阳2022', '三门2022', '烟台2022', '遵义2022'],
    venueIdx: 0,
    totalApplicants: 0,
    totalAccepted: 0,
    totalRejected: 0,
    venueApplicants: 0,
    venueAccepted: 0,
    venueRejected: 0
  },

  venuePickerChange: function(e) {
    this.setData({
      venueIdx: e.detail.value,
      loading: true
    })
    const db = wx.cloud.database();
    const studentApp = db.collection("studentApp");
    var that = this;
    if (that.data.venueIdx == 0) {
      studentApp.count({
        success: function(res) {
          that.setData({
            totalBatches: Math.ceil(res.total / 20),
            totalApplicants: res.total
          });
        }
      });
      studentApp.orderBy('reviewed', 'asc').orderBy('accepted', 'desc').get({
        success: function(res) {
          console.log(res);
          that.setData({
            apps: res.data,
            loading: false,
            batchCount: 1
          });
        }
      })      
    } else {
      studentApp.where({
        venue: that.data.venueArray[that.data.venueIdx]
      }).count({
        success: function(res) {
          that.setData({
            totalBatches: Math.ceil(res.total / 20),
            venueApplicants: res.total
          });
        }
      });
      studentApp.where({
        venue: that.data.venueArray[that.data.venueIdx],
        reviewed: true,
        accepted: true
      }).count({
        success: function(res) {
          that.setData({
            venueAccepted: res.total
          })
        }
      });
      studentApp.where({
        venue: that.data.venueArray[that.data.venueIdx],
        reviewed: true,
        accepted: false
      }).count({
        success: function(res) {
          that.setData({
            venueRejected: res.total
          })
        }
      });
      studentApp.where({
        venue: that.data.venueArray[that.data.venueIdx]
      }).orderBy('reviewed', 'asc').orderBy('accepted', 'desc').get({
        success: function(res) {
          console.log(res);
          that.setData({
            apps: res.data,
            loading: false,
            batchCount: 1
          });
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const db = wx.cloud.database();
    const studentApp = db.collection("studentApp");
    var that = this;
    studentApp.count({
      success: function(res) {
        that.setData({
          totalBatches: Math.ceil(res.total / 20),
          totalApplicants: res.total
        });
      }
    });
    studentApp.where({
      reviewed: true,
      accepted: true
    }).count({
      success: function(res) {
        that.setData({
          totalAccepted: res.total
        })
      }
    });
    studentApp.where({
      reviewed: true,
      accepted: false
    }).count({
      success: function(res) {
        that.setData({
          totalRejected: res.total
        })
      }
    });
    studentApp.orderBy('reviewed', 'asc').orderBy('accepted', 'desc').get({
      success: function(res) {
        console.log(res);
        that.setData({
          apps: res.data,
          loading: false,
          batchCount: 1
        });
      }
    })
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
    this.onLoad();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.batchCount < this.data.totalBatches) {
      const db = wx.cloud.database();
      const studentApp = db.collection("studentApp");
      var that = this;
      if (that.data.venueIdx == 0) {
        studentApp.orderBy('reviewed', 'asc').orderBy('accepted', 'desc').skip(20 * this.data.batchCount).get({
          success: function(res) {
            that.setData({
              apps: that.data.apps.concat(res.data),
              batchCount: that.data.batchCount + 1
            });
          }
        })
      } else {
        studentApp.where({
          venue: that.data.venueArray[that.data.venueIdx],
        }).orderBy('reviewed', 'asc').orderBy('accepted', 'desc').skip(20 * this.data.batchCount).get({
          success: function(res) {
            that.setData({
              apps: that.data.apps.concat(res.data),
              batchCount: that.data.batchCount + 1
            });
          }
        })
      }
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})