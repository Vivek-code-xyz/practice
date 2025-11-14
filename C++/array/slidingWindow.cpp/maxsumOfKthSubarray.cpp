#include<iostream>
using namespace std;

int main(){
    int arr[]={7,1,2,5,8,4,9,3,6};
    int n=sizeof(arr)/sizeof(arr[0]);
    int k=4;
    int sum=0;
    for(int i=0;i<k;i++) sum+=arr[i];
    int i=1,j=k;
    int maxsum=sum;
    int idx=-1;
    while(j<n){
        sum+=arr[j]-arr[i-1];
        if(maxsum<sum){ 
            maxsum=sum;
            idx=i;
        }
        i++;
        j++;
    }

    cout<<"Maximum Subarray Sum with k elements is : "<<maxsum<<endl;
    cout<<"with positon : "<<idx+1;

    return 0;
}