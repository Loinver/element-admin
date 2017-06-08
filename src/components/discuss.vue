<template>
    <div id="fly-index">
        <div class="fly-body">
            <div class="issue-box">
                <div class="issue-title">
                    <img class="issue-userphoto" :src=userInfo.discuss_head alt="用户头像">
                    <div class="issue-info">
                        <ul>
                            <li><span class="user-name" v-text="userInfo.discuss_name"></span>
                                <span v-if="userInfo.userInfo_tips==1" class="user-tips tips-1" v-text="userTips[0].name"></span>
                                <span v-if="userInfo.userInfo_tips==2" class="user-tips tips-2" v-text="userTips[1].name"></span>
                                <span v-if="userInfo.userInfo_tips==3" class="user-tips tips-3" v-text="userTips[2].name"></span></li>
                            <li class="issue-time" v-text="userInfo.discuss_time"></li>
                        </ul>
                    </div>
                </div>
                <p class="issue-cont" v-text="userInfo.issue_cont"></p>
                <!--<p class="issue-cont-img"><img layer-src="../images/comment.png" src="../images/comment.png" class="cont-img" alt="内容图片"><img layer-src="../images/menubg-1.png" src="../images/menubg-1.png" class="cont-img" alt="内容图片"></p>-->
                <p class="tr mgt-30">
                    <span v-if="!userInfo.isStar" class="handle-icon icon-star" v-text="userInfo.issue_star"></span>
                    <span v-if="userInfo.isStar" class="handle-icon icon-star fly-active" v-text="userInfo.issue_star"></span>
                    <span v-if="!userInfo.isStar" class="handle-icon icon-comment" v-text="userInfo.issue_comment"></span>
                    <span v-if="userInfo.isStar" class="handle-icon icon-comment fly-active" v-text="userInfo.issue_comment"></span>
                </p>
            </div>
            <div class="issue-comment">
                <h1 class="title">评论</h1>
                <div class="comment-list" v-for="comment,comment_index in comments">
                    <img class="comment-user-photo" :src=comment.user_head alt="评论用户头像">
                    <ul class="comment-detail">
                        <li class="cl"><span class="user-name" v-text="comment.user_name"></span>
                            <span v-if="comment.user_tips==1" class="user-tips tips-1" v-text="userTips[0].name"></span>
                            <span v-if="comment.user_tips==2" class="user-tips tips-2" v-text="userTips[1].name"></span>
                            <span v-if="comment.user_tips==3" class="user-tips tips-3" v-text="userTips[2].name"></span>
                            <span v-if="comment.isStar" class="fr mgt-5 handle-icon icon-star fly-active" v-text="comment.issue_star" @click="click_star(comment_index)"></span>
                            <span v-if="!comment.isStar" class="fr mgt-5 handle-icon icon-star" v-text="comment.issue_star" @click="click_star(comment_index)"></span>
                        </li>
                        <li class="issue-time" v-text="comment.discuss_time"></li>
                        <li class="comment" v-text="comment.issue_title"></li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="comment-edit">
            <input type="text" class="edit-cont" v-model="comment_val" placeholder="请在此输入您的评论">
            <span class="icon-emoji"></span>
            <span @click="commentHandle" class="edit-submit"></span>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import {Toast} from 'mint-ui';
    Vue.component(Toast.name, Toast);
    import fly from '../assets/js/common';
    export default {
        data() {
            return {
                comment_val: null,
                comments: [{
                    'user_name': '胡晓1',
                    'user_head': 'http://q.qlogo.cn/qqapp/101235792/E1BCE1CF05C9DE3706229FFD7E38A580/100',
                    'user_tips': '1',
                    'discuss_time': '1491464500',
                    'issue_title': '一环路怎么每天辣么堵，无语',
                    'isStar': false,
                    'issue_star': 222,
                    'issue_comment': 999
                }, {
                    'user_name': '胡晓2',
                    'user_head': 'http://q.qlogo.cn/qqapp/101235792/E1BCE1CF05C9DE3706229FFD7E38A580/100',
                    'user_tips': '2',
                    'isStar': true,
                    'discuss_time': '1491464128',
                    'issue_title': '一环路怎么每天辣么堵，无语',
                    'issue_star': 22,
                    'issue_comment': 999
                }, {
                    'user_name': '胡晓3',
                    'user_head': 'http://q.qlogo.cn/qqapp/101235792/E1BCE1CF05C9DE3706229FFD7E38A580/100',
                    'user_tips': '3',
                    'isStar': true,
                    'discuss_time': '1491463928',
                    'issue_title': '一环路怎么每天辣么堵，无语',
                    'issue_star': 222,
                    'issue_comment': 99
                }, {
                    'user_name': '胡晓4',
                    'user_head': 'http://q.qlogo.cn/qqapp/101235792/E1BCE1CF05C9DE3706229FFD7E38A580/100',
                    'user_tips': '2',
                    'discuss_time': '1491454528',
                    'issue_title': '一环路怎么每天辣么堵，无语',
                    'issue_star': 222,
                    'issue_comment': 991
                }, {
                    'user_name': '胡晓5',
                    'user_head': 'http://q.qlogo.cn/qqapp/101235792/E1BCE1CF05C9DE3706229FFD7E38A580/100',
                    'user_tips': '2',
                    'discuss_time': '1491444528',
                    'issue_title': '一环路怎么每天辣么堵，无语',
                    'issue_star': 222,
                    'issue_comment': 99
                }],
                userInfo: {
                    'discuss_name': '胡晓',
                    'discuss_head': 'http://q.qlogo.cn/qqapp/101235792/E1BCE1CF05C9DE3706229FFD7E38A580/100',
                    'userInfo_tips': 1,
                    'isStar':true,
                    'discuss_time': '1491464428',
                    'issue_cont': '一环路怎么每天辣么堵一环路怎么每天辣么堵一环路怎么每天辣么堵一环路怎么每天辣么堵一环路怎么每天辣么堵',
                    'issue_star': 2212,
                    'issue_comment': 999
                },
                userTips: [{
                    "tips": "1",
                    "name": "环保局局长"
                }, {
                    "tips": "2",
                    "name": "杰出市民"
                }, {
                    "tips": "3",
                    "name": "普通群众"
                }]
            };
        },
        created() {
            this.userInfo.discuss_time = fly.formatTime(this.userInfo.discuss_time);
            for (let i = 0; i < this.comments.length; i++) {
                this.comments[i].discuss_time = fly.formatTime(this.comments[i].discuss_time);
            }
        },
        mounted() {
        },
        methods: {
            commentHandle() {
                let _self = this;
                if (_self.comment_val == null || _self.comment_val == "") {
                    Toast("请输入评论内容!");
                } else {
                    let nowDate = fly.getTimer();
                    let userName = '张三';
                    let userHead = 'http://q.qlogo.cn/qqapp/101235792/E1BCE1CF05C9DE3706229FFD7E38A580/100';
                    let commentList = {
                        'user_name': userName,
                        'user_head': userHead,
                        'user_tips': '3',
                        'discuss_time': fly.formatTime(nowDate),
                        'issue_title': _self.comment_val,
                        'issue_star': 0,
                        'issue_comment': 0
                    };
                    this.comments.push(commentList);
                    this.comment_val = "";
                }
            },
            click_star(index) {
                if (this.comments[index].isStar) {
                    this.comments[index].issue_star = this.comments[index].issue_star - 1;
                    this.comments[index].isStar = false;
                }else{
                    this.comments[index].isStar = true;
                    this.comments[index].issue_star = this.comments[index].issue_star + 1;
                }
            }
        }
    };
</script>

<style lang="scss">
    .fly-body {
        /*position: absolute;*/
        /*top: 0;*/
        /*left: 0;*/
        /*right: 0;*/
        padding-bottom: 4.4rem;
        /*overflow-y: scroll;*/
        /*-webkit-overflow-scrolling: touch;*/
    }

    .issue-box {
        padding: 1.5rem 1.5rem 0.75rem;
        background-color: #FFFFFF;
        .issue-title {
            display: flex;
            width: 100%;
            .issue-userphoto {
                width: 3.2rem;
                height: 3.2rem;
                border-radius: 50%;
            }
            .issue-info {
                margin-left: 0.5rem;
            }
        }
        .issue-cont {
            color: #555555;
            font-size: 1.2rem;
            line-height: 1.8rem;
            margin-top: 0.5rem;
            .cont-img {
                width: 9rem;
                height: 9rem;
                vertical-align: top;
            }
            .cont-img + .cont-img {
                margin-left: 1rem;
            }
        }
    }

    .issue-box,
    .issue-comment {
        .user-name {
            font-size: 1.4rem;
            margin-right: 2rem;
            line-height: 1.9rem;
        }
        .user-tips {
            font-size: 1.2rem;
            &.tips-1 {
                color: #fb7000;
            }
            &.tips-2 {
                color: #d54343;
            }
            &.tips-3 {
                color: #999999;
            }
        }
        .issue-time {
            color: #999999;
            font-size: 1rem;
            line-height: 1.7rem;
        }
    }

    .issue-comment {
        margin-top: 1.5rem;
        background-color: #FFFFFF;
        .title {
            line-height: 3rem;
            font-size: 1.2rem;
            color: #999999;
            padding: 0 1.5rem;
            border-bottom: 1px solid #D2D2D2;
            margin-bottom: 0.5rem;
        }
        .comment-list {
            display: flex;
            padding: 1rem 0 0 1.5rem;
            .comment-user-photo {
                width: 3.2rem;
                height: 3.2rem;
                border-radius: 50%;
                display: inline-block;
            }
            .comment-detail {
                padding: 0 1.5rem 1rem 0.5rem;
                border-bottom: 1px solid #D2D2D2;
                flex-grow: 1;
                .comment {
                    padding: 0.25rem 0;
                    line-height: 1.6rem;
                    font-size: 1.2rem;
                }
            }
        }
        .comment-list:last-child .comment-detail {
            border-bottom: none;
        }
    }

    .comment-edit {
        height: 4.4rem;
        width: 100%;
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: #F3F1F1;
        padding: 0 1rem;
        .edit-cont {
            width: 60%;
            height: 2.9rem;
            border: #bbbbbb;
            border-radius: 1.45rem;
            padding: 0 1.6rem;
            font-size: 1.2rem;
        }
        .icon-emoji {
            width: 2.3rem;
            height: 2.3rem;
            display: inline-block;
            background-image: url("../assets/img/emoji.png");
            background-size: cover;
            margin-right: 1rem;
        }
        .edit-submit {
            width: 6.5rem;
            height: 3rem;
            display: inline-block;
            background-image: url("../assets/img/comment.png");
            background-size: cover;
        }
    }
</style>
