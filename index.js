"use strict";

/**

# jsverify-contrib

<img src="https://raw.githubusercontent.com/jsverify/jsverify/master/jsverify-300.png" align="right" height="100" />

> Property based checking. Like QuickCheck. Contrib modules.

[![Build Status](https://secure.travis-ci.org/jsverify/jsverify-contrib.svg?branch=master)](http://travis-ci.org/jsverify/jsverify-contrib)
[![NPM version](https://badge.fury.io/js/jsverify-contrib.svg)](http://badge.fury.io/js/jsverify-contrib)
[![Dependency Status](https://david-dm.org/jsverify/jsverify-contrib.svg)](https://david-dm.org/jsverify/jsverify-contrib)
[![devDependency Status](https://david-dm.org/jsverify/jsverify-contrib/dev-status.svg)](https://david-dm.org/jsverify/jsverify-contrib#info=devDependencies)

## Synopsis

```js
var jsc = require("jsverify-contrib");
var jscSet = require("jsverify-contrib/set");
var jscDRange = require("jsverify-contrib/drange");
...
```

*/

/// include ./set/index.js
/// include ./drange/index.js
/// plain ./CONTRIBUTING.md
/// plain ./CHANGELOG.md
/// plain ./LICENSE

// Re-export jsverify
module.exports = require("jsverify");
