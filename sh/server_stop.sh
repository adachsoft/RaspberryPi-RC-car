#!/bin/bash

file="./tmp/rccar.lock"
if [ -f "$file" ]
then
    pid="$(cat $file)"
    echo "PID: $pid"
    sudo kill -2 $pid
    sudo rm $file
else
    echo "$file not found."
fi
