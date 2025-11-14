#include<iostream>
#include<vector>
using namespace std;

void printsubset(vector<int>&arr,vector<int>&ans,int i){
    if(i==arr.size()){
        for(int val:ans){
            cout<<val<<" ";
        }
        cout<<endl;
        return ;

    }
//inclusion
    ans.push_back(arr[i]);  
    printsubset(arr,ans,i+1);
    ans.pop_back();//back tracking
//exclusion
    //for unique values of nums
    printsubset(arr,ans,i+1);

    //for duplicate but sorted values of nums  ...... must sort nums before calling...
    // int idx=i+1;
    // while(idx<arr.size() && arr[idx]==arr[idx-1] ) idx++;
    // subset(arr,ans,idx,rans);
}


int main(){
    vector<int>vec={1,2,3};
    vector<int>ans;
    printsubset(vec,ans,0);
    return 0;
}