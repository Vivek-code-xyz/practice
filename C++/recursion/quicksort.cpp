#include<iostream>                                        //T.C == O(nlogn)
using namespace std;                                      //S.C == O(logn)
                                                          
int partition(int arr[],int si,int ei){                   //unstable sort
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

void quicksort(int arr[],int st,int end){
    if(st>=end) return;
    int pi=partition(arr,st,end);

    quicksort(arr,st,pi-1);
    quicksort(arr,pi+1,end);
}

int main(){
   int arr[]={32,45,12,23,87,34,32};
   int n=sizeof(arr)/sizeof(int);
    cout<<"array : ";
   for(int i=0;i<n;i++){
    cout<<arr[i]<<" ";
    }
    cout<<endl;

    quicksort(arr,0,n-1);
    cout<<"sorted array : ";
    for(int i=0;i<n;i++){
        cout<<arr[i]<<" ";
    }
    

    return 0;
}