#!/bin/sh

set -e

MODULES=$*

for MODULE in $MODULES; do
	echo "Testing module $MODULE"
	$MOCHA --reporter spec $MODULE/test
done
