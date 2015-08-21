/* eslint-env node, mocha */
"use strict";

var jsc = require("../../index.js");
var setArb = require("../index.js");

function count(arr, el) {
  var c = 0;

  for (var i = 0; i < arr.length; i++) {
    if (el === arr[i]) {
      c += 1;
    }
  }

  return c;
}

describe("set", function () {
  jsc.property("all elements are distinct", setArb(jsc.nat), function (s) {
    return s.every(function (el) {
      return count(s, el) === 1;
    });
  });
});
