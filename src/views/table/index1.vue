<template>
  <div class="app-container">
    <table-update>
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.data)" type="text" size="small">查看</el-button>
        <el-button type="text" size="small">编辑</el-button>
      </template>
    </table-update>
  </div>
</template>

<script>
  import tableUpdate from '@/components/TableUpdate'

  export default {
    data() {
      return {
        list: null,
        listLoading: true
      };
    },
    components: {
      tableUpdate
    },
    created() {
    },
    methods: {
      handleClick(row) {
        console.log(row)
      }
    }
  };
</script>
