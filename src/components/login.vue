/**
* Created by Linyer on 2017/6/12.
*/
<template>
    <div class="login">
        <mt-field label="用户名：" placeholder="请输入用户名" v-model="newuser.username"></mt-field>
        <mt-field label="密码：" placeholder="请输入密码" type="password" v-model="newuser.password"></mt-field>
        <mt-button type="primary" class="col-1 mg-25 fs-25" @click="userlogin">登陆</mt-button>
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
            this.newuser.username = localStore("userName");
            this.newuser.password = localStore("passWord");
        },
        methods: {
            userlogin(){
                const _self = this;
                this.$store.dispatch('login', this.newuser).then(function () {
                    if (_self.$store.state.user.seccLogin) {
                        //Toast('登录成功！');
                        localStore("userName",_self.newuser.username);
                        localStore("passWord",_self.newuser.password);
                        _self.$router.push('/today');
                        localStorage.setItem("current_tab_nav","today");
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