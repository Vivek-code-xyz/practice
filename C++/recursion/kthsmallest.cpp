//quick select algorith     T.C==O(N)

#include<iostream>                                        
using namespace std;                                     
int partition(int arr[],int si,int ei){                   
    int pivot=arr[(si+ei)/2];
    int count=0;
    for(int i=si;i<=ei;i++){
        if(i==(si+ei)/2) continue;
        if(arr[i]<=pivot) count ++;
    }
    int pivotidx=si+count;
    swap(arr[(si+ei)/2],arr[pivotidx]);
    int a=si;
    int b=ei;
    while(a<pivotidx && b>pivotidx){
        if(arr[a]<=pivot) a++;
        if(arr[b]>pivot) b--;
        else if(arr[a]>pivot && arr[b]<=pivot){
            swap(arr[a],arr[b]);
            a++;b--;
        }
    }

    return pivotidx;
}

 int kthsmallest(int arr[],int st,int end,int k){
   
    int pi=partition(arr,st,end);
    if(pi+1==k) return arr[pi];
    else if(pi+1 <k) return     kthsmallest(arr,pi+1,end,k);
    else return kthsmallest(arr,st,pi-1,k);
    
}

int main(){
   int arr[]={32,45,12,23,87,34,32};
   int n=sizeof(arr)/sizeof(int);
   int k=3;
    cout<<"kth smallest element is : "<<kthsmallest(arr,0,n-1,k)<<endl;
    cout<<"kth largest element is : "<<kthsmallest(arr,0,n-1,n-k);
    return 0;
}