#!/bin/bash
#定义递归函数
function recursive()  
{  
    local num=$1  
    local dev=$(($num - 1))  
   
    if [ $dev -lt 1 ]   
    then  
        value=1  
    else  
        recursive $dev  
        value=$((num * $value))
    fi  
}
n=$1
if [ -z $n ]
then
    echo "usage: 1.factorial.sh [n] "
    echo "脚本功能：接受一个参数n，递归计算并打印n！"
else
value=1
# 调用函数，并传入n
recursive $n  
# 打印结果
echo $value
fi
