#include<iostream>
#include<vector>
using namespace std;

void prtsub(int arr[],int n,int i,vector<int>ans){
    if(i==n){
        for(int j=0;j<ans.size();j++) cout<<ans[j]<<" ";
        cout<<endl;
        return;
    }

    prtsub(arr,n,i+1,ans);

    ans.push_back(arr[i]);
    prtsub(arr,n,i+1,ans);
}

int main(){
    int arr[]={1,2,3};
    vector<int>v;
    prtsub(arr,3,0,v);
    return 0;
}