#include<iostream>
#include<vector>
using namespace std;

void subarr(vector<int>v,int arr[],int n,int i){
    if(i==n){
        for(int j=0;j<v.size();j++)
        cout<<v[j];
        cout<<endl;
        return ;

    }

    subarr(v,arr,n,i+1);
    if(v.size()==0 || (v.back()==arr[i-1])){ 
        v.push_back(arr[i]);
        subarr(v,arr,n,i+1);
    }
}
int main(){
    int arr[]={1,2,3,4};
    int n=sizeof(arr)/sizeof(arr[0]);
    vector<int>v;
    subarr(v,arr,n,0);
}