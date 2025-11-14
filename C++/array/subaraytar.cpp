#include <iostream>
using namespace std;


int main(){

   const int n=7;
   int  arr[n]={2,3,4,6,7,8,9};
   int tarsum=20;
   int fidx=0,lidx=0;
   int crsum=0;
   for(int i=0;i<n;i++){
    crsum+=arr[i];
    if(crsum<tarsum) lidx++;
    while(crsum>tarsum && fidx<i){
        crsum-=arr[fidx];
        fidx++;
    }
    if(crsum==tarsum){
        cout<<fidx<<" "<<lidx;
    }
   }
   return 0;
}

