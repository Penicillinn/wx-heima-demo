// pages/goods_detail/goods_detail.js
import { request } from "../../request/index";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    goodsInfo: {},
    isFav: null,
    //收藏商品的数据
    favList: []
  },
  goodsData: {},
  // 预览图片
  imagePreview(e) {
    let index = e.currentTarget.dataset.index;
    let urls = this.data.goodsInfo.pics.map(item => item.pics_mid);
    wx.previewImage({
      current: urls[index], // 当前显示图片的http链接
      urls // 需要预览的图片http链接列表
    });
  },
  addToCart() {
    // console.log(this.goodsData);
    // 从缓存读取数据
    let cart = wx.getStorageSync("cart") || [];
    // 获取该商品在缓存中的索引，不存在返回-1
    let index = cart.findIndex(item => {
      return item.goods_id === this.goodsData.goods_id;
    });
    if (index === -1) {
      // 之前缓存中不存在该商品
      this.goodsData.num = 1;
      this.goodsData.checked = true;
      cart.push(this.goodsData);
    } else {
      // 缓存中存在该商品，修改商品数量
      cart[index].num++;
    }
    // 更新缓存
    wx.setStorageSync("cart", cart);
    wx.showToast({
      title: "添加成功",
      mask: true
    });
  },
  favClick() {
    // 判断收藏数组中是否存在该商品
    let index = this.data.favList.findIndex(
      item => item.goods_id === this.goodsData.goods_id
    );
    if (index === -1) {
      // 不存在，添加改商品信息
      this.data.favList.push(this.goodsData);
      this.setData({
        isFav: true
      });
    } else {
      // 存在，直接从数组中删除
      this.data.favList.splice(index, 1);
      this.setData({
        isFav: false
      });
    }
    // 跟新data中的数据
    this.setData({
      favList: this.data.favList
    });
    // 将数据存入缓存
    wx.setStorageSync("favList", this.data.favList);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getGoodsDetail(options.goods_id);
    // // 读取收藏的缓存
    // let favList = wx.getStorageSync("favList") || [];
    // // console.log(this.goodsData.goods_id);
    // let index = favList.findIndex(
    //   item => item.goods_id === this.goodsData.goods_id
    // );
    // let isFav = false;
    // if (index !== -1) {
    //   // 该商品已收藏
    //   isFav = true;
    // }
    // // console.log(index);
    // this.setData({
    //   isFav,
    //   favList
    // });
  },
  getGoodsDetail(goods_id) {
    request({
      url: "/goods/detail",
      data: {
        goods_id
      },
      method: "get"
    }).then(res => {
      // console.log(res);
      this.goodsData = res.data.message;
      // 读取收藏的缓存
      let favList = wx.getStorageSync("favList") || [];
      let index = favList.findIndex(
        item => item.goods_id === this.goodsData.goods_id
      );
      let isFav = false;
      if (index !== -1) {
        // 该商品已收藏
        isFav = true;
      }
      let obj = {};
      obj.pics = this.goodsData.pics;
      obj.goods_name = this.goodsData.goods_name;
      obj.goods_price = this.goodsData.goods_price;
      // 把.webp格式图片替换成.jpg格式图片
      obj.goods_introduce = this.goodsData.goods_introduce.replace(
        /\.webp/g,
        ".jpg"
      );
      this.setData({
        goodsInfo: obj,
        isFav,
        favList
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
