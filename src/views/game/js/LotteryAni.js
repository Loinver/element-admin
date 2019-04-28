import TWEEN from '@tweenjs/tween.js'

const LotteryAni = function (pos, baseTime = 100) {
  const p = pos;
  let begin = 0;
  let end = 0;
  let loop = 1;

  let points = [];

  let i = 0;
  let _onPoint = null;
  let _onUpdate = null;
  let _onComplete = null;

  this.setPoints = function (arr) {
    points = arr;
  };

  this.setData = function (b, e, l) {
    begin = b;
    end = e;
    loop = l;
  };

  this.start = function () {
    next();
  };

  this.onUpdate = function (callback) {
    _onUpdate = callback;
  };

  this.onPoint = function (callback) {
    _onPoint = callback;
  };

  this.onComplete = function (callback) {
    _onComplete = callback;
  };

  const next = function () {
    let index = begin + i;
    let maxLength = points.length * loop + end;
    index = index % points.length;
    if (_onPoint) _onPoint(index);
    if (index === end && begin + i >= maxLength) {
      if (_onComplete) _onComplete();
    } else {
      i++;
      index = begin + i;
      index = index % points.length;
      let slowLength = 12;
      if (i >= maxLength - slowLength - begin) {
        baseTime += 50;
      }
      new TWEEN.Tween(p)
          .to(points[index], baseTime)
          .onUpdate(_onUpdate)
          .onComplete(next)
          .start();
    }
  };
};

export default LotteryAni;
