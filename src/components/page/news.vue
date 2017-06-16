<template>
    <div class="news">
        <div v-for="item in list.aaa">
            <div class="demo-paper" :zDepth="2">
                <a :href="item.url">
                    <img v-lazy="item.thumbnail_pic_s">
                    <p>{{item.title}}</p>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from "vue";
    import { Lazyload } from 'mint-ui';
    Vue.use(Lazyload);
    export default {
        created (){
            this.$parent.$children[0]._data.text = "新闻";
            this.$store.dispatch('getNews')
        },
        computed: {
            list(){
                return {
                    aaa: this.$store.state.news.list
                }
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    image[lazy=loading] {
        width: 40px;
        height: 300px;
        margin: auto;
    }
</style>
