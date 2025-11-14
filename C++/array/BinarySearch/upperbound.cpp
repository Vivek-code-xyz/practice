#include <iostream>
using namespace std;

int main(){
    int target;
    cout<<"entre target value : ";
    cin>> target;
    int arr[]={1,3,3,4,4,6,6,7};
    int st=0;
    int end=sizeof(arr)/sizeof(int) ;
    while(st<end){
        int mid=st + (end-st)/2;
       if(arr[mid]<=target) st =mid+1;
       else end=mid;
    }
    cout <<"upper bound is : "<<st;
    return 0;


}