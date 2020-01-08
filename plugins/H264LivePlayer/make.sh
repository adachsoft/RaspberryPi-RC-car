#!/bin/bash

cd node_modules/h264-live-player
#browserify  --bare --standalone WSAvcPlayer  wsavc/wsavc_webworker.js > dist/http-live-player-worker.js
#browserify --bare --standalone WSAvcPlayer wsavc/ > dist/http-live-player.js

browserify --standalone WSAvcPlayer wsavc/ > dist/http-live-player.js
