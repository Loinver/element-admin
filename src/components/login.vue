<template>
  <div>
    <p>hello world!</p>
    <router-link to="/">跳转首页</router-link>
  </div>
</template>

<script>
  import { Toast } from 'mint-ui';
  export default {
    data() {
      return {};
    },
    created() {
        Toast("弹出层");
    },
    methods: {}
  };
</script>
<style scoped>
</style>
