#!/bin/bash

currentDate=$(date +%d-%m-%y)
dailyCount=$(ls -l backup | grep $currentDate | wc -l )

tar -zcf backup/backup_${currentDate}_${dailyCount}.tgz data
