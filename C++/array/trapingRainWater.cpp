#include<iostream>
using namespace std;



int trape(int arr[],int n){
    
    int maxleft=0;
    int maxright=0;
    int water=0;
    int maxbuilding=arr[0],index=0;
    //calculating max
    for(int i=1;i<n;i++){
        if(arr[i]>maxbuilding){
            maxbuilding=arr[i];
            index=i;
        }
    }
    //left part
    for(int i=0 ;i<index;i++)
    {
        if(maxleft>arr[i]){
            water+=maxleft-arr[i];
        }
        else
            maxleft=arr[i];

    }

    // right part
    for(int i=n-1;i>index;i--){
        if(arr[i]<maxright)
            water+=maxright-arr[i];
        else
            maxright=arr[i];    
        
    }

    return water;

}

int main(){
    int n;
    cout<<"enter the no.of buildings : ";
    cin>>n;
    int arr[n];
    cout<<"enter size of each building one by one : ";
    for(int i=0;i<n;i++) cin>>arr[i];

    cout<<"water traped into buidings  = "<<trape(arr,n);
    return-1;

}