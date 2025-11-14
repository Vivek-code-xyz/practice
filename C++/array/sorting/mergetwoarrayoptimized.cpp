#include <iostream>
#include <vector>

using namespace std;

vector<int> merge(vector<int>a,vector<int>b,int n,int m){
   int idx=n+m-1;
   int i=n-1,j=m-1;

   while(i>=0  && j>=0){ 

    if(a[i]>=b[j]){
        a[idx]=a[i];
        idx--; i--;     // == a[idx--] = a[i--];
    }
    else
        a[idx--]=b[j--];
    
   }

   while(j>=0)   a[idx--]=b[j--];

   for(int k : a) cout <<k<<" ";
    
    return a;
}

int main(){
   vector<int>arr={1,4,5,6,0,0,0,0,0};
    vector<int > brr={2,3,6,7,8};

  merge(arr,brr,4,5);
    return 0;
}