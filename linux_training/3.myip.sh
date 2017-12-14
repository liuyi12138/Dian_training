#!/bin/bash
showip()
{
echo "NIC       IP Address"
printf "eth0      "
ipaddress=$(ifconfig | grep 'inet'| grep -v '127.0.0.1' | cut -d: -f2 | awk '{ print $2} ')
echo $ipaddress
exit
}

usage()
{
echo "usage: 3.myip.sh [[] or [-ip IP ADDR] [-mask MASK]"
echo "脚本功能：配置ip和mask"
exit
}

change()
{
ifconfig eth0 $b netmask $d up # 配置ip和mask
ip
}

a=$1 # -ip
b=$2 # ip
c=$3 # -mask
d=$4 # mask
if [ -z $a ]
then
    showip
elif [[ $a != '-ip' || $c != '-mask' ]]
then
    usage
else 
    change
fi
