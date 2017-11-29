#include <stdio.h>
#include <stdlib.h>
#include"a_head.h"
#define N 9

int knn()
{
    extern int i;
    extern struct test all[99999];
    int p,q,k,b,c;
    int max=0;
    int g,v;
    int book[10];
    for(v=0;v<10;++v)
        book[v]=0;

    printf("%s",all[i-2].num);
    struct distance all2[i-2];


    for(p=0,q=i-2;p<i-2;++p)
    {
        int x;
        if(p<=189)
            x=0;
        else if(p<=387)
            x=1;
        else if(p<=582)
            x=2;
        else if(p<=781)
            x=3;
        else if(p<=967)
            x=4;
        else if(p<=1154)
            x=5;
        else if(p<=1349)
            x=6;
        else if(p<=1550)
            x=7;
        else if(p<=1730)
            x=8;
        else
            x=9;

       all2[p].distance=cal_distance(q,p);
        all2[p].number=x;

    }




     int w,d;
     struct distance l;
        for(w=(i-3);w>0;--w)
    {
        for(d=0;d<w;++d)
        {
         if(all2[d+1].distance<all2[d].distance)
          {
            l=all2[d];
            all2[d]=all2[d+1];
            all2[d+1]=l;
          }
        }

    }

    for(k=0;k<N;++k)
    {

        b=all2[k].number;
        ++book[b];
    }

    for(c=0;c<10;++c)
    {



        if(book[c]>max)
        {
            max=book[c];
            g=c;
        }

    }

    printf("i guess the number is %d\n",g);




    return 0;

}
