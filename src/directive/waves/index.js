import waves from './waves'
// 点击按钮的时候  波浪状散开
const install = function (Vue) {
  Vue.directive('waves', waves)
};

if (window.Vue) {
  window.waves = waves;
  Vue.use(install); // eslint-disable-line
}

waves.install = install;
export default waves
