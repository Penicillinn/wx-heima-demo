// pages/order/order.js
import { request } from "../../request/index";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tapsList: [
      {
        id: 0,
        title: "全部",
        isActive: true
      },
      {
        id: 1,
        title: "待付款",
        isActive: false
      },
      {
        id: 2,
        title: "待发货",
        isActive: false
      },
      {
        id: 3,
        title: "退款/退货",
        isActive: false
      }
    ],
    type: null,
    orderList: []
  },
  changeTaps(id) {
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
  tapsChange(e) {
    // 切换taps后，子组件传递过来对应taps的id
    let { id } = e.detail;
    this.changeTaps(id);
    this.changeTitle(id);
    this.setData({
      type: id + 1
    });
    // 发请求获取数据
    this.getOrderData();
  },
  // 获取订单数据
  getOrderData() {
    request({
      method: "get",
      url: "/my/orders/all",
      data: {
        type: this.data.type
      },
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo"
    }).then(res => {
      // console.log(res);
      const { orders } = res.data.message;
      orders.forEach(
        item =>
          (item.formatTime = new Date(item.create_time * 1000).toLocaleString())
      );
      this.setData({
        orderList: orders
      });
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
    let id = parseInt(pages[pages.length - 1].options.type) - 1;
    // 切换title
    this.changeTitle(id);
    // 切换选中的tap
    this.changeTaps(id);
    this.setData({
      type: id + 1
    });
    this.getOrderData();
  },
  changeTitle(id) {
    if (id === 0) {
      wx.setNavigationBarTitle({
        title: "全部订单"
      });
    } else if (id === 1) {
      wx.setNavigationBarTitle({
        title: "待付款"
      });
    } else if ((id = 2)) {
      wx.setNavigationBarTitle({
        title: "待发货"
      });
    } else {
      wx.setNavigationBarTitle({
        title: "退货/退款"
      });
    }
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
