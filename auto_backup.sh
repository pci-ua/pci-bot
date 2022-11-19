#!/bin/bash

old=$(crontab -l)
path=$(pwd)
echo -e "$old \n0 1 * * * cd $path && ./make_backup.sh" | crontab

