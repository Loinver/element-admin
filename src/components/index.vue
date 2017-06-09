<template>
    <div class="fly-index">
        <mt-swipe name="banner" class="fly-swipe" :auto="4000" @change="handleChange">
            <mt-swipe-item>
                <router-link to="/index"><img src="../assets/img/1.jpg"></router-link>
            </mt-swipe-item>
            <mt-swipe-item>
                <router-link to="/index"><img src="../assets/img/2.jpg"></router-link>
            </mt-swipe-item>
            <mt-swipe-item>
                <router-link to="/index"><img src="../assets/img/3.jpg"></router-link>
            </mt-swipe-item>
            <mt-swipe-item>
                <router-link to="/index"><img src="../assets/img/4.jpg"></router-link>
            </mt-swipe-item>
            <mt-swipe-item>
                <router-link to="/index"><img src="../assets/img/5.jpg"></router-link>
            </mt-swipe-item>
        </mt-swipe>
        <div class="menu-box">
            <router-link tag="p" :to=menu.href class="menu-list" v-for="menu in menus" :key="menu.id" v-text="menu.title"></router-link>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import {Swipe, SwipeItem} from 'mint-ui';
    Vue.component(Swipe.name, Swipe);
    Vue.component(SwipeItem.name, SwipeItem);
    export default {
        data() {
            return {
                menus: [{
                    'id': 1,
                    'title': '租房入户',
                    'href': '/login'
                }, {
                    'id': 2,
                    'title': '学历入户',
                    'href': '/discuss'
                }, {
                    'id': 3,
                    'title': '投资入户',
                    'href': '/infiniteScroll'
                }, {
                    'id': 4,
                    'title': '纳税入户',
                    'href': '/loadMore'
                }, {
                    'id': 5,
                    'title': '租房入户租房入户租',
                    'href': '/cell'
                }, {
                    'id': 6,
                    'title': '新生婴儿入户',
                    'href': '/cell_Swipe'
                }]
            };
        },
        created() {
        },
        mounted() {
        },
        methods: {
            handleChange(index){
                //console.log(index);
            }
        }
    };
</script>

<style lang="scss" scoped>
    .fly-swipe.mint-swipe {
        width: 100%;
        height: 20rem;
    }

    .fly-swipe.mint-swipe .mint-swipe-item {
        width: 100%;
    }

    .fly-swipe.mint-swipe .mint-swipe-item img {
        width: 100%;
    }

    .menu-box {
        margin-top: 1.5rem;
        display: flex;
        padding: 0 1rem;
        flex-wrap: wrap;

        .menu-list {
            width: 9rem;
            height: 11.7rem;
            margin: 0.5rem;
            padding-left: 0.8rem;
            font-size: 1.8rem;
            line-height: 2.2rem;
            display: inline-flex;
            align-items: center;
            border-radius: 0.2rem;
            box-shadow: 0 0.15rem 0.25rem 0 rgba(0, 0, 0, 0.08), 0px 0.4rem 0.8rem 0 rgba(0, 0, 0, 0.08);
            overflow: hidden;
            @for $i from 1 through 6 {
                &:nth-child(#{$i}) {
                    background-image: url("../assets/img/menubg-" +$i+ ".png");
                    background-size: cover;
                }
            }
        }
    }
</style>
