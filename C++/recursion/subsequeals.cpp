#include<iostream>
#include <vector>
using namespace std;

void subsequal(int arr[],int n,int i,vector<int>&ans,int k){
    if(i==n){
        if(ans.size()==k)
        {for(int j=0;j<ans.size();j++){
            cout<<ans[j]<<" ";
        }
        cout<<endl;
    }
        return;
    }
    ans.push_back(arr[i]);
    subsequal(arr,n,i+1,ans,k);
    ans.pop_back();
    subsequal(arr,n,i+1,ans,k);

}

int main(){
    int arr[]={1,2,3,4,5};
    int n=sizeof(arr)/sizeof(int);
    vector<int>ans;
    subsequal(arr,n,0,ans,3);
}