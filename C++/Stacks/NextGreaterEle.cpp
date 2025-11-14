#include<iostream>
#include<stack>
#include<vector>

using namespace std;

vector<int> nextGreater(vector<int>&v){
    int n=v.size();
    vector<int>ans(n);
    stack<int>s;
    s.push(v[n-1]);
    ans[n-1]=-1;
    for(int i=n-2;i>=0;i--){
        while(!s.empty() && v[i]>=s.top()){
            s.pop();
        }
        ans[i]= (s.size()==0)?-1:s.top();
        s.push(v[i]);
    }
    return ans;
}

int main(){
  vector<int>arr={3,5,3,2,7,9,5,4} ;
    vector<int>an=nextGreater(arr);
    for(int i=0;i<an.size();i++){
        cout<<an[i]<<" ";
    }
    cout<<endl;
}