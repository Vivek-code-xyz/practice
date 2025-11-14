#include <iostream>
using namespace std;

int main(){
    int arr[]={1,2,3,3,3,3,4,4,5};
    int n=sizeof(arr)/sizeof(int);
    int st=0,end=n-1;
    int idx=-1;
    int target;
    cout<<"enter target : ";
    cin>>target;
    while(st<=end){
        int mid=st +(end-st)/2;
        if(arr[mid]==target){
            if(mid!=n-1 && arr[mid]==arr[mid+1]){
               st = mid+1;
            } else{
                idx=mid;
                break;
            }
        }
        else if(arr[mid]>target) end = mid-1;
        else st =mid+1;
    }


    cout<<"last occurance at index : "<<idx;
    return 0;
}