//find second max element in array

#include<iostream>
#include <algorithm>

using namespace std;

int secmax(int arr[],int n){
   
    int max=INT16_MIN;
    int ans=INT16_MIN;
    for(int i=0;i<n;i++){
        if(arr[i]>max){
            max=arr[i];
            ans=max;
         }
        else if(arr[i]<ans && arr[i]!=max) ans =arr[i];
    }
    return (ans==INT16_MIN)?-1:ans;
}

int main(){

    int a[]={23,45,32,4,566,78,134};
    int n=sizeof(a)/sizeof(int);

    cout<<secmax(a,n);

    return 2;
}