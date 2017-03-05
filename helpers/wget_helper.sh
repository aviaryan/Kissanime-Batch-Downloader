#!/bin/bash

# USING
# /path/to/wget_helper.sh list.txt
# 
# This scripts names files as -- 
# Listing Name 001.mp4 
# Listing Name 002.mp4
# .... and so on

while read -r p filename tail; do
	# http://unix.stackexchange.com/questions/61132/how-do-i-use-wget-with-a-list-of-urls-and-their-corresponding-output-files
	wget -O "$filename" "$p" || err=1
done < $1
