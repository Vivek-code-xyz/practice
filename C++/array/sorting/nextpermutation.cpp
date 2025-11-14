#include <iostream>
#include<algorithm>
using namespace std;

void reverse(int a[],int i,int j){
    while(i<=j){
        swap(a[i],a[j]);
        i++;
        j--;
    }
    return;
}

int main(){
    int arr[]={1,2,4,6,7};
    int n=sizeof(arr)/sizeof(int);
    int pi=-1;
    for(int i=n-2;i>=0;i--){
        if(arr[i]<arr[i+1]){
            pi=i;
            break;
        }

    }
    if(pi==-1) reverse(arr,0,n-1);

    for(int i=n-1;i>pi;i--){
        if(arr[i]>arr[pi]) {
            swap(arr[i],arr[pi]);
            break;
        }
    }

    reverse(arr,pi+1,n-1);

    cout<<"next permutation is : ";

   for(int i=0;i<n;i++) cout<<arr[i];
   return 0;


}

