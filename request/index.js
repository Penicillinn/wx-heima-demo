let requestTimes = 0;
export function request(query) {
  requestTimes++;
  wx.showLoading({
    title: "正在加载",
    mask: true
  });
  const { url } = query;
  const { method } = query;
  const { data } = query;
  const { Authorization } = query;
  return new Promise((resolve, reject) => {
    wx.request({
      url: "https://api-hmugo-web.itheima.net/api/public/v1" + url,
      data,
      header: { "content-type": "application/json", Authorization },
      method,
      success: result => {
        resolve(result);
      },
      fail: err => {
        reject(err);
      },
      complete: () => {
        requestTimes--;
        if (requestTimes === 0) {
          // 当最后一个请求完成之后再去关闭加载蒙层
          wx.hideLoading();
        }
      }
    });
  });
}
// 商品详情页开发
