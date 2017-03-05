#!/bin/bash

# USING
# /path/to/aria2_helper.sh list.txt
# 
# This scripts names files as -- 
# Episode_1.mp4 
# Episode_2.mp4
# .... and so on
# Change start variable below to change starting number of episode

start=1

while read p || [ -n "$p" ]; do
	# last line bug ^^ : http://stackoverflow.com/questions/12916352/
	# echo $start
	aria2c $p -x 2 -s 2 -o "Episode_"$start".mp4" --check-certificate=false
	let start+=1
done < $1
