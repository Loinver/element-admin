<template>
    <div class="pictures">
            <mt-cell title="个人中心">
                <mt-button slot="left" value="perm_identity"></mt-button>
            </mt-cell>
            <mt-cell title="已发表" @click="JokeList">
                <mt-button slot="left" value="grade"></mt-button>
            </mt-cell>
            <mt-cell title="发表" @click="addJoke">
                <mt-button slot="left" value="send"></mt-button>
            </mt-cell>
            <mt-cell title="邮件">
                <mt-button slot="left" value="drafts"></mt-button>
            </mt-cell>

    </div>
</template>

<script>
    import Vue from "vue";
    import { Cell,Button } from 'mint-ui';
    Vue.component(Cell.name, Cell);
    export default {
        created(){
            this.$parent.$children[0]._data.text = "个人中心";
        },
        methods: {
            addJoke(){
                this.$router.push('/addJoke')
            },
            JokeList(){
                this.$router.push('/JokeList')
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

</style>
