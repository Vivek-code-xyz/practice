#include <iostream>
using namespace std;

int main(){
    int target;
    cout<<"entre target value : ";
    cin>> target;
    int arr[]={1,3,3,4,4,6,6,7};
    int st=0;
    int end=sizeof(arr)/sizeof(int) - 1;
    while(st<=end){
        int mid=st + (end-st)/2;
        if(target<arr[mid]) end=mid-1;
        else if(target > arr[mid]) st =mid + 1;
        else{
            if(arr[mid]==arr[mid-1] && mid!=0) end=mid-1;
        }
    }
    cout <<"lower bound is : "<<st;
    return 0;
}