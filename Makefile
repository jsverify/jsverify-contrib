.PHONY : all test test-travis eslint jscs karma mocha istanbul david dist literate README.md

BINDIR=node_modules/.bin

ESLINT=$(BINDIR)/eslint
JSCS=$(BINDIR)/jscs
MOCHA=$(BINDIR)/mocha
IMOCHA=$(BINDIR)/_mocha
ISTANBUL=$(BINDIR)/istanbul
KARMA=$(BINDIR)/karma
BROWSERIFY=$(BINDIR)/browserify
LJS=$(BINDIR)/ljs
DAVID=$(BINDIR)/david
RJSON=$(BINDIR)/rjson

all : test

test : eslint jscs mocha istanbul david

test-travis : test test-readme

MODULES=set
SRC=index.js $(MODULES)

eslint : .eslintrc
	$(ESLINT) $(SRC)

.eslintrc : .eslintrc.rjson
	$(RJSON) .eslintrc.rjson > .eslintrc

jscs :
	$(JSCS) $(SRC)

mocha :
	MOCHA=$(MOCHA) ./run-tests.sh $(MODULES)

istanbul :
	IMOCHA=$(IMOCHA) ISTANBUL=$(ISTANBUL) ./run-coverage.sh $(MODULES)

dist : test literate $(DIST)
	git clean -fdx -e node_modules

david :
	$(DAVID)

literate : README.md

README.md :
	$(LJS) --no-code -o README.md index.js

test-readme : literate
	git diff --exit-code || (echo "README.md is generated file, run 'make README.md'" && false)
