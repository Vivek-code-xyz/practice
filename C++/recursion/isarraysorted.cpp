#include<iostream>
using namespace std;

bool issorted(int arr[],int n){
    if(n==0||n==1) return true;

    return (arr[n-1]>=arr[n-2]&&issorted(arr,n-1));
}

int main(){
    int arr[]={1,2,3,4,5,7,10,9};
    int n=sizeof(arr)/sizeof(int);
    cout<<issorted(arr,n);

    return 0;
}