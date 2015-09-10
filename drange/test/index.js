/* eslint-env node, mocha */
"use strict";

var jsc = require("../../index.js");
var drange = require("../index.js");

describe("DRange", function () {
  describe("fromDiscontinuousRange", function () {
    jsc.property("generates numbers in range", drange.fromDiscontinuousRange([{ low: 0, high: 10 }, { low: 20, high: 30 }]), function (s) {
      return s >= 0 && s <= 10 || s >= 20 && s <= 30;
    });

    jsc.property("does not generate excluded numbers", drange.fromDiscontinuousRange([{ low: 0, high: 19 }], [{ low: 5, high: 14 }]), function (s) {
      return s >= 0 && s < 5 || s >= 15 && s <= 19;
    });
  });
});

