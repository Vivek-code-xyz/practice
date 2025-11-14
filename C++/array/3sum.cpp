#include <iostream>
#include <vector>
using namespace std;

void sum3(int arr[],int n,int tar){

    for(int i=0;i<n;i++){
        int st=i+1,end=n-1;
        while(st<end){
            if((arr[st]+arr[end])>(tar-arr[i]))
                 end--;
            else if((arr[st]+arr[end])<(tar-arr[i]))
                st++;
            else{ 
                cout<<arr[i]<<" "<<arr[st]<<" "<<arr[end]<<endl;
                st++;
                end--;
            }
        }
    }
    return;
   
}

int main(){
    int n;
    cout<<"enter no of elements in array in ascending order : ";
    cin>>n;
    cout<<"enter elements one by one : ";
    int arr[n];
    for(int i=0;i<n;i++){
        cin>>arr[i];
    }
    int target;
    cout<<"enter target : ";
    cin>>target;

    sum3(arr,n,target);
    return 0;
}