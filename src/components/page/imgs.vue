<template>
    <div class="imgs">
        <mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange" ref="loadmore">
            <div v-for="item in list.aaa">
                <div class="demo-paper" :zDepth="2">
                    <p>{{item.content}}</p>
                    <img v-lazy="item.url" class="imgs">
                </div>
            </div>
        </mt-loadmore>
    </div>
</template>

<script>
    import Vue from "vue";
    import { Lazyload } from 'mint-ui';
    Vue.use(Lazyload);
    export default {
        created (){
            this.$parent.$children[0]._data.text = "图片";
            this.$store.dispatch('getImgs')
        },
        computed: {
            list(){
                return {
                    aaa: this.$store.state.imgs.imgs
                }
            }
        },
        methods: {
            loadTop() {
                this.$store.dispatch('getImgs')
                this.$refs.loadmore.onTopLoaded();
            },
            handleTopChange(status) {
                this.topStatus = status;
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

</style>
