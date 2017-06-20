<template>
    <div class="pictures">
        <mt-cell title="标题" is-link></mt-cell>
        <mt-cell title="已发表" @click=JokeList is-link></mt-cell>
        <mt-cell title="发表" @click=addJoke is-link></mt-cell>
        <mt-cell title="邮件" is-link></mt-cell>
    </div>
</template>

<script>
    import Vue from "vue";
    import {Cell} from 'mint-ui';
    Vue.component(Cell.name, Cell);
    export default {
        data(){
            return {}
        },
        created(){
            this.$parent.$children[0]._data.text = "个人中心";
        },
        methods: {
            addJoke(){
                console.log(1);
                this.$router.push('/addJoke')
            },
            JokeList(){
                this.$router.push('/JokeList')
            }
        }
    }
</script>
<style lang="scss">

</style>
