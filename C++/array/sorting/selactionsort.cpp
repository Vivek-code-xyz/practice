#include <iostream>
#include <algorithm>
using namespace std;
void selectionsort(int arr[],int n){
  
   for(int i=0;i<n-1;i++){
        int min=i;
        for(int j=i+1;j<n;j++){
            if(arr[j]<arr[min]) min=j;
        }
        swap(arr[min],arr[i]);
   }

   cout<<"sorted array : "<<endl;
   for(int i=0;i<n;i++) cout<<arr[i]<<" ";
   return;


}

int main(){
    int n=7;
    int arr[7] ={1,3,7,2,4,6,5};

    selectionsort(arr,n);
    return 0;
}