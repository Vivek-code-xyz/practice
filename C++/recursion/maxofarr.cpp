#include<iostream>
using namespace std;

int maxofarr(int arr[],int n,int i){
    if(i==n) return INT16_MIN;
    return max(arr[i],maxofarr(arr,n,i+1));
}


int main(){
    int arr[]={1,45,67,33,44,86,12,23,99};
    cout<<maxofarr(arr,9,0);
    return 0;
}