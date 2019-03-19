import Vue from 'vue'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
// funDebug 插件
import * as funDebug from "fundebug-javascript";
import funDebugVue from "fundebug-vue";

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

funDebug.apikey = "b72e45f51f9f95fce304fb5e370e0d3d6913c5e56370bfc597ba84733bed7ec0"
funDebugVue(funDebug, Vue);

if (process.env.NODE_ENV === 'development') {
  require('./mock') // simulation data
}

Vue.use(ElementUI, {
  locale
});

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
