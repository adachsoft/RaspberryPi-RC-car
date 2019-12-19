#!/bin/bash

if [[ $(id -u) -ne 0 ]] ; then echo "Please run as root" ; exit 1 ; fi

sudo apt-get install lsb-release

#dev=`cat /proc/device-tree/model`
model=$(tr -d '\0' < /proc/device-tree/model)

echo "MODEL= "$model

#if [[ ${model} =~ ^Raspberry Pi Zero* ]] ; then echo "HH"; fi

if [[ $model =~ [^Raspberry\sPi\sZero]  ]]; then
echo "Install nodejs for Raspberry Pi Zero";
wget -O - https://raw.githubusercontent.com/sdesalas/node-pi-zero/master/install-node-v.last.sh | bash
fi

npm install -g npm

node -v
npm -v

echo "******INSTALL composer******"
curl -sS https://getcomposer.org/installer | php
sudo mv composer.phar /usr/local/bin/composer
