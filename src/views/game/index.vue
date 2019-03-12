<template>
  <div class="game-container">
    <!-- <audio id="bgMusic" preload="auto" autoplay loop>
      <source :src="gameStatus.bgMusic"/>
    </audio>
    <audio preload="auto" id="firingMusic">
      <source :src="gameStatus.firingMusic"/>
    </audio>
    <audio preload="auto" id="winnerMusic">
      <source :src="gameStatus.winnerMusic"/>
    </audio>
    <div class="prize-container">
      <div class="prize-list top">
        <div v-for="(prize,index) in prizeList" v-if="index<21" :id="'prize-item_'+index"
             :class="[index%2===0?'item-odd':'item-even','prize-item']" :key="index">
          <img :src="prize.image" class="prize-img" alt="奖品图片">
          <span class="prize-name">{{prize.titleName}}</span>
          <div v-if="index%2===1" class="icon-arrow arrow-right"></div>
        </div>
      </div>
      <div class="prize-list center prize-mgt">
        <div class="left">
          <div class="left-top">
            <div v-for="(prize,index) in prizeList" v-if="index>=66&&index<74" :id="'prize-item_'+index"
                 :class="[index%2===0?'item-odd':'item-even','prize-item']" :key="index">
              <img :src="prize.image" class="prize-img" alt="奖品图片">
              <span class="prize-name">{{prize.titleName}}</span>
              <div v-if="index%2===1" class="icon-arrow arrow-left"></div>
            </div>
          </div>
          <div class="left-bottom prize-mgt">
            <div v-for="(prize,index) in prizeList" v-if="index>=58&&index<66" :id="'prize-item_'+index"
                 :class="[index%2===0?'item-odd':'item-even','prize-item']" :key="index">
              <img :src="prize.image" class="prize-img" alt="奖品图片">
              <span class="prize-name">{{prize.titleName}}</span>
              <div v-if="index%2===0" class="icon-arrow arrow-right"></div>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="right-top">
            <div v-for="(prize,index) in prizeList" v-if="index>=21&&index<29" :id="'prize-item_'+index"
                 :class="[index%2===0?'item-odd':'item-even','prize-item']" :key="index">
              <img :src="prize.image" class="prize-img" alt="奖品图片">
              <span class="prize-name">{{prize.titleName}}</span>
              <div v-if="index%2===0" class="icon-arrow arrow-left"></div>
            </div>
          </div>
          <div class="right-bottom prize-mgt">
            <div v-for="(prize,index) in prizeList" v-if="index>=29&&index<37" :id="'prize-item_'+index"
                 :class="[index%2===0?'item-odd':'item-even','prize-item']" :key="index">
              <img :src="prize.image" class="prize-img" alt="奖品图片">
              <span class="prize-name">{{prize.titleName}}</span>
              <div v-if="index%2===1" class="icon-arrow arrow-right"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="prize-list bottom prize-mgt">
        <div v-for="(prize,index) in prizeList" v-if="index>=37&&index<58" :id="'prize-item_'+index"
             :class="[index%2===0?'item-odd':'item-even','prize-item']" :key="index">
          <img :src="prize.image" class="prize-img" alt="奖品图片">
          <span class="prize-name">{{prize.titleName}}</span>
          <div v-if="index%2===0" class="icon-arrow arrow-left"></div>
        </div>
      </div>
    </div>
    <div class="game-box">
      <qrcode class="qr-code" :value="qrCode"
              :options="{width:240}"></qrcode>
      <div class="user-box">
      </div>
    </div>
    <div class="game-box-front">
      <div class="winner-box">
        <div class="winner-wrap">
          <ul>
            <li class="winner-list" v-for="(user,index) in winnerList" :key="index"
                v-text="user.memberName+' 获得 '+user.prizeName.substring(0, 3)"></li>
          </ul>
        </div>
      </div>
      <div class="game-ing">
        <div :class="[isLottery?'tips-go':'tips-ready','tips']"></div>
        <div class="arrow"></div>
        <div class="ball-table"></div>
        <div class="ball-pillar"></div>
      </div>
    </div>
    <div class="animation-box">
      <div class="animation left"></div>
      <div class="animation middle"></div>
      <div class="animation right"></div>
    </div>
    <div class="lottery-result" v-show="showLotteryResult">
      <div class="winner-user">
        <div class="title"></div>
        <ul class="user-info">
          <li class="user"><img :src="winnerInfo.memberHead" alt="用户头像"></li>
          <li class="prize">
            <img :src="winnerInfo.prizeImg" alt="奖品图片">
            <span class="prize-name">{{winnerInfo.prizeName}}</span>
          </li>
          <li class="winner-txt">{{winnerInfo.memberName}}获得了{{winnerInfo.prizeName}}</li>
        </ul>
      </div>
    </div> -->
  </div>
</template>

<script>
  import Vue from 'vue';
  import VueQRCode from '@chenfengyuan/vue-qrcode';
  import fly from 'assets/js/fly'
  import TWEEN from '@tweenjs/tween.js'
  import './js/RequestAnimationFrame';
  import Point from './js/Point'
  import Lottery from './js/Lottery'
  import QueueAni from './js/QueueAni';
  import defaultHead from './images/default-head.jpg';

  import bgm from './media/bgm.mp3';
  import firing from './media/firing.mp3';
  import prize from './media/prize.mp3';

  Vue.component(VueQRCode.name, VueQRCode);
  export default {
    name: 'index',
    data() {
      return {
        gameStatus: {
          prizeList: [],
          prizePoints: [],
          start: 12,
          end: 0,
          loop: 0,
          bgMusic: bgm,
          firingMusic: firing,
          winnerMusic: prize
        },
        qrCode: decodeURIComponent(fly.getQueryString('qrcode')),
        isLottery: false,
        listTime: 500,
        prizeList: [],
        winnerList: [],
        status: {
          mallId: fly.getQueryString('marketno'),
          gameType: '',
          gameId: '',
          defaultHead: defaultHead,
          winnerRecordCode: ''
        },
        queueAni: new QueueAni(),
        lottery: null,
        lotteryUserList: [], // 当前正在排队的所有抽奖用户
        lotteryUserCurr: {}, // 当前正在抽奖的用户
        showLotteryResult: false,
        winnerInfo: {},
        bgMusic: null,
        winnerMusic: null,
        firingMusic: null,
        lotteryStartTimer: null
      }
    },
    mounted() {
      const _self = this;
      // _self.getPrizeList(); // 获取游戏奖品
      _self.adaptiveZoom(); // 自动缩放
      window.addEventListener("resize", function () {
        _self.adaptiveZoom();
      });
      _self.$nextTick(() => {
        _self.animate();
        // 由于谷歌浏览器偶尔自动播放背景音乐失败，所以手动手动播放背景音乐
        _self.bgMusic = document.querySelector('#bgMusic');
        _self.bgMusicTimer = setInterval(() => {
          let playPromise = _self.bgMusic.play();
          if (playPromise !== undefined) {
            playPromise.then(_ => {
              clearInterval(_self.bgMusicTimer)
            }).catch(error => {
              playPromise = _self.bgMusic.pause();
            });
          }
        }, 100);
        // $('body').keydown(function (event) {
        //   if (event.keyCode === 32) {
        //     _self.bgMusic.play();
        //   }
        // });
      })
    },
    methods: {
      /**
       * 自适应宽高
       */
      adaptiveZoom() {
        // 正常是以浏览器宽高作为标准
        // const gameWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        // const gameHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        const gameWidth = document.querySelector('#app .main-container').clientWidth;
        const gameHeight = document.querySelector('#app .main-container').clientHeight;
        let zoom = 1;
        let scale = gameWidth / gameHeight;
        // zoom = scale > 0.4 && scale <= 1 ? scale > 9 / 16 ? gameHeight / 1920 : gameWidth / 1080 : scale > 1 && scale < 3 ? scale > 16 / 9 ? gameHeight / 1080 : gameWidth / 1920 : scale >= 3 && scale < 4 ? scale > 32 / 9 ? gameHeight / 1080 : gameWidth / 3840 : scale > 48 / 9 ? gameHeight / 1080 : gameWidth / 5760;
        zoom = scale > 0.4 && scale <= 1 ? scale > 9 / 16 ? gameHeight / 1920 : gameWidth / 1080 : scale > 1 && scale < 3 ? scale > 16 / 9 ? gameHeight / 1080 : gameWidth / 1920 : scale >= 3 && scale < 4 ? scale > 32 / 9 ? gameHeight / 1080 : gameWidth / 3840 : scale > 48 / 9 ? gameHeight / 1080 : gameWidth / 5760;
        document.querySelectorAll('.game-container')[0].style.zoom = zoom;
      },
      /**
       * 初始化socket
       */
      handleSocketInit() {
        const _self = this;
        _self.hubConnection = $.hubConnection(fly.baseUrl);
        _self.chatHubProxy = _self.hubConnection.createHubProxy('richManHub');
        // 注册接收手机端游戏开始消息
        _self.chatHubProxy.on('GameStarted', function (lotteryUser) {
          console.log(lotteryUser)
          if (!lotteryUser.memberHead) {
            lotteryUser.memberHead = _self.status.defaultHead;
          }
          _self.status.winnerRecordCode = lotteryUser.winnerRecordCode;
          _self.lotteryReady(lotteryUser);
        });
        // 连接成功，调用后端方法
        _self.hubConnection.start().done(() => {
          // 获取模块信息
          _self.chatHubProxy.invoke('gameHostConnect', _self.status.mallId).done((msg) => {
            console.info(msg)
          });

          // 自动监测是否有小球添加到了抽奖动画队列
          _self.lotteryStartTimer = setInterval(() => {
            _self.lotteryStart();
          }, 500);
        }).fail((error) => {
          console.log('连接失败' + error);
        });

        // socket自动重连
        _self.hubConnection.reconnected(function (res) {
          console.info("socket重连了");
          _self.hubConnection.start().done(() => {
            _self.chatHubProxy.invoke('gameHostConnect', _self.status.mallId).done((msg) => {
              console.info(msg);
            });
          }).fail((error) => {
            console.log('连接失败' + error);
          });
        });
      },
      /**
       * 创建游戏区域
       */
      createGameArea() {
        const _self = this;
        for (let i = 0; i < 74; i++) {
          let obj = $(`#prize-item_${i}`);
          _self.gameStatus.prizeList.push(obj[0]);
          let point = {
            x: obj.offset().left,
            y: obj.offset().top
          };
          _self.gameStatus.prizePoints.push(point);
        }
      },
      /**
       * 绑定动画函数
       */
      animate(time) {
        requestAnimationFrame(this.animate);
        TWEEN.update(time);
        this.queueAni.update(time);
      },
      /**
       * 生成抽奖位置
       */
      lotteryReady(lotteryUser) {
        const _self = this;
        _self.lotteryUserList.push(lotteryUser);
        _self.lotteryUserCurr = lotteryUser;
        // 根据返回的用户抽奖结果设置抽奖动画结束位置
        for (let i in _self.prizeList) {
          if (Object.prototype.hasOwnProperty.call(_self.prizeList, i)) { // 过滤
            if (_self.lotteryUserCurr.ticketId === _self.prizeList[i].giftCode) {
              Vue.set(_self.lotteryUserCurr, 'end', Number(i));
              Vue.set(_self.lotteryUserCurr, 'prizeName', _self.prizeList[i].titleName);
              Vue.set(_self.lotteryUserCurr, 'prizeImg', _self.prizeList[i].image);
            }
          }
        }
        if (!_self.queueAni.isFull()) {
          let ball = _self.createBall(_self.lotteryUserCurr);
          ball.div.classList.add('user-small');
          _self.queueAni.push(ball);
        }
      },
      /**
       * 生成抽奖用户头像
       */
      createBall(user) {
        const gameArea = document.getElementsByClassName('fly-body')[0];
        let div = document.createElement('div');
        gameArea.appendChild(div);

        div.className = 'lottery-user';
        div.innerHTML = '<img src="' + user.memberHead + '" alt="用户头像">';

        let ball = {};
        ball.user = user;
        ball.pos = new Point();
        ball.div = div;
        return ball;
      },
      /**
       * 抽奖动画前置
       */
      lotteryStart() {
        const _self = this;
        let ball = _self.queueAni.pop();
        if (ball) {
          ball.div.classList.remove('user-small');
          const lottery = new Lottery(ball);
          _self.lotteryAction(lottery);
        }
      },
      /**
       * 执行抽奖动画
       */
      lotteryAction(lottery) {
        // 小球前置动画位置
        const _self = this;
        _self.isLottery = true;
        // _self.showLotteryResult = false; // 每次将要开始执行抽奖过程的时候就将中奖结果隐藏
        let times = [150, 200];
        let points = [];
        points.push(new Point(3000, 500));
        points.push(new Point(3225, 500));
        points.push(new Point(3225, 120));
        lottery.setStartPoints(points);
        lottery.setStartTimes(times);

        lottery.setLotteryPoints(_self.gameStatus.prizePoints);
        lottery.setLotteryData(_self.gameStatus.start, lottery.getUser().end, _self.gameStatus.loop);
        // lottery.setLotteryData(_self.gameStatus.start, 15, _self.gameStatus.loop);
        // 抽奖动画开始播放 同时播放抽奖音效
        document.querySelector('#firingMusic').play();
        lottery.onLotteryPoint(function (i) {
          $(_self.gameStatus.prizeList[i]).addClass('active');
          let _i = i - 1;
          _i = _i < 0 ? _self.gameStatus.prizeList.length - 1 : _i;
          $(_self.gameStatus.prizeList[_i]).removeClass('active');
        });

        lottery.start();
        lottery.onLotteryEnd((ball) => {
          _self.isLottery = false;
          // 发送中奖信息给手机端
          _self.chatHubProxy.invoke('prizeGot', ball.user.memberCode, ball.user.prizeName, ball.user.prizeImg, _self.status.winnerRecordCode).done((msg) => {
            console.log("" + msg);
          });
          // 根据返回的是否显示中奖结果来控制显示中奖结果
          if (ball.user.showDraw) {
            _self.winnerInfo = ball.user; // 显示中奖结果
            // 播放获奖奖音效
            _self.winnerMusic = document.querySelector('#winnerMusic');
            _self.winnerMusic.currentTime = 0;
            _self.winnerMusic.play();
            _self.showLotteryResult = true;
            setTimeout(() => {
              _self.showLotteryResult = false;
              _self.winnerMusic.pause();
            }, 3000)
          }
          _self.winnerList.push(ball.user); // 将最新中奖用户添加到数组尾部
          _self.lotteryUserList.splice(0, 1); // 抽奖用户列表移除第一个用户
          setTimeout(() => {
            ball.div.remove(); // 抽奖结束后移除dom
            $(_self.gameStatus.prizeList[ball.user.end]).removeClass('active');
          }, 3000);
        });
      },
      /**
       * 获取奖品列表
       */
      getPrizeList() {
        const _self = this;
        fly.$axios.post('api/Game/Prizes', {
          mallid: _self.status.mallId,
          game_type: _self.status.gameType
        }).then(function (res) {
          switch (res.ResultType) {
            case 1:
              _self.prizeList = res.AppendData.Ticket;
              _self.status.gameId = res.AppendData.EB_ID;
              _self.$nextTick(() => {
                _self.createGameArea(); // 设置游戏区域
                _self.handleSocketInit(); // 初始化socket
              });
              break;
            default:
          }
        }).catch((err) => {
          setTimeout(() => {
            _self.getPrizeList();
          }, 1000);
          console.log(err)
        })
      },
    },
    watch: {
      winnerList() {
        let winnerLength = $('.winner-list').length;
        if (winnerLength >= 10) {
          $('.winner-box ul').animate({
            marginTop: -36 * (winnerLength - 9) + 'px'
          }, 500)
        }
      }
    },
    beforeDestroy() {
      clearInterval(this.lotteryStartTimer);
    }
  };
</script>

<style lang="scss" scoped>
  @import "index";
</style>
