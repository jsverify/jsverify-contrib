"use strict";

/**
## Set

Arbitrary for sets represented by an array, i.e. arrays without duplicates.

```js
var setArb = require("jsverify-contrib/set");
```

*/

var jsc = require("jsverify");
var _ = require("lodash");

function setArb(elArb) {
  return jsc.array(elArb).smap(_.uniq, _.identity);
}

module.exports = setArb;
