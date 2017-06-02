<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import "./assets/js/autoSize(20).js";
  export default {
    name: 'app'
  }
</script>
<style lang="scss">
  /**引入css内的图片必须绝对路径**/
  @import "./assets/css/base.scss";
  @import "./assets/css/common.scss";
</style>
