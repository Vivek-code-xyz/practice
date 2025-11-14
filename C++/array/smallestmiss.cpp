#include <iostream>
using namespace std;

int main(){

    int arr[]={0,1,3,5,6,7,8,9};
    int n=sizeof(arr)/sizeof(int);

    //normal approch
    // for (int i=0;i<n;i++){
    //     if(arr[i]!=i){  cout<<i<<" is missing";
    //     break;
    //     }
    // }

    //binary search

    int st=0,end=n-1;
    int ans=n;
    while(st<=end){
        int mid= st + (end -st)/2;
        if(arr[mid]==mid){
           st =mid+1;
        }else{  
            end=mid-1;
            ans=mid;
        }

    }
    cout<<ans<<" is missing";
    return 0;
}