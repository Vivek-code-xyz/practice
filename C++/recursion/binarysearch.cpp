#include <iostream>
using namespace std;
//sabse ganda code....

int binarysearch(int arr[],int tar,int st,int end){
    if(st<=end){
        int mid=st +(end-st)/2;
        if(arr[mid]==tar) return mid;
        else if(arr[mid]>tar) return binarysearch(arr,tar,st,mid-1);
        else  return binarysearch(arr,tar,mid+1,end);
    }
    return -1;
}

int main(){
    int arr[]={1,33,45,79,12,51,64,2,87,34};
    int n=sizeof(arr)/sizeof(int);
    cout<<binarysearch(arr,13,0,n-1);
    return 1;
}