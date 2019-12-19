#!/bin/bash

echo "INSTALL RC CAR"

if ! [ -x "$(command -v git)" ]; then
    echo 'git is not installed.'
    echo 'Install git'
    sudo apt-get update
    sudo apt-get install git -y
fi

git clone https://github.com/adachsoft/RaspberryPi-RC-car.git /var/www/html