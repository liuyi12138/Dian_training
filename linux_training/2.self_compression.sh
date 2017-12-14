#!/bin/bash
usage()
{
echo "usage:2.self_compression.sh [--list] or [Source compressed file] [Destination path]"
echo "脚本功能：接受一个压缩文件的路径，自动根据压缩文件的后缀名进行解 压到目标路径。"
 echo "接受--list参数，列出当前支持解压的压缩文件类型"
 exit
 }

a=$1 # 压缩文件的路径
b=$2 # 目标路径 
ext="${a##*.}" # 获取文件后缀名
echo $a 
if [ -z $a ]
then
	usage;
elif [ $a = '--list' ]
then	
    echo "被支持的压缩文件类型有 zip tar tar.gz tar.bz2"
    exit
else 
	echo "get it"	
fi  


if [ -z $b ]
then
   c=$0 # 目标路径
else
   c=$b # 目标路径
fi

case $ext in
	'zip')
               eval "unzip $a -d $c";;

	'tar')
               eval "tar xvf $a -C $c";;
        'gz')
               eval "tar zxvf $a -C $c";;
       'bz2')
               eval "tar jxvf $a -C $c";;
           *)
            echo "This type is not supported(tar|gz|bz2|zip)";;
   esac
   echo "done"
