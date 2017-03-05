#!/bin/bash

# USING
# /path/to/aria2_helper.sh list.txt
# 
# This scripts names files as -- 
# Listing Name 001.mp4 
# Listing Name 002.mp4
# .... and so on

while read -r p filename tail; do
	# last line bug ^^ : http://stackoverflow.com/questions/12916352/
	aria2c $p -x 2 -s 2 -o "$filename" --check-certificate=false
done < $1
