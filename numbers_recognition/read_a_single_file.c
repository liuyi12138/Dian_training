#include <stdio.h>
#include <stdlib.h>
#include"a_head.h"
#include<strings.h>

void read_a_single_file(char *f_path)
{
    char a[10000];

    extern int i;
    extern struct test all[99999];

    FILE *fp = fopen(f_path, "r");
    if(fp == NULL)
    {
        printf("failed to open \n");
        return 1;
    }


    while(!feof(fp))
    {
        memset(a, 0, sizeof(a));
        fgets(a, sizeof(a)-1, fp);
        strcat(all[i-2].num,a);
    }


    char b[2]="\n";
    strcat(all[i-2].num,b);

    fclose(fp);


    return 0;
}






