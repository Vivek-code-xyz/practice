//heap sort

#include<iostream>
using namespace std;

void heapify(int arr[],int idx,int n){
    int largest=idx;
    int left =idx*2 +1 ; //index of left child
    int right=idx*2 + 2 ;    //index of right child

    if(left<n && arr[left]>arr[largest]) largest=left;
    if(right<n && arr[right]>arr[largest]) largest=right;
    //now largest contains index of largest element from parent and childs

    if(largest!=idx) {         //check if parent itself is not largest...if it is, then do nothing 
        swap(arr[largest],arr[idx]);    
        heapify(arr,largest,n);
    }    
} 


void buildheap(int arr[],int n){
    //step down approach
    //starting from bottom and first non leaf node....

    for(int i=n/2-1;i>=0;i--){
        heapify(arr,i,n);
    }
}

void display(int arr[],int n){
    for(int i=0;i<n;i++){
        cout<<arr[i]<<" ";

    }
    cout<<endl;
}

void sortarray(int arr[],int n){
    buildheap(arr,n);
    for(int i=n-1;i>=0;i--){
        swap(arr[0],arr[i]);
        heapify(arr,0,i);
    }
}


int main(){
    int arr[]={23,45,21,56,78,14,34,25};
    int n=sizeof(arr)/sizeof(arr[0]);
    sortarray(arr,n);
    display(arr,n);
}