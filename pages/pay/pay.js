// pages/cart/cart.js
import { request } from "../../request/index.js";
import { showToast } from "../../utils/async.js";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cartList: [],
    isAllChecked: false,
    totalPrice: 0,
    totalCount: 0
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    // 读取缓存中的地址信息
    let address = wx.getStorageSync("address");
    let cartList = wx.getStorageSync("cart") || [];
    cartList = cartList.filter(item => item.checked);
    this.refresh(cartList);
    this.setData({
      address
    });
  },
  refresh(cartList) {
    let totalPrice = 0;
    let totalCount = 0;
    cartList.forEach(item => {
      totalCount += item.num;
      totalPrice += item.num * item.goods_price;
    });
    this.setData({
      cartList,
      totalPrice,
      totalCount
    });
    // wx.setStorageSync("cart", cartList);
  },
  // 点击支付创建订单
  async payClick() {
    wx.setStorageSync(
      "token",
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo"
    );
    let token = wx.getStorageSync("token");
    if (token) {
      // 发请求创建订单编号
      const order_price = this.data.totalCount;
      const consignee_addr = this.data.address.all;
      let goods = [];
      this.data.cartList.forEach(item => {
        goods.push({
          goods_id: item.goods_id,
          goods_number: item.num,
          goods_price: item.goods_price
        });
      });
      let data = { order_price, consignee_addr, goods };
      // 获取订单编号
      let res = await request({
        method: "post",
        url: "/my/orders/create",
        data,
        Authorization: token
      });
      await showToast("获取订单编号成功");
      const { order_number } = res.data.message;
      // 根据订单编号发起与支付接口
      // let pay = await request({
      //   method: "post",
      //   url: "/my/orders/req_unifiedorder",
      //   data: {
      //     order_number
      //   },
      //   Authorization: token
      // });
      console.log(order_number);
      // 调用微信支付接口
      // wx.requestPayment()
      //查询后台订单状态
      // wx.showToast 显示支付成功或失败
    }
  }
});
