#include <iostream>
using namespace std;
void insertionsort(int arr[],int n){
   for(int i=1;i<n;i++){
        for(int j=i;j>0;j--){
            if(arr[j]<arr[j-1]){
                swap(arr[j],arr[j-1]);
            }
        }
   }
   return;
}

int main(){
    int n=7;
    int arr[7] ={1,3,7,2,4,6,5};

    insertionsort(arr,n);

    for(int i=0;i<7 ;i++){
        cout<<arr[i]<<" ";
    }
    return 0;
}