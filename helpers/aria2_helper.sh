#!/bin/bash

# USING (suitable for option 1)
# /path/to/aria2_helper.sh list.txt
# 
# This scripts names files as -- 
# Series_Episode_1__1280x720.mp4
# Series_Episode_2__1280x720.mp4
# .... and so on

while read -r p filename tail; do
	# last line bug ^^ : http://stackoverflow.com/questions/12916352/
	aria2c $p -x 2 -s 2 -o "$filename" --check-certificate=false
done < $1
