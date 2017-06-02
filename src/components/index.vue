<template>
  <div class="fly-index">
    <mt-header v-bind:title="curr_title" fixed>
      <!--<router-link to="/" slot="left">-->
      <!--<mt-button icon="back"></mt-button>-->
      <!--</router-link>-->
      <mt-button icon="more" @click="click_more" slot="right"></mt-button>
    </mt-header>
    <div class="page-wrap">

    </div>
    <tabbar></tabbar>
  </div>
</template>

<script>
  import Vue from 'vue';
  import {Header, Button} from 'mint-ui';
  import Login from './login';
  import Register from './register';
  import Tabbar from './system/bottom';
  Vue.component(Header.name, Header);
  Vue.component(Button.name, Button);
  export default {
    name: 'fly-index',
    data() {
      return {
        curr_title: "首页"
      };
    },
    created() {

    },
    mounted() {
    },
    methods: {
      click_more(){
        console.log("点击更多了");
      }
    },
    components: {
      'login': Login,
      'register': Register,
      'tabbar': Tabbar
    }
  };
</script>

<style>
  @import '../assets/font/iconfont.css';

  .page-wrap {
    padding: 3.5rem 0;
  }

  .mint-header {
    height: 3.5rem;
  }
</style>
