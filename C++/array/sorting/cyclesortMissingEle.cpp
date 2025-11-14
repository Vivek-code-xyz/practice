#include<iostream>
#include<algorithm>
using namespace std;

void cyclesort(int arr[],int n){
    int i=0;
    while(i<=n){
        int correctidx=arr[i];
        if(i==correctidx ||arr[i]==n) i++;
        else swap(arr[i],arr[correctidx]);
    }
    return ;
}

int main(){
    int arr[]={2,6,9,5,4,0,1,7,3};
    int n=sizeof(arr)/sizeof(int);

    cyclesort(arr,n);       //sort the array

    for(int i=0;i<n;i++){
        if(arr[i]!=i){
         cout<<"Missing Number is : "<<i;
         return 0;
        }   
    
    }
    cout<<"Missing Number is : "<<n;
    return 1;

}

