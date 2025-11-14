//sorted arrays
#include<iostream>
#include<vector>
using namespace std;

void merge(vector<int>&a, vector<int>&b,vector<int>&ans){
    int i=0,j=0,k=0;
    while(i<a.size() && j<b.size()){
        if(a[i]<b[j]){
            ans[k]=a[i];
            i++;k++;
        }
        else{
            ans[k]=b[j];
            j++;k++;
        }
    }
    if(i==a.size()){
        while(j<b.size())
       { ans[k]=b[j];
        j++;k++;}
    }
    if(j==a.size()){
        while(i<a.size()){
            ans[k]=a[i];
            i++;k++;
        }
    }

    return;
}

int main(){
    vector<int>a={1,4,5,8};
    vector<int>b={2,4,6,9,12,43};
    vector<int>ans(a.size()+b.size());

    merge(a,b,ans);

    for(int val:ans){
        cout<<val<<" ";
    }
    return 0;
}