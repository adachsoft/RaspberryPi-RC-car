#!/bin/bash

echo "INSTALL RC CAR"

sudo apt-get install apache2 -y

if ! [ -x "$(command -v git)" ]; then
    echo 'git is not installed.'
    echo 'Install git'
    sudo apt-get update
    sudo apt-get install git -y
fi

sudo rm -R /var/www/html/
mkdir /var/www/html
cd /var/www/html
chown -R pi:pi /var/www/html

git clone https://github.com/adachsoft/RaspberryPi-RC-car.git /var/www/html

cd /var/www/html


./install/install_www.sh
./install/install_others.sh