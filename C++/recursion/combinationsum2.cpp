#include<iostream>
#include<vector>
using namespace std;


void combination(vector<int>&ans,int arr[],int n,int idx,int tar){

    if(tar==0){
        for(int k=0;k<ans.size();k++){
            cout<<ans[k]<<" ";
        }
        cout<<endl;
        return;
    }
    if(tar<0) return ;
   for(int i=idx;i<n;i++){
    ans.push_back(arr[i]);
    combination(ans,arr,n,i,tar-arr[i]);
    ans.pop_back();
   }
}


int main(){

    int arr[]={2,3,5};
    int n=sizeof(arr)/sizeof(arr[0]);
    int tar=8;
    vector<int>v;

    combination(v,arr,n,0,tar);
}