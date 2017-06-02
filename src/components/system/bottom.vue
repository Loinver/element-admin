<template>
  <div class="tab-bar">
    <router-link tag="ul" to="/index">
      <li><span class="iconfont icon-home"></span></li>
      <li>首页</li>
    </router-link>
    <router-link tag="ul" to="/index">
      <li><span class="iconfont icon-chat2"></span></li>
      <li>更多</li>
    </router-link>
    <router-link tag="ul" to="/index">
      <li><span class="iconfont icon-search"></span></li>
      <li>发现</li>
    </router-link>
    <router-link tag="ul" to="/index">
      <li><span class="iconfont icon-more"></span></li>
      <li>设置</li>
    </router-link>
  </div>
</template>

<script>
  import Vue from 'vue';
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
  .iconfont {
    font-size: 1.6rem;
    color: #726868;
  }

  .tab-bar {
    width: 100%;
    height: 4rem;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    text-align: center;
    border-top: 1px solid #dcdcdc;
  }

  .tab-bar > ul {
    flex-grow: 4;
    font-size: 1.2rem;
  }
</style>
