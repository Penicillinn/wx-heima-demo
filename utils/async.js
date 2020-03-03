export function getSetting() {
  return new Promise((resolve, reject) => {
    wx.getSetting({
      success: result => {
        resolve(result);
      },
      fail: err => {
        reject(err);
      }
    });
  });
}
export function chooseAddress() {
  return new Promise((resolve, reject) => {
    wx.chooseAddress({
      success: result => {
        resolve(result);
      },
      fail: err => {
        reject(err);
      }
    });
  });
}
export function openSetting() {
  return new Promise((resolve, reject) => {
    wx.openSetting({
      success: result => {
        resolve(result);
      },
      fail: err => {
        reject(err);
      }
    });
  });
}
export function showModal(content) {
  return new Promise((resolve, reject) => {
    wx.showModal({
      title: "",
      content,
      success: result => {
        if (result.confirm) {
          resolve("ok");
        } else {
          resolve("");
        }
      },
      fail: err => {
        reject(err);
      }
    });
  });
}
export function showToast(title) {
  return new Promise((resolve, reject) => {
    wx.showToast({
      title,
      success() {
        resolve();
      },
      fail() {
        reject();
      }
    });
  });
}
