#!/bin/bash

PATH_RCCAR=/var/www/html

cd $PATH_RCCAR/nodejs

nohup sudo node --experimental-worker rccar.js > /dev/null &
#sudo node --experimental-worker rccar.js > /dev/null &

#sudo node --experimental-worker ../nodejs/rccar.js > /dev/null &
