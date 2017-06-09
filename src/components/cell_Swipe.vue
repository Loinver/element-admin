/**
* Created by Linyer on 2017/6/9.
*/
<template>
    <div>
        <mt-cell-swipe
                v-for="n in 10"
                :right="rightButtons"
                title="左滑试试"
                :key="n">
        </mt-cell-swipe>
    </div>
</template>

<script>
    import Vue from 'vue';
    import {CellSwipe, MessageBox} from 'mint-ui';
    Vue.component(CellSwipe.name, CellSwipe);
    export default {
        data() {
            return {};
        },
        created() {
            let _self = this;
            this.rightButtons = [
                {
                    content: '标记为未读',
                    style: {background: 'lightgray', color: '#fff'},
                    handler: () => {
                        console.log(1)
                    }
                },
                {
                    content: '删除',
                    style: {background: 'red', color: '#fff'},
                    handler: () => {
                        console.log(_self);
                        MessageBox('操作成功');
                        //_self.$messagebox('删除');
                    }
                }
            ];
        },
        methods: {

        }
    };
</script>

<style lang="scss" scoped>

</style>