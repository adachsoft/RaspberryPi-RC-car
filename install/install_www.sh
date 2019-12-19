#!/bin/bash


sudo apt-get install php7.0 php7.0-mbstring php7.0-xml -y
sudo apt-get install apache2 -y
sudo apt-get install libapache2-mpm-itk -y


sudo cp install/000-default.conf /etc/apache2/sites-available/000-default.conf
sudo /etc/init.d/apache2 restart
