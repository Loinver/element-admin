import TWEEN from '@tweenjs/tween.js'

const StartAni = function (pos) {
  let p = pos;
  let points = [];
  let times = [];
  let i = 0;
  let _onPoint = null;
  let _onUpdate = null;
  let _onComplete = null;

  this.setPoints = function (arr) {
    points = arr;
  };

  this.setTimes = function (arr) {
    times = arr;
  };

  this.start = function () {
    p.x = points[0].x;
    p.y = points[0].y;
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

  let next = function () {
    if (_onPoint) _onPoint(i);
    i++;
    if (i >= points.length) {
      if (_onComplete) _onComplete();
    } else {
      let t = times.length > i ? times[i] : 200;
      new TWEEN.Tween(p)
          .to(points[i], t)
          .onUpdate(_onUpdate)
          .onComplete(next)
          .start();
    }
  };
};

export default StartAni
