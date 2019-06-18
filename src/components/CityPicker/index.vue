<template>
  <div class="city-picker">
    <el-select
      v-for="(items,index) in cityArray"
      v-model="cityArray[index]"
      filterable
      @change="handleChange(index)"
      placeholder="请选择"
      :key="index"
    >
      <template v-if="index===0">
        <el-option v-for="item in cityData" :key="item.code" :label="item.name" :value="item.name"></el-option>
      </template>
      <template v-if="index===1">
        <el-option
          v-for="item in searchArray(cityData,cityArray[0])"
          :key="item.code"
          :label="item.name"
          :value="item.name"
        ></el-option>
      </template>
      <template v-if="index===2">
        <el-option
          v-for="item in searchArray(searchArray(cityData,cityArray[0]),cityArray[1])"
          :key="item.code"
          :label="item.name"
          :value="item.name"
        ></el-option>
      </template>
    </el-select>
  </div>
</template>

<script>
import data from "./city";

export default {
  data() {
    return {
      cityData: data.data
    };
  },
  props: {
    cityArray: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  methods: {
    searchArray(array, key) {
      let arr = [];
      for (let i = 0; i < array.length; i++) {
        if (array[i].name === key) {
          arr = array[i].children;
        }
      }
      return arr;
    },
    handleChange(index) {
      switch (index) {
        case 0:
          this.cityArray[1] = "";
          this.cityArray[2] = "";
          break;
        case 1:
          this.cityArray[2] = "";
          break;
        case 2:
          break;
        default:
      }
      this.$emit("updateData", this.cityArray);
    }
  }
};
</script>
