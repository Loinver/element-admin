/**
* Created by Linyer on 2017/6/9.
*/
<template>
    <div>
        <mt-cell
                title="标题文字"
                to="//github.com"
                is-link
                value="带链接">
        </mt-cell>
        <mt-cell title="标题文字"></mt-cell>
        <mt-cell title="标题文字" value="说明文字"></mt-cell>
        <mt-cell title="标题文字" icon="more" value="带 icon"></mt-cell>
        <mt-cell title="标题文字">
            <span>icon 是图片</span>
            <img slot="icon" src="../assets/img/1.jpg" width="24" height="24">
        </mt-cell>
        <mt-cell title="标题文字" is-link>
            <span style="color: green">这里是元素</span>
        </mt-cell>
        <mt-cell title="标题" label="描述信息" is-link></mt-cell>
    </div>
</template>

<script>
    import Vue from 'vue';
    import {Cell} from 'mint-ui';
    Vue.component(Cell.name, Cell);
    export default {
        data() {
            return {};
        },
        created() {

        },
        methods: {}
    };
</script>
<style lang="scss">
    @import "../assets/font/iconfont.css";
</style>