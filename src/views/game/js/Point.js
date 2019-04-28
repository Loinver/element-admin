const Point = function (x, y) {
  this.x = x || 0;
  this.y = y || 0;

  this.set = function (x, y) {
    this.x = x;
    this.y = y;
  };

  this.clone = function () {
    return new Point(this.x, this.y);
  };

  this.add = function (v) {
    this.x += v.x;
    this.y += v.y;
    return this;
  };

  this.sub = function (v) {
    this.x -= v.x;
    this.y -= v.y;
    return this;
  };

  this.scalar = function (s) {
    this.x *= s;
    this.y *= s;
    return this;
  };

  this.normalize = function () {
    let d = this.length();
    if (d) {
      if (d === 1) return this;
    } else {
      this.x = 0;
      this.y = 1;
      return this;
    }

    d = 1 / d;
    this.x *= d;
    this.y *= d;

    return this;
  };

  this.length = function () {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  };

  this.equals = function (other) {
    return this.x === other.x && this.y === other.y;
  };

  this.onSegment = function (p1, p2) {
    if (Math.min(p1.x, p2.x) > this.x) return false;
    if (Math.max(p1.x, p2.x) < this.x) return false;
    if (Math.min(p1.y, p2.y) > this.y) return false;
    if (Math.max(p1.y, p2.y) < this.y) return false;
    return (this.x - p1.x) * (p2.y - p1.y) === (p2.x - p1.x) * (this.y - p1.y);
  };
};

export default Point;
