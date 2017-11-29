#include <stdio.h>
#include <stdlib.h>
#include"a_head.h"

float cal_distance(int q,int p)
{
    extern int i;
    extern struct test all[99999];
    float distance=0;
    int m=0;
    for(m=0;m<1024;++m)
    {
        if(all[q].num[m]!=all[p].num[m])
            distance++;
    }
    return distance;
}
