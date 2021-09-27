#!/bin/bash
set -e
set -x

BREWCRAFT=/Users/michael/Code/fuzzy-potato/brewcraft

cd $BREWCRAFT
npm run build
scp -r build michael@brewcraft-us-east-2:~

exit 0
