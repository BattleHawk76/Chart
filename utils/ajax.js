// ajax.js

import Vue from 'vue';
import ajax from 'uni-ajax';

// 创建请求实例 可默认配置
const _ajax = ajax.create({
	baseURL:'http://izgzet.natappfree.cc/weavermes'//填写默认地址
});

// 请求拦截器
_ajax.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return error;
  }
);

// 响应拦截器
_ajax.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return error;
  }
);

// 挂载在 Vue 原型链上
Vue.prototype.$ajax = _ajax;

export default _ajax;