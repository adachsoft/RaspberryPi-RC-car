## Remote control via browser with camera support. Tested on Raspberry PI.


## Install stream
https://www.linux-projects.org/uv4l/installation/

https://github.com/cncjs/cncjs/wiki/Setup-Guide:-Raspberry-Pi-%7C-MJPEG-Streamer-Install-&-Setup-&-FFMpeg-Recording

## Proble with Camera Pi Zero W
/boot/config.txt

over_voltage=4
force_turbo=1

## Auto start after power up
Add line in "/etc/rc.local"

/var/www/html/sh/server_start.sh &