#!/bin/sh
echo "hello world !"
# exec git tag -l | grep $(git describe HEAD)
# exec git describe --tags --abbrev=0
# echo ::set-output name=tag_version::$(echo $RANDOM)
echo ::set-output name=tag_version::$(echo $(git describe HEAD))
