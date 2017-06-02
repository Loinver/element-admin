<template>
  <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
    <ul v-for="news in newsList" class="news-list">
      <li class="news-title" v-text="news.title">
      </li>
      <li class="news-content" v-text="news.info"></li>
    </ul>
  </mt-loadmore>
</template>

<script>
  import Vue from 'vue';
  import {Loadmore, Toast, Indicator} from 'mint-ui';
  import Data from '../model/index_list.vue';
  Vue.component(Loadmore.name, Loadmore);
  Vue.component(Toast.name, Toast);
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
      console.log(this.newsList);
      setTimeout(()=>{
        Indicator.close();
      },1000);
    },
    methods: {
      loadTop() {
        //重新请求数据
        Toast("下拉刷新了");
        this.$refs.loadmore.onTopLoaded();
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
  .news-list {
    font-size: 1.2rem;
    padding: 1rem;
  }
</style>
