#include <iostream>
 using namespace std;

 int pivot(int arr[],int n){
    
    int st=0,end=n-1;
    while(st<=end){
        int mid=st + (end-st)/2;
        if(arr[mid]>arr[mid+1] &&mid<end)  return mid;
        if ( mid>st&& arr[mid]>arr[mid-1]) return mid;
        if(arr[mid]<=arr[end]) end=mid-1;
        else st=mid+1;
    }
    return -1;
 }

 int main(){
    int arr[]={8,9,10,11,1,2,3,4,5,6,7};
    cout<<pivot(arr,11);
    return 0;
 }