#include <iostream>
#include <vector>
//negetive numbers included
using namespace std;

int missing(int arr[],int n){
    int max=arr[0];
    for(int i=1;i<n;i++){
        if(arr[i]>max) max=arr[i];
    }
    vector<bool>vec(max,false);

    for(int i=0;i<max;i++){
        if(arr[i]>0) vec[arr[i]] = true;
    }
    
    for(int i=1;i<max;i++){
        if(vec[i]==false) return i;
    }
    return -1;
}

int main(){
    int n;
    cout<<"enter size of array : ";
    cin>>n;

    int arr[n];
    cout<<"enter elements onee by one : ";

    for(int i=0;i<n;i++) cin>>arr[i];

    cout<<missing(arr,n);
    return 0;
}