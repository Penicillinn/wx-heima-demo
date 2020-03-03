// pages/cart/cart.js
import {
  getSetting,
  chooseAddress,
  openSetting,
  showModal
} from "../../utils/async.js";
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
  async chooseAddress() {
    // console.log("ok");
    /*
      1、获取用户权限信息 authSetting['scope.address']
      2、判断 authSetting['scope.address']的状态
      3、true 或者 undefined时可以直接调用 wx.chooseAddress 位置信息
      4、 为false 时， 先调用wx.openSetting引导用户打开授权页面
      5、再调用 wx.chooseAddress获取位置信息
      6、使用 async 和 await 优化代码
    */
    // 获取用户的权限
    try {
      let res1 = await getSetting();
      let scopeAddress = res1.authSetting["scope.address"];
      let addressInfo = {};
      // 判断权限状态
      if (scopeAddress === true || scopeAddress === undefined) {
        // 获取位置信息
        addressInfo = await chooseAddress();
      } else {
        //引导用户打开授权页面
        let res = await openSetting();
        if (res.authSetting["scope.address"]) {
          // 允许授权
          // 获取位置信息
          addressInfo = await chooseAddress();
        }
      }
      addressInfo.all =
        addressInfo.provinceName +
        addressInfo.cityName +
        addressInfo.countyName +
        addressInfo.detailInfo;
      // 将位置信息存入缓存
      wx.setStorageSync("address", addressInfo);
    } catch (error) {
      console.log(error);
    }
  },
  // 修改单个商品的选中状态
  toggleCheck(e) {
    let goods_id = e.currentTarget.dataset.id;
    // 修改data中的商品信息
    this.data.cartList.forEach(item => {
      if (item.goods_id === goods_id) {
        item.checked = !item.checked;
      }
    });

    // 将data中的数据更新
    //重新更新总价格，总数量，以及全选按钮
    this.refresh(this.data.cartList);
    // 将缓存的信息更新
    // wx.setStorageSync("cart", this.data.cartList);
  },
  // 修改全选按钮的状态
  toggleAllCheck() {
    let isAllChecked = !this.data.isAllChecked;
    this.data.cartList.forEach(item => {
      item.checked = isAllChecked;
    });
    this.refresh(this.data.cartList);
  },
  // 商品数量发送变化
  async numberEdit(e) {
    const { opration, id } = e.currentTarget.dataset;
    const { cartList } = this.data;
    // console.log(opration, id);
    let index = cartList.findIndex(item => item.goods_id === id);
    // this.data.cartList.forEach(item => {
    //   if (item.goods_id === id) {
    //     if (item.num <= 1) {
    //       console.log("是否要删除");
    //     } else {
    //       item.num += opration;
    //     }
    //   }
    // });
    if (cartList[index].num <= 1 && opration === -1) {
      // wx.showModal({
      //   title: "提示",
      //   content: "确定删除改商品？",
      //   success: result => {
      //     if (result.confirm) {
      //       console.log("success");
      //     } else {
      //       console.log("err");
      //     }
      //   }
      // });
      let res = await showModal("确认删除该商品？");
      if (res) {
        // 确认删除
        cartList.splice(index, 1);
      }
    } else {
      // 数量还没有小于等于1
      cartList[index].num += opration;
    }
    this.refresh(this.data.cartList);
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
    // 读取缓存中的地址信息
    let address = wx.getStorageSync("address");
    let cartList = wx.getStorageSync("cart") || [];
    this.refresh(cartList);
    this.setData({
      address
    });
  },
  refresh(cartList) {
    let isAllChecked = cartList.length ? true : false;
    let totalPrice = 0;
    let totalCount = 0;
    cartList.forEach(item => {
      if (item.checked) {
        totalCount += item.num;
        totalPrice += item.num * item.goods_price;
      } else {
        // 只要有一个商品未被选中，全选就取消
        isAllChecked = false;
      }
    });
    this.setData({
      cartList,
      isAllChecked,
      totalPrice,
      totalCount
    });
    wx.setStorageSync("cart", cartList);
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
