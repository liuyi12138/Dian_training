#ifndef A_HEAD_H_INCLUDED
#define A_HEAD_H_INCLUDED
int read_file_list(char* path );
void read_a_single_file(char *f_path);
float cal_distance(int q,int b);
int knn();

struct test
{
char *data;
char num[10000];

};

struct distance
{
    int number;
    float distance;
};



#endif // A_HEAD_H_INCLUDED
