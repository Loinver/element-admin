<template>
    <div @click=handleTab class="footer-nav">
        <mt-tabbar v-model="selected" :value="selected">
            <mt-tab-item value="today" id="today">
                <span slot="icon" class="iconfont icon-home"></span>
                历史
            </mt-tab-item>
            <mt-tab-item value="news" id="news">
                <span slot="icon" class="iconfont icon-search"></span>
                新闻
            </mt-tab-item>
            <mt-tab-item value="imgs" id="imgs">
                <span slot="icon" class="iconfont icon-image"></span>
                图片
            </mt-tab-item>
            <mt-tab-item value="home" id="home">
                <span slot="icon" class="iconfont icon-account"></span>
                我的
            </mt-tab-item>
        </mt-tabbar>
    </div>
</template>

<script>
    import Vue from "vue";
    import { Tabbar, TabItem } from 'mint-ui';
    import fly from "../../assets/js/common";
    Vue.component(Tabbar.name, Tabbar);
    Vue.component(TabItem.name, TabItem);
    export default {
        data () {
            return {
                selected:"today"
            }
        },
        created(){
            this.selected = fly.decode(fly.localStore("current_tab_nav"));
        },
        methods: {
            handleTab () {
                fly.localStore("current_tab_nav",fly.encode(this.selected));
                this.$router.push('/' + this.selected);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .iconfont{
        font-size: 20px;
    }
</style>
