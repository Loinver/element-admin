import Vue from "vue";
import Router from "vue-router";
import {Indicator} from "mint-ui";
//路由页面
import Index from "@/components/index";
import Login from "@/components/login";
import Discuss from "@/components/discuss";
import LoadMore from "@/components/loadmore";
import InfiniteScroll from "@/components/infiniteScroll";
import Cell from "@/components/cell";
import Cell_Swipe from "@/components/cell_Swipe";
import main from "@/components/page/main";
import joke from "@/components/page/joke";
import news from "@/components/page/news";
import imgs from "@/components/page/imgs";
import home from "@/components/page/home";
import today from "@/components/page/today";
import JokeList from "@/components/JokeList";
import addJoke from "@/components/addJoke";
Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [
        {path: '*', component: Index},
        {path: '/', component: Login},
        {
            path: '/index',
            name: 'Index',
            component: Index
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/discuss',
            name: 'Discuss',
            component: Discuss
        },
        {
            path: '/loadMore',
            name: 'LoadMore',
            component: LoadMore
        },
        {
            path: '/infiniteScroll',
            name: 'InfiniteScroll',
            component: InfiniteScroll
        },
        {
            path: '/cell',
            name: 'Cell',
            component: Cell
        },
        {
            path: '/cell_Swipe',
            name: 'Cell_Swipe',
            component: Cell_Swipe
        }, {
            path: '/main',
            name: "main",
            component: main,
            children: [
                {
                    path: '/main',
                    name: "main",
                    component: main
                },
                {
                    path: '/joke',
                    name: '/joke',
                    component: joke
                },
                {
                    path: '/news',
                    name: '/news',
                    component: news
                },
                {
                    path: '/imgs',
                    name: '/imgs',
                    component: imgs
                },
                {
                    path: '/home',
                    name: '/home',
                    component: home
                },
                {
                    path: '/today',
                    name: '/today',
                    component: today
                },
                {
                    path: '/addJoke',
                    name: '/addJoke',
                    component: addJoke
                },
                {
                    path: '/JokeList',
                    name: '/jokeList',
                    component: JokeList
                }
            ]
        }
    ]
});
router.beforeEach((to, from, next) => {
    console.log('路由开始：${from.path}');
    Indicator.open('加载中...');
    next();
});
router.afterEach(route => {
    setTimeout(() => {
        Indicator.close();
    }, 1000);
    console.log('路由结束：${route.path}');
});

export default router;
