#include <io.h>
#include <stdio.h>
#include<string.h>
#include"a_head.h"

int read_file_list(char* path )
{

    extern int i;
    extern struct test all[99999];

    struct _finddata_t data;
    long hnd = _findfirst( path, &data );    // �����ļ�����������ʽchRE��ƥ���һ���ļ�
    if ( hnd < 0 )
    {
        perror( path );
    }
    int  nRet = (hnd <0 ) ? -1 : 1;
    while ( nRet >= 0 )
    {
        ++i;
        if(i>2)
        {
            char abc[50]="d:/Dian/trainingDigits/";
            all[i-2].data=strcat(abc,data.name);
            read_a_single_file(all[i-2].data);

        }

        nRet = _findnext( hnd, &data );
    }
    _findclose( hnd );     // �رյ�ǰ���
    return i;
}




