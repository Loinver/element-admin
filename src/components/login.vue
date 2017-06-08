<template>
    <div>
        <p>hello world!</p>
        <Select v-model="select" class="fly-select" style="width: 200px;">
            <Option v-for="item in cityList" :value="item.value" :key="item">{{ item.label }}</Option>
        </Select>
        <input type="text" class="fly-select" readonly id="select">
        <input type="text" class="fly-select" readonly id="a"/>
        <router-link to="/">跳转首页1</router-link>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui';
    import Select from "../assets/js/selecter.js";
    import AreaSelect from "../assets/js/AreaSelect.js";
    import AreaData from "../assets/js/AreaData.js";
    export default {
        data() {
            return {
                cityList: [
                    {
                        value: 'beijing',
                        label: '北京市'
                    },
                    {
                        value: 'shanghai',
                        label: '上海市'
                    },
                    {
                        value: 'shenzhen',
                        label: '深圳市'
                    },
                    {
                        value: 'hangzhou',
                        label: '杭州市'
                    },
                    {
                        value: 'nanjing',
                        label: '南京市'
                    },
                    {
                        value: 'chongqing',
                        label: '重庆市'
                    }
                ],
                select: ''
            };
        },
        created() {

        },
        mounted(){
            var a = [
                {
                    key: 1,
                    val: "张三"
                }, {
                    key: 2,
                    val: "李四"
                }, {
                    key: 3,
                    val: "王五"
                }
            ];
            let area1 = new Select();
            area1.init({
                'trigger': '#select', //触发选择控件的文本框，同时选择完毕后name属性输出到该位置
                'valueTo': '#select', //选择完毕后id属性输出到该位置
                'keys': {
                    id: 'key',
                    name: 'val'
                }, //绑定数据源相关字段 id对应valueTo的value属性输出 name对应trigger的value属性输出
                'data': a //数据源
            });
            let aa = new AreaSelect();
            aa.init({
                'trigger': '#a', //触发选择控件的文本框，同时选择完毕后name属性输出到该位置
                'valueTo': '#a', //选择完毕后id属性输出到该位置
                'keys': {
                    id: 'id',
                    name: 'name'
                }, //绑定数据源相关字段 id对应valueTo的value属性输出 name对应trigger的value属性输出
                'data': AreaData //数据源
            });
        },
        methods: {}
    };
</script>
<style scoped>
</style>
