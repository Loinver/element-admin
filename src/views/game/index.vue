<template>
  <div class="fly-body game-body" id="turnLotteryOne">
    <audio id="bgMusic" preload="auto" autoplay loop>
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
        <div v-for="(prize,index) in prizeList" v-if="index<7" :id="'prize-item_'+index"
             :class="[index%2===0?'item-odd':'item-even','prize-item']" :key="index">
          <img :src="prize.image" class="prize-img" alt="奖品图片">
          <!--<span class="prize-name">{{prize.titleName}}</span>-->
          <div v-if="index%2===1" class="icon-arrow arrow-right"></div>
        </div>
      </div>
      <div class="prize-list center prize-mgt">
        <div class="left">
          <div class="left-top">
            <div v-for="(prize,index) in prizeList" v-if="index>=17&&index<18" :id="'prize-item_'+index"
                 :class="[index%2===0?'item-odd':'item-even','prize-item']" :key="index">
              <img :src="prize.image" class="prize-img" alt="奖品图片">
              <!--<span class="prize-name">{{prize.titleName}}</span>-->
              <div v-if="index%2===1" class="icon-arrow arrow-top"></div>
            </div>
          </div>
          <div class="left-bottom prize-mgt">
            <div v-for="(prize,index) in prizeList" v-if="index>=16&&index<17" :id="'prize-item_'+index"
                 :class="[index%2===0?'item-odd':'item-even','prize-item']" :key="index">
              <img :src="prize.image" class="prize-img" alt="奖品图片">
              <!--<span class="prize-name">{{prize.titleName}}</span>-->
              <div v-if="index%2===0" class="icon-arrow arrow-top last"></div>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="right-top">
            <div v-for="(prize,index) in prizeList" v-if="index>=7&&index<8" :id="'prize-item_'+index"
                 :class="[index%2===0?'item-odd':'item-even','prize-item']" :key="index">
              <img :src="prize.image" class="prize-img" alt="奖品图片">
              <!--<span class="prize-name">{{prize.titleName}}</span>-->
              <div v-if="index%2===1" class="icon-arrow arrow-down"></div>
            </div>
          </div>
          <div class="right-bottom prize-mgt">
            <div v-for="(prize,index) in prizeList" v-if="index>=8&&index<9" :id="'prize-item_'+index"
                 :class="[index%2===0?'item-odd':'item-even','prize-item']" :key="index">
              <img :src="prize.image" class="prize-img" alt="奖品图片">
              <!--<span class="prize-name">{{prize.titleName}}</span>-->
              <div v-if="index%2===1" class="icon-arrow arrow-down"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="prize-list bottom prize-mgt">
        <div v-for="(prize,index) in prizeList" v-if="index>=9&&index<16" :id="'prize-item_'+index"
             :class="[index%2===0?'item-odd':'item-even','prize-item']" :key="index">
          <img :src="prize.image" class="prize-img" alt="奖品图片">
          <!--<span class="prize-name">{{prize.titleName}}</span>-->
          <div v-if="index%2===0" class="icon-arrow arrow-left"></div>
        </div>
      </div>
    </div>
    <div class="game-box">
      <div class="winner-box">
        <div class="title"></div>
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
        <div class="ball-table">
          <div class="table-1"></div>
          <div class="table-2"></div>
          <div :class="[isLottery?'active':'none','hands']"></div>
        </div>
      </div>
    </div>
    <div class="door-r"></div>
    <div class="cat-box">
      <qrcode class="qr-code" :value="qrCode"
              :options="{width:170}"></qrcode>
      <div class="door-l"></div>
    </div>
    <div class="animation"></div>
    <div class="lottery-result" v-show="showLotteryResult">
      <div class="winner-user">
        <ul class="user-info">
          <li class="user"><img :src="winnerInfo.memberHead" alt="用户头像"></li>
          <li class="prize">
            <img :src="winnerInfo.prizeImg" alt="奖品图片">
            <span class="prize-name">{{winnerInfo.prizeName}}</span>
          </li>
          <li class="winner-txt">{{winnerInfo.memberName}}获得了{{winnerInfo.prizeName}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import TWEEN from '@tweenjs/tween.js'
  import VueQRCode from '@chenfengyuan/vue-qrcode';
  import fly from 'utils/fly'
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
    name: 'screenOne',
    data() {
      return {
        gameStatus: {
          prizeList: [],
          prizePoints: [],
          start: 5,
          end: 0,
          loop: 2,
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
          gameType: 2,
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
      _self.adaptiveZoom(); // 自动缩放
      window.addEventListener("resize", function () {
        _self.adaptiveZoom();
      });
      _self.$nextTick(() => {
        // 初始化用户头像起点需要移动的路径
        let startPoints = [];
        startPoints.push(new Point(1200, 335));
        startPoints.push(new Point(1200, 425));
        startPoints.push(new Point(1200, 515));
        startPoints.push(new Point(1200, 605));
        for (let i = 0; i < 1000; i++) {
          startPoints.push(new Point(1050, 605));
        }
        _self.queueAni.setStartPoints(startPoints);
        _self.animate();
        // 由于谷歌浏览器偶尔自动播放背景音乐失败，所以手动手动播放背景音乐
        _self.bgMusic = document.querySelector('#bgMusic');
        _self.bgMusicTimer = setInterval(() => {
          let playPromise = _self.bgMusic.play();
          if (playPromise !== undefined) {
            playPromise.then(_ => {
              clearInterval(_self.bgMusicTimer)
            })
              .catch(error => {
                playPromise = _self.bgMusic.pause();
              });
          }
        }, 100);
        // 自动监测是否有小球添加到了抽奖动画队列
        _self.lotteryStartTimer = setInterval(() => {
          _self.lotteryStart();
        }, 1000);
      });
      // 执行测试用例
      this.handleTestDemo();
    },
    methods: {
      /**
       * 测试用例
       */
      handleTestDemo() {
        for (let i = 0; i < 18; i++) {
          this.prizeList.push({
            giftCode: i + 1,
            image: `https://kxcdn.kxdpm.com/demo/lottery/1%20(${i + 1}).jpg`,
            showDraw: false,
            titleName: `奖品${i + 1}代金券`
          });
        }
        this.$nextTick(() => {
          this.createGameArea(); // 设置游戏区域
        });

        function createRandom(min, max) {
          return min + Math.round(Math.random() * (max - min))
        }

        // 定时添加一个用户
        this.demoTimer = setInterval(() => {
          const lotteryUser = {
            memberCode: '',
            memberName: `张三${createRandom(1, 18)}`,
            memberHead: defaultHead,
            times: createRandom(50, 200),
            ticketId: createRandom(1, 18),
            winnerRecordCode: '',
            showDraw: createRandom(0, 1)
          };
          this.lotteryUserList.push(lotteryUser);
          this.lotteryReady(lotteryUser);
        }, 500)
      },
      /**
       * 自适应宽高
       */
      adaptiveZoom() {
        const gameWidth = window.innerWidth;
        const gameHeight = window.innerHeight;
        let zoom = 1;
        let scale = gameWidth / gameHeight;
        zoom = scale < 1920 / 1080 ? gameWidth / 1920 : gameHeight / 1080;
        document.querySelectorAll('.game-body')[0].style.zoom = zoom;
      },
      /**
       * 创建游戏区域
       */
      createGameArea() {
        const _self = this;
        for (let i = 0; i < 18; i++) {
          let obj = document.getElementById(`prize-item_${i}`);
          _self.gameStatus.prizeList.push(obj);
          let point = {
            x: obj.offsetLeft + 85,
            y: obj.offsetTop + 85
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
        const gameArea = document.getElementById('turnLotteryOne');
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
        let times = [300, 300];
        let points = [];
        points.push(new Point(1320, 555));
        points.push(new Point(1320, 110));
        lottery.setStartPoints(points);
        lottery.setStartTimes(times);

        lottery.setLotteryPoints(_self.gameStatus.prizePoints);
        lottery.setLotteryData(_self.gameStatus.start, lottery.getUser().end, _self.gameStatus.loop);
        // 抽奖动画开始播放 同时播放抽奖音效
        document.querySelector('#firingMusic')
          .play();
        lottery.onLotteryPoint(function (i) {
          _self.gameStatus.prizeList[i].classList.add('active');
          let _i = i - 1;
          _i = _i < 0 ? _self.gameStatus.prizeList.length - 1 : _i;
          _self.gameStatus.prizeList[_i].classList.remove('active');
        });

        lottery.start();
        setTimeout(() => {
          _self.isLottery = false;
        }, 100);
        lottery.onLotteryEnd((ball) => {
          // :todo 发送中奖信息给手机端

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
            _self.gameStatus.prizeList[ball.user.end].classList.remove('active');
          }, 3000);
        });
      },
    },
    watch: {
      winnerList() {
        // let winnerLength = $('.winner-list').length;
        // if (winnerLength >= 10) {
        //   $('.winner-box ul')
        //     .animate({
        //       marginTop: -36 * (winnerLength - 9) + 'px'
        //     }, 500)
        // }
      }
    },
    beforeDestroy() {
      clearInterval(this.bgMusicTimer);
      clearInterval(this.demoTimer);
      clearInterval(this.lotteryStartTimer);
    }
  };
</script>

<style lang="scss" scoped>
  @import "index";
</style>
