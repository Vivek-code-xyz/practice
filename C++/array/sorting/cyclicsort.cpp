#include<iostream>                          //applied to array ahaving elements from 1 to n only...
#include<algorithm>
using namespace std;

void cyclesort(int arr[],int n){
    int i=0;
    while(i<n){
        int correctidx=arr[i]-1;
        if(i==correctidx) i++;
        else swap(arr[i],arr[correctidx]);
    }
    return ;
}

int main(){
    int arr[]={3,2,6,1,4,5};
    int n=sizeof(arr)/sizeof(int);
    for(int val:arr){
        cout<<val<<" ";
    }
    cout <<endl;

    cyclesort(arr,n);

    for(int val:arr){
        cout<<val<<" ";
    }

}