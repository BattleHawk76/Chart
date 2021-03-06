class Interceptor {
  constructor() {
    this.fulfilled = async res => res;
    this.rejected = async err => err;
  }
  /**
   * 拦截器
   * @param {function} fulfilled 拦截成功
   * @param {function} rejected 拦截失败
   */
  use(fulfilled, rejected) {
    if (typeof fulfilled === 'function') {
      this.fulfilled = fulfilled;
    }
    if (typeof rejected === 'function') {
      this.rejected = rejected;
    }
  }
}

export default Interceptor;
