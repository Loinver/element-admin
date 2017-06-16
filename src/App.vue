<template>
    <div id="app">
        <transition :name="transitionName">
            <router-view class="tweening"></router-view>
        </transition>
    </div>
</template>

<script>
    import "./assets/js/autoSize(20).js";
    export default {
        name: 'app',
        data () {
            return {
                transitionName: 'slide-left'
            }
        },
        mounted () {
        },
        watch: {//监听路由的路径，可以通过不同的路径去选择不同的切换效果
            '$route' (to, from) {
                if (to.path == '/') {
                    console.log(to)
                    this.transitionName = 'slide-right';
                } else {
                    console.log(to)
                    this.transitionName = 'slide-left';
                }
            }
        }
    }
</script>
<style lang="scss">
    /**引入css内的图片必须绝对路径**/
    @import "./assets/css/base.scss";
    @import "./assets/css/common.scss";
    .tweening {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        transition: all .5s cubic-bezier(.55, 0, .1, 1);
    }

    .slide-left-enter, .slide-right-leave-active {
        opacity: 0;
        -webkit-transform: translate(30px, 0);
        transform: translate(30px, 0);
    }

    .slide-left-leave-active, .slide-right-enter {
        opacity: 0;
        -webkit-transform: translate(-30px, 0);
        transform: translate(-30px, 0);
    }
</style>
