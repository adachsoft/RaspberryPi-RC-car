#!/bin/bash



rm -R /var/www/html/
mkdir /var/www/html
cd /var/www/html
chown -R pi:pi /var/www/html

su - pi <<'EOF'
cd /var/www/html
git clone https://github.com/adachsoft/RaspberryPi-RC-car.git .
composer install
npm install
EOF
