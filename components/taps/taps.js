// components/taps/taps.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tapsList: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    tapsChange(e) {
      let { id } = e.currentTarget.dataset;
      //触发父组件的事件
      this.triggerEvent("tapsChange", { id });
    }
  }
});
