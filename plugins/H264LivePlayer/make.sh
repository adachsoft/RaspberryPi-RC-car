#!/binn/bash

cd node_modules/h264-live-player
browserify --bare --standalone WSAvcPlayer wsavc/ > dist/http-live-player.js
