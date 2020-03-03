// pages/search/search.js
import { request } from "../../request/index.js";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isButtonShow: false,
    inpValue: "",
    searchList: []
  },
  timeId: null,
  inputChange(e) {
    // console.log(e);
    const { value } = e.detail;
    if (!value.trim()) {
      // 输入值无效
      // 清空数据
      // 清空输入框
      this.setData({
        isButtonShow: false,
        searchList: [],
        inpValue: ""
      });
      return;
    }
    clearTimeout(this.timeId);
    // 发请求
    this.timeId = setTimeout(() => {
      this.getSearchData(value);
    }, 1000);
    this.setData({
      inpValue: value,
      isButtonShow: true
    });
  },
  getSearchData(value) {
    request({
      method: "get",
      url: "/goods/qsearch",
      data: {
        query: value
      }
    }).then(res => {
      const { message } = res.data;
      this.setData({
        searchList: message
      });
    });
  },
  cancel() {
    this.setData({
      isButtonShow: false,
      searchList: [],
      inpValue: ""
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
