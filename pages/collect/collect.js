// pages/collect/collect.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tapsList: [
      {
        id: 0,
        title: "商品收藏",
        isActive: true
      },
      {
        id: 1,
        title: "品牌收藏",
        isActive: false
      },
      {
        id: 2,
        title: "店铺收藏",
        isActive: false
      },
      {
        id: 3,
        title: "浏览足迹",
        isActive: false
      }
    ],
    favList: []
  },
  tapsChange(e) {
    // 切换taps后，子组件传递过来对应taps的id
    let { id } = e.detail;
    this.changeTap(id);
  },
  changeTap(id) {
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
  onShow: function() {
    let pages = getCurrentPages();
    const { type } = pages[pages.length - 1].options;
    this.changeTap(parseInt(type));
    // 从缓存拿数据
    let favList = wx.getStorageSync("favList");
    this.setData({
      favList
    });
  },

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
