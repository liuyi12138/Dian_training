#!/bin/bash
usage()
{
echo "usage： 4.file_size.sh [-n N] [-d DRE]"
echo "脚本功能： 打印出最大的前N个文件"
exit
}

a=$1 # -n 
b=$2 # N
c=$3 # -d
d=$4 # DRE

if [[ $a != '-n' ||  $c != '-d' ]]
then
usage
elif [ -z $d ]
then
c=$0
else
c=$d
fi

du -ah $c | sort -r | head -n  $b  | awk '{ printf NR "     "  $a "\n"}' 




