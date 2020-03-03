// pages/feedback/feedback.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tapsList: [
      {
        id: 0,
        title: "体验",
        isActive: true
      },
      {
        id: 1,
        title: "商品、商家投诉",
        isActive: false
      }
    ],
    chooseImgList: []
  },
  tapsChange(e) {
    // 切换taps后，子组件传递过来对应taps的id
    let { id } = e.detail;
    this.data.tapsList.forEach(item => {
      if (item.id === id) {
        item.isActive = true;
      } else {
        item.isActive = false;
      }
    });
    this.setData({
      tapsList: this.data.tapsList
    });
  },
  chooseImg() {
    wx.chooseImage({
      count: 10,
      type: "image",
      success: res => {
        // console.log(res.tempFilePaths);
        let chooseImgList = this.data.chooseImgList.concat(res.tempFilePaths);
        this.setData({
          chooseImgList
        });
      }
    });
  },
  clear(e) {
    let index = e.currentTarget.dataset.index;
    this.data.chooseImgList.splice(index, 1);
    this.setData({
      chooseImgList: this.data.chooseImgList
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {}
});
