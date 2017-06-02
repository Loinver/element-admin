import Vue from 'vue';
import Router from 'vue-router';
//路由页面
import Index from '@/components/index';
import Login from '@/components/login';
import Register from '@/components/register';
import Loadmore from '@/components/loadmore';
Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {path: '*', component: Index},
    {
      name: 'Index',
      path: '/index',
      component: Index
    },
    {
      name: 'Login',
      path: '/login',
      component: Login
    },
    {
      name: 'Register',
      path: '/register',
      component: Register
    },
    {
      name: 'Loadmore',
      path: '/loadmore',
      component: Loadmore
    },
    {
      name: 'Index',
      path: '/',
      component: Index
    }
  ]
});
router.beforeEach((to, from, next) => {
  console.log(`路由开始：${from.path}`)
  next();
});
router.afterEach(route => {
  console.log(`路由结束：${route.path}`)
});

export default router;
