#!/bin/bash
usage()
{
echo "usage:5.dos2unix.sh [FileName] or 5.unix2dos.sh [FileName]"
echo "脚本功能：将dos文件和unix文件互相转换"
}
a=$(basename $0) #取本文件名 判断是用哪个文件名调用脚本
b=$1 #获取待转换文件名

if [ -z $b ]
then
usage
elif [ $a = '5.dos2unix.sh' ]
then
dos2unix $b
elif [ %a = '5.unix2dos.sh' ]
then
unix2dos $b
else
usage
fi
