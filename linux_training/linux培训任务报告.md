# linux培训任务报告 --刘羿 12.3

## 解题思路
#### 任务1：阶乘递归

##### １．从键盘接收一个参数ｎ
* 方法：　read n   或者　n=$1(提取第一个参数)

##### 2.定义递归函数　在函数内部调用函数本身
```markdown
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
```
##### 3.讨论输入值为０的情况
```markdown
   if [ $dev -lt 1 ]   
    then  
        value=1  
```

---

#### 任务２:自动根据压缩文件的后缀名进行解压

#####　１．接收压缩文件的路径和目标路径　处理未指定目标路径的问题
```markdown
a=$1 # 压缩文件的路径
b=$2 # 目标路径 

if [ -z $b ]
then
   c=$0 # 目标路径
else
   c=$b # 目标路径
fi
```

##### 2.接收参数--list
```markdown
elif [ $a = '--list' ]
then	
    echo "被支持的压缩文件类型有 zip tar tar.gz tar.bz2"
    exit
else 
	echo "get it"	
fi  
```

##### 2.判断文件类型　解压文件　输出重定向
```markdown
ext="${a##*.}" # 获取文件后缀名
case $ext　in
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
```

---

#### 任务３：实现自己的ip命令

##### 1.获取本机ip地址
```markdown
ipaddress=$(ifconfig | grep 'inet'| grep -v '127.0.0.1' | cut -d: -f2 | awk '{ print $2} ')
echo $ipaddress
```

##### 2.修改ip及mask
```markdown
ifconfig eth0 $b netmask $d up # 配置ip和mask
```

---

#### 任务４：获取文件夹下最大的前ｎ个文件

##### 1.du命令输出磁盘使用情况
但是一直没法输出前面的序号
##### 2.加上了awk命令输出序号
```markdown
du -ah $c | sort -r | head -n  $b  | awk '{ printf NR "     "  $a "\n"}'
```

#### 任务５：dos和unix文件格式转换

##### １．误区：一直百度如何用不同文件名调用同一脚本实现不同的功能
后来采用读取本文件名再分类进行转化

##### 2.文件格式转化
```markdown
elif [ $a = '5.dos2unix.sh' ]
then
dos2unix $b
elif [ %a = '5.unix2dos.sh' ]
then
unix2dos $b
```
***

## 个人总结,收获
* １.增强了百度能力
* 2.能够快速学习新的知识
* 3.掌握了linux系统的基本使用方式

***

## 对培训的建议

##### 增强互动性，让大家在培训中去尝试，体会会更深刻，时间稍微延长也没什么问题。