import Vue from 'vue';
import Router from 'vue-router';

/* Layout */
import Layout from '../views/layout/Layout';

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router);

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
 * */
// 所有权限通用路由表
// 如首页和登录页和一些不用权限的公用页面
export const constantRouterMap = [
  {
    path: '/login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "404" */ '@/views/404'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import(/* webpackChunkName: "dashboard" */ '@/views/dashboard/index'),
      meta: {
        title: '首页',
        icon: 'dashboard',
        noCache: true,
        affix: true
      }
    }]
  },
  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: {
      title: '例子',
      icon: 'example'
    },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import(/* webpackChunkName: "table" */ '@/views/table/index'),
        meta: {
          title: '表格',
          icon: 'table'
        }
      },
      {
        path: 'table1',
        name: 'Table1',
        component: () => import(/* webpackChunkName: "table1" */ '@/views/table/index1'),
        meta: {
          title: '表格1',
          icon: 'table'
        }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import(/* webpackChunkName: "tree" */ '@/views/tree/index'),
        meta: {
          title: '树',
          icon: 'tree'
        }
      },
      // {
      //   path: 'game',
      //   name: 'game',
      //   component: () => import(/* webpackChunkName: "game" */ '@/views/game/index.vue'),
      //   meta: {
      //     title: "转转乐",
      //     icon: 'tree'
      //   }
      // },
    ]
  },
  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import(/* webpackChunkName: "form" */ '@/views/form/index'),
        meta: {
          title: '表单',
          icon: 'form'
        }
      }
    ]
  },
  {
    path: '/setting',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'setting',
        component: () => import(/* webpackChunkName: "setting" */ '@/views/setting/index'),
        meta: {
          title: '用户设置',
          icon: 'gear'
        }
      }
    ]
  },
  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: '嵌套路由',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import(/* webpackChunkName: "menu1" */ '@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: {
          title: '菜单1'
        },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: {
              title: '菜单1-1'
            }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: {
              title: '菜单1-2'
            },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: {
                  title: '菜单1-2-1'
                }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: {
                  title: '菜单1-2-2'
                }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: {
              title: '菜单1-3'
            }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        meta: {
          title: '菜单2'
        }
      }
    ]
  }
];

export default new Router({
  // mode: 'history', // 后端支持可开
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
});
export const asyncRouterMap = [
  {
    path: '/test',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'testIndex',
        component: () => import(/* webpackChunkName: "test" */ '@/views/test/index'),
        meta: {
          title: '测试权限',
          icon: 'gear',
          roles: ['admin'] // you can set roles in root nav
        }
      }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
];
