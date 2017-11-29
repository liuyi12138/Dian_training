#include <stdio.h>
#include <stdlib.h>
#include"a_head.h"
struct test all[99999];
int i=0;

int main()
{

    read_file_list("d:/Dian/trainingDigits/*.*");
    ++i;
    read_a_single_file("d:/Dian/testDigits/2_85.txt");
    knn();
    return 0;
}
