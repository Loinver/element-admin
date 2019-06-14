<template>
  <div class="app-container">
    <el-table :data="options.tableData" border style="width: 100%">
      <el-table-column
        v-for="(option,index) in options.tableRow"
        :prop="option.key"
        :label="option.value"
        :key="index"
      ></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <slot :data="scope.row"></slot>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="查看" :visible.sync="options.handleType==='查看'" @close="handleClose">
      <el-form :model="options.selectRow">
        <el-form-item
          v-for="(row,index) in options.tableRow"
          :label="row.value"
          label-width="120px"
          :key="index"
        >
          <el-input class="middle" v-model="options.selectRow[row.key]" readonly></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleClose">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="编辑" :visible.sync="options.handleType==='编辑'" @close="handleClose">
      <el-form :model="options.selectRow">
        <!--根据字段名来判断，此处必须保持一致-->
        <el-form-item
          v-for="(row,index) in options.tableRow"
          :label="row.value"
          label-width="120px"
          :key="index"
        >
          <template v-if="row.type==='input'">
            <el-input class="middle" v-model="options.selectRow[row.key]"></el-input>
          </template>
          <template v-if="row.type==='date'">
            <el-date-picker
              class="middle"
              v-model="options.selectRow[row.key]"
              type="date"
              placeholder="选择日期"
            ></el-date-picker>
          </template>
          <template v-if="row.type==='select'">
            <el-select
              v-for="(city,index) in formatCity(options.selectRow[row.key])"
              class="middle"
              v-model="options.selectRow[row.key]"
              filterable
              placeholder="请选择"
              :key="index"
            >
              <template>
                <el-option
                  v-for="item in provinceArray"
                  :key="item.code"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </template>

            </el-select>
          </template>
          <template v-if="row.type==='textarea'">
            <el-input class="middle" type="textarea" v-model="options.selectRow[row.key]"></el-input>
          </template>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleClose">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import city from "@/data/city";

export default {
  name: "tableUpdate",
  props: {
    options: Object
  },
  data() {
    return {
      provinceArray: city.data
    };
  },
  created() {},
  methods: {
    handleClose() {
      this.options.handleType = null;
    },
    formatCity(value) {
      if (value) {
        return value.split("-");
      } else {
        return [];
      }
    },
    searchArray(array, key) {
      let arr = [];
      for (let i = 0; i < array.length; i++) {
        if (array[i].name === key) {
          arr = array[i].children;
        }
      }
      return arr;
    }
  }
};
</script>

<style scoped>
.middle {
  width: 80%;
}
</style>
