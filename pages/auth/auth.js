// pages/auth/auth.js
import { request } from "../../request/index.js";
Page({
  /**
   * 页面的初始数据
   */
  data: {}
  // handleGetUserInfo(e) {
  //   // console.log(e);
  //   const { encryptedData, rawData, iv, signature } = e.detail;
  //   wx.login({
  //     success: result => {
  //       const { code } = result.code;
  //       let data = { code, encryptedData, rawData, iv, signature };
  //       request({
  //         method: "post",
  //         url: "/users/wxlogin",
  //         data
  //       }).then(res => {
  //         console.log(res);
  //       });
  //     }
  //   });
  // }
  // onLoad() {
  //   request({
  //     method: "post",
  //     url: "/my/orders/create",
  //     Authorization:
  //       "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo",
  //     data: {
  //       order_price: "12000",
  //       consignee_addr: "广东省广州市海珠区新港中路397号",
  //       goods: [43986, 1, 13999]
  //     }
  //   }).then(res => {
  //     console.log(res);
  //   });
  // }
});
