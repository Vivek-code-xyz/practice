#include<iostream>
#include <vector>
#include <algorithm>
using namespace std;

//two pointer
vector<vector<int>> threesum(vector<int>& arr) {
        
    vector<vector<int>>trueans;
    sort(arr.begin(),arr.end());
    int n=arr.size();
    for(int i=0;i<n;i++){
        if(i>0 && arr[i]==arr[i-1]) continue;
    int st=i+1,end=n-1;
    while(st<end){
       
        if((arr[st]+arr[end]+arr[i])>0)
             end--;
        else if((arr[st]+arr[end]+arr[i])<0)
            st++;
        else{ 
           trueans.push_back({arr[i],arr[st],arr[end]});
            end--;
            st++;
            while(st<end && arr[st]==arr[st-1]) st++;
        }
    }

    
    }
    return trueans;
}
int main(){
    vector<int>vec={-1,0,1,2,-1,4,-2};
    vector<vector<int>>ans=threesum(vec);

    for(int i=0;i<ans.size();i++){
        for(int j=0;j<ans.size();j++) cout<<ans[i][j]<<" ";

        cout <<endl;
    }
    return 0;
}
