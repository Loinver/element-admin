/**
* Created by Linyer on 2017/6/21.
*/
<template>
    <div class="login">
        <mt-field label="用户名：" placeholder="请输入用户名" v-model="newuser.username"></mt-field>
        <mt-field label="密码：" placeholder="请输入密码" type="password" v-model="newuser.password"></mt-field>
        <mt-button type="primary" class="col-1 fs-25" @click="userRegister">注册</mt-button>
    </div>
</template>

<script>
    import Vue from 'vue';
    import {Toast, Field} from 'mint-ui';
    import fly from "../assets/js/common";
    import axios from 'axios';
    Vue.component(Field.name, Field);
    export default {
        data(){
            return {
                newuser: {
                    username: '',
                    password: ''
                }
            }
        },
        created(){
            this.newuser.username = fly.localStore("userName");
            this.newuser.password = fly.localStore("passWord");
        },
        methods: {
            userRegister(){
//                const urls = "http://www.zaichengdu.com/cd_portal/service/CW77001";
//                const params = {city_name: encodeURI("成都市")};
//                fly.Axios({
//                    url: urls,
//                    data: params,
//                    success: function (res) {
//                        console.log(res.data.body);
//
//                    }, error: function (err) {
//                        console.log(err)
//                    }
//                })
            }
        }
    }
</script>
<style lang="scss">
</style>