#include<stdio.h>


void TOH(int n,char s,char h,char d){
    if(n==1){
        printf("Move disk 1 from %c to %c\n",s,d);
        return;
    }

    TOH(n-1,s,d,h);
    printf("Move disk %d from %c to %c\n",n,s,d);
    TOH(n-1,h,s,d);
}

int main(){
    int n;
    printf("Enter No of disks..");
    scanf("%d",&n);
    if(n==0){
        printf("No of disks can not be zero");
        return 0;
    }

    TOH(n,'A','B','C');
    return 0;
}