<template>
  <div id="fly-index">
    <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
      <router-link to="/register">去注册</router-link>
      <router-link to="/login">去登陆</router-link>
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
      <ul v-for="news in newsList" class="news-list">
        <li class="news-title" v-text="news.title">
        </li>
        <li class="news-content" v-text="news.info"></li>
      </ul>
    </mt-loadmore>
  </div>
</template>

<script>
  import Vue from 'vue';
  import {Swipe, SwipeItem, Loadmore, Toast, Indicator} from 'mint-ui';
  import Data from '../model/index_list.vue';
  Vue.component(Loadmore.name, Loadmore);
  Vue.component(Toast.name, Toast);
  Vue.component(Swipe.name, Swipe);
  Vue.component(SwipeItem.name, SwipeItem);
  export default {
    data() {
      return {
        allLoaded: false,
        newsList: null,
        nowPage: 0,
        totalPage: 0
      };
    },
    created() {
      Indicator.open('加载中...');
      let info = Data.data().body;
      this.newsList = info[this.nowPage].pageDetail;
      this.totalPage = info.length;
      //console.log(this.newsList);
      setTimeout(() => {
        Indicator.close();
      }, 1000);
    },
    mounted() {
    },
    methods: {
      handleChange(index){
        console.log(index);
      },
      loadTop() {
        //重新请求数据
        Toast("下拉刷新了");
        setTimeout(() => {
          this.$refs.loadmore.onTopLoaded();
        }, 1000);
      },
      loadBottom() {
        setTimeout(() => {
          let info = Data.data().body;
          this.nowPage += 1;
          if (this.nowPage < this.totalPage) {//判断当前页数是否小于总页数
            let nextPage = info[this.nowPage].pageDetail;
            this.newsList.push.apply(this.newsList, nextPage);
          } else {
            Toast("没有更多数据了！");
            this.allLoaded = true;//根据需要来定义
          }
          this.$refs.loadmore.onBottomLoaded();
        }, 1000);
      }
    }
  };
</script>

<style>
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

  .news-list {
    font-size: 1.4rem;
    padding: 1rem;
  }
</style>
