#include<iostream>
#include<vector>
using namespace std;

int main(){
    vector<int>arr={10,20,15,50,10,70,30};
    int n=arr.size();
    vector<int>ans(n,0);

    //brute force

    for(int i=0;i<n;i++){
        for(int j=0;j<n-i;j++){
            int mi=INT16_MAX;
            for(int k=j;k<j+i+1;k++){
                mi=min(mi,arr[k]);
            }
            ans[i]=max(ans[i],mi);
        }
    }


    for(int val:ans){
        cout<<val<<" ";

    }
    return 0;
}