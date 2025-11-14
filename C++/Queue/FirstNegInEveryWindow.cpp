#include<iostream>
using namespace std;
#include<vector>
#include<queue>


int main(){
    vector<int>arr={2,-3,-4,7,8,3,-5};
    vector<int>ans;
    queue<int>q;
    int n=arr.size();
    int k=3; //window size
    for(int i=0;i<k-1;i++){
        if(arr[i]<0){
            q.push(i);
        }
    }

    for(int i=k-1;i<n;i++){
        if(arr[i]<0) q.push(i);

        if(q.front()<=i-k) q.pop();
      
        if(q.empty()) ans.push_back(0);

        else{
            ans.push_back(arr[q.front()]);
        }
    
    }


    for(int i:ans){
        cout<<i<<" ";
    }
    return 0;
}