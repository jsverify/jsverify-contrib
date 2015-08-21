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
...
```

## Set

Arbitrary for sets represented by an array, i.e. arrays without duplicates.

```js
var setArb = require("jsverify-contrib/set");
```

## Contributing

- `README.md` is generated from the source with [ljs](https://github.com/phadej/ljs)
- Before creating a pull request, run `make test`, yet travis will do it for you.

## Release History

- **1.0.0** &mdash; *2015-08-21* &mdash; Initial release

The MIT License (MIT)

Copyright (c) 2015 Oleg Grenrus and jsverify-contrib contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
