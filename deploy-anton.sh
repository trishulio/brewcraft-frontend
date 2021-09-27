#!/bin/bash
set -e
set -x

BREWCRAFT=/Users/michael/Code/fuzzy-potato/brewcraft

cd $BREWCRAFT
npm run build
scp -r build michael@brewcraft-us-east-2:~
ssh michael@brewcraft.cloudville.me << ENDSSH
    scp -r build anton:~
ENDSSH

exit 0
