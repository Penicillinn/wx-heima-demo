// pages/category/category.js
import { request } from "../../request/index.js";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 左边分类的数据
    cateLeftList: [],
    // 左边分类对应的右边的数据
    cateRightList: [],
    currentIndex: 0
  },
  cateData: [],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 获取页面数据
    this.getStorageData();
    // 页面加载的时候从本地缓存读取currentIndex，判断currentIndex是否存在
    this.getStoreIndex();
  },
  // 获取缓存中的数据
  getStorageData() {
    // 判断缓存中是否有数据
    let storeData = wx.getStorageSync("cates");
    if (!storeData) {
      // 不存在缓存，发送请求
      // 请求数据
      this.getCateList();
    } else {
      // 存在缓存
      // 判断缓存是否过期
      if (Date.now() - storeData.time > 1000 * 10) {
        // 超过十秒钟，重新发送请求
        this.getCateList();
      } else {
        // 没有过期，使用缓存数据渲染页面
        this.cateData = storeData.data;
        let cateLeftList = this.cateData.map(item => {
          return item.cat_name;
        });
        let cateRightList = this.cateData[0].children;
        this.setData({
          cateLeftList,
          cateRightList
        });
      }
    }
  },
  // 获取缓存中的index
  getStoreIndex() {
    wx.getStorage({
      key: "currentIndex",
      success: res => {
        //存在，修改index
        let currentIndex = res.data;
        this.setData({
          currentIndex
        });
      },
      fail: () => {
        // 不存在缓存就加载，第一个数据
        console.log("没有缓存的数据");
      }
    });
  },
  // 请求数据
  getCateList() {
    request({
      method: "get",
      url: "/categories"
    }).then(res => {
      this.cateData = res.data.message;
      // 拿到数之后，存入缓存
      wx.setStorageSync("cates", {
        time: Date.now(),
        data: this.cateData
      });
      let cateLeftList = this.cateData.map(item => {
        return item.cat_name;
      });
      let cateRightList = this.cateData[0].children;
      this.setData({
        cateLeftList,
        cateRightList
      });
    });
  },
  // 左边分类的点击事件
  cateChange(e) {
    // console.log(e);
    let { index } = e.currentTarget.dataset;
    // 修改右边显示的商品数据
    let cateRightList = this.cateData[index].children;
    this.setData({
      currentIndex: index,
      cateRightList
    });
    // 将修改之后的index同步到缓存中
    wx.setStorage({
      key: "currentIndex",
      data: index
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
