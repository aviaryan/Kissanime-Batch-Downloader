#!/bin/bash

# USING (suitable for option 1)
# /path/to/wget_helper.sh list.txt
# 
# This scripts names files as -- 
# Series_Episode_1__1280x720.mp4
# Series_Episode_2__1280x720.mp4
# .... and so on

while read -r p filename tail; do
	# http://unix.stackexchange.com/questions/61132/how-do-i-use-wget-with-a-list-of-urls-and-their-corresponding-output-files
	wget -O "$filename" "$p" || err=1
done < $1
