<template>
    <div class="head-nav">
        <mt-header :title="text">
            <!--<router-link to="/" slot="left">-->
            <mt-button slot="left">
                <mt-button @click="back" icon="back"></mt-button>
            </mt-button>
            <!--</router-link>-->
        </mt-header>
    </div>
</template>

<script>
    import Vue from "vue";
    import {Header,Button} from 'mint-ui';
    Vue.component(Header.name, Header);
    Vue.component(Button.name, Button);
    export default {
        data(){
            return {
                text: '历史上的今天'
            }
        },
        methods: {
            back(){
                this.$router.go(-1);
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>
