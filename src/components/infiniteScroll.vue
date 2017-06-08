<template>
    <div>
        <ul v-infinite-scroll="loadMore"
            infinite-scroll-disabled="loading"
            infinite-scroll-distance="10">
            <li class="tc mgt-10 mgb-10" v-for="item in list">{{ item }}</li>
        </ul>
        <p v-show="loading" class="page-infinite-loading loading">
            <mt-spinner type="fading-circle"></mt-spinner>
            加载中...
        </p>
    </div>
</template>

<script>
    import Vue from 'vue';
    import {InfiniteScroll, Spinner} from 'mint-ui';
    Vue.component(Spinner.name, Spinner);
    Vue.use(InfiniteScroll);
    export default {
        data() {
            return {
                list: [],
                loading: false,
                allLoaded: false
            };
        },
        created() {

        },
        mounted() {
            for (let i = 1; i <= 20; i++) {
                this.list.push(i);
            }
        },
        methods: {
            loadMore() {
                this.loading = true;
                setTimeout(() => {
                    let last = this.list[this.list.length - 1];
                    for (let i = 1; i <= 10; i++) {
                        this.list.push(last + i);
                    }
                    this.loading = false;
                }, 1500);
            }
        }
    };
</script>

<style lang="scss">
    .loading {
        text-align: center;
        height: 50px;
        line-height: 50px;
        div {
            display: inline-block;
            vertical-align: middle;
            margin-right: 5px;
        }
    }
</style>