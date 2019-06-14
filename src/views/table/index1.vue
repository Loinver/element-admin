<template>
  <div class="app-container">
    <table-update :options="tableOptions">
      <template slot-scope="scope">
        <el-button @click="handleShow(scope.data)" type="text" size="small">查看</el-button>
        <el-button @click="handleEdit(scope.data)" type="text" size="small">编辑</el-button>
      </template>
    </table-update>
  </div>
</template>

<script>
import tableUpdate from "@/components/TableUpdate";

export default {
  data() {
    return {
      tableOptions: {
        // 表格字段
        tableRow: [
          {
            key: "date",
            value: "日期",
            type: "date"
          },
          {
            key: "name",
            value: "姓名",
            type: "input"
          },
          {
            key: "provinces",
            value: "省市",
            type: "select"
          },
          {
            key: "address",
            value: "地址",
            type: "textarea"
          }
        ],
        // 表格数据
        tableData: [
          {
            date: "2016-05-02",
            name: "王小虎",
            provinces: "四川省-成都市-武侯区",
            city: "四川省成都市武侯区",
            address: "上海市普陀区金沙江路 1518 弄",
          },
          {
            date: "2016-05-04",
            name: "王小虎",
            provinces: "上海市-普陀区",
            city: "上海市普陀区",
            address: "上海市普陀区金沙江路 1517 弄",
          },
          {
            date: "2016-05-01",
            name: "王小虎",
            provinces: "上海",
            city: "上海市普陀区",
            address: "上海市普陀区金沙江路 1519 弄",
          },
          {
            date: "2016-05-03",
            name: "王小虎",
            provinces: "上海",
            city: "上海市普陀区",
            address: "上海市普陀区金沙江路 1516 弄",
          }
        ],
        // 当前所选择的操作类型
        handleType: null,
        // 当前所选择的操作列数据
        selectRow: {}
      }
    };
  },
  components: {
    tableUpdate
  },
  created() {},
  methods: {
    handleShow(row) {
      this.tableOptions.handleType = "查看";
      this.tableOptions.selectRow = row;
      console.log(row);
    },
    handleEdit(row) {
      this.tableOptions.handleType = "编辑";
      this.tableOptions.selectRow = row;
      console.log(row);
    }
  }
};
</script>
