import LotteryAni from './LotteryAni'
import StartAni from './StartAni'
import Point from './Point'

const Lottery = function (_ball) {
  let ball = _ball;
  let p = new Point();

  let lotteryAni = new LotteryAni(p, ball.user.time);
  lotteryAni.onUpdate(function () {
    ball.div.style.left = (p.x + 25) + 'px';
    ball.div.style.top = (p.y + 25) + 'px';
  });

  let startAni = new StartAni(p);
  startAni.onUpdate(function () {
    ball.div.style.left = p.x + 'px';
    ball.div.style.top = p.y + 'px';
  });
  startAni.onComplete(function () {
    lotteryAni.start();
  });

  this.start = function () {
    startAni.start();
  };

  this.setStartPoints = function (arr) {
    startAni.setPoints(arr);
  };

  this.setStartTimes = function (arr) {
    startAni.setTimes(arr);
  };

  this.setLotteryPoints = function (arr) {
    lotteryAni.setPoints(arr);
  };

  this.setLotteryData = function (start, end, loop) {
    lotteryAni.setData(start, end, loop);
  };

  this.onStartPoint = function (callback) {
    startAni.onPoint(callback);
  };

  this.onLotteryPoint = function (callback) {
    lotteryAni.onPoint(callback);
  };

  this.onLotteryEnd = function (callback) {
    lotteryAni.onComplete(() => {
      callback(ball);
    });
  };

  this.getUser = function () {
    return ball.user;
  };
};
export default Lottery;
