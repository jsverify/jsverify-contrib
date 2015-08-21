#!/bin/sh

set -e

MODULES=$*

for MODULE in $MODULES; do
	echo "Covering module $MODULE"
	$ISTANBUL cover -- $IMOCHA --reporter dot --timeout 10000 $MODULE/test
	test -f coverage/coverage.json
	$ISTANBUL check-coverage --statements 100 --branches 100 --functions 100 coverage/coverage.json
done
