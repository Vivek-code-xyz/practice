#include <iostream>
#include <algorithm>
using namespace std;

int main(){
    int n;
    cout<<"enter n : ";
    cin>>n;
   int *arr= new int(n);
    cout<<"enter elements of array : "<<endl;
    for(int i=0;i<n;i++) cin >>arr[i];

    bool flag=false;  
    for(int i=0;i<n-1;i++){
        for(int j=0;j<n-i;j++){
            if(arr[j]>arr[j+1]){
                swap(arr[j],arr[j+1]);
                flag=true;
            }
        }
        if(flag==false) break;
    }
    cout<<"sorted array : "<<endl;
    for(int i=0;i<n;i++) cout<<arr[i]<<" ";
    return 0;



}