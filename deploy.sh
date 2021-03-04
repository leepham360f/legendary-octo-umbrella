#!/bin/sh
echo "hello world"
exec git tag -l | grep $(git describe HEAD)
