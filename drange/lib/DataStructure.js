"use strict";

var assert = require("assert");

/*
  #### DRange : DRange

  Discontinuous ranges. Unions of non-adjacent ranges. (e.g. [1-10] ∪ [21-30])

  Short summary of member functions:

  - DRange.union (Integer) (Integer) : void
  - DRange.difference (Integer) (Integer) : void
  - DRange.length () : Integer
  - DRange.index(Integer) : Integer
*/

function DRange() {
  this.data = [];
}

DRange.prototype.union = function (low, high) {
  high = typeof high === "undefined" ? low : high;
  assert(low <= high, "start of range must be smaller than the end");

  var i = 0;
  while (i < this.data.length && low > this.data[i].high) {
    i++;
  }
  this.data.splice(i, 0, { low: low, high: high });

  // Check if overlaps with next
  while (i < this.data.length - 1 && high >= this.data[i + 1].low) {
    this.data[i].low = low = Math.min(low, this.data[i + 1].low);
    this.data[i].high = high = Math.max(high, this.data[i + 1].high);
    this.data.splice(i + 1, 1);
  }

};

DRange.prototype.difference = function (low, high) {
  high = typeof high === "undefined" ? low : high;
  assert(low <= high, "start of range must be smaller than the end");

  var i = 0;
  while (i < this.data.length && low > this.data[i].high) {
    i++;
  }

  while (i < this.data.length && this.data[i].low <= high) {
    if (low <= this.data[i].low && high >= this.data[i].high) {
      // overlaps entire range, remove it
      this.data.splice(i, 1);
    } else if (low <= this.data[i].low && high < this.data[i].high) {
      // overlaps on left side, adjust low
      this.data[i].low = high + 1;
      i++;
    } else if (low > this.data[i].low && high >= this.data[i].high) {
      // overlaps on the right side, adjust high
      this.data[i].high = low - 1;
      i++;
    } else /* if (low > this.data[i].low && high < this.data[i].high) */ {
      // overlaps a subset of the range, split the range excluding the subset
      this.data.splice(i + 1, 0, { low: high + 1, high: this.data[i].high });
      this.data[i].high = low - 1;
    }
  }

};

DRange.prototype.length = function () {
  var length = 0;
  for (var i = 0; i < this.data.length; i++) {
    length += this.count(i);
  }

  return length;
};

DRange.prototype.index = function (idx) {
  var i = 0;
  var total = 0;

  while (i < this.data.length && idx >= total) {
    total += this.count(i);
    i++;
  }

  i--;
  total -= this.count(i);
  return this.data[i].low + (idx - total);
};

DRange.prototype.count = function (i) {
  return this.data[i].high - this.data[i].low + 1;
};

module.exports = DRange;
