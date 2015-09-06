/* jshint node:true */
/* global describe, it */
"use strict";

var jsc = require("../../index.js");
var drange = require("../index.js");

describe("DataStructure", function () {
  var range = jsc.pair(jsc.integer, jsc.nat());

  it("union is idempotent", function () {
    var prop = jsc.forall(range, function (l) {
      var r1 = new drange.DataStructure();
      var r2 = new drange.DataStructure();

      r1.union(l[0], l[0] + l[1]);
      r2.union(l[0], l[0] + l[1]);
      r2.union(l[0], l[0] + l[1]);

      return jsc.utils.isEqual(r1, r2);
    });

    jsc.assert(prop);
  });

  it("exists a range that dominates all existing ranges", function () {
    var prop = jsc.forall(jsc.array(range), function (l) {
      var r = new drange.DataStructure();
      var max = 0;
      var min = 0;

      r.union(0, 0);
      l.forEach(function (p) {
        max = Math.max(max, p[0] + p[1]);
        min = Math.min(min, p[0]);
        r.union(p[0], p[0] + p[1]);
      });
      r.union(min, max);

      var result =
        r.data.length === 1 &&
        jsc.utils.isEqual(r, {
          data: [{ low: min, high: max }],
        });

      return result;
    });

    jsc.assert(prop);
  });

  it("exists a range that removes all ranges", function () {
    var prop = jsc.forall(jsc.array(range), function (l) {
      var r = new drange.DataStructure();
      var max = 0;
      var min = 0;

      r.union(0, 0);
      l.forEach(function (p) {
        max = Math.max(max, p[0] + p[1]);
        min = Math.min(min, p[0]);
        r.union(p[0], p[0] + p[1]);
      });
      r.difference(min, max);

      return r.data.length === 0;
    });

    jsc.assert(prop);
  });

  it("union and difference are inverses", function () {
    var prop = jsc.forall(range, function (p) {
      var r = new drange.DataStructure();
      var end = p[0] + p[1];
      r.union(p[0], end);
      r.difference(p[0], end);

      return r.data.length === 0;
    });

    jsc.assert(prop);
  });

  it("n differences are the inverse of 1 union of size n ", function () {
    var prop = jsc.forall(range, function (p) {
      var r = new drange.DataStructure();
      var end = p[0] + p[1];
      r.union(p[0], end);
      for (var i = p[0]; i <= p[0] + p[1]; i++) {
        r.difference(i);
      }

      return r.data.length === 0;
    });

    jsc.assert(prop);
  });

  it("A - B = (A ∪ B) - B", function () {
    var prop = jsc.forall(jsc.pair(range, range), function (p) {
      var r1 = new drange.DataStructure();
      var r2 = new drange.DataStructure();
      var a = p[0];
      var b = p[1];

      // left side
      r1.union(a[0], a[0] + a[1]);
      r1.difference(b[0], b[0] + b[1]);

      // right side
      r2.union(a[0], a[0] + a[1]);
      r2.union(b[0], b[0] + b[1]);
      r2.difference(b[0], b[0] + b[1]);

      return jsc.utils.isEqual(r1, r2);
    });

    jsc.assert(prop);
  });

  it("inserting n non-overlapping ranges with 1 element each has a length of n", function () {
    var prop = jsc.forall(jsc.array(jsc.integer), function (arr) {
      var r1 = new drange.DataStructure();
      var existing = [];

      arr.forEach(function (int) {
        if (existing.indexOf(int) === -1) {
          existing.push(int);
          r1.union(int);
        }
      });

      return r1.length() === existing.length;
    });

    jsc.assert(prop);
  });

  it("the computed length is the same as the enumerated length", function () {
    var prop = jsc.forall(jsc.array(jsc.pair(jsc.bool, range)), function (arr) {
      var r = new drange.DataStructure();
      var valuesInRange = [];

      arr.forEach(function (p) {
        var union = p[0];
        var rangePair = p[1];
        var end = rangePair[0] + rangePair[1];

        r[union ? "union" : "difference"](rangePair[0], end);

        for (var i = rangePair[0]; i <= end; i++) {
          var position = valuesInRange.indexOf(i);

          if (union && position === -1) {
            valuesInRange.push(i);
          } else if (!union && position !== -1) {
            valuesInRange.splice(position, 1);
          }
        }

      });

      return r.length() === valuesInRange.length;
    });

    jsc.assert(prop);
  });

  it("the computed index is the same as the enumerated index", function () {
    var prop = jsc.forall(jsc.array(jsc.pair(jsc.bool, range)), function (arr) {
      var r = new drange.DataStructure();
      var valuesInRange = [];

      arr.forEach(function (p) {
        var union = p[0];
        var rangePair = p[1];
        var end = rangePair[0] + rangePair[1];

        r[union ? "union" : "difference"](rangePair[0], end);

        for (var i = rangePair[0]; i <= end; i++) {
          var position = valuesInRange.indexOf(i);

          if (union && position === -1) {
            valuesInRange.push(i);
          } else if (!union && position !== -1) {
            valuesInRange.splice(position, 1);
          }
        }

      });

      valuesInRange.sort(function (a, b) { return a - b; });
      return valuesInRange.reduce(function (acc, next, i) {
        return acc && r.index(i) === next;
      }, true);
    });

    jsc.assert(prop);
  });
});
