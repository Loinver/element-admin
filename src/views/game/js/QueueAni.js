const QueueAni = function () {
  let points = [];

  // 创建初始路径
  this.setStartPoints = function (startPoints) {
    points = startPoints;
  };

  let speed = 1;
  let _t = new Date().getTime();

  let ballList = [];
  this.push = function (ball) {
    if (ballList.length === points.length) return false;
    let p = points[points.length - 1];
    ball.pos = p.clone();
    ballList.push(ball);
    return true;
  };

  this.pop = function () {
    if (ballList.length === 0) return null;
    if (!ballList[0].pos.equals(points[0])) return null;
    return ballList.shift();
  };

  this.update = function (t) {
    let dt = t - _t;
    _t = t;
    for (let i = 0; i < ballList.length; ++i) {
      let ball = ballList[i];
      if (!ball.pos.equals(points[i])) {
        for (let j = 0; j < points.length - 1; ++j) {
          if (ball.pos.onSegment(points[j], points[j + 1])) {
            let d = ball.pos.clone().sub(points[j]).length();
            if (d < speed * dt) {
              ball.pos = points[j].clone();
            } else {
              let v = points[j].clone().sub(points[j + 1]).normalize();
              ball.pos.add(v.scalar(speed * dt));
            }
            break;
          }
        }
      }
      // 同步位置
      ball.div.style.left = ball.pos.x + 'px';
      ball.div.style.top = ball.pos.y + 'px';
    }
  };

  this.isFull = function () {
    return ballList.length >= points.length;
  };
};

export default QueueAni;
