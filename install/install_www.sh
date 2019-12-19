#!/bin/bash

PHP=php7.3

sudo apt-get install $PHP $PHP-mbstring $PHP-xml -y
sudo apt-get install apache2 -y
sudo apt-get install libapache2-mpm-itk -y


sudo cp install/000-default.conf /etc/apache2/sites-available/000-default.conf
sudo /etc/init.d/apache2 restart
