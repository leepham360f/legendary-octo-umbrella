#!/bin/sh
echo "hello world"
# exec git tag -l | grep $(git describe HEAD)
exec git describe --tags --abbrev=0