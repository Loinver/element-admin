/**
* Created by Linyer on 2017/6/12.
*/
<template>
    <div class="login">
        <mt-field label="用户名：" placeholder="请输入用户名" v-model="newuser.username"></mt-field>
        <mt-field label="密码：" placeholder="请输入密码" type="password" v-model="newuser.password"></mt-field>
        <mt-button type="primary" class="col-1 fs-25" @click="userlogin">登陆1111111</mt-button>
        <img src="../assets/img/1.jpg"/>
    </div>
</template>

<script>
    import Vue from 'vue';
    import {Toast,Field} from 'mint-ui';
    import fly from "../assets/js/common";
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
            userlogin(){
                const _self = this;
                this.$store.dispatch('login', this.newuser).then(function () {
                    if (_self.$store.state.user.seccLogin) {
                        //Toast('登录成功！');
                        fly.localStore("userName",_self.newuser.username);
                        fly.localStore("passWord",_self.newuser.password);
                        _self.$router.push('/today');
                        fly.localStore("current_tab_nav",fly.encode("today"));
                        _self.$store.state.user.seccLogin = 0;
                    } else {
                        Toast('登录失败！');
                    }
                })
            }
        }
    }
</script>
<style lang="scss">
</style>