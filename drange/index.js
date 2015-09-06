/**
 ## Discontinuous Range

 Selecting numbers uniformly from multiple ranges

 ```js
 var drangeArb = require("jsverify-contrib/drange");
 ```

 In the following example `d` will generate 0, 1, 4, or 5.
 ```
 var includedRanges = [{low: 0, high: 5}];
 var excludeRanges = [{low: 2, high: 3}];
 var d = drangeArb(includedRanges, excludedRanges);
 ```
 */

"use strict";

var jsc = require("jsverify");
var DataStructure = require("./lib/DataStructure.js");

function drange(includeRanges, excludeRanges) {
  excludeRanges = excludeRanges || [];

  var range = new DataStructure();
  var i;
  var n;

  for (i = 0, n = includeRanges.length; i < n; i++) {
    range.union(includeRanges[i].low, includeRanges[i].high);
  }

  for (i = 0, n = excludeRanges.length; i < n; i++) {
    range.difference(excludeRanges[i].low, excludeRanges[i].high);
  }

  function drangeGenerator(/* size */) {
    return range.index(jsc.integer(0, range.length() - 1).generator());
  }

  return jsc.bless({
    generator: drangeGenerator,
    // shrink
    // show
  });
}

drange.DataStructure = DataStructure;

module.exports = drange;
