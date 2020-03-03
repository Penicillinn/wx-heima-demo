// pages/goods_list/goods_list.js
import { request } from "../../request/index";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tapsList: [
      {
        id: 0,
        title: "综合",
        isActive: true
      },
      {
        id: 1,
        title: "销量",
        isActive: false
      },
      {
        id: 2,
        title: "价格",
        isActive: false
      }
    ],
    goodsList: []
  },
  // 请求的参数
  queryInfo: {
    query: "",
    cid: "",
    pagenum: 1,
    pagesize: 10
  },
  // 标志是否还有下一页
  hasNextPage: true,
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.queryInfo.cid = options.cid;
    this.getGoodsList();
  },
  getGoodsList() {
    request({
      method: "get",
      data: this.queryInfo,
      url: "/goods/search"
    }).then(res => {
      // 关闭下拉加载
      wx.stopPullDownRefresh();
      this.total = res.data.message.total;
      this.hasNextPage =
        this.queryInfo.pagenum * this.queryInfo.pagesize < this.total;
      let goodsList = this.data.goodsList.concat(res.data.message.goods);
      this.setData({
        goodsList
      });
    });
  },

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
  onPullDownRefresh: function() {
    // 重置goodsList数组
    this.setData({
      goodsList: []
    });
    // 修改pagenum
    this.queryInfo.pagenum = 1;
    // 发送请求
    this.getGoodsList();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    if (this.hasNextPage) {
      // 还有下一页，请求下一页的数据
      this.queryInfo.pagenum++;
      this.getGoodsList();
    } else {
      // 没有下一页
      wx.showToast({
        title: "没有更多数据"
      });
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {}
});
