/**
 ## Discontinuous Range

 Selecting numbers uniformly from multiple ranges

 ```js
 var fromDiscontinuousRangeArb = require("jsverify-contrib/drange").fromDiscontinuousRange;
 ```

 In the following example `d` will generate 0, 1, 4, or 5.
 ```
 var includedRanges = [{low: 0, high: 5}];
 var excludeRanges = [{low: 2, high: 3}];
 var d = fromDiscontinuousRangeArb(includedRanges, excludedRanges);
 ```
 */

"use strict";

var jsc = require("jsverify");
var DiscontinuousRange = require("discontinuous-range");

function drange(includeRanges, excludeRanges) {
  excludeRanges = excludeRanges || [];

  var range = new DiscontinuousRange();
  var i;
  var n;

  for (i = 0, n = includeRanges.length; i < n; i++) {
    range.add(includeRanges[i].low, includeRanges[i].high);
  }

  for (i = 0, n = excludeRanges.length; i < n; i++) {
    range.subtract(excludeRanges[i].low, excludeRanges[i].high);
  }

  function drangeGenerator(/* size */) {
    return range.index(jsc.integer(0, range.length - 1).generator());
  }

  return jsc.bless({
    generator: drangeGenerator,
    // shrink
    // show
  });
}

exports.fromDiscontinuousRange = drange;
